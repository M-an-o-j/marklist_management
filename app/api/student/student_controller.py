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
    if not validation.email_validations(student.email):
        errorhandler(400, "Invalid email")
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