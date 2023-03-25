// UI
const allQABtns: [IconButton, string, () => void][] = [];

const createQABtn = (
    container: Group,
    binary: string,
    helpTip: string,
    onClick: () => void
): IconButton => {
    const btn = container.add('iconbutton', undefined, binary, {
        style: 'toolbutton'
    });
    btn.helpTip = parsePrefs().showHelpTips ? helpTip : '';
    btn.onClick = onClick;

    allQABtns.push([btn, helpTip, onClick]);
    return btn;
};

const createQAUI = (
    tpanel: TabbedPanel
): {
    qaTab: Tab;
    QABtnsGrp: Group;
    bigRowOne: Group;
    bigRowTwo: Group;
    bigRowThree: Group;
    updateQAUI: () => void;
} => {
    const qaTab = tpanel.add('tab', undefined, ['Quick Actions']);
    qaTab.alignment = qaTab.alignChildren = ['fill', 'fill'];

    const QABtnsGrp = qaTab.add('group');
    QABtnsGrp.orientation = 'column';
    QABtnsGrp.alignChildren = 'left';
    QABtnsGrp.alignment = 'left';
    QABtnsGrp.margins = 4;

    const fsNameFromOs: 'Explorer' | 'Finder' =
        getOS() === 'Win' ? 'Explorer' : 'Finder';

    const metaKeyNameFromOs: 'CTRL' | 'CMD' =
        getOS() === 'Win' ? 'CTRL' : 'CMD';

    const bigRowOne = QABtnsGrp.add('group');

    const rowOne = bigRowOne.add('group');
    createQABtn(rowOne, bgBinary, 'Background', createBg);
    createQABtn(rowOne, logosBinary, 'Import IDF and Dotz Logos', importLogos);
    createQABtn(rowOne, illusBinary, 'Illustration Text', createIllusText);
    createQABtn(rowOne, popBinary, 'Pop Animation', scaleWithOvershootQA);

    const rowTwo = bigRowOne.add('group');
    createQABtn(rowTwo, israelShapeBinary, 'Israel Map Shape', createIsraelMap);
    createQABtn(rowTwo, gazaShapeBinary, 'Gaza Map Shape', createGazaMap);
    createQABtn(rowTwo, numsBinary, 'Counting Numbers', createCountingText);
    createQABtn(
        rowTwo,
        ILMapPhotoBinary,
        `Israel Map Photo\n\nCLICK: Clean Map\n${metaKeyNameFromOs} + CLICK: Map With Labels`,
        importIsraelGoogleMaps
    );

    const bigRowTwo = QABtnsGrp.add('group');

    const rowThree = bigRowTwo.add('group');
    createQABtn(
        rowThree,
        GAMapPhotoBinary,
        `Gaza Map Photo\n\nCLICK: Clean Map\n${metaKeyNameFromOs} + CLICK: Map With Labels`,
        importGazaGoogleMaps
    );
    createQABtn(rowThree, textReverseBinary, 'Reverse Text', textReverse);
    createQABtn(rowThree, formatBinary, 'Format Layer Name', formatLayerNameQA);
    createQABtn(rowThree, tvaiBinary, 'Tunnel Illustration', createTvaiStroke);

    const rowFour = bigRowTwo.add('group');
    createQABtn(rowFour, frameBinary, 'Animated Frame', createAnimatedFrame);
    createQABtn(
        rowFour,
        folderBinary,
        `Open Project Folder in ${fsNameFromOs}\n\nClick: Open Project Folder\n${metaKeyNameFromOs} + CLICK: Choose New Project Folder`,
        openProjectInFinder
    );
    createQABtn(rowFour, tatzaBinary, 'Location Mark', createTatzaPath);
    createQABtn(rowFour, recScaleXBinary, 'Rectangle X Scale', recScaleX);

    const bigRowThree = QABtnsGrp.add('group');

    const rowFive = bigRowThree.add('group');
    rowFive.alignment = 'left';
    createQABtn(
        rowFive,
        textPopBinary,
        'Text On Location',
        createTextOnLocation
    );
    createQABtn(rowFive, arrowBinary, 'Arrow', createArrow);
    createQABtn(rowFive, mikraBinary, 'Mikra', createMikra);
    createQABtn(rowFive, cameraNullBinary, 'Camera Null', createCameraNull);

    bigRowOne.orientation = bigRowTwo.orientation = 'column';

    const updateQAUI = (): void => {
        alert('QA Update');
    };

    return { qaTab, QABtnsGrp, bigRowOne, bigRowTwo, bigRowThree, updateQAUI };
};
