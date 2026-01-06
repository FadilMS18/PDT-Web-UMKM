const sidebar = document.querySelector("#sidebar")
const catalog = document.querySelector("#sidebar > h3");
const stickyNav = document.querySelector("#sticky-nav");
const navbar1 = document.querySelector("#nav1");
let prevScrollPos = window.pageYOffset;

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

function time() {
  setTimeout(() => {
    navbar1.classList.remove("nav-start-disappear");
  }, 5);
}

document.addEventListener("DOMContentLoaded", time);


document.addEventListener("scroll", stickyNavbarShow);

const catalogCard = Array.from(document.querySelectorAll(".catalog-card"));

// Animasi card & sidebar masuk 1 per satu ketika document di load
document.addEventListener("DOMContentLoaded", () => {
  sidebar.classList.remove("catalog-card-enter")
  catalogCard.forEach((card, index) => {
    setTimeout(() => {
      card.classList.remove("catalog-card-enter");
    }, index * 80);
  });
});

// Animasi yang memunculkan tombol add to cart
catalogCard.forEach((card, index) => {
  const kategori = card.querySelector(".catalog-card-kategori-makanan");
  const harga = card.querySelector(".catalog-card-harga-makanan");
  const button = card.querySelector("#card-add-to-cart-button");
  card.addEventListener("mouseover", () =>
    cardDescDisappear(kategori, harga, button)
  );
  card.addEventListener("mouseout", () =>
    cardDescAppear(kategori, harga, button)
  );
});

// function yang menghilangkan descripsi ketika card di hover
function cardDescDisappear(category, price, button) {
  category.classList.add("catalog-description-disappear");
  price.classList.add("catalog-description-disappear");
  button.classList.remove("card-button-disappear");
}

// function yang memunculkan deskripsi ketika card di hover
function cardDescAppear(category, price, button) {
  if (
    category.classList.contains("catalog-description-disappear") &&
    price.classList.contains("catalog-description-disappear")
  ) {
    category.classList.remove("catalog-description-disappear");
    price.classList.remove("catalog-description-disappear");
    button.classList.add("card-button-disappear");
  }
}


