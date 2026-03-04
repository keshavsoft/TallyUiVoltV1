const StartFunc = (inParams) => {
    const localInParams = Object.freeze(inParams);

    const localInConfig = localInParams.inConfig;

    const localDomCache = {
        tableContainer: document.getElementById(localInConfig.domIds.tableContainer),
        tableTemplate: document.getElementById(localInConfig.domIds.tableTemplate),
        searchInput: document.getElementById(localInConfig.domIds.searchInput),
        ledgerCountBtn: document.getElementById(localInConfig.domIds.ledgerCountBtn)
    };

    return localDomCache;
};

export { StartFunc };