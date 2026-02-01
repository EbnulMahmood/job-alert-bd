# BD Job Alert

A Progressive Web App (PWA) that monitors tech job openings from top Bangladesh companies and sends daily notifications.

## Features

- **Job Monitoring**: Automatically scrapes job listings from 10 top tech companies
- **Push Notifications**: Get instant alerts when new jobs are posted
- **Email Digests**: Daily/weekly email summaries of new openings
- **Interview Preparation**: Built-in guide with company-specific tips
- **PWA Support**: Install on mobile devices, works offline

## Companies Monitored

| Private Sector | Government |
|---------------|------------|
| Cefalo | Bangladesh Bank |
| Kaz Software | a2i |
| SELISE | |
| Enosis Solutions | |
| BJIT | |
| Samsung R&D | |
| Therap BD | |
| Brain Station 23 | |

## Tech Stack

- **Frontend**: React + TypeScript + Vite (PWA)
- **Backend**: FastAPI (Python)
- **Database**: PostgreSQL (Supabase)
- **Cron Jobs**: GitHub Actions
- **Hosting**: Vercel (Frontend) + Railway (Backend)

## Project Structure

```
job-alert-bd/
├── backend/
│   ├── scrapers/          # Company-specific scrapers
│   ├── api/               # FastAPI routes and models
│   ├── services/          # Notification services
│   ├── database/          # Database connection
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom hooks
│   │   └── services/      # API client
│   ├── public/
│   └── package.json
└── .github/workflows/     # CI/CD pipelines
```

## Quick Start

### Prerequisites

- Python 3.11+
- Node.js 20+
- PostgreSQL database (or Supabase account)

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run the server
uvicorn api.main:app --reload
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Run Scraper Manually

```bash
cd backend
python run_scraper.py
```

## Deployment

### 1. Database (Supabase - Free)

1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Copy the connection string to `DATABASE_URL`

### 2. Backend (Railway - Free Tier)

1. Create account at [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Set environment variables
4. Deploy!

### 3. Frontend (Vercel - Free)

1. Create account at [vercel.com](https://vercel.com)
2. Import the repository
3. Set root directory to `frontend`
4. Deploy!

### 4. GitHub Actions (Free)

Add these secrets to your repository:

- `DATABASE_URL` - PostgreSQL connection string
- `VAPID_PUBLIC_KEY` - Web Push public key
- `VAPID_PRIVATE_KEY` - Web Push private key
- `VAPID_SUBJECT` - mailto:your-email@example.com
- `RESEND_API_KEY` - (Optional) For email notifications
- `RAILWAY_TOKEN` - Railway deployment token
- `VERCEL_TOKEN` - Vercel deployment token
- `VERCEL_ORG_ID` - Vercel organization ID
- `VERCEL_PROJECT_ID` - Vercel project ID

## Generate VAPID Keys

```bash
npx web-push generate-vapid-keys
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/jobs/` | GET | List jobs with filters |
| `/api/jobs/{id}` | GET | Get job details |
| `/api/jobs/companies` | GET | List companies with job counts |
| `/api/jobs/stats` | GET | Get job statistics |
| `/api/subscriptions/` | POST | Create subscription |
| `/api/subscriptions/{id}` | PUT | Update subscription |
| `/api/notifications/vapid-public-key` | GET | Get VAPID public key |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License
