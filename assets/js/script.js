// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Reveal all page-enter elements
    const elements = document.querySelectorAll('.page-enter');
    elements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.15}s`;
    });
});

// Utility function to simulate network delay
const simulateDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Login Function
async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const btnText = document.getElementById('btn-text');
    const btnLoader = document.getElementById('btn-loader');
    
    if(!email || !password) {
        showToast('Please enter both email and password.', 'error');
        return;
    }

    // Toggle loader
    btnText.classList.add('hidden');
    btnLoader.classList.remove('hidden');

    try {
        await simulateDelay(1500); // 1.5s delay
        
        // Simulating success
        if (email === 'admin@verifyhub.com' && password === 'admin123') {
            showToast('Login Successful!', 'success');
            localStorage.setItem('isAuthenticated', 'true');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 500);
        } else {
            showToast('Invalid Credentials. Try admin@verifyhub.com / admin123', 'error');
        }
    } finally {
        btnText.classList.remove('hidden');
        btnLoader.classList.add('hidden');
    }
}

// Navigation Logic
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

// Logout 
function handleLogout() {
    localStorage.removeItem('isAuthenticated');
    window.location.href = 'index.html';
}

// Check Authentication wrapper (for dashboard/verify pages)
function checkAuth() {
    if(localStorage.getItem('isAuthenticated') !== 'true') {
        window.location.href = 'index.html';
    }
}

// Toast Notification System
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `flexitems-center p-4 mb-4 rounded-lg shadow-lg transform transition-all duration-300 ease-out translate-y-10 opacity-0 min-w-[300px] z-50`;
    
    let bgClasses = '';
    let icon = '';
    
    if (type === 'success') {
        bgClasses = 'bg-green-900 border border-green-700 text-green-100';
        icon = '<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>';
    } else if (type === 'error') {
        bgClasses = 'bg-red-900 border border-red-700 text-red-100';
        icon = '<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>';
    } else {
        bgClasses = 'bg-blue-900 border border-blue-700 text-blue-100';
        icon = '<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
    }

    toast.classList.add(...bgClasses.split(' '));
    toast.innerHTML = `<div class="flex items-center w-full">${icon}<span class="font-medium inline-block">${message}</span></div>`;
    
    toastContainer.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.classList.remove('translate-y-10', 'opacity-0');
    }, 10);

    // Remove after 3s
    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-[-10px]');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
