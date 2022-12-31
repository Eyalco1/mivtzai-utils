const createSideBtns = (
    qaTab: Tab,
    iconsTab: Tab,
    locTab: Tab,
    texTab: Tab
) => {
    const createTheBtns = (container: Group): [IconButton, IconButton] => {
        const quoteBtn = createQABtn(
            container,
            quoteBinary,
            'Quote',
            generateCaspiQuote
        );
        const helpBtn = createQABtn(
            container,
            helpBinary,
            'Help',
            createHelpWindow
        );

        return [quoteBtn, helpBtn];
    };

    const extraBtnsQA = qaTab.add('group');
    const extraBtnsIcons = iconsTab.add('group');
    const extraBtnsLocations = locTab.add('group');
    const extraBtnsTextures = texTab.add('group');

    extraBtnsQA.spacing =
        extraBtnsIcons.spacing =
        extraBtnsLocations.spacing =
        extraBtnsTextures.spacing =
            2;

    extraBtnsQA.alignment =
        extraBtnsQA.alignChildren =
        extraBtnsIcons.alignment =
        extraBtnsIcons.alignChildren =
        extraBtnsLocations.alignment =
        extraBtnsLocations.alignChildren =
        extraBtnsTextures.alignment =
        extraBtnsTextures.alignChildren =
            ['fill', 'fill'];

    const [quoteBtnQA, helpBtnQA] = createTheBtns(extraBtnsQA);
    const [quoteBtnIcons, helpBtnIcons] = createTheBtns(extraBtnsIcons);
    const [quoteBtnLocs, helpBtnLocs] = createTheBtns(extraBtnsLocations);
    const [quoteBtnTexs, helpBtnTexs] = createTheBtns(extraBtnsTextures);

    helpBtnQA.alignment =
        helpBtnIcons.alignment =
        helpBtnLocs.alignment =
        helpBtnTexs.alignment =
        quoteBtnQA.alignment =
        quoteBtnIcons.alignment =
        quoteBtnLocs.alignment =
        quoteBtnTexs.alignment =
            ['right', 'bottom'];
};

const init = (thisObj: typeof globalThis) => {
    let w =
        thisObj instanceof Panel
            ? thisObj
            : new Window('palette', '@@name', undefined, {
                  resizeable: true
              });
    if (w == null) w;
    w = w as Window;

    const tpanel = w.add('tabbedpanel');
    tpanel.alignment = tpanel.alignChildren = ['fill', 'fill'];

    const { qaTab, QABtnsGrp, bigRowOne, bigRowTwo } = createQAUI(tpanel);
    const { iconsTab, iconCircleGrp, colorChecksGrp } = createIconsUI(tpanel);
    const { locTab, dropdownsGrp } = createLocationsUI(tpanel);
    const { texTab, dropdownChecksGrp } = createTexturesUI(tpanel);

    createSideBtns(qaTab, iconsTab, locTab, texTab);

    w.layout.layout(true);
    w.layout.resize();
    w.onResizing = w.onResize = () => {
        (<Window>w).onResize = () => {
            // QA
            bigRowOne.orientation = bigRowTwo.orientation =
                (<Dimension>w.size).width > 400 ? 'row' : 'column';
            QABtnsGrp.orientation =
                (<Dimension>w.size).width > 800 ? 'row' : 'column';
            // Icons
            iconCircleGrp.orientation = colorChecksGrp.orientation =
                (<Dimension>w.size).width > 350 ? 'row' : 'column';
            // Locations
            dropdownsGrp.orientation =
                (<Dimension>w.size).width > 520 ? 'row' : 'column';
            // Textures
            dropdownChecksGrp.orientation =
                (<Dimension>w.size).width > 350 ? 'row' : 'column';
            //
            w.layout.layout(true);
            w.layout.resize();
        };
    };
    if (w != null && w instanceof Window) {
        w.center();
        w.show();
    }
};
