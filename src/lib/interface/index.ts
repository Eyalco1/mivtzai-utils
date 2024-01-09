const createSideBtns = (
    qaTab: Tab,
    textTab: Tab,
    iconsTab: Tab,
    locTab: Tab,
    texTab: Tab,
    tranTab: Tab,
    updateUIFn: () => void
) => {
    const createTheBtns = (
        container: Group,
        updateUIFn: () => void
    ): { helpBtn: IconButton } => {
        const helpBtn = createQABtn(container, helpBinary, 'Help', () => {
            createHelpWindow(updateUIFn);
        });

        return { helpBtn };
    };

    const extraBtnsQA = qaTab.add('group');
    const extraBtnsText = textTab.add('group');
    const extraBtnsIcons = iconsTab.add('group');
    const extraBtnsLocations = locTab.add('group');
    const extraBtnsTextures = texTab.add('group');
    const extraBtnsTranslate = tranTab.add('group');

    extraBtnsQA.spacing =
        extraBtnsText.spacing =
        extraBtnsIcons.spacing =
        extraBtnsLocations.spacing =
        extraBtnsTextures.spacing =
        extraBtnsTranslate.spacing =
            2;

    extraBtnsQA.alignment =
        extraBtnsQA.alignChildren =
        extraBtnsText.alignment =
        extraBtnsText.alignChildren =
        extraBtnsIcons.alignment =
        extraBtnsIcons.alignChildren =
        extraBtnsLocations.alignment =
        extraBtnsLocations.alignChildren =
        extraBtnsTextures.alignment =
        extraBtnsTextures.alignChildren =
        extraBtnsTranslate.alignment =
        extraBtnsTranslate.alignChildren =
            ['fill', 'fill'];

    const { helpBtn: helpBtnQA } = createTheBtns(extraBtnsQA, updateUIFn);
    const { helpBtn: helpBtnText } = createTheBtns(extraBtnsText, updateUIFn);
    const { helpBtn: helpBtnIcons } = createTheBtns(extraBtnsIcons, updateUIFn);
    const { helpBtn: helpBtnLocs } = createTheBtns(
        extraBtnsLocations,
        updateUIFn
    );
    const { helpBtn: helpBtnTexs } = createTheBtns(
        extraBtnsTextures,
        updateUIFn
    );
    const { helpBtn: helpBtnTran } = createTheBtns(
        extraBtnsTranslate,
        updateUIFn
    );

    helpBtnQA.alignment =
        helpBtnText.alignment =
        helpBtnIcons.alignment =
        helpBtnLocs.alignment =
        helpBtnTexs.alignment =
        helpBtnTran.alignment =
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

    const { qaTab, QABtnsGrp, bigRowOne, bigRowTwo, bigRowThree, updateQAUI } =
        createQAUI(tpanel);
    const { textTab, updateTextUI } = createTextUI(tpanel);
    const { iconsTab, iconCircleGrp, colorChecksGrp, updateIconsUI } =
        createIconsUI(tpanel);
    const { locTab, dropdownsGrp, locLangDDGrp, mitugAnimDDGrp, updateLocUI } =
        createLocationsUI(tpanel);
    const { texTab, dropdownChecksGrp, updateTexTab } =
        createTexturesUI(tpanel);
    const { tranTab, tranTabGrp, updateTranslateUI } =
        createTranslateUI(tpanel);

    createSideBtns(qaTab, textTab, iconsTab, locTab, texTab, tranTab, () => {
        updateQAUI();
        updateTextUI();
        updateIconsUI();
        updateLocUI();
        updateTexTab();
        updateTranslateUI();
    });

    w.layout.layout(true);
    w.layout.resize();
    w.onResizing = w.onResize = () => {
        (<Window>w).onResize = () => {
            // QA
            bigRowOne.orientation =
                bigRowTwo.orientation =
                bigRowThree.orientation =
                    (<Dimension>w.size).width > 400 ? 'row' : 'column';
            QABtnsGrp.orientation =
                (<Dimension>w.size).width > 980 ? 'row' : 'column';
            // Icons
            iconCircleGrp.orientation = colorChecksGrp.orientation =
                (<Dimension>w.size).width > 350 ? 'row' : 'column';
            // Locations
            dropdownsGrp.orientation =
                (<Dimension>w.size).width > 380 ? 'row' : 'column';
            locLangDDGrp.orientation = mitugAnimDDGrp.orientation =
                (<Dimension>w.size).width > 710 ? 'row' : 'column';
            // Textures
            dropdownChecksGrp.orientation =
                (<Dimension>w.size).width > 350 ? 'row' : 'column';
            // Translate
            tranTabGrp.orientation =
                (<Dimension>w.size).width > 740 ? 'row' : 'column';
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
