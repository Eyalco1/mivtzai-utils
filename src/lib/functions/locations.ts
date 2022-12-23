const createLocationBG = (
    id: LocationID,
    size: [number, number],
    color: [number, number, number] = [1, 1, 1]
): ShapeLayer => {
    const comp = app.project.activeItem as CompItem;
    const layer = comp.layers.addShape();
    layer.name = `${id}_BG`;
    const contents = layer.property('ADBE Root Vectors Group') as PropertyGroup;
    const grp = contents.addProperty('ADBE Vector Group');
    grp.name = `${id}_BG`;
    const recGrp = grp.property('ADBE Vectors Group') as PropertyGroup;
    recGrp.addProperty('ADBE Vector Shape - Rect') as PropertyGroup;

    const fillGrp = recGrp.addProperty(
        'ADBE Vector Graphic - Fill'
    ) as PropertyGroup;
    const fillProp = fillGrp.property('ADBE Vector Fill Color') as Property<
        [number, number, number]
    >;
    fillProp.setValue(color);

    const roundProp = recGrp
        .property('ADBE Vector Shape - Rect')
        .property('ADBE Vector Rect Roundness') as Property<number>;
    roundProp.setValue(25.7054);

    const sizeProp = recGrp
        .property('ADBE Vector Shape - Rect')
        .property('ADBE Vector Rect Size') as Property<[number, number]>;
    sizeProp.setValue(size);

    return layer;
};

const createLocationText = (
    lang: Lingo,
    text: string,
    fontSize: number,
    tracking: number,
    leading: number,
    textPos: [number, number],
    textAnchor: [number, number]
): TextLayer => {
    const comp = app.project.activeItem as CompItem;
    const textLayer = comp.layers.addText();
    const srcText = textLayer
        .property('ADBE Text Properties')
        .property('ADBE Text Document') as Property<any>;

    srcText.setValue(text);
    const textDoc = srcText.value;
    textDoc.font = getFontFromLanguage(lang);
    textDoc.fontSize = fontSize;
    textDoc.applyFill = true;
    textDoc.fillColor = [53 / 255, 33 / 255, 28 / 255];
    textDoc.applyStroke = false;
    textDoc.tracking = tracking;
    if (leading) {
        textDoc.leading = leading;
    }
    srcText.setValue(textDoc);

    const posProp = textLayer
        .property('ADBE Transform Group')
        .property('ADBE Position') as Property<[number, number]>;
    const anchorProp = textLayer
        .property('ADBE Transform Group')
        .property('ADBE Anchor Point') as Property<[number, number]>;

    posProp.setValue(textPos);
    anchorProp.setValue(textAnchor);

    return textLayer;
};

const createIconBase = (name: string): ShapeLayer => {
    const comp = app.project.activeItem as CompItem;
    const iconLayer = comp.layers.addShape();
    iconLayer.name = `${name}_Icon`;

    return iconLayer;
};

const setLayerTransform = (
    layer: Layer,
    pos: [number, number],
    anchor: [number, number],
    scale: number
): Layer => {
    const posProp = layer
        .property('ADBE Transform Group')
        .property('ADBE Position') as Property<[number, number]>;

    posProp.setValue(pos);

    const anchorProp = layer
        .property('ADBE Transform Group')
        .property('ADBE Anchor Point') as Property<[number, number]>;

    anchorProp.setValue(anchor);

    const scaleProp = layer
        .property('ADBE Transform Group')
        .property('ADBE Scale') as Property<[number, number]>;

    scaleProp.setValue([scale, scale]);

    return layer;
};

const createLocationIconFromId = (
    id: LocationID,
    iconPos: [number, number],
    iconAnchor: [number, number],
    iconScale: number
): ShapeLayer => {
    switch (id) {
        case 'Kindergarden':
            return createKindergardenIcon(iconPos, iconAnchor, iconScale, id);
        case 'Medical Clinic':
            return createMedicalIcon(iconPos, iconAnchor, iconScale, id);
        case 'Sports':
            return createSportsIcon(iconPos, iconAnchor, iconScale, id);
        case 'University':
            return createUniversityIcon(iconPos, iconAnchor, iconScale, id);
    }
};

const createLocation = (inputLang: Lingo, argsArr: LocationArgs[]): void => {
    const {
        bgSize,
        fontSize,
        lang,
        text,
        textAnchor,
        textPos,
        tracking,
        leading,
        iconAnchor,
        iconPos,
        iconScale,
        iconId
    } = argsArr.find(args => args.lang === inputLang);

    const bgLayer = createLocationBG(iconId, bgSize);
    const iconLayer = createLocationIconFromId(
        iconId,
        iconPos,
        iconAnchor,
        iconScale
    );
    const textLayer = createLocationText(
        lang,
        text,
        fontSize,
        tracking,
        leading,
        textPos,
        textAnchor
    );

    iconLayer.parent = textLayer.parent = bgLayer;
    bgLayer.label = iconLayer.label = textLayer.label = 11;
    iconLayer.selected = textLayer.selected = false;
    bgLayer.selected = true;
};

// ==========================

const createKindergardenIcon = (
    iconPos: [number, number],
    iconAnchor: [number, number],
    iconScale: number,
    name: LocationID
): ShapeLayer => {
    const iconLayer = createIconBase(name);

    const contents = iconLayer.property('Contents') as PropertyGroup;

    const createHouseMiddleHide = () => {
        const vertices: [number, number][] = [
            [0, 5.30056762695312],
            [0, 5.30056762695312],
            [-4.27423095703125, 1.02633666992188],
            [-4.27423095703125, -1.02633666992188],
            [0, -5.30056762695312],
            [0, -5.30056762695312],
            [4.27423095703125, -1.02633666992188],
            [4.27423095703125, 1.02633666992188]
        ];

        const inTangents: [number, number][] = [
            [2.360595703125, 0],
            [0, 0],
            [0, 2.360595703125],
            [0, 0],
            [-2.360595703125, 0],
            [0, 0],
            [0, -2.360595703125],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [-2.360595703125, 0],
            [0, 0],
            [0, -2.360595703125],
            [0, 0],
            [2.360595703125, 0],
            [0, 0],
            [0, 2.360595703125]
        ];

        createPathGrp(
            contents,
            'House_Middle_Hide',
            true,
            false,
            [53, 33, 28],
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [76.8601, -5.7216]
        );
    };

    const createLadderL = () => {
        const vertices: [number, number][] = [
            [-0.56208801269531, 13.8012847900391],
            [0.56208801269531, 13.8012847900391],
            [0.56208801269531, -13.8012847900391],
            [-0.56208801269531, -13.8012847900391]
        ];

        const inTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Ladder_L',
            true,
            false,
            [255, 255, 255],
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [57.6522, 11.2183]
        );
    };

    const createLadderR = () => {
        const vertices: [number, number][] = [
            [-0.56208801269531, 13.8012847900391],
            [0.56208801269531, 13.8012847900391],
            [0.56208801269531, -13.8012847900391],
            [-0.56208801269531, -13.8012847900391]
        ];

        const inTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Ladder_R',
            true,
            false,
            [255, 255, 255],
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [62.2776, 11.2183]
        );
    };

    const createLadder06 = () => {
        const vertices: [number, number][] = [
            [-2.874755859375, -0.65524291992188],
            [2.874755859375, -0.65524291992188],
            [2.874755859375, 0.65524291992188],
            [-2.874755859375, 0.65524291992188]
        ];

        const inTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Ladder_06',
            true,
            false,
            [255, 255, 255],
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [59.9649, 0.3872]
        );
    };

    const createLadder05 = () => {
        const vertices: [number, number][] = [
            [-2.874755859375, -0.65524291992188],
            [2.874755859375, -0.65524291992188],
            [2.874755859375, 0.65524291992188],
            [-2.874755859375, 0.65524291992188]
        ];

        const inTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Ladder_05',
            true,
            false,
            [255, 255, 255],
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [59.9649, 4.9116]
        );
    };

    const createLadder04 = () => {
        const vertices: [number, number][] = [
            [-2.874755859375, -0.65524291992188],
            [2.874755859375, -0.65524291992188],
            [2.874755859375, 0.65524291992188],
            [-2.874755859375, 0.65524291992188]
        ];

        const inTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Ladder_04',
            true,
            false,
            [255, 255, 255],
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [59.9649, 9.4359]
        );
    };

    const createLadder03 = () => {
        const vertices: [number, number][] = [
            [-2.874755859375, -0.65524291992188],
            [2.874755859375, -0.65524291992188],
            [2.874755859375, 0.65524291992188],
            [-2.874755859375, 0.65524291992188]
        ];

        const inTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Ladder_03',
            true,
            false,
            [255, 255, 255],
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [59.9649, 13.9603]
        );
    };

    const createLadder02 = () => {
        const vertices: [number, number][] = [
            [-2.874755859375, -0.65524291992188],
            [2.874755859375, -0.65524291992188],
            [2.874755859375, 0.65524291992188],
            [-2.874755859375, 0.65524291992188]
        ];

        const inTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Ladder_02',
            true,
            false,
            [255, 255, 255],
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [59.9649, 18.4846]
        );
    };

    const createLadder01 = () => {
        const vertices: [number, number][] = [
            [-2.874755859375, -0.65524291992188],
            [2.874755859375, -0.65524291992188],
            [2.874755859375, 0.65524291992188],
            [-2.874755859375, 0.65524291992188]
        ];

        const inTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Ladder_01',
            true,
            false,
            [255, 255, 255],
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [59.9649, 23.009]
        );
    };

    const createSlide = () => {
        const vertices: [number, number][] = [
            [9.17953491210938, 8.79170227050781],
            [-1.21762084960938, -1.0423583984375],
            [-11.4797973632812, -13.2806091308594],
            [-11.5624084472656, -13.2882843017578],
            [-11.5624084472656, -8.4593505859375],
            [-5.71575927734375, 0.44515991210938],
            [9.17953491210938, 13.2882843017578],
            [11.5624084472656, 11.0399932861328]
        ];

        const inTangents: [number, number][] = [
            [1.31709289550781, 0],
            [2.26652526855469, 6.09716796875],
            [6.39698791503906, 1.84429931640625],
            [0.02792358398438, 0.00700378417969],
            [0, 0],
            [-1.45497131347656, -3.91241455078125],
            [-10.1202392578125, 0],
            [0, 1.24160766601562]
        ];
        const outTangents: [number, number][] = [
            [-6.41560363769531, 0],
            [-1.81275939941406, -4.87202453613281],
            [-0.02792358398438, -0.00796508789062],
            [0, 0],
            [3.10542297363281, 1.55914306640625],
            [2.12690734863281, 5.72172546386719],
            [1.31709289550781, 0],
            [0, -1.24160766601562]
        ];

        createPathGrp(
            contents,
            'Slide',
            true,
            false,
            [255, 255, 255],
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [102.5002, 11.7313]
        );
    };

    const createHouseTop = () => {
        const vertices: [number, number][] = [
            [-0.16940307617188, -6.54544067382812],
            [-21.2740783691406, 5.97430419921875],
            [-21.1046600341797, 6.59190368652344],
            [21.1046600341797, 6.59190368652344],
            [21.2740783691406, 5.97430419921875],
            [0.16940307617188, -6.54544067382812]
        ];

        const inTangents: [number, number][] = [
            [0.10444641113281, -0.06195068359375],
            [0, 0],
            [-0.33763122558594, 0],
            [0, 0],
            [0, 0],
            [0.29039001464844, 0.17225646972656]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [-0.29039001464844, 0.17225646972656],
            [0, 0],
            [0.33763122558594, 0],
            [0, 0],
            [-0.10444641113281, -0.06195068359375]
        ];

        createPathGrp(
            contents,
            'House_Top',
            true,
            false,
            [255, 255, 255],
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [77.4369, -25.2672]
        );
    };

    const createHouseMiddle = () => {
        const vertices: [number, number][] = [
            [12.7078552246094, 10.8105163574219],
            [-12.7078552246094, 10.8105163574219],
            [-12.7078552246094, -10.8105163574219],
            [12.7078552246094, -10.8105163574219]
        ];

        const inTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'House_Middle',
            true,
            false,
            [255, 255, 255],
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [76.8601, -6.6124]
        );
    };

    const createHouseBottom = () => {
        const vertices: [number, number][] = [
            [12.7078399658203, -9.78457641601562],
            [7.62483215332031, -9.78457641601562],
            [-7.62483215332031, -9.78457641601562],
            [-12.7078399658203, -9.78457641601562],
            [-12.7078399658203, -4.70140075683594],
            [-12.7078399658203, 9.78457641601562],
            [-7.62483215332031, 9.78457641601562],
            [-7.62483215332031, 2.92341613769531],
            [0, -4.70140075683594],
            [0, -4.70140075683594],
            [7.62483215332031, 2.92341613769531],
            [7.62483215332031, 9.78457641601562],
            [12.7078399658203, 9.78457641601562],
            [12.7078399658203, -9.78457641601562]
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
            [-4.21107482910156, 0],
            [0, 0],
            [0, -4.21107482910156],
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
            [0, -4.21107482910156],
            [0, 0],
            [4.21107482910156, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'House_Bottom',
            true,
            false,
            [255, 255, 255],
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [76.8601, 15.235]
        );
    };

    const createIconCircle = () => {
        const vertices: [number, number][] = [
            [43.39892578125, 0],
            [0, 43.39892578125],
            [-43.39892578125, 0],
            [0, -43.39892578125]
        ];

        const inTangents: [number, number][] = [
            [0, -23.9685668945312],
            [23.9685668945312, 0],
            [0, 23.9685668945312],
            [-23.9685668945312, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 23.9685668945312],
            [-23.9685668945312, 0],
            [0, -23.9685668945312],
            [23.9685668945312, 0]
        ];

        createPathGrp(
            contents,
            'Icon_Circle',
            true,
            false,
            [53, 33, 28],
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [85.5764, -0.8716]
        );
    };

    createHouseMiddleHide();
    createLadderL();
    createLadderR();
    createLadder06();
    createLadder05();
    createLadder04();
    createLadder03();
    createLadder02();
    createLadder01();
    createSlide();
    createHouseTop();
    createHouseMiddle();
    createHouseBottom();
    createIconCircle();

    setLayerTransform(iconLayer, iconPos, iconAnchor, iconScale);

    return iconLayer;
};

const createKindergardenLocation = (lang: Lingo): void => {
    const args: LocationArgs[] = [
        {
            lang: 'Hebrew',
            text: 'גן ילדים',
            fontSize: 77.3332,
            tracking: -19,
            textPos: [922.3363, 540.1692],
            textAnchor: [75.0863, -19.0808],
            bgSize: [296, 110],
            iconPos: [1045.5764, 539.1284],
            iconAnchor: [85.5764, -0.8716],
            iconScale: 100,
            iconId: 'Kindergarden'
        },
        {
            lang: 'English',
            text: 'Kindergarden',
            fontSize: 77.3332,
            tracking: -26,
            textPos: [1019.7664, 549.906],
            textAnchor: [180.7664, -21.344],
            bgSize: [495, 106],
            iconPos: [773.5764, 539.1284],
            iconAnchor: [85.5764, -0.8716],
            iconScale: 100,
            iconId: 'Kindergarden'
        },
        {
            lang: 'Arabic',
            text: 'روضة أطفال',
            fontSize: 60,
            tracking: -23,
            textPos: [916.7816, 538.4697],
            textAnchor: [171.7816, -22.2803],
            bgSize: [466, 92],
            iconPos: [1141.2014, 539.5034],
            iconAnchor: [85.5764, -0.8716],
            iconScale: 83,
            iconId: 'Kindergarden'
        }
    ];
    createLocation(lang, args);
};

const createMedicalIcon = (
    iconPos: [number, number],
    iconAnchor: [number, number],
    iconScale: number,
    name: LocationID
): ShapeLayer => {
    const iconLayer = createIconBase(name);

    const contents = iconLayer.property('Contents') as PropertyGroup;

    const createCross = () => {
        const vertices: [number, number][] = [
            [23.6100158691406, -8.60000610351562],
            [23.6100158691406, 8.60000610351562],
            [8.58999633789062, 8.60000610351562],
            [8.58999633789062, 23.6399841308594],
            [-8.58999633789062, 23.6399841308594],
            [-8.58999633789062, 8.60000610351562],
            [-23.6100158691406, 8.60000610351562],
            [-23.6100158691406, -8.60000610351562],
            [-8.58999633789062, -8.60000610351562],
            [-8.58999633789062, -23.6399841308594],
            [8.58999633789062, -23.6399841308594],
            [8.58999633789062, -8.60000610351562]
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
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Cross',
            true,
            false,
            [255, 255, 255],
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [86.0601, -1.0216]
        );
    };

    const createIconCircle = () => {
        const vertices: [number, number][] = [
            [43.39892578125, 0],
            [0, 43.39892578125],
            [-43.39892578125, 0],
            [0, -43.39892578125]
        ];

        const inTangents: [number, number][] = [
            [0, -23.9685668945312],
            [23.9685668945312, 0],
            [0, 23.9685668945312],
            [-23.9685668945312, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 23.9685668945312],
            [-23.9685668945312, 0],
            [0, -23.9685668945312],
            [23.9685668945312, 0]
        ];

        createPathGrp(
            contents,
            'Icon_Circle',
            true,
            false,
            [53, 33, 28],
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [85.5764, -0.8716]
        );
    };

    createCross();
    createIconCircle();

    setLayerTransform(iconLayer, iconPos, iconAnchor, iconScale);

    return iconLayer;
};

const createMedicalLocation = (lang: Lingo): void => {
    const args: LocationArgs[] = [
        {
            lang: 'Hebrew',
            text: 'מרפאה',
            fontSize: 77.3332,
            tracking: -19,
            textPos: [922.3363, 540.1692],
            textAnchor: [75.0863, -19.0808],
            bgSize: [296, 110],
            iconPos: [1045.5764, 539.1284],
            iconAnchor: [85.5764, -0.8716],
            iconScale: 100,
            iconId: 'Medical Clinic'
        },
        {
            lang: 'English',
            text: 'Medical Clinic',
            fontSize: 77.3332,
            tracking: -31,
            textPos: [1011.831, 537.0827],
            textAnchor: [182.081, -27.9173],
            bgSize: [484, 106],
            iconPos: [779, 539.1284],
            iconAnchor: [85.5764, -0.8716],
            iconScale: 97,
            iconId: 'Medical Clinic'
        },
        {
            lang: 'Arabic',
            text: 'عيادة',
            fontSize: 64,
            tracking: -21,
            textPos: [919.4213, 540.4375],
            textAnchor: [80.6712, -16.3125],
            bgSize: [284, 91],
            iconPos: [1049.9514, 538.2534],
            iconAnchor: [85.5764, -0.8716],
            iconScale: 83,
            iconId: 'Medical Clinic'
        }
    ];
    createLocation(lang, args);
};

const createSportsIcon = (
    iconPos: [number, number],
    iconAnchor: [number, number],
    iconScale: number,
    name: LocationID
): ShapeLayer => {
    const iconLayer = createIconBase(name);

    const contents = iconLayer.property('Contents') as PropertyGroup;

    const createBallBorder = () => {
        const vertices: [number, number][] = [
            [26.9803924560547, 0],
            [0, 26.9803924560547],
            [-26.9803924560547, 0],
            [0, -26.9803924560547]
        ];
        const inTangents: [number, number][] = [
            [0, -14.9008636474609],
            [14.9008636474609, 0],
            [0, 14.9008636474609],
            [-14.9008636474609, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 14.9008636474609],
            [-14.9008636474609, 0],
            [0, -14.9008636474609],
            [14.9008636474609, 0]
        ];

        createPathGrp(
            contents,
            'Ball_Border',
            false,
            true,
            [0, 0, 0],
            [255, 255, 255],
            4,
            vertices,
            inTangents,
            outTangents,
            true,
            [177.6914, -0.8718]
        );
    };

    const createBallPattern01 = () => {
        const vertices: [number, number][] = [
            [-2.0587158203125, -7.95933532714844],
            [-9.53825378417969, -3.40415954589844],
            [-5.0865478515625, 7.95933532714844],
            [9.53825378417969, 7.95933532714844],
            [8.969482421875, -2.07745361328125]
        ];
        const inTangents: [number, number][] = [
            [7.33279418945312, 2.37643432617188],
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
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Ball_Pattern_01',
            true,
            false,
            [255, 255, 255],
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [186.5702, -19.2442]
        );
    };

    const createBallPattern02 = () => {
        const vertices: [number, number][] = [
            [-4.03433227539062, -7.84432983398438],
            [3.20297241210938, -8.99632263183594],
            [7.81706237792969, 2.06472778320312],
            [-1.34603881835938, 8.99632263183594],
            [-7.81706237792969, 4.27694702148438]
        ];
        const inTangents: [number, number][] = [
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
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Ball_Pattern_02',
            true,
            false,
            [255, 255, 255],
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [158.4209, -6.8679]
        );
    };

    const createBallPattern03 = () => {
        const vertices: [number, number][] = [
            [-10.4224853515625, -7.16879272460938],
            [4.99301147460938, -1.26144409179688],
            [10.4224853515625, 7.16879272460938],
            [-1.47776794433594, 2.66761779785156]
        ];
        const inTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Ball_Pattern_03',
            true,
            false,
            [255, 255, 255],
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [164.2615, 19.1702]
        );
    };

    const createBallPattern04 = () => {
        const vertices: [number, number][] = [
            [4.08897399902344, -9.21754455566406],
            [-8.051025390625, -5.53053283691406],
            [-8.051025390625, 5.67800903320312],
            [2.32806396484375, 9.21754455566406],
            [8.051025390625, 0.9586181640625]
        ];
        const inTangents: [number, number][] = [
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
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Ball_Pattern_04',
            true,
            false,
            [255, 255, 255],
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [178.5192, 6.774]
        );
    };

    const createBallPattern05 = () => {
        const vertices: [number, number][] = [
            [3.44915771484375, -10.29736328125],
            [-3.88815307617188, 3.47108459472656],
            [-1.09207153320312, 10.29736328125],
            [3.88815307617188, 1.25888061523438]
        ];
        const inTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Ball_Pattern_05',
            true,
            false,
            [255, 255, 255],
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [200.8771, 4.5565]
        );
    };

    const createBallPattern06 = () => {
        const vertices: [number, number][] = [
            [-9.75572204589844, 4.17427062988281],
            [-4.83880615234375, -0.86390686035156],
            [9.75572204589844, -4.17427062988281],
            [0.74287414550781, 2.04646301269531]
        ];
        const inTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Ball_Pattern_06',
            true,
            false,
            [255, 255, 255],
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [187.4469, 22.1648]
        );
    };

    const createBallLine01 = () => {
        const vertices: [number, number][] = [
            [0.380126953125, 9.05567932128906],
            [-1.5057373046875, 8.93757629394531],
            [-0.380126953125, -9.05567932128906],
            [1.5057373046875, -8.93757629394531]
        ];
        const inTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Ball_Line_01',
            true,
            false,
            [255, 255, 255],
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [182.0461, -6.8678]
        );
    };

    const createBallLine02 = () => {
        const vertices: [number, number][] = [
            [-4.1038818359375, -3.21076965332031],
            [0, 0],
            [0, 0],
            [0, 0],
            [0.57388305664062, 0.58863830566406],
            [0, 0]
        ];
        const inTangents: [number, number][] = [
            [0, 0],
            [0.49453735351562, 0.60525512695312],
            [0, 0],
            [0, 0],
            [0, 0],
            [-5.08003234863281, -3.9765625]
        ];
        const outTangents: [number, number][] = [
            [-4.1038818359375, -3.21076965332031],
            [0, 0],
            [0, 0],
            [0, 0],
            [0.57388305664062, 0.58863830566406],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Ball_Line_02',
            true,
            false,
            [255, 255, 255],
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [166.771, -2.0904]
        );
    };

    const createBallLine03 = () => {
        const vertices: [number, number][] = [
            [-10.4728546142578, 5.2987060546875],
            [-11.1888122558594, 3.54937744140625],
            [10.4728546142578, -5.2987060546875],
            [11.1888122558594, -3.54937744140625]
        ];
        const inTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Ball_Line_03',
            true,
            false,
            [255, 255, 255],
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [170.6526, -18.076]
        );
    };

    const createBallLine04 = () => {
        const vertices: [number, number][] = [
            [8.58975219726562, 1.38580322265625],
            [-8.68569946289062, 0.50007629394531],
            [-8.58975219726562, -1.38580322265625],
            [8.68569946289062, -0.50007629394531]
        ];
        const inTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Ball_Line_04',
            true,
            false,
            [255, 255, 255],
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [192.2395, 7.8806]
        );
    };

    const createBallLine05 = () => {
        const vertices: [number, number][] = [
            [1.67181396484375, 6.34220886230469],
            [-3.41006469726562, -5.60409545898438],
            [-1.67181396484375, -6.34220886230469],
            [3.41006469726562, 5.60409545898438]
        ];
        const inTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Ball_Line_05',
            true,
            false,
            [255, 255, 255],
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [181.0608, 17.3929]
        );
    };

    const createBallLine06 = () => {
        const vertices: [number, number][] = [
            [-2.19033813476562, 6.61068725585938],
            [-3.88798522949219, 5.77662658691406],
            [2.19033813476562, -6.61068725585938],
            [3.88798522949219, -5.77662658691406]
        ];
        const inTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Ball_Line_06',
            true,
            false,
            [255, 255, 255],
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [169.884, 14.0742]
        );
    };

    const createBallLine07 = () => {
        const vertices: [number, number][] = [
            [4.63255310058594, 6.99728393554688],
            [-6.07925415039062, -5.7830810546875],
            [-4.63255310058594, -6.99728393554688],
            [6.07925415039062, 5.7830810546875]
        ];
        const inTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Ball_Line_07',
            true,
            false,
            [255, 255, 255],
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [199.4093, -7.2617]
        );
    };

    const createBallLine08 = () => {
        const vertices: [number, number][] = [
            [-0.67536926269531, 9.75965881347656],
            [-1.21418762207031, -9.70799255371094],
            [0.67536926269531, -9.75965881347656],
            [1.21418762207031, 9.70799255371094]
        ];
        const inTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Ball_Line_08',
            true,
            false,
            [255, 255, 255],
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [157.1978, 6.2585]
        );
    };

    const createIconCircle = () => {
        const vertices: [number, number][] = [
            [43.39892578125, 0],
            [0, 43.39892578125],
            [-43.39892578125, 0],
            [0, -43.39892578125]
        ];

        const inTangents: [number, number][] = [
            [0, -23.9685668945312],
            [23.9685668945312, 0],
            [0, 23.9685668945312],
            [-23.9685668945312, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 23.9685668945312],
            [-23.9685668945312, 0],
            [0, -23.9685668945312],
            [23.9685668945312, 0]
        ];

        createPathGrp(
            contents,
            'Icon_Circle',
            true,
            false,
            [53, 33, 28],
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [177.6913, -0.8716]
        );
    };

    createBallLine08();
    createBallLine07();
    createBallLine06();
    createBallLine05();
    createBallLine04();
    createBallLine03();
    createBallLine02();
    createBallLine01();
    createBallPattern06();
    createBallPattern05();
    createBallPattern04();
    createBallPattern03();
    createBallPattern02();
    createBallPattern01();
    createBallBorder();
    createIconCircle();

    setLayerTransform(iconLayer, iconPos, iconAnchor, iconScale);

    return iconLayer;
};

const createSportsLocation = (lang: Lingo): void => {
    const args: LocationArgs[] = [
        {
            lang: 'Hebrew',
            text: 'מתחם ספורט ופנאי',
            fontSize: 77.3332,
            tracking: -19,
            textPos: [812.8363, 540.1692],
            textAnchor: [75.0863, -19.0808],
            bgSize: [480, 110],
            iconPos: [1045.5764, 539.1284],
            iconAnchor: [85.5764, -0.8716],
            iconScale: 100,
            iconId: 'Sports'
        },
        {
            lang: 'English',
            text: 'Sports and\nRecreation Complex',
            fontSize: 59,
            tracking: -31,
            leading: 53,
            textPos: [1001.1015, 542.921],
            textAnchor: [201.1015, 9.921],
            bgSize: [555, 134],
            iconPos: [743.8515, 536.0034],
            iconAnchor: [177.6913, -0.8716],
            iconScale: 100,
            iconId: 'Sports'
        },
        {
            lang: 'Arabic',
            text: 'ملعب رياضة',
            fontSize: 64,
            tracking: -19,
            textPos: [918.5146, 540.4375],
            textAnchor: [173.2645, -16.3125],
            bgSize: [466, 92],
            iconPos: [1141.5318, 540.1284],
            iconAnchor: [177.6913, -0.8716],
            iconScale: 83,
            iconId: 'Sports'
        }
    ];
    createLocation(lang, args);
};

const createUniversityIcon = (
    iconPos: [number, number],
    iconAnchor: [number, number],
    iconScale: number,
    name: LocationID
): ShapeLayer => {
    const iconLayer = createIconBase(name);

    const contents = iconLayer.property('Contents') as PropertyGroup;

    const createCoverL = () => {
        const vertices: [number, number][] = [
            [14.0190734863281, 19.1502380371094],
            [-14.0190734863281, 17.6841888427734],
            [-9.80418395996094, -17.8674468994141],
            [-5.03953552246094, -19.1502380371094],
            [-10.9037170410156, 11.0869750976562]
        ];
        const inTangents: [number, number][] = [
            [-2.19906616210938, -2.93209838867188],
            [5.31442260742188, -1.83256530761719],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Cover_L',
            true,
            false,
            [255, 255, 255],
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [91.8363, -1.761]
        );
    };

    const createPaperL = () => {
        const vertices: [number, number][] = [
            [12.3697662353516, -10.0790710449219],
            [-5.58930969238281, -20.3414001464844],
            [-12.3697662353516, 10.4455871582031],
            [12.3697662353516, 20.3414001464844]
        ];
        const inTangents: [number, number][] = [
            [0, 0],
            [10.4065246582031, 2.35177612304688],
            [0, 0],
            [-6.04743957519531, -5.13116455078125]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Paper_L',
            true,
            false,
            [255, 255, 255],
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [95.5015, -2.9521]
        );
    };

    const createCoverR = () => {
        const vertices: [number, number][] = [
            [-14.0190734863281, 19.1502380371094],
            [14.0190734863281, 17.6841888427734],
            [9.80418395996094, -17.8674468994141],
            [5.03953552246094, -19.1502380371094],
            [10.9037170410156, 11.0869750976562]
        ];
        const inTangents: [number, number][] = [
            [2.19906616210938, -2.93209838867188],
            [-5.31442260742188, -1.83256530761719],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Cover_R',
            true,
            false,
            [255, 255, 255],
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [126.4342, -1.761]
        );
    };

    const createPaperR = () => {
        const vertices: [number, number][] = [
            [-12.3697662353516, -10.0790710449219],
            [5.58930969238281, -20.3414001464844],
            [12.3697662353516, 10.4455871582031],
            [-12.3697662353516, 20.3414001464844]
        ];
        const inTangents: [number, number][] = [
            [0, 0],
            [-10.4065246582031, 2.35177612304688],
            [0, 0],
            [6.04743957519531, -5.13116455078125]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Paper_R',
            true,
            false,
            [255, 255, 255],
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [122.769, -2.9521]
        );
    };

    const createIconCircle = () => {
        const vertices: [number, number][] = [
            [43.39892578125, 0],
            [0, 43.39892578125],
            [-43.39892578125, 0],
            [0, -43.39892578125]
        ];

        const inTangents: [number, number][] = [
            [0, -23.9685668945312],
            [23.9685668945312, 0],
            [0, 23.9685668945312],
            [-23.9685668945312, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 23.9685668945312],
            [-23.9685668945312, 0],
            [0, -23.9685668945312],
            [23.9685668945312, 0]
        ];

        createPathGrp(
            contents,
            'Icon_Circle',
            true,
            false,
            [53, 33, 28],
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [110.002, -0.8716]
        );
    };

    createCoverL();
    createPaperL();
    createCoverR();
    createPaperR();
    createIconCircle();

    setLayerTransform(iconLayer, iconPos, iconAnchor, iconScale);

    return iconLayer;
};

const createUniversityLocation = (lang: Lingo): void => {
    const args: LocationArgs[] = [
        {
            lang: 'Hebrew',
            text: 'אוניברסיטה',
            fontSize: 77.3332,
            tracking: -19,
            textPos: [907.7467, 539.0399],
            textAnchor: [102.9967, -20.21],
            bgSize: [344, 110],
            iconPos: [1045.5764, 539.1284],
            iconAnchor: [85.5764, -0.8716],
            iconScale: 100,
            iconId: 'University'
        },
        {
            lang: 'English',
            text: 'University',
            fontSize: 77,
            tracking: -29,
            textPos: [1006.8615, 543.4595],
            textAnchor: [130.8615, -21.2905],
            bgSize: [388, 106],
            iconPos: [826.9122, 539.0034],
            iconAnchor: [110.002, -0.8716],
            iconScale: 97,
            iconId: 'University'
        },
        {
            lang: 'Arabic',
            text: 'جامعة',
            fontSize: 64,
            tracking: -19,
            textPos: [920.9957, 540.4375],
            textAnchor: [90.2456, -16.3125],
            bgSize: [302, 92],
            iconPos: [1058.9747, 540.1284],
            iconAnchor: [110.002, -0.8716],
            iconScale: 83,
            iconId: 'University'
        }
    ];
    createLocation(lang, args);
};

// ====================================

const createLocationFromId = (id: LocationID, lang: Lingo): void => {
    app.beginUndoGroup(`Create Location: ${id}`);

    switch (id) {
        case 'Kindergarden':
            createKindergardenLocation(lang);
            break;
        case 'Medical Clinic':
            createMedicalLocation(lang);
            break;
        case 'Sports':
            createSportsLocation(lang);
            break;
        case 'University':
            createUniversityLocation(lang);
            break;
    }

    app.endUndoGroup();
};
