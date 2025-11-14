// Initialize Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('scene-container').appendChild(renderer.domElement);

// Create floating particles
const particlesGeometry = new THREE.BufferGeometry();
const particleCount = 1000;
const posArray = new Float32Array(particleCount * 3);

for(let i = 0; i < particleCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.05,
    color: 0x6A35FF,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Animation loop
const animate = () => {
    requestAnimationFrame(animate);
    
    particlesMesh.rotation.x += 0.0005;
    particlesMesh.rotation.y += 0.0005;
    
    renderer.render(scene, camera);
};

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Form Handling
const entryForm = document.getElementById('entry-form');
const payfastForm = document.getElementById('payfast-form');
const uploadArea = document.getElementById('upload-area');
const selfieInput = document.getElementById('selfie');

// Validate form before PayFast submission
entryForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if(validateForm()) {
        preparePayFastSubmission();
    }
});

// Custom file upload handling
selfieInput.addEventListener('change', function() {
    if(this.files && this.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadArea.innerHTML = `
                <img src="${e.target.result}" alt="Preview">
                <p>${selfieInput.files[0].name}</p>
            `;
            uploadArea.classList.add('has-image');
        };
        reader.readAsDataURL(this.files[0]);
    }
});

// Drag and drop for upload area
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    uploadArea.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

['dragenter', 'dragover'].forEach(eventName => {
    uploadArea.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
    uploadArea.addEventListener(eventName, unhighlight, false);
});

function highlight() {
    uploadArea.classList.add('highlight');
}

function unhighlight() {
    uploadArea.classList.remove('highlight');
}

uploadArea.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    selfieInput.files = files;
    const event = new Event('change');
    selfieInput.dispatchEvent(event);
}

// Form validation
function validateForm() {
    let isValid = true;
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const selfie = selfieInput.files[0];

    // Reset errors
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
    });

    // Validate name
    if(!name) {
        showError('name', 'Please enter your full name');
        isValid = false;
    }

    // Validate email
    if(!email || !/^\S+@\S+\.\S+$/.test(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate phone (South African numbers)
    if(!phone || !/^(\+27|0)[6-8][0-9]{8}$/.test(phone)) {
        showError('phone', 'Please enter a valid South African number');
        isValid = false;
    }

    // Validate selfie
    if(!selfie) {
        showError('selfie', 'Please upload your selfie');
        isValid = false;
    } else if(!selfie.type.match('image.*')) {
        showError('selfie', 'Please upload an image file');
        isValid = false;
    }

    return isValid;
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.form-group');
    formGroup.classList.add('error');
    
    const errorElement = document.getElementById(`${fieldId}-error`);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// Prepare PayFast submission
async function preparePayFastSubmission() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const social = document.getElementById('social').value.trim();
    const caption = document.getElementById('caption').value.trim();
    const selfieFile = selfieInput.files[0];
    
    if (!selfieFile) {
        showError('selfie', 'Please upload your selfie');
        return;
    }
    
    // Show loading state
    const submitButton = document.querySelector('.payfast-button');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Uploading selfie...';
    
    try {
        // Step 1: Upload selfie image
        // Note: API accepts 'file', 'image', or 'selfie' - using 'selfie' for clarity
        const formData = new FormData();
        formData.append('selfie', selfieFile);
        // Also try 'file' as fallback if 'selfie' doesn't work
        // formData.append('file', selfieFile);
        
        const uploadResponse = await fetch(API_ENDPOINTS.upload, {
            method: 'POST',
            body: formData
        });
        
        // Check if response is actually JSON
        const contentType = uploadResponse.headers.get('content-type');
        const responseText = await uploadResponse.text();
        
        if (!contentType || !contentType.includes('application/json')) {
            // Server returned HTML or other non-JSON response
            console.error('API returned non-JSON response:', responseText.substring(0, 200));
            throw new Error(`API error: Server returned ${uploadResponse.status} ${uploadResponse.statusText}. Please check that the upload endpoint exists at ${API_ENDPOINTS.upload}`);
        }
        
        let uploadData;
        try {
            uploadData = JSON.parse(responseText);
        } catch (e) {
            console.error('Failed to parse JSON:', responseText.substring(0, 200));
            throw new Error('Server returned invalid JSON. Please check the API endpoint.');
        }
        
        if (!uploadResponse.ok) {
            throw new Error(uploadData.error || `Upload failed: ${uploadResponse.status} ${uploadResponse.statusText}`);
        }
        
        const selfieUrl = uploadData.url || uploadData.selfie_url;
        
        if (!selfieUrl) {
            throw new Error('Server did not return image URL');
        }
        
        // Step 2: Generate unique payment ID
        const paymentId = `TS-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        
        // Step 3: Create entry in database (before payment)
        // Note: API expects 'instagram' not 'social_media', and requires 'age'
        // Note: payment_id is needed for PayFast IPN handler to match entries
        const entryData = {
            name: name,
            email: email,
            phone: phone,
            instagram: social || null, // API uses 'instagram' field
            selfie_url: selfieUrl,
            age: 18, // Default age - API requires this field (13-120)
            payment_id: paymentId // Required for PayFast IPN to match entries
        };
        
        const entryResponse = await fetch(API_ENDPOINTS.entries, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entryData)
        });
        
        // Check if response is JSON
        const entryContentType = entryResponse.headers.get('content-type');
        const entryResponseText = await entryResponse.text();
        
        if (!entryContentType || !entryContentType.includes('application/json')) {
            console.error('Entries API returned non-JSON:', entryResponseText.substring(0, 200));
            throw new Error(`API error: Server returned ${entryResponse.status}. Please check that the entries endpoint exists at ${API_ENDPOINTS.entries}`);
        }
        
        let entryResponseData;
        try {
            entryResponseData = JSON.parse(entryResponseText);
        } catch (e) {
            console.error('Failed to parse entries JSON:', entryResponseText.substring(0, 200));
            throw new Error('Server returned invalid JSON for entry creation.');
        }
        
        if (!entryResponse.ok) {
            throw new Error(entryResponseData.error || 'Failed to create entry');
        }
        
        // Step 4: Set PayFast hidden fields
        document.getElementById('payfast-email').value = email;
        document.getElementById('payment-id').value = paymentId;
        document.getElementById('participant-name').value = name;
        
        // Build the payload we will submit (must exactly match fields sent)
        const amountRaw = (document.querySelector('#payfast-form [name="amount"]').value || '70').toString();
        const amount = (Number(amountRaw)).toFixed(2);
        document.querySelector('#payfast-form [name="amount"]').value = amount;

        const form = document.getElementById('payfast-form');
        const data = {
            merchant_id: form.querySelector('[name="merchant_id"]').value,
            merchant_key: form.querySelector('[name="merchant_key"]').value,
            return_url: form.querySelector('[name="return_url"]').value,
            cancel_url: form.querySelector('[name="cancel_url"]').value,
            notify_url: form.querySelector('[name="notify_url"]').value,
            m_payment_id: form.querySelector('[name="m_payment_id"]').value,
            amount: form.querySelector('[name="amount"]').value,
            item_name: form.querySelector('[name="item_name"]').value,
            email_address: form.querySelector('[name="email_address"]').value,
            name_first: form.querySelector('[name="name_first"]').value
        };

        // Create signature (no passphrase in browser; if you add one, calculate on server)
        const signatureBase = Object.keys(data)
            .sort()
            .map(k => `${k}=${encodeURIComponent(data[k])}`)
            .join('&');

        const passphrase = ''; // Leave blank here; if you enable a passphrase, move hashing server-side
        const stringToHash = passphrase ? `${signatureBase}&passphrase=${encodeURIComponent(passphrase)}` : signatureBase;
        const signature = md5(stringToHash);

        // Ensure signature input exists and set it
        let sigInput = form.querySelector('input[name="signature"]');
        if (!sigInput) {
            sigInput = document.createElement('input');
            sigInput.type = 'hidden';
            sigInput.name = 'signature';
            form.appendChild(sigInput);
        }
        sigInput.value = signature;

        // Store entry data temporarily for return page
        localStorage.setItem('currentEntry', JSON.stringify({
            id: paymentId,
            name,
            email,
            phone,
            timestamp: new Date().toISOString()
        }));
        
        // Submit to PayFast
        payfastForm.submit();
        
    } catch (error) {
        console.error('Error preparing submission:', error);
        alert('Error: ' + error.message + '\n\nPlease try again or contact support.');
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    }
}

// Fetch and animate stats from API
async function animateStats() {
    const entriesElement = document.getElementById('entries-count');
    const fundsElement = document.getElementById('funds-raised');
    
    try {
        // Fetch real stats from API
        const response = await fetch(API_ENDPOINTS.stats);
        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                const targetEntries = data.completed_entries || 0;
                const targetFunds = data.total_funds_raised || 0;
                
                // Animate to real values
                animateValue(entriesElement, 0, targetEntries, (val) => val.toLocaleString());
                animateValue(fundsElement, 0, targetFunds, (val) => `R${val.toLocaleString()}`);
                return;
            }
        }
    } catch (error) {
        console.warn('Could not fetch stats from API, using fallback values:', error);
    }
    
    // Fallback to default values if API fails
    const targetEntries = 1427;
    const targetFunds = 99890;
    
    animateValue(entriesElement, 0, targetEntries, (val) => val.toLocaleString());
    animateValue(fundsElement, 0, targetFunds, (val) => `R${val.toLocaleString()}`);
}

// Helper function to animate numeric values
function animateValue(element, start, end, formatter) {
    const duration = 2000; // 2 seconds
    const steps = 100;
    const increment = (end - start) / steps;
    const stepDuration = duration / steps;
    
    let current = start;
    const interval = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(interval);
        }
        element.textContent = formatter(Math.floor(current));
    }, stepDuration);
}

// Test API connection on load (for debugging)
async function testAPIConnection() {
    try {
        const response = await fetch(API_ENDPOINTS.stats);
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            console.log('✅ API connection successful');
        } else {
            console.warn('⚠️ API returned non-JSON response. Check API URL:', API_BASE_URL);
        }
    } catch (error) {
        console.error('❌ API connection failed:', error);
        console.error('API URL:', API_BASE_URL);
    }
}

// Initialize on load
window.addEventListener('load', () => {
    animateStats();
    testAPIConnection(); // Test API on page load
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});