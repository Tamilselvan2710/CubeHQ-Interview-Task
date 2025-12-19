const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const mobileSearchBtn = document.getElementById('mobileSearchBtn');


hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
  document.body.classList.toggle('menu-open');
});


if (mobileSearchBtn) {
  mobileSearchBtn.addEventListener('click', () => {
  mobileSearchBtn.parentElement.classList.toggle('active');
  });
}

// Accordion functionality
document.querySelectorAll(".accordion-header").forEach(header => {
  header.addEventListener("click", () => {
    const item = header.parentElement;
    const isActive = item.classList.contains("active");

    document.querySelectorAll(".accordion-item")
      .forEach(i => i.classList.remove("active"));

    if (!isActive) item.classList.add("active");
  });
});

// Image fade‑in on scroll
const collectionImage = document.querySelector(".collection-image");

if (collectionImage) {
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      collectionImage.classList.add("visible");
      observer.disconnect();
    }
  }, { threshold: 0.3 });

  observer.observe(collectionImage);
}


//Stats Section Script 

const counters = document.querySelectorAll(".stat-number");
const statItems = document.querySelectorAll(".stat-item");
let statsStarted = false;

// Easing function (fast → slow)
function easeOutQuad(t) {
  return t * (2 - t);
}

function startCountUp() {
  if (statsStarted) return;
  statsStarted = true;

  counters.forEach((counter, index) => {
    const target = +counter.dataset.target;
    const duration = 1200; // ms
    const startTime = performance.now();

    // Fade-in sync
    statItems[index].classList.add("visible");

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuad(progress);
      const value = Math.floor(eased * target);

      counter.textContent = value + "%";

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.textContent = target + "%";
      }
    }

    requestAnimationFrame(update);
  });
}

// Trigger on scroll
const statsSection = document.querySelector("#stats");

if (statsSection) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        startCountUp();
        observer.disconnect();
      }
    },
    { threshold: 0.4 }
  );

  observer.observe(statsSection);
}



// PRODUCT GALLERY 

(function () {
  const images = [
    "./assets/images/product-1.png",
    "./assets/images/product-2.png",
    "./assets/images/product-3.png",
    "./assets/images/product-4.png"
  ];

  let current = 0;

  const mainImage = document.getElementById("gtgMainImage");
  const dots = document.querySelectorAll(".gtg-dot");
  const thumbs = document.querySelectorAll(".gtg-thumbs img");

  function updateImage(index) {
    if (index < 0) index = images.length - 1;
    if (index >= images.length) index = 0;

    mainImage.style.opacity = "0";

    setTimeout(() => {
      mainImage.src = images[index];
      mainImage.style.opacity = "1";
    }, 150);

    dots.forEach(d => d.classList.remove("active"));
    thumbs.forEach(t => t.classList.remove("active"));

    dots[index].classList.add("active");
    thumbs[index].classList.add("active");

    current = index;
  }

  document.querySelector(".gtg-arrow-left")?.addEventListener("click", () => {
    updateImage(current - 1);
  });

  document.querySelector(".gtg-arrow-right")?.addEventListener("click", () => {
    updateImage(current + 1);
  });

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      updateImage(+dot.dataset.index);
    });
  });

  thumbs.forEach(thumb => {
    thumb.addEventListener("click", () => {
      updateImage(+thumb.dataset.index);
    });
  });

  /* Touch swipe */
  let startX = 0;

  mainImage.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  mainImage.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) updateImage(current + 1);
    if (endX - startX > 50) updateImage(current - 1);
  });
})();

document.querySelectorAll('.gtg-radio-label input[name="subscription"]').forEach(radio => {
  radio.addEventListener("change", () => {
    document.querySelectorAll(".gtg-subscription").forEach(box => {
      box.classList.remove("active");
      box.querySelector(".gtg-Section-body").style.maxHeight = null;
    });

    const activeBox = radio.closest(".gtg-subscription");
    activeBox.classList.add("active");

    const body = activeBox.querySelector(".gtg-Section-body");
    body.style.maxHeight = body.scrollHeight + "px";
  });
});