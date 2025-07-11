# Cricket Informer Frontend

A modern React application for displaying live cricket scores, tournament points tables, and completed match results.

## Features

- 🏏 **Live Matches** - Real-time cricket scores with auto-refresh
- 🏆 **Points Table** - Tournament standings and team rankings
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🔄 **Auto Refresh** - Live matches update every 30 seconds
- 🎨 **Modern UI** - Clean interface with Tailwind CSS
- ⚡ **Fast Loading** - Built with Vite for optimal performance

## Tech Stack

- **React 18** - Frontend framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **JavaScript ES6+** - Modern JavaScript features

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Surendra1341/cricket-informer-frontend.git
   cd cricket-informer-frontend
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
   - Navigate to `http://localhost:5173`

5. **Make sure backend is running**
   - Backend should be running on `http://localhost:8080`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Configuration

The frontend connects to the backend API at `http://localhost:8080/match`

To change the API URL, modify the `API_BASE_URL` constant in `src/components/CricketInformer.jsx`:

```javascript
const API_BASE_URL = 'http://localhost:8080/match';
```

## Project Structure

```
src/
├── components/
│   └── CricketInformer.jsx    # Main application component
├── App.jsx                    # App component
├── App.css                    # Custom styles
├── index.css                  # Global styles with Tailwind
└── main.jsx                   # Application entry point
```

## Features in Detail

### Live Matches
- Displays currently ongoing cricket matches
- Auto-refreshes every 30 seconds
- Manual refresh button available
- Shows batting/bowling teams and scores
- Links to detailed scorecards

### Points Table
- Tournament standings with team rankings
- Responsive table design
- Shows matches played, won, lost, points, etc.
- Refresh functionality

### Completed Matches
- Historical match data from database
- Same card layout as live matches
- Filtered to show only completed games

## Customization

### Changing Colors
Modify the color scheme in `tailwind.config.js` or use different Tailwind color classes.

### Adding New Features
- Add new tabs in the navigation
- Create new components in the `components/` folder
- Update the main `CricketInformer` component

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Related Projects

- [Cricket Informer Backend](https://github.com/Surendra1341/cricket-informer-backend) - The Spring Boot backend API

---

**Frontend developed by our team and friends**
