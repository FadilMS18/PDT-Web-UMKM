const navbar1 = document.querySelector("#nav1");
const stickyNav = document.querySelector("#sticky-nav");
let prevScrollPos = window.pageYOffset;

// Sticky navbar akan muncul jika kita mengscroll keatas dan hilkang kalau scroll kebawah
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


// Function untuk membuat animasi navbar pas page pertama direload
function time() {
  setTimeout(() => {
    navbar1.classList.remove("nav-start-disappear");
    heroContainer.classList.remove("hero-container-enter")
  }, 5);

}

document.addEventListener("DOMContentLoaded", time);


const heroContainer = document.querySelector("#hero-container")

async function ambilDataProduk() {
    try {
        // Minta data ke server backend yang kita buat tadi
        const respon = await fetch('http://localhost:3000/api/produk');
        const data = await respon.json();

        console.log("Data dari database:", data);
        // Di sini nanti kamu buat kode untuk menampilkan ke layar HTML
    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }
}

ambilDataProduk();