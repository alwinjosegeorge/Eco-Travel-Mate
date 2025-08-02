document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Placeholder for "Calculate Carbon Footprint" button
    const calculateBtn = document.querySelector('.carbon-calculator-section .btn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', () => {
            alert('Carbon footprint calculation logic would go here.');
        });
    }

    // Placeholder for "Load Map" button
    const loadMapBtn = document.querySelector('.map-section .btn');
    if (loadMapBtn) {
        loadMapBtn.addEventListener('click', () => {
            const token = document.querySelector('.map-widget input').value;
            if (token) {
                alert(`Loading map with token: ${token}`);
                // In a real application, you would initialize the Mapbox map here.
            } else {
                alert('Please enter a Mapbox token.');
            }
        });
    }

    // Placeholder for AI chat input
    const sendBtn = document.querySelector('.send-btn');
    if(sendBtn) {
        sendBtn.addEventListener('click', () => {
            const input = document.querySelector('.input-area input');
            if (input.value.trim()) {
                alert(`Sending to AI: "${input.value}"`);
                input.value = '';
            }
        });
    }
});
