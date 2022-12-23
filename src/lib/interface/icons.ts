// UI
const createIconsUI = (tpanel: TabbedPanel): Tab => {
    const iconsTab = tpanel.add('tab', undefined, ['Icons']);

    const iconsGrp = iconsTab.add('group');
    iconsGrp.orientation = 'column';
    iconsGrp.alignChildren = 'left';

    const iconDDGrp = iconsGrp.add('group');
    iconDDGrp.add('statictext', undefined, 'Icon:');
    const iconsList: IconID[] = [
        'Boom',
        'Tunnel',
        'Terror Tunnel',
        'Target',
        'Sniper Target',
        'House Bombing',
        'Fire'
    ];
    const iconDD = iconDDGrp.add('dropdownlist', undefined, iconsList);
    iconDD.preferredSize[0] = 100;
    iconDD.selection = 0;

    const IconsBtnsGrp = iconsGrp.add('group');
    IconsBtnsGrp.alignChildren = 'left';

    const iconsChecksGrp = iconsGrp.add('group');
    const circleCheck = iconsChecksGrp.add('checkbox', undefined, 'Circle');
    const scaleCheck = iconsChecksGrp.add('checkbox', undefined, 'Scale');

    const circleColorGrp = iconsGrp.add('group');
    circleColorGrp.add('statictext', undefined, 'Circle Color:');
    const circleColorDD = circleColorGrp.add('dropdownlist', undefined, [
        'White',
        'Black',
        'Red'
    ]);
    const iconColorGrp = iconsGrp.add('group');
    iconColorGrp.add('statictext', undefined, 'Icon Color:');
    const iconColorDD = iconColorGrp.add('dropdownlist', undefined, [
        'Black',
        'White',
        'Red'
    ]);

    circleColorDD.selection = iconColorDD.selection = 0;

    const iconCreateBtn = iconsGrp.add('button', undefined, 'Create Icon');
    iconCreateBtn.preferredSize[0] = 100;

    iconCreateBtn.onClick = () => {
        const id = iconDD.selection.toString() as IconID;
        createIconFromId(
            id,
            circleColorDD.selection.toString() as ColorDropdown,
            iconColorDD.selection.toString() as ColorDropdown,
            circleCheck.value,
            scaleCheck.value
        );
    };

    return iconsTab;
};
