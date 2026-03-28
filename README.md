# MEAN Stack Auth

A full-stack authentication system built with the MEAN stack (MongoDB, Express, Angular, Node.js). Signup, login, JWT-protected routes, and email notifications — all wired together in a monorepo.

Built this while learning full-stack development to understand how authentication flows work end-to-end: password hashing, token generation, route guards, and HTTP interceptors.

## What it does

- **Sign Up** — Create an account with name, email, password. Password gets hashed with bcrypt before hitting MongoDB. A welcome email fires via Nodemailer.
- **Sign In** — Authenticate with Passport.js local strategy. Returns a JWT token (10 min expiry).
- **Protected Profile** — Angular route guard checks the token before letting you view your profile. An HTTP interceptor auto-attaches the JWT to every request.
- **Logout** — Clears the token from localStorage and redirects to login.

## Tech Stack

**Frontend** — Angular 6, TypeScript, RxJS, Angular Forms, Angular Router

**Backend** — Node.js, Express, MongoDB + Mongoose, Passport.js, bcryptjs, jsonwebtoken, Nodemailer

**CI** — CircleCI

## Project Structure

```
MEAN/
├── client/                  # Angular 6 SPA
│   └── src/app/
│       ├── auth/            # Route guard + HTTP interceptor
│       ├── shared/          # User model + API service
│       ├── user/            # Sign-up and sign-in components
│       └── user-profile/    # Protected profile page
│
└── server/                  # Express API
    ├── config/              # Environment config + JWT helper + Passport setup
    ├── models/              # Mongoose User schema (bcrypt + JWT methods)
    ├── controllers/         # Register, authenticate, profile handlers
    └── routes/              # API route definitions
```

## API Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/api/register` | Public | Create user, hash password, send welcome email |
| POST | `/api/authenticate` | Public | Login, returns JWT token |
| GET | `/api/userProfile` | JWT required | Get logged-in user's name and email |

## How to Run

**Prerequisites:** Node.js 10+, MongoDB running on `localhost:27017`

```bash
# Backend
cd server
npm install
cp .env.example .env        # Edit with your values
npm start                    # Runs on http://localhost:3000

# Frontend (separate terminal)
cd client
npm install
npm start                    # Runs on http://localhost:4200
```

## Environment Variables

Copy `server/.env.example` to `server/.env` and fill in your values:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/mean-auth-db
JWT_SECRET=your-secret-key
JWT_EXP=10m
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## How Auth Works

```
Sign Up:
  Client form → POST /api/register → bcrypt hash → MongoDB save → Nodemailer email

Sign In:
  Client form → POST /api/authenticate → Passport local strategy
    → bcrypt compare → JWT sign → token returned to client → stored in localStorage

Protected Route:
  Client navigates to /userprofile → AuthGuard checks token expiry
    → HTTP Interceptor adds Bearer token → GET /api/userProfile → profile rendered
```

## Note

This was a learning project built to understand MEAN stack authentication patterns. The Angular version (6) is outdated but the patterns — JWT flow, bcrypt hashing, route guards, HTTP interceptors — are still the same concepts used in modern Angular apps.
