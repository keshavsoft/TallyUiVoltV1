const StartFunc = ({ inputId, tableId }) => {
    const input = document.getElementById(inputId);

    input.addEventListener("keyup", () => {
        const filter = input.value.toLowerCase();
        const rows = document.querySelectorAll(`#${tableId} tr`);

        rows.forEach(row => {
            const rowText = row.textContent.toLowerCase();
            const matchFound = rowText.includes(filter);

            row.style.display = matchFound ? "" : "none";

            row.querySelectorAll("td").forEach(cell => {
                cell.innerHTML = cell.textContent;
            });

            if (filter && matchFound) {
                row.querySelectorAll("td").forEach(cell => {
                    const text = cell.textContent;
                    const regex = new RegExp(`(${filter})`, "gi");
                    cell.innerHTML = text.replace(regex, `<span class="highlight">$1</span>`);
                });
            }
        });

        const total = rows.length;
        const visible = [...rows].filter(r => r.style.display !== "none").length;

        document.getElementById("ledgerCountBtn").textContent = `${visible} / ${total}`;
    });
};

export { StartFunc };