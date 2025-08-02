// 📌 Eco Travel Mate – Final Professional JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // 🌿 Smooth Scroll Navigation
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // 🌱 Carbon Footprint Calculator
  const calcBtn = document.querySelector('.carbon-calculator-section .btn-primary');
  if (calcBtn) {
    calcBtn.addEventListener('click', () => {
      const distance = parseFloat(document.getElementById('distance').value);
      const emissionFactor = 0.21; // kg CO2 per km
      if (!isNaN(distance) && distance > 0) {
        const totalEmissions = (distance * emissionFactor).toFixed(2);
        document.querySelector('.impact-main .value').textContent = `${totalEmissions} kg`;
        document.querySelector('.impact-details').innerHTML = `
          <div class="detail-item"><p>Distance</p><p>${distance} km</p></div>
          <div class="detail-item"><p>Emission Factor</p><p>${emissionFactor} kg/km</p></div>
          <div class="detail-item"><p>To Offset</p><p>${Math.ceil(distance * emissionFactor / 21)} trees/year</p></div>
        `;
      } else {
        alert('🚫 Please enter a valid distance.');
      }
    });
  }

  // 🗺️ Mapbox Token Check
  const mapBtn = document.querySelector('.map-section .btn-primary');
  if (mapBtn) {
    mapBtn.addEventListener('click', () => {
      const token = document.querySelector('.map-widget input').value.trim();
      alert(token ? `✅ Map would load using token: ${token}` : '⚠️ Please enter your Mapbox token.');
    });
  }

  // 🤖 Eco Assistant Chat
  const sendBtn = document.querySelector('.send-btn');
  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      const input = document.querySelector('.input-area input');
      const value = input.value.trim();
      if (value) {
        const chatBox = document.querySelector('.chat-box');

        const userMessage = document.createElement('div');
        userMessage.className = 'chat-message user';
        userMessage.innerHTML = `<p>${value}</p>`;
        chatBox.appendChild(userMessage);

        setTimeout(() => {
          const botMessage = document.createElement('div');
          botMessage.className = 'chat-message bot';
          botMessage.innerHTML = `<p>🌿 Thanks for your message: "${value}".<br>I'm here to help with eco tips and AQI info!</p>`;
          chatBox.appendChild(botMessage);
          chatBox.scrollTop = chatBox.scrollHeight;
        }, 800);

        input.value = '';
      }
    });
  }

  // 💬 Suggested Prompts
  document.querySelectorAll('.suggested-prompts button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('.input-area input').value = btn.textContent;
    });
  });

  // 📍 Location + Live AQI
  const locationBtn = document.getElementById('get-location');
  const locationText = document.getElementById('user-location');
  const aqiValue = document.querySelector('.aqi-value');
  const aqiStatus = document.querySelector('.aqi-status');
  const progressBar = document.querySelector('.progress');

  const API_KEY = '383c9d23fc6ba89237c1b34e243c6518'; // 🔐 Alwin's OpenWeather Key

  if (locationBtn && locationText) {
    locationBtn.addEventListener('click', () => {
      if ('geolocation' in navigator) {
        locationText.textContent = '📡 Detecting your location...';

        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            locationText.textContent = `📍 Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`;

            // 🌫 Fetch AQI from OpenWeather
            fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
              .then(res => res.json())
              .then(data => {
                const aqi = data.list[0].main.aqi;
                const aqiMap = {
                  1: { label: 'Good', color: '#4CAF50' },
                  2: { label: 'Fair', color: '#8BC34A' },
                  3: { label: 'Moderate', color: '#FFC107' },
                  4: { label: 'Poor', color: '#FF5722' },
                  5: { label: 'Very Poor', color: '#F44336' },
                };

                const info = aqiMap[aqi];
                aqiValue.textContent = aqi * 50;
                aqiValue.style.color = info.color;
                aqiStatus.textContent = info.label;
                aqiStatus.style.backgroundColor = info.color;
                progressBar.style.width = `${aqi * 20}%`;
                progressBar.style.backgroundColor = info.color;
              })
              .catch(err => {
                console.error('❌ AQI fetch error:', err);
                alert('⚠️ Failed to fetch AQI. Check your API key or internet.');
                aqiValue.textContent = '??';
                aqiStatus.textContent = 'Unavailable';
                progressBar.style.width = '0';
              });

          },
          () => {
            locationText.textContent = '❌ Location access denied.';
          }
        );
      } else {
        locationText.textContent = '❌ Geolocation not supported on this browser.';
      }
    });
  }
});
