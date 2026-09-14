# GUS Research Lab — Oracle Cloud Production & Full-Stack CMS

Enterprise full-stack research laboratory platform featuring a dynamic React frontend, Spring Boot 3.2 REST API backend, Admin Content Management System (CMS), role-based security, audit logging, host Nginx integration, domain routing for GUS Research Lab & Kundali, complete internal port isolation, and PostgreSQL 15 / H2 database support.

---

## 🏛️ System Architecture

```text
                  PUBLIC INTERNET (Host Nginx Ports 80 & 443)
                                      │
                                      ▼
        ┌────────────────────────────────────────────────────────┐
        │                 Oracle Host Nginx                      │
        │               Ports 80 (HTTP) & 443 (HTTPS)            │
        └───────────────┬────────────────────────┬───────────────┘
                        │                        │
         Proxy to 127.0.0.1:8081                 │ Proxy to 127.0.0.1:7860
                        │                        │
                        ▼                        ▼
     ┌────────────────────────────────────┐    ┌──────────────────────────────────┐
     │ GUS Docker Frontend Container      │    │ Existing Host Kundali / Camel ADK│
     │ Bound ONLY to 127.0.0.1:8081       │    │ Service (Port 7860)              │
     └─────────────────┬──────────────────┘    └──────────────────────────────────┘
                       │
            Private Docker Network (gus-network — Internal Ports)
                       │
           ┌───────────┴───────────┐
           │                       │
           ▼                       ▼
  ┌─────────────────┐     ┌─────────────────┐
  │   gus_backend   │ ──► │  gus_postgres   │
  │ Spring Boot API │     │ PostgreSQL 15   │
  │ (Internal :8080)│     │ (Internal :5432)│
  └─────────────────┘     └─────────────────┘
```

---

## 🌐 Domain & Service Routing

| Public Domain Name | SSL Cert | Target Service | Purpose |
| :--- | :--- | :--- | :--- |
| **`https://gusresearchlab.is-a.bot`** | Host Certbot | `127.0.0.1:8081` (GUS Docker Frontend) | GUS Research Lab Public Web & Admin CMS |
| **`https://kundali.gusresearchlab.is-a.bot`** | Host Certbot | `127.0.0.1:7860` (Existing Kundali Service) | Kundali Application Service |
| **HTTP (`http://*`)** | N/A | Redirects to `301 https://$host$request_uri` | Automatic HTTP to HTTPS redirection |

---

## 🔒 Security & Port Isolation Map

| Container Service | Public Host Ports | Bound Interface | Public Access |
| :--- | :--- | :--- | :--- |
| **`frontend`** | `8081` | `127.0.0.1:8081` (Localhost ONLY) | 🔒 Localhost Host Proxy |
| **`backend`** | *None* | Internal to `gus-network` | 🔒 Private Docker Network |
| **`postgres`** | *None* | Internal to `gus-network` | 🔒 Private Docker Network |

---

## 🚀 Oracle Cloud Production Deployment (Host Nginx Integration)

### 1. Initial Setup on Oracle VM
Clone repository and prepare environment configuration:
```bash
cp .env.example .env
```

### 2. Launch Production Docker Stack
```bash
docker compose up -d --build
```
*GUS Frontend will be available locally on `127.0.0.1:8081`.*

### 3. Host Nginx Configuration
Add the host Nginx server block configuration found in [`docs/host-nginx-gusresearchlab.conf`](file:///Users/pareshmishra/Documents/developments/gus-research-lab-website/docs/host-nginx-gusresearchlab.conf) to your host `/etc/nginx/sites-available/` directory. Then reload host Nginx:
```bash
sudo nginx -t && sudo systemctl reload nginx
```

---

## 📱 Samsung M31 Deployment (H2 Persistent Embedded DB)

For Termux / Samsung M31 lightweight deployment without PostgreSQL/Nginx overhead:
```bash
docker compose -f docker-compose.m31.yml up -d --build
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

The backend defaults to **PostgreSQL 15** (`jdbc:postgresql://postgres:5432/guslab`) for Oracle Cloud Production, while supporting persistent H2 for Samsung M31 (`docker-compose.m31.yml`) and local fallback.

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `SPRING_DATASOURCE_URL` | `jdbc:postgresql://postgres:5432/guslab` | PostgreSQL URL (or H2 file URL for M31) |
| `JWT_SECRET` | *Configured in env* | 256-bit key for signing Admin JWT tokens |
| `CORS_ALLOWED_ORIGINS` | `https://gusresearchlab.is-a.bot,...` | Allowed production CORS domains |
| `VITE_API_BASE_URL` | `/api` | Base URL for frontend REST requests |

---

## 🔬 Admin Credentials

- **Super Admin Email / Username**: `paresh.mishra23@gmail.com`
- **Password**: `GulluMishra23*`
