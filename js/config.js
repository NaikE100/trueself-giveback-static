// API Configuration
// Update this URL to point to your DirectAdmin server where the PHP APIs are hosted
// Example: 'https://trueselfgiveback.com/api' or 'https://yourdomain.com/api'
const API_BASE_URL = 'https://trueselfgiveback.com/api';

// API Endpoints
// Note: Using rewrite rules from .htaccess (without .php extension)
// If direct .php access doesn't work, try with .php extension
const API_ENDPOINTS = {
    stats: `${API_BASE_URL}/stats`,      // Rewrite rule: /stats -> stats.php
    entries: `${API_BASE_URL}/entries`, // Rewrite rule: /entries -> entries.php
    upload: `${API_BASE_URL}/upload`    // Rewrite rule: /upload -> upload.php
};

