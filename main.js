let navbar1 = document.querySelector("#nav1");
let stickyNav = document.querySelector("#sticky-nav");
let catalog = document.querySelector("#sidebar > h3");
let prevScrollPos = window.pageYOffset;

function time() {
  setTimeout(() => {
    navbar1.classList.remove("nav-start-disappear");
  }, 5);
}

console.log(catalog);

function stickyNavbarShow() {
  const currentScrollPos = window.pageYOffset;
  if (prevScrollPos > currentScrollPos) {
    stickyNav.classList.remove("sticky-nav-disappear");
  } else {
    stickyNav.classList.add("sticky-nav-disappear");
  }
  prevScrollPos = currentScrollPos;
  if (window.pageYOffset <= 40) {
    stickyNav.classList.add("sticky-nav-disappear");
  }
}
document.addEventListener("scroll", stickyNavbarShow);
document.addEventListener("DOMContentLoaded", time);

const catalogCard = Array.from(document.querySelectorAll(".catalog-card"));
catalogCard.forEach((card) => {
  const kategori = document.querySelector("#catalog-card-kategori-makanan");
  const harga = document.querySelector("#catalog-card-harga-makanan");
  card.addEventListener("mouseover", () => cardDescDisappear(kategori, harga));
  card.addEventListener("mouseout", () => cardDescAppear(kategori, harga));
});

function cardDescDisappear(element1, element2) {
  element1.classList.add("catalog-description-disappear");
  element2.classList.add("catalog-description-disappear");
}

function cardDescAppear(element1, element2) {
  if (
    element1.classList.contains("catalog-description-disappear") &&
    element2.classList.contains("catalog-description-disappear")
  ) {
    element1.classList.remove("catalog-description-disappear");
    element2.classList.remove("catalog-description-disappear");
  }
}
