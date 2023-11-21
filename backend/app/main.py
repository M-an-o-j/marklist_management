from configuration.config import *
from api.admin.admin_router import *
from api.teacher.teacher_router import *
from api.student.student_router import *
from api.marklist.marklist_router import *
import uvicorn

Base.metadata.create_all(bind=engine)
router.mount('/api/v1', router )

router.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

if __name__ == '__main__':
    uvicorn.run("main:router", host="localhost",port=5001, reload=True)