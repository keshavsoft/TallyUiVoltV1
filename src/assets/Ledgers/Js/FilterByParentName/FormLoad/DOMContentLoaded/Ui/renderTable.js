const createVisitRow = (inParams) => {

    const localInParams = Object.freeze(inParams);

    const localInTemplate = localInParams.inTemplate;
    const localInData = localInParams.inData;
    const localInIndex = localInParams.inIndex;

    const localClone = localInTemplate.content.cloneNode(true);

    localClone.querySelector(".visible-number").textContent = localInIndex + 1;
    localClone.querySelector(".row-number").textContent = localInIndex + 1;

    localClone.querySelector(".page-name").textContent = localInData.LedgerName;
    localClone.querySelector(".page-views").textContent = localInData.LedgerParentName;
    localClone.querySelector(".page-value").textContent = localInData.LedgerType;

    return localClone;
};

const StartFunc = (inParams) => {

    const localInParams = Object.freeze(inParams);

    const localInData = localInParams.inData;
    const localDomContainer = localInParams.inDomContainer;
    const localDomTemplate = localInParams.inDomTemplate;
    const localDomLedgerBtn = localInParams.inDomLedgerBtn;

    localDomContainer.innerHTML = "";

    localInData.forEach((item, index) => {

        const localRow = createVisitRow({
            inTemplate: localDomTemplate,
            inData: item,
            inIndex: index
        });

        localDomContainer.appendChild(localRow);

    });

    const localTotalRows = localDomContainer.querySelectorAll("tr").length;

    localDomLedgerBtn.textContent = `${localTotalRows} / ${localTotalRows}`;
};

export { StartFunc };