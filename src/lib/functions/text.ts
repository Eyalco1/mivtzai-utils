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
