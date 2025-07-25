# EveryOneZone 💬

**EveryOneZone** is a real-time chat application that connects everyone in one zone — fast, secure, and fun!

This project includes both the **frontend** and **backend** setup instructions.  
- 🔵 Frontend: Next.js + Tailwind CSS  
- 🔴 Backend: Node.js + Express + Socket.IO + MongoDB

---

## ✨ Features

- ⚡ Real-time messaging with Socket.IO
- 🔐 JWT-based user authentication
- 🧑‍🤝‍🧑 Public chatroom support
- 💬 Message timestamps
- 📱 Mobile responsive layout
- 💾 MongoDB for data storage (users/messages)
- 🌙 Optional light/dark theme support

---

## 📂 Project Structure

```

EveryOneZone/
├── client/       # Frontend - Next.js
├── server/       # Backend - Express.js + Socket.IO
└── README.md     # Project overview

````

---

## 🛠️ Tech Stack

### Frontend:
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Socket.IO Client](https://socket.io/)
- [MongoDB (via backend)](https://www.mongodb.com/)

### Backend:
- Node.js
- Express.js
- Socket.IO
- MongoDB + Mongoose

---

## 🚀 Getting Started

### ⚙️ Prerequisites

- Node.js (v14+)
- npm or yarn
- MongoDB (Atlas or local instance)

---

## 🟦 Frontend Setup (client)

### 1. Clone the frontend repo

```bash
git clone https://github.com/PavishK/EveryOneZone--client.git
cd EveryOneZone--client
npm install
````

### 2. Create `.env.local` in the root directory:

```env
PRODUCTION_STATUS=true
MONGODB_URL="your_mongodb_connection_string"
NEXT_PUBLIC_SERVER_API="http://localhost:8080"
SALT=00
JWT_SECRET="your_jwt_secret"
```

> ✅ Replace all values with your actual MongoDB URI and secrets.

### 3. Start the frontend

```bash
npm run dev
```

Frontend runs at: [http://localhost:3000](http://localhost:3000)

---

## 🟥 Backend Setup (server)

### 1. Clone the backend repo

```bash
git clone https://github.com/PavishK/EveryOneZone--server.git
cd EveryOneZone--server
npm install
```

### 2. Create `.env` file in the root directory:

```env
CLIENT_URL="https://every-one-zone-client.vercel.app"
PORT=8080
MONGODB_URL="mongodb+srv://yoururl"
```.

### 3. Start the backend

```bash
npm start
```

Backend runs at: [http://localhost:8080](http://localhost:8080)

---

## 📁 Folder Overview

```
EveryOneZone/
├── client/
│   ├── components/       # UI components
│   ├── pages/            # Next.js routes
│   ├── services/         # API/auth helpers
│   ├── styles/           # Tailwind/global styles
│   ├── public/           # Static assets
│   └── utils/            # Reusable utilities
│
├── server/
│   ├── controllers/      # Route logic
│   ├── models/           # Mongoose schemas
│   ├── routes/           # Express routes
│   ├── sockets/          # Socket.IO events
│   └── index.js          # Entry point
```

---

## 🌍 Live Demo

🔗 [https://every-one-zone-client.vercel.app](https://every-one-zone-client.vercel.app)

---

## 📜 License

This project is licensed under the [MY License](LICENSE)

---

## 👨‍💻 Author

Made with 💻 by [Pavish K](https://github.com/PavishK)

```
