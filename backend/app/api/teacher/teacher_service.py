from .teacher_model import *
from datetime import datetime
from fastapi.responses import JSONResponse
from utils.auth_handlers import *
from utils.handlers import *

expiry_del = ACCESS_TOKEN_EXPIRY_MINUTES

def getAllTeacherService(db):
    try:
        db_teachers = db.query(Teacher).filter(Teacher.is_deleted == False).all()
        return db_teachers
    except Exception as e:
        db.rollback()
        errorhandler(400,f"{e}")

def getSingleTeacherService(db, db_teacher):
    try:
        return db_teacher
    except Exception as e:
        db.rollback()
        errorhandler(400,f"{e}")

def signupService(db, teacher, admin_id):
    try:
        db_teacher = Teacher(
            name = teacher.name,
            email = teacher.email,
            phone_number = teacher.phone_number,
            username = teacher.username,
            password = hash_password(teacher.password),
            created_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            created_by = admin_id
        )
        
        db.add(db_teacher)
        db.commit()
        db.refresh(db_teacher)

        return JSONResponse({
            "message":"Teacher created successfully"
        })
    
    except Exception as e:
        db.rollback()
        errorhandler(400, f"{e}")

def signinService(db, teacher, db_teacher):
        db_teacher.is_active = True
        signin_log = TeacherSigninLogs(teacher_id= db_teacher.teacher_id, loggedin = datetime.now())
        access_token = create_access_token(data={"sub": str(db_teacher.teacher_id), "role":"teacher"}, expires_delta=expiry_del)
        db_token = TeacherToken(teacher_id= db_teacher.teacher_id, token=access_token)
        db.add(signin_log)
        db.add(db_token)
        db.commit()           
        return JSONResponse(status_code=200, content={
            "message":"User loggedin successfully",
            "status":"ok",
            "user":{
                "username":teacher.username,
                "access_token": access_token, 
                "token_type": "bearer"}
            })

def getMyProfileService(db, db_user):
          try:
            return db_user
          except Exception as e:
            db.rollback()
            errorhandler(400,f"{e}")

def updateTeacherService(db,id,teacher):
    try:
        db_teacher = db.query(Teacher).filter(Teacher.teacher_id == id).first()
        if teacher.username != "" and teacher.username != None:
                db_teacher.username = db_teacher.username
        if teacher.name != "" and teacher.name != None:   
                    db_teacher.name = teacher.name
        if teacher.password != "" and teacher.password != None:   
                    db_teacher.password = hash_password(teacher.password)
        if teacher.email != "" and teacher.email != None:   
                    db_teacher.email = teacher.email
        if teacher.phone_number != "" and teacher.phone_number != None:   
                    db_teacher.phone_number = teacher.phone_number
        db_teacher.updated_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        db.commit()


        return JSONResponse({
            "message":"teacher updated successfully"
        })
    
    except Exception as e:
        db.rollback()
        errorhandler(400, f"{e}")

def signOutService(db, db_teacher):
          try:
            db_teacher.is_active = False
            signin_user = db.query(TeacherSigninLogs).filter(TeacherSigninLogs.teacher_id == db_teacher.teacher_id).all()
            list_signin = [i.id for i in signin_user]
            last_login_id = max(list_signin)
            last_login = db.query(TeacherSigninLogs).filter(TeacherSigninLogs.id == last_login_id).first()
            last_login.loggedout = datetime.now()
            db_token = db.query(TeacherToken).filter(TeacherToken.teacher_id == db_teacher.teacher_id).first()
            db.delete(db_token)
            db.commit()
            return JSONResponse({
                  "message":"logged out successfully"
            })
          except Exception as e:
            db.rollback()
            errorhandler(400,f"{e}")

def deleteTeacherService(db, db_teacher):
          try:
            db_teacher.is_deleted = True
            db_token = db.query(TeacherToken).filter(TeacherToken.teacher_id == db_teacher.teacher_id).first()
            if db_token != None:
                db.delete(db_token)
            db.commit()
            return JSONResponse({
                  "message":"Teacher deleted successfully"
            })
          except Exception as e:
            db.rollback()
            errorhandler(400,f"{e}")