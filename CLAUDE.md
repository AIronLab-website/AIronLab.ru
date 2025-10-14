# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AIronLab.ru is a monorepo containing a Next.js frontend and Node.js backend for an AI solutions company website. The project uses Docker for deployment with Traefik as a reverse proxy.

## Repository Structure

- `/frontend` - Next.js 14 frontend application (TypeScript, Tailwind CSS, shadcn/ui)
- `/backend` - Express.js email backend service
- `/docs` - Project documentation and markdown files for reference
- `/.cursor/rules` - Cursor IDE agent-specific rules and guidelines
- `/traefik` - Traefik reverse proxy configuration
- `docker-compose.yml` - Production deployment configuration

**Important:** Always reference documentation in `docs/` directory when generating code. Use guidelines from:
- `docs/backend.md` for backend work
- `docs/frontend.md` for frontend work
- `docs/design.md` for design work
- `docs/QA.md` for QA work
- `docs/devops.md` for devops work
- `docs/AI-development.md` for AI development

## Common Commands

### Frontend Development (in `/frontend`)
```bash
npm install          # Install dependencies
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Backend Development (in `/backend`)
```bash
npm install          # Install dependencies
npm run dev          # Start with nodemon (auto-reload)
npm start            # Start production server
```

### Docker Deployment
```bash
# Build and start all services
docker compose up --build -d

# Stop all services
docker compose down

# View logs
docker compose logs -f

# Check container status
docker compose ps
```

### Full Deployment (on server)
```bash
ssh root@45.144.220.239
cd ~/project/AIronLab.ru
git pull origin main
docker compose down
docker compose up --build -d
```

## Architecture & Key Patterns

### Frontend Architecture

**Framework:** Next.js 14 with App Router (not Pages Router)

**Directory Structure:**
- `src/app/` - Next.js App Router pages and layouts
- `src/components/` - React components organized by:
  - `layout/` - Header, Footer, Logo components
  - `sections/` - Page sections (Hero, Services, Contact, etc.)
  - `ui/` - Reusable UI components (shadcn/ui based)
  - `analytics/` - Analytics components (Yandex Metrika)
- `src/hooks/` - Custom React hooks
- `src/lib/` - Utility functions
- `src/types/` - TypeScript type definitions

**Key Features:**
- Custom Calleo font loaded locally from `/public/fonts/`
- Glass morphism design with Tailwind CSS
- Yandex Metrika integration with custom components
- Sentry error tracking configured
- SEO metadata in layout.tsx

**Important Configuration:**
- `next.config.mjs` - ESLint and TypeScript errors ignored during builds, Sentry integration configured
- Build errors are suppressed to allow deployment even with type errors

### Backend Architecture

**Framework:** Express.js with REST API

**Structure:**
- `server.js` - Main entry point
- `routes/` - API route handlers
- `middleware/` - Error handling and other middleware
- `validation/` - Joi validation schemas
- `templates/` - Email HTML templates
- `config/` - Configuration files
- `utils/` - Logger and utilities

**Key Features:**
- SMTP email service using reg.ru hosting
- Rate limiting (5 requests per 15 minutes by IP)
- Request validation with Joi
- Winston logging
- CORS protection
- Contact form API endpoint

**API Endpoints:**
- `POST /api/email/contact` - Submit contact form
- `GET /api/email/status` - Check email service status
- `GET /api/email/test` - Test email (development only)
- `GET /health` - Health check

### Docker Architecture

**Services:**
1. **traefik** (reverse-proxy) - Handles routing and SSL certificates
   - Ports: 80 (HTTP), 443 (HTTPS)
   - Auto-generates Let's Encrypt certificates
   - Routes requests to frontend and backend based on path

2. **frontend** - Next.js application
   - Internal port: 3000
   - Serves all requests to `aironlab.ru`

3. **backend** - Express.js API
   - Internal port: 3001
   - Serves requests to `aironlab.ru/api/*`

**Deployment Flow:**
- Traefik listens on ports 80/443
- Frontend handles all traffic to `aironlab.ru`
- Backend handles traffic to `aironlab.ru/api/*`
- SSL certificates managed automatically by Traefik

### Environment Variables

**Frontend** (`.env.local` or container env):
- `NEXT_PUBLIC_SENTRY_DSN` - Sentry error tracking
- `SENTRY_DSN` - Sentry DSN for server-side
- `NEXT_PUBLIC_GA_ID` - Google Analytics (optional)
- `NEXT_PUBLIC_YM_ID` - Yandex Metrika (optional)

**Backend** (`.env` in `/backend`):
- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)
- `SMTP_HOST` - mail.hosting.reg.ru
- `SMTP_PORT` - 465
- `SMTP_SECURE` - true
- `SMTP_USER` - info@aironlab.ru
- `SMTP_PASS` - Email password
- `EMAIL_TO` - Recipient email
- `EMAIL_FROM` - Sender email
- `FRONTEND_URL` - Frontend URL for CORS
- `RATE_LIMIT_WINDOW_MS` - Rate limit window
- `RATE_LIMIT_MAX_REQUESTS` - Max requests per window

## Testing

### Backend Testing
```bash
# In /backend directory
curl http://localhost:3001/health              # Health check
curl http://localhost:3001/api/email/status    # Email service status
curl http://localhost:3001/api/email/test      # Test email (dev only)

# Test contact form
curl -X POST http://localhost:3001/api/email/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Test","agreement":true}'
```

## Important Notes

- **Build Configuration:** Frontend builds ignore TypeScript and ESLint errors (configured in next.config.mjs)
- **Font Loading:** Calleo font is loaded locally, not from external CDN
- **Analytics:** Yandex Metrika requires specific component structure to avoid hydration issues
- **Email Service:** Backend uses reg.ru SMTP with specific SSL configuration
- **Git Branch:** Main branch is `main`
- **Working Directory:** `/Users/sasha/Library/Mobile Documents/com~apple~CloudDocs/AIronLab/Cursor/AIronLab.ru`

## Recent Changes

Based on recent commits:
- Sentry integration added for error tracking
- Yandex Metrika integration and configuration enhanced
- MetrikaPageView component refactored for cleaner dependencies
