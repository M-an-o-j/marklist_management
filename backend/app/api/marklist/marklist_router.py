from fastapi import Depends
from sqlalchemy.orm import Session
from typing import List
from utils.auth import *
from .marklist_model import *

httpbearer = AdminJWT()

@router.get("/marklist", tags=["Teacher"], summary="Get all teachers")
async def getAllTeacher(db: Session = Depends(get_session)):
    return 