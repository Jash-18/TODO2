# 🚀 JTask - Modern Todo Application

A sleek, full-stack todo application with a beautiful dark GitHub-inspired theme. Built with React, Node.js, Express, and MongoDB.


## ✨ Features

- **🔐 Secure Authentication** - User registration & login with session-based auth
- **📝 Full CRUD Operations** - Create, read, update, and delete tasks
- **🎯 Priority Levels** - Organize tasks by High, Medium, or Low priority
- **📅 Due Dates** - Set deadlines for your tasks
- **✅ Status Toggle** - Mark tasks as complete/pending with one click
- **🔍 Smart Filtering** - Filter by All, Pending, or Completed tasks
- **🌙 Dark Theme** - Beautiful GitHub-inspired dark mode UI
- **📱 Responsive Design** - Works seamlessly on desktop and mobile

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI Library
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Material UI Icons** - Icon library
- **React Hot Toast** - Toast notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Passport.js** - Authentication middleware
- **Express Session** - Session management
- **bcryptjs** - Password hashing

### Deployment
- **Vercel** - Frontend & Backend hosting
- **MongoDB Atlas** - Cloud database

## 🚀 Live Demo

- **DEMO**: [TODO APP](https://jaswanth-todo2-frontend.vercel.app/)

## 📁 Project Structure

```
TODO2/
├── backend/
│   ├── api/
│   │   └── index.js          # Vercel serverless entry
│   ├── config/
│   │   ├── db.js             # MongoDB connection
│   │   └── passport.js       # Passport configuration
│   ├── middleware/
│   │   └── auth.js           # Authentication middleware
│   ├── models/
│   │   ├── Todo.js           # Todo schema
│   │   └── User.js           # User schema
│   ├── routes/
│   │   ├── auth.js           # Auth routes
│   │   └── todos.js          # Todo CRUD routes
│   ├── validations/
│   │   └── index.js          # Input validation
│   ├── server.js             # Local dev server
│   ├── package.json
│   └── vercel.json
│
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── logo.png
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── ProtectedRoute.js
│   │   │   └── TodoList.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── Dashboard.js
│   │   │   ├── Landing.js
│   │   │   ├── Login.js
│   │   │   └── Register.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   └── App.css
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── vercel.json
│
└── README.md
```

## 🏃‍♂️ Run Locally

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Git

### Clone the repository
```bash
git clone https://github.com/Jash-18/TODO2.git
cd TODO2
```

### Backend Setup
```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env with your MongoDB URI and secrets

npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install

# Create .env file (optional for local dev)
echo "REACT_APP_API_URL=http://localhost:5000" > .env

npm start
```

### Environment Variables

#### Backend (.env)
```env
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/jtask
SESSION_SECRET=your-super-secret-key
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

#### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000
```

## 🌐 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login user |
| POST | `/auth/logout` | Logout user |
| GET | `/auth/me` | Get current user |

### Todos
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all todos |
| POST | `/api/todos` | Create todo |
| PUT | `/api/todos/:id` | Update todo |
| DELETE | `/api/todos/:id` | Delete todo |
| PATCH | `/api/todos/:id/toggle` | Toggle status |

## 🚀 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel

1. Fork this repository
2. Connect to Vercel
3. Deploy backend with root directory: `backend`
4. Deploy frontend with root directory: `frontend`
5. Add environment variables in Vercel dashboard

## 🎨 Theme

The app uses a beautiful dark theme inspired by GitHub:

| Color | Hex | Usage |
|-------|-----|-------|
| Primary | `#1A7F37` | Buttons, accents |
| Accent | `#79C0FF` | Links, highlights |
| Background | `#0D1117` | Main background |
| Secondary | `#161B22` | Cards, modals |
| Text | `#F0F6FC` | Primary text |

## 👨‍💻 Author

**Jaswanth Koppala**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue)](https://www.linkedin.com/in/jaswanth-koppala-024943250/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black)](https://github.com/Jash-18)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

⭐ **Star this repo if you found it helpful!**
