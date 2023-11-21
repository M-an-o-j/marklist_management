from configuration.config import *
from sqlalchemy import Column, String, Integer, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship

class Student(Base):
    __tablename__ = "student"

    student_id = Column(Integer, primary_key=True,index=True, unique=True)
    name = Column(String)
    email = Column(String,unique=True)
    phone_number = Column(String)
    username = Column(String, unique=True)
    password = Column(String)
    is_active = Column(Boolean, default=False)
    is_deleted = Column(Boolean, default=False)
    created_at = Column(DateTime)
    created_by = Column(Integer)
    updated_at = Column(DateTime)
    updated_by = Column(Integer)

    student_signinlogs = relationship("StudentSigninLogs", back_populates="signinlogs_student")
    studenttoken = relationship("StudentToken", back_populates="tokenstudent")
    student_paper = relationship("Paper",back_populates="paper_student")
    
class  StudentSigninLogs(Base):
    __tablename__ = "student_signin_logs"

    id = Column(Integer, primary_key=True, unique=True, index=True)
    student_id = Column(Integer, ForeignKey("student.student_id"))
    loggedin = Column(DateTime)
    loggedout = Column(DateTime)

    signinlogs_student = relationship("Student", back_populates="student_signinlogs")

class StudentToken(Base):
    __tablename__ = "student_tokens"

    id = Column(Integer, primary_key=True, unique=True, index=True)
    student_id = Column(Integer, ForeignKey("student.student_id"))
    token = Column(String,unique=True)

    tokenstudent = relationship("Student", back_populates="studenttoken")