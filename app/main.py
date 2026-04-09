from fastapi import FastAPI, Depends, HTTPException
from db import engine, Base, get_db
import schemas
from models import foods, users
from sqlalchemy.orm import Session 

Base.metadata.create_all(bind=engine)

app = FastAPI(title="KCalories Calculator")

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
def bulk_create_food(food: list[schemas.FoodCreate], db: Session = Depends(get_db)):
    pass
    
@app.post("/food", response_model=schemas.FoodResponse,  tags=["Foods"])
def create_food(food: schemas.FoodCreate, db: Session = Depends(get_db)):
    db_food = foods.Food(
        name=food.name, 
        calories_per_100g=food.calories_per_100g, 
        category=food.category
    )
    db.add(db_food)
    db.commit()
    db.refresh(db_food)
    
    return db_food

@app.get("/all-foods", response_model=list[schemas.FoodResponse],  tags=["Foods"])
def get_all_foods(db: Session = Depends(get_db)):
    allFoods = db.query(foods.Food).all()
    return allFoods

@app.get("/food/{food_id}", response_model=schemas.FoodResponse, tags=["Foods"])
def get_food_by_id(food_id: int, db: Session = Depends(get_db)):
    food = db.query(foods.Food).filter(foods.Food.id == food_id).first()
    if not food:
        raise HTTPException(status_code=404, detail="Food not found")
    return food
