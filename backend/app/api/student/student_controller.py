from .student_service import *
from utils.validations import Validations

validation = Validations()

def getAllStudentController(db):
    return getAllStudentsService(db)

def getSingleTeacherController(db,id):
    db_student = db.query(Student).filter(Student.student_id == id, Student.is_deleted == False).first()
    if db_student is None:
        errorhandler(404,"student not found")
    return getSingleStudentService(db,db_student)

def signupStudentController(db,student):
    if validation.None_validation(
        student.name,student.email,student.phone_number,student.username,student.password
    ):
        errorhandler(400, "All fields are required")
    if validation.empty_validation(student):
        errorhandler(400, "Field's shouldn't be empty")
    if validation.duplication_username_validate(db,Student,student.username):
         errorhandler(400,"username is not avaiable")
    if not validation.email_validations(student.email):
        errorhandler(400, "Invalid email")
    if validation.duplication_email_validate(db,Student,student.email):
         errorhandler(400,"email is not avaiable")
    if not validation.phoneNumber_validation(student.phone_number):
        errorhandler(400,"Invalid phone number")
    if not validation.password_validation(student.password):
        errorhandler(400, "Password should contain 8 character, atleast 1 uppercase letter, atleast 1 lowercase letter, atleast 1 symbol")
    return signupStudentService(db, student)

def signinStudentController(db,student):
    if validation.None_validation(student.username,student.password
    ):
        errorhandler(400, "All fields are required")
    if validation.empty_validation(student):
        errorhandler(400, "Field's shouldn't be empty")
    db_student = db.query(Student).filter(Student.username == student.username).first()
    print(db_student)
    if db_student != None:
        if validation.User_delete_validation(db_student):
            errorhandler(400, "user not found")
        if validation.login_validation(db_student):
            errorhandler(400, "You're already loggedin")
    
    return signinStudentService(db, student)

def getMyProfileController(db,Auth_head):
    student_id = decode_token_id(Auth_head,model=StudentToken,db=db)
    print("ddd",student_id)
    # role = decode_token_role(Auth_head,model=StudentToken,db=db)
    print('id',student_id)
    db_student = db.query(Student).filter(Student.student_id == student_id).first()
    if validation.User_delete_validation(db_student):
            errorhandler(404,"User not found")   

    return getMyProfileService(db, db_student)

def updateStudentController(db,Auth_head,student):
    student_id = decode_token_id(Auth_head,model=StudentToken,db=db)
    print(student_id)
    db_student = db.query(Student).filter(Student.student_id == student_id).first()
    print(db_student.username)
    if db_student != None:
        if validation.User_delete_validation(db_student):
            errorhandler(400, "user not found")
    if validation.duplication_username_validate(db,Student,student.username):
         errorhandler(400,"username is not avaiable")
    if student.email:
        if not validation.email_validations(student.email):
            errorhandler(400, "Invalid email")
    if validation.duplication_email_validate(db,Student,student.email):
         errorhandler(400,"email is not avaiable")
    if student.phone_number:
        if not validation.phoneNumber_validation(student.phone_number):
            errorhandler(400,"Invalid phone number")
    if student.password:
        if not validation.password_validation(student.password):
            errorhandler(400, "Password should contain 8 character, atleast 1 uppercase letter, atleast 1 lowercase letter, atleast 1 symbol")
    return updateStudentService(db,student, db_student)

def signoutStudentController(db,Auth_head):
    student_id = decode_token_id(Auth_head,model=StudentToken,db=db)
    db_student = db.query(Student).filter(Student.student_id == student_id).first()
    db_token = db.query(StudentToken).filter(StudentToken.student_id == db_student.student_id).first()
    if db_token == None:
            errorhandler(400,"token is expired")
    if validation.User_delete_validation(db_student):
            errorhandler(404,"User not found")   

    return signOutStudentService(db, db_student,db_token)

def deleteStudentController(db,Auth_head):
            admin_id = decode_token_id(Auth_head,model=StudentToken,db=db)
            db_student = db.query(Student).filter(Student.student_id == admin_id).first()
            print(db_student.username)
            if validation.User_delete_validation(db_student):
                  errorhandler(404,"User not found")   

            return deleteStudentService(db, db_student)
