from sqlalchemy import Column, String, Float
from sqlalchemy.dialects.postgresql import UUID 
from db import Base
import uuid

class Food(Base):
    __tablename__ = "foods"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4())
    name = Column(String, nullable=False)
    calories_per_unit = Column(Float, nullable=False)
    proteins_per_unit = Column(Float, nullable=False)
    serving_unit = Column(String, nullable=False) 
    serving_size = Column(String, nullable=True)
    category = Column(String, nullable=True)
