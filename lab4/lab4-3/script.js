let balance = 0;

function addItem() {
    const title = document.getElementById("title").value;
    const amount = Number(document.getElementById("amount").value);
    const type = document.getElementById("type").value;
    const date = document.getElementById("date").value;

    if (!title || !amount || !date) return;

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${date}</td>
        <td>${title}</td>
        <td>${type === "income" ? amount : 0}</td>
        <td>${type === "expense" ? amount : 0}</td>
    `;

    document.getElementById("list").appendChild(row);

    balance += (type === "income") ? amount : -amount;
    document.getElementById("balance").textContent = balance;
}
