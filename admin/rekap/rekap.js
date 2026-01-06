// Data transactions
const transactions = [
  {
    id: "TRX-001",
    date: "30-12-2024 14:23",
    customer: "Tony Stark",
    items: "Coto Makassar x2",
    amount: 50000,
    status: "completed",
    payment: "Cash",
  },
  {
    id: "TRX-002",
    date: "30-12-2024 13:45",
    customer: "Mibe",
    items: "Pallubasa x1",
    amount: 28000,
    status: "completed",
    payment: "Transfer",
  },
  {
    id: "TRX-003",
    date: "30-12-2024 12:30",
    customer: "PingPing",
    items: "Sop Saudara x3",
    amount: 66000,
    status: "pending",
    payment: "E-Wallet",
  },
  {
    id: "TRX-004",
    date: "29-12-2024 18:15",
    customer: "Bruce Wayne",
    items: "Es Pisang Ijo x2",
    amount: 30000,
    status: "completed",
    payment: "Cash",
  },
  {
    id: "TRX-005",
    date: "29-12-2024 16:20",
    customer: "Diana Prince",
    items: "Coto Makassar x1",
    amount: 25000,
    status: "cancelled",
    payment: "Transfer",
  },
  {
    id: "TRX-006",
    date: "29-12-2024 15:10",
    customer: "Clark Kent",
    items: "Pisang Epe x4",
    amount: 48000,
    status: "completed",
    payment: "E-Wallet",
  },
  {
    id: "TRX-007",
    date: "28-12-2024 19:30",
    customer: "Barry Allen",
    items: "Es Teh Manis x5",
    amount: 25000,
    status: "completed",
    payment: "Cash",
  },
  {
    id: "TRX-008",
    date: "28-12-2024 17:45",
    customer: "Arthur Curry",
    items: "Pallubasa x2",
    amount: 56000,
    status: "completed",
    payment: "Transfer",
  },
  {
    id: "TRX-009",
    date: "28-12-2024 14:20",
    customer: "Hal Jordan",
    items: "Sop Saudara x1",
    amount: 22000,
    status: "pending",
    payment: "E-Wallet",
  },
  {
    id: "TRX-010",
    date: "27-12-2024 20:00",
    customer: "Oliver Queen",
    items: "Coto Makassar x3",
    amount: 75000,
    status: "completed",
    payment: "Cash",
  },
];

const topProducts = [
  { rank: 1, name: "Coto Makassar", sales: 342, revenue: 8550000 },
  { rank: 2, name: "Pallubasa", sales: 289, revenue: 8092000 },
  { rank: 3, name: "Sop Saudara", sales: 256, revenue: 5632000 },
  { rank: 4, name: "Es Pisang Ijo", sales: 198, revenue: 2970000 },
  { rank: 5, name: "Pisang Epe", sales: 163, revenue: 1956000 },
];

let currentPage = 1;
const itemsPerPage = 5;

// Initialize charts
function initCharts() {
  // Sales Chart
  const salesCtx = document.getElementById("salesChart").getContext("2d");
  new Chart(salesCtx, {
    type: "line",
    data: {
      labels: [
        "1 Des",
        "5 Des",
        "10 Des",
        "15 Des",
        "20 Des",
        "25 Des",
        "30 Des",
      ],
      datasets: [
        {
          label: "Pendapatan (Rp)",
          data: [450000, 680000, 520000, 890000, 750000, 920000, 850000],
          fill: true,
          tension: 0.4,
          backgroundColor: "rgba(242,180,65,0.1)",
          borderColor: "rgba(242,180,65,0.95)",
          pointRadius: 4,
          pointBackgroundColor: "rgba(242,180,65,1)",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: false },
      },
      scales: {
        x: {
          grid: { color: "rgba(255,255,255,0.03)" },
          ticks: { color: "#a8b3bd" },
        },
        y: {
          grid: { color: "rgba(255,255,255,0.03)" },
          ticks: { color: "#a8b3bd" },
        },
      },
    },
  });

  // Category Chart
  const categoryCtx = document.getElementById("categoryChart").getContext("2d");
  new Chart(categoryCtx, {
    type: "doughnut",
    data: {
      labels: ["Makanan", "Minuman", "Camilan", "Dessert"],
      datasets: [
        {
          data: [55, 20, 15, 10],
          backgroundColor: [
            "rgba(242,180,65,0.95)",
            "rgba(84,214,144,0.8)",
            "rgba(54,162,235,0.8)",
            "rgba(153,102,255,0.8)",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: "bottom",
          labels: { color: "#cbd6dc", padding: 15 },
        },
      },
    },
  });
}

// Render top products
function renderTopProducts() {
  const list = document.getElementById("topProductsList");
  list.innerHTML = topProducts
    .map(function (product) {
      return (
        '<div class="product-item"><div class="product-rank">' +
        product.rank +
        '</div><div class="product-info"><div class="product-name">' +
        product.name +
        '</div><div class="product-sales">' +
        product.sales +
        ' terjual</div></div><div class="product-revenue">Rp ' +
        product.revenue.toLocaleString("id-ID") +
        "</div></div>"
      );
    })
    .join("");
}

// Render transactions table
function renderTransactions() {
  const table = document.getElementById("transactionsTable");
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageData = transactions.slice(start, end);

  let html =
    '<div class="header">ID Transaksi</div><div class="header">Tanggal</div><div class="header">Customer</div><div class="header">Total</div><div class="header">Status</div><div class="header">Pembayaran</div>';

  pageData.forEach(function (trx) {
    let statusClass =
      trx.status === "completed"
        ? "completed"
        : trx.status === "pending"
        ? "pending"
        : "cancelled";
    let statusText =
      trx.status === "completed"
        ? "Selesai"
        : trx.status === "pending"
        ? "Pending"
        : "Dibatalkan";

    html += '<div class="cell">' + trx.id + "</div>";
    html += '<div class="cell">' + trx.date + "</div>";
    html += '<div class="cell">' + trx.customer + "</div>";
    html +=
      '<div class="cell">Rp ' + trx.amount.toLocaleString("id-ID") + "</div>";
    html +=
      '<div class="cell"><span class="status ' +
      statusClass +
      '">' +
      statusText +
      "</span></div>";
    html += '<div class="cell">' + trx.payment + "</div>";
  });

  table.innerHTML = html;
  renderPagination();
}

// Render pagination
function renderPagination() {
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const pagination = document.getElementById("pagination");
  let html = "";

  if (currentPage > 1) {
    html +=
      '<button onclick="changePage(' + (currentPage - 1) + ')">← Prev</button>';
  }

  for (let i = 1; i <= totalPages; i++) {
    let activeClass = i === currentPage ? "active" : "";
    html +=
      '<button class="' +
      activeClass +
      '" onclick="changePage(' +
      i +
      ')">' +
      i +
      "</button>";
  }

  if (currentPage < totalPages) {
    html +=
      '<button onclick="changePage(' + (currentPage + 1) + ')">Next →</button>';
  }

  pagination.innerHTML = html;
}

// Change page
function changePage(page) {
  currentPage = page;
  renderTransactions();
}

// Filter data
function filterData() {
  const period = document.getElementById("periodFilter").value;
  const status = document.getElementById("statusFilter").value;

  if (period === "custom") {
    document.getElementById("startDate").style.display = "block";
    document.getElementById("endDate").style.display = "block";
  } else {
    document.getElementById("startDate").style.display = "none";
    document.getElementById("endDate").style.display = "none";
  }

  // Filter logic would go here
  console.log("Filtering by:", period, status);
  renderTransactions();
}

// Export data
function exportData() {
  alert(
    "Export ke Excel akan segera dimulai...\n\nFile akan berisi:\n- Ringkasan penjualan\n- Detail transaksi\n- Produk terlaris\n- Grafik penjualan"
  );
}

// Search functionality
document.getElementById("searchInput").addEventListener("input", function (e) {
  const searchTerm = e.target.value.toLowerCase();
  console.log("Searching for:", searchTerm);
  // Add search logic here
});

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
  initCharts();
  renderTopProducts();
  renderTransactions();
});
