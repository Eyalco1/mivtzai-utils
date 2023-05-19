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
    const abtStr =
        '‹ @@name - version @@version - Created By Eyal Cohen ›\n\n' +
        'מבצעי... אין מה לעשות, זה חלק מהשירות, וזה לא תמיד כיף.\n' +
        'כספיון (על שם קצין ההפקה המבצעית שלנו, לא סיפור הילדים המפורסם מאת פאול קור) התחיל כרעיון מאוד שאפתני, שמנסה לפתור בעיה שכל אפטריסט מכיר: אנחנו מבזבזים הרבה זמן בעבודה מיותרת. משחזרים דברים שכבר עשינו, לא מוצאים קבצים בשרת, הולכים לאיבוד בתוך מאגרים של גרפיקאים...\n\n' +
        'המטרה של הפרוייקט הזה היא לייעל כמה שאפשר את העבודה המבצעית, ובתקווה להפוך את החיים שלנו לקצת יותר פשוטים.\n' +
        'אז אולי זה לא הדבר שיכריע את המערכה הבאה, אבל אם השטות הזאת שכתבתי עוזרת לכם לעבוד יותר בכיף - מבחינתי עשיתי את שלי :)\n\n' +
        'אוהב,\n' +
        'אייל';
    const aboutEditGrp = aboutTab.add('group');
    aboutEditGrp.add('edittext', [0, 0, 380, 390], abtStr, {
        multiline: true,
        readonly: true,
        scrollable: true
    });
    // @ts-ignore
    aboutEditGrp.margins.left = 10;

    return aboutTab;
};

const createColorSwatchAndHexCode = (
    container: Group,
    colorHex: string
): { colorHexStat: StaticText; coloredBtn: IconButton } => {
    const theColor: [number, number, number] = hexToRgb(colorHex);
    const coloredBtn = createColoredButton(container, theColor, [20, 20]);
    coloredBtn.helpTip = 'Click To Edit';
    const colorHexStat = container.add('statictext', undefined, colorHex);
    colorHexStat.characters = 10;
    colorHexStat.helpTip = 'Click The Color Swatch To Edit';

    coloredBtn.onClick = () => {
        const colorPicked = openColorPicker(hexToRgb(colorHexStat.text));
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

    return { colorHexStat, coloredBtn };
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

    const { colorHexStat, coloredBtn } = createColorSwatchAndHexCode(
        colorGrp,
        colorHex
    );

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

    // == Settings - Labels - Text ==
    const textlabelsSettingGrp = labelSettingsGrp.add('group');
    const textStaticGrp = textlabelsSettingGrp.add('group');
    textStaticGrp.add('statictext', undefined, 'Text Label Color:');
    // @ts-ignore
    textStaticGrp.margins.right = 25;

    const textlabelsGrp = textlabelsSettingGrp.add('group');

    const textLabelsDD = textlabelsGrp.add(
        'dropdownlist',
        undefined,
        labelNames
    );
    textLabelsDD.selection = prefs.textLabelIndex;

    const textSelection = textLabelsDD.selection as unknown as ListItem;
    const textTheLabel = createColoredButton(
        textlabelsGrp,
        labelColors[textSelection.index],
        [20, 20]
    );

    textLabelsDD.onChange = () => {
        const selection = textLabelsDD.selection as unknown as ListItem;
        (<any>textTheLabel).fillBrush = (<any>textTheLabel).graphics.newBrush(
            (<any>textTheLabel).graphics.BrushType.SOLID_COLOR,
            labelColors[selection.index],
            1
        );
    };

    const textRandomCheck = textlabelsSettingGrp.add(
        'checkbox',
        undefined,
        'Random'
    );
    textRandomCheck.value = prefs.textLabelRandom;
    const updateFromTextCheck = (val: boolean) => {
        textlabelsGrp.enabled = !val;
        (<any>textTheLabel).fillBrush = (<any>textTheLabel).graphics.newBrush(
            (<any>textTheLabel).graphics.BrushType.SOLID_COLOR,
            val ? [0.2, 0.2, 0.2, 1] : labelColors[textSelection.index],
            1
        );
    };
    updateFromTextCheck(textRandomCheck.value);
    textRandomCheck.onClick = () => {
        updateFromTextCheck(textRandomCheck.value);
    };

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

    // === Settings - Mitug Colors ===
    const mitugColorsSettingsGrp = settingsTab.add('group');
    // @ts-ignore
    mitugColorsSettingsGrp.margins.bottom = SETTINGS_SPACING;

    mitugColorsSettingsGrp.add('statictext', undefined, '★ Mitug Colors ★');

    const mitugs: Mitug[] = ['Gaza', 'Pakmaz', 'Lebanon'];
    const mitugDD = mitugColorsSettingsGrp.add(
        'dropdownlist',
        undefined,
        mitugs
    );
    mitugDD.selection = 0;
    mitugDD.preferredSize[0] = 100;

    /*
    const createMitugColorsGrp = (mitugObj: {
        color1: string;
        color2: string;
    }): {
        mitugColorsGrp: Group;
        mitugColor1HexStat: StaticText;
        mitugColor1ColoredBtn: IconButton;
        mitugColor2HexStat: StaticText;
        mitugColor2ColoredBtn: IconButton;
    } => {
        const mitugColorsGrp = mitugColorsSettingsGrp.add('group');
        mitugColorsGrp.orientation = 'column';

        const mitugColor1Grp = mitugColorsGrp.add('group');
        mitugColor1Grp.alignChildren = ['left', 'center'];
        mitugColor1Grp.spacing = 10;
        mitugColor1Grp.margins = 0;

        mitugColor1Grp.add('statictext', undefined, 'Color 1:');

        const {
            colorHexStat: mitugColor1HexStat,
            coloredBtn: mitugColor1ColoredBtn
        } = createColorSwatchAndHexCode(mitugColor1Grp, mitugObj.color1);

        const mitugColor2Grp = mitugColorsGrp.add('group');
        mitugColor2Grp.alignChildren = ['left', 'center'];
        mitugColor2Grp.spacing = 10;
        mitugColor2Grp.margins = 0;

        mitugColor2Grp.add('statictext', undefined, 'Color 2:');

        const {
            colorHexStat: mitugColor2HexStat,
            coloredBtn: mitugColor2ColoredBtn
        } = createColorSwatchAndHexCode(mitugColor2Grp, mitugObj.color2);

        return {
            mitugColorsGrp,
            mitugColor1HexStat,
            mitugColor1ColoredBtn,
            mitugColor2HexStat,
            mitugColor2ColoredBtn
        };
    };
    */

    // const {
    //     mitugColorsGrp: GAZA_mitugColorsGrp,
    //     mitugColor1ColoredBtn: GAZA_mitugColor1ColoredBtn,
    //     mitugColor1HexStat: GAZA_mitugColor1HexStat,
    //     mitugColor2ColoredBtn: GAZA_mitugColor2ColoredBtn,
    //     mitugColor2HexStat: GAZA_mitugColor2HexStat
    // } = createMitugColorsGrp(prefs.mitugGaza);

    // const {
    //     mitugColorsGrp: PAKMAZ_mitugColorsGrp,
    //     mitugColor1ColoredBtn: PAKMAZ_mitugColor1ColoredBtn,
    //     mitugColor1HexStat: PAKMAZ_mitugColor1HexStat,
    //     mitugColor2ColoredBtn: PAKMAZ_mitugColor2ColoredBtn,
    //     mitugColor2HexStat: PAKMAZ_mitugColor2HexStat
    // } = createMitugColorsGrp(prefs.mitugPakmaz);

    // const {
    //     mitugColorsGrp: LEBANON_mitugColorsGrp,
    //     mitugColor1ColoredBtn: LEBANON_mitugColor1ColoredBtn,
    //     mitugColor1HexStat: LEBANON_mitugColor1HexStat,
    //     mitugColor2ColoredBtn: LEBANON_mitugColor2ColoredBtn,
    //     mitugColor2HexStat: LEBANON_mitugColor2HexStat
    // } = createMitugColorsGrp(prefs.mitugLebanon);

    // GAZA_mitugColorsGrp.show();
    // PAKMAZ_mitugColorsGrp.hide();
    // LEBANON_mitugColorsGrp.hide();

    const mitugColorsGrp = mitugColorsSettingsGrp.add('group');
    mitugColorsGrp.orientation = 'column';

    const gazaColors = {
        color1: prefs.mitugGaza.color1,
        color2: prefs.mitugGaza.color2
    };

    const pakmazColors = {
        color1: prefs.mitugPakmaz.color1,
        color2: prefs.mitugPakmaz.color2
    };

    const lebanonColors = {
        color1: prefs.mitugLebanon.color1,
        color2: prefs.mitugLebanon.color2
    };

    // Color 1
    const mitugColor1Grp = mitugColorsGrp.add('group');
    mitugColor1Grp.alignChildren = ['left', 'center'];
    mitugColor1Grp.spacing = 10;
    mitugColor1Grp.margins = 0;

    mitugColor1Grp.add('statictext', undefined, 'Color 1:');

    let mitugColor1Hex = prefs.mitugGaza.color1;

    const mitugTheColor1: [number, number, number] = hexToRgb(mitugColor1Hex);
    const mitugColoredBtn1 = createColoredButton(
        mitugColor1Grp,
        mitugTheColor1,
        [20, 20]
    );
    mitugColoredBtn1.helpTip = 'Click To Edit';
    const mitugColorHexStat1 = mitugColor1Grp.add(
        'statictext',
        undefined,
        mitugColor1Hex
    );
    mitugColorHexStat1.characters = 10;
    mitugColorHexStat1.helpTip = 'Click The Color Swatch To Edit';

    mitugColoredBtn1.onClick = () => {
        const colorPicked = openColorPicker(hexToRgb(mitugColor1Hex));
        (<any>mitugColoredBtn1).fillBrush = (<any>(
            mitugColoredBtn1
        )).graphics.newBrush(
            (<any>mitugColoredBtn1).graphics.BrushType.SOLID_COLOR,
            colorPicked,
            1
        );

        mitugColor1Hex =
            '#' +
            rgbToHex(
                colorPicked[0] * 255,
                colorPicked[1] * 255,
                colorPicked[2] * 255
            );

        mitugColorHexStat1.text = mitugColor1Hex;

        const chosenMitug = mitugDD.selection.toString() as Mitug;
        if (chosenMitug === 'Gaza') gazaColors.color1 = mitugColor1Hex;
        if (chosenMitug === 'Pakmaz') pakmazColors.color1 = mitugColor1Hex;
        if (chosenMitug === 'Lebanon') lebanonColors.color1 = mitugColor1Hex;
    };

    // Color 1
    const mitugColor2Grp = mitugColorsGrp.add('group');
    mitugColor2Grp.alignChildren = ['left', 'center'];
    mitugColor2Grp.spacing = 10;
    mitugColor2Grp.margins = 0;

    mitugColor2Grp.add('statictext', undefined, 'Color 2:');

    let mitugColor2Hex = prefs.mitugGaza.color2;

    const mitugTheColor2: [number, number, number] = hexToRgb(mitugColor2Hex);
    const mitugColoredBtn2 = createColoredButton(
        mitugColor2Grp,
        mitugTheColor2,
        [20, 20]
    );
    mitugColoredBtn2.helpTip = 'Click To Edit';
    const mitugColorHexStat2 = mitugColor2Grp.add(
        'statictext',
        undefined,
        mitugColor2Hex
    );
    mitugColorHexStat2.characters = 10;
    mitugColorHexStat2.helpTip = 'Click The Color Swatch To Edit';

    mitugColoredBtn2.onClick = () => {
        const colorPicked = openColorPicker(hexToRgb(mitugColor2Hex));
        (<any>mitugColoredBtn2).fillBrush = (<any>(
            mitugColoredBtn2
        )).graphics.newBrush(
            (<any>mitugColoredBtn2).graphics.BrushType.SOLID_COLOR,
            colorPicked,
            1
        );

        mitugColor2Hex =
            '#' +
            rgbToHex(
                colorPicked[0] * 255,
                colorPicked[1] * 255,
                colorPicked[2] * 255
            );

        mitugColorHexStat2.text = mitugColor2Hex;

        const chosenMitug = mitugDD.selection.toString() as Mitug;
        if (chosenMitug === 'Gaza') gazaColors.color2 = mitugColor2Hex;
        if (chosenMitug === 'Pakmaz') pakmazColors.color2 = mitugColor2Hex;
        if (chosenMitug === 'Lebanon') lebanonColors.color2 = mitugColor2Hex;
    };

    mitugDD.onChange = () => {
        const chosenMitug = mitugDD.selection.toString() as Mitug;

        let color1hex: string;
        let color2hex: string;

        if (chosenMitug === 'Gaza') {
            color1hex = gazaColors.color1;
            color2hex = gazaColors.color2;
        }
        if (chosenMitug === 'Pakmaz') {
            color1hex = pakmazColors.color1;
            color2hex = pakmazColors.color2;
        }
        if (chosenMitug === 'Lebanon') {
            color1hex = lebanonColors.color1;
            color2hex = lebanonColors.color2;
        }

        (<any>mitugColoredBtn1).fillBrush = (<any>(
            mitugColoredBtn1
        )).graphics.newBrush(
            (<any>mitugColoredBtn1).graphics.BrushType.SOLID_COLOR,
            hexToRgb(color1hex),
            1
        );

        (<any>mitugColoredBtn2).fillBrush = (<any>(
            mitugColoredBtn2
        )).graphics.newBrush(
            (<any>mitugColoredBtn2).graphics.BrushType.SOLID_COLOR,
            hexToRgb(color2hex),
            1
        );

        mitugColorHexStat1.text = color1hex;
        mitugColorHexStat2.text = color2hex;
    };

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

    // General Layout
    settingsTab.orientation =
        labelSettingsGrp.orientation =
        iconColorsSettingsGrp.orientation =
        mitugColorsSettingsGrp.orientation =
            'column';
    settingsTab.alignChildren =
        labelSettingsGrp.alignChildren =
        iconColorsSettingsGrp.alignChildren =
        mitugColorsSettingsGrp.alignChildren =
            ['left', 'top'];

    restartBtn.onClick = () => {
        textLabelsDD.selection = BOILERPLATE_PREFS.textLabelIndex;
        textRandomCheck.value = BOILERPLATE_PREFS.textLabelRandom;
        textlabelsGrp.enabled = !textRandomCheck.value;

        iconLabelsDD.selection = BOILERPLATE_PREFS.iconsLabelIndex;
        iconRandomCheck.value = BOILERPLATE_PREFS.iconsLabelRandom;
        iconlabelsGrp.enabled = !iconRandomCheck.value;

        locLabelsDD.selection = BOILERPLATE_PREFS.locsLabelIndex;
        locRandomCheck.value = BOILERPLATE_PREFS.locsLabelRandom;
        loclabelsGrp.enabled = !locRandomCheck.value;

        texLabelsDD.selection = BOILERPLATE_PREFS.texLabelIndex;
        texRandomCheck.value = BOILERPLATE_PREFS.texLabelRandom;
        texlabelsGrp.enabled = !texRandomCheck.value;

        colorName1Edit.text = BOILERPLATE_PREFS.iconColor1Name;
        colorHex1Stat.text = BOILERPLATE_PREFS.iconColor1Hex;

        colorName2Edit.text = BOILERPLATE_PREFS.iconColor2Name;
        colorHex2Stat.text = BOILERPLATE_PREFS.iconColor2Hex;

        colorName3Edit.text = BOILERPLATE_PREFS.iconColor3Name;
        colorHex3Stat.text = BOILERPLATE_PREFS.iconColor3Hex;

        gazaColors.color1 = BOILERPLATE_PREFS.mitugGaza.color1;
        gazaColors.color2 = BOILERPLATE_PREFS.mitugGaza.color2;
        pakmazColors.color1 = BOILERPLATE_PREFS.mitugPakmaz.color1;
        pakmazColors.color2 = BOILERPLATE_PREFS.mitugPakmaz.color2;
        lebanonColors.color1 = BOILERPLATE_PREFS.mitugLebanon.color1;
        lebanonColors.color2 = BOILERPLATE_PREFS.mitugLebanon.color2;

        mitugColorHexStat1.text = BOILERPLATE_PREFS.mitugGaza.color1;
        mitugColorHexStat2.text = BOILERPLATE_PREFS.mitugGaza.color2;

        mitugDD.selection = 0;

        (<any>textTheLabel).fillBrush = (<any>textTheLabel).graphics.newBrush(
            (<any>textTheLabel).graphics.BrushType.SOLID_COLOR,
            labelColors[BOILERPLATE_PREFS.textLabelIndex],
            1
        );

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

        (<any>mitugColoredBtn1).fillBrush = (<any>(
            mitugColoredBtn1
        )).graphics.newBrush(
            (<any>mitugColoredBtn1).graphics.BrushType.SOLID_COLOR,
            hexToRgb(BOILERPLATE_PREFS.mitugGaza.color1),
            1
        );

        (<any>mitugColoredBtn2).fillBrush = (<any>(
            mitugColoredBtn2
        )).graphics.newBrush(
            (<any>mitugColoredBtn2).graphics.BrushType.SOLID_COLOR,
            hexToRgb(BOILERPLATE_PREFS.mitugGaza.color2),
            1
        );

        textTheLabel.enabled =
            iconTheLabel.enabled =
            locTheLabel.enabled =
            texTheLabel.enabled =
            coloredBtn1.enabled =
            coloredBtn2.enabled =
            coloredBtn3.enabled =
            mitugColoredBtn1.enabled =
            mitugColoredBtn2.enabled =
                false;
        textTheLabel.enabled =
            iconTheLabel.enabled =
            locTheLabel.enabled =
            texTheLabel.enabled =
            coloredBtn1.enabled =
            coloredBtn2.enabled =
            coloredBtn3.enabled =
            mitugColoredBtn1.enabled =
            mitugColoredBtn2.enabled =
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
            textLabelIndex: (<ListItem>textLabelsDD.selection).index,
            textLabelRandom: textRandomCheck.value,
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
            iconColor3Hex: colorHex3Stat.text,
            mitugGaza: {
                color1: gazaColors.color1,
                color2: gazaColors.color2
            },
            mitugPakmaz: {
                color1: pakmazColors.color1,
                color2: pakmazColors.color2
            },
            mitugLebanon: {
                color1: lebanonColors.color1,
                color2: lebanonColors.color2
            }
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
