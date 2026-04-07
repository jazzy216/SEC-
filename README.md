# Sec+ Lab — Security+ SY0-701 Study Platform

A React + Vite study app for CompTIA Security+ with AI-powered features.

## Features
- 📚 **Flashcards** — 24 cards across all 5 exam domains, with mastery tracking
- ✅ **Quiz** — 8 scenario-based questions with explanations and score tracking
- 🤖 **AI Chat Tutor** — Ask anything about Security+ concepts (powered by Claude)
- ⚡ **AI Question Generator** — Generate unlimited practice questions by domain & difficulty

## Setup

### 1. Clone and install
```bash
git clone https://github.com/YOUR_USERNAME/secplus-lab.git
cd secplus-lab
npm install
```

### 2. Run locally
```bash
npm run dev
```
Open http://localhost:5173

### 3. Build for production
```bash
npm run build
```

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Vercel auto-detects Vite — **no config needed**
4. Click Deploy

That's it. Vercel handles the build automatically.

## Expanding Later
The app is built to expand — add more domains, questions, or flashcards in `src/data/secplus.js`. Future cert modules (CySA+, etc.) can be added as new data files and views.

## Tech Stack
- React 18 + Vite 5
- Lucide React (icons)
- Claude AI API (AI Tutor + Question Generator)
- Zero external CSS frameworks — custom design system
