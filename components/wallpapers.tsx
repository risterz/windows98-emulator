"use client"

export const wallpapers = {
  None: {
    name: "None",
    style: { backgroundColor: "#008080" },
  },
  "Windows 98": {
    name: "Windows 98",
    style: {
      background: `
        radial-gradient(ellipse at center top, #87CEEB 0%, #4682B4 50%, #191970 100%),
        url("data:image/svg+xml,%3Csvg width='200' height='150' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cfilter id='cloud'%3E%3CfeTurbulence baseFrequency='0.02' numOctaves='3'/%3E%3CfeColorMatrix values='1 1 1 0 0 1 1 1 0 0 1 1 1 0 0 0 0 0 1 0'/%3E%3C/filter%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='white' opacity='0.8' filter='url(%23cloud)'/%3E%3C/svg%3E")`,
    },
  },
  "Blue Screen": {
    name: "Blue Screen",
    style: {
      background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
    },
  },
  Clouds: {
    name: "Clouds",
    style: {
      background: `
        linear-gradient(to bottom, #87CEEB 0%, #98D8E8 50%, #B0E0E6 100%),
        url("data:image/svg+xml,%3Csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cfilter id='clouds' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence baseFrequency='0.01' numOctaves='4' result='noise'/%3E%3CfeColorMatrix in='noise' type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0.5 0.5 0.7 0.7 0.9 1'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='white' opacity='0.6' filter='url(%23clouds)'/%3E%3C/svg%3E")`,
      backgroundBlendMode: "multiply",
    },
  },
  Forest: {
    name: "Forest",
    style: {
      background: `
        linear-gradient(to bottom, #228B22 0%, #006400 50%, #2F4F2F 100%),
        url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='trees' x='0' y='0' width='50' height='50' patternUnits='userSpaceOnUse'%3E%3Cpolygon points='25,10 35,40 15,40' fill='%23228B22' opacity='0.3'/%3E%3Cpolygon points='25,5 30,35 20,35' fill='%2332CD32' opacity='0.2'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23trees)'/%3E%3C/svg%3E")`,
    },
  },
  Ocean: {
    name: "Ocean",
    style: {
      background: `
        linear-gradient(to bottom, #4682B4 0%, #1E90FF 30%, #0066CC 70%, #003366 100%),
        url("data:image/svg+xml,%3Csvg width='200' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cfilter id='waves'%3E%3CfeTurbulence baseFrequency='0.02 0.05' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 0 0.3 0'/%3E%3C/filter%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='white' filter='url(%23waves)'/%3E%3C/svg%3E")`,
      backgroundBlendMode: "overlay",
    },
  },
  Sunset: {
    name: "Sunset",
    style: {
      background: "linear-gradient(to bottom, #FF6B35 0%, #F7931E 25%, #FFD23F 50%, #FF6B35 75%, #C73E1D 100%)",
    },
  },
  Space: {
    name: "Space",
    style: {
      background: `
        radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 50%, #0f0f23 100%),
        url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cfilter id='stars'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='1' result='noise'/%3E%3CfeColorMatrix in='noise' type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0 0 0 0 0 0 0.5 0 0 0 0 0 0 0 0 0 1'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='white' filter='url(%23stars)'/%3E%3C/svg%3E")`,
    },
  },
  Abstract: {
    name: "Abstract",
    style: {
      background: `
        conic-gradient(from 45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7, #dda0dd, #ff6b6b),
        url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='abstract' x='0' y='0' width='50' height='50' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='25' cy='25' r='20' fill='none' stroke='white' strokeWidth='1' opacity='0.1'/%3E%3Ccircle cx='0' cy='0' r='15' fill='none' stroke='white' strokeWidth='1' opacity='0.1'/%3E%3Ccircle cx='50' cy='50' r='15' fill='none' stroke='white' strokeWidth='1' opacity='0.1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23abstract)'/%3E%3C/svg%3E")`,
      backgroundBlendMode: "overlay",
    },
  },
  Geometric: {
    name: "Geometric",
    style: {
      background: `
        linear-gradient(45deg, #667eea 0%, #764ba2 100%),
        url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='geometric' x='0' y='0' width='30' height='30' patternUnits='userSpaceOnUse'%3E%3Cpolygon points='15,0 30,15 15,30 0,15' fill='none' stroke='white' strokeWidth='1' opacity='0.2'/%3E%3Cpolygon points='15,5 25,15 15,25 5,15' fill='white' opacity='0.1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23geometric)'/%3E%3C/svg%3E")`,
    },
  },
  Retro: {
    name: "Retro",
    style: {
      background: `
        linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%),
        url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='retro' x='0' y='0' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Cpath d='M0 20 L20 0 L40 20 L20 40 Z' fill='none' stroke='white' strokeWidth='1' opacity='0.3'/%3E%3Ccircle cx='20' cy='20' r='8' fill='none' stroke='white' strokeWidth='1' opacity='0.2'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23retro)'/%3E%3C/svg%3E")`,
    },
  },
  Matrix: {
    name: "Matrix",
    style: {
      background: `
        linear-gradient(to bottom, #000000 0%, #001100 50%, #000000 100%),
        url("data:image/svg+xml,%3Csvg width='20' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='matrix' x='0' y='0' width='20' height='20' patternUnits='userSpaceOnUse'%3E%3Ctext x='10' y='15' fontFamily='monospace' fontSize='12' fill='%2300ff00' opacity='0.3' textAnchor='middle'%3E1%3C/text%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23matrix)'/%3E%3C/svg%3E")`,
    },
  },
  Marble: {
    name: "Marble",
    style: {
      background: `
        linear-gradient(45deg, #f5f5f5 0%, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%, #f5f5f5 100%),
        url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cfilter id='marble'%3E%3CfeTurbulence baseFrequency='0.04' numOctaves='3'/%3E%3CfeColorMatrix values='0.3 0.3 0.3 0 0 0.3 0.3 0.3 0 0 0.3 0.3 0.3 0 0 0 0 0 1 0'/%3E%3C/filter%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='white' opacity='0.5' filter='url(%23marble)'/%3E%3C/svg%3E")`,
      backgroundBlendMode: "multiply",
    },
  },
}

export function getWallpaperStyle(wallpaperName: string) {
  return wallpapers[wallpaperName as keyof typeof wallpapers]?.style || wallpapers["Windows 98"].style
}
