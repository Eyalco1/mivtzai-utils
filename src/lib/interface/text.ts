// UI
const createTextUI = (
    tpanel: TabbedPanel
): { textTab: Tab; optionsGrp: Group; textDropdownsGrp: Group } => {
    const textTab = tpanel.add('tab', undefined, ['Text']);

    const mainTextGrp = textTab.add('group');
    mainTextGrp.alignChildren = ['fill', 'top'];
    mainTextGrp.alignment = ['fill', 'top'];

    const mainTextEdit = mainTextGrp.add('edittext', undefined, '', {
        multiline: true
    });
    mainTextEdit.preferredSize = [160, 60];
    mainTextEdit.alignment = ['fill', 'top'];

    const optionsGrp = textTab.add('group');
    // @ts-ignore
    optionsGrp.margins.top = optionsGrp.margins.bottom = 14;
    optionsGrp.alignment = 'center';

    const textDropdownsGrp = optionsGrp.add('group');
    textDropdownsGrp.alignChildren = ['left', 'center'];
    textDropdownsGrp.spacing = 10;
    textDropdownsGrp.margins = 0;

    const fontDDGrp = textDropdownsGrp.add('group');
    fontDDGrp.alignChildren = ['left', 'center'];
    fontDDGrp.spacing = 10;
    fontDDGrp.margins = 0;

    fontDDGrp.add('statictext', undefined, 'Font:');

    const fontDDList = ['Narkis', 'Almoni', '-', 'Trade Gothic', '-', 'Janna'];
    const fontDD = fontDDGrp.add('dropdownlist', undefined, fontDDList);
    fontDD.selection = 0;

    const animationDDGrp = textDropdownsGrp.add('group');
    animationDDGrp.alignChildren = ['left', 'center'];
    animationDDGrp.spacing = 10;
    animationDDGrp.margins = 0;

    animationDDGrp.add('statictext', undefined, 'Animation:');

    const animationDDList = ['Y Position', 'X Position', 'Opacity', 'Scale'];
    const animationDD = animationDDGrp.add(
        'dropdownlist',
        undefined,
        animationDDList
    );
    animationDD.selection = 0;

    const checksGrp = optionsGrp.add('group');
    checksGrp.alignChildren = ['left', 'center'];
    checksGrp.spacing = 10;
    checksGrp.margins = 0;

    const addTextEvoCheck = checksGrp.add('checkbox', undefined, 'Text Evo');
    const maskCheck = checksGrp.add('checkbox', undefined, 'Mask');

    const createBtn = textTab.add('button', undefined, 'Create Text');

    return { textTab, optionsGrp, textDropdownsGrp };
};
