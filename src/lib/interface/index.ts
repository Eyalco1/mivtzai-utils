const init = (thisObj: typeof globalThis) => {
    let w =
        thisObj instanceof Panel
            ? thisObj
            : new Window('palette', '@@name', undefined, {
                  resizeable: true
              });
    if (w == null) w;
    w = w as Window;

    const tpanel = w.add('tabbedpanel');
    tpanel.alignment = tpanel.alignChildren = ['fill', 'fill'];

    const qaTab = createQAUI(tpanel);
    const iconsTab = createIconsUI(tpanel);
    const locTab = createLocationsUI(tpanel);
    const texTab = createTexturesUI(tpanel);

    const extraBtnsQA = qaTab.add('group');
    const extraBtnsIcons = iconsTab.add('group');
    const extraBtnsLocations = locTab.add('group');
    const extraBtnsTextures = texTab.add('group');

    extraBtnsQA.spacing =
        extraBtnsIcons.spacing =
        extraBtnsLocations.spacing =
        extraBtnsTextures.spacing =
            2;

    extraBtnsQA.alignment =
        extraBtnsQA.alignChildren =
        extraBtnsIcons.alignment =
        extraBtnsIcons.alignChildren =
        extraBtnsLocations.alignment =
        extraBtnsLocations.alignChildren =
        extraBtnsTextures.alignment =
        extraBtnsTextures.alignChildren =
            ['fill', 'fill'];

    const quoteBtnQA = extraBtnsQA.add('iconbutton', undefined, quoteBinary, {
        style: 'toolbutton'
    });
    const helpBtnQA = extraBtnsQA.add('iconbutton', undefined, helpBinary, {
        style: 'toolbutton'
    });

    const quoteBtnIcons = extraBtnsIcons.add(
        'iconbutton',
        undefined,
        quoteBinary,
        {
            style: 'toolbutton'
        }
    );
    const helpBtnIcons = extraBtnsIcons.add(
        'iconbutton',
        undefined,
        helpBinary,
        {
            style: 'toolbutton'
        }
    );

    const quoteBtnLocations = extraBtnsLocations.add(
        'iconbutton',
        undefined,
        quoteBinary,
        { style: 'toolbutton' }
    );
    const helpBtnLocations = extraBtnsLocations.add(
        'iconbutton',
        undefined,
        helpBinary,
        { style: 'toolbutton' }
    );

    const quoteBtnTextures = extraBtnsTextures.add(
        'iconbutton',
        undefined,
        quoteBinary,
        { style: 'toolbutton' }
    );
    const helpBtnTextures = extraBtnsTextures.add(
        'iconbutton',
        undefined,
        helpBinary,
        { style: 'toolbutton' }
    );

    qaTab.alignment = qaTab.alignChildren = ['fill', 'fill'];

    helpBtnQA.alignment =
        helpBtnIcons.alignment =
        helpBtnLocations.alignment =
        helpBtnTextures.alignment =
        quoteBtnQA.alignment =
        quoteBtnIcons.alignment =
        quoteBtnLocations.alignment =
        quoteBtnTextures.alignment =
            ['right', 'bottom'];

    helpBtnQA.onClick =
        helpBtnIcons.onClick =
        helpBtnLocations.onClick =
        helpBtnTextures.onClick =
            createHelpWindow;

    quoteBtnQA.onClick =
        quoteBtnIcons.onClick =
        quoteBtnLocations.onClick =
        quoteBtnTextures.onClick =
            generateCaspiQuote;

    w.layout.layout(true);
    w.layout.resize();
    w.onResizing = w.onResize = () => {
        w = w as Window;
        w.onResize = () => {
            w.layout.resize();
        };
    };
    if (w != null && w instanceof Window) {
        w.center();
        w.show();
    }
};
