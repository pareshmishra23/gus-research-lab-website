# GUS Research Lab Project

This project consists of a React JS frontend and a Spring Boot backend.

## Project Structure

- `frontend/`: React JS application built with Vite and Tailwind CSS.
- `backend/api/`: Spring Boot application providing REST APIs.

## Features

- **Dark Blue Theme**: Professional scientific lab design.
- **Banner**: Eye-catching hero section.
- **Public Page**: Displays all research items and projects.
- **Admin Page**: Add and manage research items.
- **REST API**: Spring Boot backend with H2 in-memory database.

## Getting Started

### Backend (Spring Boot)
1. Navigate to `backend/api/`.
2. Ensure you have Java 17 and Maven installed.
3. Run `./mvnw spring-boot:run` (or use your IDE).
4. The API will be available at `http://localhost:8080/api/items`.

### Frontend (React)
1. Navigate to `frontend/`.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the development server.
4. The website will be available at `http://localhost:5173`.

## Technologies Used

- **Frontend**: React, React Router, Axios, CSS (Dark Blue Theme).
- **Backend**: Spring Boot, Spring Data JPA, H2 Database, Lombok.
