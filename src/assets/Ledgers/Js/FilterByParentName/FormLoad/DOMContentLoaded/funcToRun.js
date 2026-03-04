const createVisitRow = ({ template, data, index }) => {
    const clone = template.content.cloneNode(true);

    clone.querySelector('.visible-number').textContent = index + 1;
    clone.querySelector('.row-number').textContent = index + 1;
    clone.querySelector('.page-name').textContent = data.LedgerName;
    clone.querySelector('.page-views').textContent = data.LedgerParentName;
    clone.querySelector('.page-value').textContent = data.LedgerType;

    return clone;
};

const renderVisits = ({ data, containerId, templateId }) => {
    const container = document.getElementById(containerId);
    const template = document.getElementById(templateId);

    if (!container || !template) return;

    container.innerHTML = '';

    data.forEach((item, index) => {
        const row = createVisitRow({ template, data: item, index });
        container.appendChild(row);
    });

    const totalRows = container.querySelectorAll("tr").length;
    document.getElementById("ledgerCountBtn").textContent = `${totalRows} / ${totalRows}`;
};

const getFilteredData = ({ data }) => {
    const params = new URLSearchParams(window.location.search);
    const parentFilter = params.get("LedgerParentName");

    if (!parentFilter) {
        alert("Which group you want to show?");
        return [];
    }

    return data.filter(item => item.LedgerParentName === parentFilter);
};

const fetchData = async ({ url }) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const StartFunc = async () => {
    const visitsData = await fetchData({ url: 'ledgers.json' });

    const filteredData = getFilteredData({ data: visitsData });

    if (!filteredData.length) return;

    renderVisits({
        data: filteredData,
        containerId: 'visits-container',
        templateId: 'visit-template'
    });
};

const input = document.getElementById("topbarInputIconLeft");

input.addEventListener("keyup", () => {
    const filter = input.value.toLowerCase();
    const rows = document.querySelectorAll("#visits-container tr");

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

    let visibleIndex = 1;

    document.querySelectorAll("#visits-container tr").forEach(row => {
        if (row.style.display !== "none") {
            row.querySelector(".visible-number").textContent = visibleIndex++;
        }
    });

    const total = rows.length;
    const visible = [...rows].filter(r => r.style.display !== "none").length;

    document.getElementById("ledgerCountBtn").textContent = `${visible} / ${total}`;
});

export { StartFunc };