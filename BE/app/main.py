from fastapi import FastAPI
from app.route import register_routes
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# # Auto migrate table
# Base.metadata.create_all(bind=engine)

# Register router
register_routes(app)
