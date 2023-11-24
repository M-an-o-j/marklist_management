import time
from .marklist_model import *
from  utils.handlers import *
from datetime import datetime
from fastapi.responses import JSONResponse

def getAllMarklistService(db):
    try:
        db_papers= db.query(Paper).filter(Paper.is_deleted == False).all()
        time.sleep(2)
        return db_papers
    except Exception as e:
        db.rollback()
        errorhandler(400,f"{e}")

def getSinglePaperService(db,db_paper):
    try:
        return db_paper
    except Exception as e:
        db.rollback()
        errorhandler(400,f"{e}")

def createPaperService(db, paper, id):
    try:
        db_paper = Paper(
            student_id = paper.student_id,
            subject_id = paper.subject_id,
            semester = paper.semester,
            actual_mark = paper.actual_mark,
            out_of_mark = paper.out_of_mark,
            percentage = (paper.actual_mark / paper.out_of_mark) * 100,
            created_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            created_by = id
        )
        
        db.add(db_paper)
        db.commit()
        db.refresh(db_paper)

        return JSONResponse({
            "message":"paper created successfully"
        })
    
    except Exception as e:
        db.rollback()
        errorhandler(400, f"{e}")

def updatePaperService(db, paper, id, db_paper):
    try:
        if paper.subject_id != "" and paper.subject_id != None:
                db_paper.subject_id = paper.subject_id
        if paper.semester != "" and paper.semester != None:
                db_paper.semester = paper.semester
        if paper.actual_mark != "" and paper.actual_mark != None:
                db_paper.actual_mark = paper.actual_mark
        if paper.out_of_mark != "" and paper.out_of_mark != None:
                db_paper.out_of_mark = paper.out_of_mark
        db_paper.updated_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        db.commit()

        return JSONResponse({
            "message":"paper updated successfully"
        })
    
    except Exception as e:
        db.rollback()
        errorhandler(400, f"{e}")

def deletePaperService(db, db_paper):
    try:
        db_paper.is_deleted = True
        db.commit()
        return JSONResponse({
            "message":"paper deleted successfully"
        })
    except Exception as e:
        db.rollback()
        errorhandler(400,f"{e}")