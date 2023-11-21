from fastapi import Depends
from sqlalchemy.orm import Session
from typing import List
from utils.auth import *
from configuration.config import *
from .marklist_schema import *
from .marklist_controller import *

httpbearer = AdminJWT()

@router.get("/marklist/getAllmarklist",response_model=List[PaperResponse], tags=["marklist"])
async def getAllstudent(db: Session = Depends(get_session)):
    return getAllMarklistController(db)

@router.get("/marklist/getamarklist/{id}",response_model=PaperResponse, tags=["marklist"])
async def getSinglestudent(id:int,db: Session = Depends(get_session)):
    return getSinglePaperController(db, id)

@router.post("/marklist/createMarklist",dependencies = [Depends(httpbearer)],response_model=PaperResponse, tags=["marklist"])
async def signupstudent(paper: CreateMarklist,Auth_head:str = Depends(get_authorization_header),role : str = Depends(teacher_authorization),db: Session = Depends(get_session)):
    return createPaperController(db,paper,role, Auth_head)

@router.post("/marklist/updateMarklist",dependencies = [Depends(httpbearer)],response_model=PaperResponse, tags=["marklist"])
async def signupstudent(id:int,paper: UpdateMarklist,Auth_head:str = Depends(get_authorization_header),role : str = Depends(teacher_authorization),db: Session = Depends(get_session)):
    return updatePaperController(db,paper,role, Auth_head, id)

@router.post("/marklist/deleteMarklist",dependencies = [Depends(httpbearer)],response_model=PaperResponse, tags=["marklist"])
async def signupstudent(id:int,Auth_head:str = Depends(get_authorization_header),role : str = Depends(teacher_authorization),db: Session = Depends(get_session)):
    return deletePaperController(db,role, Auth_head, id)
