# BlockseBlock: Blockchain & Web3 Education Platform

## Overview
BlockseBlock is a comprehensive education platform designed to empower users with blockchain and Web3 knowledge. It features interactive courses, video content, and hackathons, leveraging the DFINITY Internet Computer for a decentralized backend and a modern React-based frontend.

## Vision
BlockseBlock envisions a world where blockchain and Web3 education is accessible, practical, and community-driven. Our goal is to:
- Democratize access to high-quality blockchain and Web3 learning resources.
- Bridge the gap between traditional education and emerging decentralized technologies.
- Foster a global community of learners, educators, and innovators.
- Empower users to participate in the decentralized economy through hands-on courses, hackathons, and real-world projects.
- Inspire the next generation of blockchain developers, entrepreneurs, and thought leaders.

---

## Main Features

### 1. User Management
- Register, update, and list users
- Role-based access: student, instructor, admin

### 2. Course Management
- Create, update, delete, and list blockchain/web3 courses
- Assign instructors and manage lessons

### 3. Video Management
- Upload, update, delete, and list educational videos
- Video storage via AWS S3, Cloudflare R2, or Google Cloud Storage (configurable)
- Video upload and streaming endpoints

### 4. Hackathon Management
- Create, update, delete, and list hackathons
- Register for hackathons and submit entries

### 5. Authentication
- Secure login via Internet Identity (ICP)
- Role-based navigation and access

### 6. Token Rewards
- Track and display user token rewards for course and hackathon participation

### 7. Modern UI
- React-based SPA with navigation for Home, Courses, Hackathons, Resources, Profile, and Admin Panel

---

## Project Structure
```
Capstone-Project/
├── src/
│   ├── Capstone-Project-backend/   # DFINITY Rust canister backend
│   └── Capstone-Project-frontend/  # React frontend & Node/Express API
├── dfx.json                        # DFINITY canister config
├── package.json                    # Project scripts
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js >= 16, npm >= 7
- DFINITY SDK (`dfx`)

### 1. Start the DFINITY Backend
```bash
# In project root
$ dfx start
# (Enter your identity passphrase if prompted)
$ dfx deploy
```

### 2. Start the Frontend & API Server
```bash
$ cd src/Capstone-Project-frontend/app
$ npm install
$ npm run dev
```
- Frontend: http://localhost:3000
- API server: http://localhost:3001

---

## API Endpoints
- `POST /api/upload-video` — Upload a new video
- `GET /api/videos` — List all videos
- `GET /api/health` — Health check

---

## Environment Variables
For video storage (AWS S3, Cloudflare R2, etc.), configure your `.env` as needed. See `backend-setup.md` for details.

---

## License
MIT

---

## Authors
BlockseBlock Team
