const API_KEY = 'AIzaSyAbHeWC_oUp7DUisor9O7hZ5tgRbgb2zVU';  // Replace with your YouTube API Key
const BACKEND_URL = 'https://74376f10-b037-480f-a9fd-80eef98f12f0-00-2uf6ippqjdnsy.sisko.replit.dev/'; // Replace with your Repl backend URL

// Function to search for karaoke videos using YouTube API
document.getElementById('search-btn').addEventListener('click', async () => {
  const query = document.getElementById('search-input').value;
  const resultsDiv = document.getElementById('video-results');
  resultsDiv.innerHTML = ''; // Clear previous results

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
          <iframe 
            width="100%" 
            height="200" 
            src="https://www.youtube.com/embed/${videoId}" 
            frameborder="0" 
            allowfullscreen
            class="rounded"
          ></iframe>
        </div>
      </div>`;
    resultsDiv.innerHTML += videoCard;
  });
});

// Function to handle user login
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
    localStorage.setItem('token', data.token); // Store JWT token in local storage
    alert('Login successful!');
  } else {
    alert('Invalid credentials.');
  }
});
