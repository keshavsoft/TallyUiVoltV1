async function fetchData(url) {
    try {
        // Wait for the network request to complete
        const response = await fetch(url);

        // Check if the request was successful (status 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Wait for the response body to be parsed as JSON
        const data = await response.json();
        // console.log(data);
        return data;

    } catch (error) {
        // Handle network errors or errors thrown in the try block
        console.error('Error fetching data:', error);
    }
};

const StartFunc = async () => {
    const visitsData = await fetchData('ledgers.json');

    SetTotalLedgers({ inData: visitsData });

    const groupedData = GroupByParent(visitsData);
    SetTotalGroups({ groupedData });

    RenderList({ inData: visitsData });
};

const GroupByParent = (data) => {
    return data.reduce((acc, item) => {
        const key = item.LedgerParentName;

        if (!acc[key]) {
            acc[key] = [];
        }

        acc[key].push(item);
        return acc;
    }, {});
};

const CreateParentItem = ({ template, parentName, count, serial }) => {
    const clone = template.content.cloneNode(true);

    const imageContainer = clone.querySelector(".item-image");

    imageContainer.replaceWith(
        Object.assign(document.createElement("div"), {
            className: "avatar bg-primary text-white rounded d-flex align-items-center justify-content-center",
            textContent: serial
        })
    );

    clone.querySelector(".item-title").textContent = parentName;
    clone.querySelector(".item-status-text").textContent = "Ledger Group";
    clone.querySelector(".item-status-dot").classList.add("bg-primary");

    clone.querySelector(".item-action").innerHTML = `
        <a href="#" class="btn btn-sm btn-secondary d-inline-flex align-items-center">
            ${count}
        </a>`;

    return clone;
};

const RenderList = ({ inData }) => {
    const container = document.getElementById("listContainer");
    const template = document.getElementById("listTemplate");

    container.innerHTML = "";

    const groupedData = GroupByParent(inData);

    const sortedGroups = Object.entries(groupedData)
        .map(([parentName, items]) => ({
            parentName,
            count: items.length
        }))
        .sort((a, b) => b.count - a.count); // descending

    sortedGroups.forEach((group, index) => {
        const listItem = CreateParentItem({
            template,
            parentName: group.parentName,
            count: group.count,
            serial: index + 1
        });

        container.appendChild(listItem);
    });
};

const SetTotalLedgers = ({ inData }) => {
    const totalCount = inData.length;

    const button = document.getElementById("TotalLedgersBtn");
    button.textContent = totalCount;
};

const SetTotalGroups = ({ groupedData }) => {
    const totalGroups = Object.keys(groupedData).length;

    const span = document.getElementById("TotalGroupsCount");
    span.textContent = `(${totalGroups})`;
};

export { StartFunc };