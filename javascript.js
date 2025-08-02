document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Calculate Carbon Footprint
  const calcBtn = document.querySelector('.carbon-calculator-section .btn-primary');
  if (calcBtn) {
    calcBtn.addEventListener('click', () => {
      const distance = parseFloat(document.getElementById('distance').value);
      const emissionFactor = 0.21; // kg CO2 per km (car)
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

  // Load Map Placeholder
  const mapBtn = document.querySelector('.map-section .btn-primary');
  if (mapBtn) {
    mapBtn.addEventListener('click', () => {
      const token = document.querySelector('.map-widget input').value.trim();
      if (token) {
        alert(`Map would load using token: ${token}`);
        // Integrate Mapbox here
      } else {
        alert('Please enter your Mapbox token.');
      }
    });
  }

  // AI Chat (mock)
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
          botMessage.innerHTML = `<p>Thanks for your message: "${value}". A smart eco-response will be here soon!</p>`;
          chatBox.appendChild(botMessage);
          chatBox.scrollTop = chatBox.scrollHeight;
        }, 800);

        input.value = '';
      }
    });
  }

  // Prompt Buttons
  document.querySelectorAll('.suggested-prompts button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('.input-area input').value = btn.textContent;
    });
  });
});
