let sortDirections = {};


function sortTable(columnIndex) {
    const table = document.getElementById("logTable");
    const tbody = table.tBodies[0];
    const rows = Array.from(tbody.rows);
    const isDate = columnIndex === 2;

    // Toggle sort direction
    const direction = sortDirections[columnIndex] === 'asc' ? 'desc' : 'asc';
    sortDirections = {}; // reset others
    sortDirections[columnIndex] = direction;

    // Reset all arrows
    for (let i = 0; i < 3; i++) {
        const arrow = document.getElementById("arrow" + i);
        if (arrow) arrow.textContent = "";
    }
    // Set current arrow
    const currentArrow = document.getElementById("arrow" + columnIndex);
    if (currentArrow) currentArrow.textContent = direction === 'asc' ? "↑" : "↓";

    const sorted = rows.sort((a, b) => {
        let valA = a.cells[columnIndex].textContent.trim();
        let valB = b.cells[columnIndex].textContent.trim();

        if (isDate) {
            valA = new Date(valA);
            valB = new Date(valB);
        }

        if (valA < valB) return direction === 'asc' ? -1 : 1;
        if (valA > valB) return direction === 'asc' ? 1 : -1;
        return 0;
    });

    tbody.innerHTML = "";
    sorted.forEach(row => tbody.appendChild(row));
}
