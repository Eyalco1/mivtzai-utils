const createColoredButton = (
    container: Group,
    color: number[] = [1, 1, 0, 1],
    size: [number, number] = [50, 50]
): IconButton => {
    const grp = container.add('group');
    const btn = grp.add('iconbutton', undefined, undefined, {
        style: 'toolbutton'
    });
    btn.size = size;
    (<any>btn).fillBrush = (<any>btn).graphics.newBrush(
        (<any>btn).graphics.BrushType.SOLID_COLOR,
        color,
        1
    );
    btn.onDraw = function () {
        this.graphics.drawOSControl();
        this.graphics.rectPath(0, 0, this.size[0], this.size[1]);
        this.graphics.fillPath(this.fillBrush);
    };
    return btn;
};

const createAboutTab = (tpanel: TabbedPanel): Tab => {
    const aboutTab = tpanel.add('tab', undefined, ['About']);
    aboutTab.add('image', [0, 0, 300, 110], bannerBinary);
    const abtStr = '‹ @@name - version @@version - Created By Eyal Cohen ›';
    const aboutEditGrp = aboutTab.add('group');
    aboutEditGrp.add('edittext', [0, 0, 380, 200], abtStr, {
        multiline: true,
        readonly: true,
        scrollable: true
    });
    // @ts-ignore
    aboutEditGrp.margins.left = 10;

    return aboutTab;
};

const createIconColorRow = (
    container: Group,
    colorName: string,
    colorHex: string
): { colorNameEdit: EditText; colorHexEdit: EditText } => {
    const colorGrp = container.add('group');
    const colorNameStatic = colorGrp.add('statictext', undefined, 'Name:');
    const colorNameEdit = colorGrp.add('edittext', undefined, colorName);
    const colorHexStatic = colorGrp.add('statictext', undefined, 'Hex Color:');
    const colorHash = colorGrp.add('statictext', undefined, '#');
    const colorHexEdit = colorGrp.add('edittext', undefined, colorHex);

    colorHash.addEventListener('click', () => {
        openColorPickerForEditText(colorHexEdit);
    });

    return { colorNameEdit, colorHexEdit };
};

const createHelpWindow = () => {
    const helpWin = new Window('dialog', 'Help & Info');
    if (helpWin == null) {
        helpWin;
    }

    const tpanel = helpWin.add('tabbedpanel');

    // === About ===
    createAboutTab(tpanel);

    // === Settings ===
    const prefs = parsePrefs();
    const labelNames = getLabelNamesFromPrefs();
    const labelColors = getLabelsFromPrefs().map(hex => hexToRgb(hex));

    const settingsTab = tpanel.add('tab', undefined, ['Settings']);

    const labelSettingsGrp = settingsTab.add('group');

    settingsTab.orientation = labelSettingsGrp.orientation = 'column';
    settingsTab.alignChildren = labelSettingsGrp.alignChildren = [
        'left',
        'top'
    ];
    settingsTab.margins = 16;
    // @ts-ignore
    labelSettingsGrp.margins.bottom = 20;

    // == Settings - Icons ==
    const iconlabelsSettingGrp = labelSettingsGrp.add('group');
    const iconStaticGrp = iconlabelsSettingGrp.add('group');
    iconStaticGrp.add('statictext', undefined, 'Icons Label Color:');
    // @ts-ignore
    iconStaticGrp.margins.right = 22;

    const iconlabelsGrp = iconlabelsSettingGrp.add('group');

    const iconLabelsDD = iconlabelsGrp.add(
        'dropdownlist',
        undefined,
        labelNames
    );
    iconLabelsDD.selection = prefs.iconsLabelIndex;

    const iconSelection = iconLabelsDD.selection as unknown as ListItem;
    const iconTheLabel = createColoredButton(
        iconlabelsGrp,
        labelColors[iconSelection.index],
        [20, 20]
    );

    iconLabelsDD.onChange = () => {
        const selection = iconLabelsDD.selection as unknown as ListItem;
        (<any>iconTheLabel).fillBrush = (<any>iconTheLabel).graphics.newBrush(
            (<any>iconTheLabel).graphics.BrushType.SOLID_COLOR,
            labelColors[selection.index],
            1
        );
    };

    const iconRandomCheck = iconlabelsSettingGrp.add(
        'checkbox',
        undefined,
        'Random'
    );
    iconRandomCheck.value = prefs.iconsLabelRandom;
    const updateFromIconCheck = (val: boolean) => {
        iconlabelsGrp.enabled = !val;
        (<any>iconTheLabel).fillBrush = (<any>iconTheLabel).graphics.newBrush(
            (<any>iconTheLabel).graphics.BrushType.SOLID_COLOR,
            val ? [0.2, 0.2, 0.2, 1] : labelColors[iconSelection.index],
            1
        );
    };
    updateFromIconCheck(iconRandomCheck.value);
    iconRandomCheck.onClick = () => {
        updateFromIconCheck(iconRandomCheck.value);
    };

    // == Settings - Locations ==
    const locLabelsSettingGrp = labelSettingsGrp.add('group');
    const locStaticGrp = locLabelsSettingGrp.add('group');
    locStaticGrp.add('statictext', undefined, 'Locations Label Color:');

    const loclabelsGrp = locLabelsSettingGrp.add('group');
    const locLabelsDD = loclabelsGrp.add('dropdownlist', undefined, labelNames);
    locLabelsDD.selection = prefs.locsLabelIndex;

    const locSelection = locLabelsDD.selection as unknown as ListItem;
    const locTheLabel = createColoredButton(
        loclabelsGrp,
        labelColors[locSelection.index],
        [20, 20]
    );

    locLabelsDD.onChange = () => {
        const selection = locLabelsDD.selection as unknown as ListItem;
        (<any>locTheLabel).fillBrush = (<any>locTheLabel).graphics.newBrush(
            (<any>locTheLabel).graphics.BrushType.SOLID_COLOR,
            labelColors[selection.index],
            1
        );
    };

    const locRandomCheck = locLabelsSettingGrp.add(
        'checkbox',
        undefined,
        'Random'
    );
    locRandomCheck.value = prefs.locsLabelRandom;
    const updateFromLocCheck = (val: boolean) => {
        loclabelsGrp.enabled = !val;
        (<any>locTheLabel).fillBrush = (<any>locTheLabel).graphics.newBrush(
            (<any>locTheLabel).graphics.BrushType.SOLID_COLOR,
            val ? [0.2, 0.2, 0.2, 1] : labelColors[locSelection.index],
            1
        );
    };
    updateFromLocCheck(locRandomCheck.value);
    locRandomCheck.onClick = () => {
        updateFromLocCheck(locRandomCheck.value);
    };

    // == Settings - Textures ==
    const texlabelsSettingGrp = labelSettingsGrp.add('group');
    const texStaticGrp = texlabelsSettingGrp.add('group');
    texStaticGrp.add('statictext', undefined, 'Textures Label Color:');
    // @ts-ignore
    texStaticGrp.margins.right = 5;

    const texlabelsGrp = texlabelsSettingGrp.add('group');
    const texLabelsDD = texlabelsGrp.add('dropdownlist', undefined, labelNames);
    texLabelsDD.selection = prefs.texLabelIndex;
    const texLabelColors = getLabelsFromPrefs().map(hex => hexToRgb(hex));

    const texSelection = texLabelsDD.selection as unknown as ListItem;
    const texTheLabel = createColoredButton(
        texlabelsGrp,
        texLabelColors[texSelection.index],
        [20, 20]
    );

    texLabelsDD.onChange = () => {
        const selection = texLabelsDD.selection as unknown as ListItem;
        (<any>texTheLabel).fillBrush = (<any>texTheLabel).graphics.newBrush(
            (<any>texTheLabel).graphics.BrushType.SOLID_COLOR,
            labelColors[selection.index],
            1
        );
    };

    const texRandomCheck = texlabelsSettingGrp.add(
        'checkbox',
        undefined,
        'Random'
    );
    texRandomCheck.value = prefs.texLabelRandom;
    const updateFromTexCheck = (val: boolean) => {
        texlabelsGrp.enabled = !val;
        (<any>texTheLabel).fillBrush = (<any>texTheLabel).graphics.newBrush(
            (<any>texTheLabel).graphics.BrushType.SOLID_COLOR,
            val ? [0.2, 0.2, 0.2, 1] : labelColors[texSelection.index],
            1
        );
    };
    updateFromTexCheck(texRandomCheck.value);
    texRandomCheck.onClick = () => {
        updateFromTexCheck(texRandomCheck.value);
    };

    // === Settings - Help Tips ===
    const helpTipSettingGrp = settingsTab.add('group');
    const showHelpTipsCheck = helpTipSettingGrp.add(
        'checkbox',
        undefined,
        'Show Help Tips'
    );
    showHelpTipsCheck.value = prefs.showHelpTips;

    const updateQAHelpTips = (show: boolean): void => {
        allQABtns.forEach(iconData => {
            iconData[0].helpTip = show ? iconData[1] : '';
        });
    };

    // === Settings - Icon Colors ===
    const iconColorsSettingsGrp = settingsTab.add('group');
    iconColorsSettingsGrp.orientation = 'column';

    const { colorNameEdit: colorName1Edit, colorHexEdit: colorHex1Edit } =
        createIconColorRow(
            iconColorsSettingsGrp,
            prefs.iconColor1Name,
            prefs.iconColor1Hex
        );

    const { colorNameEdit: colorName2Edit, colorHexEdit: colorHex2Edit } =
        createIconColorRow(
            iconColorsSettingsGrp,
            prefs.iconColor2Name,
            prefs.iconColor2Hex
        );

    const { colorNameEdit: colorName3Edit, colorHexEdit: colorHex3Edit } =
        createIconColorRow(
            iconColorsSettingsGrp,
            prefs.iconColor3Name,
            prefs.iconColor3Hex
        );

    // === Ok Button ===
    const okBtn = helpWin.add('button', undefined, 'Ok', { name: 'Ok' });
    okBtn.onClick = () => {
        writePrefsToMemory({
            iconsLabelIndex: (<ListItem>iconLabelsDD.selection).index,
            iconsLabelRandom: iconRandomCheck.value,
            locsLabelIndex: (<ListItem>locLabelsDD.selection).index,
            locsLabelRandom: locRandomCheck.value,
            texLabelIndex: (<ListItem>texLabelsDD.selection).index,
            texLabelRandom: texRandomCheck.value,
            showHelpTips: showHelpTipsCheck.value,
            iconColor1Name: colorName1Edit.text,
            iconColor1Hex: colorHex1Edit.text,
            iconColor2Name: colorName2Edit.text,
            iconColor2Hex: colorHex2Edit.text,
            iconColor3Name: colorName3Edit.text,
            iconColor3Hex: colorHex3Edit.text
        });

        updateQAHelpTips(showHelpTipsCheck.value);

        helpWin.close();
    };

    // === Initilaztion ===
    helpWin.layout.layout(true);

    if (helpWin != null && helpWin instanceof Window) {
        helpWin.center();
        helpWin.show();
    }
};
