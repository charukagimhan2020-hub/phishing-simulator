# 🎣 Phishing Simulator

> **⚠ EDUCATIONAL USE ONLY -Runs 100% in the browser. No credentials are transmitted or stored anywhere.**

A browser-based phishing awareness tool that simulates realistic fake login pages for 15 platforms -including Google, Meta, PayPal, and major Sri Lankan banks. Built to demonstrate how credential harvesting attacks work and what red flags to look for.

## 🖥️ Demo Features

- **15 Phishing Templates** -Gmail, YouTube, Facebook, Instagram, PayPal, Google Account, Drive, Pay, Photos, and Sri Lankan banks (Commercial Bank, Sampath, HNB, BOC, People's Bank, Nations Trust Bank)
- **Category Filtering** -Browse by Email, Social, Finance, Google, or LK Bank
- **Live Red Flag Panel** -Automatically cycles through 6 red flags with per-template domain analysis
- **Credential Log** -Captures and displays fake credentials in a live table
- **Auto Demo Mode** -Simulates a victim entering credentials automatically across templates
- **Fake Browser Bar** -Shows the suspicious spoofed domain with a broken padlock

## 🚩 Red Flags Taught

| # | Flag | Description |
|---|------|-------------|
| 1 | Suspicious Domain | Typosquatting, wrong TLD, subdomain tricks |
| 2 | Urgency / Fear Tactics | Pressure to act fast without thinking |
| 3 | Credential Harvesting Form | Identical UI, data goes to attacker |
| 4 | HTTPS ≠ Safe | Padlock only means encrypted, not legitimate |
| 5 | Brand Spoofing | Cloned logos and colors build false trust |
| 6 | Post-Submit Redirect | Victim redirected to real site after capture |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A React project (Vite or Create React App)

### Usage

1. Clone the repo:
   git clone https://github.com/YOUR_USERNAME/phishing-simulator.git
   cd phishing-simulator

2. Copy `PhishingSimulator.jsx` into your React project's `src/` folder.

3. Import and use:
   import PhishingSimulator from './PhishingSimulator';

   function App() {
     return <PhishingSimulator />;
   }

4. Run your dev server:
   npm run dev

### Or -drop it directly into [Claude.ai Artifacts](https://claude.ai)
Paste the JSX source into a Claude artifact -it renders instantly with no setup.

## 🏛️ Templates Included

| Category | Platforms |
|----------|-----------|
| Email | Gmail |
| Social | YouTube, Facebook, Instagram |
| Finance | PayPal |
| Google | Google Account, Google Drive, Google Pay, Google Photos |
| LK Bank | Commercial Bank of Ceylon, Sampath Bank, HNB, Bank of Ceylon, People's Bank, Nations Trust Bank |

## ⚙️ Tech Stack

- **React** (functional components + hooks)
- **Pure CSS-in-JS** (injected via `<style>` tag -no external CSS needed)
- **Google Fonts** -Space Mono + Bangers
- **No backend, no database, no network requests**

---

## ⚠️ Disclaimer

This project is strictly for **cybersecurity education and awareness training**. It does not transmit, store, or exfiltrate any data. All "captured" credentials exist only in browser memory and are cleared on refresh. Do not use this tool to deceive or mislead real users. The author is not responsible for any misuse.

---

## 📄 License

MIT -free to use for educational, academic, and awareness training purposes.
