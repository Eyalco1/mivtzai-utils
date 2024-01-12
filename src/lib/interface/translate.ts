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
    fromToTextGrp.spacing = 178;

    fromToTextGrp.add('statictext', undefined, 'From:');
    fromToTextGrp.add('statictext', undefined, 'To:');

    const editGrp = editResGrp.add('group');
    editGrp.alignChildren = ['fill', 'center'];
    editGrp.spacing = 10;

    const fromEditText = editGrp.add(
        // @ts-ignore
        "EditText { properties:{multiline:true, scrollable:true}, text:'', justify:'right' }"
    ) as EditText;

    const toEditText = editGrp.add(
        // @ts-ignore
        "EditText { properties:{multiline:true, scrollable:true}, text:'', justify:'left' }"
    ) as EditText;

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
    fontNameStat.characters = 41;

    createQABtn(
        fontMainGrp,
        fontFromSelectedBinary,
        'Grab Font From Selected Layer',
        () => {
            const selFont = grabFontFromSelectedLayer();
            if (selFont) {
                fontNameStat.text = selFont;
            }
        }
    );

    // fontFromBtn.onClick = () => {
    //     const selFont = grabFontFromSelectedLayer();
    //     if (selFont) {
    //         fontNameStat.text = selFont;
    //     }
    // };

    const divider1 = optionsResGrp.add('panel');
    divider1.alignment = 'fill';

    const extraOptionsGrp = optionsResGrp.add('group');
    extraOptionsGrp.alignChildren = ['fill', 'center'];
    extraOptionsGrp.spacing = 196;
    // @ts-ignore
    extraOptionsGrp.margins = [0, 0, 0, 10];

    const deepSearchCheck = extraOptionsGrp.add(
        'checkbox',
        undefined,
        'Deep Search'
    );

    const extraBtnsGrp = extraOptionsGrp.add('group');

    // const readCompBtn = extraBtnsGrp.add('button', undefined, 'From Comp');
    createQABtn(
        extraBtnsGrp,
        readFromCompBinary,
        'Read Text From Composition',
        () => {
            const read = readAllTextInActiveComp(deepSearchCheck.value);
            fromEditText.text = read.join('\n');
        }
    );
    // const importJsonBtn = extraBtnsGrp.add('button', undefined, 'Import');
    createQABtn(extraBtnsGrp, importBinary, 'Import Translation File', () => {
        const { fromTextArr, toTextArr } = importJson();
        fromEditText.text = fromTextArr.join('\n');
        toEditText.text = toTextArr.join('\n');
    });
    // const exportJsonBtn = extraBtnsGrp.add('button', undefined, 'Export');
    createQABtn(extraBtnsGrp, exportBinary, 'Export Translation File', () => {
        const fromTextArr = fromEditText.text.split('\n');
        const toTextArr = toEditText.text.split('\n');

        exportJson(fromTextArr, toTextArr);
    });

    // readCompBtn.onClick = () => {
    //     const read = readAllTextInActiveComp(deepSearchCheck.value);
    //     fromEditText.text = read.join('\n');
    // };

    // exportJsonBtn.onClick = () => {
    //     const fromTextArr = fromEditText.text.split('\n');
    //     const toTextArr = toEditText.text.split('\n');

    //     exportJson(fromTextArr, toTextArr);
    // };

    // importJsonBtn.onClick = () => {
    //     const { fromTextArr, toTextArr } = importJson();
    //     fromEditText.text = fromTextArr.join('\n');
    //     toEditText.text = toTextArr.join('\n');
    // };

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
