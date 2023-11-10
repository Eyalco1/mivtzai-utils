// UI
const createTexturesUI = (
    tpanel: TabbedPanel
): { texTab: Tab; dropdownChecksGrp: Group; updateTexTab: () => void } => {
    const texTab = tpanel.add('tab', undefined, ['Textures']);

    const texturesGrp = texTab.add('group');
    texturesGrp.orientation = 'column';
    texturesGrp.alignChildren = 'left';
    texturesGrp.alignment = 'left';
    texturesGrp.margins = 4;
    // @ts-ignore
    texturesGrp.margins.left = 10;

    const dropdownChecksGrp = texturesGrp.add('group');
    dropdownChecksGrp.alignChildren = 'left';
    dropdownChecksGrp.alignment = 'left';

    const texturesDDGrp = dropdownChecksGrp.add('group');
    texturesDDGrp.add('statictext', undefined, 'Texture:');
    const texturesList: TextureID[] = [
        'Paper Dark',
        'Paper Medium',
        'Paper Light',
        'Grunge',
        'Smoke',
        'Noise',
        'Dust',
        'Ink',
        'Sand',
        'Stone'
    ];
    const texturesDD = texturesDDGrp.add(
        'dropdownlist',
        undefined,
        texturesList
    );
    texturesDD.preferredSize[0] = 100;
    texturesDD.selection = 0;

    const textureChecksGrp = dropdownChecksGrp.add('group');
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

    const updateTexTab = (): void => {
        // alert('Update Textures UI');
    };

    return { texTab, dropdownChecksGrp, updateTexTab };
};
