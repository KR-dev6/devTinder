# DevTinder - Developer Networking App

A full-stack MERN application inspired by Tinder, where developers can discover, like, match, and chat with other developers.

## 🚀 Features

- **Authentication**: Register and login with JWT
- **Developer Feed**: Swipe through developers with like/skip functionality
- **Matching**: Get matched when both developers like each other
- **Real-time Chat**: Socket.io powered real-time messaging
- **Profile Management**: Create and edit your developer profile
- **Modern UI**: Beautiful glassmorphism design with Tailwind CSS

## 🛠 Tech Stack

### Frontend
- React 18 with Vite
- React Router DOM for navigation
- Tailwind CSS for styling
- Axios for API calls
- Socket.io-client for real-time chat

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- Socket.io for real-time communication

## 📁 Project Structure

```
DEVTINDER/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # Auth context
│   │   ├── utils/         # API utilities
│   │   └── App.jsx        # Main app component
│   └── package.json
└── server/                 # Node.js backend
    ├── src/
    │   ├── config/        # Database config
    │   ├── models/        # MongoDB models
    │   ├── routes/        # API routes
    │   ├── controllers/   # Route handlers
    │   ├── middleware/    # Auth middleware
    │   ├── app.js         # Express app
    │   └── seed.js        # Database seeding
    └── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account or local MongoDB

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

4. Seed the database with sample data:
```bash
npm run seed
```

5. Start the server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will run on `http://localhost:5173`

## 🔐 Demo Credentials

After seeding the database, use these credentials to test:

- **Email**: kanak@devtinder.com
- **Password**: password123

Additional test users are also created during seeding.

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/me` - Get current user profile
- `GET /api/users/feed` - Get developers feed
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/profile` - Update profile

### Swipe
- `POST /api/swipe/like/:toUserId` - Like a developer
- `POST /api/swipe/skip/:toUserId` - Skip a developer

### Match
- `GET /api/match` - Get all matches
- `GET /api/match/:userId` - Check if users matched

### Messages
- `GET /api/messages/:userId` - Get chat history
- `POST /api/messages` - Send message

## 🎨 UI Design

The app uses a modern glassmorphism design with:
- **Primary Color**: #6366F1 (Indigo)
- **Secondary Color**: #EC4899 (Pink)
- **Background**: #0F172A (Dark Blue)
- **Card Background**: #1E293B
- **Text**: #F8FAFC (Light)
- **Like**: #22C55E (Green)
- **Skip**: #EF4444 (Red)

## 🔄 Real-time Chat

Socket.io events:
- `user_connected` - User joins chat
- `send_message` - Send real-time message
- `receive_message` - Receive real-time message
- `user_typing` - Show typing indicator

## 🔒 Security

- Passwords hashed with bcryptjs
- JWT authentication for protected routes
- CORS configured for frontend origin
- Input validation on both client and server

## 📝 Sample Data

The seed file creates 8 sample developers with:
- Profile pictures (from gravatar)
- Bio and skills
- GitHub and portfolio links
- Location information

## 🐛 Troubleshooting

### MongoDB connection error
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify IP whitelist on MongoDB Atlas

### CORS errors
- Ensure frontend URL is allowed in backend CORS config
- Check if backend is running on port 5000

### Socket.io connection error
- Ensure backend server is running
- Check if frontend can reach backend URL
- Clear browser cache and reconnect

## 📦 Deployment

### Frontend (Vercel)
```bash
npm run build
# Deploy dist/ folder to Vercel
```

### Backend (Heroku)
```bash
git push heroku main
```

## 🤝 Contributing

Feel free to fork and submit pull requests!

## 📄 License

ISC License

## 👨‍💻 Author

Built with ❤️ for developers

---

**Enjoy networking with fellow developers on DevTinder!**
