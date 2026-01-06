let products = [
  {
    id: 1,
    name: "Coto Makassar",
    category: "Makanan",
    price: 25000,
    stock: 45,
    description: "Sup daging khas Makassar dengan bumbu rempah yang kaya",
    image: "./../../assets/IMG/coto.jpeg",
  },
  {
    id: 2,
    name: "Pallubasa",
    category: "Makanan",
    price: 28000,
    stock: 32,
    description: "Sup khas Makassar dengan kuah santan yang gurih",
    image: "./../../assets/IMG/pallubasa.jpeg",
  },
  {
    id: 3,
    name: "Es Pisang Ijo",
    category: "Dessert",
    price: 15000,
    stock: 8,
    description: "Pisang dalam adonan hijau dengan saus santan manis",
    image: "./../../assets/IMG/pisang ijo.jpeg",
  },
  {
    id: 4,
    name: "Sop Saudara",
    category: "Makanan",
    price: 22000,
    stock: 28,
    description: "Sop daging khas Pangkep dengan rempah pilihan",
    image: "./../../assets/IMG/sop saudara.jpeg",
  },
  {
    id: 5,
    name: "Es Teh Manis",
    category: "Minuman",
    price: 5000,
    stock: 0,
    description: "Es teh manis segar",
    image: "./../../assets/IMG/teh.jpeg",
  },
  {
    id: 6,
    name: "Pisang Epe",
    category: "Camilan",
    price: 12000,
    stock: 20,
    description: "Pisang bakar dengan saus gula merah",
    image: "./../../assets/IMG/pisang epe.jpeg",
  },
];

let editingId = null;
let imagePreviewData = null;

function renderProducts() {
  const grid = document.getElementById("productsGrid");
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const categoryFilter = document.getElementById("categoryFilter").value;
  const stockFilter = document.getElementById("stockFilter").value;

  let filtered = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm);
    const matchCategory =
      categoryFilter === "all" || p.category === categoryFilter;

    let matchStock = true;
    if (stockFilter === "available") matchStock = p.stock > 10;
    else if (stockFilter === "low") matchStock = p.stock > 0 && p.stock <= 10;
    else if (stockFilter === "empty") matchStock = p.stock === 0;

    return matchSearch && matchCategory && matchStock;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
                    <div class="empty-state" style="grid-column: 1/-1">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        <h3>Tidak ada produk ditemukan</h3>
                        <p>Coba ubah filter atau tambah produk baru</p>
                    </div>
                `;
    return;
  }

  grid.innerHTML = filtered
    .map(
      (product) => `
                <div class="product-card">
                    <img src="${product.image}" style="" alt="${
        product.name
      }" class="product-image" />
                    <div class="product-info">
                        <span class="product-category">${
                          product.category
                        }</span>
                        <div class="product-name">${product.name}</div>
                        <div class="product-price">Rp ${product.price.toLocaleString(
                          "id-ID"
                        )}</div>
                        <div class="product-stock">
                            Stok: ${
                              product.stock === 0
                                ? '<span style="color: #ff4d6d">Habis</span>'
                                : product.stock < 10
                                ? `<span style="color: #f2b441">${product.stock} tersisa</span>`
                                : `${product.stock} tersedia`
                            }
                        </div>
                        <div class="product-actions">
                            <button class="btn-edit" onclick="editProduct(${
                              product.id
                            })">Edit</button>
                            <button class="btn-delete" onclick="deleteProduct(${
                              product.id
                            })">Hapus</button>
                        </div>
                    </div>
                </div>
            `
    )
    .join("");
}

function openModal() {
  editingId = null;
  imagePreviewData = null;
  document.getElementById("modalTitle").textContent = "Tambah Produk Baru";
  document.getElementById("productName").value = "";
  document.getElementById("productCategory").value = "Makanan";
  document.getElementById("productPrice").value = "";
  document.getElementById("productStock").value = "";
  document.getElementById("productDescription").value = "";
  document.getElementById("productImage").value = "";
  document.getElementById("imagePreview").innerHTML =
    "<span>Preview gambar akan muncul di sini</span>";
  document.getElementById("productModal").classList.add("active");
}

function closeModal() {
  document.getElementById("productModal").classList.remove("active");
}

function editProduct(id) {
  const product = products.find((p) => p.id === id);
  if (!product) return;

  editingId = id;
  imagePreviewData = product.image;
  document.getElementById("modalTitle").textContent = "Edit Produk";
  document.getElementById("productName").value = product.name;
  document.getElementById("productCategory").value = product.category;
  document.getElementById("productPrice").value = product.price;
  document.getElementById("productStock").value = product.stock;
  document.getElementById("productDescription").value = product.description;
  document.getElementById(
    "imagePreview"
  ).innerHTML = `<img src="${product.image}" alt="${product.name}" />`;
  document.getElementById("productModal").classList.add("active");
}

function deleteProduct(id) {
  if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
    products = products.filter((p) => p.id !== id);
    renderProducts();
  }
}

function previewImage(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imagePreviewData = e.target.result;
      document.getElementById(
        "imagePreview"
      ).innerHTML = `<img src="${e.target.result}" alt="Preview" />`;
    };
    reader.readAsDataURL(file);
  }
}

function saveProduct() {
  const name = document.getElementById("productName").value.trim();
  const category = document.getElementById("productCategory").value;
  const price = parseInt(document.getElementById("productPrice").value);
  const stock = parseInt(document.getElementById("productStock").value);
  const description = document
    .getElementById("productDescription")
    .value.trim();

  if (!name || !price || !stock || !description) {
    alert("Harap isi semua field yang diperlukan!");
    return;
  }

  if (!imagePreviewData) {
    alert("Harap upload gambar produk!");
    return;
  }

  if (editingId) {
    // Update existing product
    const index = products.findIndex((p) => p.id === editingId);
    if (index !== -1) {
      products[index] = {
        ...products[index],
        name,
        category,
        price,
        stock,
        description,
        image: imagePreviewData,
      };
    }
  } else {
    // Add new product
    const newProduct = {
      id: products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1,
      name,
      category,
      price,
      stock,
      description,
      image: imagePreviewData,
    };
    products.push(newProduct);
  }

  closeModal();
  renderProducts();
}

function filterProducts() {
  renderProducts();
}

// Search functionality
document
  .getElementById("searchInput")
  .addEventListener("input", renderProducts);

// Close modal on outside click
document.getElementById("productModal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeModal();
  }
});

// Initial render
renderProducts();
