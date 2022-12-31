// UI
const createTexturesUI = (tpanel: TabbedPanel): Tab => {
    const texturesTab = tpanel.add('tab', undefined, ['Textures']);

    const texturesGrp = texturesTab.add('group');
    texturesGrp.orientation = 'column';
    texturesGrp.alignChildren = 'left';
    texturesGrp.alignment = 'left';
    texturesGrp.margins = 4;
    // @ts-ignore
    texturesGrp.margins.left = 10;

    const texturesDDGrp = texturesGrp.add('group');
    texturesDDGrp.add('statictext', undefined, 'Texture:');
    const texturesList: TextureID[] = [
        'Paper Dark',
        'Paper Medium',
        'Paper Light',
        'Smoke',
        'Noise',
        'Dust'
    ];
    const texturesDD = texturesDDGrp.add(
        'dropdownlist',
        undefined,
        texturesList
    );
    texturesDD.preferredSize[0] = 100;
    texturesDD.selection = 0;

    const textureChecksGrp = texturesGrp.add('group');
    const textureLoopCheck = textureChecksGrp.add(
        'checkbox',
        undefined,
        'Loop'
    );
    const textureFitCheck = textureChecksGrp.add(
        'checkbox',
        undefined,
        'Fit To Comp'
    );

    textureLoopCheck.onClick = () => {
        textureFitCheck.enabled = !textureLoopCheck.value;
        textureFitCheck.value = false;
    };

    const texturesCreateBtn = texturesGrp.add(
        'button',
        undefined,
        'Import Texture'
    );
    texturesCreateBtn.preferredSize[0] = 100;

    texturesCreateBtn.onClick = () => {
        const id = texturesDD.selection.toString() as TextureID;
        const loop = textureLoopCheck.value;
        const fit = textureFitCheck.value;
        createTexture(id, loop, fit);
    };

    return texturesTab;
};
