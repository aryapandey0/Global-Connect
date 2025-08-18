# Global Connect

A modern social media platform built with React that enables users to connect, share posts, chat with friends, and discover job opportunities.

## 🚀 Features

- **Social Feed**: Create and share posts with text and images
- **Real-time Chat**: Connect with other users through instant messaging
- **User Profiles**: Customizable profiles with bio and profile pictures
- **Job Listings**: Browse and apply for job opportunities
- **User Authentication**: Secure login and registration system
- **Social Interactions**: Like, comment, and share posts
- **User Connections**: Send connection requests to other users
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: React 18 with Vite
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **Icons**: React Icons (Font Awesome)
- **HTTP Client**: Axios
- **Real-time Communication**: Socket.IO Client
- **State Management**: React Context API

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn
- A running backend server (expected at `http://localhost:5000`)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd global-connect/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 📁 Project Structure

```
frontend/
├── public/
│   └── vite.svg              # Vite logo
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Navbar.jsx       # Navigation bar
│   │   ├── PostCard.jsx     # Post display component
│   │   └── Sidebar.jsx      # Side navigation menu
│   ├── context/             # React Context providers
│   │   ├── AuthContext.jsx  # Authentication state management
│   │   └── SocketContext.jsx # Socket.IO connection management
│   ├── layouts/             # Layout components
│   │   └── MainLayout.jsx   # Main app layout with sidebar
│   ├── pages/               # Page components
│   │   ├── Chat.jsx         # Chat interface
│   │   ├── Home.jsx         # Social feed homepage
│   │   ├── Job.jsx          # Job listings page
│   │   ├── Login.jsx        # Login form
│   │   ├── Profile.jsx      # User profile page
│   │   └── Register.jsx     # Registration form
│   ├── services/            # API services
│   │   ├── api.js           # Axios configuration
│   │   └── postService.js   # Post-related API calls
│   ├── App.jsx              # Main app component with routing
│   ├── App.css              # App-specific styles
│   ├── index.css            # Global styles
│   └── main.jsx             # App entry point
├── .gitignore               # Git ignore rules
└── package.json             # Project dependencies
```

## 🎯 Key Features Breakdown

### Authentication System
- User registration with profile picture upload
- Secure login with JWT token storage
- Protected routes and user context management

### Social Feed
- Create posts with text and optional images
- Like, comment, and share functionality
- Real-time post interactions
- Search posts by author or content

### Chat System
- Real-time messaging with Socket.IO
- Contact list with last message preview
- Message history and timestamps
- Responsive chat interface

### Profile Management
- View and edit user profiles
- Upload and update profile pictures
- Customizable bio sections
- Profile picture preview

### Job Portal
- Browse job listings from backend API
- Job details including company, location, and description
- Apply functionality for job opportunities

## 🔌 API Endpoints

The frontend expects the following backend endpoints:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user data
- `PUT /api/auth/me` - Update user profile
- `GET /api/jobs` - Fetch job listings

## 🎨 Styling

The application uses Tailwind CSS for styling with a consistent orange and gray color scheme:

- Primary color: Orange (`orange-500`)
- Secondary colors: Gray variants
- Glass morphism effects with backdrop blur
- Responsive design with mobile-first approach

## 🌐 Environment Configuration

Make sure your backend server is running on `http://localhost:5000` or update the API base URL in:
- `src/services/api.js`
- Individual component fetch calls

## 🔄 State Management

The app uses React Context API for global state management:

- **AuthContext**: Manages user authentication state
- **SocketContext**: Handles Socket.IO connections for real-time features

## 📱 Responsive Design

The application is fully responsive with:
- Hidden sidebar on mobile devices
- Adaptive layouts for different screen sizes
- Touch-friendly interface elements

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Notes

- The application requires a compatible backend server for full functionality
- Image uploads are handled through FormData for profile pictures
- Socket.IO is used for real-time chat functionality
- Local storage is used for authentication token persistence

## 🔧 Troubleshooting

**Common Issues:**

1. **CORS Errors**: Ensure your backend server allows requests from the frontend origin
2. **Socket Connection**: Verify the Socket.IO server is running and accessible
3. **API Calls Failing**: Check that the backend server is running on port 5000
4. **Image Upload Issues**: Ensure the backend handles multipart/form-data for file uploads

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ using React and Vite
