from datetime import datetime
from fastapi import FastAPI
from app.route import register_routes
from fastapi.middleware.cors import CORSMiddleware
from app.auth_middleware import AuthMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(AuthMiddleware)

# # Auto migrate table
# Base.metadata.create_all(bind=engine)

# Register router
register_routes(app)

# # Mô hình công việc
# class Job(BaseModel):
#     title: str
#     endDate: datetime
#     status: str

# app = FastAPI()

# jobs_db: List[Job] = []

# # Hàm kiểm tra và cập nhật trạng thái công việc
# def update_job_status():
#     now = datetime.now()
#     for job in jobs_db:
#         if job.endDate < now and job.status != "Expired":
#             job.status = "Expired"
#             print(f"Job {job.title} status updated to Expired.")

# # Cấu hình scheduler
# scheduler = BackgroundScheduler()
# scheduler.add_job(update_job_status, IntervalTrigger(minutes=60))  # Chạy mỗi giờ
# scheduler.start()

# @app.on_event("startup")
# async def startup():
#     # Đảm bảo scheduler bắt đầu khi ứng dụng FastAPI khởi chạy
#     print("Scheduler started.")

# @app.on_event("shutdown")
# async def shutdown():
    # scheduler.shutdown()
