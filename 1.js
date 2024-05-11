document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("formRegister");
    const tableBody = document.getElementById("tablebody");

    // Función para agregar una fila a la tabla
    function addRow(name, id, datetime) {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${name}</td>
            <td>${id}</td>
            <td>${datetime}</td>
            <td><button class="editButton">Editar</button></td>
        `;
        tableBody.appendChild(newRow);

        // Agrega el evento de edición a la fila recién agregada
        const editButton = newRow.querySelector(".editButton");
        editButton.addEventListener("click", handleEdit);
    }

    // Función para manejar el evento de edición
    function handleEdit(event) {
        const clickedButton = event.target;
        const row = clickedButton.closest("tr");
        const cells = row.querySelectorAll("td");

        if (clickedButton.textContent === "Editar") {
            cells.forEach((cell, index) => {
                if (index === 0 || index === 1) {
                    const text = cell.textContent;
                    cell.innerHTML = `<input type="text" value="${text}">`;
                }
            });
            clickedButton.textContent = "Guardar";
        } else if (clickedButton.textContent === "Guardar") {
            const inputs = row.querySelectorAll("input");
            inputs.forEach((input, index) => {
                cells[index].textContent = input.value;            });
            clickedButton.textContent = "Editar";

            // Guardar en almacenamiento local
            saveToLocal();
        }
    }

    // Función para guardar en almacenamiento local
    function saveToLocal() {
        const rows = tableBody.querySelectorAll("tr");
        const data = [];

        rows.forEach(row => {
            const cells = row.querySelectorAll("td");
            const rowData = [];
            cells.forEach(cell => {
                rowData.push(cell.textContent);
            });
            data.push(rowData);
        });

        localStorage.setItem("tableData", JSON.stringify(data));
    }

    // Función para cargar desde almacenamiento local
    function loadFromLocal() {
        const data = JSON.parse(localStorage.getItem("tableData"));
        if (data) {
            data.forEach(rowData => {
                addRow(...rowData);
            });
        }
    }

    // Cargar datos al cargar la página
    loadFromLocal();

    // Agrega el evento de envío al formulario
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const nameInput = document.getElementById("nameinput").value;
        const idInput = document.getElementById("id").value;
        const datetime = new Date().toLocaleString();

        addRow(nameInput, idInput, datetime);

        // Guardar en almacenamiento local
        saveToLocal();

        form.reset();
    });
});
