# Masjid Finder - Frontend

A React-based web application to find nearby masjids (mosques) with prayer times and directions.

## 🚀 Features

- 🗺️ Interactive map with Leaflet & OpenStreetMap
- 📍 Geolocation to find nearby masjids
- ⏰ Display prayer times for each masjid
- 🔍 Search and filter masjids
- 🧭 Get directions to masjids via Google Maps
- 👤 User authentication (Register/Login)
- 👨‍💼 Admin panel for managing masjids
- 📱 Responsive design for mobile and desktop
- 🔐 Role-based access control

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running (see backend README)

## 🛠️ Installation

1. **Clone the repository**
```bash
   git clone 
   cd frontend
```

2. **Install dependencies**
```bash
   npm install
```

3. **Create environment file**
   
   Create `.env.local` in the frontend root:
```env
   REACT_APP_API_URL=http://localhost:5000/api
```
   
   For production, create `.env.production`:
```env
   REACT_APP_API_URL=https://your-backend.onrender.com/api
```

4. **Start the development server**
```bash
   npm start
```
   
   App will open at [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure
```
frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Map.js              # Leaflet map component
│   │   ├── MasjidDetails.js    # Masjid detail modal
│   │   ├── Navbar.js           # Navigation bar
│   │   ├── MasjidDetails.css
│   │   └── Navbar.css
│   ├── context/
│   │   └── AuthContext.js      # Authentication context
│   ├── pages/
│   │   ├── Home.js             # Main map view
│   │   ├── Login.js            # Login page
│   │   ├── Register.js         # Registration page
│   │   ├── AdminMasjids.js     # Masjid management
│   │   ├── AdminUsers.js       # User management
│   │   ├── Home.css
│   │   ├── Auth.css
│   │   ├── AdminMasjids.css
│   │   └── AdminUsers.css
│   ├── services/
│   │   └── api.js              # API service layer
│   ├── utils/
│   │   └── prayerTimes.js      # Prayer time utilities
│   ├── App.js                  # Main app component
│   ├── index.js                # Entry point
│   └── index.css               # Global styles
├── .env.local                  # Local environment variables
├── .env.production             # Production environment variables
├── .gitignore
├── package.json
├── vercel.json                 # Vercel configuration
└── README.md
```

## 🎨 Key Components

### Map Component
- Interactive map using Leaflet
- Shows user location with blue marker
- Displays masjids with default markers
- Click markers to see masjid details
- Click anywhere on map to get coordinates

### Authentication
- JWT-based authentication
- Protected routes for admin pages
- Persistent login with localStorage
- Auto-logout on token expiration

### Admin Features
- Add/Edit/Delete masjids
- Update prayer times
- Manage user roles (Main Admin only)
- Interactive map for selecting masjid location

## 🔌 API Integration

The frontend communicates with the backend API:
```javascript
// Example API calls
import { authAPI, masjidAPI } from './services/api';

// Login
const response = await authAPI.login({ email, password });

// Get nearby masjids
const masjids = await masjidAPI.getNearby(lng, lat, 5000);

// Create masjid (admin)
await masjidAPI.create(masjidData);
```

## 🗺️ Map Features

### Technologies
- **Leaflet**: Open-source JavaScript library for maps
- **React Leaflet**: React components for Leaflet
- **OpenStreetMap**: Free map tiles (no API key needed)

### Map Interactions
- Click masjid markers to view details
- Click anywhere on map to get coordinates
- Auto-center on user location
- Shows distance to masjids
- Get directions via Google Maps

## 👥 User Roles

### Regular User
- View all masjids
- See prayer times
- Get directions

### Admin
- All user permissions
- Add/edit/delete masjids
- Update prayer times

### Main Admin
- All admin permissions
- Manage user roles
- First registered user becomes Main Admin

## 🚀 Build & Deployment

### Local Build
```bash
npm run build
```
Creates optimized production build in `build/` folder.

### Deploy to Vercel

1. **Install Vercel CLI**
```bash
   npm install -g vercel
```

2. **Login to Vercel**
```bash
   vercel login
```

3. **Deploy**
```bash
   vercel --prod
```

### Deploy via Vercel Dashboard

1. **Push to GitHub**
```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
```

2. **Import Project to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Configure project:
     - Framework Preset: Create React App
     - Root Directory: `frontend` (if in monorepo)
     - Build Command: `npm run build`
     - Output Directory: `build`

3. **Set Environment Variables**
   - Go to Settings → Environment Variables
   - Add `REACT_APP_API_URL` = `https://your-backend.onrender.com/api`
   - Apply to Production, Preview, and Development

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Visit your live site!

## 🌍 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API base URL | `https://api.example.com/api` |

**Important**: 
- Variables MUST start with `REACT_APP_`
- Rebuild required after changing environment variables
- Never commit `.env` files with sensitive data

## 📱 Responsive Design

The app is fully responsive and works on:
- 📱 Mobile phones (portrait & landscape)
- 📱 Tablets
- 💻 Laptops
- 🖥️ Desktop computers

## 🧪 Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**

## 📚 Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.15.0",
  "axios": "^1.5.0",
  "leaflet": "^1.9.4",
  "react-leaflet": "^4.2.1",
  "jwt-decode": "^3.1.2"
}
```

## 🎨 Styling

- CSS Modules for component-specific styles
- Global styles in `index.css`
- Responsive design with CSS Grid and Flexbox
- Mobile-first approach

## 🐛 Troubleshooting

### Map not showing
- Check if Leaflet CSS is imported in `index.html`
- Verify map container has height set in CSS
- Check browser console for errors

### API requests failing
- Verify `REACT_APP_API_URL` is set correctly
- Check if backend is running
- Look at Network tab in DevTools
- Verify CORS is enabled on backend

### Location not detected
- Enable location permissions in browser
- HTTPS required for geolocation in production
- Check browser compatibility

### Login not working
- Check if token is saved in localStorage
- Verify API endpoint is correct
- Check Network tab for error responses

## 🔒 Security

- Passwords hashed with bcrypt
- JWT tokens for authentication
- Protected routes with AuthContext
- Token stored in localStorage
- Auto-logout on token expiration

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

MIT License - feel free to use this project for learning and development.

## 👨‍💻 Author

Your Name - [Your GitHub](https://github.com/yourusername)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, email support@example.com or open an issue in the repository.

## 🙏 Acknowledgments

- [Leaflet](https://leafletjs.com/) - Interactive maps
- [OpenStreetMap](https://www.openstreetmap.org/) - Map data
- [React](https://reactjs.org/) - UI framework
- [Vercel](https://vercel.com/) - Hosting platform

---

Made with ❤️ for the Muslim community
