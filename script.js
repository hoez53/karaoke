const API_KEY = 'AIzaSyAbHeWC_oUp7DUisor9O7hZ5tgRbgb2zVU';
const BACKEND_URL = 'https://karaoke-backend-your-repl-url.repl.co'; // Replace with actual Replit backend URL

document.getElementById('search-btn').addEventListener('click', async () => {
  const query = document.getElementById('search-input').value;
  const resultsDiv = document.getElementById('video-results');
  resultsDiv.innerHTML = ''; 

  const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query} karaoke&type=video&key=${API_KEY}`);
  const data = await response.json();

  data.items.forEach(item => {
    const videoId = item.id.videoId;
    const title = item.snippet.title;

    const videoFrame = `
      <div class="bg-gray-800 p-4 rounded">
        <iframe width="100%" height="200" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
        <p class="mt-2">${title}</p>
      </div>`;
    resultsDiv.innerHTML += videoFrame;
  });
});

document.getElementById('login-btn').addEventListener('click', async () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await fetch(`${BACKEND_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  if (data.success) {
    localStorage.setItem('token', data.token);
    alert('Login successful!');
  } else {
    alert('Invalid credentials.');
  }
});
