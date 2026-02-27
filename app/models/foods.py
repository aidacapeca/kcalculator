from sqlalchemy import Column, String, Float
from sqlalchemy.dialects.postgresql import UUID 
from db import Base
import uuid

class Food(Base):
    __tablename__ = "foods"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4())
    name = Column(String, nullable=False)
    calories_per_100g = Column(Float, nullable=False)
    category = Column(String, nullable=True)