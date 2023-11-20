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

@router.post("/student/signupstudent",dependencies = [Depends(httpbearer)],response_model=StudentResonse, tags=["Student"])
async def signupstudent(student: StudentSignup,role : str = Depends(teacher_authorization),db: Session = Depends(get_session)):
    return signupStudentController(db,student)

@router.post("/student/signinstudent",response_model=StudentResonse, tags=["Student"])
async def signinstudent(student: StudentSignin,db: Session = Depends(get_session)):
    return signinStudentController(db,student)

@router.get("/student/getMyProfile",dependencies = [Depends(httpbearer)],response_model=StudentResonse, tags=["Student"])
async def getMyProfile(Auth_head:str = Depends(get_authorization_header),db: Session = Depends(get_session),role : str = Depends(teacher_authorization)):
    if role == "student":
        return getMyProfileController(db,Auth_head)
    else:
        errorhandler(403,"You can't access this route")

@router.put("/student/updatestudent",dependencies = [Depends(httpbearer)],response_model=StudentResonse, tags=["Student"])
async def updatestudent(student: StudentSignup,id:int = None,Auth_head:str = Depends(get_authorization_header),role : str = Depends(teacher_authorization),db: Session = Depends(get_session)):
    return updateStudentController(db,Auth_head,student,id,role)

@router.post("/student/signoutstudent",dependencies = [Depends(httpbearer)], tags=["Student"])
async def signoutstudent(id:int = None,Auth_head:str = Depends(get_authorization_header),role : str = Depends(teacher_authorization),db: Session = Depends(get_session)):
    return  signoutStudentController(db,Auth_head, id,role)

@router.delete("/student/deletestudent",dependencies = [Depends(httpbearer)],response_model=StudentResonse, tags=["Student"])
async def deletestudent(id:int = None,Auth_head:str = Depends(get_authorization_header),role : str = Depends(teacher_authorization),db: Session = Depends(get_session)):
    return deleteStudentController(db,Auth_head,id,role)