from .admin_service import *
from utils.validations import *

validation = Validations()

def getAlladminController(db):
    return getAlladminService(db)

def getSingleadminController(db,id, Auth_head):
    db_admin = db.query(Admin).filter(Admin.admin_id == id, Admin.is_deleted == False).first()
    if db_admin == None:
        errorhandler(404,"admin not found")
    admin_id = decode_token_id(Auth_head)
    if admin_id == None:
         errorhandler(403, "Token is expired")
    return getSingleadminService(db,db_admin)

def signupController(db,admin):
    if validation.None_validation(
        admin.name,admin.email,admin.phone_number,admin.username,admin.password
    ):
        errorhandler(400, "All fields are required")
    if validation.empty_validation(admin):
        errorhandler(400, "Field's shouldn't be empty")
    if validation.duplication_username_validate(db,Admin,admin.username):
         errorhandler(400,"username is not avaiable")
    if not validation.email_validations(admin.email):
        errorhandler(400, "Invalid email")
    if validation.duplication_email_validate(db,Admin,admin.email):
         errorhandler(400,"email is not avaiable")
    if not validation.phoneNumber_validation(admin.phone_number):
        errorhandler(400,"Invalid phone number")
    if not validation.password_validation(admin.password):
        errorhandler(400, "Password should contain 8 character, atleast 1 uppercase letter, atleast 1 lowercase letter, atleast 1 symbol")
    return signupService(db, admin)

def signinController(db,admin):
    if validation.None_validation(admin.username,admin.password
    ):
        errorhandler(400, "All fields are required")
    if validation.empty_validation(admin):
        errorhandler(400, "Field's shouldn't be empty")
    db_admin = authenticate_user(db,admin.username, admin.password,Admin)
    if db_admin != None:
        print(db_admin.username)
        if validation.User_delete_validation(db_admin):
            errorhandler(400, "admin not found")
        if validation.login_validation(db_admin):
            errorhandler(400, "You're already loggedin")
    
    return signinService(db, admin, db_admin)

def getMyProfileController(db,Auth_head):
        admin_id = decode_token_id(Auth_head,model=AdminToken,db=db)
        print('id',admin_id)
        db_admin = db.query(Admin).filter(Admin.admin_id == admin_id).first()
        if validation.User_delete_validation(db_admin):
                errorhandler(404,"User not found")   

        return getMyProfileService(db, db_admin)

def updateadminController(db,admin,Auth_head):
    admin_id = decode_token_id(Auth_head,model=AdminToken,db=db)
    db_admin = db.query(admin).filter(admin.admin_id == admin_id).first()
    if db_admin != None:
        if validation.User_delete_validation(db_admin):
            errorhandler(400, "user not found")
    if admin.email:
        if not validation.email_validations(admin.email):
            errorhandler(400, "Invalid email")
    if admin.phone_number:
        if not validation.phoneNumber_validation(admin.phone_number):
            errorhandler(400,"Invalid phone number")
    if admin.password:
        if not validation.password_validation(admin.password):
            errorhandler(400, "Password should contain 8 character, atleast 1 uppercase letter, atleast 1 lowercase letter, atleast 1 symbol")
    return updateadminService(db,admin_id,admin)

def signOutController(db,Auth_head,id):
            db_admin = db.query(Admin).filter(Admin.admin_id == id).first()
            db_token = db.query(AdminToken).filter(AdminToken.admin_id == db_admin.admin_id).first()
            if db_token == None:
                  errorhandler(400,"token is expired")
            if validation.User_delete_validation(db_admin):
                  errorhandler(404,"User not found")   

            return signOutService(db, db_admin,db_token)

def deleteadminController(db,Auth_head,id):
            db_admin = db.query(Admin).filter(Admin.admin_id == id).first()
            db_token = db.query(AdminToken).filter(AdminToken.admin_id == db_admin.admin_id).first()
            if db_token == None:
                  errorhandler(400,"token is expired")
            if validation.User_delete_validation(db_admin):
                  errorhandler(404,"User not found")   

            return deleteadminService(db, db_admin,db_token)
