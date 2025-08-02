# 🌿 Eco Travel Mate – AI-Powered Sustainable Travel Companion

> 🚀 Built in 48 hours for **Green Spark Hackathon 2025**  
> 🔗 [Live Preview](https://alwinjosegeorge.github.io/eco-travel-mate/)

[![Hackathon](https://img.shields.io/badge/Hackathon-Green%20Spark%202025-orange)](https://github.com/Christwin-Soy-Jose/eco-travel-mate)
[![Platform](https://img.shields.io/badge/Platform-Flutter%20%2B%20Firebase-blue)](https://flutter.dev)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## 🎯 Problem Statement

Short-distance trips and unsustainable travel habits are major contributors to:
- 🌍 Carbon emissions  
- 🚶 Lifestyle-related health issues  

Many people lack **awareness** and **real-time feedback** to change their travel behavior.

---

## 🌱 Solution: Eco Travel Mate

**Eco Travel Mate** is a mobile app that:
- Detects how you travel (walk, bike, car, etc.)
- Calculates your carbon footprint
- Suggests eco-friendly travel alternatives
- Motivates you through gamification

---

## 🧩 Core Features

### 🚶 Smart Travel Detection
Automatically detects:
- Walking
- Cycling
- Car
- Public Transport

Powered by GPS and motion activity data — no manual input needed.

---

### ♻️ Real-Time CO₂ Emissions Calculator
Calculates your impact for every trip:

> ✅ Example:  
> Car (2 km) → ~0.5 kg CO₂  
> Walk (2 km) → 0 kg CO₂ and 75 kcal burned!

---

### 🌿 Greener Suggestion Engine
Suggests better travel alternatives with motivation:

> *“You could’ve saved 0.5 kg CO₂ and burned 75 kcal by walking.”*

---

### 🎮 GreenPoints & Weekly Challenges
- Earn **GreenPoints** for every eco action  
- Take on **Weekly Challenges**:
  > “Replace 2 car trips with walks this week!”

---

### 👨‍👩‍👧‍👦 Family Groups & Leaderboards
- Join groups with family/friends  
- Compete with **GreenScores**  
- Build eco-friendly habits together 💚

---

## 🛠 Tech Stack

| Layer             | Technology                                           |
|------------------|------------------------------------------------------|
| **Frontend**      | Flutter (Dart)                                       |
| **Backend**       | Firebase (Auth, Firestore, Cloud Functions), Flask  |
| **Location**      | GPS, Geolocator, Google Activity Recognition         |
| **AI & Logic**    | CO₂ emission calculator, travel-mode classifier      |
| **Mapping**       | Google Maps SDK / Mapbox                             |
| **Gamification**  | Custom points system, challenges, leaderboards       |

---

## 📱 Screenshots (Demo)

> Add screenshots in `assets/screenshots/` folder

| Feature              | Description                                | Preview                                |
|----------------------|--------------------------------------------|----------------------------------------|
| 🏠 Home Screen        | GreenScore, trip summary, eco tips         | ![](assets/screenshots/home_screen.png) |
| 📊 Trip Log          | Detailed trip history and CO₂ impact       | ![](assets/screenshots/trip_log.png)   |
| 💡 Suggestions       | Smart travel alternatives                  | ![](assets/screenshots/suggestion.png) |
| 🏆 Leaderboard       | Compete with friends/family                | ![](assets/screenshots/leaderboard.png)|

---

## 🚀 Getting Started Locally

```bash
# 1. Clone the repo
git clone https://github.com/Christwin-Soy-Jose/eco-travel-mate.git
cd eco-travel-mate

# 2. Install dependencies
flutter pub get

# 3. Setup Firebase
# Add your google-services.json (Android) or GoogleService-Info.plist (iOS)

# 4. Run the app
flutter run
