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
    const settingsTab = tpanel.add('tab', undefined, ['Settings']);
    settingsTab.orientation = 'row';

    const iconlabelsSettingGrp = settingsTab.add('group');
    iconlabelsSettingGrp.add('statictext', undefined, 'Icons Label Color:');

    const iconlabelsGrp = iconlabelsSettingGrp.add('group');
    const labelNames = getLabelNamesFromPrefs();
    const iconLabelsDD = iconlabelsGrp.add(
        'dropdownlist',
        undefined,
        labelNames
    );
    iconLabelsDD.selection = 0;
    const iconLabelColors = getLabelsFromPrefs().map(hex => hexToRgb(hex));

    const selection = iconLabelsDD.selection as unknown as ListItem;
    const theLabel = createColoredButton(
        iconlabelsGrp,
        iconLabelColors[selection.index],
        [20, 20]
    );

    iconLabelsDD.onChange = () => {
        const selection = iconLabelsDD.selection as unknown as ListItem;
        theLabel.fillBrush = theLabel.graphics.newBrush(
            theLabel.graphics.BrushType.SOLID_COLOR,
            iconLabelColors[selection.index],
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
            iconsLabelName: iconLabelsDD.selection.toString()
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
