# GUS Research Lab — Full-Stack Application & CMS

Enterprise full-stack research laboratory platform featuring a dynamic React frontend, Spring Boot 3.2 REST API backend, Admin Content Management System (CMS), role-based security, audit logging, and containerized deployment options.

---

## 🏛️ System Architecture

```text
                    GUS RESEARCH LAB
                           |
                    Public Website
                           |
                    ┌──────┴──────┐
                    │   Frontend  │
                    │ React / Vite│
                    └──────┬──────┘
                           |
                         REST
                           |
                    ┌──────┴──────┐
                    │ Spring Boot │
                    │    API      │
                    └──────┬──────┘
                           |
              ┌────────────┼────────────┐
              │            │            │
           Projects    Site Config    Admins
              │            │            │
              └────────────┼────────────┘
                           |
                       Database
                (H2 Local / PostgreSQL)
```

---

## 🔌 Configured Application Ports

| Service | Protocol | Local / Native Port | Container Port | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **Frontend** | HTTP | `5173` (Dev) / `80` (Prod) | `80` | Web UI & Nginx Reverse Proxy |
| **Spring Boot API** | HTTP | `8080` | `8080` | Core REST APIs & Admin CMS |
| **PostgreSQL DB** | TCP | `5432` | `5432` | Enterprise Relational Database |

---

## 🚀 Execution Modes

### Mode A — Native Local Development (Without Docker)

#### Terminal 1 — Spring Boot Backend
```bash
cd backend/api
mvn spring-boot:run
```
*Or using the Maven wrapper:*
```bash
cd backend/api
./mvnw spring-boot:run
```
- Backend starts at: `http://localhost:8080`
- Actuator Health Endpoint: `http://localhost:8080/actuator/health`
- H2 Database Console: `http://localhost:8080/h2-console`

#### Terminal 2 — Vite / React Frontend
```bash
cd frontend
npm install
npm run dev
```
- Frontend dev server starts at: `http://localhost:5173`

---

### Mode B — Dockerized Production Execution (Docker Compose)

Launch the complete containerized stack (Frontend, Backend, PostgreSQL) with a single command:

```bash
docker compose up --build
```

#### Stopping the Stack:
```bash
docker compose down
```

- Public Website: `http://localhost`
- Admin CMS Panel: `http://localhost/admin`
- Backend API via Proxy: `http://localhost/api`
- Actuator Health Check: `http://localhost/actuator/health`

---

## ⚙️ Environment Variables

The application is fully configurable via environment variables without hardcoded secrets. Copy `.env.example` to `.env` to customize settings:

```bash
cp .env.example .env
```

### Key Environment Variables:

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `SPRING_DATASOURCE_URL` | `jdbc:postgresql://postgres:5432/guslab` | Database connection URL |
| `SPRING_DATASOURCE_USERNAME` | `postgres` | Database username |
| `SPRING_DATASOURCE_PASSWORD` | `postgrespassword` | Database password |
| `JWT_SECRET` | *Configured in env* | 256-bit key for signing Admin JWT tokens |
| `CORS_ALLOWED_ORIGINS` | `http://localhost:5173,http://localhost:80` | Allowed cross-origin domains |
| `VITE_API_BASE_URL` | `/api` | Base URL for frontend REST API requests |

---

## 🔬 Admin Credentials

- **Super Admin Email / Username**: `paresh.mishra23@gmail.com`
- **Password**: `GulluMishra23*`

---

## 🛠️ Build & Verification Commands

### Backend Verification:
```bash
cd backend/api
mvn test
mvn package -DskipTests
```

### Frontend Verification:
```bash
cd frontend
npm install
npm run build
```
