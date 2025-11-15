const navbar1 = document.querySelector("#nav1");

// Function untuk membuat animasi navbar pas page pertama direload
function time() {
  setTimeout(() => {
    navbar1.classList.remove("nav-start-disappear");
  }, 5);
}

document.addEventListener("DOMContentLoaded", time);
