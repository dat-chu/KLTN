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
