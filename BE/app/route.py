import importlib
import pkgutil
import os

from fastapi import FastAPI
from app import views  # import folder views

def register_routes(app: FastAPI):
    package_dir = os.path.dirname(views.__file__)

    for (_, module_name, _) in pkgutil.iter_modules([package_dir]):
        module = importlib.import_module(f"app.views.{module_name}")

        if hasattr(module, "router"):
            app.include_router(module.router)
