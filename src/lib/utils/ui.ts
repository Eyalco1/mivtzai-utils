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
    aboutEditGrp.add('edittext', [0, 0, 380, 230], abtStr, {
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
): {
    colorNameEdit: EditText;
    colorHexStat: StaticText;
    coloredBtn: IconButton;
} => {
    const colorGrp = container.add('group');
    colorGrp.add('statictext', undefined, 'Name:');
    const colorNameEdit = colorGrp.add('edittext', undefined, colorName);
    colorNameEdit.preferredSize[0] = 80;
    colorGrp.add('statictext', undefined, 'Hex Color:');

    const theColor: [number, number, number] = hexToRgb(colorHex);
    const coloredBtn = createColoredButton(colorGrp, theColor, [20, 20]);
    coloredBtn.helpTip = 'Click To Edit';
    const colorHexStat = colorGrp.add('statictext', undefined, colorHex);
    colorHexStat.characters = 10;
    colorHexStat.helpTip = 'Click The Color Swatch To Edit';

    coloredBtn.onClick = () => {
        const colorPicked = openColorPicker(hexToRgb(colorHex));
        (<any>coloredBtn).fillBrush = (<any>coloredBtn).graphics.newBrush(
            (<any>coloredBtn).graphics.BrushType.SOLID_COLOR,
            colorPicked,
            1
        );

        colorHexStat.text =
            '#' +
            rgbToHex(
                colorPicked[0] * 255,
                colorPicked[1] * 255,
                colorPicked[2] * 255
            );
    };

    return { colorNameEdit, colorHexStat, coloredBtn };
};

const createHelpWindow = (updateUiFn: () => void) => {
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
    const SETTINGS_SPACING = 20;

    const settingsTab = tpanel.add('tab', undefined, ['Settings']);
    settingsTab.margins = 10;

    const labelSettingsGrp = settingsTab.add('group');
    // @ts-ignore
    labelSettingsGrp.margins.bottom = SETTINGS_SPACING;

    const titleAndRestartGrp = labelSettingsGrp.add('group');
    titleAndRestartGrp.spacing = 260;

    titleAndRestartGrp.add('statictext', undefined, '★ Label Colors ★');
    const restartBtn = titleAndRestartGrp.add(
        'iconbutton',
        undefined,
        restartBinary,
        { style: 'toolbutton' }
    );
    restartBtn.helpTip = 'Restart To Default Settings';

    // == Settings - Labels - Icons ==
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

    // == Settings - Labels - Locations ==
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

    // == Settings - Labels - Textures ==
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

    // === Settings - Icon Colors ===
    const iconColorsSettingsGrp = settingsTab.add('group');
    // @ts-ignore
    iconColorsSettingsGrp.margins.bottom = SETTINGS_SPACING;

    settingsTab.orientation =
        labelSettingsGrp.orientation =
        iconColorsSettingsGrp.orientation =
            'column';
    settingsTab.alignChildren =
        labelSettingsGrp.alignChildren =
        iconColorsSettingsGrp.alignChildren =
            ['left', 'top'];

    iconColorsSettingsGrp.add('statictext', undefined, '★ Icon Colors ★');

    const {
        colorNameEdit: colorName1Edit,
        colorHexStat: colorHex1Stat,
        coloredBtn: coloredBtn1
    } = createIconColorRow(
        iconColorsSettingsGrp,
        prefs.iconColor1Name,
        prefs.iconColor1Hex
    );

    const {
        colorNameEdit: colorName2Edit,
        colorHexStat: colorHex2Stat,
        coloredBtn: coloredBtn2
    } = createIconColorRow(
        iconColorsSettingsGrp,
        prefs.iconColor2Name,
        prefs.iconColor2Hex
    );

    const {
        colorNameEdit: colorName3Edit,
        colorHexStat: colorHex3Stat,
        coloredBtn: coloredBtn3
    } = createIconColorRow(
        iconColorsSettingsGrp,
        prefs.iconColor3Name,
        prefs.iconColor3Hex
    );

    // === Settings - Help Tips ===
    const helpTipSettingGrp = settingsTab.add('group');
    // @ts-ignore
    helpTipSettingGrp.margins.bottom = SETTINGS_SPACING;
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

    // const warnGrp = settingsTab.add('group');
    // warnGrp.alignment = ['fill', 'bottom'];
    // warnGrp.spacing = 40;
    // warnGrp.add(
    //     'statictext',
    //     undefined,
    //     '☛ You may need to close and open the script to see the changes'
    // );

    restartBtn.onClick = () => {
        iconLabelsDD.selection = BOILERPLATE_PREFS.iconsLabelIndex;
        iconRandomCheck.value = BOILERPLATE_PREFS.iconsLabelRandom;
        locLabelsDD.selection = BOILERPLATE_PREFS.locsLabelIndex;
        locRandomCheck.value = BOILERPLATE_PREFS.locsLabelRandom;
        texLabelsDD.selection = BOILERPLATE_PREFS.texLabelIndex;
        texRandomCheck.value = BOILERPLATE_PREFS.texLabelRandom;
        colorName1Edit.text = BOILERPLATE_PREFS.iconColor1Name;
        colorHex1Stat.text = BOILERPLATE_PREFS.iconColor1Hex;
        colorName2Edit.text = BOILERPLATE_PREFS.iconColor2Name;
        colorHex2Stat.text = BOILERPLATE_PREFS.iconColor2Hex;
        colorName3Edit.text = BOILERPLATE_PREFS.iconColor3Name;
        colorHex3Stat.text = BOILERPLATE_PREFS.iconColor3Hex;
        (<any>iconTheLabel).fillBrush = (<any>iconTheLabel).graphics.newBrush(
            (<any>iconTheLabel).graphics.BrushType.SOLID_COLOR,
            labelColors[BOILERPLATE_PREFS.iconsLabelIndex],
            1
        );
        (<any>locTheLabel).fillBrush = (<any>locTheLabel).graphics.newBrush(
            (<any>locTheLabel).graphics.BrushType.SOLID_COLOR,
            labelColors[BOILERPLATE_PREFS.locsLabelIndex],
            1
        );
        (<any>texTheLabel).fillBrush = (<any>texTheLabel).graphics.newBrush(
            (<any>texTheLabel).graphics.BrushType.SOLID_COLOR,
            labelColors[BOILERPLATE_PREFS.texLabelIndex],
            1
        );
        iconRandomCheck.value = BOILERPLATE_PREFS.iconsLabelRandom;
        locRandomCheck.value = BOILERPLATE_PREFS.locsLabelRandom;
        texRandomCheck.value = BOILERPLATE_PREFS.texLabelRandom;
        (<any>coloredBtn1).fillBrush = (<any>coloredBtn1).graphics.newBrush(
            (<any>coloredBtn1).graphics.BrushType.SOLID_COLOR,
            hexToRgb(BOILERPLATE_PREFS.iconColor1Hex),
            1
        );
        (<any>coloredBtn2).fillBrush = (<any>coloredBtn2).graphics.newBrush(
            (<any>coloredBtn2).graphics.BrushType.SOLID_COLOR,
            hexToRgb(BOILERPLATE_PREFS.iconColor2Hex),
            1
        );
        (<any>coloredBtn3).fillBrush = (<any>coloredBtn3).graphics.newBrush(
            (<any>coloredBtn3).graphics.BrushType.SOLID_COLOR,
            hexToRgb(BOILERPLATE_PREFS.iconColor3Hex),
            1
        );
        iconTheLabel.enabled =
            locTheLabel.enabled =
            texTheLabel.enabled =
            coloredBtn1.enabled =
            coloredBtn2.enabled =
            coloredBtn3.enabled =
                false;
        iconTheLabel.enabled =
            locTheLabel.enabled =
            texTheLabel.enabled =
            coloredBtn1.enabled =
            coloredBtn2.enabled =
            coloredBtn3.enabled =
                true;

        showHelpTipsCheck.value = BOILERPLATE_PREFS.showHelpTips;
    };

    // === Ok And Cancel Buttons ===
    const okCancelBtnsGrp = helpWin.add('group');
    okCancelBtnsGrp.spacing = 250;
    const cancelBtn = okCancelBtnsGrp.add('button', undefined, 'Cancel');
    cancelBtn.onClick = () => {
        helpWin.close();
    };

    const okBtn = okCancelBtnsGrp.add('button', undefined, 'Ok', {
        name: 'Ok'
    });
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
            iconColor1Hex: colorHex1Stat.text,
            iconColor2Name: colorName2Edit.text,
            iconColor2Hex: colorHex2Stat.text,
            iconColor3Name: colorName3Edit.text,
            iconColor3Hex: colorHex3Stat.text
        });

        updateQAHelpTips(showHelpTipsCheck.value);
        updateUiFn();

        helpWin.close();
    };

    // === Initilaztion ===
    helpWin.layout.layout(true);

    if (helpWin != null && helpWin instanceof Window) {
        helpWin.center();
        helpWin.show();
    }
};
