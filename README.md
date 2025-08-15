# 🌤️ Weather Widgets Dashboard

A simple dashboard to track the current weather of multiple locations using customizable widgets. Users can add locations, view current weather data, and remove widgets. The app fetches weather data from **Open-Meteo API** and caches responses for 5 minutes to reduce redundant requests.

---

## 📝 How it works

1. User enters a location in the dashboard input.
2. The system checks if a widget for this location already exists:
   - ✅ If yes, shows an error toast: "This location already exists".
   - ❌ If no, a new widget is created.
3. Backend fetches weather data from Open-Meteo:
   - If the location was requested in the last 5 minutes, the cached value is returned.
4. The frontend displays the widget with:
   - Location name
   - Current temperature
   - Day/night background
5. Users can delete widgets at any time.

---

## 🛠️ Technologies

**Frontend:**
- Next.js 15 
- React
- Tailwind CSS (Styling)
- Axios (HTTP requests)
- Sonner (Toasts)

**Backend:**
- Node.js
- Express.js
- MongoDB
- Axios
- In-memory cache (5 minutes per location)

---

## 🚀 Setup

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- npm or yarn

### 1️⃣ Backend
Navigate to the backend folder and install dependencies:

    cd backend
    npm install
    npm run dev



### 2️⃣ Frontend
Navigate to the frontend folder and install dependencies:

    cd frontend
    npm install
    npm run dev

> Frontend runs at [http://localhost:3000](http://localhost:3000)  
> Backend should be running at [http://localhost:5000](http://localhost:5000)

---

## 🔍 API Documentation

| Method | Endpoint                | Description                             | Body / Params                  |
|--------|------------------------|-----------------------------------------|--------------------------------|
| GET    | `/widgets`             | List all saved widgets                  | –                              |
| POST   | `/widgets`             | Create a new widget (`location`)        | `{ "location": "London" }`    |
| DELETE | `/widgets/:id`         | Delete a widget by ID                   | `id`                             |
| GET    | `/weather/:location`   | Fetch current weather (cached 5 mins)  | `location`                              |

---

## 📊 Architecture Overview

```mermaid
User
 └─> Frontend: WidgetForm
       └─> Submit location
             └─> Backend: POST /widgets
                   └─> Check if location exists
                         ├─ Yes → Return error toast
                         └─ No  → Create widget in MongoDB
                                   └─> fetchWeather Service
                                         ├─ Cached last 5 min? → Return cached weather
                                         └─ No → Call Open-Meteo API
                                                   └─> Save response in cache
                                         └─> Return weather data
                                   └─> Frontend updates WidgetCardContainer
                                         └─> User sees updated dashboard

````

## ✅ Features
- Add multiple widgets for different locations.

- Autocomplete suggestions while typing a location.

- Prevent duplicate widgets.

- Display day/night backgrounds.

- Cached weather data for 5 minutes.

- Delete widgets dynamically.

- Error handling via toast notifications.

##