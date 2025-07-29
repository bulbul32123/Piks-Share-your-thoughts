# PiKs 📸📝

> **Share your thoughts, feelings, or experiences through text or pictures.**

**PiKs** is a fullstack web application built with the MERN stack (MongoDB, Express, React, Node.js). The platform allows users to post **text or photo-based updates**, reflecting what they feel or experience — similar to microblogging but more expressive.

---

## 🔧 Tech Stack

- **Frontend:** React.js, TailwindCSS (optional), Axios
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT or OAuth (if implemented)
- **Image Uploading:** Multer / Cloudinary (if used)

---

## 📁 Folder Structure

├── backend/ # All backend code (Node.js + Express + MongoDB)
│ ├── controllers/ # Route logic and business logic
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API endpoints
│ ├── middleware/ # Auth, error handling, etc.
│ ├── utils/ # Helper functions
│ └── server.js # Entry point
│
├── frontend/ # ReactJS application
│ ├── public/
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Page views (Home, Profile, Post, etc.)
│ │ ├── api/ # Axios instances or API calls
│ │ ├── context/ # Global state (if using Context API)
│ │ └── App.js # Root component
│ └── package.json
│
├── .gitignore
├── README.md
└── package.json # For monorepo or root-level scripts


---

## 🚀 Features

- 📸 Upload images with captions
- 📝 Share text-based posts
- ❤️ Like or react to others' posts
- 🧑‍🤝‍🧑 User login/register (JWT-based)
- 🧾 Clean UI and responsive layout
- 🔐 Protected routes and API security
- 🌐 RESTful API with MongoDB

---

## ⚙️ Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/bulbul32123/Piks-Share-your-thoughts
cd piks
