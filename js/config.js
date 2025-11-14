// API Configuration
// Use relative path when deployed on same domain as API
// For DirectAdmin deployment: use '/api' (relative path)
// For Netlify deployment: use 'https://trueselfgiveback.com/api' (absolute URL)
const API_BASE_URL = '/api'; // Relative path - works when site and API are on same domain

// API Endpoints
// Try direct .php access first (rewrite rules may not be active)
const API_ENDPOINTS = {
    stats: `${API_BASE_URL}/stats.php`,
    entries: `${API_BASE_URL}/entries.php`,
    upload: `${API_BASE_URL}/upload.php`
};

