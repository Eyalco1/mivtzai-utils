// UI
const createTranslateUI = (
    tpanel: TabbedPanel
): {
    tranTab: Tab;
    tranTabGrp: Group;
    updateTranslateUI: () => void;
} => {
    const tranTab = tpanel.add('tab', undefined, ['Translate']);

    const tranTabGrp = tranTab.add('group');
    tranTabGrp.orientation = 'column';
    tranTabGrp.alignChildren = 'left';
    tranTabGrp.alignment = 'left';
    tranTabGrp.margins = 4;
    // @ts-ignore
    tranTabGrp.margins.left = 10;

    // const editPanel = mainGrp.add('panel', undefined, '');
    // editPanel.alignment = editPanel.alignChildren = ['fill', 'top'];
    // editPanel.orientation = 'column';
    // editPanel.spacing = 10;
    // editPanel.margins = 10;

    const editResGrp = tranTabGrp.add('group');
    const optionsResGrp = tranTabGrp.add('group');
    editResGrp.orientation = optionsResGrp.orientation = 'column';
    editResGrp.alignChildren =
        editResGrp.alignment =
        optionsResGrp.alignChildren =
        optionsResGrp.alignment =
            'left';

    const fromToTextGrp = editResGrp.add('group');
    fromToTextGrp.alignChildren = ['left', 'center'];
    fromToTextGrp.spacing = 174;

    fromToTextGrp.add('statictext', undefined, 'From:');
    fromToTextGrp.add('statictext', undefined, 'To:');

    const editGrp = editResGrp.add('group');
    editGrp.alignChildren = ['fill', 'center'];
    editGrp.spacing = 10;

    // TODO: justify right
    const fromEditText = editGrp.add('edittext', undefined, '', {
        scrollable: true,
        multiline: true
    });

    // TODO: justify left
    const toEditText = editGrp.add('edittext', undefined, '', {
        scrollable: true,
        multiline: true
    });

    fromEditText.size = toEditText.size = [200, 240];

    const fontMainGrp = optionsResGrp.add('group');
    fontMainGrp.alignChildren = ['center', 'top'];
    fontMainGrp.spacing = 0;
    // @ts-ignore
    fontMainGrp.margins = [0, 10, 0, 10];
    fontMainGrp.alignment = ['fill', 'top'];

    const fontTextGrp = fontMainGrp.add('group');
    fontTextGrp.orientation = 'column';
    fontTextGrp.alignChildren = ['left', 'center'];
    fontTextGrp.spacing = 10;
    fontTextGrp.alignment = ['center', 'fill'];

    const fontStatGrp = fontTextGrp.add('group');
    fontStatGrp.alignChildren = ['left', 'center'];
    fontStatGrp.spacing = 0;

    fontStatGrp.add('statictext', undefined, 'Font:');

    const fontNameStatGrp = fontTextGrp.add('group');
    fontNameStatGrp.alignChildren = ['left', 'center'];
    fontNameStatGrp.spacing = 0;

    const fontNameStat = fontNameStatGrp.add('statictext', undefined, '');
    fontNameStat.characters = 28;

    const fontFromBtn = fontMainGrp.add(
        'button',
        undefined,
        'Font From Selected Layer'
    );
    fontFromBtn.alignment = ['center', 'fill'];

    fontFromBtn.onClick = () => {
        const selFont = grabFontFromSelectedLayer();
        if (selFont) {
            fontNameStat.text = selFont;
        }
    };

    const divider1 = optionsResGrp.add('panel');
    divider1.alignment = 'fill';

    const extraOptionsGrp = optionsResGrp.add('group');
    extraOptionsGrp.alignChildren = ['fill', 'center'];
    extraOptionsGrp.spacing = 158;
    // @ts-ignore
    extraOptionsGrp.margins = [0, 0, 0, 10];

    const deepSearchCheck = extraOptionsGrp.add(
        'checkbox',
        undefined,
        'Deep Search'
    );

    const importExportGrp = extraOptionsGrp.add('group');

    const importJsonBtn = importExportGrp.add('button', undefined, 'Import');
    const exportJsonBtn = importExportGrp.add('button', undefined, 'Export');

    exportJsonBtn.onClick = () => {
        const fromTextArr = fromEditText.text.split('\n');
        const toTextArr = toEditText.text.split('\n');

        exportJson(fromTextArr, toTextArr);
    };

    const tranBtn = optionsResGrp.add('button', undefined, 'Translate');

    tranBtn.onClick = () => {
        const fromTextArr = fromEditText.text.split('\n');
        const toTextArr = toEditText.text.split('\n');

        // alert(fromTextArr);
        // alert(toTextArr);
        // alert(fontNameStat.text);
        // alert(deepSearchCheck.value);

        app.beginUndoGroup('@@name: Translate');

        findAndReplaceText(
            fromTextArr,
            toTextArr,
            fontNameStat.text,
            deepSearchCheck.value
        );
    };

    const updateTranslateUI = (): void => {
        // alert('QA Update');
    };

    return {
        tranTab,
        tranTabGrp,
        /* QABtnsGrp, bigRowOne, bigRowTwo, bigRowThree,*/ updateTranslateUI
    };
};
