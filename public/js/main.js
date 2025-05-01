document.addEventListener('DOMContentLoaded', function() {
  // 1. Código para los videos de fondo
  const videos = [
      { id: 'video1', file: 'rombo_rojo.mp4' },
      { id: 'video2', file: 'triangulo_blanco.mp4' },
      { id: 'video3', file: 'triangulo_rojo.mp4' }
  ];
  
  videos.forEach((video, index) => {
      const videoEl = document.createElement('video');
      videoEl.id = video.id;
      videoEl.className = 'video-bg';
      videoEl.src = `/videos/${video.file}`;
      videoEl.muted = true;
      videoEl.loop = true;
      videoEl.autoplay = true;
      videoEl.playsInline = true;
      document.body.prepend(videoEl);

      if(index === 0) videoEl.classList.add('active');
  });

  let currentVideo = 0;
  setInterval(() => {
      const allVideos = document.querySelectorAll('.video-bg');
      allVideos[currentVideo].classList.remove('active');
      currentVideo = (currentVideo + 1) % allVideos.length;
      allVideos[currentVideo].classList.add('active');
  }, 8000);

  // 2. Código para las pestañas de vestimenta (CORRECCIÓN PRINCIPAL)
  const tabButtons = document.querySelectorAll('.attire-tab');
  const tabContents = document.querySelectorAll('.attire-content');

  tabButtons.forEach(button => {
      button.addEventListener('click', function() {
          // Remover active de todos los botones y contenidos
          tabButtons.forEach(btn => btn.classList.remove('active'));
          tabContents.forEach(content => content.classList.remove('active'));
          
          // Agregar active al botón clickeado
          this.classList.add('active');
          
          // Mostrar el contenido correspondiente
          const tabId = this.getAttribute('data-tab');
          document.getElementById(`${tabId}-tab`).classList.add('active');
      });
  });
    // Función para manejar sistemas de pestañas
    function setupTabs(tabClass, contentClass) {
      const tabButtons = document.querySelectorAll(`.${tabClass}`);
      const tabContents = document.querySelectorAll(`.${contentClass}`);

      tabButtons.forEach(button => {
          button.addEventListener('click', function() {
              // Remover active de todos los botones y contenidos de este grupo
              const parent = this.closest('.section');
              parent.querySelectorAll(`.${tabClass}`).forEach(btn => btn.classList.remove('active'));
              parent.querySelectorAll(`.${contentClass}`).forEach(content => content.classList.remove('active'));
              
              // Agregar active al botón clickeado
              this.classList.add('active');
              
              // Mostrar el contenido correspondiente
              const tabId = this.getAttribute('data-tab');
              document.getElementById(`${tabId}-tab`).classList.add('active');
          });
      });
  }

  // Configurar ambos sistemas de pestañas
  setupTabs('attire-tab', 'attire-content');  // Vestimenta
  setupTabs('task-tab', 'task-content');      // Operaciones
  // 3. Scroll suave para enlaces
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });

  // 4. Efectos de animación para las secciones de historia
  const historyChapters = document.querySelectorAll('.history-chapter');
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.style.opacity = 1;
              entry.target.style.transform = 'translateY(0)';
          }
      });
  }, { threshold: 0.1 });

  historyChapters.forEach(chapter => {
      chapter.style.opacity = 0;
      chapter.style.transform = 'translateY(30px)';
      chapter.style.transition = 'all 0.6s ease-out';
      observer.observe(chapter);
  }); 

  // 5. Animación de métricas
  const metrics = document.querySelectorAll('.objective-metric span');
  const animateMetrics = () => {
      metrics.forEach(metric => {
          const target = metric.textContent.match(/\d+/)?.[0];
          if (!target) return;
          
          let current = 0;
          const increment = target / 30;
          const updateMetric = () => {
              current += increment;
              if (current < target) {
                  metric.textContent = metric.textContent.replace(/\d+/, Math.floor(current));
                  requestAnimationFrame(updateMetric);
              } else {
                  metric.textContent = metric.textContent.replace(/\d+/, target);
              }
          };
          updateMetric();
      });
  };

  const metricsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              animateMetrics();
              metricsObserver.unobserve(entry.target);
          }
      });
  }, { threshold: 0.1 });

  metricsObserver.observe(document.getElementById('objetivos'));

  // 6. Lightbox para la galería
  document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', function() {
          const imgSrc = this.querySelector('img').src;
          const title = this.querySelector('h3').textContent;
          const desc = this.querySelector('p').textContent;
          
          const lightbox = document.createElement('div');
          lightbox.className = 'lightbox';
          lightbox.innerHTML = `
              <div class="lightbox-content">
                  <span class="close-lightbox">&times;</span>
                  <img src="${imgSrc}" alt="${title}">
                  <div class="lightbox-info">
                      <h3>${title}</h3>
                      <p>${desc}</p>
                  </div>
              </div>
          `;
          
          document.body.appendChild(lightbox);
          
          lightbox.querySelector('.close-lightbox').addEventListener('click', () => {
              lightbox.remove();
          });
          
          lightbox.addEventListener('click', (e) => {
              if(e.target === lightbox) {
                  lightbox.remove();
              }
          });
      });
  });

  // 7. Efectos para el mapa
  document.querySelector('.map-container').addEventListener('mouseenter', function() {
      this.querySelector('.game-map').style.transform = 'scale(1.05)';
      this.querySelector('.map-marker').style.animation = 'pulse 1s infinite';
  });

  document.querySelector('.map-container').addEventListener('mouseleave', function() {
      this.querySelector('.game-map').style.transform = 'scale(1)';
      this.querySelector('.map-marker').style.animation = 'pulse 2s infinite';
  });

  const marker = document.querySelector('.map-marker');
  marker.setAttribute('data-tooltip', '¡Aquí estamos!');

  // 8. Menú responsive
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
      menuToggle.addEventListener('click', function() {
          navLinks.classList.toggle('active');
          this.classList.toggle('open');
      });

      document.querySelectorAll('.nav-link').forEach(link => {
          link.addEventListener('click', function() {
              navLinks.classList.remove('active');
              menuToggle.classList.remove('open');
          });
      });
  }

  // 9. Efecto de header al hacer scroll
  const header = document.querySelector('.header');
  if(header) {
      window.addEventListener('scroll', function() {
          if(window.scrollY > 100) {
              header.classList.add('scrolled');
          } else {
              header.classList.remove('scrolled');
          }
      });
  }

  // 10. Ajustes de altura para el mapa
  function adjustHeights() {
      const mapContainer = document.querySelector('.map-container');
      const photoContainer = document.querySelector('.building-photo-container');
      
      if (window.innerWidth > 992 && mapContainer && photoContainer) {
          const height = mapContainer.offsetWidth;
          photoContainer.style.height = `${height}px`;
      } else if (photoContainer) {
          photoContainer.style.height = 'auto';
      }
  }

  // 11. Ajuste de posición del marcador del mapa
  function adjustMarkerPosition() {
      const marker = document.querySelector('.map-marker');
      if (marker) {
          marker.style.top = '58%';
          marker.style.left = '52%';
          
          if (window.innerWidth < 768) {
              marker.style.top = '57%';
              marker.style.left = '53%';
          }
      }
  }

  // Ejecutar funciones al cargar y redimensionar
  window.addEventListener('load', function() {
      adjustHeights();
      adjustMarkerPosition();
  });
  
  window.addEventListener('resize', function() {
      adjustHeights();
      adjustMarkerPosition();
  });

  // 12. Efecto de zoom mejorado para el mapa
  document.querySelector('.map-container')?.addEventListener('mousemove', (e) => {
      const map = e.currentTarget;
      const img = map.querySelector('.game-map');
      const rect = map.getBoundingClientRect();
      
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      img.style.transformOrigin = `${x * 100}% ${y * 100}%`;
  });

  document.querySelector('.map-container')?.addEventListener('mouseleave', (e) => {
      const img = e.currentTarget.querySelector('.game-map');
      img.style.transform = 'scale(1)';
      img.style.transformOrigin = 'center center';
  });
});