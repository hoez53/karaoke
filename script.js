const API_KEY = 'AIzaSyAbHeWC_oUp7DUisor9O7hZ5tgRbgb2zVU';
const BACKEND_URL = 'https://74376f10-b037-480f-a9fd-80eef98f12f0-00-2uf6ippqjdnsy.sisko.replit.dev/';

// Check if user is authenticated and show content accordingly
function checkAuth() {
  const token = localStorage.getItem('token');
  if (token) {
    document.getElementById('content').classList.remove('hidden');
    document.getElementById('login-form-container').classList.add('hidden');
    document.getElementById('register-form-container').classList.add('hidden');
  } else {
    document.getElementById('content').classList.add('hidden');
  }
}

// Switch between login and registration forms
document.getElementById('login-tab').addEventListener('click', () => {
  document.getElementById('login-form-container').classList.remove('hidden');
  document.getElementById('register-form-container').classList.add('hidden');
});

document.getElementById('register-tab').addEventListener('click', () => {
  document.getElementById('register-form-container').classList.remove('hidden');
  document.getElementById('login-form-container').classList.add('hidden');
});

// Handle user login
document.getElementById('login-btn').addEventListener('click', async () => {
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value.trim();

  if (!username || !password) {
    alert('Please fill in both fields.');
    return;
  }

  const response = await fetch(`${BACKEND_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  if (data.success) {
    localStorage.setItem('token', data.token);
    alert('Login successful!');
    checkAuth();
  } else {
    alert('Invalid username or password.');
  }
});

// Handle user registration
document.getElementById('register-btn').addEventListener('click', async () => {
  const username = document.getElementById('register-username').value.trim();
  const password = document.getElementById('register-password').value.trim();

  if (!username || !password) {
    alert('Please fill in both fields.');
    return;
  }

  const response = await fetch(`${BACKEND_URL}/api/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  if (data.success) {
    alert('Registration successful! You can now log in.');
    document.getElementById('login-tab').click();
  } else {
    alert('Registration failed. Username may already exist.');
  }
});

// Search for karaoke videos
document.getElementById('search-btn').addEventListener('click', async () => {
  const query = document.getElementById('search-input').value.trim();
  const resultsDiv = document.getElementById('video-results');
  resultsDiv.innerHTML = '';

  if (!query) {
    alert('Please enter a search term.');
    return;
  }

  const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query} karaoke&type=video&key=${API_KEY}`);
  const data = await response.json();

  data.items.forEach(item => {
    const videoId = item.id.videoId;
    const title = item.snippet.title;
    const thumbnail = item.snippet.thumbnails.medium.url;

    const videoCard = `
      <div class="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-300">
        <img src="${thumbnail}" alt="${title}" class="w-full h-40 object-cover">
        <div class="p-4">
          <h3 class="text-lg font-semibold mb-2">${title}</h3>
          <iframe width="100%" height="200" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen class="rounded"></iframe>
        </div>
      </div>`;
    resultsDiv.innerHTML += videoCard;
  });
});

// Check authentication on page load
checkAuth();
