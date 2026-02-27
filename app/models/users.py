from sqlalchemy import Column, String
from db import Base
from sqlalchemy.dialects.postgresql import UUID 
import uuid 

class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4())
    name = Column(String, nullable=False)
    username = Column(String, nullable=False)
    password = Column(String, nullable=False)
    sex = Column(String, nullable=True)