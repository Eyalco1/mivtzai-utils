// UI
const createIconsUI = (
    tpanel: TabbedPanel
): { iconsTab: Tab; iconCircleGrp: Group; colorChecksGrp: Group } => {
    const iconsTab = tpanel.add('tab', undefined, ['Icons']);

    const iconsGrp = iconsTab.add('group');
    iconsGrp.orientation = 'column';
    iconsGrp.alignChildren = 'left';
    iconsGrp.alignment = 'left';
    iconsGrp.margins = 4;
    // @ts-ignore
    iconsGrp.margins.left = 10;

    const iconCircleGrp = iconsGrp.add('group');

    const iconDDGrp = iconCircleGrp.add('group');
    iconDDGrp.add('statictext', undefined, 'Icon:');
    const iconsList: IconID[] = [
        'Boom',
        'Tunnel',
        'Terror Tunnel',
        'Target',
        'Sniper Target',
        'House Bombing',
        'Fire',
        'Money',
        'Earth',
        'Kaboom',
        'Medal',
        'Salute With M16',
        'Holding M16',
        'Shooting M16',
        'Running With M16',
        'Crouching With M16',
        'Rocket',
        'Rocket Launcher',
        'Mask',
        'Shoe',
        'Helmet',
        'Drone',
        'Tent',
        'Airplane',
        'Submarine',
        'Ambulance',
        'Tank',
        'Grenade'
    ];
    const iconDD = iconDDGrp.add('dropdownlist', undefined, iconsList);
    iconDD.preferredSize[0] = 100;
    iconDD.selection = 0;

    const { iconColor1Name, iconColor2Name, iconColor3Name } = parsePrefs();

    const circleColorGrp = iconCircleGrp.add('group');
    circleColorGrp.add('statictext', undefined, 'Circle Color:');

    const circleColorDD = circleColorGrp.add('dropdownlist', undefined, [
        iconColor1Name,
        iconColor2Name,
        iconColor3Name
    ]);

    const colorChecksGrp = iconsGrp.add('group');

    const iconColorGrp = colorChecksGrp.add('group');
    iconColorGrp.add('statictext', undefined, 'Icon Color:');
    const iconColorDD = iconColorGrp.add('dropdownlist', undefined, [
        iconColor2Name,
        iconColor1Name,
        iconColor3Name
    ]);
    iconColorDD.preferredSize[0] = 71;

    circleColorDD.selection = iconColorDD.selection = 0;

    const iconsChecksGrp = colorChecksGrp.add('group');
    iconsChecksGrp.spacing = 20;
    const circleCheck = iconsChecksGrp.add('checkbox', undefined, 'Circle');
    const scaleCheck = iconsChecksGrp.add('checkbox', undefined, 'Scale');

    const iconCreateBtn = iconsGrp.add('button', undefined, 'Create Icon');
    iconCreateBtn.preferredSize[0] = 100;

    circleColorGrp.enabled = false;
    circleCheck.onClick = () => {
        circleColorGrp.enabled = circleCheck.value;
    };

    iconCreateBtn.onClick = () => {
        const id = iconDD.selection.toString() as IconID;
        createIconFromId(
            id,
            circleColorDD.selection.toString(),
            iconColorDD.selection.toString(),
            circleCheck.value,
            scaleCheck.value
        );
    };

    return { iconsTab, iconCircleGrp, colorChecksGrp };
};
