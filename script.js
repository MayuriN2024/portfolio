document.addEventListener("DOMContentLoaded", () => {
  const scrollButtons = document.querySelectorAll("[data-scroll-to]");
  const yearSpan = document.getElementById("year");
  const sections = document.querySelectorAll(".section");

  // Scroll-triggered animation for sections
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  sections.forEach((section) => {
    observer.observe(section);
    // Animate sections already in view on load
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      section.classList.add("animate-in");
    }
  });

  scrollButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-scroll-to");
      const target = document.getElementById(targetId);
      if (!target) return;

      const header = document.querySelector(".site-header");
      const headerHeight = header ? header.offsetHeight + 8 : 0;
      const rect = target.getBoundingClientRect();
      const offsetTop = rect.top + window.scrollY - headerHeight;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    });
  });

  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear().toString();
  }

  // Mouse Glow Tracking
  document.addEventListener("mousemove", (e) => {
    document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
    document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
  });

  // Scroll Progress
  const progressBar = document.querySelector(".scroll-progress");
  window.addEventListener("scroll", () => {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = window.scrollY / totalHeight;
    if (progressBar) {
      progressBar.style.transform = `scaleX(${progress})`;
    }
  });

  // Magnetic Buttons Animation
  const magneticButtons = document.querySelectorAll(".btn, .nav-link");
  magneticButtons.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = `translate(0px, 0px)`;
    });
  });
});

