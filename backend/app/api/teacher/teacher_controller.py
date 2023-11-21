from .teacher_service import *
from utils.validations import *
from api.admin.admin_model import AdminToken

validation = Validations()

def getAllTeacherController(db):
    return getAllTeacherService(db)

def getSingleTeacherController(db,id):
    db_teacher = db.query(Teacher).filter(Teacher.teacher_id == id, Teacher.is_deleted == False).first()
    if db_teacher is None:
        errorhandler(404,"Teacher not found")
    return getSingleTeacherService(db,db_teacher)

def signupController(db,teacher,Auth_head):
    admin_id = decode_token_id(Auth_head, model=AdminToken, db=db)
    if validation.None_validation(
        teacher.name,teacher.email,teacher.phone_number,teacher.username,teacher.password
    ):
        errorhandler(400, "All fields are required")
    if validation.empty_validation(teacher):
        errorhandler(400, "Field's shouldn't be empty")
    if validation.duplication_username_validate(db,Teacher,teacher.username):
         errorhandler(400,"username is not avaiable")
    if not validation.email_validations(teacher.email):
        errorhandler(400, "Invalid email")
    if validation.duplication_email_validate(db,Teacher,teacher.email):
         errorhandler(400,"email is not avaiable")
    if not validation.phoneNumber_validation(teacher.phone_number):
        errorhandler(400,"Invalid phone number")
    if not validation.password_validation(teacher.password):
        errorhandler(400, "Password should contain 8 character, atleast 1 uppercase letter, atleast 1 lowercase letter, atleast 1 symbol")
    return signupService(db, teacher,admin_id)

def signinController(db,teacher):
    if validation.None_validation(teacher.username,teacher.password
    ):
        errorhandler(400, "All fields are required")
    if validation.empty_validation(teacher):
        errorhandler(400, "Field's shouldn't be empty")
    db_teacher = authenticate_user(db,teacher.username, teacher.password,Teacher)
    if db_teacher != None:
        if validation.User_delete_validation(db_teacher):
            errorhandler(400, "Teacher not found")
        if validation.login_validation(db_teacher):
            errorhandler(400, "You're already loggedin")
    
    return signinService(db, teacher, db_teacher)

def getMyProfileController(db,Auth_head):
        teacher_id = decode_token_id(Auth_head,model=TeacherToken,db=db)
        print('id',teacher_id)
        db_teacher = db.query(Teacher).filter(Teacher.teacher_id == teacher_id).first()
        if validation.User_delete_validation(db_teacher):
                errorhandler(404,"User not found")   

        return getMyProfileService(db, db_teacher)

def updateTeacherController(db,teacher,Auth_head,id):
    admin_id = decode_token_id(Auth_head, model=AdminToken, db=db)
    db_teacher = db.query(Teacher).filter(Teacher.teacher_id == id).first()
    if db_teacher != None:
        if validation.User_delete_validation(db_teacher):
            errorhandler(400, "user not found")
    if teacher.email:
        if not validation.email_validations(teacher.email):
            errorhandler(400, "Invalid email")
    if teacher.phone_number:
        if not validation.phoneNumber_validation(teacher.phone_number):
            errorhandler(400,"Invalid phone number")
    if teacher.password:
        if not validation.password_validation(teacher.password):
            errorhandler(400, "Password should contain 8 character, atleast 1 uppercase letter, atleast 1 lowercase letter, atleast 1 symbol")
    return updateTeacherService(db,id,teacher)

def signOutController(db,Auth_head,id,role):
            if role != "teacher":
                admin_id = decode_token_id(Auth_head, model=AdminToken, db=db)
            if role != "admin":
                teacher_id = decode_token_id(Auth_head, model=TeacherToken, db=db)
            if id != None:
                db_teacher = db.query(Teacher).filter(Teacher.teacher_id == id).first()
                if db_teacher == None:
                     errorhandler(404, "teacher not found")
            else:
                db_teacher = db.query(Teacher).filter(Teacher.teacher_id == teacher_id).first()
            
            if validation.User_delete_validation(db_teacher):
                  errorhandler(404,"User not found")   
            if db_teacher.is_active == False:
                 errorhandler(400, f"{id} is not loggedin yet")

            return signOutService(db, db_teacher)

def deleteTeacherController(db,Auth_head,id):
            admin_id = decode_token_id(Auth_head, model=AdminToken, db=db)
            print(admin_id)
            if admin_id == None:
                teacher_id = decode_token_id(Auth_head, model=TeacherToken, db=db)
                db_teacher = db.query(Teacher).filter(Teacher.teacher_id == teacher_id).first()
                if db_teacher == None:
                     errorhandler(404,"teacher not found")
            else:
                db_teacher = db.query(Teacher).filter(Teacher.teacher_id == id).first()
                if db_teacher == None:
                     errorhandler(404,"teacher not found")
                print(db_teacher, "teacher")
            if validation.User_delete_validation(db_teacher):
                  errorhandler(404,"User not found")   

            return deleteTeacherService(db, db_teacher)
