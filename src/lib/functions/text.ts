// V1.0.0
/*
const createText = (
    text: string,
    font: CaspionFont,
    animation: TextAnimation,
    addTextEvo: boolean,
    addMask: boolean
): TextLayer => {
    const comp = app.project.activeItem as CompItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert('No Composition Selected');
        return;
    }

    if (!text) {
        alert('Please Type Some Text');
        return;
    }

    app.beginUndoGroup('@@name: Create Text');

    const textLayer = comp.layers.addText();
    textLayer.inPoint = comp.time;

    textLayer.label = parsePrefs().textLabelRandom
        ? Math.floor(Math.random() * 16) + 1
        : parsePrefs().textLabelIndex + 1;

    const srcText = textLayer
        .property('ADBE Text Properties')
        .property('ADBE Text Document') as Property<any>;

    srcText.setValue(text);
    const textDoc = srcText.value as TextDocument;
    textDoc.font = getFontFromName(font);
    textDoc.fontSize = 100;
    textDoc.applyFill = true;
    textDoc.fillColor = [1, 1, 1];
    textDoc.applyStroke = false;
    textDoc.tracking = 0;
    textDoc.justification = ParagraphJustification.LEFT_JUSTIFY;
    srcText.setValue(textDoc);

    if (addMask) {
        const id = app.findMenuCommandId('New Mask');
        app.executeCommand(id);
    }

    if (addTextEvo) {
        introduceTextEvo();

        const rtl = font !== 'Trade Gothic';

        const srcRect = textLayer.sourceRectAtTime(0, false);

        let propId: number;
        let propValue: number;
        if (animation === 'Y Position')
            (propId = 14), (propValue = Math.ceil(srcRect.height) + 1);
        else if (animation === 'X Position')
            (propId = 13),
                (propValue = rtl
                    ? -(Math.ceil(srcRect.width) + 1)
                    : Math.ceil(srcRect.width) + 1);
        else if (animation === 'Scale') (propId = 18), (propValue = 0);
        else if (animation === 'Opacity') (propId = 38), (propValue = 0);

        const theProp = textLayer
            .property('ADBE Effect Parade')
            .property('Pseudo/textevo')
            .property(`Pseudo/textevo-00${propId}`) as Property<number>;

        theProp.setValue(propValue);
    }

    return textLayer;
};
*/

// V2.0.0
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
