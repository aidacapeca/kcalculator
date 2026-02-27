from fastapi import FastAPI, Depends
from app.db import engine, Base
from app import models, schemas
from app.db import engine, Base, get_db
from sqlalchemy.orm import Session 

Base.metadata.create_all(bind=engine)

app = FastAPI(title="KCalories Calculator")

@app.get("/")
def root():
    return {"status": "running"}

@app.post("/food", response_model=schemas.FoodResponse)
def create_food(food: schemas.FoodCreate, db: Session = Depends(get_db)):
    db_food = models.Food(
        name=food.name, 
        calories_per_100g=food.calories_per_100g, 
        category=food.category
    )
    db.add(db_food)
    db.commit()
    db.refresh(db_food)
    
    return db_food

