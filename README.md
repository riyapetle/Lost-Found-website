<<<<<<< HEAD
# Campus Lost & Found Portal

A vanilla HTML/CSS/JavaScript application for managing lost and found items on campus. This is a fully functional web application that can be deployed directly to GitHub Pages.

## Features

- **Report Lost Items**: Users can submit details about items they've lost
- **Report Found Items**: Users can submit details about items they've found
- **Browse All Items**: Dashboard view to browse all lost and found items
- **Photo Upload**: Cloudinary integration for item photos
- **Real-time Database**: Supabase backend for data persistence
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Clean UI**: Modern, intuitive interface

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Backend**: Supabase (PostgreSQL database)
- **Image Storage**: Cloudinary
- **Hosting**: GitHub Pages
- **Styling**: Custom CSS (converted from Tailwind CSS)
- **Icons**: Custom SVG icons

## File Structure

```
campus-lost-found-vanilla/
├── index.html              # Home page
├── lost-form.html          # Lost item report form
├── found-form.html         # Found item report form  
├── dashboard.html          # Items dashboard
├── css/
│   └── styles.css          # All styling
├── js/
│   ├── navigation.js       # Navigation and UI utilities
│   ├── supabase.js         # Database operations
│   └── cloudinary.js       # Image upload functionality
└── README.md               # This file
```

## Setup Instructions

### 1. Clone or Download
Download this project to your local machine.

### 2. Configure Supabase (Optional)
The project includes pre-configured Supabase credentials. If you want to use your own database:

1. Create a free Supabase account at https://supabase.com
2. Create a new project
3. Run the SQL migration from the original project to create the `items` table
4. Update the credentials in `js/supabase.js`

### 3. Deploy to GitHub Pages

#### Option A: Using GitHub Web Interface
1. Create a new repository on GitHub
2. Upload all files to the repository
3. Go to Settings → Pages
4. Select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Click Save
7. Your site will be available at: `https://yourusername.github.io/your-repo-name`

#### Option B: Using Git Commands
```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit - Campus Lost & Found Portal"

# Add GitHub remote (replace with your repo URL)
git remote add origin https://github.com/yourusername/your-repo-name.git

# Push to GitHub
git branch -M main
git push -u origin main

# Enable GitHub Pages in repository settings
```

### 4. Access Your Website
Once deployed, your website will be accessible at:
`https://yourusername.github.io/your-repo-name`

## Usage

### For Users Reporting Lost Items:
1. Click "I Lost It :(" on the home page
2. Fill in item details (name, description, location, date)
3. Optionally upload a photo
4. Submit the form

### For Users Reporting Found Items:
1. Click "I Found It!" on the home page
2. Fill in item details (name, description, location, date)
3. Upload a photo (recommended for found items)
4. Submit the form

### For Browsing Items:
1. Click "View All Items" on the home page
2. Use filter buttons to view All, Lost, or Found items
3. Browse through item cards to find matches

## Database Schema

The application uses a single `items` table with the following structure:

```sql
CREATE TABLE items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  date date NOT NULL,
  status text NOT NULL CHECK (status IN ('Lost', 'Found')),
  photo_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

## Security Features

- Input validation and sanitization
- SQL injection protection via Supabase
- XSS protection through HTML escaping
- File upload validation for images
- Row Level Security (RLS) enabled on database

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Development

### Local Development
Simply open `index.html` in a web browser to run locally. For the full functionality including database operations, you'll need an active internet connection.

### Making Changes
All styles are in `css/styles.css` and JavaScript functionality is split across the `js/` directory files.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For issues or questions, please open an issue on the GitHub repository.
=======
# Lost-Found-website
>>>>>>> 6cb27f647669629bdc0a3c98bfb3d6c03da9656f
