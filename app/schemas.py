from pydantic import BaseModel
from typing import Optional

class Food(BaseModel):
    name: str 
    calories_per_unit: float 
    proteins_per_unit: float
    serving_unit: str
    serving_size: Optional[float] = None
    category: Optional[str] = None
    image_url: Optional[str] = None

class FoodResponse(Food):
    id: int 
    
    class Config: 
        from_attributes = True  # convert SQLAlchemy to JSON



class UserCreate(BaseModel):
    name: str
    username: str 
    password: str 
    sex: Optional[str] = None 
    
class UserResponse(BaseModel):
    name: str
    username: str 
    sex: str
    
    class Config: 
        from_attributes = True