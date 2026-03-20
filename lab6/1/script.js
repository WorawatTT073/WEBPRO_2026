function showTable(data) {
    const table = document.createElement('table');

    const headerRow = table.insertRow();
    const headers = ['ID', 'Name', 'Gender', 'Position', 'Address'];

    headers.forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });

    data.forEach(emp => {
        const row = table.insertRow();

        const transformedEmp = {
            id: emp.id,
            name: `${emp.LastName.trim()} ${emp.FirstName.trim()}`,
            gender: emp.Gender.charAt(0),
            position: emp.Position,
            address: emp.Address.trim()
        };

        Object.values(transformedEmp).forEach(value => {
            const cell = row.insertCell();
            cell.textContent = value;
        });
    });

    document.getElementById('result').appendChild(table);
}

fetch('employees.json')
    .then(response => response.json())
    .then(data => showTable(data))
    .catch(error => console.log('error', error));
