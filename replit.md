# TrueSelf #NoFilterGiveBack

## Overview
TrueSelf is an authentic selfie competition website that celebrates unfiltered authenticity while raising funds for mental health charities. Users can submit their no-filter selfies with a R70 entry fee, where R50 goes to charity and R20 goes to the prize pool.

## Project Type
Static website with interactive frontend (HTML/CSS/JavaScript)

## Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript
- **3D Graphics**: Three.js (for particle background effects)
- **Payment Integration**: PayFast (South African payment gateway)
- **Server**: Python 3.11 HTTP server

## Project Structure
```
.
├── index.html          # Main website page
├── css/
│   └── style.css      # Styles and animations
├── js/
│   └── app.js         # JavaScript logic, form validation, 3D effects
├── images/            # Image assets directory
├── server.py          # Python HTTP server with cache control
└── replit.md          # Project documentation
```

## Features
1. **Hero Section** - Animated statistics showing entries and funds raised
2. **Mission Statement** - Information about authenticity and mental health
3. **How It Works** - Step-by-step guide for participants
4. **Entry Form** - Complete form with:
   - Personal information (name, email, phone)
   - Social media handle (optional)
   - Caption (optional)
   - Selfie upload with drag & drop
   - Form validation
5. **Payment Integration** - PayFast payment gateway (sandbox mode)
6. **3D Background** - Three.js particle animation effect

## Setup & Running
The website is served on port 5000 using a Python HTTP server with proper cache control headers.

**Workflow**: `TrueSelf Web Server`
- Command: `python3 server.py`
- Port: 5000
- Output: Webview

## Recent Changes
- **2024-10-11**: Initial setup in Replit environment
  - Organized file structure (css/, js/, images/ directories)
  - Created complete HTML structure with all sections
  - Implemented full CSS styling with responsive design
  - Set up Python HTTP server with cache control
  - Configured workflow for port 5000

## Payment Integration
The website uses PayFast (South African payment provider) in sandbox mode:
- Entry fee: R70
- Charity allocation: R50
- Prize pool: R20

Note: Firebase configuration in the original code has placeholder values and needs actual Firebase credentials for backend functionality.

## Known Issues
- Three.js WebGL may have rendering limitations in some environments
- Firebase configuration contains placeholder values (not functional without real credentials)

## Deployment
Ready for deployment using Replit's autoscale deployment option.
