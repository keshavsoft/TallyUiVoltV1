const StartFunc = async (inParams) => {
    const localInParams = Object.freeze(inParams);

    const localInUrl = localInParams.inUrl;

    const response = await fetch(localInUrl);

    if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
    };

    const localData = await response.json();

    return localData;
};

export { StartFunc };