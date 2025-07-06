# 🏰 Procedural Dungeon Generator

A modern, interactive web application for generating procedural dungeons for tabletop RPGs and game development. Built with React, TypeScript, and TailwindCSS.

## ✨ Features

### 🎲 Advanced Dungeon Generation
- **Procedural Room Generation**: Configurable room count, sizes, and layouts
- **Intelligent Corridor System**: Automatic pathfinding connecting all rooms
- **Feature Placement**: Treasures, monsters, and traps with probability controls
- **Visual Grid Display**: Interactive dungeon map with hover tooltips

### 🎨 Modern UI/UX
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Dark Fantasy Theme**: Immersive color scheme with custom typography
- **Real-time Controls**: Live updates as you adjust generation parameters
- **Interactive Elements**: Hover effects and smooth animations

### ⚙️ Customization Options
- **Map Dimensions**: Adjustable width and height (20-100 cells)
- **Room Configuration**: Control count, minimum/maximum sizes
- **Corridor Settings**: Adjustable corridor width
- **Feature Probability**: Fine-tune treasure, monster, and trap spawn rates
- **Random Generation**: Quick randomize button for instant variety

### 💾 Export Functionality
- **JSON Export**: Save generated dungeons for use in other tools
- **Detailed Metadata**: Includes generation settings and statistics
- **Timestamp Tracking**: Know when each dungeon was created

## 🚀 Demo

Visit the live demo: [Dungeon Generator on GitHub Pages](https://miya123123.github.io/test_repo_2_miya123123/)

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: TailwindCSS with custom dungeon theme
- **Build Tool**: Vite for fast development and optimized builds
- **Icons**: Lucide React for modern iconography
- **Deployment**: GitHub Pages with automated CI/CD

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/miya123123/test_repo_2_miya123123.git
   cd test_repo_2_miya123123
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🎮 Usage Guide

### Basic Generation
1. **Adjust Settings**: Use the control panel to configure your dungeon parameters
2. **Generate**: Click "Generate Dungeon" to create a new layout
3. **Explore**: Hover over cells to see coordinates and cell types
4. **Export**: Save your dungeon as JSON for external use

### Advanced Features
- **Randomize Settings**: Use the dice button for random configurations
- **Fine-tune Probabilities**: Adjust treasure, monster, and trap chances
- **Resize Maps**: Create anything from small chambers to vast complexes

### Legend
- 🔲 **Wall**: Solid barriers forming the dungeon structure
- ⬜ **Room**: Open spaces for encounters and exploration
- 🔲 **Corridor**: Passages connecting different areas
- 💎 **Treasure**: Valuable items and rewards
- 👹 **Monster**: Creatures and encounters
- ⚠️ **Trap**: Hidden dangers and obstacles

## 🏗️ Architecture

### Project Structure
```
src/
├── components/          # React components
│   ├── ControlPanel.tsx # Settings and controls
│   ├── DungeonDisplay.tsx # Map visualization
│   └── DungeonGenerator.tsx # Generation logic wrapper
├── types/              # TypeScript type definitions
│   └── dungeon.ts      # Core interfaces
├── utils/              # Utility functions
│   └── dungeonGenerator.ts # Core generation algorithm
├── App.tsx            # Main application component
└── main.tsx          # Application entry point
```

### Algorithm Overview
1. **Room Placement**: Randomly place rooms without overlap
2. **Path Finding**: Connect all rooms using minimum spanning tree
3. **Corridor Carving**: Create L-shaped corridors between rooms
4. **Feature Addition**: Place treasures, monsters, and traps probabilistically

## 🔧 Configuration

### Environment Variables
No environment variables required for basic functionality.

### Build Configuration
- **Base Path**: Configured for GitHub Pages deployment
- **TypeScript**: Strict mode enabled for type safety
- **TailwindCSS**: Custom theme with dungeon-specific colors

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

### Development Guidelines
1. Follow TypeScript best practices
2. Use meaningful commit messages
3. Test changes thoroughly
4. Update documentation as needed

## 📋 Roadmap

### Planned Features
- [ ] Multiple dungeon themes (cave, castle, ruins)
- [ ] Door placement system
- [ ] Save/load dungeon templates
- [ ] Minimap overview for large dungeons
- [ ] 3D visualization mode
- [ ] Integration with popular RPG systems

### Performance Improvements
- [ ] Virtual scrolling for large maps
- [ ] WebWorker-based generation
- [ ] Caching and memoization

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Font**: Google Fonts (Cinzel & Inter)
- **Icons**: Lucide React icon library
- **Styling**: TailwindCSS utility classes
- **Inspiration**: Classic dungeon crawlers and tabletop RPGs

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/miya123123/test_repo_2_miya123123/issues) page
2. Create a new issue with detailed information
3. Include browser version and steps to reproduce

---

**Happy dungeon crafting!** 🗡️⚔️🛡️