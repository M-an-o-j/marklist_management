from pydantic import BaseModel
from datetime import datetime

class PaperResponse(BaseModel):
    paper_id : int = None
    student_id : int = None
    subject_id : int = None
    semester : int = None
    actual_mark : int = None
    out_of_mark : int = None
    percentage : int = None
    created_at : datetime = None

class CreateMarklist(BaseModel):
    student_id : int = None
    subject_id : int = None
    semester : int = None
    actual_mark : int = None
    out_of_mark : int = None

class UpdateMarklist(BaseModel):
    subject_id : int = None
    semester : int = None
    actual_mark : int = None
    out_of_mark : int = None
