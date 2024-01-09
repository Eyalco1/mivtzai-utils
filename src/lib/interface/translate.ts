// UI
const createTranslateUI = (
    tpanel: TabbedPanel
): {
    tranTab: Tab;
    updateTranslateUI: () => void;
} => {
    const tranTab = tpanel.add('tab', undefined, ['Translate']);
    tranTab.alignment = tranTab.alignChildren = ['fill', 'fill'];

    const updateTranslateUI = (): void => {
        // alert('QA Update');
    };

    return {
        tranTab,
        /* QABtnsGrp, bigRowOne, bigRowTwo, bigRowThree,*/ updateTranslateUI
    };
};
