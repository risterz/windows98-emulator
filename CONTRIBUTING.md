# Contributing to Windows 98 Emulator

Thank you for your interest in contributing to the Windows 98 Emulator project! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### 🐛 Reporting Bugs
1. **Check existing issues** to avoid duplicates
2. **Use the bug report template** when creating new issues
3. **Provide detailed information**:
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser and OS information
   - Screenshots if applicable

### 💡 Suggesting Features
1. **Check the roadmap** in README.md and CHANGELOG.md
2. **Create a feature request** with detailed description
3. **Explain the use case** and benefits
4. **Consider implementation complexity**

### 🔧 Code Contributions

#### Getting Started
1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/windows-98-site.git
   cd windows-98-site
   ```
3. **Install dependencies**
   ```bash
   npm install
   ```
4. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

#### Development Guidelines

##### 🎮 Adding New Games
Follow the Snake game implementation as a reference:

1. **Create the game component**
   ```typescript
   // components/apps/your-game.tsx
   "use client"
   
   import { useState, useEffect } from "react"
   import { Button } from "@/components/ui/button"
   
   export function YourGame() {
     // Game logic here
     return (
       <div className="p-4 bg-[#c0c0c0] h-full">
         {/* Game UI */}
       </div>
     )
   }
   ```

2. **Register in window manager**
   ```typescript
   // components/window-manager.tsx
   import { YourGame } from "@/components/apps/your-game"
   
   case "yourgame":
     return <YourGame />
   ```

3. **Add to start menu**
   ```typescript
   // components/start-menu.tsx
   { name: "Your Game", app: "yourgame", icon: Gamepad2 }
   ```

4. **Configure window settings**
   ```typescript
   // hooks/use-windows.ts
   yourgame: { title: "Your Game", width: 400, height: 500 }
   ```

##### 🎨 Styling Guidelines
- **Use Windows 98 color palette**:
  - Background: `bg-[#c0c0c0]`
  - Borders: `border-white border-r-[#808080] border-b-[#808080]`
  - Buttons: 3D effect with proper hover states
- **Follow existing patterns** in other components
- **Maintain pixel-perfect accuracy** where possible
- **Use Tailwind CSS classes** consistently

##### 📝 Code Standards
- **TypeScript**: All new code must be TypeScript
- **React Hooks**: Use functional components with hooks
- **ESLint**: Follow the existing linting rules
- **Naming**: Use descriptive, camelCase variable names
- **Comments**: Add JSDoc comments for complex functions

##### 🧪 Testing
- **Manual testing**: Test your changes thoroughly
- **Cross-browser**: Verify compatibility with major browsers
- **Responsive**: Ensure functionality on different screen sizes
- **Performance**: Check for memory leaks in games

#### Code Review Process
1. **Self-review** your changes before submitting
2. **Write clear commit messages**
   ```
   feat: add Tetris game with authentic Windows 98 styling
   
   - Implement classic Tetris gameplay mechanics
   - Add scoring system with high score persistence
   - Include authentic Windows 98 visual design
   - Add keyboard controls (arrow keys, spacebar)
   ```
3. **Create a pull request** with detailed description
4. **Respond to feedback** promptly and professionally

## 📁 Project Structure

```
windows98-emulator/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Main page component
├── components/            # React components
│   ├── apps/             # Application components
│   │   ├── snake.tsx     # Snake game (reference implementation)
│   │   ├── minesweeper.tsx
│   │   └── ...
│   ├── ui/               # Reusable UI components
│   ├── desktop.tsx       # Desktop environment
│   ├── start-menu.tsx    # Start menu with submenus
│   ├── taskbar.tsx       # Bottom taskbar
│   ├── window.tsx        # Individual window component
│   └── window-manager.tsx # Window management system
├── hooks/                # Custom React hooks
│   ├── use-windows.ts    # Window state management
│   └── ...
├── lib/                  # Utility functions
├── public/              # Static assets
└── styles/             # Additional styles
```

## 🎯 Priority Areas

### High Priority
- **Game Implementations**: Pinball, Hearts, FreeCell
- **Audio System**: Sound effects and system sounds
- **Mobile Responsiveness**: Touch-friendly interface
- **Performance Optimization**: Memory management for games

### Medium Priority
- **File System Simulation**: Actual file operations
- **Network Features**: Network neighborhood
- **Screensavers**: Classic Windows 98 screensavers
- **Accessibility**: Screen reader support

### Low Priority
- **Advanced Features**: Registry editor simulation
- **Easter Eggs**: Hidden features and references
- **Themes**: Alternative color schemes

## 🚀 Development Setup

### Prerequisites
- Node.js 18+
- npm/yarn/pnpm
- Git
- Modern web browser

### Environment Setup
1. **Clone and install**
   ```bash
   git clone https://github.com/devvyyxyz/windows-98-site.git
   cd windows-98-site
   npm install
   ```

2. **Development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   npm start
   ```

### Useful Commands
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript type checking
- `npm run build` - Production build

## 📋 Pull Request Checklist

Before submitting a pull request, ensure:

- [ ] **Code follows project conventions**
- [ ] **TypeScript types are properly defined**
- [ ] **No console errors or warnings**
- [ ] **Responsive design considerations**
- [ ] **Cross-browser compatibility tested**
- [ ] **Performance impact assessed**
- [ ] **Documentation updated if needed**
- [ ] **Screenshots provided for UI changes**

## 🎨 Design Principles

### Windows 98 Authenticity
- **Visual Accuracy**: Match original Windows 98 appearance
- **Interaction Patterns**: Familiar user experience
- **Color Consistency**: Use authentic color palette
- **Typography**: Tahoma font family

### Modern Web Standards
- **Accessibility**: WCAG compliance where possible
- **Performance**: Optimized loading and runtime
- **Security**: Safe coding practices
- **SEO**: Proper meta tags and structure

## 🤔 Questions?

- **GitHub Issues**: For bug reports and feature requests
- **Discussions**: For general questions and ideas
- **Email**: Contact repository maintainers

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

**Thank you for helping make this nostalgic Windows 98 experience even better! 🎉**
