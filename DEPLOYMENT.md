# Deployment Instructions for Campus Lost & Found Portal

## Quick Deployment to GitHub Pages

Follow these simple steps to deploy your Campus Lost & Found Portal to GitHub Pages:

### Step 1: Create GitHub Repository
1. Go to [GitHub.com](https://github.com)
2. Click the "+" icon → "New repository"
3. Name your repository (e.g., `campus-lost-found`)
4. Make sure it's **Public** (required for free GitHub Pages)
5. Do NOT initialize with README (we already have files)
6. Click "Create repository"

### Step 2: Upload Files

#### Option A: Using GitHub Web Interface (Easiest)
1. On your new repository page, click "uploading an existing file"
2. Drag and drop ALL files from the `campus-lost-found-vanilla` folder:
   - `index.html`
   - `lost-form.html`
   - `found-form.html`
   - `dashboard.html`
   - `css/styles.css`
   - `js/navigation.js`
   - `js/supabase.js`
   - `js/cloudinary.js`
   - `README.md`
   - `.nojekyll`
3. Add commit message: "Initial deployment of Campus Lost & Found Portal"
4. Click "Commit changes"

#### Option B: Using Git Commands
```bash
# Navigate to your project folder
cd "C:\Users\Ameya petle\OneDrive\Desktop\campus-lost-found-vanilla"

# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial deployment of Campus Lost & Found Portal"

# Add your GitHub repository as remote (replace USERNAME and REPO)
git remote add origin https://github.com/USERNAME/REPO.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select "Deploy from a branch"
5. Choose "main" branch
6. Select "/ (root)" as the folder
7. Click "Save"

### Step 4: Access Your Website
- Your website will be available at: `https://USERNAME.github.io/REPO-NAME`
- It may take a few minutes to become available
- GitHub will show you the URL in the Pages settings

## Configuration Notes

### Supabase Database
- The project is pre-configured with a working Supabase database
- Items submitted will be stored in a shared database
- To use your own database, update credentials in `js/supabase.js`

### Cloudinary Images
- Pre-configured with demo Cloudinary account
- For production use, create your own Cloudinary account
- Update credentials in `js/cloudinary.js`

### Custom Domain (Optional)
To use a custom domain:
1. Add a `CNAME` file to your repository with your domain name
2. Configure DNS settings with your domain provider
3. Enable HTTPS in GitHub Pages settings

## Troubleshooting

### Common Issues:

**Website not loading:**
- Check that GitHub Pages is enabled in repository settings
- Ensure repository is public
- Wait 5-10 minutes after enabling Pages

**JavaScript errors:**
- Check browser console for specific errors
- Ensure all files were uploaded correctly
- Verify internet connection (required for Supabase)

**Database not working:**
- Check browser console for database connection errors
- Ensure Supabase credentials are correct
- Verify internet connection

**Images not uploading:**
- Check browser console for Cloudinary errors
- Verify image file size is under 10MB
- Ensure image format is supported (JPG, PNG, GIF, WebP)

### File Structure Verification
Your repository should contain:
```
/
├── index.html
├── lost-form.html
├── found-form.html
├── dashboard.html
├── README.md
├── DEPLOYMENT.md
├── .nojekyll
├── css/
│   └── styles.css
└── js/
    ├── navigation.js
    ├── supabase.js
    └── cloudinary.js
```

## Testing Your Deployment

1. Visit your GitHub Pages URL
2. Test navigation between all pages
3. Try submitting a test lost item
4. Try submitting a test found item
5. Check the dashboard to see your items

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify all files are present in your repository
3. Ensure GitHub Pages is properly configured
4. Wait a few minutes and try again

Your Campus Lost & Found Portal is now ready for use!