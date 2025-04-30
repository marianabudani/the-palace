document.addEventListener('DOMContentLoaded', function() {
    // Elementos de video
    const videos = [
      { id: 'video1', file: 'rombo_rojo.mp4' },
      { id: 'video2', file: 'triangulo_blanco.mp4' },
      { id: 'video3', file: 'triangulo_rojo.mp4' }
    ];
    
    // Cargar videos
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
    

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });

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


const IntersectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateMetrics();
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

observer.observe(document.getElementById('objetivos'));

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

const lightboxStyle = document.createElement('style');
lightboxStyle.textContent = `
  .lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .lightbox-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
  }
  
  .lightbox-content img {
    max-height: 70vh;
    max-width: 100%;
    border: 3px solid var(--primary);
  }
  
  .lightbox-info {
    padding: 20px;
    text-align: center;
  }
  
  .lightbox-info h3 {
    color: var(--primary);
    margin-bottom: 10px;
  }
  
  .close-lightbox {
    position: absolute;
    top: -40px;
    right: 0;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .close-lightbox:hover {
    color: var(--primary);
  }
`;
document.head.appendChild(lightboxStyle);

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

const tooltipStyle = document.createElement('style');
tooltipStyle.textContent = `
  [data-tooltip] {
    position: relative;
  }
  
  [data-tooltip]::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: var(--primary);
    color: var(--text-dark);
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 0.8rem;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
    font-weight: bold;
  }
  
  [data-tooltip]:hover::after {
    opacity: 1;
  }
`;
document.head.appendChild(tooltipStyle);


function adjustHeights() {
  const mapContainer = document.querySelector('.map-container');
  const photoContainer = document.querySelector('.building-photo-container');
  
  if (window.innerWidth > 992) {
    const height = mapContainer.offsetWidth;
    photoContainer.style.height = `${height}px`;
  } else {
    photoContainer.style.height = 'auto';
  }
}

// Ejecutar al cargar y al redimensionar
window.addEventListener('load', adjustHeights);
window.addEventListener('resize', adjustHeights);
// Ajustar el marcador del mapa con mayor precisión
function adjustMarkerPosition() {
  const marker = document.querySelector('.map-marker');
  
  // Coordenadas exactas (ajustar según necesidad)
  marker.style.top = '58%';  // Más arriba
  marker.style.left = '52%'; // Más a la izquierda
  
  // Opcional: ajustar según tamaño de pantalla
  if (window.innerWidth < 768) {
    marker.style.top = '57%';
    marker.style.left = '53%';
  }
}

// Llamar al cargar y al redimensionar
window.addEventListener('load', adjustMarkerPosition);
window.addEventListener('resize', adjustMarkerPosition);

// Efecto de zoom mejorado
document.querySelector('.map-container').addEventListener('mousemove', (e) => {
  const map = e.currentTarget;
  const img = map.querySelector('.game-map');
  const rect = map.getBoundingClientRect();
  
  // Coordenadas relativas
  const x = (e.clientX - rect.left) / rect.width;
  const y = (e.clientY - rect.top) / rect.height;
  
  img.style.transformOrigin = `${x * 100}% ${y * 100}%`;
});

document.querySelector('.map-container').addEventListener('mouseleave', (e) => {
  const img = e.currentTarget.querySelector('.game-map');
  img.style.transform = 'scale(1)';
  img.style.transformOrigin = 'center center';
});
document.addEventListener('DOMContentLoaded', function() {
  // Menu mobile
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  
  menuToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
  });
  
  // Cerrar menu al hacer click en un link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
      link.addEventListener('click', function() {
          nav.classList.remove('active');
      });
  });
  
  // Video background
  const videoBg = document.querySelector('.video-bg');
  if(videoBg) {
      videoBg.addEventListener('loadeddata', function() {
          setTimeout(() => {
              videoBg.classList.add('active');
          }, 500);
      });
  }
  
  // Scroll suave
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if(targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if(targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 80,
                  behavior: 'smooth'
              });
          }
      });
  });
  
  // Header scroll effect
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
});
});