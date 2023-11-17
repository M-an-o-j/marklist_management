from fastapi import Depends
from sqlalchemy.orm import Session
from typing import List
from utils.auth import *
from configuration.config import *
from .student_schema import *
from .student_controller import *

httpbearer = AdminJWT()

@router.get("/student/getAllstudent",response_model=List[StudentResonse], tags=["Student"])
async def getAllstudent(db: Session = Depends(get_session)):
    return getAllStudentController(db)

@router.get("/student/getastudent/{id}",response_model=StudentResonse, tags=["Student"])
async def getSinglestudent(id:int,db: Session = Depends(get_session)):
    return getSingleTeacherController(db, id)

@router.post("/student/signupstudent",response_model=StudentResonse, tags=["Student"])
async def signupstudent(student: StudentSignup,db: Session = Depends(get_session)):
    return signupStudentController(db,student)

@router.post("/student/signinstudent",response_model=StudentResonse, tags=["Student"])
async def signinstudent(student: StudentSignin,db: Session = Depends(get_session)):
    return signinStudentController(db,student)

@router.get("/student/getMyProfile",dependencies = [Depends(httpbearer)],response_model=StudentResonse, tags=["Student"])
async def getMyProfile(Auth_head:str = Depends(get_authorization_header),db: Session = Depends(get_session)):
    return 

@router.put("/student/updatestudent",dependencies = [Depends(httpbearer)],response_model=StudentResonse, tags=["Student"])
async def updatestudent(student: StudentSignup,Auth_head:str = Depends(get_authorization_header),db: Session = Depends(get_session)):
    return 

@router.post("/student/signoutstudent",dependencies = [Depends(httpbearer)], tags=["Student"])
async def signoutstudent(Auth_head:str = Depends(get_authorization_header),db: Session = Depends(get_session)):
    return 

@router.delete("/student/deletestudent",dependencies = [Depends(httpbearer)],response_model=StudentResonse, tags=["Student"])
async def deletestudent(Auth_head:str = Depends(get_authorization_header),db: Session = Depends(get_session)):
    return 