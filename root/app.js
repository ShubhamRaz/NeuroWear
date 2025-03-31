document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS for animations
  AOS.init({ duration: 1000, once: true });
  
  // Generate animated particles background
  function createParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 100; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.width = '2px';
      particle.style.height = '2px';
      particle.style.background = 'rgba(100, 255, 218, 0.8)';
      particle.style.borderRadius = '50%';
      particle.style.animation = `float ${5 + Math.random() * 5}s infinite`;
      container.appendChild(particle);
    }
  }
  createParticles();

  // Lightbox functionality for gallery images
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeLightbox = document.querySelector('.close-lightbox');
  document.querySelectorAll('.gallery-layout img').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.classList.add('active');
    });
  });
  if (closeLightbox) {
    closeLightbox.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });
  }

  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.main-nav');
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
  });

  // Pre-order Modal functionality
  const preorderBtn = document.getElementById('preorder-btn');
  const preorderModal = document.getElementById('preorder-modal');
  const closeModal = document.querySelector('.close-modal');
  const formContainer = document.getElementById('form-container');
  const successMessage = document.getElementById('success-message');
  const preorderForm = document.getElementById('preorder-form');

  // Open modal when clicking the Pre-order button
  preorderBtn.addEventListener('click', () => {
    preorderModal.classList.add('active');
    formContainer.style.display = 'block';
    successMessage.style.display = 'none';
    preorderForm.reset();
  });

  // Close modal when clicking the close icon
  closeModal.addEventListener('click', () => {
    preorderModal.classList.remove('active');
  });

  // Handle pre-order form submission via fetch API
  preorderForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = this.name.value;
    const email = this.email.value;
    const phone = this.phone.value;
    const message = this.message.value;

    fetch('/preorder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, message })
    })
    .then(response => response.json())
    .then(data => {
      successMessage.innerHTML = `
        <p><strong>${data.success ? 'Pre-order submitted successfully!' : 'Error processing pre-order'}</strong></p>
        <div style="text-align:left; padding: 1rem; border: 1px solid var(--accent-color); border-radius: 8px; background: rgba(100, 255, 218, 0.1);">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Message:</strong> ${message || 'N/A'}</p>
        </div>
        <button id="ok-btn">OK</button>
      `;
      formContainer.style.display = 'none';
      successMessage.style.display = 'flex';

      document.getElementById('ok-btn').addEventListener('click', () => {
        preorderModal.classList.remove('active');
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });

  // Reset 3D model camera orbit after user interaction
  const modelViewer = document.querySelector('model-viewer');
  let resetTimeout;
  if (modelViewer) {
    // Listen for mouse up (desktop)
    modelViewer.addEventListener('mouseup', () => {
      clearTimeout(resetTimeout);
      resetTimeout = setTimeout(() => {
        modelViewer.resetCameraOrbit();
      }, 2000); // 2-second delay before reset
    });
    
    // Listen for touch end (mobile)
    modelViewer.addEventListener('touchend', () => {
      clearTimeout(resetTimeout);
      resetTimeout = setTimeout(() => {
        modelViewer.resetCameraOrbit();
      }, 2000);
    });
  }
});
