const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const logoutBtn = document.getElementById('logout-btn');

// Toggle between login and signup forms



// Login form submission
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    const response = await fetch('https://dark-windbreaker-ant.cyclic.app/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
        console.log(data)
        alert(data.msg);
      localStorage.setItem('token', JSON.stringify(data.token));
      logoutBtn.style.display = 'block';
    } else {
      alert(data.msg);
    }
  } catch (error) {
    console.error(error);
    alert('Something went wrong');
  }
});

// Signup form submission
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const confirmPassword = document.getElementById('signup-confirm-password').value;

  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  try {
    const response = await fetch('https://dark-windbreaker-ant.cyclic.app/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      alert(data.msg);
    
    } else {
      alert(data.msg);
    }
  } catch (error) {
   console.log(error)
    alert('Something went wrong');
  }
});

// Logout functionality
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('token');
  logoutBtn.style.display = 'none';
});

// Check if user is already logged in
const token = localStorage.getItem('token');
if (token) {
  logoutBtn.style.display = 'block';
}
