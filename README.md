# TeamInnovators-Arangkada
An application that uses a PUV Rental Management System

## Source Code Changes
1. Modified backend's `application.properties`.
2. Imported the [frontend react app source code](https://github.com/faithrosalijos/TeamInnovators-Arangkada-Frontend).
3. Fixed frontend's `Transaction` page `Network Error`.
4. Added `.env` variables.
5. Added `Dockerfiles` for backend and frontend.
6. Added `docker-compose.yml`.
## Dockerization Feature
Pulling from this branch will allow this feature but only if the user have Docker Desktop installed on their computers. See link for installation guide. https://docs.docker.com/desktop/install/windows-install/

## Setup
1. Run Docker Desktop.
2. Open your system's `command prompt/git bash/powershell`.
3. Enter the command:
```
docker-compose up --build
```
4. Then open`localhost:3000` on your browser to finish.