// API Configuration
// Update this URL to point to your DirectAdmin server where the PHP APIs are hosted
// Example: 'https://trueselfgiveback.com/api' or 'https://yourdomain.com/api'
const API_BASE_URL = 'https://trueselfgiveback.com/api';

// API Endpoints
// Try direct .php access first (rewrite rules may not be active)
const API_ENDPOINTS = {
    stats: `${API_BASE_URL}/stats.php`,
    entries: `${API_BASE_URL}/entries.php`,
    upload: `${API_BASE_URL}/upload.php`
};

