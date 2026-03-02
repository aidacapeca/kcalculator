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

## Start the project 
Build and start containers: 
`docker compose up --build` 

This will 
* Build the FastAPI container 
* Start PostgreSQL 
* Create the database 
* Create tables automatically using SQLAlchemy 

_At this point the DB will be empty unless you restore the dump_ 

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
