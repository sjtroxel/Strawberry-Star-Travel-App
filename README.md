# 🍓😻 Strawberry Star Travel 🚀

**Strawberry Star Travel** is a space-themed web application for discovering real stars, saving the ones that matter to you, and exploring astronomy through a calm, visually immersive interface — accompanied by Strawberry, an awesome cosmic cat. 🐱✨

The project blends **real astronomical data**, **authentication-gated features**, and **carefully crafted UI/UX**, with an emphasis on polish, responsiveness, and gradual discovery.

---

## ✨ Core Features

### 🌟 Star Discovery
- Browse real stars with accurate astronomical data
- Data is sourced from the Hipparcos-Yale-Gliese (HYG) database (over 100,000 stars!)
- View star distance, classification, constellation, and additional facts
- Clean, readable star cards designed for scanning and exploration

### 🔍 Browse Stars
- Dedicated browsing page for exploring the star dataset
- Search and filter stars by name and properties
- Modular star-item cards for consistency and reuse

### ⭐ Star Details Modal
- Clickable star cards open a **star details modal**
- Modal rendered via a portal for proper layering
- Displays extended information without navigating away
- Designed to feel lightweight, not disruptive

### 💖 Favorites System
- Save stars to your personal favorites list
- Remove stars at any time
- Favorites persist per user
- Dedicated Favorites page using reusable favorites-item cards

### 👤 User Profiles
- Profile page tied to authenticated users
- Displays username and avatar
- Avatar fallback support
- Clear separation between user identity and star data

### 🔒 Authentication & Gated Access
- Sign up and log in powered by **Supabase**
- Logged-out users see feature previews and calls to action
- Logged-in users unlock full functionality
- Navbar adapts dynamically based on authentication state

---

## 🎨 UI & Experience

- Animated starfield background
- Shooting stars with randomized timing
- Subtle motion and glow effects (no aggressive animations)
- Mobile-first design with careful spacing for small screens
- Consistent visual language across cards, modals, and pages
- Thoughtful UX decisions to avoid clutter and confusion

---

## 🛠 Tech Stack

- **React**
- **TypeScript**
- **Tailwind CSS**
- **Supabase** (authentication & user data)
- **Vite**
- Custom CSS animations and keyframes
- React Portals for modal rendering

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/strawberry-star-travel-app.git
cd strawberry-star-travel-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Variables

- Create an .env file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run locally

```bash
npm run dev
```

- The app will be available at http://localhost:5173 locally.
- Note: The deployed version of this app is running as of 12/24/25 at 
--- http://strawberry-star-travel.vercel.app

---

## 📱 Responsive Design Philosophy

This project places strong emphasis on:

- Small mobile screens (e.g. 375×667)
- Visual breathing room
- Avoiding UI noise
- Making the app feel calm, not busy

Many layout decisions were tuned manually rather than relying on framework defaults.

---

## 🧭 Project Status

Strawberry Star Travel is an **actively evolving personal project**.

Planned or exploratory ideas include:

- Expanded star datasets
- Deeper filtering and categorization
- Galactic-scale visualizations
- Additional personalization features
- Improved onboarding for first-time users

---

## 🐱 Strawberry & PingFoot

Strawberry and PingFoot are real cats who provided emotional support, supervision, and quality control throughout development.

Strawberry is extremely involved and sits in her soft warm cat bed everyday purring happily while I code/build the app.  
PingFoot participates selectively, contributing tidbits of moral support whilst he focuses primarily on eating ten meals a day.

---

## 📜 License

© 2025 sjtroxel. All rights reserved.