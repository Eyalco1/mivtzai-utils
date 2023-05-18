const createTvaiStroke = (): void => {
    app.beginUndoGroup('@@name: Create Tunnel Stroke');

    const comp = app.project.activeItem as CompItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert('No Composition Selected');
        return;
    }
    const layer = comp.layers.addShape();
    layer.name = 'Tunnel';
    layer.inPoint = comp.time;

    const contents = layer.property('ADBE Root Vectors Group') as PropertyGroup;
    const shapeGrp = contents.addProperty('ADBE Vector Group');
    shapeGrp.name = 'Tunnel_Stroke';

    const lineGrp = shapeGrp.property('ADBE Vectors Group') as PropertyGroup;
    const pathGrp = lineGrp.addProperty('ADBE Vector Shape - Group');
    const linePath = pathGrp.property('ADBE Vector Shape') as Property<any>;

    const size = comp.width;
    const myShape = new Shape();
    myShape.vertices = [
        [-(size / 2), 0],
        [size / 2, 0]
    ];
    myShape.closed = false;

    linePath.setValue(myShape);

    const myStroke = lineGrp.addProperty(
        'ADBE Vector Graphic - Stroke'
    ) as Property<any>;
    const strokeWidth = myStroke.property(
        'ADBE Vector Stroke Width'
    ) as Property<any>;
    strokeWidth.setValue(10);

    const dashesProp = myStroke.property(
        'ADBE Vector Stroke Dashes'
    ) as PropertyGroup;
    const dashOne = dashesProp.addProperty(
        'ADBE Vector Stroke Dash 1'
    ) as Property<any>;
    dashOne.setValue(25);
    const dashOffset = dashesProp.addProperty(
        'ADBE Vector Stroke Offset'
    ) as Property<any>;
    dashOffset.expression = 'time * effect("Speed")("Slider")';

    const slider = layer.effect.addProperty(
        'ADBE Slider Control'
    ) as Property<any>;
    slider.name = 'Speed';
    const sliderVal = slider.property(
        'ADBE Slider Control-0001'
    ) as Property<any>;
    sliderVal.setValue(-100);
    sliderVal.expression =
        'var endProp = content("Tunnel_Stroke").content("Trim Paths 1").end;\n' +
        'var speedSlider = effect("Speed")("Slider");\n' +
        'linear(endProp, 100, 0, 0, speedSlider)';

    const parentGrp = contents
        .property('Tunnel_Stroke')
        .property('ADBE Vectors Group') as PropertyGroup;
    const trimPathsGrp = parentGrp.addProperty('ADBE Vector Filter - Trim');
    const trimPathsEnd = trimPathsGrp.property(
        'ADBE Vector Trim End'
    ) as Property<number>;
    trimPathsEnd.setValueAtTime(0, 0);
    trimPathsEnd.setValueAtTime((1 / comp.frameRate) * 30, 100);

    trimPathsEnd.setTemporalEaseAtKey(
        1,
        [new KeyframeEase(0, 33)],
        [new KeyframeEase(0, 33)]
    );
    trimPathsEnd.setTemporalEaseAtKey(
        2,
        [new KeyframeEase(0, 88)],
        [new KeyframeEase(0, 88)]
    );

    layer
        .property('ADBE Root Vectors Group')
        .property('ADBE Vector Group')
        .property('ADBE Vectors Group')
        .property('ADBE Vector Shape - Group').selected = true;

    app.endUndoGroup();
};

const scaleWithOvershootQA = (): void => {
    app.beginUndoGroup('@@name: Pop Animation');
    const comp = app.project.activeItem as CompItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert('No Composition Selected');
        return;
    }
    const selLayers = comp.selectedLayers;
    if (selLayers.length === 0) {
        alert('No Layers Selected');
        return;
    }

    scaleWithOvershoot(selLayers);
    app.endUndoGroup();
};

const importLogos = (): void => {
    app.beginUndoGroup('@@name: Import Logos');

    let langExt: 'HE' | 'EN' | 'AR' | 'PR' | 'ES' | 'RS' | 'FR' = null;

    const keyState = ScriptUI.environment.keyboardState;
    const ctrlOrCmdKey =
        getOS() === 'Win' ? keyState.ctrlKey : keyState.metaKey;

    if (ctrlOrCmdKey) {
        if (keyState.shiftKey) {
            if (keyState.altKey) {
                langExt = 'FR';
            } else {
                langExt = 'PR';
            }
        } else if (keyState.altKey) {
            langExt = 'RS';
        } else {
            langExt = 'HE';
        }
    } else if (keyState.shiftKey) {
        if (keyState.altKey) {
            langExt = 'ES';
        } else {
            langExt = 'EN';
        }
    } else if (keyState.altKey) {
        langExt = 'AR';
    }

    const idfItems: AVItem[] = [];
    if (langExt !== null) {
        const idfItem = app.project.importFile(
            new ImportOptions(
                File(`${getAssetsPath()}/Logos/IDF_Logo_${langExt}.png`)
            )
        ) as AVItem;

        idfItems.push(idfItem);
    } else {
        const idfItemHE = app.project.importFile(
            new ImportOptions(File(`${getAssetsPath()}/Logos/IDF_Logo_HE.png`))
        ) as AVItem;

        const idfItemEN = app.project.importFile(
            new ImportOptions(File(`${getAssetsPath()}/Logos/IDF_Logo_EN.png`))
        ) as AVItem;

        const idfItemAR = app.project.importFile(
            new ImportOptions(File(`${getAssetsPath()}/Logos/IDF_Logo_AR.png`))
        ) as AVItem;

        const idfItemES = app.project.importFile(
            new ImportOptions(File(`${getAssetsPath()}/Logos/IDF_Logo_ES.png`))
        ) as AVItem;

        const idfItemRS = app.project.importFile(
            new ImportOptions(File(`${getAssetsPath()}/Logos/IDF_Logo_RS.png`))
        ) as AVItem;

        const idfItemFR = app.project.importFile(
            new ImportOptions(File(`${getAssetsPath()}/Logos/IDF_Logo_FR.png`))
        ) as AVItem;

        const idfItemPR = app.project.importFile(
            new ImportOptions(File(`${getAssetsPath()}/Logos/IDF_Logo_PR.png`))
        ) as AVItem;

        idfItems.push(
            idfItemHE,
            idfItemEN,
            idfItemAR,
            idfItemES,
            idfItemRS,
            idfItemFR,
            idfItemPR
        );
    }

    const dotzItem = app.project.importFile(
        new ImportOptions(File(`${getAssetsPath()}/Logos/Dotz_Logo.png`))
    ) as AVItem;

    const comp = app.project.activeItem as CompItem;
    if (!comp || !(comp instanceof CompItem)) return;

    const padding = (comp.width + comp.height) / 25;

    idfItems.forEach(i => {
        const idfLayer = comp.layers.add(i);
        const idfScale = idfLayer
            .property('ADBE Transform Group')
            .property('ADBE Scale') as Property<any>;
        const idfScaleVal = (comp.width + comp.height) / 1000;
        idfScale.setValue([idfScaleVal, idfScaleVal]);
        const idfPos = idfLayer
            .property('ADBE Transform Group')
            .property('ADBE Position') as Property<any>;
        idfPos.setValue([comp.width - padding, 0 + padding]);
    });

    const dotzLayer = comp.layers.add(dotzItem);
    const dotzScale = dotzLayer
        .property('ADBE Transform Group')
        .property('ADBE Scale') as Property<any>;
    const dotzScaleVal = (comp.width + comp.height) / 60;
    dotzScale.setValue([dotzScaleVal, dotzScaleVal]);
    const dotzPos = dotzLayer
        .property('ADBE Transform Group')
        .property('ADBE Position') as Property<any>;
    dotzPos.setValue([0 + padding, 0 + padding]);

    app.endUndoGroup();
};

const createIllusText = (): void => {
    app.beginUndoGroup('@@name: Create Illustration Text');

    const comp = app.project.activeItem as CompItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert('No Composition Selected');
        return;
    }

    const textLayer = comp.layers.addText();
    const srcText = textLayer
        .property('ADBE Text Properties')
        .property('ADBE Text Document') as Property<any>;

    srcText.setValue('אילוסטרציה');
    const textDoc = srcText.value;
    textDoc.font = 'NarkisBlockCondensedMF-Bold';
    textDoc.fontSize = 100;
    textDoc.applyFill = true;
    textDoc.fillColor = [1, 1, 1];
    textDoc.applyStroke = false;
    textDoc.tracking = 0;
    srcText.setValue(textDoc);

    const boundingBox = textLayer.sourceRectAtTime(comp.time, false);
    const layerPos = textLayer
        .property('ADBE Transform Group')
        .property('ADBE Position') as Property<any>;

    const padding = 40;
    layerPos.setValue([-boundingBox.left + padding, comp.height - padding]);

    app.endUndoGroup();
};

const formatLayerNameQA = (): void => {
    app.beginUndoGroup('@@name: Format Layer Name');

    const comp = app.project.activeItem as CompItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert('No Composition Selected');
        return;
    }

    const selLayers = comp.selectedLayers;
    if (selLayers.length === 0) {
        alert('No Layers Selected');
        return;
    }

    for (let i = 0; i < selLayers.length; i++) {
        const cur = selLayers[i];
        const name = cur.name;

        const formatted = formatLayerName(name);

        cur.name = formatted;

        if (cur instanceof AVLayer) {
            cur.source.name = cur.name;
        }
    }

    app.endUndoGroup();
};

const textReverse = (): void => {
    app.beginUndoGroup('@@name: Reverse Text');

    const comp = app.project.activeItem as CompItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert('No Composition Selected');
        return;
    }

    const selLayers = comp.selectedLayers;
    if (selLayers.length === 0) {
        alert('No Layers Selected');
        return;
    }

    for (let i = 0; i < selLayers.length; i++) {
        const curLayer = selLayers[i];
        if (curLayer instanceof TextLayer) {
            const srcTextProp = curLayer
                .property('ADBE Text Properties')
                .property('ADBE Text Document') as Property<any>;

            const srcValue = srcTextProp.value.toString();
            const srcValueReverse = srcValue.split('').reverse().join('');

            srcTextProp.setValue(srcValueReverse.toString());
        }
    }

    app.endUndoGroup();
};

const createBg = (): void => {
    app.beginUndoGroup('@@name: Create Background');

    const comp = app.project.activeItem as CompItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert('No Composition Selected');
        return;
    }

    const layer = comp.layers.addShape();
    layer.name = 'BG';
    layer.label = 16;
    // layer.locked = true;

    const contents = layer.property('ADBE Root Vectors Group') as PropertyGroup;
    const grp = contents.addProperty('ADBE Vector Group') as PropertyGroup;
    grp.name = 'Rectangle 1';
    const recGrp = grp.property('ADBE Vectors Group') as PropertyGroup;

    const recShape = recGrp.addProperty('ADBE Vector Shape - Rect');
    const recSize = recShape.property('ADBE Vector Rect Size') as Property<
        [number, number]
    >;
    recSize.setValue([comp.width, comp.height]);

    const gFill = recGrp.addProperty(
        'ADBE Vector Graphic - G-Fill'
    ) as Property<any>;

    const gradType = gFill.property(
        'ADBE Vector Grad Type'
    ) as Property<number>;
    gradType.setValue(2);

    const endPoint = gFill.property('ADBE Vector Grad End Pt') as Property<
        [number, number]
    >;
    const endPointPos: [number, number] =
        comp.width >= comp.height ? [comp.width / 2, 0] : [0, comp.height / 2];
    endPoint.setValue(endPointPos);

    const fx = layer.property('ADBE Effect Parade') as PropertyGroup;
    const tint = fx.addProperty('ADBE Tint');
    const tintBlack = tint.property('ADBE Tint-0001') as Property<any>;
    const tintWhite = tint.property('ADBE Tint-0002') as Property<any>;

    tintWhite.setValue([118 / 255, 15 / 255, 15 / 255]);
    tintBlack.setValue([25 / 255, 0, 0]);

    app.endUndoGroup();
};

const createIsraelMap = (): void => {
    app.beginUndoGroup('@@name: Create Israel Map');

    const vertices: [number, number][] = [
        [163.25, -515.875],
        [150.375, -508.625],
        [140.625, -513.75],
        [131.875, -477.625],
        [125.75, -463.25],
        [113, -462.875],
        [92.125, -456.625],
        [76.5, -469.375],
        [33.7499847412109, -465.25],
        [33.7499847412109, -438.75],
        [31.2500152587891, -391],
        [0.5, -393.5],
        [-174, 22.0001220703125],
        [-107.5, 199.5],
        [-102.5, 242.75],
        [-25.5000152587891, 450],
        [-18.4999847412109, 487],
        [-21.75, 498.25],
        [-12.9999694824219, 523.25],
        [14.7499542236328, 471.750061035156],
        [26.2499694824219, 422.000061035156],
        [32.5, 390.749938964844],
        [44.0000457763672, 366.750061035156],
        [43.6249389648438, 342.75],
        [45.625, 304.749938964844],
        [55.4999389648438, 282.750061035156],
        [54.4999847412109, 252.750061035156],
        [57.875, 225.625],
        [78.75, 178.000122070312],
        [90, 164.375],
        [88.75, 151.375],
        [99.625, 130.75],
        [112.375, 107.125],
        [112.625, 74.2498779296875],
        [104.125, 38.6246948242188],
        [120.125, 2.375],
        [124.25, -52.5],
        [141, -98.5],
        [131.5, -173],
        [141.25, -216.000122070312],
        [139, -267],
        [144, -315.375],
        [142, -342.5],
        [204.375, -395.625],
        [222, -430.5],
        [203.875, -467.75],
        [192.625, -515.5],
        [185.75, -531.75]
    ];
    const inTangents: [number, number][] = [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [15, 0],
        [136.345733642578, -103.107299804688],
        [-6, -14.5],
        [0, 0],
        [-3.99998474121094, -14.0000610351562],
        [-0.25001525878906, -5.5],
        [-0.74998474121094, -3],
        [0, 0],
        [-2.87495422363281, 8.62493896484375],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0]
    ];
    const outTangents: [number, number][] = [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [-10.6641082763672, 56.8751831054688],
        [20.5, 56.4998779296875],
        [6, 14.5],
        [0, 0],
        [0, 0],
        [0.24996948242188, 5.5],
        [0.75004577636719, 3],
        [0, 0],
        [0, 0],
        [1.27046203613281, -3.81146240234375],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0]
    ];

    createAnimatedMap('Israel_Map', vertices, inTangents, outTangents);

    app.endUndoGroup();
};

const createGazaMap = (): void => {
    app.beginUndoGroup('@@name: Create Gaza Map');

    const vertices: [number, number][] = [
        [209.749725341797, -480.25],
        [128.999969482422, -358],
        [34.9997253417969, -236.500030517578],
        [-200.499862670898, 27.0000915527344],
        [-384.75, 215.25],
        [-348.75, 282],
        [-339.25, 283.25],
        [-279.75, 480.25],
        [-229.25, 427.25],
        [-166.25, 394],
        [-113.000061035156, 327],
        [-61.4999694824219, 297.75],
        [-46.7499084472656, 256.5],
        [-65.5000915527344, 111.25],
        [-51.7500610351562, 94.25],
        [-40.7499694824219, 63.5],
        [-32.4999389648438, 42.5],
        [-7.5, 19.4994812011719],
        [21.7500915527344, -17.2499084472656],
        [41.2499694824219, -34.7502746582031],
        [78.0000915527344, -63.2501831054688],
        [87.5, -81.9997863769531],
        [110.499786376953, -95.9999694824219],
        [185.999847412109, -183.250061035156],
        [255.250091552734, -241.000427246094],
        [286.500091552734, -246.750015258789],
        [305.749969482422, -261.75],
        [334.749969482422, -272.75],
        [361.249969482422, -315],
        [376.999969482422, -342.75]
    ];
    const inTangents: [number, number][] = [
        [0, 0],
        [16, -17],
        [20.0003051757812, -24.9999694824219],
        [26.1709289550781, -21.6585388183594],
        [-0.00003051757812, 0],
        [-0.00003051757812, 0],
        [-0.00003051757812, 0],
        [-3, -10.75],
        [-6.25, 7],
        [-32.25, 16],
        [-4.99993896484375, 4.5],
        [-4.75006103515625, 2.75],
        [-1.75006103515625, 9.5],
        [0.7501220703125, 10.75],
        [-5.24990844726562, 2.5],
        [-8.00003051757812, 7],
        [-1.00006103515625, 3],
        [-6.25, 6.50033569335938],
        [-11.5, 7.50003051757812],
        [-5.74993896484375, 5.750244140625],
        [-5.25009155273438, 4.50042724609375],
        [-4.75021362304688, 5.99954223632812],
        [-13.4996948242188, 4.75009155273438],
        [-19.249755859375, 11.0000915527344],
        [-8.25, 4.25041198730469],
        [-3.5001220703125, 1.49983215332031],
        [-7.2498779296875, 5.25],
        [-3.5, 5],
        [-11.5, 8.5],
        [0, 0]
    ];
    const outTangents: [number, number][] = [
        [0, 0],
        [-14.5387573242188, 15.4473876953125],
        [-19.9996643066406, 25.0000305175781],
        [-29.0001373291016, 23.9999084472656],
        [-0.00003051757812, 0],
        [-0.00003051757812, 0],
        [-0.00003051757812, 0],
        [5.75, -3.5],
        [6.25, -7],
        [32.2499694824219, -16],
        [4.99996948242188, -4.5],
        [4.75, -2.75],
        [-0.74993896484375, -10.75],
        [1.74981689453125, -9.5],
        [5.25003051757812, -2.5],
        [7.9998779296875, -7],
        [1.00003051757812, -3],
        [6.24990844726562, -6.49966430664062],
        [11.4999694824219, -7.50054931640625],
        [5.74990844726562, -5.749755859375],
        [5.24984741210938, -4.49981689453125],
        [4.74993896484375, -6.00039672851562],
        [13.5004577636719, -4.74996948242188],
        [19.2501220703125, -10.9999694824219],
        [8.2498779296875, -4.249755859375],
        [3.499755859375, -1.50028991699219],
        [7.25, -5.25],
        [3.5, -5],
        [11.5, -8.5],
        [0, 0]
    ];

    createAnimatedMap('Gaza_Map', vertices, inTangents, outTangents);

    app.endUndoGroup();
};

const createCountingText = (): void => {
    app.beginUndoGroup('@@name: Counting Numbers');

    const comp = app.project.activeItem as CompItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert('No Composition Selected');
        return;
    }

    const layer = comp.layers.addSolid(
        [1, 1, 1],
        'Numbers',
        comp.width,
        comp.height,
        1
    );
    layer.inPoint = comp.time;
    layer.name = 'Numbers';

    const fx = layer.property('ADBE Effect Parade') as PropertyGroup;
    const numFx = fx.addProperty('ADBE Numbers2');

    const decPointsProp = numFx.property(
        'ADBE Numbers2-0004'
    ) as Property<number>;
    decPointsProp.setValue(0);

    const fillProp = numFx.property('ADBE Numbers2-0008') as Property<
        [number, number, number]
    >;
    fillProp.setValue([255, 255, 255]);

    const sizeProp = numFx.property('ADBE Numbers2-0006') as Property<number>;
    sizeProp.setValue(150);

    const numValProp = numFx.property('ADBE Numbers2-0003') as Property<number>;

    numValProp.setValueAtTime(layer.inPoint, 0);
    numValProp.setValueAtTime((1 / comp.frameRate) * 40 + layer.inPoint, 99);

    numValProp.setTemporalEaseAtKey(1, [new KeyframeEase(0, 20)]);
    numValProp.setTemporalEaseAtKey(2, [new KeyframeEase(0, 75)]);

    app.endUndoGroup();
};

const importIsraelGoogleMaps = (): void => {
    app.beginUndoGroup('@@name: Import Israel Map');
    importGoogleMaps('Israel');
    app.endUndoGroup();
};

const importGazaGoogleMaps = (): void => {
    app.beginUndoGroup('@@name: Import Gaza Map');
    importGoogleMaps('Gaza');
    app.endUndoGroup();
};

const createAnimatedFrame = (): void => {
    app.beginUndoGroup('@@name: Animated Frame');

    const comp = app.project.activeItem as CompItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert('No Composition Selected');
        return;
    }

    const layer = comp.layers.addShape();
    layer.name = 'Frame';
    layer.inPoint = comp.time;

    const contents = layer.property('ADBE Root Vectors Group') as PropertyGroup;
    const shapeGrp = contents.addProperty('ADBE Vector Group');
    shapeGrp.name = 'Frame';

    const xSlider = layer.effect.addProperty(
        'ADBE Slider Control'
    ) as Property<any>;
    xSlider.name = 'Size X';
    const xSliderProp = xSlider.property(
        'ADBE Slider Control-0001'
    ) as Property<any>;
    xSliderProp.setValue(100);

    const ySlider = layer.effect.addProperty(
        'ADBE Slider Control'
    ) as Property<any>;
    ySlider.name = 'Size Y';
    const ySliderProp = ySlider.property(
        'ADBE Slider Control-0001'
    ) as Property<any>;
    ySliderProp.setValue(100);

    const lineGrp = shapeGrp.property('ADBE Vectors Group') as PropertyGroup;
    const rectGrp = lineGrp.addProperty('ADBE Vector Shape - Rect');
    const rectSize = rectGrp.property('ADBE Vector Rect Size') as Property<
        [number, number]
    >;

    rectSize.expression =
        '[effect("Size X")("Slider"), effect("Size Y")("Slider")]';

    const myStroke = lineGrp.addProperty(
        'ADBE Vector Graphic - Stroke'
    ) as PropertyGroup;
    const strokeWidth = myStroke.property(
        'ADBE Vector Stroke Width'
    ) as Property<number>;
    strokeWidth.setValue(10);
    const strokeColor = myStroke.property(
        'ADBE Vector Stroke Color'
    ) as Property<[number, number, number]>;
    strokeColor.setValue([1, 1, 1]);

    const parentGrp = contents
        .property('Frame')
        .property('ADBE Vectors Group') as PropertyGroup;
    const trimPathsGrp = parentGrp.addProperty('ADBE Vector Filter - Trim');
    const trimPathsEnd = trimPathsGrp.property(
        'ADBE Vector Trim End'
    ) as Property<number>;
    trimPathsEnd.setValueAtTime(0, 0);
    trimPathsEnd.setValueAtTime((1 / comp.frameRate) * 30, 100);

    trimPathsEnd.setTemporalEaseAtKey(
        1,
        [new KeyframeEase(0, 34)],
        [new KeyframeEase(0, 34)]
    );
    trimPathsEnd.setTemporalEaseAtKey(
        2,
        [new KeyframeEase(0, 92)],
        [new KeyframeEase(0, 92)]
    );

    const trimPathsOffset = trimPathsGrp.property(
        'ADBE Vector Trim Offset'
    ) as Property<number>;
    trimPathsOffset.setValueAtTime(0, -324);
    trimPathsOffset.setValueAtTime((1 / comp.frameRate) * 32, 0);

    trimPathsOffset.setTemporalEaseAtKey(
        1,
        [new KeyframeEase(0, 24)],
        [new KeyframeEase(0, 24)]
    );
    trimPathsOffset.setTemporalEaseAtKey(
        2,
        [new KeyframeEase(0, 72)],
        [new KeyframeEase(0, 72)]
    );

    app.endUndoGroup();
};

const openProjectInFinder = (): void => {
    const containsHebrew = (str: string) => /[\u0590-\u05FF]/.test(str);

    const writeSelectDialogToPrefs = (): void => {
        const selFolder = Folder.selectDialog('Select Project Folder');
        if (!selFolder) return;
        if (containsHebrew(selFolder.fsName)) {
            alert(
                "Sorry, can't choose this folder beacuse it contains Hebrew characters"
            );
            return;
        }
        writePrefsToMemory({ projectFolderPath: selFolder.fsName });
    };

    const keyState = ScriptUI.environment.keyboardState;
    const modKey = getOS() === 'Win' ? keyState.ctrlKey : keyState.metaKey;

    if (modKey) {
        writeSelectDialogToPrefs();
    } else {
        const parsedPrefs = parsePrefs();
        const path = parsedPrefs.projectFolderPath;
        if (!path) {
            const conf = confirm(
                'No folder selected yet.\nWould you like to choose now?'
            );
            if (conf) writeSelectDialogToPrefs();
        } else {
            openFs(path);
        }
    }
};

const createTatzaPath = (): void => {
    app.beginUndoGroup('@@name: Location Mark');

    const comp = app.project.activeItem as CompItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert('No Composition Selected');
        return;
    }

    const layer = comp.layers.addShape();
    layer.name = 'Location_Mark';
    layer.inPoint = comp.time;

    const contents = layer.property('ADBE Root Vectors Group') as PropertyGroup;
    const shapeGrp = contents.addProperty('ADBE Vector Group');
    shapeGrp.name = 'Location_Mark_Stroke';

    const lineGrp = shapeGrp.property('ADBE Vectors Group') as PropertyGroup;
    const pathGrp = lineGrp.addProperty('ADBE Vector Shape - Group');
    const linePath = pathGrp.property('ADBE Vector Shape') as Property<any>;

    const myShape = new Shape();
    const baseNum = Math.min(comp.width, comp.height) / 4;
    myShape.vertices = [
        [baseNum, -baseNum],
        [baseNum, baseNum],
        [-baseNum, baseNum],
        [-baseNum, -baseNum]
    ];
    myShape.closed = true;

    linePath.setValue(myShape);

    const myStroke = lineGrp.addProperty(
        'ADBE Vector Graphic - Stroke'
    ) as Property<any>;
    const strokeWidth = myStroke.property(
        'ADBE Vector Stroke Width'
    ) as Property<any>;
    strokeWidth.setValue(10);

    const dashesProp = myStroke.property(
        'ADBE Vector Stroke Dashes'
    ) as PropertyGroup;
    const dashOne = dashesProp.addProperty(
        'ADBE Vector Stroke Dash 1'
    ) as Property<any>;
    dashOne.setValue(25);
    const dashOffset = dashesProp.addProperty(
        'ADBE Vector Stroke Offset'
    ) as Property<any>;
    dashOffset.expression = 'time * effect("Speed")("Slider")';

    const slider = layer.effect.addProperty(
        'ADBE Slider Control'
    ) as Property<any>;
    slider.name = 'Speed';
    const sliderVal = slider.property(
        'ADBE Slider Control-0001'
    ) as Property<any>;
    sliderVal.setValue(-100);
    sliderVal.expression =
        'var endProp = content("Location_Mark_Stroke").content("Trim Paths 1").end;\n' +
        'var speedSlider = effect("Speed")("Slider");\n' +
        'linear(endProp, 100, 0, 0, speedSlider)';

    const parentGrp = contents
        .property('Location_Mark_Stroke')
        .property('ADBE Vectors Group') as PropertyGroup;
    const trimPathsGrp = parentGrp.addProperty('ADBE Vector Filter - Trim');
    const trimPathsEnd = trimPathsGrp.property(
        'ADBE Vector Trim End'
    ) as Property<number>;
    trimPathsEnd.setValueAtTime(0, 0);
    trimPathsEnd.setValueAtTime((1 / comp.frameRate) * 30, 100);

    trimPathsEnd.setTemporalEaseAtKey(
        1,
        [new KeyframeEase(0, 33)],
        [new KeyframeEase(0, 33)]
    );
    trimPathsEnd.setTemporalEaseAtKey(
        2,
        [new KeyframeEase(0, 88)],
        [new KeyframeEase(0, 88)]
    );

    layer
        .property('ADBE Root Vectors Group')
        .property('ADBE Vector Group')
        .property('ADBE Vectors Group')
        .property('ADBE Vector Shape - Group').selected = true;

    app.endUndoGroup();
};

const recScaleX = (): void => {
    app.beginUndoGroup('@@name: Create Background');

    const comp = app.project.activeItem as CompItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert('No Composition Selected');
        return;
    }

    const layer = comp.layers.addShape();
    layer.name = 'Rec';
    layer.inPoint = comp.time;

    const xSlider = layer.effect.addProperty(
        'ADBE Slider Control'
    ) as Property<any>;
    xSlider.name = 'Size X';
    const xSliderProp = xSlider.property(
        'ADBE Slider Control-0001'
    ) as Property<any>;
    xSliderProp.setValue(100);

    const ySlider = layer.effect.addProperty(
        'ADBE Slider Control'
    ) as Property<number>;
    ySlider.name = 'Size Y';
    const ySliderProp = ySlider.property(
        'ADBE Slider Control-0001'
    ) as Property<number>;
    ySliderProp.setValue(100);

    const contents = layer.property('ADBE Root Vectors Group') as PropertyGroup;
    const grp = contents.addProperty('ADBE Vector Group') as PropertyGroup;
    grp.name = 'Rectangle 1';
    const recGrp = grp.property('ADBE Vectors Group') as PropertyGroup;

    const recShape = recGrp.addProperty('ADBE Vector Shape - Rect');
    const recSize = recShape.property('ADBE Vector Rect Size') as Property<
        [number, number]
    >;
    recSize.expression =
        '[effect("Size X")("Slider"), effect("Size Y")("Slider")]';

    const myFill = recGrp.addProperty(
        'ADBE Vector Graphic - Fill'
    ) as PropertyGroup;
    const fillColor = myFill.property('ADBE Vector Fill Color') as Property<
        [number, number, number]
    >;
    fillColor.setValue([1, 1, 1]);

    const scaleProp = layer
        .property('ADBE Transform Group')
        .property('ADBE Scale') as Property<[number, number]>;

    scaleProp.setValueAtTime(0, [0, 100]);
    scaleProp.setValueAtTime((1 / comp.frameRate) * 14, [100, 100]);

    const ease1 = new KeyframeEase(0, 65);
    const ease2 = new KeyframeEase(0, 92);
    scaleProp.setTemporalEaseAtKey(
        1,
        [ease1, ease1, ease1],
        [ease1, ease1, ease1]
    );
    scaleProp.setTemporalEaseAtKey(
        2,
        [ease2, ease2, ease2],
        [ease2, ease2, ease2]
    );

    app.endUndoGroup();
};

const createTextOnLocation = (): void => {
    const comp = app.project.activeItem as CompItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert('No Composition Selected');
        return;
    }

    const promptVal = prompt('Write Text Here:', '');

    app.beginUndoGroup('@@name: Text On Location');

    // === Circle ===
    const circleLayer = comp.layers.addShape();
    circleLayer.name = `${promptVal} - Circle`;
    circleLayer.inPoint = comp.time;

    const circleContents = circleLayer.property(
        'ADBE Root Vectors Group'
    ) as PropertyGroup;
    const circleShapeGrp = circleContents.addProperty('ADBE Vector Group');
    circleShapeGrp.name = 'Circle';

    const circleInnerShapeGrp = circleShapeGrp.property(
        'ADBE Vectors Group'
    ) as PropertyGroup;
    const circleEllipseGrp = circleInnerShapeGrp.addProperty(
        'ADBE Vector Shape - Ellipse'
    );
    const circleEllipseSize = circleEllipseGrp.property(
        'ADBE Vector Ellipse Size'
    ) as Property<[number, number]>;
    circleEllipseSize.setValue([50.4149, 50.4149]);

    const circleStroke = circleInnerShapeGrp.addProperty(
        'ADBE Vector Graphic - Stroke'
    ) as PropertyGroup;
    const circleStrokeWidth = circleStroke.property(
        'ADBE Vector Stroke Width'
    ) as Property<number>;
    circleStrokeWidth.setValue(14);

    const circleScale = circleLayer
        .property('ADBE Transform Group')
        .property('ADBE Scale') as Property<[number, number]>;

    circleScale.setValueAtTime(comp.time, [0, 0]);
    circleScale.setValueAtTime(
        (1 / comp.frameRate) * 7 + comp.time,
        [114.3096, 114.3096]
    );
    circleScale.setValueAtTime(
        (1 / comp.frameRate) * 15 + comp.time,
        [92.2582, 92.2582]
    );
    circleScale.setValueAtTime(
        (1 / comp.frameRate) * 22 + comp.time,
        [104.8933, 104.8933]
    );
    circleScale.setValueAtTime(
        (1 / comp.frameRate) * 28 + comp.time,
        [98.3702, 98.3702]
    );
    circleScale.setValueAtTime(
        (1 / comp.frameRate) * 36 + comp.time,
        [100, 100]
    );

    const scaleEase1 = new KeyframeEase(0, 56);
    const scaleEase2 = new KeyframeEase(0, 57);
    const scaleEase3 = new KeyframeEase(0, 52.5);
    const scaleEase4 = new KeyframeEase(0, 48);
    const scaleEase5 = new KeyframeEase(0, 45);
    const scaleEase6 = new KeyframeEase(0, 47);
    circleScale.setTemporalEaseAtKey(
        1,
        [scaleEase1, scaleEase1, scaleEase1],
        [scaleEase1, scaleEase1, scaleEase1]
    );
    circleScale.setTemporalEaseAtKey(
        2,
        [scaleEase2, scaleEase2, scaleEase2],
        [scaleEase2, scaleEase2, scaleEase2]
    );
    circleScale.setTemporalEaseAtKey(
        3,
        [scaleEase3, scaleEase3, scaleEase3],
        [scaleEase3, scaleEase3, scaleEase3]
    );
    circleScale.setTemporalEaseAtKey(
        4,
        [scaleEase4, scaleEase4, scaleEase4],
        [scaleEase4, scaleEase4, scaleEase4]
    );
    circleScale.setTemporalEaseAtKey(
        5,
        [scaleEase5, scaleEase5, scaleEase5],
        [scaleEase5, scaleEase5, scaleEase5]
    );
    circleScale.setTemporalEaseAtKey(
        6,
        [scaleEase6, scaleEase6, scaleEase6],
        [scaleEase6, scaleEase6, scaleEase6]
    );

    const circlePos = circleLayer
        .property('ADBE Transform Group')
        .property('ADBE Position') as Property<[number, number]>;
    circlePos.setValue([621.2241, 597.2879]);

    // === Line ===
    const lineLayer = comp.layers.addShape();
    lineLayer.name = `${promptVal} - Line`;
    lineLayer.inPoint = (1 / comp.frameRate) * 3 + comp.time;

    const lineContents = lineLayer.property(
        'ADBE Root Vectors Group'
    ) as PropertyGroup;

    createPathGrp(
        lineContents,
        'Line',
        false,
        true,
        [0, 0, 0],
        [255, 255, 255],
        14,
        [
            [-311, 27.7985687255859],
            [-61.0000915527344, 28.0378570556641],
            [97, -206.037857055664]
        ],
        [
            [0, 0],
            [0, 0],
            [0, 0]
        ],
        [
            [0, 0],
            [0, 0],
            [0, 0]
        ],
        false,
        [0, 0]
    );

    const myStroke = lineContents
        .property('Line')
        .property('ADBE Vectors Group')
        .property('ADBE Vector Graphic - Stroke') as Property<number>;

    const lineCapProp = myStroke.property(
        'ADBE Vector Stroke Line Cap'
    ) as Property<number>;
    lineCapProp.setValue(2);

    const lineJoinProp = myStroke.property(
        'ADBE Vector Stroke Line Join'
    ) as Property<number>;
    lineJoinProp.setValue(2);

    const parentGrp = lineContents
        .property('Line')
        .property('ADBE Vectors Group') as PropertyGroup;
    const trimPathsGrp = parentGrp.addProperty('ADBE Vector Filter - Trim');
    const trimPathsEnd = trimPathsGrp.property(
        'ADBE Vector Trim End'
    ) as Property<number>;
    trimPathsEnd.setValueAtTime((1 / comp.frameRate) * 3 + comp.time, 0);
    trimPathsEnd.setValueAtTime((1 / comp.frameRate) * 16 + comp.time, 100);

    trimPathsEnd.setTemporalEaseAtKey(
        1,
        [new KeyframeEase(0, 44)],
        [new KeyframeEase(0, 44)]
    );
    trimPathsEnd.setTemporalEaseAtKey(
        2,
        [new KeyframeEase(0, 93)],
        [new KeyframeEase(0, 93)]
    );

    const linePos = lineLayer
        .property('ADBE Transform Group')
        .property('ADBE Position') as Property<[number, number]>;
    linePos.setValue([852, 480.5379]);
    const lineAnchor = lineLayer
        .property('ADBE Transform Group')
        .property('ADBE Anchor Point') as Property<[number, number]>;
    lineAnchor.setValue([-108, -89]);

    // === Rectangle ===
    const recLayer = comp.layers.addShape();
    recLayer.name = `${promptVal} - Rectangle`;
    recLayer.inPoint = (1 / comp.frameRate) * 12 + comp.time;

    const recContents = recLayer.property(
        'ADBE Root Vectors Group'
    ) as PropertyGroup;
    const recShapeGrp = recContents.addProperty('ADBE Vector Group');
    recShapeGrp.name = 'Rectangle';

    const recInnerShapeGrp = recShapeGrp.property(
        'ADBE Vectors Group'
    ) as PropertyGroup;
    const recRectangleGrp = recInnerShapeGrp.addProperty(
        'ADBE Vector Shape - Rect'
    );
    const recRectangleRoundness = recRectangleGrp.property(
        'ADBE Vector Rect Roundness'
    ) as Property<number>;
    recRectangleRoundness.setValue(32);

    const recFill = recInnerShapeGrp.addProperty(
        'ADBE Vector Graphic - Fill'
    ) as PropertyGroup;
    const recFillColor = recFill.property('ADBE Vector Fill Color') as Property<
        [number, number, number]
    >;
    recFillColor.setValue([1, 1, 1]);

    const recRectangleSize = recLayer
        .property('ADBE Root Vectors Group')
        .property('ADBE Vector Group')
        .property('ADBE Vectors Group')
        .property('ADBE Vector Shape - Rect')
        .property('ADBE Vector Rect Size') as Property<[number, number]>;
    recRectangleSize.setValue([467, 169]);

    recRectangleSize.setValueAtTime(
        (1 / comp.frameRate) * 12 + comp.time,
        [0, 169]
    );
    recRectangleSize.setValueAtTime(
        (1 / comp.frameRate) * 41 + comp.time,
        [467, 169]
    );

    const easeOut = new KeyframeEase(0, 44);
    const easeIn = new KeyframeEase(0, 93);
    recRectangleSize.setTemporalEaseAtKey(
        1,
        [easeOut, easeOut],
        [easeOut, easeOut]
    );
    recRectangleSize.setTemporalEaseAtKey(
        2,
        [easeIn, easeIn],
        [easeIn, easeIn]
    );

    const recPos = recLayer
        .property('ADBE Transform Group')
        .property('ADBE Position') as Property<[number, number]>;
    recPos.setValue([1055.9803, 280.3122]);

    // === Text ===
    const textLayer = comp.layers.addText();
    textLayer.inPoint = (1 / comp.frameRate) * 12 + comp.time;

    const srcText = textLayer
        .property('ADBE Text Properties')
        .property('ADBE Text Document') as Property<any>;

    srcText.setValue(promptVal);
    const textDoc = srcText.value;

    if (containsHebrew(promptVal[0])) {
        textDoc.font = getFontFromLanguage('Hebrew');
    } else if (containsArabic(promptVal[0])) {
        textDoc.font = getFontFromLanguage('Arabic');
    } else {
        textDoc.font = getFontFromLanguage('English');
    }

    textDoc.fontSize = 145;
    textDoc.applyFill = true;
    textDoc.fillColor = [0, 0, 0];
    textDoc.applyStroke = false;
    textDoc.tracking = -20;
    srcText.setValue(textDoc);

    const posProp = textLayer
        .property('ADBE Transform Group')
        .property('ADBE Position') as Property<[number, number]>;
    const anchorProp = textLayer
        .property('ADBE Transform Group')
        .property('ADBE Anchor Point') as Property<[number, number]>;

    posProp.setValue([1055.9803, 280.3122]);
    anchorProp.setValue([158.4607, -28.3756]);

    const setMatteEffect = textLayer.effect.addProperty('ADBE Set Matte3');
    const setMatteLayer = setMatteEffect.property(
        'ADBE Set Matte3-0001'
    ) as Property<number>;
    setMatteLayer.setValue(2);

    app.endUndoGroup();
};

const createArrow = (): void => {
    app.beginUndoGroup('@@name: Create Arrow');

    const comp = app.project.activeItem as CompItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert('No Composition Selected');
        return;
    }

    // === Line ===
    const lineLayer = comp.layers.addShape();
    lineLayer.name = 'Arrow_Line';
    lineLayer.inPoint = (1 / comp.frameRate) * 7 + comp.time;

    const lineContents = lineLayer.property(
        'ADBE Root Vectors Group'
    ) as PropertyGroup;

    createPathGrp(
        lineContents,
        'Arrow_Line',
        false,
        true,
        [0, 0, 0],
        [255, 255, 255],
        73,
        [
            [-550, -68],
            [-204, -68]
        ],
        [
            [0, 0],
            [0, 0]
        ],
        [
            [0, 0],
            [0, 0]
        ],
        false,
        [0, 0]
    );

    const parentGrp = lineContents
        .property('Arrow_Line')
        .property('ADBE Vectors Group') as PropertyGroup;
    const trimPathsGrp = parentGrp.addProperty('ADBE Vector Filter - Trim');
    const trimPathsEnd = trimPathsGrp.property(
        'ADBE Vector Trim End'
    ) as Property<number>;
    trimPathsEnd.setValueAtTime((1 / comp.frameRate) * 7 + comp.time, 0);
    trimPathsEnd.setValueAtTime((1 / comp.frameRate) * 20 + comp.time, 100);

    trimPathsEnd.setTemporalEaseAtKey(
        1,
        [new KeyframeEase(0, 30)],
        [new KeyframeEase(0, 30)]
    );
    trimPathsEnd.setTemporalEaseAtKey(
        2,
        [new KeyframeEase(0, 94)],
        [new KeyframeEase(0, 94)]
    );

    const linePos = lineLayer
        .property('ADBE Transform Group')
        .property('ADBE Position') as Property<[number, number]>;
    linePos.setValue([588, 471.5]);

    const lineAnchor = lineLayer
        .property('ADBE Transform Group')
        .property('ADBE Anchor Point') as Property<[number, number]>;
    lineAnchor.setValue([-372, -68]);

    // === Pointer ===
    const pointerLayer = comp.layers.addShape();
    pointerLayer.name = 'Arrow_Pointer';
    pointerLayer.inPoint = comp.time;

    const pointerContents = pointerLayer.property(
        'ADBE Root Vectors Group'
    ) as PropertyGroup;

    createPathGrp(
        pointerContents,
        'Arrow_Pointer',
        true,
        false,
        [255, 255, 255],
        [0, 0, 0],
        0,
        [
            [-207.039474487305, -96],
            [-111.539505004883, -0.5],
            [-207.039352416992, 95]
        ],
        [
            [0, 0],
            [0, 0],
            [0, 0]
        ],
        [
            [0, 0],
            [0, 0],
            [0, 0]
        ],
        true,
        [0.5, -68.5]
    );

    const pointerPos = pointerLayer
        .property('ADBE Transform Group')
        .property('ADBE Position') as Property<[number, number]>;
    pointerPos.setValue([753.4605, 471.5]);
    pointerPos.dimensionsSeparated = true;

    const pointerAnchor = pointerLayer
        .property('ADBE Transform Group')
        .property('ADBE Anchor Point') as Property<[number, number]>;
    pointerAnchor.setValue([-206.5395, -69]);

    const pointerXPos = pointerLayer
        .property('ADBE Transform Group')
        .property('ADBE Position_0') as Property<number>;
    pointerXPos.setValueAtTime((1 / comp.frameRate) * 7 + comp.time, 410.4605);
    pointerXPos.setValueAtTime((1 / comp.frameRate) * 20 + comp.time, 753.4605);

    pointerXPos.setTemporalEaseAtKey(
        1,
        [new KeyframeEase(0, 30)],
        [new KeyframeEase(0, 30)]
    );
    pointerXPos.setTemporalEaseAtKey(
        2,
        [new KeyframeEase(0, 94)],
        [new KeyframeEase(0, 94)]
    );

    const pointerScale = pointerLayer
        .property('ADBE Transform Group')
        .property('ADBE Scale') as Property<[number, number]>;
    pointerScale.setValueAtTime(0, [0, 0]);
    pointerScale.setValueAtTime(
        (1 / comp.frameRate) * 7 + comp.time,
        [55.4514, 55.4514]
    );
    pointerScale.setValueAtTime(
        (1 / comp.frameRate) * 20 + comp.time,
        [100, 100]
    );

    pointerScale.setTemporalEaseAtKey(
        1,
        [
            new KeyframeEase(0, 46),
            new KeyframeEase(0, 46),
            new KeyframeEase(0, 46)
        ],
        [
            new KeyframeEase(0, 46),
            new KeyframeEase(0, 46),
            new KeyframeEase(0, 46)
        ]
    );
    pointerScale.setTemporalEaseAtKey(
        2,
        [
            new KeyframeEase(0, 63),
            new KeyframeEase(0, 63),
            new KeyframeEase(0, 63)
        ],
        [
            new KeyframeEase(0, 30),
            new KeyframeEase(0, 30),
            new KeyframeEase(0, 30)
        ]
    );
    pointerScale.setTemporalEaseAtKey(
        3,
        [
            new KeyframeEase(0, 94),
            new KeyframeEase(0, 94),
            new KeyframeEase(0, 94)
        ],
        [
            new KeyframeEase(0, 94),
            new KeyframeEase(0, 94),
            new KeyframeEase(0, 94)
        ]
    );

    app.endUndoGroup();
};

const createMikra = (): void => {
    app.beginUndoGroup('@@name: Create Mikra');

    const comp = app.project.activeItem as CompItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert('No Composition Selected');
        return;
    }

    /* BG */
    const bgLayer = comp.layers.addShape();
    bgLayer.name = 'Mikra_BG';
    bgLayer.inPoint = comp.time;

    const xSlider = bgLayer.effect.addProperty(
        'ADBE Slider Control'
    ) as Property<any>;
    xSlider.name = 'Size X';
    const xSliderProp = xSlider.property(
        'ADBE Slider Control-0001'
    ) as Property<any>;
    xSliderProp.setValue(1130);

    const ySlider = bgLayer.effect.addProperty(
        'ADBE Slider Control'
    ) as Property<number>;
    ySlider.name = 'Size Y';
    const ySliderProp = ySlider.property(
        'ADBE Slider Control-0001'
    ) as Property<number>;
    ySliderProp.setValue(360);

    const contents = bgLayer.property(
        'ADBE Root Vectors Group'
    ) as PropertyGroup;
    const grp = contents.addProperty('ADBE Vector Group') as PropertyGroup;
    grp.name = 'Rectangle 1';
    const recGrp = grp.property('ADBE Vectors Group') as PropertyGroup;

    const recShape = recGrp.addProperty('ADBE Vector Shape - Rect');
    const recSize = recShape.property('ADBE Vector Rect Size') as Property<
        [number, number]
    >;
    recSize.expression =
        '[effect("Size X")("Slider"), effect("Size Y")("Slider")]';

    const myFill = recGrp.addProperty(
        'ADBE Vector Graphic - Fill'
    ) as PropertyGroup;
    const fillColor = myFill.property('ADBE Vector Fill Color') as Property<
        [number, number, number]
    >;
    fillColor.setValue([1, 1, 1]);

    const shapeAnchorProp = grp
        .property('ADBE Vector Transform Group')
        .property('ADBE Vector Anchor') as Property<[number, number]>;
    shapeAnchorProp.expression =
        'var size = content("Rectangle 1").content("Rectangle Path 1").size;\n[size[0] / 2, size[1] / 2]';

    const shapePosProp = grp
        .property('ADBE Vector Transform Group')
        .property('ADBE Vector Position') as Property<[number, number]>;
    shapePosProp.expression = '[thisComp.width / 2, thisComp.height / 2]';

    const layerPos = bgLayer
        .property('ADBE Transform Group')
        .property('ADBE Position') as Property<[number, number]>;
    layerPos.dimensionsSeparated = true;

    const layerXPos = bgLayer
        .property('ADBE Transform Group')
        .property('ADBE Position_0') as Property<number>;
    layerXPos.setValue(comp.width);

    const layerYPos = bgLayer
        .property('ADBE Transform Group')
        .property('ADBE Position_1') as Property<number>;
    // layerYPos.setValue(comp.height);
    layerYPos.setValueAtTime(comp.time, comp.height + 450);
    layerYPos.setValueAtTime(
        (1 / comp.frameRate) * 15 + comp.time,
        comp.height
    );

    layerYPos.setTemporalEaseAtKey(2, [new KeyframeEase(0, 88)]);

    const layerAnchor = bgLayer
        .property('ADBE Transform Group')
        .property('ADBE Anchor Point') as Property<[number, number]>;
    layerAnchor.setValue([comp.width / 2, comp.height / 2]);

    /* Icons */
    const createIconGuide = (
        index: number,
        pos: [number, number]
    ): ShapeLayer => {
        const circleLayer = comp.layers.addShape();
        circleLayer.name = `Mikra_Icon_0${index}`;
        circleLayer.parent = bgLayer;
        circleLayer.guideLayer = true;
        circleLayer.inPoint = comp.time;

        const circleContents = circleLayer.property(
            'ADBE Root Vectors Group'
        ) as PropertyGroup;
        const circleShapeGrp = circleContents.addProperty('ADBE Vector Group');
        circleShapeGrp.name = 'Circle';

        const circleInnerShapeGrp = circleShapeGrp.property(
            'ADBE Vectors Group'
        ) as PropertyGroup;
        const circleEllipseGrp = circleInnerShapeGrp.addProperty(
            'ADBE Vector Shape - Ellipse'
        ) as PropertyGroup;
        const circleEllipseSize = circleEllipseGrp.property(
            'ADBE Vector Ellipse Size'
        ) as Property<[number, number]>;
        circleEllipseSize.setValue([100, 100]);

        const myFill = circleInnerShapeGrp.addProperty(
            'ADBE Vector Graphic - Fill'
        ) as PropertyGroup;
        const fillColor = myFill.property('ADBE Vector Fill Color') as Property<
            [number, number, number]
        >;
        fillColor.setValue([1, 0, 0]);

        const layerAnchor = circleLayer
            .property('ADBE Transform Group')
            .property('ADBE Anchor Point') as Property<[number, number]>;
        layerAnchor.setValue([0, 0]);

        const layerPos = circleLayer
            .property('ADBE Transform Group')
            .property('ADBE Position') as Property<[number, number]>;
        layerPos.setValue(pos);

        return circleLayer;
    };

    createIconGuide(1, [830, 292]);
    createIconGuide(2, [370, 292]);
    createIconGuide(3, [830, 442]);
    createIconGuide(4, [370, 442]);

    /* Text */
    const createText = (text: string, textPos: [number, number]): TextLayer => {
        const textLayer = comp.layers.addText();
        textLayer.parent = bgLayer;
        textLayer.inPoint = comp.time;

        const srcText = textLayer
            .property('ADBE Text Properties')
            .property('ADBE Text Document') as Property<any>;

        srcText.setValue(text);
        const textDoc = srcText.value;
        textDoc.font = 'NarkisBlockCondensedMF-Bold';
        textDoc.fontSize = 90;
        textDoc.applyFill = true;
        textDoc.fillColor = [0, 0, 0];
        textDoc.applyStroke = false;
        textDoc.tracking = -31;
        srcText.setValue(textDoc);

        const posProp = textLayer
            .property('ADBE Transform Group')
            .property('ADBE Position') as Property<[number, number]>;
        const anchorProp = textLayer
            .property('ADBE Transform Group')
            .property('ADBE Anchor Point') as Property<[number, number]>;

        posProp.setValue(textPos);
        anchorProp.setValue([80.8552, -18.3994]);

        return textLayer;
    };

    createText('טקסט 1', [682.3552, 292]);
    createText('טקסט 2', [222.1052, 292]);
    createText('טקסט 3', [682.3552, 442]);
    createText('טקסט 4', [222.1052, 442]);

    bgLayer.selected = true;

    app.endUndoGroup();
};

const createCameraNull = (): void => {
    app.beginUndoGroup('@@name: Create Camera Null');

    const comp = app.project.activeItem as CompItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert('No Composition Selected');
        return;
    }

    const theNull = comp.layers.addNull();
    theNull.name = theNull.source.name = 'Camera';
    const nullScale = theNull
        .property('ADBE Transform Group')
        .property('ADBE Scale') as Property<[number, number]>;

    nullScale.expression =
        'var t = value[0] + time * effect("Camera Zoom Speed")("Slider");\n[t, t]';

    const slider = theNull.effect.addProperty('ADBE Slider Control');
    slider.name = 'Camera Zoom Speed';
    const sliderVal = slider.property(
        'ADBE Slider Control-0001'
    ) as Property<number>;
    sliderVal.setValue(1.5);

    theNull.selected = false;
    for (let i = 2; i <= comp.numLayers; i++) {
        comp.layer(i).selected = !comp.layer(i).parent;
    }

    comp.time = 0;

    app.endUndoGroup();
};
