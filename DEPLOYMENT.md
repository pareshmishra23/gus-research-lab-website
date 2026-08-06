# GUS Research Lab - Permanent Deployment & Hosting Guide

This guide outlines how to deploy the GUS Research Lab website and RAG Knowledge Platform permanently for production use.

## Architecture Overview
- **Frontend**: React 18 + Vite + Tailwind CSS (Single Page Application, easily hosted on Vercel, Netlify, AWS S3 + CloudFront, or Nginx).
- **Backend**: Spring Boot 3.2 REST API with PostgreSQL and pgvector for RAG vector search.
- **Containerization**: Multi-stage Dockerfiles and `docker-compose.yml` for automated orchestration.

---

## Option 1: Permanent Cloud Deployment via Docker Compose (Recommended)

1. Provision a Cloud VM (AWS EC2, DigitalOcean Droplet, GCP Compute Engine) with Docker and Docker Compose installed.
2. Clone your repository:
   ```bash
   git clone https://github.com/pareshmishra23/gus-research-lab-website.git
   cd gus-research-lab-website
   ```
3. Configure environment variables in `docker-compose.yml` or a `.env` file (Database credentials, OpenAI API key, etc.).
4. Start the stack in daemon mode:
   ```bash
   docker compose up -d --build
   ```
5. Configure an Nginx reverse proxy with SSL (Let's Encrypt Certbot) for domain mapping (e.g. `https://guslab.org`).

---

## Option 2: Static Frontend + Managed Backend

1. **Frontend Hosting (Vercel / Netlify)**:
   - Connect your GitHub repository (`gus-research-lab-website`).
   - Build command: `npm run build`
   - Output directory: `dist`
2. **Backend Hosting (Render / AWS ECS / Railway)**:
   - Deploy the Spring Boot application from `backend/api`.
   - Provision a managed PostgreSQL instance with the `vector` extension enabled.
   - Set environment variables (`SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD`).
