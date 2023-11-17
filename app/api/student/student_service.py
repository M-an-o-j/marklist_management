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
            "message":"User created successfully"
        })
    
    except Exception as e:
        db.rollback()
        errorhandler(400, f"{e}")

def signinStudentService(db, student):
    db_student = authenticate_user(db,student.username, student.password,Student)
    db_student.is_active = True
    access_token = create_access_token(data={"sub": str(db_student.student_id)}, expires_delta=expiry_del)
    db.commit()           
    return JSONResponse({
            "message":"User loggedin successfully",
            "user":{
                "username":db_student.username,
                "access_token": access_token, 
                "token_type": "bearer"}
            })