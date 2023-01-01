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
    iconRandomCheck.value = parsePrefs().iconsLabelRandom;
    const updateFromIconCheck = (val: boolean) => {
        iconlabelsGrp.enabled = !val;
        iconTheLabel.fillBrush = iconTheLabel.graphics.newBrush(
            iconTheLabel.graphics.BrushType.SOLID_COLOR,
            val ? [0.2, 0.2, 0.2, 1] : labelColors[iconSelection.index],
            1
        );
    };
    updateFromIconCheck(iconRandomCheck.value);
    iconRandomCheck.onClick = () => {
        updateFromIconCheck(iconRandomCheck.value);
    };

    // == Locations ==
    const locLabelsSettingGrp = settingsTab.add('group');
    const locStaticGrp = locLabelsSettingGrp.add('group');
    const locStatic = locStaticGrp.add(
        'statictext',
        undefined,
        'Locations Label Color:'
    );

    const loclabelsGrp = locLabelsSettingGrp.add('group');
    const locLabelsDD = loclabelsGrp.add('dropdownlist', undefined, labelNames);
    locLabelsDD.selection = parsePrefs().locsLabelIndex;

    const locSelection = locLabelsDD.selection as unknown as ListItem;
    const locTheLabel = createColoredButton(
        loclabelsGrp,
        labelColors[locSelection.index],
        [20, 20]
    );

    locLabelsDD.onChange = () => {
        const selection = locLabelsDD.selection as unknown as ListItem;
        locTheLabel.fillBrush = locTheLabel.graphics.newBrush(
            locTheLabel.graphics.BrushType.SOLID_COLOR,
            labelColors[selection.index],
            1
        );
    };

    const locRandomCheck = locLabelsSettingGrp.add(
        'checkbox',
        undefined,
        'Random'
    );
    locRandomCheck.value = parsePrefs().locsLabelRandom;
    const updateFromLocCheck = (val: boolean) => {
        loclabelsGrp.enabled = !val;
        locTheLabel.fillBrush = locTheLabel.graphics.newBrush(
            locTheLabel.graphics.BrushType.SOLID_COLOR,
            val ? [0.2, 0.2, 0.2, 1] : labelColors[locSelection.index],
            1
        );
    };
    updateFromLocCheck(locRandomCheck.value);
    locRandomCheck.onClick = () => {
        updateFromLocCheck(locRandomCheck.value);
    };

    // == Textures ==
    const texlabelsSettingGrp = settingsTab.add('group');
    const texStaticGrp = texlabelsSettingGrp.add('group');
    const texStatic = texStaticGrp.add(
        'statictext',
        undefined,
        'Textures Label Color:'
    );
    // @ts-ignore
    texStaticGrp.margins.right = 5;

    const texlabelsGrp = texlabelsSettingGrp.add('group');
    const texLabelsDD = texlabelsGrp.add('dropdownlist', undefined, labelNames);
    texLabelsDD.selection = parsePrefs().texLabelIndex;
    const texLabelColors = getLabelsFromPrefs().map(hex => hexToRgb(hex));

    const texSelection = texLabelsDD.selection as unknown as ListItem;
    const texTheLabel = createColoredButton(
        texlabelsGrp,
        texLabelColors[texSelection.index],
        [20, 20]
    );

    texLabelsDD.onChange = () => {
        const selection = texLabelsDD.selection as unknown as ListItem;
        texTheLabel.fillBrush = texTheLabel.graphics.newBrush(
            texTheLabel.graphics.BrushType.SOLID_COLOR,
            labelColors[selection.index],
            1
        );
    };

    const texRandomCheck = texlabelsSettingGrp.add(
        'checkbox',
        undefined,
        'Random'
    );
    texRandomCheck.value = parsePrefs().texLabelRandom;
    const updateFromTexCheck = (val: boolean) => {
        texlabelsGrp.enabled = !val;
        texTheLabel.fillBrush = texTheLabel.graphics.newBrush(
            texTheLabel.graphics.BrushType.SOLID_COLOR,
            val ? [0.2, 0.2, 0.2, 1] : labelColors[texSelection.index],
            1
        );
    };
    updateFromTexCheck(texRandomCheck.value);
    texRandomCheck.onClick = () => {
        updateFromTexCheck(texRandomCheck.value);
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
            iconsLabelIndex: (<ListItem>iconLabelsDD.selection).index,
            iconsLabelRandom: iconRandomCheck.value,
            locsLabelIndex: (<ListItem>locLabelsDD.selection).index,
            locsLabelRandom: locRandomCheck.value,
            texLabelIndex: (<ListItem>texLabelsDD.selection).index,
            texLabelRandom: texRandomCheck.value
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
