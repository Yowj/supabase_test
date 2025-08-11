# Deployment Guide: Supabase + Vercel

## Prerequisites
- Supabase project created
- Vercel account

## Step 1: Deploy to Vercel

1. **Connect Repository**
   - Push your code to GitHub/GitLab/Bitbucket
   - Connect repository to Vercel

2. **Configure Environment Variables**
   In Vercel dashboard > Project Settings > Environment Variables, add:
   ```
   VITE_SUPABASE_URL = your_supabase_project_url
   VITE_SUPABASE_ANON_KEY = your_supabase_anon_key
   ```

3. **Get Supabase Credentials**
   - Go to Supabase Dashboard
   - Select your project
   - Go to Settings > API
   - Copy `Project URL` and `anon/public` key

## Step 2: Configure Supabase

1. **Update Site URL**
   - Go to Supabase Dashboard > Authentication > URL Configuration
   - Set Site URL to your Vercel domain: `https://your-app.vercel.app`

2. **Add Redirect URLs**
   - Add your Vercel domain to redirect URLs:
     - `https://your-app.vercel.app`
     - `https://your-app.vercel.app/**`

3. **Configure OAuth Providers** (if using Google/GitHub)
   - Update redirect URLs in your OAuth provider settings
   - Use: `https://your-project.supabase.co/auth/v1/callback`

## Step 3: Deploy

1. **Trigger Deployment**
   - Push changes to your repository
   - Vercel will automatically deploy

2. **Test Authentication**
   - Visit your deployed app
   - Test sign up/sign in functionality
   - Check if OAuth providers work

## Common Issues

- **Auth redirect errors**: Check redirect URLs in Supabase
- **Environment variables not loading**: Ensure they're set in Vercel dashboard
- **Build failures**: Check if all dependencies are in package.json

## Build Command
```bash
npm run build
```

## Output Directory
```
dist
```