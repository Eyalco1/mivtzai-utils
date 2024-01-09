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
    fromToTextGrp.spacing = 115;

    fromToTextGrp.add('statictext', undefined, 'From:');
    fromToTextGrp.add('statictext', undefined, 'To:');

    const editGrp = editResGrp.add('group');
    editGrp.alignChildren = ['fill', 'center'];
    editGrp.spacing = 10;

    const edit1Text = 'עזה\nישראל\nקיר בטון אינדקטיבי';
    // TODO: justify right
    const edittext1 = editGrp.add('edittext', undefined, edit1Text, {
        scrollable: true,
        multiline: true
    });

    const edit2Text = 'Gaza\nIsrael\nWall';
    // TODO: justify left
    const edittext2 = editGrp.add('edittext', undefined, edit2Text, {
        scrollable: true,
        multiline: true
    });

    edittext1.size = edittext2.size = [200, 240];

    const fontMainGrp = optionsResGrp.add('group');
    fontMainGrp.alignChildren = ['center', 'top'];
    fontMainGrp.spacing = 70;
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

    const fontName = 'FONTNAME';
    const fontNameStat = fontNameStatGrp.add('statictext', undefined, fontName);

    const fontFromBtn = fontMainGrp.add(
        'button',
        undefined,
        'Font From Selected Layer'
    );
    fontFromBtn.alignment = ['center', 'fill'];

    const divider1 = optionsResGrp.add('panel');
    divider1.alignment = 'fill';

    const deepSearchGrp = optionsResGrp.add('group');
    deepSearchGrp.alignChildren = ['left', 'center'];
    // @ts-ignore
    deepSearchGrp.margins = [0, 0, 0, 10];

    const deepSearchCheck = deepSearchGrp.add(
        'checkbox',
        undefined,
        'Deep Search'
    );

    const tranBtnGrp = optionsResGrp.add('group');
    // tranBtnGrp.alignChildren = ['left', 'center'];

    const tranBtn = optionsResGrp.add('button', undefined, 'Translate');

    const updateTranslateUI = (): void => {
        // alert('QA Update');
    };

    return {
        tranTab,
        tranTabGrp,
        /* QABtnsGrp, bigRowOne, bigRowTwo, bigRowThree,*/ updateTranslateUI
    };
};
