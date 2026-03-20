const tableBody = document.getElementById("tableBody");
let moneyData = [];

// ===== LOAD DATA =====
if (localStorage.getItem("moneyData")) {
  moneyData = JSON.parse(localStorage.getItem("moneyData"));
  renderTable();
} else {
  fetch("money.json")
    .then(res => res.json())
    .then(data => {
      moneyData = data.money;
      localStorage.setItem("moneyData", JSON.stringify(moneyData));
      renderTable();
    });
}

// ===== RENDER TABLE =====
function renderTable() {
  tableBody.textContent = "";

  moneyData.forEach((item, index) => {
    const row = document.createElement("tr");
    row.dataset.index = index;

    row.appendChild(createCell(item.id));
    row.appendChild(createCell(item.name));
    row.appendChild(
      createCell(item.type === "income" ? item.amount : "")
    );
    row.appendChild(
      createCell(item.type === "expense" ? item.amount : "")
    );

    const actionTd = document.createElement("td");
    const btn = document.createElement("button");
    btn.textContent = "Edit";
    btn.onclick = () => editRow(btn);
    actionTd.appendChild(btn);
    row.appendChild(actionTd);

    tableBody.appendChild(row);
  });

  calculateTotal();
}

// ===== CREATE TD =====
function createCell(text) {
  const td = document.createElement("td");
  td.textContent = text;
  return td;
}

// ===== EDIT =====
function editRow(btn) {
  const row = btn.closest("tr");

  for (let i = 0; i < 4; i++) {
    const td = row.cells[i];
    const input = document.createElement("input");
    input.value = td.textContent;
    td.textContent = "";
    td.appendChild(input);
  }

  btn.textContent = "Save";
  btn.onclick = () => saveRow(btn);
}

// ===== SAVE =====
function saveRow(btn) {
  const row = btn.closest("tr");
  const index = row.dataset.index;
  const inputs = row.querySelectorAll("input");

  const id = inputs[0].value;
  const name = inputs[1].value;
  const income = inputs[2].value;
  const expense = inputs[3].value;

  moneyData[index].id = id;
  moneyData[index].name = name;

  if (income !== "") {
    moneyData[index].type = "income";
    moneyData[index].amount = Number(income);
  } else {
    moneyData[index].type = "expense";
    moneyData[index].amount = Number(expense);
  }

  localStorage.setItem("moneyData", JSON.stringify(moneyData));
  renderTable();
}

// ===== TOTAL =====
function calculateTotal() {
  let totalIncome = 0;
  let totalExpense = 0;

  moneyData.forEach(item => {
    if (item.type === "income") totalIncome += item.amount;
    if (item.type === "expense") totalExpense += item.amount;
  });

  document.getElementById("totalIncome").textContent = totalIncome;
  document.getElementById("totalExpense").textContent = totalExpense;
  document.getElementById("netTotal").textContent =
    totalIncome - totalExpense;
}
