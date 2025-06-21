# 🚀 Deployment Guide

This guide covers various deployment options for the Windows 98 Emulator project.

## 📋 Prerequisites

- Node.js 18+ installed
- Git repository access
- Build tools (npm/yarn/pnpm)

## 🌐 Deployment Platforms

### Vercel (Recommended)
Vercel provides seamless Next.js deployment with automatic builds.

#### Quick Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/devvyyxyz/windows-98-site)

#### Manual Deployment
1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

#### Configuration
Create `vercel.json` for custom settings:
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

### Netlify
1. **Connect Repository**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `out` (if using static export)
   - Node version: 18

3. **Environment Variables**
   Set any required environment variables in Netlify dashboard

### GitHub Pages
For static deployment using Next.js static export:

1. **Configure Next.js for static export**
   ```javascript
   // next.config.mjs
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     trailingSlash: true,
     images: {
       unoptimized: true
     }
   }
   
   export default nextConfig
   ```

2. **Add deployment script to package.json**
   ```json
   {
     "scripts": {
       "deploy": "npm run build && npx gh-pages -d out"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm install -g gh-pages
   npm run deploy
   ```

### Railway
1. **Connect Repository**
   - Go to [Railway](https://railway.app)
   - Create new project from GitHub repo

2. **Configuration**
   Railway auto-detects Next.js projects. No additional config needed.

3. **Environment Variables**
   Set variables in Railway dashboard if needed.

### Docker Deployment

#### Dockerfile
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

#### Docker Compose
```yaml
version: '3.8'
services:
  windows98-emulator:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
```

#### Build and Run
```bash
docker build -t windows98-emulator .
docker run -p 3000:3000 windows98-emulator
```

## ⚙️ Build Configuration

### Environment Variables
Create `.env.local` for local development:
```env
# Add any environment variables here
NEXT_PUBLIC_APP_NAME=Windows 98 Emulator
NEXT_PUBLIC_VERSION=2.0.0
```

### Build Optimization
```javascript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable compression
  compress: true,
  
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  
  // Enable experimental features
  experimental: {
    optimizeCss: true,
  },
  
  // Bundle analyzer (optional)
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config) => {
      config.plugins.push(new (require('@next/bundle-analyzer'))())
      return config
    }
  })
}

export default nextConfig
```

## 🔧 Performance Optimization

### Build Performance
- **Use npm ci** instead of npm install in production
- **Enable caching** in CI/CD pipelines
- **Optimize bundle size** with tree shaking
- **Use CDN** for static assets

### Runtime Performance
- **Enable compression** (gzip/brotli)
- **Use CDN** for global distribution
- **Implement caching** headers
- **Monitor performance** with analytics

## 🚨 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Next.js cache
rm -rf .next
npm run build
```

#### Memory Issues
```bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

#### Static Export Issues
Ensure all dynamic routes are properly configured for static generation.

### Debugging
1. **Check build logs** for specific error messages
2. **Verify Node.js version** compatibility
3. **Test locally** before deploying
4. **Check environment variables** are set correctly

## 📊 Monitoring

### Analytics
Add analytics to track usage:
```javascript
// Add to app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### Performance Monitoring
- **Core Web Vitals**: Monitor loading performance
- **Error Tracking**: Use services like Sentry
- **Uptime Monitoring**: Use services like Pingdom

## 🔄 CI/CD Pipeline

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run build
      - run: npm run test # if you have tests
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 🎯 Best Practices

1. **Use environment-specific configs**
2. **Implement proper error handling**
3. **Set up monitoring and alerts**
4. **Use HTTPS in production**
5. **Implement proper caching strategies**
6. **Regular security updates**
7. **Backup deployment configurations**

---

**Choose the deployment method that best fits your needs and infrastructure requirements! 🚀**
