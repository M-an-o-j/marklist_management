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

@router.post("/teacher/signupTeacher", response_model=TeacherResponse, tags=["Teacher"], summary="Teacher can signup here")
async def signupTeacher(teacher: TeacherSignUp,db: Session = Depends(get_session)):
    return signupController(db, teacher)

@router.post("/teacher/signinTeacher", response_model=TeacherResponse, tags=["Teacher"], summary="Teachers can signin here")
async def signinTeacher(teacher: TeacherSignIn,db: Session = Depends(get_session)):
    return signinController(db,teacher)

@router.get("/teacher/getMyProfile",dependencies = [Depends(httpbearer)], response_model=TeacherResponse, tags=["Teacher"], summary="Teacher can fetch their own profile here")
async def getMyProfile(Auth_head:str = Depends(get_authorization_header),db: Session = Depends(get_session)):
    return getMyProfileController(db,Auth_head)

@router.put("/teacher/updateTeacher",dependencies = [Depends(httpbearer)], response_model=TeacherResponse, tags=["Teacher"], summary="Teacher can update their details here")
async def updateTeacher(teacher: TeacherSignUp,Auth_head:str = Depends(get_authorization_header),db: Session = Depends(get_session)):
    return updateTeacherController(db,teacher,Auth_head)

@router.post("/teacher/signoutTeacher",dependencies = [Depends(httpbearer)], tags=["Teacher"], summary="Teacher can signout here")
async def signoutTeacher(id:int,Auth_head:str = Depends(get_authorization_header),db: Session = Depends(get_session)):
    return signOutController(db,Auth_head,id)

@router.delete("/teacher/deleteTeacher",dependencies = [Depends(httpbearer)], response_model=TeacherResponse, tags=["Teacher"], summary="Teacher can delete their account here")
async def deleteTeacher(Auth_head:str = Depends(get_authorization_header),db: Session = Depends(get_session)):
    return deleteTeacherController(db,Auth_head)