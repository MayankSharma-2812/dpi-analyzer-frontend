# DPI Analyzer

Enterprise-grade **Deep Packet Inspection (DPI) network monitoring platform** with real-time traffic analytics, security threat detection, and a modern dashboard.

![Build](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Version](https://img.shields.io/badge/version-2.0.0-orange)

---

# Overview

DPI Analyzer provides **real-time network visibility and threat monitoring** through deep packet inspection.

It combines a high-performance Python backend with a modern React frontend to deliver powerful analytics and monitoring tools.

The platform is designed for:

- Network administrators
- Security analysts
- DevOps teams
- Enterprise monitoring environments

---

# Features

## Core Capabilities

- Real-time packet capture and inspection
- Deep Packet Inspection (DPI)
- Security threat detection
- Network traffic analytics
- DNS monitoring
- Protocol analysis
- Alert system

## Platform Features

- Production-ready architecture
- Scalable infrastructure
- REST API
- Containerized deployment
- Monitoring and health checks
- High performance traffic analysis

---

# Architecture

```
Frontend (React + TypeScript)
        │
        ▼
Backend API (Flask + Python)
        │
        ▼
Database Layer
PostgreSQL + Redis
```

Components:

Frontend  
React 18 + TypeScript + Vite

Backend  
Flask API + Python 3

Data Layer  
PostgreSQL + Redis

Infrastructure  
Docker + Nginx

---

# Prerequisites

Required software:

- Node.js >= 16
- Python >= 3.8
- PostgreSQL >= 12
- Redis >= 6

Optional:

- Docker >= 20

---

# Quick Start

## Docker Deployment (Recommended)

Clone the repository

```bash
git clone https://github.com/your-username/dpi-analyzer.git
cd dpi-analyzer
```

Start all services

```bash
docker-compose up -d
```

Access services

Frontend  
http://localhost

API  
http://localhost:5000

Grafana  
http://localhost:3001

---

## Manual Setup

### Backend

```bash
cd backend

python3 -m venv venv
source venv/bin/activate

pip install -r requirements.txt

python app_production.py
```

### Frontend

Open a new terminal

```bash
cd frontend

npm install
npm run dev
```

---

# Production Deployment

Make deployment script executable

```bash
chmod +x deploy.sh
```

Run deployment

```bash
sudo ./deploy.sh
```

---

# Project Structure

```
dpi-analyzer
│
├── backend
│   ├── app_production.py
│   ├── analyzer.py
│   ├── config
│   │   ├── logging.py
│   │   └── settings.py
│   ├── utils
│   │   └── error_handlers.py
│   └── Dockerfile
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── hooks
│   │   └── styles.css
│   ├── Dockerfile
│   └── vite.config.prod.ts
│
├── docker-compose.yml
├── deploy.sh
├── DEPLOYMENT.md
└── README.md
```

---

# Configuration

## Backend Environment

Create `.env`

```
NODE_ENV=production
PORT=5000

DATABASE_URL=postgresql://user:pass@localhost:5432/dpi_analyzer
REDIS_URL=redis://localhost:6379

SECRET_KEY=your-secret-key
JWT_SECRET=your-jwt-secret
```

## Frontend Environment

Create `.env.production`

```
VITE_API_BASE_URL=https://your-domain.com/api/v1
VITE_APP_TITLE=DPI Analyzer
VITE_ENABLE_ANALYTICS=true
```

---

# Dashboard Features

Real-time metrics

- Live traffic monitoring
- Security alerts
- Network statistics
- System health indicators

Analytics

- Protocol distribution
- DNS statistics
- Traffic patterns
- Top network talkers

Security

- Threat detection
- Alert timeline
- Risk monitoring
- Event tracking

---

# API Endpoints

| Method | Endpoint | Description |
|------|------|------|
| GET | /api/v1/stats | Network statistics |
| GET | /api/v1/alerts | Security alerts |
| GET | /api/v1/top-talkers | Top communicating hosts |
| GET | /api/v1/dns-domains | DNS domain statistics |
| GET | /api/v1/protocol-signatures | Protocol signatures |
| GET | /health | Health check |

Example Response

```json
{
  "success": true,
  "data": {},
  "timestamp": 1640995200
}
```

---

# Security

Security features include:

- JWT authentication
- Role based access control
- API rate limiting
- CORS protection
- Security headers
- Input validation
- TLS encryption support

---

# Performance

Typical metrics

API response time  
<100 ms

Throughput  
10,000+ requests/sec

Idle memory usage  
<512 MB

CPU usage  
<25% under normal load

Optimizations

- Redis caching
- Connection pooling
- Gzip compression
- Frontend code splitting
- Lazy loading
- CDN ready assets

---

# Monitoring

Health checks

- Application status
- Database connectivity
- Redis availability
- System resources

Logging

- Structured logs
- Error tracking
- Security events
- Performance metrics

---

# Testing

Backend tests

```bash
cd backend
pytest tests
```

Frontend tests

```bash
cd frontend
npm test
```

Integration tests

```bash
npm run test:integration
```

---

# Development Setup

Clone repository

```bash
git clone https://github.com/your-username/dpi-analyzer.git
cd dpi-analyzer
```

Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate

pip install -r requirements.txt
python app.py
```

Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# Code Quality

Tools used

- ESLint
- Prettier
- TypeScript
- Black
- Flake8

---

# Contributing

1. Fork the repository
2. Create a new branch
3. Commit changes
4. Push branch
5. Open a pull request

---

# License

This project is licensed under the MIT License.

See the LICENSE file for details.

---

# Support

Documentation

- Deployment Guide
- API Documentation
- Troubleshooting Guide

Community

- GitHub Issues
- GitHub Discussions
- Project Wiki

Contact

Email  
support@your-domain.com

---

# Roadmap

Version 2.1

- ML based threat detection
- Multi tenant support
- Advanced analytics
- Mobile dashboard

Version 2.2

- SIEM integrations
- Automated responses
- Advanced reporting
- Per user rate limiting

Version 3.0

- Microservices architecture
- Kubernetes operator
- ML traffic classification
- Global deployment support

---

# Acknowledgments

- React
- Flask
- PostgreSQL
- Redis
- Nginx
- Docker

---

DPI Analyzer  
Enterprise network monitoring built for performance, security, and scalability.