from sqlalchemy import Column, Integer, String, Float
from app.db import Base

class Food(Base):
    __tablename__ = "foods"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    calories_per_100g = Column(Float, nullable=False)
    category = Column(String, nullable=True)