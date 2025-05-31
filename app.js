// ===== NAVIGATION FUNCTIONS =====
    
    // Toggle logo visibility on mobile menu
    document.querySelector(".navbar-toggler-icon").addEventListener('click', function() {
      document.querySelector(".logo-container").classList.toggle("hide");
    });

    // Smooth scroll to notices section
    const noticesLink = document.querySelector('#notices');
    noticesLink.addEventListener('click', function() {
      window.scrollTo({
        top: 400,
        behavior: "smooth"
      });
    });

    // Smooth scroll to about us section
    const aboutUsLink = document.querySelector('#aboutUs');
    aboutUsLink.addEventListener('click', function() {
      window.scrollTo({
        top: 600,
        behavior: "smooth"
      });
    });

    // Smooth scroll to events/gallery section
    const eventsLink = document.querySelector('#events');
    eventsLink.addEventListener('click', function() {
      document.querySelector(".gallery").scrollIntoView({
        behavior: "smooth"
      });
    });

    // ===== WELCOME MESSAGE TOGGLE =====
    
    // Show full welcome message
    document.querySelector("#read-more").addEventListener('click', function() {
      document.querySelector(".full-welcome-msg").classList.toggle("hide");
      document.querySelector("#read-more").classList.toggle("hide");
      document.querySelector("#read-less").classList.toggle("hide");
    });

    // Hide full welcome message
    document.querySelector("#read-less").addEventListener('click', function() {
      document.querySelector(".full-welcome-msg").classList.toggle("hide");
      document.querySelector("#read-less").classList.toggle("hide");
      document.querySelector("#read-more").classList.toggle("hide");
    });

    // // ===== GALLERY SLIDER FUNCTIONS =====
    
    // const slider = document.getElementById('gallerySlider');
    // const cards = document.querySelectorAll('.gallery .card');
    // let currentIndex = 0;

    // // Update slider position
    // function updateSlide() {
    //   const cardWidth = cards[0].offsetWidth;
    //   slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    // }

    // // Move to next slide
    // function nextSlide() {
    //   const visibleCards = getVisibleCardCount();
    //   if (currentIndex < cards.length - visibleCards) {
    //     currentIndex++;
    //     updateSlide();
    //   } else {
    //     currentIndex = 0; // Loop back to start
    //     updateSlide();
    //   }
    // }

    // // Move to previous slide
    // function prevSlide() {
    //   const visibleCards = getVisibleCardCount();
    //   if (currentIndex > 0) {
    //     currentIndex--;
    //     updateSlide();
    //   } else {
    //     currentIndex = cards.length - visibleCards; // Loop to end
    //     updateSlide();
    //   }
    // }

    // // Calculate how many cards are visible
    // function getVisibleCardCount() {
    //   const containerWidth = document.querySelector('.slider-wrapper').offsetWidth;
    //   const cardWidth = cards[0].offsetWidth;
    //   return Math.floor(containerWidth / cardWidth);
    // }

    // // Auto-slide every 3 seconds
    // setInterval(nextSlide, 3000);

    // // Adjust slide position on window resize
    // window.addEventListener('resize', updateSlide);





     // ===== RESPONSIVE GALLERY SLIDER =====
    
    const slider = document.getElementById('gallerySlider');
    const cards = document.querySelectorAll('.gallery .card');
    const dotsContainer = document.getElementById('sliderDots');
    let currentIndex = 0;
    let cardsPerView = 1;
    let totalSlides = 0;

    // Calculate cards per view based on screen size
    function getCardsPerView() {
      const width = window.innerWidth;
      
      if (width <= 576) {
        return 1; // Mobile: 1 card
      } else if (width <= 992) {
        return 2; // Tablets: 2 cards
      } else if (width <= 1200) {
        return 3; // Large screens: 3 cards
      } else {
        return 4; // Extra large: 4 cards
      }
    }

    // Calculate total number of slides
    function calculateTotalSlides() {
      cardsPerView = getCardsPerView();
      totalSlides = Math.ceil(cards.length / cardsPerView);
      
      // Make sure currentIndex doesn't exceed available slides
      if (currentIndex >= totalSlides) {
        currentIndex = 0;
      }
    }

    // Update slider position
    function updateSlide() {
      calculateTotalSlides();
      
      const cardWidth = cards[0].offsetWidth;
      const gap = 16; // 1rem gap
      const moveDistance = (cardWidth + gap) * currentIndex * cardsPerView;
      
      slider.style.transform = `translateX(-${moveDistance}px)`;
      updateDots();
    }

    // Create navigation dots
    function createDots() {
      dotsContainer.innerHTML = '';
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === currentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      }
    }

    // Update active dot
    function updateDots() {
      const dots = document.querySelectorAll('.dot');
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }

    // Go to specific slide
    function goToSlide(slideIndex) {
      currentIndex = slideIndex;
      updateSlide();
    }

    // Move to next slide
    function nextSlide() {
      if (currentIndex < totalSlides - 1) {
        currentIndex++;
      } else {
        currentIndex = 0; // Loop back to start
      }
      updateSlide();
    }

    // Move to previous slide  
    function prevSlide() {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = totalSlides - 1; // Loop to end
      }
      updateSlide();
    }

    // Initialize slider
    function initSlider() {
      calculateTotalSlides();
      createDots();
      updateSlide();
    }

    // Handle window resize
    function handleResize() {
      const newCardsPerView = getCardsPerView();
      
      // Only reinitialize if cards per view changed
      if (newCardsPerView !== cardsPerView) {
        initSlider();
      } else {
        updateSlide();
      }
    }

    // Auto-slide every 4 seconds (pauses on hover)
    let autoSlideInterval;
    
    function startAutoSlide() {
      autoSlideInterval = setInterval(nextSlide, 4000);
    }
    
    function stopAutoSlide() {
      clearInterval(autoSlideInterval);
    }

    // Event listeners
    window.addEventListener('resize', handleResize);
    
    // Pause auto-slide on hover
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);

    // Touch/swipe support for mobile
    let startX = 0;
    let isDragging = false;

    slider.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
      stopAutoSlide();
    });

    slider.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
    });

    slider.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      
      // Minimum swipe distance
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          nextSlide(); // Swipe left - next slide
        } else {
          prevSlide(); // Swipe right - previous slide
        }
      }
      
      isDragging = false;
      startAutoSlide();
    });

    // Initialize everything when page loads
    document.addEventListener('DOMContentLoaded', () => {
      initSlider();
      startAutoSlide();
    });