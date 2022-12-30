const createColoredButton = (container, color, size) => {
    color = color || [1, 1, 0, 1];
    size = size || [50, 50];
    var grp = container.add('group');
    var button = grp.add('iconbutton', undefined, undefined, {
        style: 'toolbutton'
    });
    button.size = size;
    button.fillBrush = button.graphics.newBrush(
        button.graphics.BrushType.SOLID_COLOR,
        color,
        1
    );
    button.onDraw = function () {
        this.graphics.drawOSControl();
        this.graphics.rectPath(0, 0, this.size[0], this.size[1]);
        this.graphics.fillPath(this.fillBrush);
    };
    return button;
};

const createHelpWindow = () => {
    const helpWin = new Window('dialog', 'Help & Info');
    if (helpWin == null) {
        helpWin;
    }

    const tpanel = helpWin.add('tabbedpanel');

    // === About ===
    const aboutTab = tpanel.add('tab', undefined, ['About']);
    const abtStr = '‹ @@name - @@version - Created By Eyal Cohen ›';
    aboutTab.add('edittext', [0, 0, 380, 300], abtStr, {
        multiline: true,
        readonly: true,
        scrollable: true
    });

    // === Settings ===
    const labelNames = getLabelNamesFromPrefs();
    const labelColors = getLabelsFromPrefs().map(hex => hexToRgb(hex));

    const settingsTab = tpanel.add('tab', undefined, ['Settings']);
    settingsTab.orientation = 'column';
    settingsTab.alignChildren = ['left', 'top'];

    // == Icons ==
    const iconlabelsSettingGrp = settingsTab.add('group');
    const iconStaticGrp = iconlabelsSettingGrp.add('group');
    const iconsStatic = iconStaticGrp.add(
        'statictext',
        undefined,
        'Icons Label Color:'
    );
    // @ts-ignore
    iconStaticGrp.margins.right = 22;

    const iconlabelsGrp = iconlabelsSettingGrp.add('group');

    const iconLabelsDD = iconlabelsGrp.add(
        'dropdownlist',
        undefined,
        labelNames
    );
    iconLabelsDD.selection = parsePrefs().iconsLabelIndex;

    const iconSelection = iconLabelsDD.selection as unknown as ListItem;
    const iconTheLabel = createColoredButton(
        iconlabelsGrp,
        labelColors[iconSelection.index],
        [20, 20]
    );

    iconLabelsDD.onChange = () => {
        const selection = iconLabelsDD.selection as unknown as ListItem;
        iconTheLabel.fillBrush = iconTheLabel.graphics.newBrush(
            iconTheLabel.graphics.BrushType.SOLID_COLOR,
            labelColors[selection.index],
            1
        );
    };

    const iconRandomCheck = iconlabelsSettingGrp.add(
        'checkbox',
        undefined,
        'Random'
    );
    iconRandomCheck.onClick = () => {
        iconlabelsGrp.enabled = !iconRandomCheck.value;
        iconTheLabel.fillBrush = iconTheLabel.graphics.newBrush(
            iconTheLabel.graphics.BrushType.SOLID_COLOR,
            iconRandomCheck.value
                ? [0.2, 0.2, 0.2, 1]
                : labelColors[selection.index],
            1
        );
    };

    // == Locations ==
    const loclabelsSettingGrp = settingsTab.add('group');
    loclabelsSettingGrp.add('statictext', undefined, 'Locations Label Color:');

    const loclabelsGrp = loclabelsSettingGrp.add('group');
    const locLabelsDD = loclabelsGrp.add('dropdownlist', undefined, labelNames);
    locLabelsDD.selection = parsePrefs().locsLabelIndex;
    const locLabelColors = getLabelsFromPrefs().map(hex => hexToRgb(hex));

    const selection = locLabelsDD.selection as unknown as ListItem;
    const loctheLabel = createColoredButton(
        loclabelsGrp,
        locLabelColors[selection.index],
        [20, 20]
    );

    locLabelsDD.onChange = () => {
        const selection = locLabelsDD.selection as unknown as ListItem;
        loctheLabel.fillBrush = loctheLabel.graphics.newBrush(
            loctheLabel.graphics.BrushType.SOLID_COLOR,
            locLabelColors[selection.index],
            1
        );
    };

    const locRandomCheck = loclabelsSettingGrp.add(
        'checkbox',
        undefined,
        'Random'
    );
    locRandomCheck.onClick = () => {
        iconlabelsGrp.enabled = !locRandomCheck.value;
        loctheLabel.fillBrush = loctheLabel.graphics.newBrush(
            loctheLabel.graphics.BrushType.SOLID_COLOR,
            locRandomCheck.value
                ? [0.2, 0.2, 0.2, 1]
                : labelColors[selection.index],
            1
        );
    };

    // === Reviews ===
    const reviewsTab = tpanel.add('tab', undefined, ['Reviews']);
    reviewsTab.add('edittext', [0, 0, 380, 300], '', {
        multiline: true,
        readonly: true,
        scrollable: true
    });

    // === Ok Button ===
    const okBtn = helpWin.add('button', undefined, 'Ok', { name: 'Ok' });
    okBtn.onClick = () => {
        writePrefsToMemory({
            iconsLabelName: iconLabelsDD.selection.toString(),
            iconsLabelIndex: (<ListItem>iconLabelsDD.selection).index,
            locsLabelName: locLabelsDD.selection.toString(),
            locsLabelIndex: (<ListItem>locLabelsDD.selection).index
        });

        helpWin.close();
    };

    // === Initilaztion ===
    helpWin.layout.layout(true);

    if (helpWin != null && helpWin instanceof Window) {
        helpWin.center();
        helpWin.show();
    }
};
