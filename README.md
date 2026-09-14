# GUS Research Lab — Oracle Cloud Production & Full-Stack CMS

Enterprise full-stack research laboratory platform featuring a dynamic React frontend, Spring Boot 3.2 REST API backend, Admin Content Management System (CMS), role-based security, audit logging, dedicated Nginx edge reverse-proxy with SSL termination (Let's Encrypt), domain routing for GUS Research Lab & Kundali, complete internal port isolation, and H2/PostgreSQL database support.

---

## 🏛️ System Architecture

```text
                  PUBLIC INTERNET (Ports 80 & 443 ONLY)
                                     │
                                     ▼
        ┌────────────────────────────────────────────────────────┐
        │            Nginx Edge Reverse Proxy (proxy)            │
        │               Ports 80 (HTTP) & 443 (HTTPS)            │
        └────────────────────────────┬───────────────────────────┘
                                     │
           Private Docker Network (gus-network — Isolated Internal Ports)
                                     │
          ┌──────────────────────────┼──────────────────────────┐
          │                          │                          │
          ▼                          ▼                          ▼
 ┌─────────────────┐        ┌─────────────────┐        ┌─────────────────┐
 │  gus_frontend   │        │   gus_backend   │        │   gus_kundali   │
 │   React App     │        │ Spring Boot API │        │   Kundali App   │
 │ (Internal :80)  │        │ (Internal :8080)│        │ (Internal :8001)│
 └─────────────────┘        └────────┬────────┘        └─────────────────┘
                                     │
                                     ▼
                            ┌─────────────────┐
                            │  Database Layer │
                            │ Persistent H2 / │
                            │   PostgreSQL    │
                            └─────────────────┘
```

---

## 🌐 Domain & Service Routing

| Public Domain Name | SSL Cert | Internal Target Service | Purpose |
| :--- | :--- | :--- | :--- |
| **`https://gusresearchlab.is-a.bot`** | Let's Encrypt | `frontend:80` (App) / `backend:8080` (`/api`) | GUS Research Lab Public Web & Admin CMS |
| **`https://kundali.gusresearchlab.is-a.bot`** | Let's Encrypt | `kundali:8001` | Kundali Application Service |
| **HTTP (`http://*`)** | N/A | Redirects to `301 https://$host$request_uri` | Automatic HTTP to HTTPS redirection |

---

## 🔒 Security & Port Isolation Map

| Container Service | Public Host Ports | Internal Docker Network Port | Public Access |
| :--- | :--- | :--- | :--- |
| **`proxy` (Nginx)** | **`80:80`**, **`443:443`** | `80`, `443` | ✅ **Exposed to Internet** |
| **`frontend`** | *None* | `80` | 🔒 Private to `gus-network` |
| **`backend`** | *None* | `8080` | 🔒 Private to `gus-network` |
| **`kundali`** | *None* | `8001` | 🔒 Private to `gus-network` |
| **`postgres`** | *None* | `5432` | 🔒 Private to `gus-network` |

---

## 🚀 Oracle Cloud Production Deployment

### 1. Initial Setup on Oracle VM
Clone repository and prepare environment configuration:
```bash
cp .env.example .env
```

### 2. Issue Let's Encrypt SSL Certificates
Run the automated SSL bootstrap script to issue Let's Encrypt certificates for `gusresearchlab.is-a.bot` and `kundali.gusresearchlab.is-a.bot`:
```bash
./scripts/init-letsencrypt.sh paresh.mishra23@gmail.com
```

### 3. Launch Production Stack
```bash
docker compose up -d --build
```

---

## 💻 Local Development Execution Modes

### Mode A — Single Command Native Launcher (Recommended for Mac)
```bash
./start-native.sh
```
- **Frontend App**: `http://localhost:5173`
- **Admin Panel**: `http://localhost:5173/admin`
- **Spring Boot API**: `http://localhost:8080/api`
- **Health Check**: `http://localhost:8080/actuator/health`

---

### Mode B — Docker Compose Local Development (Mac)
When running locally on Mac, `docker-compose.override.yml` maps local ports for developer debugging:
```bash
docker compose up --build
```
- **Frontend**: `http://localhost`
- **Backend API**: `http://localhost:8080/api`

---

## ⚙️ Environment Configuration

The backend defaults to persistent H2 file storage (`jdbc:h2:file:/app/data/guslabdb`) out of the box without requiring any explicit Spring Profile (`--spring.profiles.active`).

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `SPRING_DATASOURCE_URL` | `jdbc:h2:file:/app/data/guslabdb;...` | H2 persistent file storage (or Postgres URL) |
| `JWT_SECRET` | *Configured in env* | 256-bit key for signing Admin JWT tokens |
| `CORS_ALLOWED_ORIGINS` | `https://gusresearchlab.is-a.bot,...` | Allowed production CORS domains |
| `VITE_API_BASE_URL` | `/api` | Base URL for frontend REST requests |

---

## 🔬 Admin Credentials

- **Super Admin Email / Username**: `paresh.mishra23@gmail.com`
- **Password**: `GulluMishra23*`
