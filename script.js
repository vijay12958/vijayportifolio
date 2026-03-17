function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

/* CAROUSEL LOGIC FOR MULTIPLE DASHBOARDS */
let slideIndices = {};

function initCarousels() {
  let carousels = document.querySelectorAll('.carousel-container');
  carousels.forEach((carousel, index) => {
    let id = "carousel-" + index;
    carousel.dataset.id = id;
    slideIndices[id] = 1;
    showSlides(1, id);
    
    // Update onclick events for buttons and dots in this carousel
    carousel.querySelector('.prev-btn').setAttribute('onclick', `plusSlides(-1, '${id}')`);
    carousel.querySelector('.next-btn').setAttribute('onclick', `plusSlides(1, '${id}')`);
    
    let dots = carousel.nextElementSibling.querySelectorAll('.dot');
    dots.forEach((dot, dotIndex) => {
      dot.setAttribute('onclick', `currentSlide(${dotIndex + 1}, '${id}')`);
    });
  });
}

function plusSlides(n, carouselId) {
  showSlides(slideIndices[carouselId] += n, carouselId);
}

function currentSlide(n, carouselId) {
  showSlides(slideIndices[carouselId] = n, carouselId);
}

function showSlides(n, carouselId) {
  let carousel = document.querySelector(`[data-id="${carouselId}"]`);
  if (!carousel) return;
  
  let slides = carousel.querySelectorAll('.carousel-slide');
  let dotsContainer = carousel.nextElementSibling;
  let dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];
  
  if (n > slides.length) {slideIndices[carouselId] = 1}
  if (n < 1) {slideIndices[carouselId] = slides.length}
  
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active-dot", "");
  }
  
  if(slides[slideIndices[carouselId]-1]) {
    slides[slideIndices[carouselId]-1].style.display = "block";
  }
  if(dots[slideIndices[carouselId]-1]) {
    dots[slideIndices[carouselId]-1].className += " active-dot";
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initCarousels);
