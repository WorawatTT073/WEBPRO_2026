function showTable() {
    const num = document.getElementById("num").value;
    const tbody = document.querySelector("#result tbody");
    tbody.innerHTML = "";

    if (num < 1 || num > 12) return;

    for (let i = 1; i <= 12; i++) {
        const row = document.createElement("tr");

        const col1 = document.createElement("td");
        col1.textContent = `${num} x ${i}`;

        const col2 = document.createElement("td");
        col2.textContent = num * i;

        row.appendChild(col1);
        row.appendChild(col2);
        tbody.appendChild(row);
    }
}