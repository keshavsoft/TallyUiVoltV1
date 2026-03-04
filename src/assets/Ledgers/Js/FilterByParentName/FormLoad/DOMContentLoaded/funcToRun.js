import { StartFunc as FetchData } from "./fetchData.js";
import { StartFunc as FilterLedgers } from "./filterLedgers.js";
import { StartFunc as RenderVisits } from "./renderTable.js";
import { StartFunc as AttachSearch } from "./searchHighlight.js";

const StartFunc = async () => {
    const visitsData = await FetchData({ url: "ledgers.json" });

    const filteredData = FilterLedgers({ data: visitsData });

    if (!filteredData.length) return;

    RenderVisits({
        data: filteredData,
        containerId: "visits-container",
        templateId: "visit-template"
    });

    AttachSearch({
        inputId: "topbarInputIconLeft",
        tableId: "visits-container"
    });
};

export { StartFunc };