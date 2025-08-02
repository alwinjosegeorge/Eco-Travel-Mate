document.addEventListener('DOMContentLoaded', () => {
  // 🌿 Smooth scrolling
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 🌱 Carbon Footprint Calculator
  const calcBtn = document.querySelector('.carbon-calculator-section .btn-primary');
  if (calcBtn) {
    calcBtn.addEventListener('click', () => {
      const distance = parseFloat(document.getElementById('distance').value);
      const emissionFactor = 0.21; // kg CO2 per km (Car)
      if (!isNaN(distance) && distance > 0) {
        const totalEmissions = (distance * emissionFactor).toFixed(2);
        document.querySelector('.impact-main .value').textContent = `${totalEmissions} kg`;
        document.querySelector('.impact-details').innerHTML = `
          <div class="detail-item"><p>Distance</p><p>${distance} km</p></div>
          <div class="detail-item"><p>Emission Factor</p><p>${emissionFactor} kg/km</p></div>
          <div class="detail-item"><p>To Offset</p><p>${Math.ceil(distance * emissionFactor / 21)} trees/year</p></div>
        `;
      } else {
        alert('Please enter a valid distance.');
      }
    });
  }

  // 🗺️ Mapbox Token Button
  const mapBtn = document.querySelector('.map-section .btn-primary');
  if (mapBtn) {
    mapBtn.addEventListener('click', () => {
      const token = document.querySelector('.map-widget input').value.trim();
      if (token) {
        alert(`Map would load using token: ${token}`);
        // Here you could initialize Mapbox
      } else {
        alert('Please enter your Mapbox token.');
      }
    });
  }

  // 🤖 AI Chat
  const sendBtn = document.querySelector('.send-btn');
  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      const input = document.querySelector('.input-area input');
      const value = input.value.trim();
      if (value) {
        const chatBox = document.querySelector('.chat-box');

        // User message
        const userMessage = document.createElement('div');
        userMessage.className = 'chat-message user';
        userMessage.innerHTML = `<p>${value}</p>`;
        chatBox.appendChild(userMessage);

        // Simulated bot response
        setTimeout(() => {
          const botMessage = document.createElement('div');
          botMessage.className = 'chat-message bot';
          botMessage.innerHTML = `<p>Thanks for your message: "${value}". I'm here to help with eco-friendly tips and data!</p>`;
          chatBox.appendChild(botMessage);
          chatBox.scrollTop = chatBox.scrollHeight;
        }, 800);

        input.value = '';
      }
    });
  }

  // 🌟 Suggested Prompts Fill
  document.querySelectorAll('.suggested-prompts button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('.input-area input').value = btn.textContent;
    });
  });

  // 📍 Geolocation on Button Click
  const locationBtn = document.getElementById('get-location');
  const locationText = document.getElementById('user-location');

  if (locationBtn && locationText) {
    locationBtn.addEventListener('click', () => {
      if ('geolocation' in navigator) {
        locationText.textContent = '📍 Detecting your location...';

        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            locationText.textContent = `📍 Your Location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
          },
          (error) => {
            locationText.textContent = '❌ Location access denied.';
            console.warn('Geolocation error:', error.message);
          }
        );
      } else {
        locationText.textContent = '❌ Geolocation not supported by your browser.';
      }
    });
  }
});
