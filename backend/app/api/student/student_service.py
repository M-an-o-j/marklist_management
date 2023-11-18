from .student_model import *
from utils.handlers import *
from datetime import datetime
from utils.auth_handlers import *
from fastapi.responses import JSONResponse

expiry_del = ACCESS_TOKEN_EXPIRY_MINUTES

def getAllStudentsService(db):
    try:
        db_students = db.query(Student).filter(Student.is_deleted == False).all()
        print(db_students)
        return db_students
    except Exception as e:
        db.rollback()
        errorhandler(400,f"{e}")

def getSingleStudentService(db, db_student):
    try:
        return db_student
    except Exception as e:
        db.rollback()
        errorhandler(400,f"{e}")

def signupStudentService(db,student):
    try:
        db_student = Student(
            name = student.name,
            email = student.email,
            phone_number = student.phone_number,
            username = student.username,
            password = hash_password(student.password),
            created_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        )
        
        db.add(db_student)
        db.commit()
        db.refresh(db_student)

        return JSONResponse({
            "message":"Student created successfully"
        })
    
    except Exception as e:
        db.rollback()
        errorhandler(400, f"{e}")

def signinStudentService(db, student):
    db_student = authenticate_user(db,student.username, student.password,Student)
    db_student.is_active = True
    signin_log = StudentSigninLogs(student_id= db_student.student_id, loggedin = datetime.now())
    access_token = create_access_token(data={"sub": str(db_student.student_id),"role":"student"}, expires_delta=expiry_del)
    db_token = StudentToken(student_id= db_student.student_id, token=access_token)
    db.add(signin_log)
    db.add(db_token)
    db.commit()           
    return JSONResponse({
            "message":"User loggedin successfully",
            "user":{
                "username":db_student.username,
                "access_token": access_token, 
                "token_type": "bearer"}
            })

def getMyProfileService(db,db_student):
    try:
        return db_student
    except Exception as e:
        db.rollback()
        errorhandler(400,f"{e}")

def updateStudentService(db,student, db_student):
    try:
        if student.username != "" and student.username != None:
                print("username")
                db_student.username = student.username
        if student.name != "" and student.name != None:   
                    db_student.name = student.name
        if student.password != "" and student.password != None:   
                    db_student.password = hash_password(student.password)
        if student.email != "" and student.email != None:   
                    db_student.email = student.email
        if student.phone_number != "" and student.phone_number != None:   
                    db_student.phone_number = student.phone_number
        db_student.updated_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        db.commit()


        return JSONResponse({
            "message":"student updated successfully"
        })
    
    except Exception as e:
        db.rollback()
        errorhandler(400, f"{e}")

def signOutStudentService(db, db_student, db_token):
        try:
            db_student.is_active = False
            signin_user = db.query(StudentSigninLogs).filter(StudentSigninLogs.student_id == db_student.student_id).all()
            list_signin = [i.id for i in signin_user]
            last_login_id = max(list_signin)
            last_login = db.query(StudentSigninLogs).filter(StudentSigninLogs.id == last_login_id).first()
            last_login.loggedout = datetime.now() 
            db.delete(db_token)
            db.commit()
            return JSONResponse({
                  "message":"logged out successfully"
            })
        except Exception as e:
            db.rollback()
            errorhandler(400,f"{e}")

def deleteStudentService(db, db_student):
          try:
            print(db_student.is_deleted)
            db_student.is_deleted = True
            db_token = db.query(StudentToken).filter(StudentToken.student_id == db_student.student_id).first()
            if db_token != None:
                db.delete(db_token)
            db.commit()
            return JSONResponse({
                  "message":"admin deleted successfully"
            })
          except Exception as e:
            db.rollback()
            errorhandler(400,f"{e}")