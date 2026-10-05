// --- 1. Reusable Toast Notification Utility ---
function showToast(message, type = 'info', duration = 3000) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  
  container.appendChild(toast);

  // Return dismiss handler for controllable notifications (like loading)
  const dismiss = () => toast.remove();

  if (duration > 0) {
    setTimeout(dismiss, duration);
  }

  return { dismiss };
}

// --- 2. Simple Single-Page Navigation ---
function navigate(pageId) {
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
}

// --- 3. Modal Controls ---
function openModal() {
  document.getElementById('modal').style.display = 'block';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
  document.getElementById('login-form').reset();
}

// --- 4. Form Validation & Login Handler ---
function handleLogin(event) {
  event.preventDefault();

  const emailInput = document.getElementById('email').value;
  const passwordInput = document.getElementById('password').value;

  // Validation Rules
  if (!emailInput.trim() || !passwordInput.trim()) {
    return showToast('Fields cannot be empty.', 'error');
  }

  if (emailInput !== emailInput.trim() || passwordInput !== passwordInput.trim()) {
    return showToast('Remove leading or trailing spaces.', 'error');
  }

  if (!emailInput.includes('@') || emailInput.length < 5) {
    return showToast('Please enter a valid email address.', 'error');
  }

  if (passwordInput.length < 6) {
    return showToast('Password must be at least 6 characters long.', 'error');
  }

  // Success
  showToast('Signed in successfully!', 'success');
  closeModal();
}

// --- 5. Additional User Feedback Example ---
function loadData() {
  const loadingToast = showToast('Loading data...', 'loading', 0);

  setTimeout(() => {
    loadingToast.dismiss();
    showToast('Data loaded successfully!', 'info');
  }, 2000);
}
