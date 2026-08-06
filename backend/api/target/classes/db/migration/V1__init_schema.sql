CREATE TABLE IF NOT EXISTS research_items (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS research_articles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL,
    author VARCHAR(150) NOT NULL,
    content TEXT NOT NULL,
    version VARCHAR(20) DEFAULT 'v1.0',
    scheduled_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS lab_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Initial Data
INSERT INTO research_items (title, description, category, status) VALUES 
('Quantum Lattice Cryptography', 'Fault-tolerant quantum key distribution protocols.', 'Quantum Computing', 'Active'),
('Multimodal Space Telemetry', 'Real-time attention neural networks for deep space probes.', 'Artificial Intelligence', 'Active');
