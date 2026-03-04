const StartFunc = (inParams) => {
    const localInParams = Object.freeze(inParams);

    const localInData = localInParams.inData;

    const localUrlParams = new URLSearchParams(window.location.search);
    const localParentFilter = localUrlParams.get("LedgerParentName");

    if (!localParentFilter) {
        alert("Which group you want to show?");
        return [];
    };

    const localFiltered = localInData.filter(item =>
        item.LedgerParentName === localParentFilter
    );

    return localFiltered;
};

export { StartFunc };