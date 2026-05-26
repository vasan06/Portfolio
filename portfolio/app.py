from flask import Flask, render_template, jsonify

app = Flask(__name__)

PORTFOLIO_DATA = {
    "name": "Keerthivasan R",
    "title": "Software Systems Engineer",
    "location": "Coimbatore, Tamil Nadu",
    "email": "keerthivasan83000@gmail.com",
    "summary": "Motivated and enthusiastic Software Systems student with interest in Python development, software engineering, machine learning, and web development.",
    "skills": {
        "languages": ["Python", "C", "JavaScript"],
        "web": ["HTML", "CSS", "Flask"],
        "ml": ["Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
        "tools": ["Figma", "VS Code", "GitHub", "MongoDB"]
    },
    "projects": [
        {
            "name": "Modelora",
            "subtitle": "Interactive ML Studio",
            "tech": ["Python", "Flask", "MongoDB", "ML"],
            "description": "Full-stack machine learning platform supporting 40+ ML algorithms with dataset upload, preprocessing, visualization, and interactive analytics dashboards.",
            "detail": "Built responsive user/admin dashboard systems with authentication, MongoDB integration, cloud deployment, and real-time workflow management.",
            "icon": "⚡",
            "color": "#00d4ff"
        },
        {
            "name": "Zentail",
            "subtitle": "Veterinary Web Platform",
            "tech": ["Python", "HTML", "CSS", "JS"],
            "description": "Web platform for veterinary services with appointment booking and admin management features.",
            "detail": "Includes modules for managing pet data, clinic listings, and user interactions with a clean, intuitive interface.",
            "icon": "🐾",
            "color": "#7c3aed"
        },
        {
            "name": "Browser Blocker",
            "subtitle": "Productivity Tool",
            "tech": ["Python"],
            "description": "Productivity tool that blocks distracting websites by modifying system host files.",
            "detail": "Helps users maintain focused work sessions by restricting access to predefined domains with simple configuration.",
            "icon": "🛡️",
            "color": "#059669"
        },
        {
            "name": "Voice Emotion Recognition",
            "subtitle": "ML Audio System",
            "tech": ["Python", "ML", "MFCC"],
            "description": "Machine learning model that detects emotional states from speech using MFCC feature extraction.",
            "detail": "Implemented audio preprocessing and neural network classification techniques for accurate emotion detection.",
            "icon": "🎙️",
            "color": "#dc2626"
        },
        {
            "name": "Spotify Downloader",
            "subtitle": "Playlist Automation",
            "tech": ["Python", "Spotify API", "FFmpeg"],
            "description": "Automation tool that converts Spotify playlists into MP3 collections using Spotify API, yt-dlp, and FFmpeg.",
            "detail": "Automates playlist parsing, song search, and audio conversion with efficient batch processing.",
            "icon": "🎵",
            "color": "#1db954"
        }
    ],
    "research": {
        "title": "Quantum Computing's Role in Advancing DevOps Automation and CI/CD Pipelines",
        "journal": "International Journal of Research Publication and Reviews (IJRPR)",
        "volume": "Volume 7, Issue 3, 2026",
        "description": "Co-authored research exploring quantum computing techniques to enhance DevOps automation and CI/CD pipeline optimization."
    },
    "education": {
        "degree": "M.Sc. Software Systems",
        "college": "PSG College of Arts & Science, Coimbatore",
        "year": "2023 – 2028",
        "cgpa": "8.3"
    },
    "certifications": [
        {"name": "Machine Learning Terminology and Process", "issuer": "AWS", "year": "2026"},
        {"name": "Cloud Computing", "issuer": "NPTEL", "year": "2025"},
        {"name": "Java for Android", "issuer": "Coursera", "year": "2025"},
        {"name": "Database Management Systems", "issuer": "NPTEL", "year": "2024"},
        {"name": "UI Design and Development", "issuer": "PSG College", "year": "2024"},
        {"name": "Full Stack Fusion: React & Node", "issuer": "PSG College", "year": "2025"}
    ]
}

@app.route('/')
def index():
    return render_template('index.html', data=PORTFOLIO_DATA)

@app.route('/api/data')
def api_data():
    return jsonify(PORTFOLIO_DATA)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
