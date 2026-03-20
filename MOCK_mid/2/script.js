fetch("student-score.json")
    .then(res => res.json())
    .then(data => {

        const table = document.createElement("table");

        const headers = ["name", "gender", "maths"];
        const headerRow = table.insertRow();

        headers.forEach(h => {
            const th = document.createElement("th");
            th.textContent = h;
            headerRow.appendChild(th);
        });

        data.forEach(stu => {
            const row = table.insertRow();

            headers.forEach(h => {
                const td = row.insertCell();

                if (h === "maths") {
                    const score = stu[h];
                    const percent = score + "%";

                    const barWrapper = document.createElement("div");
                    barWrapper.className = "bar-wrapper";

                    const bar = document.createElement("div");
                    bar.className = "bar";
                    bar.style.width = percent;
                    bar.textContent = percent;

                    barWrapper.appendChild(bar);
                    td.appendChild(barWrapper);
                } else {
                    td.textContent = stu[h];
                }
            });
        });

        document.getElementById("result").appendChild(table);
    });
