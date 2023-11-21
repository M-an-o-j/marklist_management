from configuration.config import *
from sqlalchemy import Column, String, Integer, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship

class Subjects(Base):
    __tablename__ = "subjects"

    subject_id = Column(Integer, primary_key=True,index=True)
    subject = Column(String, unique=True)

    subject_paper = relationship("Paper", back_populates="paper_subject")

class Paper(Base):
    __tablename__ = "paper"

    paper_id = Column(Integer, primary_key=True,index=True)
    student_id = Column(Integer,ForeignKey("student.student_id"))
    subject_id = Column(Integer, ForeignKey("subjects.subject_id"))
    semester = Column(Integer)
    actual_mark = Column(Integer)
    out_of_mark = Column(Integer)
    percentage = Column(Integer)
    is_deleted = Column(Boolean, default=False)
    created_at = Column(DateTime)
    created_by = Column(Integer)
    updated_at = Column(DateTime)
    updated_by = Column(Integer)

    paper_subject = relationship("Subjects", back_populates="subject_paper")
    paper_student = relationship("Student", back_populates="student_paper")