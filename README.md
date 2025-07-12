
# 🧭 AI Travel Planner

AI-powered mobile app that helps users create personalized travel itineraries using natural language prompts. Built with React Native, Expo, Gemini AI, and Firebase.

> “Plan a 5-day trip to Kyoto for under $1000 with food and culture in mind.”

---

## 🧪 Tech Stack

| Tech              | Description                         | Icon |
|-------------------|-------------------------------------|------|
| [React Native](https://reactnative.dev/) | Cross-platform mobile framework | ![React Native](https://img.shields.io/badge/React_Native-20232A?logo=react&logoColor=61DAFB) |
| [Expo](https://expo.dev/)             | Streamlined RN development     | ![Expo](https://img.shields.io/badge/Expo-000020?logo=expo&logoColor=white) |
| [Material UI](https://mui.com/)       | Clean, responsive UI toolkit   | ![MUI](https://img.shields.io/badge/Material_UI-007FFF?logo=mui&logoColor=white) |
| [Firebase](https://firebase.google.com/) | Backend services & auth         | ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black) |
| [Gemini AI](https://deepmind.google/technologies/gemini/) | Google’s LLM for itinerary generation | ![Gemini](https://img.shields.io/badge/Gemini_AI-4285F4?logo=google&logoColor=white) |

---

## 📱 Features

- 🔮 **AI-Generated Travel Plans**  
  Prompt-based itinerary generation using Gemini AI

- 🗓️ **Daily Travel Breakdown**  
  Day-by-day activities, recommendations, and routes

- 🧾 **Budgeting**  
  Estimates and adjusts plans to fit the user’s stated budget

- 📍 **POI & Food Discovery**  
  Suggests places, attractions, and restaurants near you

- 🔐 **User Authentication**  
  Firebase Auth integration for secure user access

- 📤 **Data Storage**  
  Store generated itineraries and preferences in Firestore

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18.x
- Expo CLI `npm install -g expo-cli`
- Firebase Project & Gemini API access

### Installation

```bash
git clone https://github.com/HardUsername-123/AI-TRAVEL-PLANNER.git
cd AI-TRAVEL-PLANNER
npm install
```

### Run the App

```bash
expo start
```

Use iOS/Android emulator or scan the QR code via the Expo Go app.

---

## 🧩 Environment Variables

Create a `.env` file with the following values:

```env
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
GEMINI_API_KEY=your_google_gemini_key
```

---

## 🧱 App Structure

```bash
src/
├── components/       # Reusable UI components (Material UI)
├── screens/          # App screens (Home, Itinerary, Profile)
├── services/         # Firebase & Gemini services
├── context/          # App-wide state/context providers
└── utils/            # Helpers (formatting, validation, etc.)
```

---

## 🎨 UI Preview

*(Insert screenshots or Expo link here)*

- Clean and responsive Material UI components
- Dark/light mode support (optional)
- Seamless UX across iOS & Android

---

## 💡 Usage Examples

```txt
Prompt:
"Plan a 3-day trip to Bali for under $500 focused on beaches and culture."

Output:
Day 1 – Uluwatu, Padang Padang Beach, sunset dinner  
Day 2 – Ubud Monkey Forest, yoga, local cuisine  
Day 3 – Tanah Lot temple, budget shopping, return
```

---

## 🤝 Contributing

Pull requests are welcome! Here's how:

```bash
# Fork the repository
# Create your branch
git checkout -b feat/my-feature

# Commit your changes
git commit -m "Add new feature"

# Push and create a PR
git push origin feat/my-feature
```

---

## 📄 License

[MIT](./LICENSE)

---

## 🌍 Connect

- 🌐 Project: [github.com/HardUsername-123/AI-TRAVEL-PLANNER](https://github.com/HardUsername-123/AI-TRAVEL-PLANNER)
- 🧠 AI Tech: [Gemini AI](https://deepmind.google/technologies/gemini/)
- 📧 Contact: Open a GitHub issue or discussion

---

> “Let AI do the planning. You enjoy the journey.”
