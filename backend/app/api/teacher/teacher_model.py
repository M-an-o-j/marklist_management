from configuration.config import *
from sqlalchemy import Column, String, Integer, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship

class Teacher(Base):
    __tablename__ = "teacher"

    teacher_id = Column(Integer, primary_key=True,index=True, unique=True)
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

    Teacher_signinlogs = relationship("TeacherSigninLogs", back_populates="signinlogs_teacher")
    teachertoken = relationship("TeacherToken", back_populates="tokenteacher")
    
class TeacherSigninLogs(Base):
    __tablename__ = "teacher_signin_logs"

    id = Column(Integer, primary_key=True, unique=True, index=True)
    teacher_id = Column(Integer, ForeignKey("teacher.teacher_id"))
    loggedin = Column(DateTime)
    loggedout = Column(DateTime)

    signinlogs_teacher = relationship("Teacher", back_populates="Teacher_signinlogs")

class TeacherToken(Base):
    __tablename__ = "Teacher_tokens"

    id = Column(Integer, primary_key=True, unique=True, index=True)
    teacher_id = Column(Integer, ForeignKey("teacher.teacher_id"))
    token = Column(String,unique=True)

    tokenteacher = relationship("Teacher", back_populates="teachertoken")