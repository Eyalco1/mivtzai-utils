const createText = (
    yPosCheck: Boolean,
    xPosCheck: Boolean,
    scaleCheck: Boolean,
    opacityCheck: Boolean,
    grouping: 'Characters' | 'Words' | 'Lines',
    maskCheck: Boolean
) => {
    const comp = app.project.activeItem as CompItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert('No Composition Selected');
        return;
    }

    if (
        comp.selectedLayers.length !== 1 ||
        !(comp.selectedLayers[0] instanceof TextLayer)
    ) {
        alert('Select Only 1 Text Layer');
        return;
    }

    app.beginUndoGroup('@@name: Apply Text Preset');

    createTextAction(
        comp,
        yPosCheck,
        xPosCheck,
        scaleCheck,
        opacityCheck,
        grouping,
        maskCheck
    );

    app.endUndoGroup();
};

const createTextAction = (
    comp: CompItem,
    yPosCheck: Boolean,
    xPosCheck: Boolean,
    scaleCheck: Boolean,
    opacityCheck: Boolean,
    grouping: 'Characters' | 'Words' | 'Lines',
    maskCheck: Boolean
) => {
    const selTLayer = comp.selectedLayers[0] as TextLayer;

    // add mask
    if (maskCheck) {
        const id = app.findMenuCommandId('New Mask');
        app.executeCommand(id);
    }

    // apply preset
    const presetFile = new File(
        `${getAssetsPath()}/Presets/Caspion Text Offset.ffx`
    );
    selTLayer.applyPreset(presetFile);

    const srcText = selTLayer
        .property('ADBE Text Properties')
        .property('ADBE Text Document') as Property<string>;

    const textLang = detectLanguage(srcText.value);

    // use animation data to change properties
    const animatorProps = selTLayer
        .property('ADBE Text Properties')
        .property('ADBE Text Animators')
        .property('ADBE Text Animator')
        .property('ADBE Text Animator Properties');

    const srcRect = selTLayer.sourceRectAtTime(0, false);

    const posProp = animatorProps.property('ADBE Text Position 3D') as Property<
        [number, number, number?]
    >;
    posProp.setValue([0, 0]);
    if (xPosCheck) {
        const xVal =
            textLang === 'English'
                ? Math.ceil(srcRect.width) + 1
                : -(Math.ceil(srcRect.width) + 1);
        posProp.setValue([xVal, posProp.value[1]]);
    }
    if (yPosCheck) {
        posProp.setValue([posProp.value[0], Math.ceil(srcRect.height) + 40]);
    }

    const scaleProp = animatorProps.property('ADBE Text Scale 3D') as Property<
        [number, number, number?]
    >;

    if (scaleCheck) {
        scaleProp.setValue([0, 0]);
    }

    const opacityProp = animatorProps.property(
        'ADBE Text Opacity'
    ) as Property<number>;

    if (opacityCheck) {
        opacityProp.setValue(0);
    }

    // use based on data to change property
    const basedOnProp = selTLayer
        .property('ADBE Text Properties')
        .property('ADBE Text Animators')
        .property('ADBE Text Animator')
        .property('ADBE Text Selectors')
        .property('ADBE Text Selector')
        .property('ADBE Text Range Advanced')
        .property('ADBE Text Range Type2') as Property<number>;

    if (grouping === 'Characters') basedOnProp.setValue(1);
    if (grouping === 'Words') basedOnProp.setValue(3);
    if (grouping === 'Lines') basedOnProp.setValue(4);
};
