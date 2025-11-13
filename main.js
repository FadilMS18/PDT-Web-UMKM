let navbar1 = document.querySelector("#nav1");
let stickyNav = document.querySelector("#sticky-nav");
let catalog = document.querySelector("#sidebar > h3");
let prevScrollPos = window.pageYOffset;

// Function untuk membuat animasi navbar pas page pertama direload
function time() {
  setTimeout(() => {
    navbar1.classList.remove("nav-start-disappear");
  }, 5);
}

// Sticky navbar akan muncul jika kita mengscroll keatas dan hilkang kalau scroll kebawah
function stickyNavbarShow() {
  const currentScrollPos = window.pageYOffset;
  if (prevScrollPos > currentScrollPos) {
    stickyNav.classList.remove("sticky-nav-disappear");
    catalog.classList.add("nav-start-disappear");

  } else {
    stickyNav.classList.add("sticky-nav-disappear");
    catalog.classList.remove("nav-start-disappear");
  }
  prevScrollPos = currentScrollPos;
  if (window.pageYOffset <= 40) {
    stickyNav.classList.add("sticky-nav-disappear");
    catalog.classList.remove("nav-start-disappear");
  }
}
document.addEventListener("scroll", stickyNavbarShow);
document.addEventListener("DOMContentLoaded", time);


const catalogCard = Array.from(document.querySelectorAll(".catalog-card"));
catalogCard.forEach((card) => {
  const kategori = card.querySelector("#catalog-card-kategori-makanan");
  const harga = card.querySelector("#catalog-card-harga-makanan");
  const button = card.querySelector("#card-add-to-cart-button")
  card.addEventListener("mouseover", () => cardDescDisappear(kategori, harga, button));
  card.addEventListener("mouseout", () => cardDescAppear(kategori, harga, button));
});

function cardDescDisappear(category, price, button) {
  category.classList.add("catalog-description-disappear");
  price.classList.add("catalog-description-disappear");
  button.classList.remove("card-button-disappear")
}

function cardDescAppear(category, price, button) {
  if (
    category.classList.contains("catalog-description-disappear") &&
    price.classList.contains("catalog-description-disappear")
  ) {
    category.classList.remove("catalog-description-disappear");
    price.classList.remove("catalog-description-disappear");
    button.classList.add("card-button-disappear")
  }
}
