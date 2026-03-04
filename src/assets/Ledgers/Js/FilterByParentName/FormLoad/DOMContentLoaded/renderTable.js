const createVisitRow = ({ template, data, index }) => {
    const clone = template.content.cloneNode(true);

    clone.querySelector('.visible-number').textContent = index + 1;
    clone.querySelector('.row-number').textContent = index + 1;
    clone.querySelector('.page-name').textContent = data.LedgerName;
    clone.querySelector('.page-views').textContent = data.LedgerParentName;
    clone.querySelector('.page-value').textContent = data.LedgerType;

    return clone;
};

const StartFunc = ({ data, containerId, templateId }) => {
    const container = document.getElementById(containerId);
    const template = document.getElementById(templateId);

    container.innerHTML = '';

    data.forEach((item, index) => {
        container.appendChild(createVisitRow({ template, data: item, index }));
    });

    const totalRows = container.querySelectorAll("tr").length;
    document.getElementById("ledgerCountBtn").textContent = `${totalRows} / ${totalRows}`;
};

export { StartFunc };