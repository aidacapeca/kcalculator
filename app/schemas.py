from pydantic import BaseModel
from typing import Optional

class FoodCreate(BaseModel):
    name: str 
    calories_per_100g: float 
    category: Optional[str] = None 

class FoodResponse(BaseModel):
    id: int 
    name: str 
    calories_per_100g: float 
    # proteins_per_100g: float 
    
    class Config: 
        from_attributes = True  # convert SQLAlchemy to JSON



