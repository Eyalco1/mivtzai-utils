// UI
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
