from pydantic import BaseModel
from datetime import datetime

class StudentResonse(BaseModel):
    student_id : int = None
    name : str = None
    phone_number: str = None
    email : str = None
    username : str = None
    created_at : datetime = None

class StudentSignup(BaseModel):
    name : str = None
    phone_number: str = None
    email : str = None
    username : str = None
    password : str = None

class StudentSignin(BaseModel):
    username: str = None
    password: str = None
