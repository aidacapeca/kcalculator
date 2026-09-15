# kcalculator

Kcalculator is a nutrition app with a FastAPI backend, PostgreSQL database, and an Expo/React Native mobile app. The deployed mobile app uses the public API at `https://kcalculator.onrender.com`.

## Tech Stack
- **Python 3.11** (Runs inside Docker container)
- **FastAPI:**  Web framework
- **PostgreSQL:**  Database
- **SQLAlchemy:** ORM
- **Pydantic:** Data validation
- **Docker & Docker Compose:** Containerization
- **Expo SDK 57 / React Native:** Mobile application


## Requirements

Install the following tools:
- Git 
- Docker 
- Docker Compose v2+
- Node.js 20+ (for the mobile app and EAS CLI)

Python is not required locally when using Docker.

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
## Run the backend locally

From the repository root:
```
docker compose up --build
```

This starts the FastAPI service on port `8000` and PostgreSQL on port `5433`. The database volume is persisted in Docker. The API creates its tables on startup, but the database does not include seed data automatically.

## Access the API 
- Base URL: http://localhost:8000
- Swagger documentation: http://localhost:8000/docs

## Run the mobile app locally

In a second terminal:
```bash
cd kcalculator-mobile
npm install
npm start
```

The mobile app reads `EXPO_PUBLIC_API_URL` from `kcalculator-mobile/.env`. For local development, set it to the reachable API URL, for example:
```env
EXPO_PUBLIC_API_URL=http://localhost:8000
```

When testing on a physical phone, replace `localhost` with the computer's local network IP. The production APK uses `https://kcalculator.onrender.com` through the `preview` EAS profile.

## Build an Android APK

The project is configured in `kcalculator-mobile/eas.json` to produce an installable APK:
```bash
cd kcalculator-mobile
npx eas login
npx eas build --platform android --profile preview
```

EAS builds the APK in the cloud. After the build finishes, use the download link shown by EAS. This APK is for Android; iOS builds require Apple Developer credentials and are distributed through TestFlight or the App Store.

## Stop the backend

```bash
docker compose down
```


## Notes

- Do not commit `.env` files or credentials.
- The root `npm start` script is not the recommended way to run both services: Docker Compose is a long-running process, so start the backend and mobile app in separate terminals.
