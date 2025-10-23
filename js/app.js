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
function preparePayFastSubmission() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    
    // Generate unique payment ID
    const paymentId = `TS-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    // Set PayFast hidden fields
    document.getElementById('payfast-email').value = email;
    document.getElementById('payment-id').value = paymentId;
    document.getElementById('participant-name').value = name;
    
    // Store entry data temporarily (in a real app, you'd send to your server)
    const entryData = {
        id: paymentId,
        name,
        email,
        phone,
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('currentEntry', JSON.stringify(entryData));
    
    // Submit to PayFast
    payfastForm.submit();
}

// Animate stats on load
function animateStats() {
    const entriesElement = document.getElementById('entries-count');
    const fundsElement = document.getElementById('funds-raised');
    
    const targetEntries = 1427;
    const targetFunds = 99890;
    
    let currentEntries = 0;
    let currentFunds = 0;
    
    const entriesInterval = setInterval(() => {
        currentEntries += Math.ceil(targetEntries / 100);
        if(currentEntries >= targetEntries) {
            currentEntries = targetEntries;
            clearInterval(entriesInterval);
        }
        entriesElement.textContent = currentEntries.toLocaleString();
    }, 20);
    
    const fundsInterval = setInterval(() => {
        currentFunds += Math.ceil(targetFunds / 100);
        if(currentFunds >= targetFunds) {
            currentFunds = targetFunds;
            clearInterval(fundsInterval);
        }
        fundsElement.textContent = `R${currentFunds.toLocaleString()}`;
    }, 20);
}

// Initialize on load
window.addEventListener('load', () => {
    animateStats();
    
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