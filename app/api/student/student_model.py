from configuration.config import *
from sqlalchemy import Column, String, Integer, Boolean,DateTime, ForeignKey
from sqlalchemy.orm import relationship

class Student(Base):
    __tablename__ = "student"

    student_id = Column(Integer, primary_key=True,index=True, unique=True)
    name = Column(String)
    email = Column(String)
    phone_number = Column(String)
    username = Column(String, unique=True)
    password = Column(String)
    is_active = Column(Boolean, default=False)
    is_deleted = Column(Boolean, default=False)
    created_at = Column(DateTime)
    created_by = Column(Integer)
    updated_at = Column(DateTime)
    updated_by = Column(Integer)