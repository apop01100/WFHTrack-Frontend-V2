# 💻 WFHTrack Frontend

This is the frontend for **WFHTrack**, built with React and TypeScript. It allows users to mark their attendance and lets admins monitor attendance data through an intuitive dashboard.

## 🛠 Tech Stack

- **React.js** with **TypeScript**
- **React Router DOM** for routing
- **Tailwind CSS**
- **Vite** for development environment

## 🚀 Features

- Login for users and admins
- User dashboard for attendance submission
- Admin dashboard for viewing and managing attendance
- Role-based UI rendering

## 📁 Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/apop01100/WFHTracker-frontend.git
cd WFHTracker-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Dependencies

Create a .env file in the root folder:

```bash
VITE_API_URL=https://alleged-delores-apop01100-8802d13b.koyeb.app/api/v1
VITE_UNSIGNED_PRESET=input_your_unsigned_preset_cloudinary
VITE_CLOUD_NAME=input_your_cloud_name_cloudinary
```

### 4. Run Developement Server

```bash
npm run dev
```

## 🔐 Role Overview

| Role | Access |
|-------|---------------------------------------------------------|
| User | Login & submit daily attendance |
| Admin | View all users, track attendance, and manage the system |
