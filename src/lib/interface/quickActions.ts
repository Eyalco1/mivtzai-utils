// UI
const createQAUI = (tpanel: TabbedPanel): Tab => {
    const quickActionsTab = tpanel.add('tab', undefined, ['Quick Actions']);

    const QABtnsGrp = quickActionsTab.add('group');
    QABtnsGrp.orientation = 'column';
    QABtnsGrp.alignChildren = 'left';

    const QABtnsRowOne = QABtnsGrp.add('group');

    const tvaiBtn = QABtnsRowOne.add('iconbutton', undefined, tvaiBinary, {
        style: 'toolbutton'
    });
    tvaiBtn.helpTip = 'Tunnel Illustration';

    const scaleBtn = QABtnsRowOne.add('iconbutton', undefined, popBinary, {
        style: 'toolbutton'
    });
    scaleBtn.helpTip = 'Pop Animation';

    const logosBtn = QABtnsRowOne.add('iconbutton', undefined, logosBinary, {
        style: 'toolbutton'
    });
    logosBtn.helpTip = 'Import IDF and Dotz Logos';

    const illustrationBtn = QABtnsRowOne.add(
        'iconbutton',
        undefined,
        illustrationBinary,
        { style: 'toolbutton' }
    );
    illustrationBtn.helpTip = 'Illustration Text';

    const QABtnsRowTwo = QABtnsGrp.add('group');
    const formatLayerBtn = QABtnsRowTwo.add(
        'iconbutton',
        undefined,
        formatBinary,
        { style: 'toolbutton' }
    );
    formatLayerBtn.helpTip = 'Format Layer Name';

    const textReverseBtn = QABtnsRowTwo.add(
        'iconbutton',
        undefined,
        textReverseBinary,
        { style: 'toolbutton' }
    );
    textReverseBtn.helpTip = 'Reverse Text';

    const bgBtn = QABtnsRowTwo.add('iconbutton', undefined, bgBinary, {
        style: 'toolbutton'
    });
    bgBtn.helpTip = 'Create Background';

    const IsraelMapShapeBtn = QABtnsRowTwo.add(
        'iconbutton',
        undefined,
        israelShapeBinary,
        { style: 'toolbutton' }
    );
    IsraelMapShapeBtn.helpTip = 'Israel Map Shape';

    const QABtnsRowThree = QABtnsGrp.add('group');
    const GazaMapShapeBtn = QABtnsRowThree.add(
        'iconbutton',
        undefined,
        gazaShapeBinary,
        { style: 'toolbutton' }
    );
    GazaMapShapeBtn.helpTip = 'Gaza Map Shape';

    const numCountBtn = QABtnsRowThree.add(
        'iconbutton',
        undefined,
        countingNumbersBinary,
        { style: 'toolbutton' }
    );
    numCountBtn.helpTip = 'Counting Numbers';

    const frameBtn = QABtnsRowThree.add('iconbutton', undefined, frameBinary, {
        style: 'toolbutton'
    });
    frameBtn.helpTip = 'Animated Frame';

    const israelMapPic = QABtnsRowThree.add(
        'iconbutton',
        undefined,
        ILMapPhotoBinary,
        { style: 'toolbutton' }
    );
    israelMapPic.helpTip =
        'Israel Map Photo\n\nCLICK: Clean Map\nCTRL + CLICK: Map With Labels';

    const QABtnsRowFour = QABtnsGrp.add('group');

    const gazaMapPic = QABtnsRowFour.add(
        'iconbutton',
        undefined,
        GAMapPhotoBinary,
        { style: 'toolbutton' }
    );
    gazaMapPic.helpTip =
        'Gaza Map Photo\n\nCLICK: Clean Map\nCTRL + CLICK: Map With Labels';

    const openFinderBtn = QABtnsRowFour.add(
        'iconbutton',
        undefined,
        folderBinary,
        { style: 'toolbutton' }
    );
    openFinderBtn.helpTip = `Open Project Folder in ${
        getOS() === 'Win' ? 'Explorer' : 'Finder'
    }\n\nClick: Open Project Folder\nCTRL + CLICK: Choose New Project Folder`;

    tvaiBtn.onClick = createTvaiStroke;
    scaleBtn.onClick = scaleWithOvershoot;
    logosBtn.onClick = importLogos;
    illustrationBtn.onClick = createIllustrationText;
    formatLayerBtn.onClick = formatLayerName;
    textReverseBtn.onClick = textReverse;
    bgBtn.onClick = createBg;
    IsraelMapShapeBtn.onClick = createIsraelMap;
    GazaMapShapeBtn.onClick = createGazaMap;
    numCountBtn.onClick = createCountingText;
    frameBtn.onClick = createAnimatedFrame;
    openFinderBtn.onClick = openProjectInFinder;
    israelMapPic.onClick = importIsraelGoogleMaps;
    gazaMapPic.onClick = importGazaGoogleMaps;

    return quickActionsTab;
};
