const circle = document.getElementById("circle");

const observer = new IntersectionObserver(
  (items) => {
    items.forEach((item) => {
      if (item.isIntersecting) {
        console.log(`circle is visible`);
      } else {
        console.log(`circle is not visible`);
      }
    });
  },
  { threshold: 0.5 }
);

observer.observe(circle);
