// ===============================
// Wedding Website Script
// ===============================

// ---------- Countdown ----------
const weddingDate = new Date("October 10, 2026 16:00:00").getTime();

function updateCountdown() {
  const countdown = document.getElementById("countdown");
  if (!countdown) return;

  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance <= 0) {
    countdown.textContent = "Today is the big day!";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (distance % (1000 * 60 * 60)) / (1000 * 60)
  );

  countdown.textContent = `${days} days, ${hours} hours, and ${minutes} minutes until we say I do.`;
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ---------- Sticky Navbar ----------
const navbar = document.querySelector(".navbar");

function updateNavbarOnScroll() {
  if (!navbar) return;

  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", updateNavbarOnScroll);
updateNavbarOnScroll();

// ---------- Gallery Slider ----------
const track = document.querySelector(".gallery-track");
const prevBtn = document.querySelector(".gallery-btn.prev");
const nextBtn = document.querySelector(".gallery-btn.next");

if (track && prevBtn && nextBtn) {
  let currentIndex = 0;

  function getVisibleCount() {
    if (window.innerWidth <= 640) return 1;
    if (window.innerWidth <= 980) return 2;
    return 3;
  }

  function getGapSize() {
    if (window.innerWidth <= 640) return 10;
    return 30;
  }

  function updateGallery() {
    const images = track.querySelectorAll("img");
    if (images.length === 0) return;

    const visibleCount = getVisibleCount();
    const maxIndex = Math.max(0, images.length - visibleCount);

    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }

    const imageWidth = images[0].getBoundingClientRect().width;
    const gap = getGapSize();
    const moveAmount = currentIndex * (imageWidth + gap);

    track.style.transform = `translateX(-${moveAmount}px)`;

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;
  }

  nextBtn.addEventListener("click", () => {
    const images = track.querySelectorAll("img");
    const visibleCount = getVisibleCount();
    const maxIndex = Math.max(0, images.length - visibleCount);

    if (currentIndex < maxIndex) {
      currentIndex++;
      updateGallery();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateGallery();
    }
  });

  window.addEventListener("resize", updateGallery);
  window.addEventListener("load", updateGallery);

  updateGallery();
}