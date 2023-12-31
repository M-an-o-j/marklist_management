from .teacher_schema import *
from fastapi import Depends
from sqlalchemy.orm import Session
from .teacher_controller import *
from typing import List
from utils.auth import *

httpbearer = AdminJWT()

@router.get("/teacher/getAllTeacher", response_model=List[TeacherResponse], tags=["Teacher"], summary="Get all teachers")
async def getAllTeacher(db: Session = Depends(get_session)):
    return getAllTeacherController(db)

@router.get("/teacher/getaTeacher/{id}", response_model=TeacherResponse, tags=["Teacher"], summary= "Get single teacher")
async def getSingleTeacher(id:int,db: Session = Depends(get_session)):
    return getSingleTeacherController(db,id)

@router.post("/teacher/createTeacher", response_model=TeacherResponse,dependencies = [Depends(httpbearer)], tags=["Teacher"], summary="Teacher can signup here")
async def signupTeacher(teacher: TeacherSignUp,Auth_head:str = Depends(get_authorization_header),role:str = Depends(admin_authorization),db: Session = Depends(get_session)):
    return signupController(db, teacher,Auth_head)

@router.post("/teacher/logininTeacher/",  tags=["Teacher"], summary="Teachers can signin here")
async def signinTeacher(teacher: TeacherSignIn,db: Session = Depends(get_session)):
    return signinController(db,teacher)

@router.get("/teacher/getMyProfile/",dependencies = [Depends(httpbearer)], response_model=TeacherResponse, tags=["Teacher"], summary="Teacher can fetch their own profile here")
async def getMyProfile(Auth_head:str = Depends(get_authorization_header),role:str = Depends(teacher_authorization),db: Session = Depends(get_session)):
    if role == "teacher":
        return getMyProfileController(db,Auth_head)
    else:
        errorhandler(403,"You can't access this route")

@router.put("/teacher/updateTeacher",dependencies = [Depends(httpbearer)], response_model=TeacherResponse, tags=["Teacher"], summary="Teacher can update their details here")
async def updateTeacher(teacher: TeacherSignUp,id:int,Auth_head:str = Depends(get_authorization_header),role:str = Depends(admin_authorization),db: Session = Depends(get_session)):
    return updateTeacherController(db,teacher,Auth_head,id)

@router.post("/teacher/logoutTeacher/",dependencies = [Depends(httpbearer)], tags=["Teacher"], summary="Teacher can signout here")
async def signoutTeacher(id:int=None,Auth_head:str = Depends(get_authorization_header),role:str = Depends(teacher_authorization),db: Session = Depends(get_session)):
    return signOutController(db,Auth_head,id,role)

@router.delete("/teacher/deleteTeacher",dependencies = [Depends(httpbearer)], response_model=TeacherResponse, tags=["Teacher"], summary="Teacher can delete their account here")
async def deleteTeacher(id:int,Auth_head:str = Depends(get_authorization_header),role:str = Depends(admin_authorization),db: Session = Depends(get_session)):
    return deleteTeacherController(db,Auth_head,id)

