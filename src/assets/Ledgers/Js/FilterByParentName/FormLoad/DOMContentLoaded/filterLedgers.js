const StartFunc = ({ data }) => {
    const params = new URLSearchParams(window.location.search);
    const parentFilter = params.get("LedgerParentName");

    if (!parentFilter) {
        alert("Which group you want to show?");
        return [];
    }

    return data.filter(item => item.LedgerParentName === parentFilter);
};

export { StartFunc };