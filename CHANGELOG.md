# Changelog

All notable changes to the Windows 98 Emulator project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2024-12-21

### 🎮 Added - Snake Game
- **New Snake Game**: Complete implementation of the classic Snake arcade game
- **Game Features**:
  - Classic snake mechanics with growing body
  - Food collection system with scoring (+10 points per apple)
  - Collision detection for walls and self-collision
  - Game over and restart functionality
  - Pause/resume capability

### 🎯 Controls & Interface
- **Multiple Control Schemes**:
  - Arrow keys for movement (Up, Down, Left, Right)
  - WASD keys as alternative controls
  - Spacebar for pause/resume
  - Mouse controls for Start/Pause buttons

### 🏆 Scoring System
- **Score Tracking**: Real-time score display with retro styling
- **High Score Persistence**: Saves high score to localStorage
- **Digital Display**: Authentic Windows 98 style score counters

### 🎨 Visual Design
- **Authentic Styling**: Windows 98 game window with proper borders
- **Game Grid**: 20x20 pixel-perfect game board
- **Visual Elements**:
  - Snake head: 🐍 emoji
  - Snake body: Green squares (🟢)
  - Food: Red apple (🍎)
- **Status Indicators**: Color-coded game state messages

### 🔧 Technical Implementation
- **React Architecture**: Built with modern React hooks
  - useState for game state management
  - useEffect for game loop and event listeners
  - useCallback for optimized performance
- **Game Loop**: Efficient setInterval-based movement system
- **Event Handling**: Global keyboard event listeners
- **Local Storage**: High score persistence across sessions

### 🚀 Integration
- **Start Menu Integration**: Added to Programs → Games submenu
- **Desktop Icon**: Quick access via desktop double-click
- **Window Management**: Full support for minimize, maximize, close, drag
- **Window Configuration**: Optimized 400x500 pixel window size

### 🐛 Fixed - Start Menu Hover Issue
- **Problem**: Hover zones in start menu were overlapping, causing Games submenu to be inaccessible when Internet Tools submenu would appear instead
- **Solution**: 
  - Replaced CSS-only hover with React state management
  - Added controlled hover state using onMouseEnter/onMouseLeave
  - Eliminated conflicting hover zones with conditional rendering
  - Improved z-index layering for proper submenu stacking

### 🔄 Technical Improvements
- **State Management**: Enhanced hover control in start menu
- **Performance**: Optimized submenu rendering
- **User Experience**: Smooth navigation between menu categories
- **Code Quality**: Cleaner component architecture

### 📁 File Structure Changes
```
Added:
├── components/apps/snake.tsx          # Snake game component
└── screenshots/                       # Documentation screenshots
    ├── snake-game-interface.png
    ├── snake-game-playing.png
    └── start-menu-games.png

Modified:
├── components/window-manager.tsx      # Added Snake game integration
├── components/start-menu.tsx          # Fixed hover issues, added Snake
├── components/desktop.tsx             # Added Snake desktop icon
└── hooks/use-windows.ts              # Added Snake window configuration
```

### 🎯 Game Specifications
- **Grid Size**: 20x20 cells
- **Game Speed**: 150ms per move
- **Scoring**: 10 points per food item
- **Initial Snake**: Single segment at center
- **Food Generation**: Random placement avoiding snake body

### 🎮 Gameplay Features
- **Progressive Difficulty**: Snake grows with each food consumed
- **Boundary Collision**: Game ends when hitting walls
- **Self Collision**: Game ends when snake hits itself
- **Smooth Controls**: Prevents reverse direction moves
- **Visual Feedback**: Clear game state indicators

---

## [1.0.0] - 2024-06-15

### 🎉 Initial Release
- **Core Windows 98 Desktop**: Authentic recreation of Windows 98 interface
- **Window Management**: Drag, resize, minimize, maximize functionality
- **Start Menu**: Complete with Programs, Settings, and system options
- **Taskbar**: System tray and window management
- **Desktop Icons**: Double-click to launch applications

### 🛠️ Applications
- **Notepad**: Simple text editor
- **Calculator**: Basic calculator functionality
- **Paint**: Drawing application
- **Minesweeper**: Classic puzzle game
- **Solitaire**: Card game implementation
- **Internet Explorer**: Browser simulation
- **Control Panel**: System settings interface
- **File Explorer**: File system navigation

### 🎨 Styling
- **Authentic Design**: Pixel-perfect Windows 98 visual recreation
- **Color Scheme**: Classic gray (#c0c0c0) theme
- **3D Effects**: Proper button and window styling
- **Typography**: Tahoma font family for authenticity

### 🔧 Technical Stack
- **Framework**: Next.js 15.2.4
- **UI Library**: React 19
- **Styling**: Tailwind CSS with custom Windows 98 theme
- **Icons**: Lucide React icon library
- **TypeScript**: Full type safety implementation

---

## Future Roadmap

### 🔮 Planned Features
- [ ] **Audio System**: Sound effects and system sounds
- [ ] **More Games**: Pinball, Hearts, FreeCell implementations
- [ ] **File System**: Actual file management simulation
- [ ] **Network Features**: Network neighborhood functionality
- [ ] **Screensavers**: Classic Windows 98 screensavers
- [ ] **Startup Sequence**: Authentic boot animation
- [ ] **Mobile Support**: Responsive design improvements

### 🎯 Game Enhancements
- [ ] **Snake Variations**: Different difficulty levels
- [ ] **High Score Board**: Global leaderboard
- [ ] **Game Themes**: Different visual themes
- [ ] **Sound Effects**: Audio feedback for games
- [ ] **Achievements**: Unlock system for games

---

**Note**: This changelog follows semantic versioning. Major version changes indicate significant new features or breaking changes, minor versions add functionality in a backwards compatible manner, and patch versions include backwards compatible bug fixes.
