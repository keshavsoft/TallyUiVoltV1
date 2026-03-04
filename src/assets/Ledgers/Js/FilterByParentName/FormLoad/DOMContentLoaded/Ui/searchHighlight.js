const StartFunc = (inParams) => {

    const localInParams = Object.freeze(inParams);

    const localDomInput = localInParams.inDomInput;
    const localDomTable = localInParams.inDomTable;
    const localDomLedgerBtn = localInParams.inDomLedgerBtn;

    localDomInput.addEventListener("keyup", () => {

        const localFilter = localDomInput.value.toLowerCase();
        const localRows = localDomTable.querySelectorAll("tr");

        localRows.forEach(row => {

            const localRowText = row.textContent.toLowerCase();
            const localMatch = localRowText.includes(localFilter);

            row.style.display = localMatch ? "" : "none";

            row.querySelectorAll("td").forEach(cell => {
                cell.innerHTML = cell.textContent;
            });

            if (localFilter && localMatch) {

                row.querySelectorAll("td").forEach(cell => {

                    const localText = cell.textContent;
                    const localRegex = new RegExp(`(${localFilter})`, "gi");

                    cell.innerHTML =
                        localText.replace(localRegex, `<span class="highlight">$1</span>`);

                });

            }

        });

        const localTotal = localRows.length;
        const localVisible = [...localRows].filter(r => r.style.display !== "none").length;

        localDomLedgerBtn.textContent = `${localVisible} / ${localTotal}`;

    });
};

export { StartFunc };