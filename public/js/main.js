document.addEventListener('DOMContentLoaded', function() {
    // 1. Código para los videos de fondo
    const videos = [
        { id: 'video1', file: 'rombo_rojo.mp4' },
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

    // 2. Sistema de pestañas principal
    function setupMainTabs() {
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
                
                // Aplicar filtro de género al cambiar de pestaña
                applyGenderFilter();
            });
        });
    }

    // 3. Sistema de filtros solo por género
    let currentGender = 'male';
    
    function setupGenderFilter() {
        const genderButtons = document.querySelectorAll('.gender-btn');
        
        // Eventos para botones de género
        genderButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remover active de todos los botones de género
                genderButtons.forEach(btn => btn.classList.remove('active'));
                
                // Agregar active al botón clickeado
                this.classList.add('active');
                
                // Actualizar filtro de género
                currentGender = this.getAttribute('data-gender');
                
                // Aplicar filtros
                applyGenderFilter();
            });
        });
    }
    
    function applyGenderFilter() {
        
        const activeTab = document.querySelector('.attire-content.active');
        if (!activeTab) return;
        
        // Ocultar todos primero
        activeTab.querySelectorAll('.uniform-pair').forEach(pair => {
            pair.style.display = 'none';
            pair.style.overflow = 'hidden';
            pair.style.margin = '0';
            pair.style.padding = '0';
        });
        
        // Mostrar solo los del género seleccionado
        setTimeout(() => {
            activeTab.querySelectorAll('.uniform-pair').forEach(pair => {
                if (pair.getAttribute('data-gender') === currentGender) {
                    pair.style.opacity = '1';
                    pair.style.display = 'flex';
                    pair.style.height = 'auto';
                    pair.style.overflow = 'visible';
                    pair.style.margin = '';
                    pair.style.padding = '';
                } else {
                    pair.style.display = 'none';
                }
            });
        }, 300);
    }
    function initAttireSection() {
        // Configurar el grid
        const style = document.createElement('style');
        style.textContent = `
            .attire-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                gap: 2rem;
                margin-top: 2rem;
            }
            
            .uniform-pair {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 1.5rem;
                margin-bottom: 2rem;
                transition: all 0.4s ease-out;
            }
            
            @media (max-width: 768px) {
                .uniform-pair {
                    grid-template-columns: 1fr;
                }
                
                .attire-grid {
                    grid-template-columns: 1fr;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Aplicar filtro inicial
        setTimeout(applyGenderFilter, 100);
    }
    // 4. Configurar el layout para mostrar uniformes uno al lado del otro
    function setupUniformLayout() {
        const style = document.createElement('style');
        style.textContent = `
            .attire-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
                gap: 2rem;
            }
            
            .uniform-pair {
                display: flex;
                gap: 1rem;
                margin-bottom: 2rem;
                transition: opacity 0.3s ease;
            }
            
            .uniform-variant {
                flex: 1;
            }
            
            @media (max-width: 768px) {
                .uniform-pair {
                    flex-direction: column;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // 5. Scroll suave para enlaces
    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }

    // 6. Efectos de animación para las secciones de historia
    function setupHistoryAnimations() {
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
    }

    // 7. Animación de métricas
    function setupMetricsAnimation() {
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
    }

    // 8. Lightbox para la galería
    function setupLightbox() {
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
    }

    // 9. Efectos para el mapa
    function setupMapEffects() {
        const mapContainer = document.querySelector('.map-container');
        if (!mapContainer) return;
        
        mapContainer.addEventListener('mouseenter', function() {
            this.querySelector('.game-map').style.transform = 'scale(1.05)';
            this.querySelector('.map-marker').style.animation = 'pulse 1s infinite';
        });

        mapContainer.addEventListener('mouseleave', function() {
            this.querySelector('.game-map').style.transform = 'scale(1)';
            this.querySelector('.map-marker').style.animation = 'pulse 2s infinite';
        });

        const marker = document.querySelector('.map-marker');
        if (marker) {
            marker.setAttribute('data-tooltip', '¡Aquí estamos!');
        }

        // Efecto de zoom mejorado para el mapa
        mapContainer.addEventListener('mousemove', (e) => {
            const map = e.currentTarget;
            const img = map.querySelector('.game-map');
            const rect = map.getBoundingClientRect();
            
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            img.style.transformOrigin = `${x * 100}% ${y * 100}%`;
        });

        mapContainer.addEventListener('mouseleave', (e) => {
            const img = e.currentTarget.querySelector('.game-map');
            img.style.transform = 'scale(1)';
            img.style.transformOrigin = 'center center';
        });
    }

    // 10. Menú responsive
    function setupResponsiveMenu() {
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
    }

    // 11. Efecto de header al hacer scroll
    function setupHeaderScrollEffect() {
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
    }

    // 12. Ajustes de altura para el mapa
    function setupMapHeightAdjustment() {
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

        window.addEventListener('load', adjustHeights);
        window.addEventListener('resize', adjustHeights);
    }

    // 13. Ajuste de posición del marcador del mapa
    function setupMarkerPosition() {
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

        window.addEventListener('load', adjustMarkerPosition);
        window.addEventListener('resize', adjustMarkerPosition);
    }

    // Inicializar todos los componentes
    setupMainTabs();
    setupGenderFilter();
    setupSmoothScroll();
    setupHistoryAnimations();
    setupMetricsAnimation();
    setupLightbox();
    setupMapEffects();
    setupResponsiveMenu();
    setupHeaderScrollEffect();
    setupMapHeightAdjustment();
    setupMarkerPosition();
    initAttireSection();
    // Aplicar filtro inicial
    applyGenderFilter();
});