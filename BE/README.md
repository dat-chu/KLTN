# Project Documentation

## Running the Application with Docker

This project uses Docker to run both the FastAPI application and PostgreSQL database. Follow the steps below to start, stop, and remove the Docker containers.

### **How to Run**

To start the application and database containers, run the following command:

```bash
docker-compose up -d
```

This will build and start the containers in the background.

The application will be accessible at http://localhost:8000.

The PostgreSQL database will be running on port 5432.


### **Running Migrations with Alembic**

Alembic is used for database migrations in this project. Follow these steps to run the migrations.

#### **Create a New Migration**

```bash
alembic revision --autogenerate -m "Migration message"
```

This command will generate a new migration file in the alembic/versions directory.

Be sure to update the message in -m with a relevant description of your changes.

#### **Run a New Migration**

To apply the migrations to the database, run:

```bash
alembic upgrade head
```

This will apply all migrations up to the most recent one (head).
