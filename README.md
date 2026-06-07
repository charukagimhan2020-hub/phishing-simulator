# 🎣 Phishing Awareness Simulator

> ⚠ Educational Use Only
>
> This project runs entirely inside the browser. No credentials are transmitted, stored, or sent to any external service. All captured data exists only in browser memory and is cleared on page refresh.

An interactive React-based cybersecurity training tool that demonstrates how phishing websites imitate legitimate services to trick users into revealing sensitive information.

The simulator provides realistic phishing page replicas across 15 templates — including Sri Lankan banking portals — paired with suspicious domain analysis, live credential capture demonstrations, and phishing red-flag education to help users recognize and avoid social engineering attacks.

---

# 🌐 Live Demo

https://phishing-simulator-three.vercel.app/

---

# 📖 Overview

Phishing remains one of the most prevalent and effective cyberattacks used to steal usernames, passwords, banking credentials, and personal information.

This simulator recreates realistic phishing scenarios using familiar platforms and banking portals to demonstrate:

- How attackers impersonate trusted brands using lookalike pages
- How fake login forms silently collect credentials
- How suspicious domains are crafted to deceive users at a glance
- How social engineering tactics manipulate victim behavior
- What warning signs to look for before entering credentials anywhere

All demonstrations run locally within the browser and are intended solely for cybersecurity awareness and training.

---

# ✨ Features

### 🎭 Realistic Phishing Templates

15 phishing simulations across five categories:

| Category | Platforms |
|----------|-----------|
| Email | Gmail |
| Social Media | YouTube, Facebook, Instagram |
| Finance | PayPal |
| Google Services | Google Account, Google Drive, Google Pay, Google Photos |
| Sri Lankan Banking | Commercial Bank, Sampath Bank, HNB, Bank of Ceylon, People's Bank, Nations Trust Bank |

### 📂 Category Filtering

Browse and filter phishing scenarios by: Email · Social Media · Finance · Google Services · Sri Lankan Banking

### 🚩 Phishing Red Flag Detection

Each template highlights real-world warning signs:

| Indicator | What It Demonstrates |
|-----------|----------------------|
| Suspicious Domain | Typosquatting, lookalike domains, misleading subdomains |
| Urgency Tactics | Pressure messaging designed to bypass critical thinking |
| Credential Harvesting | How fake login forms capture and log sensitive input |
| HTTPS Misconceptions | Why a padlock icon does not guarantee a legitimate site |
| Brand Spoofing | Logos, colors, and layouts cloned to build false trust |
| Post-Login Redirects | Redirecting victims to the real site after credential theft |

### 📊 Live Credential Capture Demonstration

Displays entered data inside a local educational log in real time — showing exactly how phishing sites collect credentials without the user realizing it.

### 🤖 Automated Demo Mode

Automatically simulates user interactions across multiple templates — ideal for live presentations, security workshops, and awareness training sessions without manual input.

### 🌐 Fake Browser Interface

Simulated address bar showing suspicious URLs, misleading subdomains, and phishing domain patterns — teaching users how to spot malicious links before clicking.

---

# 🎯 Learning Objectives

This project helps users:

- Identify phishing websites and fake login pages
- Detect suspicious URLs, subdomains, and domain patterns
- Recognize social engineering and urgency tactics
- Understand how credential harvesting works in practice
- Dispel the myth that HTTPS equals safety
- Build habits that reduce susceptibility to phishing attacks

---

# ⚙️ Technology Stack

- React.js
- JavaScript (ES6+)
- HTML5 / CSS3
- React Hooks
- CSS-in-JS Styling
- Google Fonts
- Browser-Only Execution — no backend, no database, no API, no credential storage

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/phishing-awareness-simulator.git
cd phishing-awareness-simulator
```

## Install Dependencies

```bash
npm install
```

## Run Development Server

```bash
npm start
```

## Create Production Build

```bash
npm run build
```

---

# 📸 Screenshots

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Phishing Simulation
![Simulation](screenshots/simulation.png)

### Credential Capture Demonstration
![Credentials](screenshots/credentials.png)

### Red Flag Analysis
![Analysis](screenshots/analysis.png)

---

# 🎓 Example Use Cases

- Cybersecurity awareness training and workshops
- University information security coursework
- Employee phishing resistance training
- Ethical hacking and red team demonstrations
- Security awareness campaigns
- Live conference or classroom demonstrations

---

# 📂 Project Structure

```text
phishing-awareness-simulator/
│
├── public/
│
├── src/
│   ├── App.js
│   ├── index.js
│   └── PhishingSimulator.jsx
│
├── screenshots/
│   ├── dashboard.png
│   ├── simulation.png
│   ├── credentials.png
│   └── analysis.png
│
├── .gitignore
├── LICENSE
├── README.md
├── package.json
└── package-lock.json
```

---

# ⚠ Disclaimer

This project was developed exclusively for cybersecurity education, awareness training, and research purposes.

No credentials are transmitted, stored, or shared with any external service. All captured data remains solely in browser memory and is permanently removed when the page is closed or refreshed.

This project must not be used to deceive, impersonate, or collect information from real users outside of an authorized training context.

The author assumes no responsibility for misuse of this software.

---

# 👨‍💻 Author

**Charuka Weerasinghe**
Cybersecurity Student | Information Security Enthusiast

---

# 📄 License

Licensed under the MIT License.
Free to use for educational, academic, and cybersecurity awareness purposes.
