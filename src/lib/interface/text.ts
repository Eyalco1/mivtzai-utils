// UI - V1.0.0
/*
const createTextUI = (
    tpanel: TabbedPanel
): {
    textTab: Tab;
    mainTextEdit: EditText;
    optionsGrp: Group;
    textDropdownsGrp: Group;
    updateTextUI: () => void;
} => {
    const textTab = tpanel.add('tab', undefined, ['Text']);

    const textTabGrp = textTab.add('group');
    textTabGrp.alignChildren = 'left';
    textTabGrp.alignment = 'left';
    textTabGrp.orientation = 'column';
    textTabGrp.margins = 4;

    const mainTextGrp = textTabGrp.add('group');
    mainTextGrp.alignChildren = ['fill', 'top'];
    mainTextGrp.alignment = ['fill', 'top'];

    const mainTextEdit = mainTextGrp.add('edittext', undefined, '', {
        multiline: true
    });
    mainTextEdit.size = [160, 60];
    mainTextEdit.alignment = ['fill', 'top'];

    const optionsGrp = textTabGrp.add('group');
    // @ts-ignore
    optionsGrp.margins.top = 8;
    optionsGrp.alignment = 'left';

    const textDropdownsGrp = optionsGrp.add('group');
    textDropdownsGrp.alignChildren = ['left', 'center'];
    textDropdownsGrp.spacing = 10;
    textDropdownsGrp.margins = 0;

    const fontDDGrp = textDropdownsGrp.add('group');
    fontDDGrp.alignChildren = ['left', 'center'];
    fontDDGrp.spacing = 10;
    fontDDGrp.margins = 0;

    fontDDGrp.add('statictext', undefined, 'Font:');

    const fontDDList: CaspionFont[] = [
        'Narkis',
        'Almoni',
        'Trade Gothic',
        'Droid',
        'Janna'
    ];
    const fontDD = fontDDGrp.add('dropdownlist', undefined, fontDDList);
    fontDD.selection = 0;

    const animationDDGrp = textDropdownsGrp.add('group');
    animationDDGrp.alignChildren = ['left', 'center'];
    animationDDGrp.spacing = 10;
    animationDDGrp.margins = 0;

    animationDDGrp.add('statictext', undefined, 'Animation:');

    const animationDDList: TextAnimation[] = [
        'Y Position',
        'X Position',
        'Scale',
        'Opacity'
    ];
    const animationDD = animationDDGrp.add(
        'dropdownlist',
        undefined,
        animationDDList
    );

    animationDD.selection = 0;

    const checksGrp = optionsGrp.add('group');
    checksGrp.alignChildren = 'left';
    checksGrp.alignment = 'left';
    checksGrp.spacing = 10;
    checksGrp.margins = 0;

    const addTextEvoCheck = checksGrp.add('checkbox', undefined, 'Text Evo');
    const maskCheck = checksGrp.add('checkbox', undefined, 'Mask');

    const createBtn = textTabGrp.add('button', undefined, 'Create Text');
    createBtn.alignment = 'left';

    animationDDGrp.enabled = addTextEvoCheck.value;
    addTextEvoCheck.onClick = () => {
        animationDDGrp.enabled = addTextEvoCheck.value;
    };

    createBtn.onClick = () => {
        const text = mainTextEdit.text;
        const font: CaspionFont = fontDD.selection.toString() as CaspionFont;
        const animation: TextAnimation =
            animationDD.selection.toString() as TextAnimation;
        const addTextEvo = addTextEvoCheck.value;
        const addMask = maskCheck.value;

        createText(text, font, animation, addTextEvo, addMask);
    };

    const updateTextUI = (): void => {
        // alert('Update Text UI');
    };

    return {
        textTab,
        optionsGrp,
        textDropdownsGrp,
        mainTextEdit,
        updateTextUI
    };
};
*/

// UI - V2.0.0
const createTextUI = (
    tpanel: TabbedPanel
): { textTab: Tab; updateTextUI: () => void } => {
    const textTab = tpanel.add('tab', undefined, ['Text']);

    const textTabGrp = textTab.add('group');
    textTabGrp.orientation = 'column';
    textTabGrp.alignChildren = 'left';
    textTabGrp.alignment = 'left';
    textTabGrp.margins = 4;
    // @ts-ignore
    textTabGrp.margins.left = 10;

    const animationGrp = textTabGrp.add('group');
    animationGrp.orientation = 'column';
    animationGrp.alignChildren = ['left', 'center'];
    animationGrp.spacing = 10;
    animationGrp.margins = 0;

    animationGrp.add('statictext', undefined, 'Animation:');

    const animationCheckGrp = animationGrp.add('group');
    animationCheckGrp.alignChildren = ['left', 'center'];
    animationCheckGrp.spacing = 10;
    animationCheckGrp.margins = 0;

    const yPosCheck = animationCheckGrp.add(
        'checkbox',
        undefined,
        'Y Position'
    );
    const xPosCheck = animationCheckGrp.add(
        'checkbox',
        undefined,
        'X Position'
    );
    const scaleCheck = animationCheckGrp.add('checkbox', undefined, 'Scale');
    const opacityCheck = animationCheckGrp.add(
        'checkbox',
        undefined,
        'Opacity'
    );

    const basedOnGrp = textTabGrp.add('group');
    basedOnGrp.orientation = 'column';
    basedOnGrp.alignChildren = ['left', 'center'];
    basedOnGrp.spacing = 10;
    basedOnGrp.margins = 0;

    basedOnGrp.add('statictext', undefined, 'Based On:');

    const basedOnRadioGrp = basedOnGrp.add('group');
    basedOnRadioGrp.alignChildren = ['left', 'center'];
    basedOnRadioGrp.spacing = 10;
    basedOnRadioGrp.margins = 0;

    const charsRadioBtn = basedOnRadioGrp.add(
        'radiobutton',
        undefined,
        'Characters'
    );
    charsRadioBtn.value = true;

    const wordsRadioBtn = basedOnRadioGrp.add(
        'radiobutton',
        undefined,
        'Words'
    );

    const linesRadioBtn = basedOnRadioGrp.add(
        'radiobutton',
        undefined,
        'Lines'
    );

    const applyMaskGrp = textTabGrp.add('group');
    // @ts-ignore
    applyMaskGrp.margins.top = 4;
    const applyBtn = applyMaskGrp.add('button', undefined, 'Apply');
    const maskCheck = applyMaskGrp.add('checkbox', undefined, 'Add Mask');

    let grouping: 'Characters' | 'Words' | 'Lines';

    applyBtn.onClick = () => {
        if (
            !yPosCheck.value &&
            !xPosCheck.value &&
            !scaleCheck.value &&
            !opacityCheck.value
        ) {
            alert('Please Select At Least One Animation Property');
            return;
        }

        if (charsRadioBtn.value) {
            grouping = 'Characters';
        } else if (wordsRadioBtn.value) {
            grouping = 'Words';
        } else if (linesRadioBtn.value) {
            grouping = 'Lines';
        }

        createText(
            yPosCheck.value,
            xPosCheck.value,
            scaleCheck.value,
            opacityCheck.value,
            grouping,
            maskCheck.value
        );
    };

    const updateTextUI = (): void => {
        // alert('Update Text UI');
    };

    return { textTab, updateTextUI };
};
