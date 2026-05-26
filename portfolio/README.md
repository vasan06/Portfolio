# Keerthivasan R — 3D Portfolio

A cinematic, 3D portfolio built with Flask + Three.js.

## Features
- Three.js 3D animated background (particles, torus, icosahedron, grid)
- 3D orbiting skills constellation
- Scroll-driven storytelling (scene by scene)
- Custom cursor
- Typing effect hero
- Project cards with mouse-glow effect
- Animated stat counters
- Fully responsive

## Local Run
```bash
pip install flask
python app.py
# Visit http://localhost:5000
```

## Deploy to a Custom Domain

### Option 1: Railway (Free tier, easiest)
1. Push to GitHub
2. Go to railway.app → New Project → Deploy from GitHub
3. Railway auto-detects Flask
4. Add custom domain in Settings → Domains

### Option 2: Render (Free tier)
1. Push to GitHub
2. Go to render.com → New Web Service → Connect repo
3. Build command: `pip install -r requirements.txt`
4. Start command: `gunicorn app:app`
5. Add custom domain in Settings

### Option 3: VPS (Full control)
```bash
# On your server (Ubuntu)
sudo apt install python3-pip nginx
pip install gunicorn flask
gunicorn -w 4 -b 0.0.0.0:8000 app:app

# Nginx config: proxy_pass http://127.0.0.1:8000;
# Add SSL with: sudo certbot --nginx -d yourdomain.com
```

### Custom Domain (any provider)
1. Buy domain from Namecheap / Google Domains / Porkbun
2. Point A record to your server IP
3. Or use CNAME for Railway/Render

## File Structure
```
portfolio/
├── app.py              # Flask backend
├── requirements.txt
├── templates/
│   └── index.html      # Main HTML
└── static/
    ├── css/style.css   # All styles
    └── js/main.js      # Three.js + animations
```
