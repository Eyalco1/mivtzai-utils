// UI
const createQABtn = (
    container: Group,
    binary: string,
    helpTip: string,
    onClick: () => void
): IconButton => {
    const btn = container.add('iconbutton', undefined, binary, {
        style: 'toolbutton'
    });
    btn.helpTip = helpTip;
    btn.onClick = onClick;
    return btn;
};

const createQAUI = (tpanel: TabbedPanel): Tab => {
    const quickActionsTab = tpanel.add('tab', undefined, ['Quick Actions']);

    const QABtnsGrp = quickActionsTab.add('group');
    QABtnsGrp.orientation = 'column';
    QABtnsGrp.alignChildren = 'left';
    QABtnsGrp.alignment = 'left';
    QABtnsGrp.margins = 4;

    const rowOne = QABtnsGrp.add('group');
    createQABtn(rowOne, tvaiBinary, 'Tunnel Illustration', createTvaiStroke);
    createQABtn(rowOne, popBinary, 'Pop Animation', scaleWithOvershootQA);
    createQABtn(rowOne, logosBinary, 'Import IDF and Dotz Logos', importLogos);
    createQABtn(rowOne, illusBinary, 'Illustration Text', createIllusText);

    const rowTwo = QABtnsGrp.add('group');
    createQABtn(rowTwo, formatBinary, 'Format Layer Name', formatLayerName);
    createQABtn(rowTwo, textReverseBinary, 'Reverse Text', textReverse);
    createQABtn(rowTwo, bgBinary, 'Background', createBg);
    createQABtn(rowTwo, israelShapeBinary, 'Israel Map Shape', createIsraelMap);

    const rowThree = QABtnsGrp.add('group');
    createQABtn(rowThree, gazaShapeBinary, 'Gaza Map Shape', createGazaMap);
    createQABtn(rowThree, numsBinary, 'Counting Numbers', createCountingText);
    createQABtn(rowThree, frameBinary, 'Animated Frame', createAnimatedFrame);
    createQABtn(
        rowThree,
        ILMapPhotoBinary,
        'Israel Map Photo\n\nCLICK: Clean Map\nCTRL + CLICK: Map With Labels',
        importIsraelGoogleMaps
    );

    const rowFour = QABtnsGrp.add('group');
    createQABtn(
        rowFour,
        GAMapPhotoBinary,
        'Gaza Map Photo\n\nCLICK: Clean Map\nCTRL + CLICK: Map With Labels',
        importGazaGoogleMaps
    );
    createQABtn(
        rowFour,
        folderBinary,
        `Open Project Folder in ${
            getOS() === 'Win' ? 'Explorer' : 'Finder'
        }\n\nClick: Open Project Folder\nCTRL + CLICK: Choose New Project Folder`,
        openProjectInFinder
    );
    createQABtn(rowFour, tatzaBinary, 'Location Mark', createTatzaPath);

    return quickActionsTab;
};
