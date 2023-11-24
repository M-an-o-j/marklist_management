from pydantic import BaseModel, Field
from datetime import datetime

class TeacherResponse(BaseModel):
    teacher_id : int = None
    name : str = None
    email : str = None
    phone_number : str = None
    username : str = None
    created_at : datetime = None

class TeacherSignUp(BaseModel):
    name : str = None
    email : str = None
    phone_number : str = None
    username : str = None
    password : str = None

class TeacherSignIn(BaseModel):
    username : str = None
    password : str = None
