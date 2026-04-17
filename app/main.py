from fastapi import FastAPI, Depends, HTTPException
from db import engine, Base, get_db
import schemas
from models import foods, users
from sqlalchemy.orm import Session 
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from uuid import UUID

Base.metadata.create_all(bind=engine)

app = FastAPI(title="KCalories Calculator")
print("Creating tables...")
Base.metadata.create_all(bind=engine)
print("Tables created successfully!")

@app.get("/")
def root():
    return {"status": "running"}

@app.post("/user", response_model=schemas.UserResponse,  tags=["Users"])
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = users.User(
        name= user.name, 
        username = user.username, 
        password= user.password, 
        sex=user.sex
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return db_user 

@app.get("/all-users", response_model=list[schemas.UserResponse],  tags=["Users"])
def get_all_users(db: Session = Depends(get_db)):
    allUsers = db.query(users.User).all()
    return allUsers

@app.get("/user/{user_id}", response_model=schemas.UserResponse,  tags=["Users"])
def get_user_by_id(user_id: int, db: Session = Depends(get_db)):
    user = db.query(users.User).filter(users.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.post("/bulk-upload-foods", response_model=list[schemas.FoodResponse], tags=["Foods"])
def bulk_create_food(food: list[schemas.Food], db: Session = Depends(get_db)):
    if not food:
        raise HTTPException(status_code=400, detail="The food list cannot be empty")
    db_foods = [foods.Food(**item.model_dump()) for item in food]
    
    try:
        db.add_all(db_foods)
        db.commit()
        for food in db_foods:
            db.refresh(food)
    except IntegrityError as e:
        db.rollback()
        raise HTTPException(status_code=409, detail=f"Duplicate or invalid data: {str(e.orig)}")
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    
    return db_foods
    
@app.post("/food", response_model=schemas.FoodResponse, tags=["Foods"])
def create_food(food: schemas.Food, db: Session = Depends(get_db)):
    db_food = foods.Food(**food.model_dump())
    
    try:
        db.add(db_food)
        db.commit()
        db.refresh(db_food)
    except IntegrityError as e:
        db.rollback()
        raise HTTPException(status_code=409, detail=f"Duplicate or invalid data: {str(e.orig)}")
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    
    return db_food

@app.get("/all-foods", response_model=list[schemas.FoodResponse],  tags=["Foods"])
def get_all_foods(db: Session = Depends(get_db)):
    allFoods = db.query(foods.Food).all()
    return allFoods

@app.get("/food/{food_id}", response_model=schemas.FoodResponse, tags=["Foods"])
def get_food_by_id(food_id: UUID, db: Session = Depends(get_db)):
    food = db.query(foods.Food).filter(foods.Food.id == food_id).first()
    if not food:
        raise HTTPException(status_code=404, detail="Food not found")
    return food

@app.put("/food/{food_id}", response_model=schemas.FoodResponse, tags=["Foods"])
def update_food(food_id: UUID, food_update: schemas.FoodUpdate, db: Session = Depends(get_db)):
    db_food = db.query(foods.Food).filter(foods.Food.id == food_id).first()

    if not db_food:
        raise HTTPException(status_code=404, detail="Food not found")

    update_data = food_update.model_dump(exclude_unset=True)
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields were provided for update")

    for field, value in update_data.items():
        setattr(db_food, field, value)

    try:
        db.commit()
        db.refresh(db_food)
    except IntegrityError as e:
        db.rollback()
        raise HTTPException(status_code=409, detail=f"Duplicate or invalid data: {str(e.orig)}")
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

    return db_food

@app.put("/bulk-update-foods", response_model=list[schemas.FoodResponse], tags=["Foods"])
def bulk_update_foods(food_updates: list[schemas.FoodBulkUpdate], db: Session = Depends(get_db)):
    if not food_updates:
        raise HTTPException(status_code=400, detail="The food update list cannot be empty")

    food_ids = [item.id for item in food_updates]
    db_foods = db.query(foods.Food).filter(foods.Food.id.in_(food_ids)).all()
    foods_by_id = {food.id: food for food in db_foods}

    missing_ids = [str(food_id) for food_id in food_ids if food_id not in foods_by_id]
    if missing_ids:
        raise HTTPException(status_code=404, detail={"missing_food_ids": missing_ids})

    for item in food_updates:
        db_food = foods_by_id[item.id]
        update_data = item.model_dump(exclude_unset=True, exclude={"id"})

        if not update_data:
            raise HTTPException(status_code=400, detail=f"No fields were provided for food {item.id}")

        for field, value in update_data.items():
            setattr(db_food, field, value)

    try:
        db.commit()
        for food in db_foods:
            db.refresh(food)
    except IntegrityError as e:
        db.rollback()
        raise HTTPException(status_code=409, detail=f"Duplicate or invalid data: {str(e.orig)}")
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

    return [foods_by_id[item.id] for item in food_updates]
