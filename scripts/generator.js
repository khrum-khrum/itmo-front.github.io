function generateTable(event) {
  event.preventDefault();

  const rows = parseInt(document.getElementById("rows").value);
  const cols = parseInt(document.getElementById("cols").value);
  const header = document.getElementById("header").checked;

  let tableHTML = "<table>";
  if (header) {
    tableHTML += "<tr>";
    for (let i = 0; i < cols; i++) {
      tableHTML += `<th>Column ${i + 1}</th>`;
    }
    tableHTML += "</tr>";
  }

  for (let i = 0; i < rows; i++) {
    tableHTML += "<tr>";
    for (let j = 0; j < cols; j++) {
      tableHTML += `<td contenteditable="true"></td>`; // Initially empty
    }
    tableHTML += "</tr>";
  }

  tableHTML += "</table>";
  document.getElementById("tableOutput").innerHTML = tableHTML;

  loadTableData(); 
  saveSettings();

  const table = document.querySelector("#tableOutput table");
  table.addEventListener("input", saveTableData);
}

function saveTableData() {
  const tableData = [];
  const rows = document.querySelectorAll("#tableOutput table tr");
  rows.forEach((row) => {
    const rowData = [];
    const cells = row.querySelectorAll("td");
    cells.forEach((cell) => rowData.push(cell.textContent));
    tableData.push(rowData);
  });
  localStorage.setItem("tableData", JSON.stringify(tableData));
}

function loadTableData() {
  const storedData = localStorage.getItem("tableData");
  if (storedData) {
    const tableData = JSON.parse(storedData);
    const table = document.querySelector("#tableOutput table");
    tableData.forEach((row, rowIndex) => {
      row.forEach((cellValue, cellIndex) => {
        table.rows[
          rowIndex + (document.getElementById("header").checked ? 1 : 0)
        ].cells[cellIndex].textContent = cellValue;
      });
    });
  }
}

function saveSettings() {
  const settings = {
    rows: parseInt(document.getElementById("rows").value),
    cols: parseInt(document.getElementById("cols").value),
    header: document.getElementById("header").checked,
  };
  localStorage.setItem("tableSettings", JSON.stringify(settings));
}

window.addEventListener("load", () => {
  const storedSettings = localStorage.getItem("tableSettings");
  if (storedSettings) {
    const settings = JSON.parse(storedSettings);
    document.getElementById("rows").value = settings.rows;
    document.getElementById("cols").value = settings.cols;
    document.getElementById("header").checked = settings.header;
  }
});
