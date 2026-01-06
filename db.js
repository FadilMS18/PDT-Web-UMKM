// Objek foods
const foods = [
  {
    id: 1,
    name: "RAMEN KLASIK",
    price: 0, // Atau "Gratis" sesuai tampilan
    category: "Makanan Berat",
    image: "./../assets/IMG/123c78e7-2e39-461d-80ea-be1c5ebb6dda.png",
    discount: 0,
  },
  {
    id: 2,
    name: "BAKMI AYAM",
    price: 11500, // Harga diskon
    category: "Makanan Berat",
    image: "./../assets/IMG/4556d540-24b9-4783-9a93-2a1417409153.png",
    discount: 0,
  },
  {
    id: 3,
    name: "BURGER 2 LANTAI",
    price: 31500,
    category: "Makanan Berat",
    image: "./../assets/IMG/66d86c69-d20c-4117-a72a-e1ed7481c12e.png",
    discount: 0,
  },
  {
    id: 4,
    name: "NASI GORENG CENTURY",
    price: 27000,
    category: "Makanan Berat",
    image: "./../assets/IMG/6854cbc3-2206-4ca2-879f-5a12dc0c0671.png",
    discount: 0,
  },
  {
    id: 5,
    name: "PIZZA TARIK MENARIK",
    price: 47000,
    category: "Makanan Berat",
    image: "./../assets/IMG/6dc329a3-9645-4b52-ade7-a629cbea0d81.png",
    discount: 0,
  },
  {
    id: 6,
    name: "HEALTHY REAL FOOD",
    price: 69.000,
    category: "Makanan Berat",
    image: "./../assets/IMG/84a2a237-f6b4-4bff-ae21-d1a420a6f889.png",
    discount: 0,
  },
  {
    id: 7,
    name: "AYAM & SAYUR",
    price: 35000,
    category: "Makanan Berat",
    image:
      "./../assets/IMG/A plate of food with a chicken vegetables and rice….png",
    discount: 0,
  },
  {
    id: 8,
    name: "DIM TO SUM",
    price: 13000,
    category: "Makanan Ringan",
    image: "./../assets/IMG/ㅤ                😵_💫  ੈ _  𝑝͟𝑛͟𝑔   ✿⃨.png",
    discount: 0,
  },
];

// Fungsi helper untuk cek apakah query adalah subsequence dari name (case-insensitive)
function isSubsequence(query, name) {
  const lowerQuery = query.toLowerCase(); // Query Ke Huruf Kecil
  const lowerName = name.toLowerCase(); // nama dari objek ke huruf kecil
  let i = 0; // penetapan iterasi
  for (let char of lowerName) {
    if (char === lowerQuery[i]) {
      i++; // Akan melihat setiap huruf di nama objek jika huruf nya sama ada di huruf query maka pointer akan bertambah
    }
    if (i === lowerQuery.length) {
      // jika pointer panjangnya sama dengan query maka benar adanya objek saat ini cocok dengan query maka mengembalikkan objek
      return true;
    }
  }
  return false; // Jika tidak maka return false
}

function filter(query, foods) {
  const result = foods.filter((food) => {
    return isSubsequence(query, food.name);
  });
  return result;
}

console.log(filter("a", foods)); // Semua 4 objek muncul
console.log(filter("aa", foods)); // Hanya Ayam
console.log(filter("ai", foods)); // Hanya Sapi
console.log(filter("ia", foods)); // Hanya Ikan
console.log(filter("aaa", foods)); // Tidak ada yang muncul

const catalogContainer = document.querySelector("#catalog-card-container");

function makeCatalogCard(name, category, price, imageSRC) {
  const card = makeADiv();
  card.classList.add("catalog-card");
  card.classList.add("catalog-card-enter");
  setTimeout(() => {
    card.classList.remove("catalog-card-enter");
  }, 1);

  const img = document.createElement("img");
  img.src = imageSRC;

  const cardDescContainer = makeADiv();
  cardDescContainer.classList.add("desc-container");
  let foodName = makeAPara("catalog-card-nama-makanan", name);
  let foodCategory = makeAPara("catalog-card-kategori-makanan", category);
  let foodPrice = makeAPara("catalog-card-harga-makanan", `RP ${price}`);

  cardDescContainer.append(foodName, foodCategory, foodPrice);

  const button = document.createElement("button");
  button.textContent = `ADD TO CART Rp ${price}`;
  button.classList.add("card-button-disappear");
  button.setAttribute("id", "card-add-to-cart-button");

  card.append(img, cardDescContainer, button);

  card.addEventListener("mouseover", () =>
    cardDescDisappear(foodCategory, foodPrice, button)
  );
  card.addEventListener("mouseout", () =>
    cardDescAppear(foodCategory, foodPrice, button)
  );

  return card;
}

function makeADiv() {
  const div = document.createElement("div");
  return div;
}

function makeAPara(clas, content) {
  const para = document.createElement("p");
  para.textContent = content;
  para.classList.add(clas);
  return para;
}

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

const searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", () => {
  const searchBar = document.querySelector("#search-bar");
  let results = filter(searchBar.value, foods);
  catalogContainer.innerHTML = "";
  if (!results.length) {
    catalogContainer.innerHTML = `<h1 class="no-search">Tidak Ada Makanan Yang Cocok</h1> <img class="no-search" src="./../assets/IMG/yaki mappikkiri.jpg">`;
    catalogContainer.classList.add("no-result");
  } else {
    catalogContainer.classList = "";
    results.forEach((result) => {
      let card = makeCatalogCard(
        result.name,
        result.category,
        result.price,
        result.image
      );
      catalogContainer.appendChild(card);
    });
  }
});


