February, 27th, 2026 

# kcalculator
A simple FastAPI-based backend service to manage foods and their nutritional information (calories per 100g).
The project runs with Docker and PostgreSQL.

## Tech Stack
- **Python 3.11** (Runs inside Docker container)
- **FastAPI:**  Web framework
- **PostgreSQL:**  Database
- **SQLAlchemy:** ORM
- **Pydantic:** Data validation
- **Docker & Docker Compose:** Containerization
- **React:** 


## Technical Requirements 
Make sure you have the following installed o your machine: 
- Git 
- Docker 
- Docker Compose (v2+ recommended)
_⚠ You do NOT need Python installed locally unless you want to run the project without Docker._ 

### Check versions: 
```
docker --version
docker compose version
git --version
```

## Clone the repository 
```
git clone <url>
cd kcalculator 
```
## Start the Project

### Quick Start:
To quickly start the project, run the following command in the root directory (`kcalculator`):
```
npm run start
```
This command will:
- Initialize an empty database.
- Launch the API server (using Docker containers).
- Start the mobile application.

### Step-by-Step Guide:
If you prefer a more detailed approach, follow these steps:

1. Build and start the Docker containers:
    ```
    docker compose up --build
    ```
    This process will:
    - Build the FastAPI container.
    - Start the PostgreSQL database server.
    - Automatically create the database and tables using SQLAlchemy.

_⚠ Note: The database will be empty unless you restore it using a dump file._

### Start the project with existing data (using dump.sql )
1. Start containers as usual with `docker compose up --build` _(you can check is running properly using `docker ps`)_ 
2. Restore the database 
```
docker exec -i calories_postgres \
psql -U calories_user -d calories_db < dump.sql
``` 

## Access the API 
* [Base URL](http://localhost:8000)
* [Swagger Documentation](http://localhost:8000/docs)

## Stop the project 
1. Stop containers `docker compose down` 


# TBD: 
1. Instructions of how to close the project and include new data by exporting dump
