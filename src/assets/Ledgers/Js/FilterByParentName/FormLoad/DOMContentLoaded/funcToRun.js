import { StartFunc as FetchData } from "./Data/fetchData.js";
import { StartFunc as FilterLedgers } from "./Data/filterLedgers.js";
import { StartFunc as RenderVisits } from "./Ui/renderTable.js";
import { StartFunc as AttachSearch } from "./Ui/searchHighlight.js";
import config from "./config.json" with { type: "json" };
import { StartFunc as BuildDomCache } from "./domCache.js";

const StartFunc = async () => {
    const localDom = BuildDomCache({
        inConfig: config
    });

    const localData = await FetchData({
        inUrl: config.ledgerUrl
    });

    const localFiltered = FilterLedgers({
        inData: localData
    });

    if (!localFiltered.length) return;

    RenderVisits({
        inData: localFiltered,
        inDomContainer: localDom.tableContainer,
        inDomTemplate: localDom.tableTemplate,
        inDomLedgerBtn: localDom.ledgerCountBtn
    });

    AttachSearch({
        inDomInput: localDom.searchInput,
        inDomTable: localDom.tableContainer
    });
};

export { StartFunc };