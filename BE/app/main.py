from fastapi import FastAPI
from app.route import register_routes
from app.database.base import Base
from app.database.session import engine

app = FastAPI()

# # Auto migrate table
# Base.metadata.create_all(bind=engine)

# Register router
register_routes(app)
