from utils.validations import Validations
from .marklist_service import *
from utils.auth_handlers import *
from api.admin.admin_model import AdminToken
from api.teacher.teacher_model import TeacherToken

validation = Validations()

def getAllMarklistController(db):
    return getAllMarklistService(db)

def getSinglePaperController(db, id):
    db_paper = db.query(Paper).filter(Paper.paper_id == id, Paper.is_deleted == False).first()
    if db_paper is None:
        errorhandler(404,"paper not found")
    return getSinglePaperService(db,db_paper)

def createPaperController(db,paper,role,Auth_head):
    if role == "admin":
        admin_id = decode_token_id(Auth_head,model=AdminToken,db=db)
        id = admin_id
    if role == "teacher":
        teacher_id = decode_token_id(Auth_head,model=TeacherToken,db=db)
        id = teacher_id
    if validation.None_validation(paper.student_id,paper.subject_id,paper.semester,paper.actual_mark,paper.out_of_mark):
        errorhandler(400, "All fields are required")
    if validation.empty_validation(paper):
        errorhandler(400, "Field's shouldn't be empty")
    
    return createPaperService(db, paper, id)

def updatePaperController(db, paper,role,Auth_head, id):
    if role == "admin":
        admin_id = decode_token_id(Auth_head,model=AdminToken,db=db)
        creator_id = admin_id
    if role == "teacher":
        teacher_id = decode_token_id(Auth_head,model=TeacherToken,db=db)
        creator_id = teacher_id
    db_paper = db.query(Paper).filter(Paper.paper_id == id, Paper.is_deleted == False).first()
    if validation.empty_validation(paper):
        errorhandler(400, "Field's shouldn't be empty")

    return updatePaperService(db, paper, creator_id, db_paper)

def deletePaperController(db,role, Auth_head, id):
    if role == "admin":
        admin_id = decode_token_id(Auth_head,model=AdminToken,db=db)
    if role == "teacher":
        student_id = decode_token_id(Auth_head,model=TeacherToken,db=db)
    db_paper = db.query(Paper).filter(Paper.paper_id == id, Paper.is_deleted == False).first()
    if db_paper == None:
        errorhandler(404, "Paper not found") 

    return deletePaperService(db, db_paper)