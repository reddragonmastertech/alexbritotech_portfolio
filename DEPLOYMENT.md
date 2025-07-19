# 🚀 Deployment Guide

This project is configured for automatic deployment to Vercel with GitHub Actions CI/CD.

## Setup Instructions

### 1. Vercel Setup
1. Go to [Vercel](https://vercel.com) and sign up/login
2. Connect your GitHub repository
3. Import this project to Vercel
4. Get your Vercel tokens and IDs:
   - Go to Vercel Dashboard → Settings → Tokens → Create Token
   - Go to your project settings to get Project ID and Org ID

### 2. GitHub Secrets Setup
Add these secrets to your GitHub repository:
- Go to your repo → Settings → Secrets and variables → Actions
- Add the following secrets:

```
VERCEL_TOKEN=your-vercel-token-from-step-1
VERCEL_ORG_ID=team_KhNy5A0TWAiZ57RYznWAtcqf
VERCEL_PROJECT_ID=prj_A8q5MFMYvEPWF3ATHeeGBtffuEES
```

**📋 Detailed Steps:**
1. **Go to GitHub**: https://github.com/giasinguyen/GiaSi-Portfolio
2. **Navigate to**: Settings → Secrets and variables → Actions
3. **Add Repository Secrets**:
   - Click "New repository secret"
   - Name: `VERCEL_TOKEN`, Value: [Your Vercel token from step 1]
   - Name: `VERCEL_ORG_ID`, Value: `team_KhNy5A0TWAiZ57RYznWAtcqf`
   - Name: `VERCEL_PROJECT_ID`, Value: `prj_A8q5MFMYvEPWF3ATHeeGBtffuEES`

### 3. Environment Variables (Optional)
Set up environment variables in Vercel dashboard:
- Go to Project Settings → Environment Variables
- Add any needed environment variables

## Deployment Process

### Automatic Deployment
- **Push to `main`** → Deploys to production
- **Pull Request** → Creates preview deployment
- **Merge PR** → Automatically deploys to production

### Manual Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## Build Process
The project uses Vite for building:
```bash
npm run build    # Creates dist/ folder
npm run preview  # Preview production build locally
```

## CI/CD Pipeline Features
- ✅ Automated testing and linting
- ✅ Preview deployments for PRs
- ✅ Production deployment on merge
- ✅ Build optimization
- ✅ Error notifications

## Project Structure
```
├── .github/workflows/    # GitHub Actions
├── dist/                 # Build output
├── public/               # Static assets
├── src/                  # Source code
├── vercel.json          # Vercel configuration
└── package.json         # Dependencies & scripts
```

## Performance Optimizations
- Code splitting with Vite
- Image optimization
- CSS purging with Tailwind
- Bundle compression
- Static asset caching

## Monitoring
After deployment, monitor your app:
- Vercel Analytics (built-in)
- Performance insights
- Error tracking
- Build logs

## Troubleshooting

### Common Issues:
1. **Build fails** → Check console logs in Vercel dashboard
2. **404 errors** → Verify `vercel.json` routing configuration
3. **Environment variables** → Check Vercel project settings

### Debug Commands:
```bash
npm run build        # Test build locally
npm run preview      # Test production build
vercel logs          # Check deployment logs
```
