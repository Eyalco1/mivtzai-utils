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

    const textLayer = comp.layers.addText();
    const srcText = textLayer
        .property('ADBE Text Properties')
        .property('ADBE Text Document') as Property<any>;

    srcText.setValue(text);
    const textDoc = srcText.value;
    textDoc.font = getFontFromName(font);
    textDoc.fontSize = 100;
    textDoc.applyFill = true;
    textDoc.fillColor = [1, 1, 1];
    textDoc.applyStroke = false;
    textDoc.tracking = 0;
    srcText.setValue(textDoc);

    if (addTextEvo) {
        introduceTextEvo();
        // const parade = textLayer.property(
        //     'ADBE Effect Parade'
        // ) as PropertyGroup;
        // const textEvoEffect = parade.addProperty('Pseudo/textevo');
        // alert(textEvoEffect.toString());
    }

    return textLayer;
};
