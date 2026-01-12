const medicineData = [
  { name: "Paracetamol", pharmacy: "Apollo Pharmacy", status: "Available", contact: "9876543210" },
  { name: "Paracetamol", pharmacy: "City Medical Store", status: "Out of Stock", contact: "9123456780" },
  { name: "Azithromycin", pharmacy: "Wellness Pharmacy", status: "Limited", contact: "9988776655" }
];

function searchMedicine() {
  const query = document.getElementById("searchBox").value.toLowerCase();
  const resultSection = document.getElementById("searchResults");
  const resultsDiv = document.getElementById("results");

  resultsDiv.innerHTML = "";

  const filtered = medicineData.filter(m =>
    m.name.toLowerCase().includes(query)
  );

  resultSection.style.display = "block";

  if (filtered.length === 0) {
    resultsDiv.innerHTML = "<p>No medicine found.</p>";
    return;
  }

  filtered.forEach(med => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${med.pharmacy}</h3>
      <p>Medicine: ${med.name}</p>
      <p>Status: ${med.status}</p>
      <p>Contact: ${med.contact}</p>
    `;
    resultsDiv.appendChild(card);
  });
}

/* Doctor Order */
function generateOrder() {
  const patient = document.getElementById("patientName").value;
  const medicine = document.getElementById("medicineName").value;
  const qty = document.getElementById("quantity").value;

  if (!patient || !medicine || !qty) {
    alert("Please fill all fields");
    return;
  }

  const orderId = "ORD" + Date.now().toString().slice(-6);

  const output = document.getElementById("orderOutput");
  output.style.display = "block";
  output.innerHTML = `
    Order ID Generated: <strong>${orderId}</strong><br>
    Patient: ${patient}<br>
    Medicine: ${medicine} (${qty})
  `;

  logAudit("Order created by doctor | " + orderId);
}


/* Pharmacy */
function updateOrderStatus(select) {
  const statusText = select.parentElement.querySelector(".status-text");
  statusText.innerText = "Status updated to: " + select.value;
  logAudit("Order status changed to " + select.value);
}

/* Audit */
function logAudit(action) {
  console.log("AUDIT:", action, new Date().toLocaleString());
}
