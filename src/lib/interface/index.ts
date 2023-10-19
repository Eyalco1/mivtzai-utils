const createSideBtns = (
    qaTab: Tab,
    textTab: Tab,
    iconsTab: Tab,
    locTab: Tab,
    texTab: Tab,
    updateUIFn: () => void
) => {
    const createTheBtns = (
        container: Group,
        updateUIFn: () => void
    ): { helpBtn: IconButton } => {
        // const updateUIBtn = createQABtn(
        //     container,
        //     updateUIBinary,
        //     'Update UI',
        //     updateUIFn
        // );

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

    extraBtnsQA.spacing =
        extraBtnsText.spacing =
        extraBtnsIcons.spacing =
        extraBtnsLocations.spacing =
        extraBtnsTextures.spacing =
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

    helpBtnQA.alignment =
        helpBtnText.alignment =
        helpBtnIcons.alignment =
        helpBtnLocs.alignment =
        helpBtnTexs.alignment =
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
    const {
        textTab,

        updateTextUI
    } = createTextUI(tpanel);
    const { iconsTab, iconCircleGrp, colorChecksGrp, updateIconsUI } =
        createIconsUI(tpanel);
    const { locTab, dropdownsGrp, locLangDDGrp, mitugAnimDDGrp, updateLocUI } =
        createLocationsUI(tpanel);
    const { texTab, dropdownChecksGrp, updateTexTab } =
        createTexturesUI(tpanel);

    createSideBtns(qaTab, textTab, iconsTab, locTab, texTab, () => {
        updateQAUI();
        updateTextUI();
        updateIconsUI();
        updateLocUI();
        updateTexTab();
    });

    // const checkTimeStampDiffBy = (
    //     lastTimeStamp: object,
    //     curTimeStamp: object,
    //     diffInSeconds: number
    // ): boolean => {
    //     const [lWeekDay, lMonth, lDay, lYear, lHour] = lastTimeStamp
    //         .toString()
    //         .split(' ');

    //     const [curWeekDay, curMonth, curDay, curYear, curHour] = curTimeStamp
    //         .toString()
    //         .split(' ');

    //     if (
    //         curWeekDay !== lWeekDay ||
    //         curMonth !== lMonth ||
    //         curDay !== lDay ||
    //         curYear !== lYear
    //     ) {
    //         return true;
    //     }

    //     const [lTheHour, lTheMinutes, lTheSeconds] = lHour.split(':');
    //     const [curTheHour, curTheMinutes, curTheSeconds] = curHour.split(':');
    //     if (lTheHour !== curTheHour || lTheMinutes !== curTheMinutes) {
    //         return true;
    //     }

    //     const diff = +curTheSeconds - +lTheSeconds;

    //     return diff > diffInSeconds;
    // };

    // const handleKeyShortcuts = (keyName: string) => {
    //     if (keyName === 'B') createBg();
    //     if (keyName === 'L') importLogos;
    //     if (keyName === 'I') createIllusText();
    //     if (keyName === 'S') scaleWithOvershootQA();
    //     if (keyName === 'M') createIsraelMap();
    //     if (keyName === 'G') createGazaMap();
    //     if (keyName === 'N') createCountingText();
    //     if (keyName === 'P') importIsraelGoogleMaps();
    //     if (keyName === 'D') importGazaGoogleMaps();
    // };

    // let lastTimeStamp: object | null = null;
    // w.addEventListener('mouseover', evt => {
    //     const keyName = ScriptUI.environment.keyboardState.keyName;

    //     if (lastTimeStamp) {
    //         const enoughTimePassed = checkTimeStampDiffBy(
    //             lastTimeStamp,
    //             evt.timeStamp,
    //             1
    //         );

    //         if (!enoughTimePassed) {
    //             lastTimeStamp = evt.timeStamp;
    //         } else {
    //             handleKeyShortcuts(keyName);
    //             lastTimeStamp = evt.timeStamp;
    //         }
    //     } else {
    //         handleKeyShortcuts(keyName);
    //         lastTimeStamp = evt.timeStamp;
    //     }
    // });

    // w.addEventListener('focus', () => {
    //     w.addEventListener('keydown', evt => {
    //         alert('KeyDown!!!');
    //         alert(evt.keyName);
    //     });
    // });

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
                (<Dimension>w.size).width > 940 ? 'row' : 'column';
            // Text
            // optionsGrp.orientation =
            //     (<Dimension>w.size).width > 450 ? 'row' : 'column';
            // textDropdownsGrp.orientation =
            //     (<Dimension>w.size).width > 340 ? 'row' : 'column';
            // mainTextEdit.size = [(<Dimension>w.size).width - 50, 60];
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
