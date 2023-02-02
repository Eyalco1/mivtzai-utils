const getColorsFromMitug = (
    mitug: Mitug
): { bg: [number, number, number]; pri: [number, number, number] } => {
    if (mitug === 'Gaza') {
        return { bg: [255, 255, 255], pri: [22, 39, 92] };
    } else if (mitug === 'Lebanon') {
        return { bg: [1, 25, 1], pri: [255, 255, 255] };
    } else if (mitug === 'Pakmaz') {
        return { bg: [255, 255, 255], pri: [53, 33, 28] };
    }
};

const createLocationBG = (
    id: LocationID,
    size: [number, number],
    mitug: Mitug
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
    // TODO
    fillProp.setValue(
        getColorsFromMitug(mitug).bg.map(c => c / 255) as [
            number,
            number,
            number
        ]
    );

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
    textAnchor: [number, number],
    mitug: Mitug
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
    textDoc.fillColor = getColorsFromMitug(mitug).pri.map(c => c / 255);
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
    iconScale: number,
    mitug: Mitug
): ShapeLayer => {
    switch (id) {
        case 'Kindergarden':
            return createKindergardenIcon(
                iconPos,
                iconAnchor,
                iconScale,
                id,
                mitug
            );
        case 'Medical Clinic':
            return createMedicalIcon(iconPos, iconAnchor, iconScale, id, mitug);
        case 'Sports':
            return createSportsIcon(iconPos, iconAnchor, iconScale, id, mitug);
        case 'University':
            return createUniversityIcon(
                iconPos,
                iconAnchor,
                iconScale,
                id,
                mitug
            );
        case 'Mosque':
            return createMosqueIcon(iconPos, iconAnchor, iconScale, id, mitug);
        case 'U.N. Building':
            return createUNBuildingIcon(
                iconPos,
                iconAnchor,
                iconScale,
                id,
                mitug
            );
        case 'Diplomatic Building':
            return createDiplomaticBuildingIcon(
                iconPos,
                iconAnchor,
                iconScale,
                id,
                mitug
            );
        case 'Gas Station':
            return createGasStationIcon(
                iconPos,
                iconAnchor,
                iconScale,
                id,
                mitug
            );
        case 'Government Building':
            return createGovernmentBuildingIcon(
                iconPos,
                iconAnchor,
                iconScale,
                id,
                mitug
            );
        case 'Pumping Station':
            return createPumpingStationIcon(
                iconPos,
                iconAnchor,
                iconScale,
                id,
                mitug
            );
        case 'Police':
            return createPoliceIcon(iconPos, iconAnchor, iconScale, id, mitug);
        case 'Water Facility':
            return createWaterFacilityIcon(
                iconPos,
                iconAnchor,
                iconScale,
                id,
                mitug
            );
        case 'Residential Neighborhood':
            return createResidentialNeighborhoodIcon(
                iconPos,
                iconAnchor,
                iconScale,
                id,
                mitug
            );
        case 'Amusement Park':
            return createAmusementParkIcon(
                iconPos,
                iconAnchor,
                iconScale,
                id,
                mitug
            );
        case 'Hotel':
            return createHotelIcon(iconPos, iconAnchor, iconScale, id, mitug);
    }
};

const createLocation = (
    argsArr: LocationArgs[],
    inputLang: Lingo,
    mitug: Mitug
): void => {
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

    const bgLayer = createLocationBG(iconId, bgSize, mitug);
    const iconLayer = createLocationIconFromId(
        iconId,
        iconPos,
        iconAnchor,
        iconScale,
        mitug
    );
    const textLayer = createLocationText(
        lang,
        text,
        fontSize,
        tracking,
        leading,
        textPos,
        textAnchor,
        mitug
    );

    iconLayer.parent = textLayer.parent = bgLayer;
    bgLayer.label =
        iconLayer.label =
        textLayer.label =
            parsePrefs().locsLabelRandom
                ? Math.floor(Math.random() * 16) + 1
                : parsePrefs().locsLabelIndex + 1;
    iconLayer.selected = textLayer.selected = false;
    bgLayer.selected = true;
};

// ==========================

const createKindergardenIcon: CreateLocationIconFn = (
    iconPos,
    iconAnchor,
    iconScale,
    name,
    mitug
) => {
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
            getColorsFromMitug(mitug).pri,
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
            getColorsFromMitug(mitug).bg,
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
            getColorsFromMitug(mitug).bg,
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
            getColorsFromMitug(mitug).bg,
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
            getColorsFromMitug(mitug).bg,
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
            getColorsFromMitug(mitug).bg,
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
            getColorsFromMitug(mitug).bg,
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
            getColorsFromMitug(mitug).bg,
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
            getColorsFromMitug(mitug).bg,
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
            getColorsFromMitug(mitug).bg,
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
            getColorsFromMitug(mitug).bg,
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
            getColorsFromMitug(mitug).bg,
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
            getColorsFromMitug(mitug).bg,
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
            getColorsFromMitug(mitug).pri,
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

const createKindergardenLocation = (lang: Lingo, mitug: Mitug): void => {
    const args: LocationArgs[] = [
        {
            lang: 'Hebrew',
            text: 'גן ילדים',
            fontSize: 77.3332,
            tracking: -19,
            textPos: [922.3363, 540.1692],
            textAnchor: [getOS() === 'Win' ? 75.0863 : -75.0863, -19.0808],
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
            textAnchor: [getOS() === 'Win' ? 180.7664 : -180.7664, -21.344],
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
            textAnchor: [getOS() === 'Win' ? 171.7816 : -171.7816, -22.2803],
            bgSize: [466, 92],
            iconPos: [1141.2014, 539.5034],
            iconAnchor: [85.5764, -0.8716],
            iconScale: 83,
            iconId: 'Kindergarden'
        }
    ];
    createLocation(args, lang, mitug);
};

const createMedicalIcon: CreateLocationIconFn = (
    iconPos,
    iconAnchor,
    iconScale,
    name,
    mitug
) => {
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
            getColorsFromMitug(mitug).bg,
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
            getColorsFromMitug(mitug).pri,
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

const createMedicalLocation = (lang: Lingo, mitug: Mitug): void => {
    const args: LocationArgs[] = [
        {
            lang: 'Hebrew',
            text: 'מרפאה',
            fontSize: 77.3332,
            tracking: -19,
            textPos: [922.3363, 540.1692],
            textAnchor: [getOS() === 'Win' ? 75.0863 : -75.0863, -19.0808],
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
            textAnchor: [getOS() === 'Win' ? 182.081 : -182.081, -27.9173],
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
            textAnchor: [getOS() === 'Win' ? 80.6712 : -80.6712, -16.3125],
            bgSize: [284, 91],
            iconPos: [1049.9514, 538.2534],
            iconAnchor: [85.5764, -0.8716],
            iconScale: 83,
            iconId: 'Medical Clinic'
        }
    ];
    createLocation(args, lang, mitug);
};

const createSportsIcon: CreateLocationIconFn = (
    iconPos,
    iconAnchor,
    iconScale,
    name,
    mitug
) => {
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
            getColorsFromMitug(mitug).bg,
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
            getColorsFromMitug(mitug).bg,
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
            getColorsFromMitug(mitug).bg,
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
            getColorsFromMitug(mitug).bg,
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
            getColorsFromMitug(mitug).bg,
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
            getColorsFromMitug(mitug).bg,
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
            getColorsFromMitug(mitug).bg,
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
            getColorsFromMitug(mitug).bg,
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
            getColorsFromMitug(mitug).bg,
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
            getColorsFromMitug(mitug).bg,
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
            getColorsFromMitug(mitug).bg,
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
            getColorsFromMitug(mitug).bg,
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
            getColorsFromMitug(mitug).bg,
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
            getColorsFromMitug(mitug).bg,
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
            getColorsFromMitug(mitug).bg,
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
            getColorsFromMitug(mitug).pri,
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

const createSportsLocation = (lang: Lingo, mitug: Mitug): void => {
    const args: LocationArgs[] = [
        {
            lang: 'Hebrew',
            text: 'מתחם ספורט ופנאי',
            fontSize: 77.3332,
            tracking: -19,
            textPos: [812.8363, 540.1692],
            textAnchor: [getOS() === 'Win' ? 75.0863 : -75.0863, -19.0808],
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
            textAnchor: [getOS() === 'Win' ? 201.1015 : -201.1015, 9.921],
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
            textAnchor: [getOS() === 'Win' ? 173.2645 : -173.2645, -16.3125],
            bgSize: [466, 92],
            iconPos: [1141.5318, 540.1284],
            iconAnchor: [177.6913, -0.8716],
            iconScale: 83,
            iconId: 'Sports'
        }
    ];
    createLocation(args, lang, mitug);
};

const createUniversityIcon: CreateLocationIconFn = (
    iconPos,
    iconAnchor,
    iconScale,
    name,
    mitug
) => {
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
            getColorsFromMitug(mitug).bg,
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
            getColorsFromMitug(mitug).bg,
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
            getColorsFromMitug(mitug).bg,
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
            getColorsFromMitug(mitug).bg,
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
            getColorsFromMitug(mitug).pri,
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

const createUniversityLocation = (lang: Lingo, mitug: Mitug): void => {
    const args: LocationArgs[] = [
        {
            lang: 'Hebrew',
            text: 'אוניברסיטה',
            fontSize: 77.3332,
            tracking: -19,
            textPos: [907.7467, 539.0399],
            textAnchor: [getOS() === 'Win' ? 102.9967 : -102.9967, -20.21],
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
            textAnchor: [getOS() === 'Win' ? 130.8615 : -130.8615, -21.2905],
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
            textAnchor: [getOS() === 'Win' ? 90.2456 : -90.2456, -16.3125],
            bgSize: [302, 92],
            iconPos: [1058.9747, 540.1284],
            iconAnchor: [110.002, -0.8716],
            iconScale: 83,
            iconId: 'University'
        }
    ];
    createLocation(args, lang, mitug);
};

const createMosqueIcon: CreateLocationIconFn = (
    iconPos,
    iconAnchor,
    iconScale,
    name,
    mitug
) => {
    const iconLayer = createIconBase(name);

    const contents = iconLayer.property('Contents') as PropertyGroup;

    const createMosqueB = () => {
        const vertices: [number, number][] = [
            [60.780029296875, 19.469970703125],
            [60.780029296875, 22.0799560546875],
            [52.6599731445312, 22.0799560546875],
            [52.6599731445312, 19.469970703125],
            [47.3099975585938, 19.469970703125],
            [47.3099975585938, 22.0799560546875],
            [39.219970703125, 22.0799560546875],
            [39.1900024414062, 21.5199584960938],
            [39.1900024414062, 19.469970703125],
            [33.8400268554688, 19.469970703125],
            [33.8400268554688, 22.0700073242188],
            [25.719970703125, 22.0700073242188],
            [25.719970703125, 19.469970703125],
            [21.719970703125, 19.469970703125],
            [21.719970703125, 24.1499633789062],
            [21.75, 24.7000122070312],
            [64.739990234375, 24.7000122070312],
            [64.780029296875, 24.489990234375],
            [64.7900390625, 19.469970703125]
        ];
        const inTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0.1700439453125],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [-0.010009765625, -0.20001220703125],
            [0, 0],
            [0, 0.04998779296875],
            [0, 1.6700439453125]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [-0.00994873046875, -0.2099609375],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0.17999267578125],
            [0, 0],
            [0.02001953125, -0.10003662109375],
            [0, -1.67999267578125],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Mosque_Bottom',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [0, 0]
        );
    };

    const createMosqueM = () => {
        const vertices: [number, number][] = [
            [64.7900390625, 19.469970703125],
            [64.760009765625, 10.8900146484375],
            [64.280029296875, 9.8499755859375],
            [62.0800170898438, 7.6400146484375],
            [59.0399780273438, 6.3599853515625],
            [58.6699829101562, 6.3299560546875],
            [58.6699829101562, 4.28997802734375],
            [55.5399780273438, 4.28997802734375],
            [55.530029296875, 6.239990234375],
            [53.5499877929688, 4.6400146484375],
            [53.5499877929688, 4.28997802734375],
            [50.52001953125, 4.28997802734375],
            [50.5, 6.27996826171875],
            [47.8599853515625, 6.27996826171875],
            [47.7899780273438, 5.8699951171875],
            [47.780029296875, 4.28997802734375],
            [45.1799926757812, 4.28997802734375],
            [45.1699829101562, 6.26995849609375],
            [41.8300170898438, 6.26995849609375],
            [41.8200073242188, 4.28997802734375],
            [39.1900024414062, 4.28997802734375],
            [39.1699829101562, 6.26995849609375],
            [36.4000244140625, 6.26995849609375],
            [36.4000244140625, 4.28997802734375],
            [33.27001953125, 4.28997802734375],
            [33.260009765625, 6.26995849609375],
            [30.97998046875, 6.26995849609375],
            [30.9600219726562, 4.28997802734375],
            [27.780029296875, 4.28997802734375],
            [27.780029296875, 6.3599853515625],
            [26.8900146484375, 6.3599853515625],
            [24.9199829101562, 7.15997314453125],
            [22.3499755859375, 9.69000244140625],
            [21.7100219726562, 11.219970703125],
            [21.719970703125, 19.469970703125],
            [25.719970703125, 19.469970703125],
            [25.719970703125, 13.6699829101562],
            [29.469970703125, 9.04998779296875],
            [30.4600219726562, 9.14996337890625],
            [33.8400268554688, 13.9400024414062],
            [33.8400268554688, 19.469970703125],
            [39.1900024414062, 19.469970703125],
            [39.1900024414062, 13.469970703125],
            [43.0800170898438, 9.010009765625],
            [43.8400268554688, 9.1099853515625],
            [47.3099975585938, 13.9099731445312],
            [47.3099975585938, 19.469970703125],
            [52.6599731445312, 19.469970703125],
            [52.6599731445312, 13.5899658203125],
            [56.489990234375, 9.02996826171875],
            [57.3599853515625, 9.1300048828125],
            [60.780029296875, 13.9599609375],
            [60.780029296875, 19.469970703125]
        ];
        const inTangents: [number, number][] = [
            [0, 0],
            [0.030029296875, 2.8599853515625],
            [0.25, 0.280029296875],
            [0.67999267578125, 0.78997802734375],
            [1.2900390625, -0.21002197265625],
            [0.1400146484375, 0.010009765625],
            [0, 0],
            [0, 0],
            [0, -0.6500244140625],
            [-0.010009765625, 1.8699951171875],
            [0, 0],
            [0, 0],
            [0, -0.67999267578125],
            [0, 0],
            [0, 0.1300048828125],
            [0, 0.530029296875],
            [0, 0],
            [0, -0.65997314453125],
            [0, 0],
            [0, 0.6500244140625],
            [0, 0],
            [0, -0.66998291015625],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, -0.66998291015625],
            [0, 0],
            [0.00994873046875, 0.6500244140625],
            [0, 0],
            [0, 0],
            [0.27996826171875, 0.030029296875],
            [0.55999755859375, -0.5899658203125],
            [0.8800048828125, -0.82000732421875],
            [0, -0.6300048828125],
            [0, -2.75],
            [0, 0],
            [-0.00994873046875, 1.94000244140625],
            [-2.0999755859375, 0.42999267578125],
            [-0.30999755859375, -0.1099853515625],
            [0, -2.260009765625],
            [0, 0],
            [0, 0],
            [-0.010009765625, 2],
            [-1.95001220703125, 0.25994873046875],
            [-0.24005126953125, -0.08001708984375],
            [0, -2.26995849609375],
            [0, -1.8599853515625],
            [0, 0],
            [-0.00994873046875, 1.96002197265625],
            [-2.05999755859375, 0.36004638671875],
            [-0.26995849609375, -0.09002685546875],
            [0.00994873046875, -2.28997802734375],
            [0, -1.8399658203125]
        ];
        const outTangents: [number, number][] = [
            [0, -2.8599853515625],
            [0, -0.35003662109375],
            [-0.70001220703125, -0.760009765625],
            [-0.82000732421875, -0.95001220703125],
            [-0.1099853515625, 0.010009765625],
            [0, 0],
            [0, 0],
            [0, 0.6400146484375],
            [-1.99005126953125, 0.27001953125],
            [0, 0],
            [0, 0],
            [-0.010009765625, 0.6500244140625],
            [0, 0],
            [-0.02996826171875, -0.14996337890625],
            [-0.00994873046875, -0.530029296875],
            [0, 0],
            [0, 0.6600341796875],
            [0, 0],
            [0, -0.66998291015625],
            [0, 0],
            [0, 0.6500244140625],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0.6500244140625],
            [0, 0],
            [0, -0.66998291015625],
            [0, 0],
            [0, 0],
            [-0.33001708984375, 0],
            [-0.79998779296875, -0.09002685546875],
            [-0.82000732421875, 0.8699951171875],
            [-0.4599609375, 0.41998291015625],
            [0.00994873046875, 2.75],
            [0, 0],
            [0, -1.92999267578125],
            [0, -2.1300048828125],
            [0.31005859375, -0.05999755859375],
            [2.13995361328125, 0.75],
            [0, 0],
            [0, 0],
            [0, -2],
            [0, -1.97998046875],
            [0.25, -0.0400390625],
            [2.15997314453125, 0.71002197265625],
            [0.010009765625, 1.85003662109375],
            [0, 0],
            [0, -1.9599609375],
            [0, -2.0799560546875],
            [0.280029296875, -0.04998779296875],
            [2.1600341796875, 0.739990234375],
            [-0.010009765625, 1.83001708984375],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Mosque_Middle',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [0, 0]
        );
    };

    const createMosqueT = () => {
        const vertices: [number, number][] = [
            [58.75, -1.8900146484375],
            [58.3400268554688, -2.4100341796875],
            [57.6699829101562, -5.510009765625],
            [46.780029296875, -16.5800170898438],
            [44.6300048828125, -18.2000122070312],
            [44.5800170898438, -18.3699951171875],
            [44.3900146484375, -19.6799926757812],
            [48.6900024414062, -23.3699951171875],
            [43.75, -22.7100219726562],
            [41.8499755859375, -27.02001953125],
            [45.469970703125, -30.1900024414062],
            [38.5800170898438, -27.5400390625],
            [38.3400268554688, -23.280029296875],
            [42.5999755859375, -19.6799926757812],
            [42.4099731445312, -18.4000244140625],
            [42.239990234375, -18.1000366210938],
            [38.989990234375, -16.3699951171875],
            [38.2000122070312, -16.1000366210938],
            [28.5900268554688, -4.67999267578125],
            [28.0499877929688, -1.94000244140625],
            [26.3200073242188, -0.29998779296875],
            [27.780029296875, 4.28997802734375],
            [27.780029296875, 1.54998779296875],
            [30.9600219726562, 4.28997802734375],
            [31.010009765625, 1.5999755859375],
            [31.6900024414062, 0.16998291015625],
            [32.5599975585938, 0.19000244140625],
            [33.22998046875, 1.6300048828125],
            [33.27001953125, 4.28997802734375],
            [36.4000244140625, 4.28997802734375],
            [36.4099731445312, 2.1400146484375],
            [37.27001953125, 0.16998291015625],
            [38.2999877929688, 0.16998291015625],
            [39.1300048828125, 1.8299560546875],
            [39.1900024414062, 4.28997802734375],
            [41.8200073242188, 4.28997802734375],
            [41.8599853515625, 1.6400146484375],
            [43.0900268554688, 0.02996826171875],
            [43.9099731445312, 0.05999755859375],
            [45.1500244140625, 1.79998779296875],
            [45.1799926757812, 4.28997802734375],
            [47.780029296875, 4.28997802734375],
            [47.780029296875, 2.1400146484375],
            [48.6900024414062, 0.1300048828125],
            [49.6300048828125, 0.1300048828125],
            [50.4600219726562, 1.6099853515625],
            [50.52001953125, 4.28997802734375],
            [53.5499877929688, 4.28997802734375],
            [53.5700073242188, 2.1199951171875],
            [54.0599975585938, 0.3599853515625],
            [55.0800170898438, 0.3800048828125],
            [55.510009765625, 1.489990234375],
            [55.5399780273438, 4.28997802734375],
            [58.6699829101562, 4.28997802734375],
            [58.6699829101562, 1.52996826171875],
            [58.8699951171875, 1.45001220703125],
            [60.1699829101562, -0.25]
        ];
        const inTangents: [number, number][] = [
            [0.8699951171875, 0.25],
            [0.04998779296875, 0.20001220703125],
            [0.32000732421875, 1],
            [5.67999267578125, 1.66998291015625],
            [0.8699951171875, 0.33001708984375],
            [0.010009765625, 0.05999755859375],
            [0.07000732421875, 0.449951171875],
            [-0.780029296875, 2.04998779296875],
            [1.57000732421875, 0.989990234375],
            [-0.3199462890625, 1.6099853515625],
            [-2.1199951171875, 0.3499755859375],
            [1.25, -2.5899658203125],
            [-0.530029296875, -1.45001220703125],
            [-2.05999755859375, -0.47003173828125],
            [0.07000732421875, -0.40997314453125],
            [0.08001708984375, -0.05999755859375],
            [1.3599853515625, -0.08001708984375],
            [0.260009765625, -0.1099853515625],
            [1.42999267578125, -5.300048828125],
            [0.17999267578125, -0.9100341796875],
            [0.05999755859375, -0.87005615234375],
            [-1.10003662109375, -0.44000244140625],
            [0, 0],
            [0, 0],
            [-0.04998779296875, 0.8900146484375],
            [-0.28997802734375, 0.45001220703125],
            [-0.22998046875, -0.3900146484375],
            [-0.02996826171875, -0.5],
            [0.010009765625, -0.8900146484375],
            [0, 0],
            [-0.00994873046875, 0.719970703125],
            [-0.55999755859375, 0.53997802734375],
            [-0.27996826171875, -0.4000244140625],
            [-0.03997802734375, -0.5799560546875],
            [0.010009765625, -0.83001708984375],
            [0, 0],
            [-0.04998779296875, 0.87994384765625],
            [-0.6600341796875, 0.33001708984375],
            [-0.219970703125, -0.1199951171875],
            [-0.0400390625, -0.77001953125],
            [0.010009765625, -0.8399658203125],
            [0, 0],
            [0.00994873046875, 0.719970703125],
            [-0.5999755859375, 0.53997802734375],
            [-0.260009765625, -0.34002685546875],
            [-0.0400390625, -0.510009765625],
            [0.010009765625, -0.90997314453125],
            [0, 0],
            [-0.07000732421875, 0.719970703125],
            [-0.260009765625, 0.53997802734375],
            [-0.36004638671875, -0.6300048828125],
            [-0.02001953125, -0.3800048828125],
            [0, -0.94000244140625],
            [0, 0],
            [0, 0],
            [-0.05999755859375, 0.01995849609375],
            [0.0400390625, 0.8299560546875]
        ];
        const outTangents: [number, number][] = [
            [-0.16998291015625, -0.04998779296875],
            [-0.24005126953125, -1.02996826171875],
            [-1.77996826171875, -5.5],
            [-0.9300537109375, -0.27996826171875],
            [-0.03997802734375, -0.010009765625],
            [-0.05999755859375, -0.42999267578125],
            [2.0799560546875, -0.48004150390625],
            [-1.96002197265625, 1.47998046875],
            [-1.42999267578125, -0.89996337890625],
            [0.36004638671875, -1.82000732421875],
            [-2.3499755859375, -1.19000244140625],
            [-0.6700439453125, 1.3800048828125],
            [0.719970703125, 1.98004150390625],
            [-0.0699462890625, 0.4599609375],
            [-0.01995849609375, 0.1099853515625],
            [-1.03997802734375, 0.6600341796875],
            [-0.260009765625, 0.010009765625],
            [-5.1400146484375, 2.1700439453125],
            [-0.24005126953125, 0.89996337890625],
            [-1.1199951171875, 0.239990234375],
            [-0.04998779296875, 0.87994384765625],
            [0, 0],
            [0, 0],
            [0, -0.90997314453125],
            [0.02996826171875, -0.489990234375],
            [0.25, -0.3900146484375],
            [0.280029296875, 0.45001220703125],
            [0.050048828125, 0.8800048828125],
            [0, 0],
            [0, -0.780029296875],
            [0, -0.719970703125],
            [0.3499755859375, -0.34002685546875],
            [0.35003662109375, 0.510009765625],
            [0.07000732421875, 0.81005859375],
            [0, 0],
            [-0.010009765625, -0.8900146484375],
            [0.0400390625, -0.72003173828125],
            [0.219970703125, -0.1099853515625],
            [0.70001220703125, 0.3599853515625],
            [0.03997802734375, 0.82000732421875],
            [0, 0],
            [0, -0.719970703125],
            [0, -0.81005859375],
            [0.32000732421875, -0.2900390625],
            [0.33001708984375, 0.4599609375],
            [0.05999755859375, 0.8800048828125],
            [0, 0],
            [-0.010009765625, -0.719970703125],
            [0.05999755859375, -0.60003662109375],
            [0.30999755859375, -0.6400146484375],
            [0.20001220703125, 0.3399658203125],
            [0.02001953125, 0.92999267578125],
            [0, 0],
            [0, 0],
            [0.09002685546875, -0.02996826171875],
            [0.8699951171875, -0.260009765625],
            [-0.02996826171875, -0.82000732421875]
        ];

        createPathGrp(
            contents,
            'Mosque_Top',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [0, 0]
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
            getColorsFromMitug(mitug).pri,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [43.3989, 0]
        );
    };

    createMosqueT();
    createMosqueM();
    createMosqueB();
    createIconCircle();

    setLayerTransform(iconLayer, iconPos, iconAnchor, iconScale);

    return iconLayer;
};

const createMosqueLocation = (lang: Lingo, mitug: Mitug): void => {
    const args: LocationArgs[] = [
        {
            lang: 'Hebrew',
            text: 'מסגד',
            fontSize: 77.3332,
            tracking: -19,
            textPos: [907.9708, 539.3514],
            textAnchor: [getOS() === 'Win' ? 45.7208 : -45.7208, -19.8985],
            bgSize: [238, 110],
            iconPos: [1016.1489, 539.5],
            iconAnchor: [43.3989, 0],
            iconScale: 100,
            iconId: 'Mosque'
        },
        {
            lang: 'English',
            text: 'Mosque',
            fontSize: 77,
            tracking: -29,
            textPos: [1007.486, 548.998],
            textAnchor: [getOS() === 'Win' ? 101.486 : -101.486, -21.252],
            bgSize: [325, 106],
            iconPos: [857.3072, 538.8489],
            iconAnchor: [43.3989, 0],
            iconScale: 97,
            iconId: 'Mosque'
        },
        {
            lang: 'Arabic',
            text: 'مسجد',
            fontSize: 64,
            tracking: -19,
            textPos: [920.9957, 540.4375],
            textAnchor: [getOS() === 'Win' ? 90.2456 : -90.2456, -16.3125],
            bgSize: [306, 92],
            iconPos: [1060.6942, 539.6018],
            iconAnchor: [43.3989, 0],
            iconScale: 83,
            iconId: 'Mosque'
        }
    ];
    createLocation(args, lang, mitug);
};

const createUNBuildingIcon: CreateLocationIconFn = (
    iconPos,
    iconAnchor,
    iconScale,
    name,
    mitug
) => {
    const iconLayer = createIconBase(name);

    const contents = iconLayer.property('Contents') as PropertyGroup;

    const createGlobeRing01 = () => {
        const vertices: [number, number][] = [
            [24.3528594970703, 0],
            [0, 24.3528594970703],
            [-24.3528594970703, 0],
            [0, -24.3528594970703]
        ];
        const inTangents: [number, number][] = [
            [0, -13.4497222900391],
            [13.4497222900391, 0],
            [0, 13.4497222900391],
            [-13.4497222900391, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 13.4497222900391],
            [-13.4497222900391, 0],
            [0, -13.4497222900391],
            [13.4497222900391, 0]
        ];

        createPathGrp(
            contents,
            'Globe_Ring_01',
            false,
            true,
            [0, 0, 0],
            getColorsFromMitug(mitug).bg,
            1,
            vertices,
            inTangents,
            outTangents,
            true,
            [42.5417, -5.6811]
        );
    };

    const createGlobeRing02 = () => {
        const vertices: [number, number][] = [
            [19.5955657958984, 0],
            [0, 19.5955657958984],
            [-19.5955657958984, 0],
            [0, -19.5955657958984]
        ];
        const inTangents: [number, number][] = [
            [0, -10.8223266601562],
            [10.8223266601562, 0],
            [0, 10.8223266601562],
            [-10.8223266601562, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 10.8223266601562],
            [-10.8223266601562, 0],
            [0, -10.8223266601562],
            [10.8223266601562, 0]
        ];

        createPathGrp(
            contents,
            'Globe_Ring_02',
            false,
            true,
            [0, 0, 0],
            getColorsFromMitug(mitug).bg,
            0.75,
            vertices,
            inTangents,
            outTangents,
            true,
            [42.5417, -5.6811]
        );
    };

    const createGlobeRing03 = () => {
        const vertices: [number, number][] = [
            [14.9681243896484, 0],
            [0, 14.9681243896484],
            [-14.9681243896484, 0],
            [0, -14.9681243896484]
        ];
        const inTangents: [number, number][] = [
            [0, -8.26666259765625],
            [8.26666259765625, 0],
            [0, 8.26666259765625],
            [-8.26666259765625, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 8.26666259765625],
            [-8.26666259765625, 0],
            [0, -8.26666259765625],
            [8.26666259765625, 0]
        ];

        createPathGrp(
            contents,
            'Globe_Ring_03',
            false,
            true,
            [0, 0, 0],
            getColorsFromMitug(mitug).bg,
            0.75,
            vertices,
            inTangents,
            outTangents,
            true,
            [42.5417, -5.6811]
        );
    };

    const createGlobeRing04 = () => {
        const vertices: [number, number][] = [
            [9.63478088378906, 0],
            [0, 9.63478088378906],
            [-9.63478088378906, 0],
            [0, -9.63478088378906]
        ];
        const inTangents: [number, number][] = [
            [0, -5.32115173339844],
            [5.32115173339844, 0],
            [0, 5.32115173339844],
            [-5.32115173339844, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 5.32115173339844],
            [-5.32115173339844, 0],
            [0, -5.32115173339844],
            [5.32115173339844, 0]
        ];

        createPathGrp(
            contents,
            'Globe_Ring_04',
            false,
            true,
            [0, 0, 0],
            getColorsFromMitug(mitug).bg,
            0.75,
            vertices,
            inTangents,
            outTangents,
            true,
            [42.5417, -5.6811]
        );
    };

    const createGlobeRing05 = () => {
        const vertices: [number, number][] = [
            [-9.75123596191406, 0],
            [9.75123596191406, 0]
        ];
        const inTangents: [number, number][] = [
            [0, 0],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Globe_Ring_05',
            false,
            true,
            [0, 0, 0],
            getColorsFromMitug(mitug).bg,
            0.75,
            vertices,
            inTangents,
            outTangents,
            true,
            [57.3002, -5.6811]
        );
    };

    const createGlobeRing06 = () => {
        const vertices: [number, number][] = [
            [-9.75123596191406, 0],
            [9.75123596191406, 0]
        ];
        const inTangents: [number, number][] = [
            [0, 0],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Globe_Ring_06',
            false,
            true,
            [0, 0, 0],
            getColorsFromMitug(mitug).bg,
            0.75,
            vertices,
            inTangents,
            outTangents,
            true,
            [27.7831, -5.6811]
        );
    };

    const createGlobeRing07 = () => {
        const vertices: [number, number][] = [
            [0, -9.75123596191406],
            [0, 9.75123596191406]
        ];
        const inTangents: [number, number][] = [
            [0, 0],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Globe_Ring_07',
            false,
            true,
            [0, 0, 0],
            getColorsFromMitug(mitug).bg,
            0.75,
            vertices,
            inTangents,
            outTangents,
            true,
            [42.5417, 9.0775]
        );
    };

    const createGlobeRing08 = () => {
        const vertices: [number, number][] = [
            [0, -9.75123596191406],
            [0, 9.75123596191406]
        ];
        const inTangents: [number, number][] = [
            [0, 0],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Globe_Ring_08',
            false,
            true,
            [0, 0, 0],
            getColorsFromMitug(mitug).bg,
            0.75,
            vertices,
            inTangents,
            outTangents,
            true,
            [42.5417, -20.4397]
        );
    };

    const createGlobeRing09 = () => {
        const vertices: [number, number][] = [
            [-6.839599609375, -6.839599609375],
            [6.839599609375, 6.839599609375]
        ];
        const inTangents: [number, number][] = [
            [0, 0],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Globe_Ring_09',
            false,
            true,
            [0, 0, 0],
            getColorsFromMitug(mitug).bg,
            0.75,
            vertices,
            inTangents,
            outTangents,
            true,
            [53.0331, 4.8104]
        );
    };

    const createGlobeRing10 = () => {
        const vertices: [number, number][] = [
            [-6.89515686035156, -6.89515686035156],
            [6.89515686035156, 6.89515686035156]
        ];
        const inTangents: [number, number][] = [
            [0, 0],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Globe_Ring_10',
            false,
            true,
            [0, 0, 0],
            getColorsFromMitug(mitug).bg,
            0.75,
            vertices,
            inTangents,
            outTangents,
            true,
            [32.1058, -16.117]
        );
    };

    const createGlobeRing11 = () => {
        const vertices: [number, number][] = [
            [6.89517211914062, -6.89517211914062],
            [-6.89517211914062, 6.89517211914062]
        ];
        const inTangents: [number, number][] = [
            [0, 0],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Globe_Ring_11',
            false,
            true,
            [0, 0, 0],
            getColorsFromMitug(mitug).bg,
            0.75,
            vertices,
            inTangents,
            outTangents,
            true,
            [32.1058, 4.7548]
        );
    };

    const createGlobeRing12 = () => {
        const vertices: [number, number][] = [
            [6.83961486816406, -6.83961486816406],
            [-6.83961486816406, 6.83961486816406]
        ];
        const inTangents: [number, number][] = [
            [0, 0],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Globe_Ring_12',
            false,
            true,
            [0, 0, 0],
            getColorsFromMitug(mitug).bg,
            0.75,
            vertices,
            inTangents,
            outTangents,
            true,
            [53.0331, -16.1725]
        );
    };

    const createCountries = () => {
        const vertices: [number, number][] = [
            [-1.96661376953125, 3.48243713378906],
            [-1.59661865234375, 3.46241760253906],
            [0.943359375, 4.60243225097656],
            [1.27337646484375, 5.28242492675781],
            [1.3233642578125, 5.79243469238281],
            [1.3533935546875, 5.87245178222656],
            [1.39337158203125, 6.44245910644531],
            [1.0833740234375, 6.92243957519531],
            [0.80340576171875, 6.89247131347656],
            [0.443359375, 7.11244201660156],
            [0.37335205078125, 7.30244445800781],
            [1.03338623046875, 8.18244934082031],
            [1.17340087890625, 8.17243957519531],
            [1.42340087890625, 8.25245666503906],
            [1.203369140625, 8.57246398925781],
            [-0.62664794921875, 9.12245178222656],
            [-0.83660888671875, 9.49244689941406],
            [-1.1866455078125, 9.72242736816406],
            [-1.756591796875, 10.6524200439453],
            [-1.99664306640625, 10.9424591064453],
            [-2.0166015625, 11.3924713134766],
            [-1.35662841796875, 12.3724517822266],
            [0.01336669921875, 13.2624664306641],
            [1.3133544921875, 13.4924468994141],
            [2.3533935546875, 13.2624664306641],
            [3.473388671875, 13.5124664306641],
            [4.75335693359375, 14.7024688720703],
            [5.223388671875, 15.3324737548828],
            [5.18341064453125, 16.0724639892578],
            [5.8433837890625, 17.2824249267578],
            [5.973388671875, 17.3124542236328],
            [6.46337890625, 17.7924346923828],
            [6.8634033203125, 18.4124298095703],
            [7.8333740234375, 18.8024444580078],
            [8.1033935546875, 18.8824615478516],
            [10.3233642578125, 17.7224273681641],
            [13.9334106445312, 14.8824615478516],
            [15.2633666992188, 13.7524566650391],
            [15.8788604736328, 13.0981597900391],
            [15.8233642578125, 12.2924346923828],
            [15.5333862304688, 12.4924468994141],
            [15.453369140625, 12.1524200439453],
            [15.2833862304688, 11.0124664306641],
            [14.96337890625, 10.5324249267578],
            [14.3133544921875, 10.7424468994141],
            [14.1734008789062, 11.2424468994141],
            [12.8933715820312, 9.95246887207031],
            [12.2633666992188, 9.25245666503906],
            [12.1533813476562, 8.98243713378906],
            [11.8533935546875, 7.76246643066406],
            [11.5733642578125, 7.70246887207031],
            [11.2733764648438, 8.03242492675781],
            [11.1033935546875, 8.12245178222656],
            [11.0233764648438, 7.94245910644531],
            [11.0534057617188, 7.68244934082031],
            [11.473388671875, 5.68244934082031],
            [10.6834106445312, 5.23243713378906],
            [10.493408203125, 5.53242492675781],
            [10.1533813476562, 5.94245910644531],
            [9.66339111328125, 6.09242248535156],
            [9.39337158203125, 5.96241760253906],
            [9.5733642578125, 5.76246643066406],
            [10.223388671875, 5.26246643066406],
            [10.743408203125, 4.88246154785156],
            [11.1633911132812, 4.19245910644531],
            [12.0534057617188, 3.51246643066406],
            [12.5233764648438, 3.22242736816406],
            [12.8034057617188, 3.13246154785156],
            [13.5033569335938, 3.10243225097656],
            [14.6333618164062, 2.72242736816406],
            [14.8233642578125, 2.36244201660156],
            [13.9334106445312, 1.65242004394531],
            [13.5534057617188, 1.26246643066406],
            [12.8533935546875, -0.02757263183594],
            [12.7533569335938, -0.29753112792969],
            [13.0133666992188, -0.41752624511719],
            [16.0333862304688, -0.41752624511719],
            [16.96337890625, -1.36753845214844],
            [16.7833862304688, -3.04753112792969],
            [16.8233642578125, -4.50755310058594],
            [16.5333862304688, -4.89756774902344],
            [16.3233642578125, -5.09757995605469],
            [15.7733764648438, -6.85752868652344],
            [15.3533935546875, -7.59757995605469],
            [15.203369140625, -8.27757263183594],
            [14.973388671875, -8.82756042480469],
            [14.723388671875, -8.86753845214844],
            [14.5633544921875, -8.89756774902344],
            [14.1433715820312, -9.67753601074219],
            [13.6433715820312, -10.3375701904297],
            [13.193359375, -10.7575531005859],
            [13.1033935546875, -11.5775604248047],
            [13.2733764648438, -11.7475433349609],
            [14.0833740234375, -11.6475677490234],
            [14.6633911132812, -11.4975433349609],
            [14.9334106445312, -11.4675750732422],
            [15.0233764648438, -11.2875823974609],
            [15.9033813476562, -10.3775482177734],
            [16.2933959960938, -10.1175384521484],
            [16.7333984375, -9.90757751464844],
            [17.21337890625, -9.59757995605469],
            [18.2333984375, -8.38755798339844],
            [18.3833618164062, -8.25755310058594],
            [19.0233764648438, -8.15757751464844],
            [19.493408203125, -8.00755310058594],
            [20.473388671875, -4.92753601074219],
            [20.493408203125, -4.84757995605469],
            [20.8933715820312, -5.82756042480469],
            [19.9033813476562, -8.65757751464844],
            [20.0833740234375, -9.20756530761719],
            [20.1134033203125, -9.78758239746094],
            [18.6033935546875, -11.8875579833984],
            [17.96337890625, -12.4375457763672],
            [17.703369140625, -12.8675384521484],
            [17.1233520507812, -13.4775238037109],
            [16.5633544921875, -14.0575408935547],
            [16.443359375, -14.2575531005859],
            [16.4234008789062, -14.8975677490234],
            [17.0133666992188, -15.4875335693359],
            [16.5833740234375, -15.9575653076172],
            [16.193359375, -15.5675506591797],
            [15.8634033203125, -15.4375457763672],
            [15.8634033203125, -15.7175750732422],
            [15.5333862304688, -16.0175628662109],
            [15.223388671875, -16.3175506591797],
            [14.5433959960938, -17.4175262451172],
            [13.8133544921875, -17.8675384521484],
            [13.7833862304688, -17.8875579833984],
            [12.5933837890625, -18.5775604248047],
            [11.6033935546875, -18.4975433349609],
            [10.493408203125, -18.4875335693359],
            [9.6033935546875, -18.8975677490234],
            [8.67340087890625, -18.5875701904297],
            [9.87335205078125, -18.0675506591797],
            [10.0433959960938, -17.7175750732422],
            [10.1233520507812, -17.4975433349609],
            [10.7833862304688, -17.0475311279297],
            [11.1533813476562, -16.0975799560547],
            [11.3433837890625, -15.7075653076172],
            [11.5433959960938, -15.1275482177734],
            [11.6033935546875, -14.6475677490234],
            [11.7633666992188, -14.0675506591797],
            [12.2333984375, -13.8775482177734],
            [13.0333862304688, -14.0075531005859],
            [13.6433715820312, -13.2275238037109],
            [13.6033935546875, -13.0375823974609],
            [12.6734008789062, -12.0675506591797],
            [12.3433837890625, -12.0475311279297],
            [12.3634033203125, -12.4875335693359],
            [12.3733520507812, -12.9175262451172],
            [11.8933715820312, -13.4975433349609],
            [11.443359375, -13.7075653076172],
            [10.8933715820312, -14.0975799560547],
            [9.93341064453125, -15.0975799560547],
            [9.5933837890625, -15.0275726318359],
            [9.78338623046875, -14.7575531005859],
            [10.1533813476562, -14.0375823974609],
            [10.193359375, -13.8075408935547],
            [10.9133911132812, -12.9875335693359],
            [10.8333740234375, -12.9175262451172],
            [9.3333740234375, -13.8675384521484],
            [9.2333984375, -14.0675506591797],
            [9.40338134765625, -14.1375579833984],
            [9.77337646484375, -14.1775360107422],
            [9.743408203125, -14.3975677490234],
            [9.3133544921875, -14.6075286865234],
            [8.6033935546875, -14.3475799560547],
            [8.3333740234375, -14.3975677490234],
            [6.243408203125, -15.2175750732422],
            [6.02337646484375, -14.6275482177734],
            [8.5933837890625, -13.5475311279297],
            [10.3333740234375, -12.4575653076172],
            [11.3133544921875, -11.5075531005859],
            [11.3634033203125, -11.4675750732422],
            [11.3933715820312, -10.7675628662109],
            [8.92340087890625, -8.28758239746094],
            [8.1033935546875, -7.56755065917969],
            [7.92340087890625, -7.56755065917969],
            [7.25335693359375, -7.54753112792969],
            [7.0933837890625, -7.30754089355469],
            [7.3333740234375, -7.17753601074219],
            [7.5733642578125, -7.10752868652344],
            [7.46337890625, -6.83757019042969],
            [6.76336669921875, -6.13755798339844],
            [6.21337890625, -5.97752380371094],
            [6.02337646484375, -6.43754577636719],
            [5.53338623046875, -6.09757995605469],
            [5.55340576171875, -5.25755310058594],
            [5.473388671875, -4.97752380371094],
            [4.89337158203125, -5.08757019042969],
            [4.12335205078125, -5.53758239746094],
            [4.04339599609375, -5.82756042480469],
            [4.203369140625, -6.34757995605469],
            [4.14337158203125, -6.58757019042969],
            [3.87335205078125, -6.56755065917969],
            [3.40338134765625, -6.13755798339844],
            [3.01336669921875, -5.95756530761719],
            [2.53338623046875, -6.03758239746094],
            [1.0833740234375, -6.04753112792969],
            [0.28338623046875, -5.87754821777344],
            [-0.026611328125, -6.06755065917969],
            [-0.07659912109375, -6.17753601074219],
            [-0.24664306640625, -6.09757995605469],
            [-1.546630859375, -4.92753601074219],
            [-2.03662109375, -4.95756530761719],
            [-2.86663818359375, -4.77757263183594],
            [-3.11663818359375, -4.73753356933594],
            [-3.69659423828125, -4.75755310058594],
            [-4.06658935546875, -4.86753845214844],
            [-4.86663818359375, -5.45756530761719],
            [-6.32659912109375, -5.25755310058594],
            [-6.49664306640625, -5.15757751464844],
            [-7.07659912109375, -5.50755310058594],
            [-7.71661376953125, -5.02757263183594],
            [-8.19659423828125, -4.75755310058594],
            [-7.7666015625, -4.53758239746094],
            [-8.19659423828125, -4.26756286621094],
            [-9.35662841796875, -3.93754577636719],
            [-9.556640625, -3.76756286621094],
            [-10.3366088867188, -1.86753845214844],
            [-11.0866088867188, -0.33757019042969],
            [-11.1666259765625, -0.16752624511719],
            [-11.6566162109375, 1.00245666503906],
            [-11.5166015625, 1.32246398925781],
            [-11.4465942382812, 1.63246154785156],
            [-12.1566162109375, 1.76246643066406],
            [-13.306640625, 1.08247375488281],
            [-13.3865966796875, 1.29243469238281],
            [-14.1766357421875, 2.04243469238281],
            [-14.9266357421875, 3.73243713378906],
            [-14.9066162109375, 4.17243957519531],
            [-15.3366088867188, 5.02247619628906],
            [-16.1866455078125, 5.22242736816406],
            [-16.5166015625, 4.98243713378906],
            [-17.2066040039062, 4.91242980957031],
            [-17.4266357421875, 5.20246887207031],
            [-18.1766357421875, 4.86244201660156],
            [-18.4366455078125, 4.75245666503906],
            [-19.1866455078125, 5.22242736816406],
            [-19.306640625, 5.35243225097656],
            [-19.53662109375, 5.41242980957031],
            [-19.6866455078125, 5.19245910644531],
            [-19.5166015625, 5.02247619628906],
            [-19.306640625, 4.84242248535156],
            [-19.5665893554688, 4.73243713378906],
            [-20.53662109375, 4.89247131347656],
            [-20.8666381835938, 5.54243469238281],
            [-20.8766479492188, 6.33247375488281],
            [-20.6766357421875, 7.40242004394531],
            [-20.3566284179688, 8.32246398925781],
            [-20.03662109375, 8.56245422363281],
            [-19.8265991210938, 8.23243713378906],
            [-19.9066162109375, 7.83247375488281],
            [-19.8366088867188, 7.55244445800781],
            [-19.526611328125, 7.60243225097656],
            [-19.1766357421875, 7.97242736816406],
            [-18.6365966796875, 8.00245666503906],
            [-18.3466186523438, 8.02247619628906],
            [-17.5765991210938, 8.70246887207031],
            [-16.6066284179688, 9.65242004394531],
            [-15.5966186523438, 10.2924346923828],
            [-15.306640625, 10.4924468994141],
            [-14.0966186523438, 11.4024200439453],
            [-13.7266235351562, 11.6224517822266],
            [-12.5765991210938, 12.9024200439453],
            [-12.6066284179688, 13.2224273681641],
            [-12.1666259765625, 13.6824493408203],
            [-11.7666015625, 13.7124176025391],
            [-11.1866455078125, 13.3824615478516],
            [-11.1866455078125, 12.7024688720703],
            [-10.9465942382812, 12.7624664306641],
            [-10.53662109375, 12.9924468994141],
            [-9.74664306640625, 12.9924468994141],
            [-8.97662353515625, 12.7124176025391],
            [-8.37664794921875, 12.5124664306641],
            [-7.6466064453125, 12.5024566650391],
            [-7.22662353515625, 11.7724761962891],
            [-7.4166259765625, 11.4624176025391],
            [-7.94659423828125, 10.0424346923828],
            [-8.99664306640625, 9.06245422363281],
            [-9.056640625, 8.09242248535156],
            [-9.10662841796875, 8.28242492675781],
            [-9.48663330078125, 7.09242248535156],
            [-9.776611328125, 6.24244689941406],
            [-9.82659912109375, 5.73243713378906],
            [-9.74664306640625, 5.47242736816406],
            [-9.9266357421875, 4.54243469238281],
            [-10.1766357421875, 4.24244689941406],
            [-11.026611328125, 2.16242980957031],
            [-11.1266479492188, 1.64247131347656],
            [-11.1866455078125, 1.21241760253906],
            [-10.8766479492188, 0.66242980957031],
            [-10.3366088867188, -0.01756286621094],
            [-9.8865966796875, -0.34757995605469],
            [-8.78662109375, -0.40757751464844],
            [-8.3865966796875, -0.22752380371094],
            [-8.45660400390625, 0.34242248535156],
            [-8.6566162109375, 0.53242492675781],
            [-8.6766357421875, 1.06245422363281],
            [-8.546630859375, 1.27247619628906],
            [-8.756591796875, 1.31245422363281],
            [-8.83660888671875, 1.47242736816406],
            [-8.33660888671875, 1.46241760253906],
            [-8.1566162109375, 1.29243469238281],
            [-7.46661376953125, 1.06245422363281],
            [-7.3966064453125, 1.00245666503906],
            [-6.3966064453125, 1.43244934082031],
            [-5.8865966796875, 1.74244689941406],
            [-5.53662109375, 1.91242980957031],
            [-5.256591796875, 2.13246154785156],
            [-4.62664794921875, 2.76246643066406],
            [-4.506591796875, 2.53242492675781],
            [-4.37664794921875, 2.35243225097656],
            [-4.24664306640625, 2.58247375488281],
            [-4.09661865234375, 3.51246643066406],
            [-3.78662109375, 3.48243713378906],
            [-3.22662353515625, 2.25245666503906],
            [-3.026611328125, 1.91242980957031],
            [-2.7666015625, 2.13246154785156],
            [-2.49664306640625, 2.52247619628906],
            [-2.556640625, 3.18244934082031]
        ];
        const inTangents: [number, number][] = [
            [-0.82000732421875, 0.83001708984375],
            [-0.1500244140625, -0.1199951171875],
            [-0.94000244140625, -0.15997314453125],
            [0.19000244140625, -0.3399658203125],
            [-0.3699951171875, -0.1400146484375],
            [0.010009765625, -0.010009765625],
            [-0.19000244140625, -0.21002197265625],
            [0.22003173828125, -0.010009765625],
            [0.0899658203125, 0.02996826171875],
            [0, -0.27996826171875],
            [0.010009765625, -0.05999755859375],
            [-0.739990234375, 0.010009765625],
            [-0.07000732421875, 0],
            [-0.02001953125, -0.22003173828125],
            [0.19000244140625, -0.0400390625],
            [0, 0],
            [0.1199951171875, -0.09002685546875],
            [0.1300048828125, -0.05999755859375],
            [0.17999267578125, -0.30999755859375],
            [0.1199951171875, -0.04998779296875],
            [-0.1500244140625, -0.09002685546875],
            [-0.16998291015625, -0.34002685546875],
            [-0.6400146484375, -0.02001953125],
            [-0.4599609375, 0.07000732421875],
            [0, 0],
            [-0.4000244140625, 0.01995849609375],
            [0, 0],
            [-0.1500244140625, -0.21002197265625],
            [0.0899658203125, -0.25],
            [-0.46002197265625, -0.13995361328125],
            [-0.03997802734375, -0.010009765625],
            [-0.02996826171875, -0.2099609375],
            [0, 0],
            [-0.260009765625, -0.4000244140625],
            [-0.1099853515625, 0.01995849609375],
            [-0.63995361328125, 0.60003662109375],
            [-1.24005126953125, 0.90997314453125],
            [-0.42999267578125, 0.3900146484375],
            [0, 0],
            [0, 0],
            [0.1400146484375, 0.04998779296875],
            [0.030029296875, 0.12005615234375],
            [0.02996826171875, 0.3800048828125],
            [0.15997314453125, 0.1199951171875],
            [0.09002685546875, -0.28997802734375],
            [0.05999755859375, -0.21002197265625],
            [0.4100341796875, 0.40997314453125],
            [0, 0],
            [0, 0.10003662109375],
            [-0.02001953125, 0.449951171875],
            [0.10003662109375, -0.10003662109375],
            [0.0999755859375, -0.1099853515625],
            [0.08001708984375, 0.02001953125],
            [0.010009765625, 0.07000732421875],
            [-0.05999755859375, 0.09002685546875],
            [0.02996826171875, 0.70001220703125],
            [0.39996337890625, -0.219970703125],
            [-0.030029296875, -0.14996337890625],
            [0.219970703125, -0.05999755859375],
            [0.16998291015625, -0.02996826171875],
            [0.030029296875, 0.1400146484375],
            [-0.0999755859375, 0.01995849609375],
            [-0.1300048828125, 0.28997802734375],
            [-0.1500244140625, 0.16998291015625],
            [-0.07000732421875, 0.27996826171875],
            [-0.59002685546875, 0],
            [-0.05999755859375, 0.27001953125],
            [-0.11004638671875, -0.05999755859375],
            [-0.25, 0.09002685546875],
            [-0.42999267578125, 0],
            [0.1400146484375, 0.22003173828125],
            [0.39996337890625, 0.10003662109375],
            [0.04998779296875, 0.199951171875],
            [0.45001220703125, 0.30999755859375],
            [-0.04998779296875, 0.1099853515625],
            [-0.0999755859375, 0],
            [0, 0],
            [0, 0],
            [0.1099853515625, 0.55999755859375],
            [0.010009765625, 0.489990234375],
            [0.25, 0.02001953125],
            [0.030029296875, 0.11004638671875],
            [0.17999267578125, 0.5899658203125],
            [0.27996826171875, 0.20001220703125],
            [-0.239990234375, 0.32000732421875],
            [0.07000732421875, 0.19000244140625],
            [0.0999755859375, -0.08001708984375],
            [0.030029296875, 0.07000732421875],
            [0.04998779296875, 0.32000732421875],
            [0.1300048828125, 0.260009765625],
            [0.23004150390625, 0.09002685546875],
            [-0.20001220703125, 0.21002197265625],
            [-0.05999755859375, 0.05999755859375],
            [-0.29998779296875, -0.489990234375],
            [-0.34002685546875, 0.44000244140625],
            [-0.08001708984375, -0.0799560546875],
            [0, -0.05999755859375],
            [-0.469970703125, -0.1300048828125],
            [-0.10003662109375, -0.1400146484375],
            [-0.19000244140625, 0.010009765625],
            [-0.1500244140625, -0.15997314453125],
            [-0.36004638671875, -0.3900146484375],
            [-0.02996826171875, -0.05999755859375],
            [-0.21002197265625, 0.1500244140625],
            [-0.10003662109375, -0.25],
            [-0.239990234375, -1.04998779296875],
            [0, 0],
            [-0.010009765625, -0.02996826171875],
            [0.40997314453125, 0.9200439453125],
            [-0.29998779296875, 0.1300048828125],
            [0.1300048828125, 0.1600341796875],
            [0.58001708984375, 0.6400146484375],
            [0.15997314453125, 0.260009765625],
            [0.07000732421875, 0.15997314453125],
            [0.34002685546875, 0.0999755859375],
            [0.1400146484375, 0.239990234375],
            [0.05999755859375, 0.030029296875],
            [-0.17999267578125, 0.19000244140625],
            [-0.20001220703125, 0.19000244140625],
            [0, 0],
            [0, 0],
            [0.13995361328125, 0.05999755859375],
            [-0.010009765625, 0.10003662109375],
            [0.19000244140625, 0],
            [-0.02001953125, 0.17999267578125],
            [0.26995849609375, 0.3399658203125],
            [0.35003662109375, -0.02001953125],
            [0.010009765625, 0.010009765625],
            [0.41998291015625, 0.19000244140625],
            [0.29998779296875, -0.1300048828125],
            [0.29998779296875, 0.1300048828125],
            [0.3599853515625, 0.17999267578125],
            [0, 0],
            [-0.38995361328125, -0.19000244140625],
            [0.1400146484375, -0.22998046875],
            [-0.1099853515625, 0],
            [-0.21002197265625, -0.1500244140625],
            [-0.02001953125, -0.3499755859375],
            [-0.16998291015625, -0.08001708984375],
            [0.0899658203125, -0.25],
            [-0.1300048828125, -0.14996337890625],
            [-0.03997802734375, -0.20001220703125],
            [-0.260009765625, 0.20001220703125],
            [-0.28997802734375, -0.1500244140625],
            [-0.0899658203125, -0.34002685546875],
            [0.03997802734375, -0.03997802734375],
            [0.32000732421875, -0.32000732421875],
            [0.0999755859375, 0.1199951171875],
            [-0.1300048828125, 0.0999755859375],
            [0.11004638671875, 0.13995361328125],
            [0.1600341796875, 0.19000244140625],
            [0.20001220703125, -0.010009765625],
            [0.1199951171875, 0.25],
            [0.38995361328125, 0.27001953125],
            [0.08001708984375, -0.17999267578125],
            [-0.16998291015625, -0.03997802734375],
            [0.1500244140625, -0.3299560546875],
            [-0.0899658203125, -0.030029296875],
            [-0.3900146484375, -0.1500244140625],
            [0.030029296875, -0.02001953125],
            [0.5, 0.32000732421875],
            [-0.030029296875, 0.09002685546875],
            [-0.07000732421875, -0.02001953125],
            [-0.0999755859375, 0.14996337890625],
            [0.05999755859375, 0.05999755859375],
            [0.1400146484375, -0.10003662109375],
            [0.1400146484375, -0.37994384765625],
            [0.08001708984375, 0.0400390625],
            [0.7099609375, 0.22003173828125],
            [0, 0],
            [-0.83001708984375, -0.46002197265625],
            [-0.52996826171875, -0.44000244140625],
            [-0.22998046875, -0.41998291015625],
            [-0.02001953125, -0.00994873046875],
            [0.3599853515625, -0.3599853515625],
            [0.82000732421875, -0.8399658203125],
            [0, 0],
            [0.02996826171875, 0.04998779296875],
            [-0.02001953125, -0.1199951171875],
            [0.22003173828125, -0.1300048828125],
            [-0.1099853515625, 0.010009765625],
            [-0.04998779296875, -0.11004638671875],
            [0.07000732421875, -0.0799560546875],
            [0.23004150390625, -0.239990234375],
            [0.19000244140625, 0.00994873046875],
            [0.1099853515625, 0.15997314453125],
            [0.15997314453125, -0.1099853515625],
            [-0.2900390625, -0.29998779296875],
            [0.16998291015625, -0.0400390625],
            [0.17999267578125, 0.1600341796875],
            [0.27001953125, 0.1300048828125],
            [-0.1099853515625, 0.1500244140625],
            [-0.02996826171875, 0.1800537109375],
            [0.10003662109375, 0.05999755859375],
            [0.07000732421875, -0.05999755859375],
            [0.09002685546875, -0.21002197265625],
            [0.17999267578125, 0.0400390625],
            [0.15997314453125, 0.030029296875],
            [0, 0],
            [0.260009765625, -0.05999755859375],
            [-0.030029296875, 0.27996826171875],
            [0.05999755859375, 0.01995849609375],
            [0.0400390625, -0.05999755859375],
            [0.47003173828125, -0.35003662109375],
            [0.16998291015625, 0.17999267578125],
            [0, 0],
            [0.08001708984375, 0.05999755859375],
            [0.2099609375, -0.1199951171875],
            [0.1099853515625, 0.07000732421875],
            [0.27001953125, 0.20001220703125],
            [0.42999267578125, -0.53997802734375],
            [0.1199951171875, 0],
            [0, 0],
            [0.239990234375, -0.1199951171875],
            [0.1300048828125, -0.15997314453125],
            [0.010009765625, -0.25994873046875],
            [0.19000244140625, -0.02996826171875],
            [0.44000244140625, 0.03997802734375],
            [0.030029296875, -0.07000732421875],
            [0.07000732421875, -0.72003173828125],
            [0, 0],
            [0.03997802734375, -0.050048828125],
            [0.1400146484375, -0.4000244140625],
            [-0.17999267578125, -0.05999755859375],
            [0.0899658203125, -0.1300048828125],
            [0.34002685546875, 0.1199951171875],
            [0, 0],
            [0.07000732421875, -0.010009765625],
            [0.280029296875, -0.22998046875],
            [0.09002685546875, -0.6300048828125],
            [-0.03997802734375, -0.1400146484375],
            [0.3900146484375, -0.21002197265625],
            [0.300048828125, -0.01995849609375],
            [0.05999755859375, 0.16998291015625],
            [0, 0],
            [0.22003173828125, 0],
            [0.1600341796875, 0.32000732421875],
            [0.08001708984375, -0.04998779296875],
            [0.1400146484375, -0.3299560546875],
            [0.050048828125, -0.03997802734375],
            [0.09002685546875, 0.08001708984375],
            [0.02001953125, 0.08001708984375],
            [-0.08001708984375, 0.02996826171875],
            [0.02001953125, 0.1400146484375],
            [0.0899658203125, 0.010009765625],
            [0.29998779296875, -0.1500244140625],
            [-0.01995849609375, -0.19000244140625],
            [-0.04998779296875, -0.24005126953125],
            [-0.14996337890625, -0.3399658203125],
            [-0.0999755859375, -0.30999755859375],
            [-0.16998291015625, 0.02001953125],
            [0.010009765625, 0.1500244140625],
            [0.02996826171875, 0.12994384765625],
            [-0.10003662109375, 0.07000732421875],
            [-0.09002685546875, -0.0899658203125],
            [-0.0899658203125, -0.15997314453125],
            [-0.17999267578125, 0.239990234375],
            [-0.0999755859375, -0.1500244140625],
            [-0.2900390625, -0.20001220703125],
            [-0.1199951171875, -0.55999755859375],
            [-0.53997802734375, 0.07000732421875],
            [-0.07000732421875, -0.1099853515625],
            [-0.59002685546875, -0.0699462890625],
            [-0.0999755859375, -0.1199951171875],
            [-0.3900146484375, -0.42999267578125],
            [0.1099853515625, -0.0999755859375],
            [0, 0],
            [-0.1400146484375, -0.12994384765625],
            [0, 0],
            [-0.3399658203125, 0.25994873046875],
            [-0.0400390625, -0.1700439453125],
            [-0.17999267578125, 0],
            [-0.25994873046875, -0.02001953125],
            [-0.21002197265625, 0.25],
            [-0.2099609375, 0.010009765625],
            [-0.239990234375, 0.010009765625],
            [0.22998046875, 0.43994140625],
            [0.05999755859375, 0.11004638671875],
            [0, 0],
            [0, 0],
            [-0.28997802734375, 0.30999755859375],
            [0.02001953125, 0.0400390625],
            [0.260009765625, 0.280029296875],
            [-0.010009765625, 0.32000732421875],
            [0.07000732421875, 0.16998291015625],
            [-0.0899658203125, 0.08001708984375],
            [0.32000732421875, 0.1099853515625],
            [-0.03997802734375, 0.17999267578125],
            [0.45001220703125, 0.6199951171875],
            [-0.1199951171875, 0.2099609375],
            [0.0400390625, 0.1400146484375],
            [-0.3399658203125, 0.09002685546875],
            [0, 0.4100341796875],
            [-0.32000732421875, -0.0899658203125],
            [-0.3699951171875, -0.01995849609375],
            [-0.05999755859375, -0.21002197265625],
            [0.16998291015625, -0.16998291015625],
            [0.05999755859375, -0.05999755859375],
            [-0.20001220703125, -0.17999267578125],
            [0.04998779296875, -0.11004638671875],
            [0.0699462890625, 0],
            [-0.07000732421875, -0.0999755859375],
            [-0.1400146484375, 0.21002197265625],
            [-0.0999755859375, -0.01995849609375],
            [0, 0],
            [-0.030029296875, 0.02001953125],
            [-0.4000244140625, 0.02996826171875],
            [-0.09002685546875, -0.22998046875],
            [-0.19000244140625, 0.05999755859375],
            [0.02996826171875, -0.27001953125],
            [-0.2099609375, 0.010009765625],
            [0, 0.09002685546875],
            [-0.13995361328125, -0.01995849609375],
            [0.050048828125, -0.10003662109375],
            [-0.010009765625, -0.32000732421875],
            [-0.010009765625, 0.1099853515625],
            [0.05999755859375, 0.52001953125],
            [-0.1400146484375, 0.04998779296875],
            [-0.07000732421875, -0.09002685546875],
            [-0.1099853515625, -0.10003662109375],
            [0.23004150390625, -0.22003173828125]
        ];
        const outTangents: [number, number][] = [
            [0.1300048828125, -0.1300048828125],
            [0.739990234375, 0.62005615234375],
            [0.3900146484375, 0.05999755859375],
            [-0.0999755859375, 0.1700439453125],
            [0.02001953125, 0.010009765625],
            [-0.23004150390625, 0.21002197265625],
            [0.1400146484375, 0.14996337890625],
            [-0.0899658203125, 0.010009765625],
            [-0.21002197265625, -0.05999755859375],
            [0, 0.07000732421875],
            [-0.12994384765625, 0.530029296875],
            [0, 0],
            [0.0899658203125, 0.010009765625],
            [0.01995849609375, 0.15997314453125],
            [0, 0],
            [0, 0.1199951171875],
            [-0.1099853515625, 0.08001708984375],
            [-0.41998291015625, 0.1700439453125],
            [-0.07000732421875, 0.12005615234375],
            [-0.29998779296875, 0.1400146484375],
            [0.3800048828125, 0.239990234375],
            [0.2900390625, 0.5999755859375],
            [0.44000244140625, 0.01995849609375],
            [0, 0],
            [0.3900146484375, 0.010009765625],
            [0, 0],
            [0.1800537109375, 0.0899658203125],
            [0.20001220703125, 0.25994873046875],
            [-0.1500244140625, 0.45001220703125],
            [0.03997802734375, 0.010009765625],
            [0.22998046875, 0.0899658203125],
            [0, 0],
            [0.4599609375, -0.0999755859375],
            [0.08001708984375, 0.1199951171875],
            [0.8499755859375, -0.1700439453125],
            [1.1199951171875, -1.04998779296875],
            [0.469970703125, -0.34002685546875],
            [0, 0],
            [0, 0],
            [-0.0799560546875, 0.09002685546875],
            [-0.1400146484375, -0.04998779296875],
            [-0.0999755859375, -0.3699951171875],
            [-0.02001953125, -0.21002197265625],
            [-0.239990234375, -0.17999267578125],
            [-0.04998779296875, 0.1400146484375],
            [-0.46002197265625, -0.46002197265625],
            [0, 0],
            [-0.1199951171875, -0.0400390625],
            [0, -0.42999267578125],
            [0.010009765625, -0.1700439453125],
            [-0.1199951171875, 0.0899658203125],
            [-0.03997802734375, 0.050048828125],
            [-0.08001708984375, -0.030029296875],
            [-0.010009765625, -0.09002685546875],
            [0.3800048828125, -0.6199951171875],
            [-0.02001953125, -0.46002197265625],
            [-0.11004638671875, 0.05999755859375],
            [0.04998779296875, 0.27001953125],
            [-0.16998291015625, 0.03997802734375],
            [-0.1099853515625, 0.030029296875],
            [-0.02996826171875, -0.13995361328125],
            [0.29998779296875, -0.05999755859375],
            [0.0899658203125, -0.21002197265625],
            [0.19000244140625, -0.20001220703125],
            [0.14996337890625, -0.57000732421875],
            [0.219970703125, -0.010009765625],
            [0.030029296875, -0.14996337890625],
            [0.25, 0.1400146484375],
            [0.3800048828125, -0.1199951171875],
            [0.239990234375, 0.010009765625],
            [-0.2099609375, -0.3399658203125],
            [-0.22003173828125, -0.05999755859375],
            [-0.10003662109375, -0.5],
            [0.0400390625, -0.1199951171875],
            [-0.08001708984375, -0.05999755859375],
            [0, 0],
            [0, 0],
            [-0.03997802734375, -0.55999755859375],
            [-0.0999755859375, -0.48004150390625],
            [-0.010009765625, -0.27001953125],
            [-0.1199951171875, -0.010009765625],
            [-0.15997314453125, -0.5899658203125],
            [-0.0899658203125, -0.30999755859375],
            [-0.1600341796875, -0.1099853515625],
            [0.17999267578125, -0.22998046875],
            [-0.04998779296875, -0.1300048828125],
            [-0.07000732421875, 0.05999755859375],
            [-0.1199951171875, -0.26995849609375],
            [-0.04998779296875, -0.280029296875],
            [-0.08001708984375, -0.16998291015625],
            [-0.25994873046875, -0.09002685546875],
            [0.04998779296875, -0.05999755859375],
            [0.4000244140625, -0.4000244140625],
            [0.1500244140625, 0.239990234375],
            [0.05999755859375, -0.09002685546875],
            [0.04998779296875, 0.050048828125],
            [0.03997802734375, 0.56005859375],
            [0.15997314453125, 0.03997802734375],
            [0.0999755859375, 0.15997314453125],
            [0.22998046875, 0],
            [0.3499755859375, 0.4000244140625],
            [0.03997802734375, 0.04998779296875],
            [0.17999267578125, 0.30999755859375],
            [0.27001953125, -0.199951171875],
            [0.39996337890625, 1.010009765625],
            [0.010009765625, 0.02996826171875],
            [0, 0],
            [-0.25, -0.96002197265625],
            [-0.0999755859375, -0.239990234375],
            [0.30999755859375, -0.1300048828125],
            [-0.5400390625, -0.67999267578125],
            [-0.19000244140625, -0.21002197265625],
            [-0.08001708984375, -0.1400146484375],
            [-0.1300048828125, -0.25],
            [-0.239990234375, -0.08001708984375],
            [-0.03997802734375, -0.07000732421875],
            [-0.3800048828125, -0.21002197265625],
            [0.19000244140625, -0.20001220703125],
            [0, 0],
            [0, 0],
            [-0.0899658203125, 0.09002685546875],
            [-0.1400146484375, -0.08001708984375],
            [0, -0.219970703125],
            [-0.21002197265625, -0.010009765625],
            [0.03997802734375, -0.53997802734375],
            [-0.20001220703125, -0.24005126953125],
            [-0.00994873046875, 0],
            [-0.22003173828125, -0.52996826171875],
            [-0.3599853515625, -0.16998291015625],
            [-0.3900146484375, 0.16998291015625],
            [-0.2900390625, -0.1400146484375],
            [0, 0],
            [0.40997314453125, 0.1500244140625],
            [0.1600341796875, 0.08001708984375],
            [-0.0400390625, 0.07000732421875],
            [0.32000732421875, 0.010009765625],
            [0.29998779296875, 0.219970703125],
            [0.02001953125, 0.1700439453125],
            [0.260009765625, 0.1199951171875],
            [-0.07000732421875, 0.16998291015625],
            [0.1400146484375, 0.1700439453125],
            [0.04998779296875, 0.32000732421875],
            [0.25, -0.19000244140625],
            [0.32000732421875, 0.15997314453125],
            [0.02001953125, 0.05999755859375],
            [-0.29998779296875, 0.33001708984375],
            [-0.09002685546875, 0.0999755859375],
            [-0.0999755859375, -0.1400146484375],
            [0.2099609375, -0.1600341796875],
            [-0.15997314453125, -0.19000244140625],
            [-0.1199951171875, -0.1300048828125],
            [-0.26995849609375, 0.010009765625],
            [-0.20001220703125, -0.42999267578125],
            [-0.1300048828125, -0.0899658203125],
            [-0.07000732421875, 0.17999267578125],
            [0.3800048828125, 0.0999755859375],
            [-0.04998779296875, 0.10003662109375],
            [0.42999267578125, 0.1400146484375],
            [-0.030029296875, 0.01995849609375],
            [-0.5, -0.32000732421875],
            [-0.07000732421875, -0.04998779296875],
            [0.02996826171875, -0.08001708984375],
            [0.1300048828125, 0.03997802734375],
            [0.05999755859375, -0.07000732421875],
            [-0.12005615234375, -0.1199951171875],
            [-0.219970703125, 0.14996337890625],
            [-0.0400390625, 0.10003662109375],
            [-0.67999267578125, -0.32000732421875],
            [0, 0],
            [0.8900146484375, 0.260009765625],
            [0.5999755859375, 0.3399658203125],
            [0.35003662109375, 0.2900390625],
            [0.010009765625, 0.010009765625],
            [0.38995361328125, 0.34002685546875],
            [-0.82000732421875, 0.82000732421875],
            [0, 0],
            [-0.04998779296875, 0.07000732421875],
            [-0.239990234375, -0.32000732421875],
            [-0.0999755859375, 0.04998779296875],
            [0.02001953125, 0.1300048828125],
            [0.09002685546875, -0.010009765625],
            [0.04998779296875, 0.1199951171875],
            [-0.22998046875, 0.23004150390625],
            [-0.15997314453125, 0.1600341796875],
            [-0.29998779296875, -0.02001953125],
            [-0.1500244140625, 0.1400146484375],
            [-0.27001953125, 0.19000244140625],
            [0.199951171875, 0.20001220703125],
            [-0.20001220703125, 0.03997802734375],
            [-0.219970703125, -0.20001220703125],
            [-0.12994384765625, -0.0699462890625],
            [0.1099853515625, -0.14996337890625],
            [0.010009765625, -0.0799560546875],
            [-0.0899658203125, -0.03997802734375],
            [-0.14996337890625, 0.1500244140625],
            [-0.08001708984375, 0.17999267578125],
            [-0.15997314453125, -0.02996826171875],
            [0, 0],
            [-0.27001953125, 0.01995849609375],
            [-0.16998291015625, 0.03997802734375],
            [0.010009765625, -0.04998779296875],
            [-0.07000732421875, -0.030029296875],
            [-0.3499755859375, 0.48004150390625],
            [-0.19000244140625, 0.14996337890625],
            [0, 0],
            [-0.05999755859375, 0.07000732421875],
            [-0.19000244140625, -0.1199951171875],
            [-0.1300048828125, 0.09002685546875],
            [-0.27001953125, -0.19000244140625],
            [-0.54998779296875, -0.39996337890625],
            [-0.030029296875, 0.03997802734375],
            [0, 0],
            [-0.1400146484375, 0.25],
            [-0.16998291015625, 0.07000732421875],
            [0.1300048828125, 0.15997314453125],
            [-0.010009765625, 0.22003173828125],
            [-0.3900146484375, 0.07000732421875],
            [-0.05999755859375, 0],
            [-0.28997802734375, 0.6199951171875],
            [0, 0],
            [0.02996826171875, 0.07000732421875],
            [-0.22998046875, 0.3599853515625],
            [-0.03997802734375, 0.1400146484375],
            [0.15997314453125, 0.05999755859375],
            [-0.21002197265625, 0.30999755859375],
            [0, 0],
            [0.010009765625, 0.0899658203125],
            [-0.46002197265625, 0.04998779296875],
            [-0.52996826171875, 0.41998291015625],
            [-0.01995849609375, 0.1400146484375],
            [0.09002685546875, 0.4100341796875],
            [-0.27001953125, 0.14996337890625],
            [-0.2099609375, 0.02001953125],
            [0, 0],
            [0.07000732421875, 0.22003173828125],
            [-0.30999755859375, 0.00994873046875],
            [-0.05999755859375, -0.1099853515625],
            [-0.25, 0.15997314453125],
            [-0.01995849609375, 0.050048828125],
            [-0.05999755859375, 0.05999755859375],
            [-0.07000732421875, -0.05999755859375],
            [-0.02996826171875, -0.1199951171875],
            [0.0899658203125, -0.0400390625],
            [-0.02996826171875, -0.1300048828125],
            [-0.34002685546875, -0.03997802734375],
            [-0.239990234375, 0.1300048828125],
            [0.02001953125, 0.27001953125],
            [0.06005859375, 0.3499755859375],
            [0.1199951171875, 0.300048828125],
            [0.04998779296875, 0.16998291015625],
            [0.21002197265625, -0.02001953125],
            [-0.02001953125, -0.1300048828125],
            [-0.030029296875, -0.11004638671875],
            [0.1199951171875, -0.08001708984375],
            [0.1199951171875, 0.1199951171875],
            [0.1600341796875, 0.260009765625],
            [0.1300048828125, -0.16998291015625],
            [0.20001220703125, 0.28997802734375],
            [0.3499755859375, 0.25],
            [0.1300048828125, 0.55999755859375],
            [0.16998291015625, -0.01995849609375],
            [0.280029296875, 0.46002197265625],
            [0.1500244140625, 0.02001953125],
            [0.3900146484375, 0.41998291015625],
            [0.1099853515625, 0.12005615234375],
            [0, 0],
            [0.1600341796875, -0.15997314453125],
            [0, 0],
            [-0.3499755859375, -0.30999755859375],
            [0.12005615234375, -0.10003662109375],
            [0.05999755859375, 0.2099609375],
            [0.260009765625, 0],
            [0.300048828125, 0.010009765625],
            [0.1500244140625, -0.17999267578125],
            [0.24005126953125, -0.010009765625],
            [0.47998046875, -0.010009765625],
            [-0.04998779296875, -0.11004638671875],
            [0, 0],
            [0, 0],
            [-0.25, -0.25],
            [0.0400390625, -0.04998779296875],
            [-0.17999267578125, -0.3199462890625],
            [-0.22998046875, -0.239990234375],
            [0.010009765625, -0.16998291015625],
            [-0.050048828125, -0.1099853515625],
            [0.25, -0.2099609375],
            [-0.15997314453125, -0.04998779296875],
            [0.1600341796875, -0.8800048828125],
            [-0.1199951171875, -0.16998291015625],
            [0.08001708984375, -0.1500244140625],
            [-0.0999755859375, -0.3499755859375],
            [0.3900146484375, -0.0899658203125],
            [0, -0.30999755859375],
            [0.3499755859375, -0.03997802734375],
            [0.15997314453125, 0],
            [0.05999755859375, 0.199951171875],
            [-0.07000732421875, 0.07000732421875],
            [-0.17999267578125, 0.1700439453125],
            [0.07000732421875, 0.04998779296875],
            [-0.03997802734375, 0.1099853515625],
            [-0.1600341796875, -0.010009765625],
            [0.14996337890625, 0.20001220703125],
            [0.04998779296875, -0.0699462890625],
            [0, 0],
            [0.02001953125, -0.02001953125],
            [0.2099609375, 0.45001220703125],
            [0.25, -0.02001953125],
            [0.07000732421875, 0.15997314453125],
            [0.15997314453125, -0.05999755859375],
            [-0.030029296875, 0.20001220703125],
            [0.1500244140625, 0],
            [0, -0.0999755859375],
            [0.12005615234375, 0.02001953125],
            [-0.219970703125, 0.3499755859375],
            [0.010009765625, 0.219970703125],
            [0.04998779296875, -0.47998046875],
            [-0.02001953125, -0.1400146484375],
            [0.15997314453125, -0.04998779296875],
            [0.0999755859375, 0.1300048828125],
            [0.300048828125, 0.25994873046875],
            [-0.77996826171875, 0.760009765625]
        ];

        createPathGrp(
            contents,
            'Countries',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [40.8466, -4.9677]
        );
    };

    const createLeavesBottom = () => {
        const vertices: [number, number][] = [
            [-1.5426025390625, -2.90618896484375],
            [-5.06126403808594, -2.27105712890625],
            [-7.72442626953125, -0.44499206542969],
            [-14.6716918945312, 1.79066467285156],
            [-19.6311645507812, 0.13734436035156],
            [-21.1605072021484, -1.07827758789062],
            [-21.6513824462891, -1.59149169921875],
            [-21.4805908203125, -1.60198974609375],
            [-12.7521362304688, -1.19941711425781],
            [-7.36050415039062, -3.34884643554688],
            [-0.25161743164062, -3.42961120605469],
            [0.21852111816406, -3.43392944335938],
            [8.27430725097656, -3.03363037109375],
            [12.6231231689453, -1.23184204101562],
            [21.4823760986328, -1.61882019042969],
            [21.6513824462891, -1.6915283203125],
            [20.5843353271484, -0.57797241210938],
            [13.9676971435547, 1.78520202636719],
            [8.42359924316406, 0.02639770507812],
            [5.59861755371094, -1.92887878417969],
            [2.90748596191406, -2.99165344238281],
            [1.52449035644531, -2.91026306152344],
            [1.64552307128906, -2.75624084472656],
            [8.67779541015625, 1.92601013183594],
            [9.29112243652344, 2.47666931152344],
            [9.30422973632812, 2.87635803222656],
            [8.19692993164062, 3.85305786132812],
            [7.82725524902344, 3.76889038085938],
            [5.60935974121094, 1.56367492675781],
            [1.26345825195312, -1.83741760253906],
            [0.782958984375, -2.10330200195312],
            [-0.86323547363281, -2.08726501464844],
            [-4.585205078125, 0.60670471191406],
            [-7.79916381835938, 3.70709228515625],
            [-8.37434387207031, 3.73445129394531],
            [-9.33277893066406, 2.84864807128906],
            [-9.309814453125, 2.45840454101562],
            [-3.78005981445312, -1.71142578125],
            [-1.78782653808594, -2.71876525878906]
        ];
        const inTangents: [number, number][] = [
            [-0.06221008300781, 0.14717102050781],
            [1.08723449707031, -0.61717224121094],
            [0.8873291015625, -0.60932922363281],
            [2.56846618652344, 0.04902648925781],
            [1.52511596679688, 0.93228149414062],
            [0.45265197753906, 0.47712707519531],
            [0.16267395019531, 0.16999816894531],
            [-0.04476928710938, -0.02484130859375],
            [-2.97096252441406, 1.23451232910156],
            [-1.85975646972656, 0.56399536132812],
            [-2.37739562988281, -0.69680786132812],
            [-0.159912109375, 0.04757690429688],
            [-2.64692687988281, -0.96038818359375],
            [-1.44488525390625, -0.61174011230469],
            [-2.88951110839844, 1.58641052246094],
            [-0.09181213378906, 0.03919982910156],
            [0.39077758789062, -0.30340576171875],
            [2.52021789550781, 0.11747741699219],
            [1.70918273925781, 1.02659606933594],
            [0.96514892578125, 0.61799621582031],
            [0.99560546875, 0.10934448242188],
            [0.45401000976562, -0.08193969726562],
            [-0.05653381347656, -0.02413940429688],
            [-2.11749267578125, -1.90090942382812],
            [-0.20770263671875, -0.17979431152344],
            [0.14921569824219, -0.14970397949219],
            [0.37405395507812, -0.32003784179688],
            [0.10435485839844, 0.10401916503906],
            [0.75851440429688, 0.71467590332031],
            [1.61178588867188, 0.92501831054688],
            [0.14503479003906, 0.1087646484375],
            [0.56636047363281, -0.31735229492188],
            [1.15519714355469, -1.01734924316406],
            [1.0360107421875, -1.069580078125],
            [0.22010803222656, 0.18675231933594],
            [0.31181335449219, 0.30390930175781],
            [-0.15017700195312, 0.13822937011719],
            [-2.01907348632812, 1.15673828125],
            [-0.6812744140625, 0.30191040039062]
        ];
        const outTangents: [number, number][] = [
            [-1.28279113769531, -0.27584838867188],
            [-0.93899536132812, 0.53302001953125],
            [-2.09239196777344, 1.43687438964844],
            [-1.82156372070312, -0.03477478027344],
            [-0.55876159667969, -0.341552734375],
            [-0.16342163085938, -0.17227172851562],
            [0.07872009277344, -0.08645629882812],
            [2.84303283691406, 1.57759094238281],
            [1.78683471679688, -0.74247741699219],
            [2.36599731445312, -0.717529296875],
            [0.16143798828125, 0.04731750488281],
            [2.73190307617188, -0.81292724609375],
            [1.47712707519531, 0.53594970703125],
            [3.01594543457031, 1.27690124511719],
            [0.03672790527344, -0.02017211914062],
            [-0.29743957519531, 0.4813232421875],
            [-1.94499206542969, 1.51010131835938],
            [-1.99737548828125, -0.09310913085938],
            [-0.98408508300781, -0.591064453125],
            [-0.82827758789062, -0.53036499023438],
            [-0.47064208984375, -0.05168151855469],
            [-0.02178955078125, 0.12335205078125],
            [2.63424682617188, 1.12530517578125],
            [0.2044677734375, 0.18354797363281],
            [0.15341186523438, 0.13278198242188],
            [-0.34852600097656, 0.34965515136719],
            [-0.17532348632812, 0.15000915527344],
            [-0.73841857910156, -0.73602294921875],
            [-1.34341430664062, -1.26577758789062],
            [-0.15888977050781, -0.0911865234375],
            [-0.55781555175781, -0.41830444335938],
            [-1.34712219238281, 0.75486755371094],
            [-1.1185302734375, 0.98506164550781],
            [-0.20652770996094, 0.21322631835938],
            [-0.33261108398438, -0.28221130371094],
            [-0.15650939941406, -0.15254211425781],
            [1.70698547363281, -1.57112121582031],
            [0.64643859863281, -0.370361328125],
            [0.08030700683594, -0.03558349609375]
        ];

        createPathGrp(
            contents,
            'Leaves_Bottom',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [42.645, 25.1974]
        );
    };

    const createLeavesL01 = () => {
        const vertices: [number, number][] = [
            [9.62973022460938, 3.20268249511719],
            [8.46005249023438, 3.40142822265625],
            [5.79318237304688, 4.05937194824219],
            [0.04823303222656, 5.010986328125],
            [-7.1656494140625, 2.41044616699219],
            [-9.49266052246094, -0.23033142089844],
            [-9.62846374511719, -0.58232116699219],
            [-9.08831787109375, -0.09481811523438],
            [-4.41754150390625, 1.91220092773438],
            [-0.626708984375, 2.26451110839844],
            [4.097412109375, 2.88265991210938],
            [5.03617858886719, 2.983642578125],
            [4.695556640625, 2.75975036621094],
            [3.02729797363281, 2.23374938964844],
            [0.0655517578125, -0.58547973632812],
            [-1.78814697265625, -4.07244873046875],
            [-2.33210754394531, -5.01205444335938],
            [-0.64726257324219, -3.78605651855469],
            [3.34732055664062, -0.06655883789062],
            [9.29742431640625, 3.06814575195312]
        ];
        const inTangents: [number, number][] = [
            [-0.12490844726562, -0.12162780761719],
            [0.373291015625, -0.08697509765625],
            [0.88677978515625, -0.2279052734375],
            [1.96138000488281, -0.02679443359375],
            [2.1038818359375, 1.69680786132812],
            [0.61676025390625, 1.01997375488281],
            [-0.01309204101562, 0.17744445800781],
            [-0.17437744140625, -0.15267944335938],
            [-1.72163391113281, -0.28482055664062],
            [-1.26708984375, -0.08355712890625],
            [-1.54983520507812, -0.39926147460938],
            [-0.34132385253906, 0.03204345703125],
            [0.11636352539062, 0.03964233398438],
            [0.53829956054688, 0.24136352539062],
            [0.73236083984375, 1.20741271972656],
            [0.65892028808594, 1.140380859375],
            [0.16569519042969, 0.32797241210938],
            [-0.53036499023438, -0.44642639160156],
            [-1.26957702636719, -1.30314636230469],
            [-2.29457092285156, -0.45454406738281]
        ];
        const outTangents: [number, number][] = [
            [-0.39927673339844, 0.1435546875],
            [-0.89166259765625, 0.20774841308594],
            [-1.88752746582031, 0.48509216308594],
            [-2.72747802734375, 0.03727722167969],
            [-0.92539978027344, -0.74635314941406],
            [-0.05685424804688, -0.09402465820312],
            [0.19586181640625, 0.17701721191406],
            [1.33998107910156, 1.17324829101562],
            [1.25509643554688, 0.2076416015625],
            [1.58724975585938, 0.10466003417969],
            [0.2950439453125, 0.07600402832031],
            [-0.07200622558594, -0.18121337890625],
            [-1.3223876953125, -0.59292602539062],
            [-0.55178833007812, -0.18798828125],
            [-0.68382263183594, -1.12738037109375],
            [-0.1798095703125, -0.31120300292969],
            [0.60646057128906, 0.3541259765625],
            [1.39347839355469, 1.17292785644531],
            [1.65214538574219, 1.69581604003906],
            [0.09867858886719, 0.01954650878906]
        ];

        createPathGrp(
            contents,
            'Leaves_L_01',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [24.8022, 18.1959]
        );
    };

    const createLeavesL02 = () => {
        const vertices: [number, number][] = [
            [-0.05331420898438, -6.95353698730469],
            [0.76380920410156, -5.98823547363281],
            [4.06298828125, 0.14447021484375],
            [5.48579406738281, 3.86239624023438],
            [7.72804260253906, 6.82810974121094],
            [7.81379699707031, 6.95353698730469],
            [6.55714416503906, 6.63601684570312],
            [2.27296447753906, 5.81797790527344],
            [-3.56852722167969, 2.86773681640625],
            [-6.92413330078125, -1.26992797851562],
            [-7.81379699707031, -3.92195129394531],
            [-7.0863037109375, -2.73982238769531],
            [-3.72756958007812, 0.144775390625],
            [0.44599914550781, 2.24311828613281],
            [3.67295837402344, 4.44793701171875],
            [4.67337036132812, 5.07290649414062],
            [4.75038146972656, 4.98960876464844],
            [4.36604309082031, 4.6710205078125],
            [1.78317260742188, 1.03851318359375],
            [0.94166564941406, -2.77896118164062],
            [-0.04457092285156, -6.80378723144531]
        ];
        const inTangents: [number, number][] = [
            [0.00433349609375, 0.08697509765625],
            [-0.25466918945312, -0.31449890136719],
            [-0.70059204101562, -2.26516723632812],
            [-0.59719848632812, -1.19355773925781],
            [-0.96115112304688, -0.82722473144531],
            [-0.04888916015625, -0.07255554199219],
            [0.40823364257812, 0.0804443359375],
            [1.42985534667969, 0.26303100585938],
            [1.69319152832031, 1.49861145019531],
            [0.84931945800781, 1.59501647949219],
            [0.12202453613281, 0.94692993164062],
            [-0.26666259765625, -0.376953125],
            [-1.31214904785156, -0.74165344238281],
            [-1.37908935546875, -0.72439575195312],
            [-1.02452087402344, -0.81044006347656],
            [-0.37104797363281, -0.14501953125],
            [-0.02566528320312, 0.02775573730469],
            [0.12106323242188, 0.11369323730469],
            [0.52471923828125, 1.45057678222656],
            [0.20155334472656, 1.28883361816406],
            [0.54560852050781, 1.2886962890625]
        ];
        const outTangents: [number, number][] = [
            [0.33741760253906, 0.30819702148438],
            [1.48640441894531, 1.83558654785156],
            [0.39190673828125, 1.26712036132812],
            [0.565185546875, 1.12956237792969],
            [0.02366638183594, 0.02035522460938],
            [-0.448486328125, -0.1146240234375],
            [-1.42640686035156, -0.28108215332031],
            [-2.23779296875, -0.41166687011719],
            [-1.35147094726562, -1.19615173339844],
            [-0.44174194335938, -0.82957458496094],
            [0.24118041992188, 0.39497375488281],
            [0.87725830078125, 1.24006652832031],
            [1.3575439453125, 0.76730346679688],
            [1.16494750976562, 0.61192321777344],
            [0.30873107910156, 0.24421691894531],
            [0.02566528320312, -0.02775573730469],
            [-0.12844848632812, -0.1058349609375],
            [-1.10450744628906, -1.03733825683594],
            [-0.44711303710938, -1.23605346679688],
            [-0.21438598632812, -1.37091064453125],
            [-0.0115966796875, -0.02740478515625]
        ];

        createPathGrp(
            contents,
            'Leaves_L_02',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [17.5583, 12.8008]
        );
    };

    const createLeavesL03 = () => {
        const vertices: [number, number][] = [
            [-5.51641845703125, -6.52627563476562],
            [-5.40325927734375, -7.00582885742188],
            [-4.87104797363281, -5.08854675292969],
            [-2.465087890625, -1.80894470214844],
            [0.72305297851562, 1.60063171386719],
            [2.25048828125, 3.84196472167969],
            [2.7652587890625, 4.418701171875],
            [2.57429504394531, 3.90438842773438],
            [1.41481018066406, 0.09991455078125],
            [1.72637939453125, -3.37167358398438],
            [2.1864013671875, -7.73007202148438],
            [2.54263305664062, -6.99494934082031],
            [3.49296569824219, -2.60908508300781],
            [4.10908508300781, 3.32801818847656],
            [5.18571472167969, 6.889404296875],
            [5.51641845703125, 7.73007202148438],
            [4.83348083496094, 7.25187683105469],
            [0.60678100585938, 4.48922729492188],
            [-3.71060180664062, 0.35781860351562],
            [-5.38922119140625, -4.13322448730469],
            [-5.51641845703125, -5.42637634277344]
        ];
        const inTangents: [number, number][] = [
            [0, 0.36663818359375],
            [-0.05099487304688, 0.21607971191406],
            [-0.26921081542969, -0.58847045898438],
            [-0.94303894042969, -0.98655700683594],
            [-0.9658203125, -1.2276611328125],
            [-0.56088256835938, -0.71148681640625],
            [-0.21501159667969, -0.23954772949219],
            [0.07835388183594, 0.12570190429688],
            [0.128173828125, 1.35089111328125],
            [-0.23042297363281, 1.14450073242188],
            [0.19171142578125, 1.54835510253906],
            [-0.08370971679688, -0.2266845703125],
            [-0.17622375488281, -1.49226379394531],
            [-0.29212951660156, -1.97032165527344],
            [-0.6256103515625, -1.10758972167969],
            [-0.0714111328125, -0.31379699707031],
            [0.2325439453125, 0.15190124511719],
            [1.38824462890625, 0.95100402832031],
            [1.1566162109375, 1.67491149902344],
            [0.21646118164062, 1.62812805175781],
            [0.11799621582031, 0.42315673828125]
        ];
        const outTangents: [number, number][] = [
            [0.03108215332031, -0.13172912597656],
            [0.1094970703125, 0.71005249023438],
            [0.57667541503906, 1.26052856445312],
            [1.0753173828125, 1.12495422363281],
            [0.56063842773438, 0.71261596679688],
            [0.13941955566406, 0.17684936523438],
            [-0.01454162597656, -0.26309204101562],
            [-0.72636413574219, -1.16535949707031],
            [-0.11199951171875, -1.18052673339844],
            [0.28401184082031, -1.41064453125],
            [0.21403503417969, 0.26530456542969],
            [0.52322387695312, 1.41682434082031],
            [0.23335266113281, 1.97607421875],
            [0.18405151367188, 1.24142456054688],
            [0.1441650390625, 0.25523376464844],
            [-0.22740173339844, -0.15975952148438],
            [-1.40922546386719, -0.92050170898438],
            [-1.66133117675781, -1.1380615234375],
            [-0.938232421875, -1.35867309570312],
            [-0.05726623535156, -0.43075561523438],
            [0, -0.36663818359375]
        ];

        createPathGrp(
            contents,
            'Leaves_L_03',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [12.9322, 6.4299]
        );
    };

    const createLeavesL04 = () => {
        const vertices: [number, number][] = [
            [-4.09584045410156, -4.75411987304688],
            [-3.55296325683594, -7.47735595703125],
            [-3.17689514160156, -8.42605590820312],
            [-1.85321044921875, -2.21159362792969],
            [0.04086303710938, 3.47206115722656],
            [0.5311279296875, 5.14390563964844],
            [0.58291625976562, 4.99542236328125],
            [1.07099914550781, -0.93013000488281],
            [2.87586975097656, -4.20664978027344],
            [3.86186218261719, -6.46217346191406],
            [4.00604248046875, -6.80473327636719],
            [4.0870361328125, -6.45597839355469],
            [3.64801025390625, -2.16007995605469],
            [2.02409362792969, 3.90925598144531],
            [1.73124694824219, 8.050048828125],
            [1.74334716796875, 8.15220642089844],
            [1.67965698242188, 8.42161560058594],
            [1.48881530761719, 8.25285339355469],
            [-1.22006225585938, 4.71076965332031],
            [-3.96566772460938, -1.94976806640625],
            [-4.09584045410156, -2.89805603027344]
        ];
        const inTangents: [number, number][] = [
            [0, 0.61868286132812],
            [-0.24186706542969, 0.89532470703125],
            [-0.92333984375, -1.96034240722656],
            [-0.2105712890625, 0.289794921875],
            [-0.3154296875, -2.001953125],
            [-0.23789978027344, -0.53765869140625],
            [0.01417541503906, 0.04420471191406],
            [-0.81269836425781, 1.92301940917969],
            [-0.68145751953125, 1.04695129394531],
            [-0.20616149902344, 0.80564880371094],
            [-0.1134033203125, 0.09144592285156],
            [-0.00483703613281, -0.1162109375],
            [0.23762512207031, -1.42364501953125],
            [0.6197509765625, -2.00080871582031],
            [-0.19972229003906, -1.4012451171875],
            [0.00233459472656, -0.03361511230469],
            [0.12554931640625, -0.0384521484375],
            [0.04374694824219, 0.07679748535156],
            [0.98484802246094, 1.111572265625],
            [0.33782958984375, 2.45870971679688],
            [0.10176086425781, 0.30789184570312]
        ];
        const outTangents: [number, number][] = [
            [0.12611389160156, -0.91867065429688],
            [0.08808898925781, -0.32608032226562],
            [-0.373046875, 2.24990844726562],
            [0.85823059082031, 1.82212829589844],
            [0.09022521972656, 0.57264709472656],
            [0.10914611816406, -0.04327392578125],
            [-0.65507507324219, -2.04283142089844],
            [0.48828125, -1.15534973144531],
            [0.45565795898438, -0.70005798339844],
            [0.03013610839844, -0.11778259277344],
            [0.12709045410156, 0.09617614746094],
            [0.06040954589844, 1.45291137695312],
            [-0.34652709960938, 2.07606506347656],
            [-0.42332458496094, 1.36666870117188],
            [0.00485229492188, 0.03401184082031],
            [-0.006591796875, 0.09516906738281],
            [-0.09521484375, 0.0291748046875],
            [-0.74226379394531, -1.30337524414062],
            [-1.69529724121094, -1.91343688964844],
            [-0.04342651367188, -0.31600952148438],
            [0, -0.61868286132812]
        ];

        createPathGrp(
            contents,
            'Leaves_L_04',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [11.5116, -2.4915]
        );
    };

    const createLeavesL05 = () => {
        const vertices: [number, number][] = [
            [-1.9451904296875, 8.49269104003906],
            [-3.05316162109375, 4.36766052246094],
            [-3.88247680664062, 1.89277648925781],
            [-3.26730346679688, -5.50765991210938],
            [-1.56593322753906, -8.28431701660156],
            [-1.34294128417969, -8.49269104003906],
            [-1.42633056640625, -8.21701049804688],
            [-2.11505126953125, -5.41160583496094],
            [-1.72535705566406, -1.10726928710938],
            [-1.72337341308594, 2.351806640625],
            [-1.8887939453125, 4.40396118164062],
            [-1.85488891601562, 4.63853454589844],
            [-1.65142822265625, 3.87413024902344],
            [0.28630065917969, -0.07432556152344],
            [2.9615478515625, -2.68963623046875],
            [4.10906982421875, -4.09150695800781],
            [4.28794860839844, -4.27537536621094],
            [4.02378845214844, -2.86585998535156],
            [1.64967346191406, 1.94110107421875],
            [-0.98637390136719, 5.95925903320312],
            [-1.83094787597656, 8.31199645996094]
        ];
        const inTangents: [number, number][] = [
            [0.10946655273438, -0.03987121582031],
            [0.49330139160156, 1.33967590332031],
            [0.23397827148438, 0.83993530273438],
            [-1.09388732910156, 2.39401245117188],
            [-0.665283203125, 0.86532592773438],
            [-0.12155151367188, 0.02616882324219],
            [0.04377746582031, -0.08045959472656],
            [0.02145385742188, -0.99346923828125],
            [-0.17115783691406, -1.43028259277344],
            [0.11227416992188, -1.15367126464844],
            [0.05213928222656, -0.68429565429688],
            [-0.01699829101562, -0.111572265625],
            [-0.02943420410156, 0.23951721191406],
            [-0.99057006835938, 1.14909362792969],
            [-0.91929626464844, 0.84344482421875],
            [-0.28639221191406, 0.5465087890625],
            [-0.13546752929688, 0.02447509765625],
            [0.11154174804688, -0.46055603027344],
            [1.04637145996094, -1.47804260253906],
            [0.73075866699219, -1.43699645996094],
            [0.1607666015625, -0.82772827148438]
        ];
        const outTangents: [number, number][] = [
            [-0.14335632324219, -1.43978881835938],
            [-0.30075073242188, -0.81675720214844],
            [-0.70881652832031, -2.5445556640625],
            [0.45480346679688, -0.99533081054688],
            [0.06072998046875, -0.0789794921875],
            [0.05459594726562, 0.1187744140625],
            [-0.476318359375, 0.87541198730469],
            [-0.03135681152344, 1.45176696777344],
            [0.13827514648438, 1.15548706054688],
            [-0.06646728515625, 0.68296813964844],
            [-0.00460815429688, 0.06050109863281],
            [0.17457580566406, -0.26704406738281],
            [0.18955993652344, -1.54258728027344],
            [0.81771850585938, -0.94857788085938],
            [0.449951171875, -0.412841796875],
            [0.034423828125, -0.065673828125],
            [-0.03790283203125, 0.48768615722656],
            [-0.43106079101562, 1.77970886230469],
            [-0.92591857910156, 1.30790710449219],
            [-0.38124084472656, 0.74967956542969],
            [-0.01222229003906, 0.06295776367188]
        ];

        createPathGrp(
            contents,
            'Leaves_L_05',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [13.3015, -11.6646]
        );
    };

    const createLeavesL06 = () => {
        const vertices: [number, number][] = [
            [4.16140747070312, -4.32292175292969],
            [2.70564270019531, -0.39640808105469],
            [-0.30155944824219, 2.60163879394531],
            [-3.94992065429688, 6.51652526855469],
            [-4.00489807128906, 6.10552978515625],
            [-4.05502319335938, 3.29716491699219],
            [-3.73553466796875, -1.948486328125],
            [0.6591796875, -6.50303649902344],
            [0.80560302734375, -6.51652526855469],
            [0.2686767578125, -6.01025390625],
            [-1.43159484863281, -2.66246032714844],
            [-2.97003173828125, 2.99853515625],
            [-2.99508666992188, 3.31510925292969],
            [-1.63282775878906, 1.16677856445312],
            [0.74464416503906, -0.84907531738281],
            [2.49949645996094, -2.17222595214844],
            [4.07627868652344, -4.18301391601562]
        ];
        const inTangents: [number, number][] = [
            [-0.02861022949219, 0.04652404785156],
            [0.86326599121094, -1.16342163085938],
            [1.12757873535156, -0.86822509765625],
            [0.83895874023438, -1.70286560058594],
            [-0.01547241210938, 0.11479187011719],
            [0.08027648925781, 0.93522644042969],
            [-0.53269958496094, 1.71441650390625],
            [-2.15213012695312, 0.85517883300781],
            [-0.08158874511719, 0.00688171386719],
            [0.17088317871094, -0.15742492675781],
            [0.2620849609375, -1.25444030761719],
            [0.70573425292969, -1.83499145507812],
            [-0.07463073730469, -0.13442993164062],
            [-0.55622863769531, 0.64607238769531],
            [-0.84561157226562, 0.60934448242188],
            [-0.56019592285156, 0.47573852539062],
            [-0.37263488769531, 0.79037475585938]
        ];
        const outTangents: [number, number][] = [
            [-0.01522827148438, 1.49026489257812],
            [-0.85284423828125, 1.14938354492188],
            [-1.42205810546875, 1.094970703125],
            [-0.09635925292969, -0.17135620117188],
            [0.12657165527344, -0.9390869140625],
            [-0.15144348144531, -1.76414489746094],
            [0.69676208496094, -2.24241638183594],
            [0.02912902832031, -0.01158142089844],
            [-0.19871520996094, 0.18756103515625],
            [-0.98220825195312, 0.90480041503906],
            [-0.40104675292969, 1.91954040527344],
            [-0.03363037109375, 0.08743286132812],
            [0.36219787597656, -0.79095458984375],
            [0.68832397460938, -0.79949951171875],
            [0.59440612792969, -0.42832946777344],
            [0.66537475585938, -0.5650634765625],
            [0.02314758300781, -0.04910278320312]
        ];

        createPathGrp(
            contents,
            'Leaves_L_06',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [16.4495, -18.2098]
        );
    };

    const createLeavesL07 = () => {
        const vertices: [number, number][] = [
            [-4.17100524902344, 4.55682373046875],
            [-4.07272338867188, 4.06521606445312],
            [-3.32907104492188, 1.741943359375],
            [0.10238647460938, -2.70309448242188],
            [3.97865295410156, -4.53408813476562],
            [4.18447875976562, -4.49908447265625],
            [3.40406799316406, -3.74851989746094],
            [0.76048278808594, -0.32672119140625],
            [-3.16716003417969, 3.72064208984375]
        ];
        const inTangents: [number, number][] = [
            [0.35923767089844, -0.30035400390625],
            [-0.04328918457031, 0.13681030273438],
            [-0.2332763671875, 0.77877807617188],
            [-1.65338134765625, 1.08668518066406],
            [-1.33607482910156, 0.51719665527344],
            [-0.1002197265625, -0.08792114257812],
            [0.24722290039062, -0.2607421875],
            [0.79241943359375, -1.20518493652344],
            [1.50350952148438, -1.16122436523438]
        ];
        const outTangents: [number, number][] = [
            [-0.05070495605469, -0.23202514648438],
            [0.24530029296875, -0.77525329589844],
            [0.57597351074219, -1.9228515625],
            [1.20527648925781, -0.79216003417969],
            [0.05001831054688, -0.01936340332031],
            [-0.26254272460938, 0.25129699707031],
            [-0.99644470214844, 1.05093383789062],
            [-1.05476379394531, 1.60415649414062],
            [-0.33148193359375, 0.25602722167969]
        ];

        createPathGrp(
            contents,
            'Leaves_L_07',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [19.7543, -23.4899]
        );
    };

    const createLeavesR01 = () => {
        const vertices: [number, number][] = [
            [2.35147094726562, -5.00604248046875],
            [-0.12419128417969, -0.5479736328125],
            [-4.29124450683594, 2.61524963378906],
            [-4.91368103027344, 2.81001281738281],
            [-5.15522766113281, 2.92898559570312],
            [-4.20048522949219, 2.8829345703125],
            [1.34844970703125, 2.21803283691406],
            [5.69708251953125, 1.62689208984375],
            [9.45152282714844, -0.42916870117188],
            [8.70838928222656, 0.85618591308594],
            [9.6314697265625, -0.49569702148438],
            [2.12156677246094, 4.81301879882812],
            [-3.403564453125, 4.60934448242188],
            [-7.70596313476562, 3.54408264160156],
            [-9.36454772949219, 3.26910400390625],
            [-9.6314697265625, 3.16670227050781],
            [-9.30085754394531, 3.04461669921875],
            [-5.42356872558594, 1.59385681152344],
            [-3.83642578125, 0.33906555175781],
            [-0.133056640625, -3.14447021484375],
            [1.98100280761719, -4.84419250488281]
        ];
        const inTangents: [number, number][] = [
            [-0.19926452636719, 0.00923156738281],
            [0.87486267089844, -1.43760681152344],
            [1.89836120605469, -0.38601684570312],
            [0.20620727539062, -0.069091796875],
            [0.12176513671875, -0.06076049804688],
            [-0.283935546875, 0.07080078125],
            [-1.86299133300781, 0.11872863769531],
            [-1.42713928222656, 0.37602233886719],
            [-1.06620788574219, 1.02386474609375],
            [-0.10836791992188, -0.02462768554688],
            [0.354248046875, -0.41119384765625],
            [2.66644287109375, -0.52204895019531],
            [1.83155822753906, 0.37240600585938],
            [1.42813110351562, 0.37858581542969],
            [0.55397033691406, 0.08439636230469],
            [0.08198547363281, 0.09645080566406],
            [-0.11381530761719, 0.02580261230469],
            [-1.20283508300781, 0.7281494140625],
            [-0.49302673339844, 0.46075439453125],
            [-1.26504516601562, 1.12870788574219],
            [-0.74067687988281, 0.5216064453125]
        ];
        const outTangents: [number, number][] = [
            [-1.01164245605469, 1.42694091796875],
            [-0.97476196289062, 1.60176086425781],
            [-0.21197509765625, 0.04310607910156],
            [-0.06260681152344, 0.02098083496094],
            [0.36923217773438, 0.10606384277344],
            [1.8228759765625, -0.45458984375],
            [1.461669921875, -0.09315490722656],
            [1.42575073242188, -0.37565612792969],
            [0.03848266601562, -0.03695678710938],
            [-0.25877380371094, 0.49411010742188],
            [-1.75932312011719, 2.04208374023438],
            [-1.85116577148438, 0.3624267578125],
            [-1.44935607910156, -0.29470825195312],
            [-0.54612731933594, -0.144775390625],
            [-0.08836364746094, -0.01345825195312],
            [0.09037780761719, -0.09841918945312],
            [1.35813903808594, -0.30790710449219],
            [0.5833740234375, -0.3531494140625],
            [1.23820495605469, -1.15713500976562],
            [0.67555236816406, -0.60273742675781],
            [0.09013366699219, -0.0634765625]
        ];

        createPathGrp(
            contents,
            'Leaves_R_01',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [60.4651, 18.2267]
        );
    };

    const createLeavesR02 = () => {
        const vertices: [number, number][] = [
            [-4.82673645019531, 5.17518615722656],
            [-3.35458374023438, 4.21664428710938],
            [1.30171203613281, 1.3953857421875],
            [5.56390380859375, -1.08804321289062],
            [7.55921936035156, -3.51188659667969],
            [7.77986145019531, -3.84367370605469],
            [7.69612121582031, -3.30874633789062],
            [5.11041259765625, 1.33073425292969],
            [1.93330383300781, 4.14959716796875],
            [-2.8807373046875, 5.96675109863281],
            [-7.12675476074219, 6.79588317871094],
            [-7.79087829589844, 6.94485473632812],
            [-6.65213012695312, 5.71392822265625],
            [-4.726318359375, 2.0528564453125],
            [-3.56584167480469, -1.25286865234375],
            [-0.45758056640625, -6.36566162109375],
            [0.00189208984375, -6.92088317871094],
            [0.06951904296875, -6.94485473632812],
            [-0.36279296875, -5.687255859375],
            [-1.19479370117188, -1.34013366699219],
            [-2.77720642089844, 2.89942932128906],
            [-4.60519409179688, 4.8966064453125]
        ];
        const inTangents: [number, number][] = [
            [0.0311279296875, -0.15626525878906],
            [-0.43928527832031, 0.37451171875],
            [-1.65185546875, 0.77885437011719],
            [-1.27970886230469, 1.06988525390625],
            [-0.49995422363281, 0.9443359375],
            [-0.13671875, 0.09457397460938],
            [0.04458618164062, -0.16629028320312],
            [1.18905639648438, -1.36137390136719],
            [1.16447448730469, -0.82235717773438],
            [1.71028137207031, -0.32655334472656],
            [1.39808654785156, -0.36444091796875],
            [0.23347473144531, -0.02906799316406],
            [-0.34800720214844, 0.43461608886719],
            [-0.46914672851562, 1.3101806640625],
            [-0.40029907226562, 1.09698486328125],
            [-1.26515197753906, 1.5650634765625],
            [-0.15377807617188, 0.18455505371094],
            [-0.04719543457031, 0.01626586914062],
            [0.12660217285156, -0.41658020019531],
            [0.2596435546875, -1.45245361328125],
            [0.93705749511719, -1.25956726074219],
            [0.68482971191406, -0.59686279296875]
        ];
        const outTangents: [number, number][] = [
            [0.56324768066406, -0.23922729492188],
            [1.400634765625, -1.19412231445312],
            [1.49153137207031, -0.7032470703125],
            [0.81718444824219, -0.68319702148438],
            [0.05699157714844, -0.107666015625],
            [0.04017639160156, 0.20265197753906],
            [-0.47264099121094, 1.76284790039062],
            [-0.93763732910156, 1.07351684570312],
            [-1.44902038574219, 1.02330017089844],
            [-1.41650390625, 0.27046203613281],
            [-0.21626281738281, 0.05636596679688],
            [0.41580200195312, -0.38639831542969],
            [0.8778076171875, -1.09625244140625],
            [0.39369201660156, -1.09945678710938],
            [0.69651794433594, -1.90869140625],
            [0.15101623535156, -0.18681335449219],
            [0.00607299804688, -0.00729370117188],
            [-0.14988708496094, 0.43331909179688],
            [-0.43124389648438, 1.41903686523438],
            [-0.26992797851562, 1.510009765625],
            [-0.54118347167969, 0.72744750976562],
            [-0.08132934570312, 0.07089233398438]
        ];

        createPathGrp(
            contents,
            'Leaves_R_02',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [67.6777, 12.7751]
        );
    };

    const createLeavesR03 = () => {
        const vertices: [number, number][] = [
            [5.45854187011719, -7.01773071289062],
            [3.23170471191406, 0.97407531738281],
            [-1.65428161621094, 5.15473937988281],
            [-5.33309936523438, 7.56483459472656],
            [-5.50033569335938, 7.65788269042969],
            [-5.3828125, 7.22618103027344],
            [-3.92970275878906, 1.83210754394531],
            [-3.1817626953125, -4.748291015625],
            [-2.29434204101562, -7.65678405761719],
            [-2.21311950683594, -7.57122802734375],
            [-1.67683410644531, -3.12677001953125],
            [-1.58424377441406, 1.26753234863281],
            [-2.62362670898438, 3.94332885742188],
            [-2.75810241699219, 4.18278503417969],
            [-2.80305480957031, 4.33642578125],
            [-2.32029724121094, 3.880615234375],
            [-1.58108520507812, 2.80490112304688],
            [0.74949645996094, -0.11529541015625],
            [3.77574157714844, -3.3502197265625],
            [5.39280700683594, -6.83285522460938]
        ];
        const inTangents: [number, number][] = [
            [-0.07101440429688, 0.04429626464844],
            [1.8804931640625, -2.34974670410156],
            [1.81216430664062, -1.17750549316406],
            [1.18701171875, -0.8634033203125],
            [0.07122802734375, -0.03919982910156],
            [-0.07121276855469, 0.11799621582031],
            [-0.20614624023438, 1.87368774414062],
            [-0.4317626953125, 2.17230224609375],
            [-0.43168640136719, 0.9237060546875],
            [0.004150390625, -0.03866577148438],
            [-0.3123779296875, -1.4639892578125],
            [0.32682800292969, -1.47044372558594],
            [0.5390625, -0.81727600097656],
            [0.04217529296875, -0.08122253417969],
            [0.025634765625, -0.08978271484375],
            [-0.12040710449219, 0.16561889648438],
            [-0.22006225585938, 0.37419128417969],
            [-0.86726379394531, 0.89935302734375],
            [-0.91358947753906, 1.16749572753906],
            [-0.20396423339844, 1.31687927246094]
        ];
        const outTangents: [number, number][] = [
            [0.24684143066406, 2.94059753417969],
            [-1.36468505859375, 1.70523071289062],
            [-1.22930908203125, 0.79876708984375],
            [-0.04420471191406, 0.03215026855469],
            [-0.04306030273438, -0.1864013671875],
            [1.00166320800781, -1.65951538085938],
            [0.24142456054688, -2.19438171386719],
            [0.19882202148438, -1.00035095214844],
            [0.08467102050781, -0.00971984863281],
            [-0.16342163085938, 1.52278137207031],
            [0.31184387207031, 1.46153259277344],
            [-0.20960998535156, 0.94308471679688],
            [-0.05029296875, 0.07626342773438],
            [-0.01510620117188, 0.02909851074219],
            [0.2286376953125, -0.12730407714844],
            [0.25584411621094, -0.35191345214844],
            [0.63844299316406, -1.08564758300781],
            [1.02522277832031, -1.06314086914062],
            [0.81007385253906, -1.03520202636719],
            [0.00959777832031, -0.06190490722656]
        ];

        createPathGrp(
            contents,
            'Leaves_R_03',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [72.3323, 6.4485]
        );
    };

    const createLeavesR04 = () => {
        const vertices: [number, number][] = [
            [-4.01884460449219, -6.85884094238281],
            [-3.97528076171875, -6.82807922363281],
            [-1.97880554199219, -2.74751281738281],
            [-0.28765869140625, 1.90133666992188],
            [-0.53575134277344, 4.7900390625],
            [-0.59837341308594, 5.14125061035156],
            [-0.41767883300781, 4.82888793945312],
            [0.16596984863281, 2.4278564453125],
            [1.55812072753906, -1.58554077148438],
            [3.1290283203125, -5.89813232421875],
            [3.19915771484375, -8.11869812011719],
            [3.19772338867188, -8.41194152832031],
            [3.456787109375, -7.87014770507812],
            [4.07588195800781, -2.95790100097656],
            [0.88703918457031, 5.083251953125],
            [-1.49514770507812, 8.224853515625],
            [-1.71063232421875, 8.406494140625],
            [-1.75724792480469, 8.1939697265625],
            [-2.413330078125, 2.59912109375],
            [-4.01701354980469, -4.52609252929688],
            [-4.10008239746094, -6.54832458496094]
        ];
        const inTangents: [number, number][] = [
            [-0.08990478515625, 0.10328674316406],
            [-0.0015869140625, -0.00788879394531],
            [-0.75045776367188, -1.31953430175781],
            [-0.19125366210938, -1.684814453125],
            [0.27458190917969, -0.9466552734375],
            [-0.036376953125, -0.14447021484375],
            [-0.03683471679688, 0.107421875],
            [-0.14817810058594, 0.81120300292969],
            [-0.59463500976562, 1.29296875],
            [-0.27543640136719, 1.52845764160156],
            [0.10301208496094, 0.74443054199219],
            [0, 0.13690185546875],
            [-0.05290222167969, -0.17279052734375],
            [0.13298034667969, -1.67597961425781],
            [2.12222290039062, -2.27394104003906],
            [0.65196228027344, -1.155029296875],
            [0.125244140625, 0.03385925292969],
            [-0.0137939453125, 0.07223510742188],
            [0.60981750488281, 1.82275390625],
            [0.29559326171875, 2.42852783203125],
            [-0.02780151367188, 0.67626953125]
        ];
        const outTangents: [number, number][] = [
            [0.02601623535156, 0.01785278320312],
            [0.30792236328125, 1.53544616699219],
            [0.82579040527344, 1.45198059082031],
            [0.11117553710938, 0.97935485839844],
            [-0.03083801269531, 0.10630798339844],
            [0.13165283203125, -0.07415771484375],
            [0.26815795898438, -0.7822265625],
            [0.25758361816406, -1.41012573242188],
            [0.64122009277344, -1.39430236816406],
            [0.13291931152344, -0.73762512207031],
            [-0.01063537597656, -0.07679748535156],
            [0.17156982421875, 0.18020629882812],
            [0.49031066894531, 1.60127258300781],
            [-0.23828125, 3.00311279296875],
            [-0.89582824707031, 0.95986938476562],
            [-0.04728698730469, 0.08378601074219],
            [-0.09178161621094, -0.02481079101562],
            [0.36940002441406, -1.9344482421875],
            [-0.77592468261719, -2.31924438476562],
            [-0.08168029785156, -0.67109680175781],
            [0.00413513183594, -0.10055541992188]
        ];

        createPathGrp(
            contents,
            'Leaves_R_04',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [73.7413, -2.4803]
        );
    };

    const createLeavesR05 = () => {
        const vertices: [number, number][] = [
            [-4.28227233886719, -4.31887817382812],
            [-2.08685302734375, -1.90487670898438],
            [0.83148193359375, 1.45405578613281],
            [1.68397521972656, 4.04383850097656],
            [1.86067199707031, 4.574951171875],
            [1.85874938964844, 3.97325134277344],
            [1.62715148925781, 0.55183410644531],
            [1.98890686035156, -3.20143127441406],
            [1.78346252441406, -7.41619873046875],
            [1.28652954101562, -8.4788818359375],
            [1.56031799316406, -8.29598999023438],
            [4.1876220703125, -2.44035339355469],
            [3.72413635253906, 2.47090148925781],
            [2.40789794921875, 6.26698303222656],
            [1.94795227050781, 8.47749328613281],
            [1.85856628417969, 8.39698791503906],
            [-0.4561767578125, 3.61061096191406],
            [-2.96641540527344, -0.16142272949219],
            [-4.28836059570312, -4.18690490722656]
        ];
        const inTangents: [number, number][] = [
            [-0.00242614746094, 0.04405212402344],
            [-0.78118896484375, -0.74850463867188],
            [-0.76780700683594, -1.29937744140625],
            [-0.11264038085938, -0.9197998046875],
            [-0.1292724609375, -0.169677734375],
            [0.01356506347656, 0.19969177246094],
            [0.02987670898438, 1.14167785644531],
            [-0.13165283203125, 1.25051879882812],
            [0.48245239257812, 1.38471984863281],
            [0.20561218261719, 0.35444641113281],
            [-0.05770874023438, -0.07553100585938],
            [-0.32402038574219, -2.20420837402344],
            [0.49752807617188, -1.604736328125],
            [0.3807373046875, -1.28570556640625],
            [0.0970458984375, -0.74681091308594],
            [0.00724792480469, 0.03692626953125],
            [1.02413940429688, 1.47502136230469],
            [0.727294921875, 1.33158874511719],
            [0.2373046875, 1.40843200683594]
        ];
        const outTangents: [number, number][] = [
            [0.51774597167969, 1.02067565917969],
            [1.07514953613281, 1.03016662597656],
            [0.47459411621094, 0.80316162109375],
            [0.02214050292969, 0.18081665039062],
            [0, -0.20060729980469],
            [-0.0775146484375, -1.14059448242188],
            [-0.03298950195312, -1.26089477539062],
            [0.14878845214844, -1.4134521484375],
            [-0.12628173828125, -0.36247253417969],
            [0.1708984375, 0.00294494628906],
            [1.33383178710938, 1.74601745605469],
            [0.2469482421875, 1.67996215820312],
            [-0.39680480957031, 1.27986145019531],
            [-0.21481323242188, 0.72541809082031],
            [-0.074951171875, 0.01078796386719],
            [-0.3526611328125, -1.79829406738281],
            [-0.86135864257812, -1.24057006835938],
            [-0.68980407714844, -1.26296997070312],
            [-0.00715637207031, -0.04244995117188]
        ];

        createPathGrp(
            contents,
            'Leaves_R_05',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [71.9413, -11.6729]
        );
    };

    const createLeavesR06 = () => {
        const vertices: [number, number][] = [
            [-0.71839904785156, -6.48236083984375],
            [0.05299377441406, -6.24517822265625],
            [4.01638793945312, -0.88473510742188],
            [4.04035949707031, 3.70222473144531],
            [4.03929138183594, 6.30398559570312],
            [3.99964904785156, 6.48236083984375],
            [3.05204772949219, 5.06747436523438],
            [1.15525817871094, 3.2379150390625],
            [-2.7701416015625, -0.52804565429688],
            [-4.13966369628906, -3.71652221679688],
            [-4.12908935546875, -4.3048095703125],
            [-3.48143005371094, -3.22918701171875],
            [-0.53984069824219, -0.720458984375],
            [2.45329284667969, 2.26325988769531],
            [3.05296325683594, 3.36381530761719],
            [2.76177978515625, 2.35993957519531],
            [1.53250122070312, -2.28080749511719],
            [0.15425109863281, -5.61395263671875]
        ];
        const inTangents: [number, number][] = [
            [0.33169555664062, 0.32127380371094],
            [-0.21505737304688, -0.11418151855469],
            [-0.38458251953125, -2.47984313964844],
            [0.1468505859375, -1.52886962890625],
            [-0.091064453125, -0.86732482910156],
            [0.07626342773438, -0.06869506835938],
            [0.349853515625, 0.44740295410156],
            [0.7059326171875, 0.53334045410156],
            [1.08480834960938, 1.48837280273438],
            [0.18499755859375, 1.17929077148438],
            [-0.07302856445312, 0.23158264160156],
            [-0.25181579589844, -0.32205200195312],
            [-1.05723571777344, -0.74446105957031],
            [-0.74444580078125, -1.24711608886719],
            [-0.23039245605469, -0.42477416992188],
            [0.11776733398438, 0.29351806640625],
            [0.3253173828125, 1.56977844238281],
            [0.77723693847656, 0.98054504394531]
        ];
        const outTangents: [number, number][] = [
            [0.32905578613281, 0.02264404296875],
            [2.174560546875, 1.15460205078125],
            [0.23698425292969, 1.528076171875],
            [-0.08343505859375, 0.86865234375],
            [0.00556945800781, 0.05305480957031],
            [-0.30685424804688, -0.48162841796875],
            [-0.54765319824219, -0.70033264160156],
            [-1.45689392089844, -1.10072326660156],
            [-0.69883728027344, -0.95881652832031],
            [-0.02790832519531, -0.17793273925781],
            [0.24166870117188, 0.37449645996094],
            [0.81121826171875, 1.03750610351562],
            [1.17022705078125, 0.82403564453125],
            [0.19721984863281, 0.33038330078125],
            [-0.06825256347656, -0.41053771972656],
            [-0.6005859375, -1.49681091308594],
            [-0.24783325195312, -1.19589233398438],
            [-0.24055480957031, -0.303466796875]
        ];

        createPathGrp(
            contents,
            'Leaves_R_06',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [68.7883, -18.2064]
        );
    };

    const createLeavesR07 = () => {
        const vertices: [number, number][] = [
            [-4.20046997070312, -4.54922485351562],
            [2.09407043457031, -0.64251708984375],
            [3.17494201660156, 1.491943359375],
            [4.20046997070312, 4.54922485351562],
            [3.4547119140625, 3.98297119140625],
            [0.93881225585938, 1.85874938964844],
            [-1.33389282226562, -1.06263732910156],
            [-4.10279846191406, -4.41996765136719]
        ];
        const inTangents: [number, number][] = [
            [0.03228759765625, 0.04336547851562],
            [-1.57551574707031, -2.12297058105469],
            [-0.26155090332031, -0.76164245605469],
            [-0.460205078125, -1.032470703125],
            [0.21815490722656, 0.18138122558594],
            [0.78477478027344, 0.77313232421875],
            [0.72686767578125, 0.99691772460938],
            [1.05636596679688, 1.00932312011719]
        ];
        const outTangents: [number, number][] = [
            [2.3983154296875, 0.84513854980469],
            [0.48289489746094, 0.65068054199219],
            [0.34120178222656, 0.99354553222656],
            [-0.35404968261719, -0.13674926757812],
            [-0.8438720703125, -0.70164489746094],
            [-0.88754272460938, -0.8743896484375],
            [-0.8565673828125, -1.1748046875],
            [-0.03854370117188, -0.03681945800781]
        ];

        createPathGrp(
            contents,
            'Leaves_R_07',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [65.5815, -23.4541]
        );
    };

    const createGlobePiece01 = () => {
        const vertices: [number, number][] = [
            [0.33377075195312, 0.26670837402344],
            [-0.70953369140625, 0.39602661132812],
            [-1.20834350585938, 0.36669921875],
            [-1.359619140625, 0.12828063964844],
            [-1.14173889160156, -0.02891540527344],
            [0.00439453125, -0.37783813476562],
            [0.26420593261719, -0.42607116699219],
            [1.07464599609375, -0.34286499023438],
            [1.36334228515625, -0.18037414550781],
            [1.12831115722656, -0.05020141601562],
            [0.87074279785156, 0.10490417480469]
        ];
        const inTangents: [number, number][] = [
            [0.25471496582031, 0.014892578125],
            [0.36373901367188, -0.24067687988281],
            [0.1634521484375, 0.06973266601562],
            [-0.02175903320312, 0.12045288085938],
            [-0.10073852539062, 0.03811645507812],
            [-0.34341430664062, 0.23942565917969],
            [-0.08770751953125, -0.03800964355469],
            [-0.27201843261719, -0.0081787109375],
            [-0.00836181640625, -0.17265319824219],
            [0.09053039550781, -0.02090454101562],
            [0.06282043457031, -0.08755493164062]
        ];
        const outTangents: [number, number][] = [
            [-0.30441284179688, -0.04043579101562],
            [-0.12896728515625, 0.08534240722656],
            [-0.10321044921875, -0.04403686523438],
            [0.02169799804688, -0.12007141113281],
            [0.37530517578125, -0.14198303222656],
            [0.07794189453125, -0.05435180664062],
            [0.26304626464844, 0.114013671875],
            [0.12480163574219, 0.00375366210938],
            [0.00733947753906, 0.15155029296875],
            [-0.10446166992188, 0.02412414550781],
            [-0.11566162109375, 0.16122436523438]
        ];

        createPathGrp(
            contents,
            'Globe_Piece_01',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [46.2798, -27.3924]
        );
    };

    const createGlobePiece02 = () => {
        const vertices: [number, number][] = [
            [1.05995178222656, 0.58424377441406],
            [0.91244506835938, 0.70481872558594],
            [0.59162902832031, 0.52122497558594],
            [0.02294921875, 0.25984191894531],
            [-0.19924926757812, 0.19233703613281],
            [-0.88114929199219, -0.07234191894531],
            [-1.05986022949219, -0.17494201660156],
            [-0.90121459960938, -0.33346557617188],
            [-0.14686584472656, -0.64271545410156],
            [0.52386474609375, -0.36085510253906],
            [0.98429870605469, 0.45797729492188]
        ];
        const inTangents: [number, number][] = [
            [-0.01829528808594, -0.03195190429688],
            [0.0760498046875, 0.010009765625],
            [0.08320617675781, 0.09750366210938],
            [0.23765563964844, -0.00885009765625],
            [0.04180908203125, 0.050537109375],
            [0.24891662597656, 0.03240966796875],
            [-0.003662109375, 0.12039184570312],
            [-0.07951354980469, 0.00303649902344],
            [-0.25151062011719, 0.10165405273438],
            [-0.14144897460938, -0.33885192871094],
            [-0.28117370605469, -0.20298767089844]
        ];
        const outTangents: [number, number][] = [
            [-0.00880432128906, 0.11785888671875],
            [-0.13172912597656, -0.017333984375],
            [-0.1505126953125, -0.17640686035156],
            [-0.07484436035156, 0.00279235839844],
            [-0.181884765625, -0.21980285644531],
            [-0.07205200195312, -0.00938415527344],
            [0.00262451171875, -0.08628845214844],
            [0.29216003417969, -0.01113891601562],
            [0.34579467773438, -0.1397705078125],
            [0.12123107910156, 0.29039001464844],
            [0.04122924804688, 0.02976989746094]
        ];

        createPathGrp(
            contents,
            'Globe_Piece_02',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [44.1799, -26.6207]
        );
    };

    const createGlobePiece03 = () => {
        const vertices: [number, number][] = [
            [-0.17625427246094, -0.50213623046875],
            [0.56660461425781, 0.37254333496094],
            [0.32060241699219, 0.4178466796875],
            [-0.29501342773438, 0.06813049316406],
            [-0.56607055664062, -0.26649475097656]
        ];
        const inTangents: [number, number][] = [
            [-0.15364074707031, 0.01451110839844],
            [0.06886291503906, -0.34303283691406],
            [0.07395935058594, 0.07882690429688],
            [0.232666015625, 0.07106018066406],
            [-0.04486083984375, 0.19728088378906]
        ];
        const outTangents: [number, number][] = [
            [0.37968444824219, 0.01202392578125],
            [-0.04119873046875, 0.20524597167969],
            [-0.17192077636719, -0.18324279785156],
            [-0.16030883789062, -0.04896545410156],
            [0.0462646484375, -0.20347595214844]
        ];

        createPathGrp(
            contents,
            'Globe_Piece_03',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [54.4153, -23.728]
        );
    };

    const createGlobePiece04 = () => {
        const vertices: [number, number][] = [
            [-0.73118591308594, -0.78196716308594],
            [-0.20649719238281, -0.26947021484375],
            [-0.01310729980469, -0.04859924316406],
            [0.72245788574219, 0.48100280761719],
            [0.84718322753906, 0.72491455078125],
            [0.608154296875, 0.65872192382812],
            [-0.47483825683594, -0.02633666992188],
            [-0.85919189453125, -0.67671203613281]
        ];
        const inTangents: [number, number][] = [
            [-0.10780334472656, 0.00364685058594],
            [0.05912780761719, -0.4564208984375],
            [-0.08914184570312, -0.02668762207031],
            [-0.26336669921875, -0.14994812011719],
            [0.06620788574219, -0.09648132324219],
            [0.05532836914062, 0.06240844726562],
            [0.35821533203125, 0.23085021972656],
            [0.11540222167969, 0.2210693359375]
        ];
        const outTangents: [number, number][] = [
            [-0.00315856933594, 0.33493041992188],
            [-0.01249694824219, 0.09640502929688],
            [0.31013488769531, 0.09288024902344],
            [0.09524536132812, 0.05422973632812],
            [-0.09262084960938, 0.13497924804688],
            [-0.29489135742188, -0.33268737792969],
            [-0.26724243164062, -0.17222595214844],
            [-0.03366088867188, -0.06448364257812]
        ];

        createPathGrp(
            contents,
            'Globe_Piece_04',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [48.4786, -20.6559]
        );
    };

    const createGlobePiece05 = () => {
        const vertices: [number, number][] = [
            [-0.21432495117188, -1.25784301757812],
            [-0.02456665039062, -0.83769226074219],
            [0.26589965820312, -0.15789794921875],
            [0.30955505371094, -0.10633850097656],
            [0.43624877929688, 1.16142272949219],
            [0.2657470703125, 1.21562194824219],
            [0.15435791015625, 1.0137939453125],
            [-0.07633972167969, 0.25309753417969],
            [-0.38430786132812, -0.53059387207031],
            [-0.35792541503906, -0.92791748046875]
        ];
        const inTangents: [number, number][] = [
            [-0.073486328125, 0.11640930175781],
            [-0.02767944335938, -0.1455078125],
            [-0.19473266601562, -0.18472290039062],
            [-0.00201416015625, -0.01860046386719],
            [-0.02967834472656, -0.42349243164062],
            [0.07154846191406, 0.06948852539062],
            [-0.0108642578125, 0.059814453125],
            [0.11085510253906, 0.23924255371094],
            [0.07872009277344, 0.27432250976562],
            [-0.12846374511719, 0.12236022949219]
        ];
        const outTangents: [number, number][] = [
            [0.16029357910156, 0.12344360351562],
            [0.04685974121094, 0.24630737304688],
            [0.01651000976562, 0.01565551757812],
            [0.04573059082031, 0.42228698730469],
            [0.00761413574219, 0.10861206054688],
            [-0.05416870117188, -0.0526123046875],
            [0.0540771484375, -0.29769897460938],
            [-0.11872863769531, -0.2562255859375],
            [-0.04495239257812, -0.15664672851562],
            [0.09025573730469, -0.08596801757812]
        ];

        createPathGrp(
            contents,
            'Globe_Piece_05',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [57.371, -11.3203]
        );
    };

    const createGlobePiece06 = () => {
        const vertices: [number, number][] = [
            [0.49745178222656, 0.43489074707031],
            [0.37113952636719, 0.66853332519531],
            [0.132080078125, 0.56254577636719],
            [0.05685424804688, 0.20347595214844],
            [-0.19223022460938, -0.14349365234375],
            [-0.28843688964844, -0.17665100097656],
            [-0.47694396972656, -0.61064147949219],
            [-0.12931823730469, -0.49737548828125]
        ];
        const inTangents: [number, number][] = [
            [-0.25112915039062, -0.2576904296875],
            [0.08932495117188, -0.020751953125],
            [0.06303405761719, 0.06686401367188],
            [0.206298828125, 0.02841186523438],
            [0.00169372558594, 0.1236572265625],
            [0.02568054199219, 0.01963806152344],
            [-0.06782531738281, 0.09768676757812],
            [-0.12083435058594, -0.049560546875]
        ];
        const outTangents: [number, number][] = [
            [-0.022705078125, 0.12211608886719],
            [-0.09616088867188, 0.02232360839844],
            [-0.09613037109375, -0.10198974609375],
            [-0.00241088867188, -0.17631530761719],
            [-0.03321838378906, -0.00457763671875],
            [-0.14622497558594, -0.11187744140625],
            [0.12045288085938, -0.17350769042969],
            [0.44415283203125, 0.18214416503906]
        ];

        createPathGrp(
            contents,
            'Globe_Piece_06',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [56.5825, -13.5684]
        );
    };

    const createGlobePiece07 = () => {
        const vertices: [number, number][] = [
            [-1.10594177246094, 1.02873229980469],
            [-0.71058654785156, 0.47752380371094],
            [-0.41021728515625, 0.23899841308594],
            [0.40850830078125, -0.81001281738281],
            [0.51545715332031, -1.12324523925781],
            [0.596435546875, -1.41807556152344],
            [0.934326171875, -1.39936828613281],
            [0.91645812988281, -0.71583557128906],
            [0.67070007324219, -0.25459289550781],
            [0.2469482421875, 0.24455261230469],
            [-0.32304382324219, 0.92681884765625],
            [-0.42567443847656, 1.17576599121094],
            [-0.77618408203125, 1.46510314941406]
        ];
        const inTangents: [number, number][] = [
            [-0.02702331542969, 0.20645141601562],
            [-0.36091613769531, -0.00714111328125],
            [-0.05876159667969, 0.13768005371094],
            [-0.45372009277344, 0.21543884277344],
            [0.10679626464844, 0.13206481933594],
            [-0.10720825195312, 0.07820129394531],
            [-0.1124267578125, -0.09860229492188],
            [0.25775146484375, -0.1627197265625],
            [0.02597045898438, -0.18295288085938],
            [0.29702758789062, -0.05903625488281],
            [0.16612243652344, -0.24827575683594],
            [0.05894470214844, -0.05717468261719],
            [0.26416015625, 0.07647705078125]
        ];
        const outTangents: [number, number][] = [
            [-0.00289916992188, -0.32083129882812],
            [0.1566162109375, 0.00309753417969],
            [0.17961120605469, -0.42082214355469],
            [0.09808349609375, -0.04656982421875],
            [-0.12669372558594, -0.15667724609375],
            [0.12010192871094, -0.08761596679688],
            [0.23451232910156, 0.20565795898438],
            [-0.18182373046875, 0.11479187011719],
            [-0.03623962402344, 0.25541687011719],
            [-0.35124206542969, 0.06980895996094],
            [-0.04920959472656, 0.07353210449219],
            [-0.10723876953125, 0.10403442382812],
            [-0.25032043457031, -0.07247924804688]
        ];

        createPathGrp(
            contents,
            'Globe_Piece_07',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [39.7985, -5.3347]
        );
    };

    const createGlobePiece08 = () => {
        const vertices: [number, number][] = [
            [0.39505004882812, 0.79261779785156],
            [-0.1524658203125, 0.98374938964844],
            [-0.73495483398438, 1.03298950195312],
            [-0.82846069335938, 0.86967468261719],
            [-0.64352416992188, 0.60107421875],
            [-0.39118957519531, -0.21746826171875],
            [-0.33078002929688, -0.46176147460938],
            [-0.07258605957031, -0.78494262695312],
            [0.41160583496094, -1.07896423339844],
            [0.548828125, -0.69337463378906],
            [0.59611511230469, -0.4638671875],
            [0.57025146484375, -0.25007629394531],
            [0.02693176269531, 0.29933166503906],
            [0.11448669433594, 0.48503112792969],
            [0.55825805664062, 0.51618957519531],
            [0.8302001953125, 0.66433715820312],
            [0.56629943847656, 0.79093933105469]
        ];
        const inTangents: [number, number][] = [
            [0.05691528320312, -0.0001220703125],
            [0.16078186035156, -0.19973754882812],
            [0.19999694824219, 0.04713439941406],
            [-0.0101318359375, 0.07647705078125],
            [-0.11589050292969, 0.05859375],
            [0.185546875, 0.3262939453125],
            [-0.19747924804688, 0.03385925292969],
            [-0.01728820800781, 0.14645385742188],
            [-0.2010498046875, -0.03076171875],
            [0.072509765625, -0.17506408691406],
            [-0.02377319335938, -0.07487487792969],
            [0.05599975585938, 0.00785827636719],
            [0.31605529785156, -0.07879638671875],
            [-0.08851623535156, -0.01748657226562],
            [-0.1480712890625, -0.01126098632812],
            [-0.00502014160156, -0.1402587890625],
            [0.10163879394531, -0.01589965820312]
        ];
        const outTangents: [number, number][] = [
            [-0.206787109375, -0.008056640625],
            [-0.13821411132812, 0.17170715332031],
            [-0.07313537597656, -0.01724243164062],
            [0.01591491699219, -0.1199951171875],
            [0.33897399902344, -0.17137145996094],
            [-0.06259155273438, -0.11007690429688],
            [0.18563842773438, -0.03182983398438],
            [0.03733825683594, -0.31643676757812],
            [0.1854248046875, 0.02836608886719],
            [-0.03433227539062, 0.08285522460938],
            [0.0252685546875, 0.07962036132812],
            [-0.42558288574219, -0.05976867675781],
            [-0.163818359375, 0.04084777832031],
            [0.14431762695312, 0.02850341796875],
            [0.11346435546875, 0.00862121582031],
            [0.00619506835938, 0.1727294921875],
            [-0.05592346191406, 0.00874328613281]
        ];

        createPathGrp(
            contents,
            'Globe_Piece_08',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [53.3894, -12.5704]
        );
    };

    const createGlobePiece09 = () => {
        const vertices: [number, number][] = [
            [0.3721923828125, -0.03582763671875],
            [0.37030029296875, 0.74949645996094],
            [0.25474548339844, 0.98701477050781],
            [0.05972290039062, 0.85426330566406],
            [-0.24600219726562, 0.7113037109375],
            [-0.36189270019531, 0.42205810546875],
            [-0.14614868164062, 0.33837890625],
            [0.08831787109375, 0.18356323242188],
            [-0.02110290527344, -0.84169006347656],
            [-0.04714965820312, -0.96090698242188],
            [0.17536926269531, -0.98556518554688],
            [0.37020874023438, -0.78712463378906]
        ];
        const inTangents: [number, number][] = [
            [-0.00042724609375, -0.25044250488281],
            [0.006591796875, -0.26162719726562],
            [0.08282470703125, -0.04435729980469],
            [0.05502319335938, 0.05824279785156],
            [0.10133361816406, 0.04837036132812],
            [-0.02999877929688, 0.12055969238281],
            [-0.0970458984375, -0.03224182128906],
            [0.00172424316406, 0.14154052734375],
            [0.23475646972656, 0.32107543945312],
            [-0.01644897460938, 0.02044677734375],
            [-0.0765380859375, -0.00860595703125],
            [-0.00245666503906, -0.11973571777344]
        ];
        const outTangents: [number, number][] = [
            [0.00042724609375, 0.26181030273438],
            [-0.00230407714844, 0.09121704101562],
            [-0.12507629394531, 0.06700134277344],
            [-0.08444213867188, -0.08941650390625],
            [-0.12446594238281, -0.05940246582031],
            [0.03053283691406, -0.12269592285156],
            [0.14208984375, 0.04721069335938],
            [-0.00419616699219, -0.34397888183594],
            [-0.02291870117188, -0.03134155273438],
            [0.059814453125, -0.0743408203125],
            [0.11766052246094, 0.01321411132812],
            [0.005126953125, 0.25033569335938]
        ];

        createPathGrp(
            contents,
            'Globe_Piece_09',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [31.3746, -3.7924]
        );
    };

    const createGlobePiece10 = () => {
        const vertices: [number, number][] = [
            [0.31367492675781, -0.55178833007812],
            [0.26768493652344, 0.10050964355469],
            [0.16197204589844, 0.48544311523438],
            [-0.00102233886719, 0.50611877441406],
            [-0.30142211914062, -0.33551025390625],
            [-0.21516418457031, -0.45475769042969]
        ];
        const inTangents: [number, number][] = [
            [-0.20999145507812, 0.01373291015625],
            [-0.1353759765625, -0.22650146484375],
            [0.05986022949219, -0.12335205078125],
            [0.05929565429688, 0.06744384765625],
            [-0.05653381347656, 0.33680725097656],
            [-0.05784606933594, -0.02499389648438]
        ];
        const outTangents: [number, number][] = [
            [-0.13389587402344, 0.23048400878906],
            [0.06254577636719, 0.10466003417969],
            [-0.03910827636719, 0.08056640625],
            [-0.21116638183594, -0.24020385742188],
            [0.00968933105469, -0.05772399902344],
            [0.18437194824219, 0.07965087890625]
        ];

        createPathGrp(
            contents,
            'Globe_Piece_10',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [31.5722, -2.1651]
        );
    };

    const createGlobePiece11 = () => {
        const vertices: [number, number][] = [
            [-0.07363891601562, -0.29512023925781],
            [0.47552490234375, -0.17909240722656],
            [0.51679992675781, -0.03927612304688],
            [-0.11976623535156, 0.22807312011719],
            [-0.23291015625, 0.10281372070312],
            [-0.50607299804688, -0.16653442382812]
        ];
        const inTangents: [number, number][] = [
            [-0.14271545410156, 0.05912780761719],
            [0.00865173339844, -0.05667114257812],
            [-0.21026611328125, 0.06903076171875],
            [0.22181701660156, 0.16508483886719],
            [0.02822875976562, 0.047607421875],
            [-0.08172607421875, 0.20231628417969]
        ];
        const outTangents: [number, number][] = [
            [0.19218444824219, -0.00526428222656],
            [0.04734802246094, -0.01554870605469],
            [-0.04179382324219, 0.27400207519531],
            [-0.04446411132812, -0.03309631347656],
            [-0.07038879394531, -0.11871337890625],
            [0.06370544433594, -0.15773010253906]
        ];

        createPathGrp(
            contents,
            'Globe_Piece_11',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [47.1992, -11.8752]
        );
    };

    const createGlobePiece12 = () => {
        const vertices: [number, number][] = [
            [-0.24751281738281, -0.617431640625],
            [0.56248474121094, -0.51739501953125],
            [0.72251892089844, -0.38739013671875],
            [0.18247985839844, 0.62255859375],
            [-0.23750305175781, 0.62255859375],
            [-0.78749084472656, 0.20257568359375]
        ];
        const inTangents: [number, number][] = [
            [-0.3699951171875, 0.050048828125],
            [-0.26995849609375, -0.02001953125],
            [-0.0400390625, -0.05999755859375],
            [0.4100341796875, -0.00994873046875],
            [0, 0],
            [0.02001953125, 0.34002685546875]
        ];
        const outTangents: [number, number][] = [
            [0.280029296875, -0.02996826171875],
            [0.05999755859375, 0],
            [0.219970703125, 0.3599853515625],
            [0, 0],
            [-0.45001220703125, -0.00994873046875],
            [-0.030029296875, -0.4599609375]
        ];

        createPathGrp(
            contents,
            'Globe_Piece_12',
            true,
            false,
            getColorsFromMitug(mitug).pri,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [31.8575, -6.6279]
        );
    };

    const createGlobePiece13 = () => {
        const vertices: [number, number][] = [
            [-0.19462585449219, -0.23367309570312],
            [0.42536926269531, -0.13369750976562],
            [0.42536926269531, 0.18630981445312],
            [0.13539123535156, 0.18630981445312],
            [-0.24461364746094, 0.24630737304688],
            [-0.39463806152344, 0.27633666992188],
            [-0.47459411621094, 0.06631469726562]
        ];
        const inTangents: [number, number][] = [
            [-0.17999267578125, 0.02001953125],
            [-0.15997314453125, -0.26995849609375],
            [0.09002685546875, -0.0899658203125],
            [0.0999755859375, 0.030029296875],
            [0.0999755859375, -0.25],
            [0.05999755859375, 0.02996826171875],
            [0.00994873046875, 0.08001708984375]
        ];
        const outTangents: [number, number][] = [
            [0.22003173828125, -0.02001953125],
            [0.04998779296875, 0.10003662109375],
            [-0.08001708984375, 0.10003662109375],
            [-0.1400146484375, -0.03997802734375],
            [-0.02001953125, 0.050048828125],
            [-0.0799560546875, -0.04998779296875],
            [-0.030029296875, -0.2099609375]
        ];

        createPathGrp(
            contents,
            'Globe_Piece_13',
            true,
            false,
            getColorsFromMitug(mitug).pri,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [42.0646, -10.1216]
        );
    };

    const createGlobePiece14 = () => {
        const vertices: [number, number][] = [
            [-0.69924926757812, -0.35861206054688],
            [-0.54922485351562, -0.51858520507812],
            [-0.41921997070312, -0.36862182617188],
            [-0.34921264648438, -0.19857788085938],
            [0.53073120117188, 0.10140991210938],
            [0.70077514648438, 0.33139038085938],
            [0.48074340820312, 0.51138305664062],
            [-0.60922241210938, -0.03860473632812]
        ];
        const inTangents: [number, number][] = [
            [-0.010009765625, 0.1199951171875],
            [-0.08001708984375, 0.010009765625],
            [0, -0.0899658203125],
            [-0.050048828125, 0.01995849609375],
            [-0.3499755859375, 0.04998779296875],
            [-0.02001953125, -0.1099853515625],
            [0.11004638671875, 0.0400390625],
            [0.25, 0.41998291015625]
        ];
        const outTangents: [number, number][] = [
            [0.02001953125, -0.08001708984375],
            [0.1099853515625, -0.02001953125],
            [0, 0.07000732421875],
            [0.38995361328125, -0.1700439453125],
            [0.11004638671875, -0.010009765625],
            [0, 0.1400146484375],
            [-0.38995361328125, -0.1199951171875],
            [-0.05999755859375, -0.0999755859375]
        ];

        createPathGrp(
            contents,
            'Globe_Piece_14',
            true,
            false,
            getColorsFromMitug(mitug).pri,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [48.6892, -0.6266]
        );
    };

    const createGlobePiece15 = () => {
        const vertices: [number, number][] = [
            [-0.76585388183594, 0.22221374511719],
            [0.05415344238281, -0.21778869628906],
            [0.44410705566406, -0.32777404785156],
            [0.69410705566406, -0.40779113769531],
            [0.71412658691406, -0.09779357910156],
            [-0.13584899902344, -0.02778625488281],
            [-0.42588806152344, 0.09220886230469],
            [-0.49589538574219, 0.28221130371094],
            [-0.69584655761719, 0.44224548339844]
        ];
        const inTangents: [number, number][] = [
            [0.01995849609375, 0.07000732421875],
            [-0.47003173828125, -0.14996337890625],
            [-0.0999755859375, 0.19000244140625],
            [-0.0899658203125, -0.0799560546875],
            [0.08001708984375, -0.1199951171875],
            [0.3599853515625, 0.23004150390625],
            [0.030029296875, -0.199951171875],
            [0.0400390625, -0.04998779296875],
            [0.0999755859375, 0.02001953125]
        ];
        const outTangents: [number, number][] = [
            [-0.010009765625, -0.38995361328125],
            [0.16998291015625, 0.050048828125],
            [0.0400390625, -0.0999755859375],
            [0.09002685546875, 0.08001708984375],
            [-0.20001220703125, 0.25],
            [-0.20001220703125, -0.1300048828125],
            [-0.010009765625, 0.07000732421875],
            [-0.03997802734375, 0.08001708984375],
            [-0.12005615234375, -0.030029296875]
        ];

        createPathGrp(
            contents,
            'Globe_Piece_15',
            true,
            false,
            getColorsFromMitug(mitug).pri,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [43.7259, -0.1575]
        );
    };

    const createGlobePiece16 = () => {
        const vertices: [number, number][] = [
            [-0.98583984375, -0.39549255371094],
            [-0.04583740234375, -1.00547790527344],
            [0.72418212890625, -0.56547546386719],
            [1.07421875, 0.49452209472656],
            [0.814208984375, 0.55451965332031],
            [0.4442138671875, 0.74452209472656],
            [0.34417724609375, 1.00453186035156],
            [0.1441650390625, 0.80451965332031],
            [0.23419189453125, -0.00547790527344],
            [0.72418212890625, -0.56547546386719],
            [-0.6058349609375, -0.11546325683594],
            [0.45416259765625, -0.57548522949219],
            [-0.94580078125, -0.02543640136719]
        ];
        const inTangents: [number, number][] = [
            [-0.14996337890625, 0.1400146484375],
            [-0.4599609375, 0.010009765625],
            [-0.21002197265625, -0.40997314453125],
            [-0.07000732421875, -0.3599853515625],
            [0.0799560546875, 0.05999755859375],
            [0.00994873046875, -0.27996826171875],
            [0.1400146484375, -0.02001953125],
            [0.02001953125, 0.10003662109375],
            [-0.46002197265625, 0.22003173828125],
            [-0.1400146484375, 0.21002197265625],
            [0.09002685546875, 0.02001953125],
            [0.21002197265625, -0.489990234375],
            [0.14996337890625, 0.1099853515625]
        ];
        const outTangents: [number, number][] = [
            [0.280029296875, -0.25],
            [0.4200439453125, -0.010009765625],
            [0.4100341796875, 0.260009765625],
            [0.02996826171875, 0.1400146484375],
            [-0.280029296875, -0.2099609375],
            [0, 0.10003662109375],
            [-0.1199951171875, 0.02001953125],
            [-0.05999755859375, -0.27996826171875],
            [-0.03997802734375, -0.3699951171875],
            [-0.0899658203125, 0],
            [-0.47998046875, -0.13995361328125],
            [-0.0699462890625, 0.1300048828125],
            [-0.1400146484375, -0.10003662109375]
        ];

        createPathGrp(
            contents,
            'Globe_Piece_16',
            true,
            false,
            getColorsFromMitug(mitug).pri,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [49.4558, -10.6698]
        );
    };

    const createGlobePiece17 = () => {
        const vertices: [number, number][] = [
            [1.51422119140625, 0.52630615234375],
            [-0.2757568359375, 0.19635009765625],
            [-0.8857421875, -0.013671875],
            [-1.7957763671875, -0.34368896484375],
            [-1.07574462890625, -0.44366455078125],
            [0.4942626953125, -0.05364990234375],
            [0.80426025390625, 0.07635498046875],
            [1.5042724609375, 0.206298828125],
            [1.79425048828125, 0.32635498046875]
        ];
        const inTangents: [number, number][] = [
            [0.1199951171875, -0.02996826171875],
            [0.54998779296875, 0.3599853515625],
            [0.22998046875, 0.010009765625],
            [0.32000732421875, 0.1199951171875],
            [-0.27001953125, -0.07000732421875],
            [-0.59002685546875, 0.13995361328125],
            [-0.10003662109375, -0.06005859375],
            [-0.24005126953125, 0],
            [-0.02001953125, -0.1400146484375]
        ];
        const outTangents: [number, number][] = [
            [-0.63995361328125, 0.1700439453125],
            [-0.19000244140625, -0.1300048828125],
            [-0.33001708984375, 0],
            [0.20001220703125, -0.4599609375],
            [0.52996826171875, 0.1199951171875],
            [0.1099853515625, -0.02001953125],
            [0.219970703125, 0.12994384765625],
            [0.1099853515625, 0.010009765625],
            [0.02001953125, 0.17999267578125]
        ];

        createPathGrp(
            contents,
            'Globe_Piece_17',
            true,
            false,
            getColorsFromMitug(mitug).pri,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [49.8358, 3.4784]
        );
    };

    const createGlobePiece18 = () => {
        const vertices: [number, number][] = [
            [2.26535034179688, 0.35092163085938],
            [0.13534545898438, 1.37094116210938],
            [-0.76461791992188, 1.61093139648438],
            [-1.14462280273438, 1.37094116210938],
            [-1.66464233398438, 1.16098022460938],
            [-1.80465698242188, 1.25094604492188],
            [-2.43466186523438, 1.12094116210938],
            [-2.12466430664062, 0.26095581054688],
            [-0.77462768554688, 0.47097778320312],
            [-0.58462524414062, 0.71096801757812],
            [-0.72463989257812, 0.13095092773438],
            [-1.07461547851562, -0.10903930664062],
            [-0.98464965820312, -0.18905639648438],
            [-0.43466186523438, -0.07907104492188],
            [-0.15463256835938, 0.35092163085938],
            [0.95535278320312, 0.90097045898438],
            [1.12533569335938, 0.76095581054688],
            [0.99533081054688, 0.63095092773438],
            [0.43533325195312, 0.17092895507812],
            [0.44534301757812, -0.08901977539062],
            [0.80532836914062, -0.46902465820312],
            [0.79537963867188, -1.03903198242188],
            [0.97537231445312, -1.22903442382812],
            [1.30532836914062, -1.37905883789062],
            [1.72537231445312, -1.56906127929688],
            [2.26535034179688, -1.49905395507812],
            [2.47537231445312, -1.30905151367188],
            [2.34536743164062, -1.07907104492188],
            [1.89535522460938, -0.91903686523438],
            [1.13534545898438, -0.54904174804688],
            [1.09536743164062, 0.23092651367188],
            [1.69534301757812, 0.10092163085938],
            [1.95535278320312, -0.11904907226562],
            [2.42538452148438, -0.08901977539062]
        ];
        const inTangents: [number, number][] = [
            [0.16998291015625, -0.1099853515625],
            [0.75, -0.25],
            [0.29998779296875, -0.0799560546875],
            [0.03997802734375, 0.25],
            [0.280029296875, -0.1700439453125],
            [0.04998779296875, -0.02001953125],
            [0.05999755859375, 0.17999267578125],
            [-0.27996826171875, 0.1400146484375],
            [-0.45001220703125, -0.10003662109375],
            [-0.1600341796875, -0.030029296875],
            [0.3599853515625, 0.1400146484375],
            [0.04998779296875, 0.16998291015625],
            [-0.04998779296875, 0],
            [-0.14996337890625, -0.17999267578125],
            [-0.09002685546875, -0.14996337890625],
            [-0.21002197265625, 0.02996826171875],
            [-0.00994873046875, 0.0999755859375],
            [0.07000732421875, 0.010009765625],
            [0.21002197265625, 0.1199951171875],
            [-0.05999755859375, -0.02001953125],
            [-0.1099853515625, 0.1300048828125],
            [0.07000732421875, 0.17999267578125],
            [-0.1099853515625, 0.01995849609375],
            [-0.00994873046875, 0.19000244140625],
            [-0.22003173828125, -0.07000732421875],
            [-0.17999267578125, -0.02001953125],
            [-0.010009765625, -0.1199951171875],
            [0.0899658203125, -0.03997802734375],
            [0.1500244140625, 0.010009765625],
            [0.23004150390625, -0.1600341796875],
            [-0.16998291015625, -0.1099853515625],
            [-0.16998291015625, 0.21002197265625],
            [-0.0999755859375, 0.05999755859375],
            [-0.1400146484375, -0.21002197265625]
        ];
        const outTangents: [number, number][] = [
            [-0.66998291015625, 0.44000244140625],
            [-0.29998779296875, 0.09002685546875],
            [-0.05999755859375, -0.32000732421875],
            [-0.22003173828125, 0.05999755859375],
            [-0.04998779296875, 0.02996826171875],
            [-0.260009765625, 0.1099853515625],
            [-0.13995361328125, -0.3800048828125],
            [0.52001953125, -0.280029296875],
            [0.0999755859375, 0.01995849609375],
            [0.1300048828125, -0.239990234375],
            [-0.1300048828125, -0.04998779296875],
            [-0.010009765625, -0.0400390625],
            [0.19000244140625, 0],
            [0.10003662109375, 0.1300048828125],
            [0.1099853515625, 0.19000244140625],
            [0.08001708984375, -0.02001953125],
            [0, -0.09002685546875],
            [-0.28997802734375, -0.03997802734375],
            [-0.0799560546875, -0.04998779296875],
            [0.3800048828125, 0.0899658203125],
            [0.1800537109375, -0.19000244140625],
            [-0.07000732421875, -0.20001220703125],
            [0.1300048828125, -0.010009765625],
            [0.030029296875, -0.3499755859375],
            [0.16998291015625, 0.04998779296875],
            [0.1099853515625, 0.02001953125],
            [0.010009765625, 0.1099853515625],
            [-0.1500244140625, 0.05999755859375],
            [-0.34002685546875, -0.0400390625],
            [-0.16998291015625, 0.1199951171875],
            [0.219970703125, 0.1500244140625],
            [0.07000732421875, -0.0799560546875],
            [0.1600341796875, -0.1199951171875],
            [0.13995361328125, 0.2099609375]
        ];

        createPathGrp(
            contents,
            'Globe_Piece_18',
            true,
            false,
            getColorsFromMitug(mitug).pri,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [45.4147, 1.8938]
        );
    };

    const createGlobePiece19 = () => {
        const vertices: [number, number][] = [
            [-1.15432739257812, 2.51254272460938],
            [-0.92428588867188, 2.18258666992188],
            [-1.12429809570312, 1.53256225585938],
            [-1.12429809570312, 1.14254760742188],
            [-0.36428833007812, 0.30258178710938],
            [-0.51431274414062, -0.35745239257812],
            [-1.49429321289062, -1.16744995117188],
            [-1.51431274414062, -2.05746459960938],
            [-0.39431762695312, -2.03744506835938],
            [-0.05429077148438, -1.69741821289062],
            [-0.02432250976562, -1.35745239257812],
            [-0.03427124023438, -1.12747192382812],
            [0.23568725585938, -1.08743286132812],
            [0.72567749023438, -0.78744506835938],
            [1.01571655273438, 0.01254272460938],
            [1.57571411132812, 0.15255737304688],
            [1.75570678710938, 0.22256469726562]
        ];
        const inTangents: [number, number][] = [
            [0, 0],
            [-0.05999755859375, 0.1199951171875],
            [0.27996826171875, 0.1500244140625],
            [-0.239990234375, 0.1400146484375],
            [-0.27001953125, 0.25994873046875],
            [0.33001708984375, 0.27001953125],
            [0.239990234375, 0.17999267578125],
            [-0.33001708984375, 0.300048828125],
            [-0.66998291015625, -0.65997314453125],
            [-0.1099853515625, -0.1199951171875],
            [0.1600341796875, -0.1300048828125],
            [-0.08001708984375, -0.0799560546875],
            [-0.1099853515625, 0.08001708984375],
            [0.030029296875, -0.260009765625],
            [-0.07000732421875, -0.27996826171875],
            [-0.20001220703125, -0.010009765625],
            [-0.030029296875, -0.08001708984375]
        ];
        const outTangents: [number, number][] = [
            [0.07000732421875, -0.1099853515625],
            [0.14996337890625, -0.280029296875],
            [-0.22998046875, -0.1400146484375],
            [0.34002685546875, -0.20001220703125],
            [0.17999267578125, -0.1800537109375],
            [-0.33001708984375, -0.260009765625],
            [-0.34002685546875, -0.27996826171875],
            [0.6400146484375, -0.5799560546875],
            [0.11004638671875, 0.1099853515625],
            [0.1099853515625, 0.0999755859375],
            [-0.0899658203125, 0.08001708984375],
            [0.0799560546875, 0.08001708984375],
            [0.21002197265625, -0.1300048828125],
            [-0.02996826171875, 0.32000732421875],
            [0.05999755859375, 0.21002197265625],
            [0.05999755859375, 0.010009765625],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Globe_Piece_19',
            true,
            false,
            getColorsFromMitug(mitug).pri,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [54.0643, 7.8721]
        );
    };

    const createGlobePiece20 = () => {
        const vertices: [number, number][] = [
            [-2.70455932617188, 2.53054809570312],
            [-3.38455200195312, 1.13052368164062],
            [-3.37454223632812, 1.00051879882812],
            [-3.14450073242188, 0.90054321289062],
            [-3.44454956054688, 0.34054565429688],
            [-3.79452514648438, -0.46945190429688],
            [-3.73452758789062, -0.75949096679688],
            [-3.49453735351562, -0.67947387695312],
            [-3.36453247070312, -0.35946655273438],
            [-3.42453002929688, -0.02944946289062],
            [-3.10452270507812, 0.07052612304688],
            [-2.59451293945312, -0.07949829101562],
            [-2.32455444335938, -0.33944702148438],
            [-2.13455200195312, -0.66946411132812],
            [-1.84451293945312, -1.11947631835938],
            [-1.56454467773438, -1.69949340820312],
            [-1.38455200195312, -2.11947631835938],
            [-1.80453491210938, -2.10946655273438],
            [-1.94454956054688, -2.13949584960938],
            [-1.45455932617188, -2.86947631835938],
            [-1.17453002929688, -3.02944946289062],
            [-0.04452514648438, -3.54946899414062],
            [0.11544799804688, -4.00949096679688],
            [0.16549682617188, -4.21945190429688],
            [0.37545776367188, -4.17947387695312],
            [0.77548217773438, -3.83944702148438],
            [1.07546997070312, -3.71945190429688],
            [2.30545043945312, -2.48947143554688],
            [2.41549682617188, -3.00949096679688],
            [2.15548706054688, -2.31948852539062],
            [2.49545288085938, -2.27944946289062],
            [2.67544555664062, -2.51943969726562],
            [2.94546508789062, -2.61947631835938],
            [3.07546997070312, -2.33944702148438],
            [3.15548706054688, -1.76943969726562],
            [2.79544067382812, -0.98947143554688],
            [2.33547973632812, -0.72946166992188],
            [2.88546752929688, -0.72946166992188],
            [3.13546752929688, -0.63949584960938],
            [3.42544555664062, 0.40054321289062],
            [3.69546508789062, 0.86050415039062],
            [3.78549194335938, 1.00051879882812],
            [3.66549682617188, 1.60055541992188],
            [2.79544067382812, 2.28054809570312],
            [2.19546508789062, 2.33053588867188],
            [1.64547729492188, 3.27053833007812],
            [1.28549194335938, 4.14053344726562],
            [0.88546752929688, 4.24050903320312],
            [-1.81454467773438, 3.35055541992188]
        ];
        const inTangents: [number, number][] = [
            [0, 0],
            [0.0400390625, 0.55999755859375],
            [-0.01995849609375, 0.0400390625],
            [0.03997802734375, 0.25],
            [0.20001220703125, 0.0999755859375],
            [-0.010009765625, 0.32000732421875],
            [-0.0999755859375, 0.07000732421875],
            [-0.07000732421875, -0.05999755859375],
            [0.07000732421875, -0.1500244140625],
            [-0.03997802734375, -0.1199951171875],
            [-0.17999267578125, 0.22003173828125],
            [-0.21002197265625, -0.0799560546875],
            [0.05999755859375, 0.19000244140625],
            [-0.2099609375, 0.04998779296875],
            [0.02996826171875, 0.22998046875],
            [-0.17999267578125, 0.1400146484375],
            [0.11004638671875, 0.17999267578125],
            [0.1400146484375, -0.07000732421875],
            [0.10003662109375, 0.02001953125],
            [-0.12994384765625, 0.25],
            [-0.1099853515625, 0.02996826171875],
            [-0.33001708984375, 0.27001953125],
            [0.1400146484375, 0.22003173828125],
            [-0.050048828125, 0.05999755859375],
            [-0.05999755859375, -0.04998779296875],
            [-0.05999755859375, -0.21002197265625],
            [-0.1099853515625, -0.010009765625],
            [-0.33001708984375, -0.449951171875],
            [0.260009765625, -0.1400146484375],
            [-0.11004638671875, -0.15997314453125],
            [-0.1199951171875, 0.1099853515625],
            [-0.05999755859375, 0.0799560546875],
            [-0.1199951171875, -0.05999755859375],
            [0.04998779296875, -0.1199951171875],
            [-0.1500244140625, -0.19000244140625],
            [0.20001220703125, -0.1099853515625],
            [0.16998291015625, -0.10003662109375],
            [-0.16998291015625, 0.1400146484375],
            [-0.04998779296875, -0.12994384765625],
            [0.030029296875, -0.3900146484375],
            [-0.22998046875, -0.0699462890625],
            [0.04998779296875, -0.08001708984375],
            [0.04998779296875, -0.20001220703125],
            [0.5400390625, 0.01995849609375],
            [0.1500244140625, -0.16998291015625],
            [-0.010009765625, -0.4000244140625],
            [0.07000732421875, -0.30999755859375],
            [0.1400146484375, 0.010009765625],
            [0.79998779296875, 0.5899658203125]
        ];
        const outTangents: [number, number][] = [
            [-0.3299560546875, -0.4200439453125],
            [0, -0.03997802734375],
            [0.0400390625, -0.0999755859375],
            [-0.0400390625, -0.21002197265625],
            [-0.3699951171875, -0.17999267578125],
            [0, -0.10003662109375],
            [0.0999755859375, -0.05999755859375],
            [0.10003662109375, 0.08001708984375],
            [-0.05999755859375, 0.0999755859375],
            [0.04998779296875, 0.17999267578125],
            [0.1400146484375, -0.16998291015625],
            [0.26995849609375, 0.09002685546875],
            [-0.0699462890625, -0.22003173828125],
            [0.20001220703125, -0.04998779296875],
            [-0.04998779296875, -0.260009765625],
            [0.1500244140625, -0.1199951171875],
            [-0.0999755859375, -0.17999267578125],
            [-0.02001953125, 0],
            [0.260009765625, -0.219970703125],
            [0.06005859375, -0.1199951171875],
            [0.40997314453125, -0.11004638671875],
            [0.1500244140625, -0.1199951171875],
            [-0.04998779296875, -0.0799560546875],
            [0.0799560546875, -0.08001708984375],
            [0.03997802734375, 0.1199951171875],
            [0.1300048828125, 0.1199951171875],
            [0.55999755859375, 0.02996826171875],
            [0.17999267578125, 0.24005126953125],
            [-0.07000732421875, 0.030029296875],
            [0.07000732421875, 0.09002685546875],
            [0.08001708984375, -0.05999755859375],
            [0.07000732421875, -0.09002685546875],
            [0.1099853515625, 0.05999755859375],
            [-0.1099853515625, 0.219970703125],
            [0.1099853515625, 0.12994384765625],
            [-0.13995361328125, 0.08001708984375],
            [0.2099609375, 0.0899658203125],
            [0.1199951171875, -0.1099853515625],
            [0.1500244140625, 0.33001708984375],
            [-0.01995849609375, 0.20001220703125],
            [0.07000732421875, 0.02001953125],
            [-0.1199951171875, 0.19000244140625],
            [-0.10003662109375, 0.51995849609375],
            [-0.2099609375, -0.010009765625],
            [-0.239990234375, 0.27001953125],
            [0, 0.3599853515625],
            [-0.030029296875, 0.15997314453125],
            [-0.97998046875, -0.03997802734375],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Globe_Piece_20',
            true,
            false,
            getColorsFromMitug(mitug).pri,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [41.6745, -5.1758]
        );
    };

    const createGlobePiece21 = () => {
        const vertices: [number, number][] = [
            [0.303955078125, -4.02926635742188],
            [0.35394287109375, -3.98922729492188],
            [1.61395263671875, -2.19924926757812],
            [1.56390380859375, -1.88925170898438],
            [1.21392822265625, -1.49923706054688],
            [1.44390869140625, -0.96926879882812],
            [2.58392333984375, 0.05075073242188],
            [3.27392578125, 2.14077758789062],
            [3.1239013671875, 3.10073852539062],
            [3.1539306640625, 3.81076049804688],
            [3.50390625, 3.76077270507812],
            [3.57391357421875, 4.52072143554688],
            [3.36395263671875, 4.76077270507812],
            [0.81390380859375, 4.76077270507812],
            [0.6239013671875, 4.66073608398438],
            [0.74395751953125, 4.48074340820312],
            [0.99395751953125, 3.95077514648438],
            [1.31390380859375, 3.60073852539062],
            [2.033935546875, 3.54074096679688],
            [2.33392333984375, 3.41073608398438],
            [2.9339599609375, 2.71072387695312],
            [3.10394287109375, 2.08078002929688],
            [2.9339599609375, 1.78073120117188],
            [2.58392333984375, 1.97073364257812],
            [2.3839111328125, 2.47073364257812],
            [1.4139404296875, 2.92074584960938],
            [1.31390380859375, 2.68075561523438],
            [1.59393310546875, 2.01077270507812],
            [1.303955078125, 1.16073608398438],
            [0.3739013671875, 1.47073364257812],
            [0.27392578125, 1.64077758789062],
            [-0.02606201171875, 1.76077270507812],
            [-0.0760498046875, 1.49075317382812],
            [-0.3360595703125, 1.09072875976562],
            [-0.74609375, 0.74075317382812],
            [-1.63604736328125, 0.03073120117188],
            [-2.966064453125, -1.00924682617188],
            [-3.4560546875, -1.60922241210938],
            [-3.47607421875, -1.93923950195312],
            [-0.7060546875, -4.70925903320312],
            [-0.01605224609375, -4.39926147460938]
        ];
        const inTangents: [number, number][] = [
            [-0.24005126953125, -0.010009765625],
            [-0.010009765625, -0.010009765625],
            [-0.300048828125, -0.67999267578125],
            [0.1800537109375, -0.04998779296875],
            [0.07000732421875, -0.20001220703125],
            [-0.3499755859375, -0.01995849609375],
            [-0.28997802734375, -0.40997314453125],
            [-0.19000244140625, -0.71002197265625],
            [0.1800537109375, -0.32000732421875],
            [-0.08001708984375, -0.22003173828125],
            [-0.15997314453125, -0.02001953125],
            [-0.01995849609375, -0.25],
            [0.14996337890625, 0],
            [0, 0],
            [0.02001953125, 0.10003662109375],
            [-0.07000732421875, 0.030029296875],
            [0.15997314453125, 0.3399658203125],
            [-0.2099609375, 0.030029296875],
            [-0.239990234375, 0.02001953125],
            [-0.03997802734375, 0.1199951171875],
            [-0.25, 0.20001220703125],
            [0.03997802734375, 0.22998046875],
            [0.14996337890625, 0.02001953125],
            [0.07000732421875, -0.1300048828125],
            [0.0400390625, -0.17999267578125],
            [0.3399658203125, 0.16998291015625],
            [-0.0899658203125, 0.08001708984375],
            [-0.1099853515625, 0.219970703125],
            [0.3399658203125, 0.1500244140625],
            [0.1600341796875, -0.27996826171875],
            [0.03997802734375, -0.0400390625],
            [0.1199951171875, 0.05999755859375],
            [-0.030029296875, 0.09002685546875],
            [0.260009765625, 0.030029296875],
            [0.10003662109375, 0.20001220703125],
            [0.469970703125, 0.0400390625],
            [0.27001953125, 0.57000732421875],
            [0.22998046875, 0.14996337890625],
            [-0.1300048828125, 0.1199951171875],
            [-0.92999267578125, 0.91998291015625],
            [-0.07000732421875, -0.260009765625]
        ];
        const outTangents: [number, number][] = [
            [0.01995849609375, 0],
            [0.3699951171875, 0.6300048828125],
            [0.04998779296875, 0.1300048828125],
            [-0.22998046875, 0.04998779296875],
            [-0.1300048828125, 0.3599853515625],
            [0.6600341796875, 0.050048828125],
            [0.42999267578125, 0.6099853515625],
            [0.08001708984375, 0.3399658203125],
            [-0.1199951171875, 0.21002197265625],
            [0.07000732421875, 0.19000244140625],
            [0.02001953125, 0.25994873046875],
            [0.010009765625, 0.1600341796875],
            [0, 0],
            [-0.0799560546875, 0],
            [-0.02996826171875, -0.0899658203125],
            [0.25994873046875, -0.0999755859375],
            [-0.08001708984375, -0.1600341796875],
            [0.24005126953125, -0.02996826171875],
            [0.1099853515625, -0.010009765625],
            [0.10003662109375, -0.3299560546875],
            [0.199951171875, -0.14996337890625],
            [-0.02001953125, -0.12005615234375],
            [-0.1400146484375, -0.01995849609375],
            [-0.08001708984375, 0.1600341796875],
            [-0.07000732421875, 0.3699951171875],
            [-0.1099853515625, -0.04998779296875],
            [0.22003173828125, -0.17999267578125],
            [0.17999267578125, -0.3699951171875],
            [-0.280029296875, -0.1300048828125],
            [-0.02996826171875, 0.05999755859375],
            [-0.08001708984375, 0.0799560546875],
            [-0.1199951171875, -0.050048828125],
            [0.0799560546875, -0.25],
            [-0.21002197265625, -0.01995849609375],
            [-0.19000244140625, -0.3499755859375],
            [-0.6500244140625, -0.05999755859375],
            [-0.1099853515625, -0.239990234375],
            [-0.1600341796875, -0.11004638671875],
            [0.91998291015625, -0.92999267578125],
            [0.14996337890625, -0.14996337890625],
            [0.05999755859375, 0.17999267578125]
        ];

        createPathGrp(
            contents,
            'Globe_Piece_21',
            true,
            false,
            getColorsFromMitug(mitug).pri,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [53.5961, -10.7761]
        );
    };

    const createGlobePiece22 = () => {
        const vertices: [number, number][] = [
            [-0.76193237304688, 2.03524780273438],
            [-1.02194213867188, 1.72525024414062],
            [-0.53189086914062, 1.34524536132812],
            [0.14810180664062, 1.20523071289062],
            [0.21810913085938, 1.19522094726562],
            [0.89810180664062, 1.06521606445312],
            [1.25808715820312, 0.37521362304688],
            [1.62808227539062, -0.29476928710938],
            [1.12808227539062, -1.17477416992188],
            [0.80807495117188, -1.53475952148438],
            [0.77810668945312, -1.70480346679688],
            [0.43807983398438, -2.03475952148438],
            [0.06808471679688, -1.70480346679688],
            [-0.46194458007812, -0.28475952148438],
            [-0.55191040039062, -0.15475463867188],
            [-1.39193725585938, 1.13522338867188],
            [-1.50192260742188, 1.33523559570312],
            [-1.65194702148438, 1.21524047851562]
        ];
        const inTangents: [number, number][] = [
            [0.79998779296875, 0.5899658203125],
            [-0.0699462890625, 0.14996337890625],
            [-0.22003173828125, 0.01995849609375],
            [-0.20001220703125, 0.17999267578125],
            [-0.02001953125, -0.010009765625],
            [-0.23004150390625, 0.1500244140625],
            [-0.05999755859375, 0.260009765625],
            [-0.04998779296875, 0.27996826171875],
            [0.469970703125, 0.0999755859375],
            [0, 0.219970703125],
            [0, 0.05999755859375],
            [0.19000244140625, 0.010009765625],
            [0.05999755859375, -0.19000244140625],
            [0.1800537109375, -0.48004150390625],
            [0.05999755859375, -0.02001953125],
            [0.10003662109375, -0.54998779296875],
            [0.0999755859375, -0.02001953125],
            [0.0400390625, 0.04998779296875]
        ];
        const outTangents: [number, number][] = [
            [-0.1099853515625, -0.08001708984375],
            [0.08001708984375, -0.19000244140625],
            [0.22998046875, -0.02001953125],
            [0.01995849609375, -0.010009765625],
            [0.28997802734375, 0.260009765625],
            [0.26995849609375, -0.17999267578125],
            [0.04998779296875, -0.260009765625],
            [0.08001708984375, -0.489990234375],
            [-0.22998046875, -0.04998779296875],
            [0, -0.04998779296875],
            [-0.02001953125, -0.199951171875],
            [-0.20001220703125, -0.010009765625],
            [-0.16998291015625, 0.48004150390625],
            [-0.01995849609375, 0.04998779296875],
            [-0.60003662109375, 0.219970703125],
            [-0.010009765625, 0.08001708984375],
            [-0.07000732421875, 0.010009765625],
            [-0.3299560546875, -0.4200439453125]
        ];

        createPathGrp(
            contents,
            'Globe_Piece_22',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [40.6219, -3.8605]
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
            getColorsFromMitug(mitug).pri,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [43.3989, 0]
        );
    };

    createGlobePiece22();
    createGlobePiece21();
    createGlobePiece20();
    createGlobePiece19();
    createGlobePiece18();
    createGlobePiece17();
    createGlobePiece16();
    createGlobePiece15();
    createGlobePiece14();
    createGlobePiece13();
    createGlobePiece12();
    createGlobePiece11();
    createGlobePiece10();
    createGlobePiece09();
    createGlobePiece08();
    createGlobePiece07();
    createGlobePiece06();
    createGlobePiece05();
    createGlobePiece04();
    createGlobePiece03();
    createGlobePiece02();
    createGlobePiece01();
    createLeavesR07();
    createLeavesR06();
    createLeavesR05();
    createLeavesR04();
    createLeavesR03();
    createLeavesR02();
    createLeavesR01();
    createLeavesL07();
    createLeavesL06();
    createLeavesL05();
    createLeavesL04();
    createLeavesL03();
    createLeavesL02();
    createLeavesL01();
    createLeavesBottom();
    createCountries();
    createGlobeRing12();
    createGlobeRing11();
    createGlobeRing10();
    createGlobeRing09();
    createGlobeRing08();
    createGlobeRing07();
    createGlobeRing06();
    createGlobeRing05();
    createGlobeRing04();
    createGlobeRing03();
    createGlobeRing02();
    createGlobeRing01();
    createIconCircle();

    setLayerTransform(iconLayer, iconPos, iconAnchor, iconScale);

    return iconLayer;
};

const createUNBuildingLocation = (lang: Lingo, mitug: Mitug): void => {
    const args: LocationArgs[] = [
        {
            lang: 'Hebrew',
            text: 'מבנה או“ם',
            fontSize: 77.3332,
            tracking: -19,
            textPos: [909.5429, 535.3016],
            textAnchor: [getOS() === 'Win' ? 94.2928 : -94.2928, -23.9483],
            bgSize: [332, 110],
            iconPos: [1063.6489, 539],
            iconAnchor: [43.3989, 0],
            iconScale: 100,
            iconId: 'U.N. Building'
        },
        {
            lang: 'English',
            text: 'U.N. Building',
            fontSize: 77,
            tracking: -29,
            textPos: [1006.127, 547.998],
            textAnchor: [getOS() === 'Win' ? 165.627 : -165.627, -21.252],
            bgSize: [462, 106],
            iconPos: [790.3072, 539.3489],
            iconAnchor: [43.3989, 0],
            iconScale: 97,
            iconId: 'U.N. Building'
        },
        {
            lang: 'Arabic',
            text: 'مبنى تابع للأمم المتحدة',
            fontSize: 64,
            tracking: -19,
            textPos: [918.9665, 538.3125],
            textAnchor: [getOS() === 'Win' ? 352.2164 : -352.2164, -18.4375],
            bgSize: [826, 92],
            iconPos: [1321.6942, 539.8518],
            iconAnchor: [43.3989, 0],
            iconScale: 83,
            iconId: 'U.N. Building'
        }
    ];
    createLocation(args, lang, mitug);
};

const createDiplomaticBuildingIcon: CreateLocationIconFn = (
    iconPos,
    iconAnchor,
    iconScale,
    name,
    mitug
) => {
    const iconLayer = createIconBase(name);

    const contents = iconLayer.property('Contents') as PropertyGroup;

    const createBgCircle = () => {
        const vertices: [number, number][] = [
            [-33.032958984375, 4.68290710449219],
            [-33.032958984375, -4.50393676757812],
            [-32.7846069335938, -5.62013244628906],
            [4.8055419921875, -32.47412109375],
            [31.6658782958984, -8.67486572265625],
            [20.6464538574219, 25.7608642578125],
            [4.46479797363281, 32.8996276855469],
            [-4.74517822265625, 32.8996276855469],
            [-5.69648742675781, 32.6721649169922],
            [-24.8413238525391, 22.0686492919922]
        ];
        const inTangents: [number, number][] = [
            [1.17633056640625, 6.52383422851562],
            [0, 3.06228637695312],
            [-0.07513427734375, 0.37359619140625],
            [-17.9499053955078, -2.83940124511719],
            [-3.69993591308594, -13.43505859375],
            [10.7574005126953, -9.1934814453125],
            [5.96832275390625, -1.08514404296875],
            [3.06999206542969, 0],
            [0.32023620605469, 0.05888366699219],
            [5.17196655273438, 5.71638488769531]
        ];
        const outTangents: [number, number][] = [
            [0, -3.06228637695312],
            [0.08311462402344, -0.37199401855469],
            [3.63058471679688, -18.0526275634766],
            [13.8599700927734, 2.19244384765625],
            [3.73477172851562, 13.5615539550781],
            [-4.649169921875, 3.97328186035156],
            [-3.06999206542969, 0],
            [-0.31697082519531, -0.07656860351562],
            [-7.57441711425781, -1.39259338378906],
            [-4.49798583984375, -4.97146606445312]
        ];

        createPathGrp(
            contents,
            'BG_Circle',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [0, 0]
        );
    };

    const createPiece01 = () => {
        const vertices: [number, number][] = [
            [0.02409362792969, 6.96293640136719],
            [10.3697204589844, 6.972900390625],
            [12.0300598144531, 5.36869812011719],
            [10.2008056640625, -5.41995239257812],
            [8.10061645507812, -6.97636413574219],
            [-8.15666198730469, -6.97758483886719],
            [-10.2178649902344, -5.38105773925781],
            [-12.0259094238281, 5.24693298339844],
            [-10.3214721679688, 6.97738647460938]
        ];
        const inTangents: [number, number][] = [
            [-3.44857788085938, 0.00070190429688],
            [-3.44834899902344, -0.02754211425781],
            [0.14608764648438, 1.26512145996094],
            [1.00404357910156, 3.53511047363281],
            [1.17799377441406, -0.00898742675781],
            [5.4188232421875, 0.04481506347656],
            [0.31831359863281, -1.13790893554688],
            [0.42701721191406, -3.57235717773438],
            [-1.24952697753906, 0.01441955566406]
        ];
        const outTangents: [number, number][] = [
            [3.44857788085938, 0],
            [1.13652038574219, 0.00907897949219],
            [-0.41896057128906, -3.62814331054688],
            [-0.32855224609375, -1.15681457519531],
            [-5.41888427734375, 0.04136657714844],
            [-1.20449829101562, -0.00996398925781],
            [-0.97483825683594, 3.48489379882812],
            [-0.15631103515625, 1.30767822265625],
            [3.4481201171875, -0.03976440429688]
        ];

        createPathGrp(
            contents,
            'Piece_01',
            true,
            false,
            getColorsFromMitug(mitug).pri,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-0.1434, -9.2158]
        );
    };

    const createPiece02 = () => {
        const vertices: [number, number][] = [
            [0.05604553222656, -6.96540832519531],
            [-10.4536437988281, -6.97331237792969],
            [-12.0315093994141, -5.45097351074219],
            [-10.1372833251953, 5.65646362304688],
            [-8.19790649414062, 6.96470642089844],
            [8.05911254882812, 6.97698974609375],
            [10.232666015625, 5.293701171875],
            [12.0245971679688, -5.33735656738281],
            [10.4014739990234, -6.97703552246094]
        ];
        const inTangents: [number, number][] = [
            [3.44850158691406, -0.0008544921875],
            [3.50311279296875, 0.02104187011719],
            [-0.12445068359375, -1.17166137695312],
            [-1.0516357421875, -3.63548278808594],
            [-0.99079895019531, 0.00410461425781],
            [-5.41856384277344, -0.05345153808594],
            [-0.33097839355469, 1.1956787109375],
            [-0.43229675292969, 3.571044921875],
            [1.16816711425781, -0.01022338867188]
        ];
        const outTangents: [number, number][] = [
            [-3.50325012207031, 0],
            [-1.06864929199219, -0.00640869140625],
            [0.39743041992188, 3.74171447753906],
            [0.30867004394531, 1.06707763671875],
            [5.41900634765625, -0.02243041992188],
            [1.27995300292969, 0.01261901855469],
            [0.96525573730469, -3.48716735839844],
            [0.14942932128906, -1.23440551757812],
            [-3.4482421875, 0.03016662597656]
        ];

        createPathGrp(
            contents,
            'Piece_02',
            true,
            false,
            getColorsFromMitug(mitug).pri,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-0.1396, 9.4279]
        );
    };

    const createPiece03 = () => {
        const vertices: [number, number][] = [
            [-1.08424377441406, 6.9622802734375],
            [3.50509643554688, 6.96461486816406],
            [4.98100280761719, 5.64126586914062],
            [6.65052795410156, -5.47801208496094],
            [5.48046875, -6.96376037597656],
            [-0.74774169921875, -6.95693969726562],
            [-2.40890502929688, -6.12004089355469],
            [-6.72976684570312, 5.74696350097656],
            [-5.67356872558594, 6.96237182617188]
        ];
        const inTangents: [number, number][] = [
            [-1.52978515625, -0.00144958496094],
            [-1.52973937988281, -0.00846862792969],
            [-0.05532836914062, 0.99322509765625],
            [-0.94287109375, 3.64617919921875],
            [1.12782287597656, -0.02301025390625],
            [2.07598876953125, 0.01910400390625],
            [0.39340209960938, -0.61152648925781],
            [0.48167419433594, -4.30812072753906],
            [-0.83331298828125, 0.0029296875]
        ];
        const outTangents: [number, number][] = [
            [1.52978515625, 0],
            [0.90391540527344, 0.0050048828125],
            [0.20927429199219, -3.75650024414062],
            [0.28256225585938, -1.09269714355469],
            [-2.0753173828125, 0.0423583984375],
            [-0.71835327148438, -0.00660705566406],
            [-2.33625793457031, 3.63168334960938],
            [-0.09786987304688, 0.87528991699219],
            [1.52975463867188, -0.00537109375]
        ];

        createPathGrp(
            contents,
            'Piece_03',
            true,
            false,
            getColorsFromMitug(mitug).pri,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-21.6781, -9.221]
        );
    };

    const createPiece04 = () => {
        const vertices: [number, number][] = [
            [-1.00123596191406, -6.95143127441406],
            [-1.00123596191406, -6.96002197265625],
            [-5.42662048339844, -6.96975708007812],
            [-6.71514892578125, -5.50053405761719],
            [-2.55795288085938, 5.92311096191406],
            [-0.67533874511719, 6.970703125],
            [5.55300903320312, 6.96733093261719],
            [6.6580810546875, 5.56979370117188],
            [4.96652221679688, -5.711669921875],
            [3.58816528320312, -6.95237731933594]
        ];
        const inTangents: [number, number][] = [
            [1.52980041503906, 0],
            [0, 0.00286865234375],
            [1.47418212890625, 0.03892517089844],
            [-0.13758850097656, -1.11050415039062],
            [-2.17864990234375, -3.52229309082031],
            [-0.86819458007812, 0.01548767089844],
            [-2.07582092285156, -0.02882385253906],
            [0.26203918457031, 1.02719116210938],
            [0.21022033691406, 3.81234741210938],
            [0.83929443359375, -0.00181579589844]
        ];
        const outTangents: [number, number][] = [
            [0, -0.00286865234375],
            [-1.4752197265625, 0],
            [-1.07518005371094, -0.02838134765625],
            [0.51214599609375, 4.13362121582031],
            [0.4412841796875, 0.71343994140625],
            [2.0755615234375, -0.03704833984375],
            [1.03471374511719, 0.01437377929688],
            [-0.94427490234375, -3.70161437988281],
            [-0.04983520507812, -0.90376281738281],
            [-1.52978515625, 0.00331115722656]
        ];

        createPathGrp(
            contents,
            'Piece_04',
            true,
            false,
            getColorsFromMitug(mitug).pri,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-21.672, 9.4213]
        );
    };

    const createPiece05 = () => {
        const vertices: [number, number][] = [
            [1.05081176757812, -6.95816040039062],
            [-3.55239868164062, -6.95928955078125],
            [-4.96214294433594, -5.74362182617188],
            [-6.66461181640625, 5.57168579101562],
            [-5.54139709472656, 6.96124267578125],
            [0.70584106445312, 6.95799255371094],
            [2.38859558105469, 6.13920593261719],
            [6.73121643066406, -5.75796508789062],
            [5.654052734375, -6.96153259277344]
        ];
        const inTangents: [number, number][] = [
            [1.534423828125, -0.00094604492188],
            [1.53439331054688, 0.00396728515625],
            [0.0521240234375, -0.91970825195312],
            [0.93385314941406, -3.71450805664062],
            [-1.01530456542969, 0.01275634765625],
            [-2.08230590820312, -0.0172119140625],
            [-0.39482116699219, 0.61054992675781],
            [0.82864379882812, -0.00459289550781],
            [-0.47463989257812, 4.32405090332031]
        ];
        const outTangents: [number, number][] = [
            [-1.53440856933594, 0],
            [-0.82762145996094, -0.00213623046875],
            [-0.2166748046875, 3.82353210449219],
            [-0.26515197753906, 1.05465698242188],
            [2.08213806152344, -0.02615356445312],
            [0.71487426757812, 0.00590515136719],
            [2.35202026367188, -3.63706970214844],
            [0.09732055664062, -0.88653564453125],
            [-1.53436279296875, 0.00851440429688]
        ];

        createPathGrp(
            contents,
            'Piece_05',
            true,
            false,
            getColorsFromMitug(mitug).pri,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [21.3881, 9.4266]
        );
    };

    const createPiece06 = () => {
        const vertices: [number, number][] = [
            [1.04525756835938, 6.95732116699219],
            [1.04525756835938, 6.9632568359375],
            [5.48316955566406, 6.9708251953125],
            [6.71940612792969, 5.60000610351562],
            [2.49285888671875, -6.00123596191406],
            [0.55062866210938, -6.96440124511719],
            [-5.36631774902344, -6.96987915039062],
            [-6.63737487792969, -5.41203308105469],
            [-4.97764587402344, 5.57586669921875],
            [-3.55706787109375, 6.96026611328125]
        ];
        const inTangents: [number, number][] = [
            [-1.53411865234375, 0],
            [0, -0.00198364257812],
            [-1.47879028320312, -0.02902221679688],
            [0.12480163574219, 1.05146789550781],
            [2.24494934082031, 3.56532287597656],
            [0.84048461914062, -0.01290893554688],
            [1.97116088867188, 0.05128479003906],
            [-0.31985473632812, -1.20962524414062],
            [-0.22006225585938, -3.71070861816406],
            [-0.94642639160156, 0.00675964355469]
        ];
        const outTangents: [number, number][] = [
            [0, 0.00198364257812],
            [1.47935485839844, 0],
            [0.98280334472656, 0.019287109375],
            [-0.49906921386719, -4.204833984375],
            [-0.45938110351562, -0.72956848144531],
            [-1.97201538085938, 0.03028869628906],
            [-1.18414306640625, -0.03080749511719],
            [0.95170593261719, 3.59925842285156],
            [0.05691528320312, 0.95965576171875],
            [1.53404235839844, -0.01095581054688]
        ];

        createPathGrp(
            contents,
            'Piece_06',
            true,
            false,
            getColorsFromMitug(mitug).pri,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [21.3887, -9.2178]
        );
    };

    const createPiece07 = () => {
        const vertices: [number, number][] = [
            [-0.19526672363281, 3.82560729980469],
            [6.35858154296875, 3.83416748046875],
            [7.21910095214844, 2.35256958007812],
            [3.51799011230469, -2.39201354980469],
            [-3.4595947265625, -2.43656921386719],
            [-7.25851440429688, 2.43476867675781],
            [-6.42146301269531, 3.82991027832031]
        ];
        const inTangents: [number, number][] = [
            [-2.07542419433594, -0.00163269042969],
            [-2.18421936035156, -0.0306396484375],
            [0.57258605957031, 1.02717590332031],
            [1.57177734375, 1.31523132324219],
            [2.27836608886719, -1.87942504882812],
            [1.00056457519531, -1.83285522460938],
            [-1.12631225585938, 0.01127624511719]
        ];
        const outTangents: [number, number][] = [
            [2.18466186523438, 0],
            [1.2445068359375, 0.0174560546875],
            [-0.98965454101562, -1.77536010742188],
            [-2.28004455566406, -1.90789794921875],
            [-1.62542724609375, 1.3408203125],
            [-0.53134155273438, 0.97332763671875],
            [2.07521057128906, -0.02076721191406]
        ];

        createPathGrp(
            contents,
            'Piece_07',
            true,
            false,
            getColorsFromMitug(mitug).pri,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-0.1459, -24.4983]
        );
    };

    const createPiece08 = () => {
        const vertices: [number, number][] = [
            [0.07049560546875, -3.82182312011719],
            [-6.48185729980469, -3.82553100585938],
            [-7.29389953613281, -2.52151489257812],
            [-3.52781677246094, 2.37400817871094],
            [3.57380676269531, 2.34942626953125],
            [7.17755126953125, -2.26573181152344],
            [6.2950439453125, -3.83531188964844]
        ];
        const inTangents: [number, number][] = [
            [2.07492065429688, -0.00257873535156],
            [2.18405151367188, 0.01206970214844],
            [-0.48921203613281, -0.91508483886719],
            [-1.61192321777344, -1.35543823242188],
            [-2.32682800292969, 1.97364807128906],
            [-0.97611999511719, 1.71826171875],
            [1.37051391601562, -0.02763366699219]
        ];
        const outTangents: [number, number][] = [
            [-2.18412780761719, 0],
            [-1.01234436035156, -0.00558471679688],
            [0.98399353027344, 1.84063720703125],
            [2.32925415039062, 1.95863342285156],
            [1.51918029785156, -1.28860473632812],
            [0.60646057128906, -1.06753540039062],
            [-2.07408142089844, 0.04182434082031]
        ];

        createPathGrp(
            contents,
            'Piece_08',
            true,
            false,
            getColorsFromMitug(mitug).pri,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-0.1501, 24.7044]
        );
    };

    const createPiece09 = () => {
        const vertices: [number, number][] = [
            [-4.37059020996094, 2.90193176269531],
            [0.77339172363281, 2.89698791503906],
            [1.59904479980469, 2.44161987304688],
            [4.37059020996094, -2.90351867675781]
        ];
        const inTangents: [number, number][] = [
            [2.32196044921875, -2.70161437988281],
            [-1.714599609375, 0.01078796386719],
            [-0.15802001953125, 0.29849243164062],
            [-1.05636596679688, 2.04464721679688]
        ];
        const outTangents: [number, number][] = [
            [1.71467590332031, 0],
            [0.34165954589844, -0.00215148925781],
            [0.87014770507812, -1.64363098144531],
            [-3.56509399414062, 1.45713806152344]
        ];

        createPathGrp(
            contents,
            'Piece_09',
            true,
            false,
            getColorsFromMitug(mitug).pri,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-14.6003, -23.6093]
        );
    };

    const createPiece10 = () => {
        const vertices: [number, number][] = [
            [-4.61711120605469, -2.89358520507812],
            [-1.90751647949219, 2.35429382324219],
            [-1.13006591796875, 2.86482238769531],
            [4.61711120605469, 2.88822937011719]
        ];
        const inTangents: [number, number][] = [
            [3.55148315429688, 1.43663024902344],
            [-0.86360168457031, -1.59765625],
            [-0.26945495605469, -0.0069580078125],
            [-2.22471618652344, 0]
        ];
        const outTangents: [number, number][] = [
            [1.03585815429688, 2.0238037109375],
            [0.13285827636719, 0.24578857421875],
            [1.76036071777344, 0.04548645019531],
            [-2.82730102539062, -2.69660949707031]
        ];

        createPathGrp(
            contents,
            'Piece_10',
            true,
            false,
            getColorsFromMitug(mitug).pri,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [14.5631, -23.6093]
        );
    };

    const createPiece11 = () => {
        const vertices: [number, number][] = [
            [4.37260437011719, -2.9071044921875],
            [-0.7823486328125, -2.90168762207031],
            [-1.60345458984375, -2.4371337890625],
            [-4.37260437011719, 2.90882873535156]
        ];
        const inTangents: [number, number][] = [
            [-2.30802917480469, 2.70010375976562],
            [1.71824645996094, -0.01179504394531],
            [0.15791320800781, -0.29881286621094],
            [1.06082153320312, -2.05508422851562]
        ];
        const outTangents: [number, number][] = [
            [-1.71833801269531, 0],
            [-0.34175109863281, 0.00234985351562],
            [-0.8662109375, 1.63911437988281],
            [3.57144165039062, -1.48870849609375]
        ];

        createPathGrp(
            contents,
            'Piece_11',
            true,
            false,
            getColorsFromMitug(mitug).pri,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [14.3058, 23.8243]
        );
    };

    const createPiece12 = () => {
        const vertices: [number, number][] = [
            [4.36445617675781, 2.89907836914062],
            [1.79263305664062, -2.17149353027344],
            [0.77723693847656, -2.88986206054688],
            [-4.36445617675781, -2.89613342285156]
        ];
        const inTangents: [number, number][] = [
            [-3.55291748046875, -1.44802856445312],
            [0.78727722167969, 1.53817749023438],
            [0.47929382324219, 0.00448608398438],
            [1.71391296386719, 0]
        ];
        const outTangents: [number, number][] = [
            [-1.00755310058594, -1.98898315429688],
            [-0.20899963378906, -0.40835571289062],
            [-1.71376037597656, -0.01603698730469],
            [2.32896423339844, 2.69029235839844]
        ];

        createPathGrp(
            contents,
            'Piece_12',
            true,
            false,
            getColorsFromMitug(mitug).pri,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-14.6047, 23.8115]
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
            getColorsFromMitug(mitug).pri,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [0, 0]
        );
    };

    createPiece12();
    createPiece11();
    createPiece10();
    createPiece09();
    createPiece08();
    createPiece07();
    createPiece06();
    createPiece05();
    createPiece04();
    createPiece03();
    createPiece02();
    createPiece01();
    createBgCircle();
    createIconCircle();

    setLayerTransform(iconLayer, iconPos, iconAnchor, iconScale);

    return iconLayer;
};

const createDiplomaticBuildingLocation = (lang: Lingo, mitug: Mitug): void => {
    const args: LocationArgs[] = [
        {
            lang: 'Hebrew',
            text: 'מבנה דיפלומטי',
            fontSize: 77.3332,
            tracking: -19,
            textPos: [905.2402, 535.3016],
            textAnchor: [getOS() === 'Win' ? 131.4901 : -131.4901, -23.9483],
            bgSize: [400, 110],
            iconPos: [1097.25, 539],
            iconAnchor: [0, 0],
            iconScale: 100,
            iconId: 'Diplomatic Building'
        },
        {
            lang: 'English',
            text: 'Diplomatic Building',
            fontSize: 77,
            tracking: -29,
            textPos: [1009.4835, 543.498],
            textAnchor: [getOS() === 'Win' ? 252.9835 : -252.9835, -21.252],
            bgSize: [632, 106],
            iconPos: [703.7103, 539.0989],
            iconAnchor: [0, 0],
            iconScale: 97,
            iconId: 'Diplomatic Building'
        },
        {
            lang: 'Arabic',
            text: 'مبنى دبلوماسي',
            fontSize: 64,
            tracking: -19,
            textPos: [913.9072, 541.0312],
            textAnchor: [getOS() === 'Win' ? 241.6572 : -241.6572, -8.7188],
            bgSize: [605, 90],
            iconPos: [1211.4231, 538.8518],
            iconAnchor: [0, 0],
            iconScale: 83,
            iconId: 'Diplomatic Building'
        }
    ];
    createLocation(args, lang, mitug);
};

const createGasStationIcon: CreateLocationIconFn = (
    iconPos,
    iconAnchor,
    iconScale,
    name,
    mitug
) => {
    const iconLayer = createIconBase(name);

    const contents = iconLayer.property('Contents') as PropertyGroup;

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
            getColorsFromMitug(mitug).pri,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [0, 0]
        );
    };

    const createGas = () => {
        const vertices: [number, number][] = [
            [19.7266235351562, -18.5678100585938],
            [15.9114990234375, -23.3271484375],
            [15.0817260742188, -20.4783325195312],
            [19.06201171875, -15.2244873046875],
            [19.03466796875, -12.2393798828125],
            [21.7686157226562, -8.37860107421875],
            [21.7686157226562, 7.8604736328125],
            [20.6541137695312, 13.5918579101562],
            [18.3536376953125, 5.63153076171875],
            [12.709716796875, 3.084228515625],
            [12.709716796875, -23.6531372070312],
            [10.152099609375, -26.2107543945312],
            [-15.5855102539062, -26.2107543945312],
            [-18.1431274414062, -23.6531372070312],
            [-18.1431274414062, 16.2989501953125],
            [-22.3543090820312, 16.2989501953125],
            [-23.9976196289062, 17.9422607421875],
            [-23.9976196289062, 26.2107543945312],
            [-15.5855102539062, 26.2107543945312],
            [10.152099609375, 26.2107543945312],
            [19.03466796875, 26.2107543945312],
            [19.03466796875, 17.9422607421875],
            [17.391357421875, 16.2989501953125],
            [12.709716796875, 16.2989501953125],
            [12.709716796875, 6.74603271484375],
            [17.788330078125, 13.9102783203125],
            [23.3389282226562, 14.06494140625],
            [23.9976196289062, -12.2393798828125]
        ];
        const inTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0.02734375, -2.985107421875],
            [0, 0],
            [0, 0],
            [0.955322265625, -0.63677978515625],
            [1.50445556640625, 2.86572265625],
            [0, 0],
            [0, 0],
            [1.40667724609375, 0],
            [0, 0],
            [0, -1.40667724609375],
            [0, 0],
            [0, 0],
            [0, -0.90380859375],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0.90380859375, 0],
            [0, 0],
            [0, 0],
            [-2.70660400390625, -8.91552734375],
            [0, 0],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [-0.02740478515625, 2.985107421875],
            [0, 0],
            [0, 0],
            [-0.95526123046875, 0.6368408203125],
            [-1.50445556640625, -2.86566162109375],
            [0, 0],
            [0, -1.40667724609375],
            [0, 0],
            [-1.40667724609375, 0],
            [0, 0],
            [0, 0],
            [-0.90380859375, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, -0.90380859375],
            [0, 0],
            [0, 0],
            [0, 0],
            [2.70660400390625, 8.91558837890625],
            [0, 0],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Gas',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [0.1536, -2.8365]
        );
    };

    const createGasHide = () => {
        const vertices: [number, number][] = [
            [9.89009094238281, 8.23963928222656],
            [-9.89009094238281, 8.23963928222656],
            [-10.9564514160156, 7.17327880859375],
            [-10.9564514160156, -7.17327880859375],
            [-9.89009094238281, -8.23963928222656],
            [9.89009094238281, -8.23963928222656],
            [10.9564514160156, -7.17327880859375],
            [10.9564514160156, 7.17327880859375]
        ];
        const inTangents: [number, number][] = [
            [0.58650207519531, 0],
            [0, 0],
            [0, 0.58650207519531],
            [0, 0],
            [-0.58650207519531, 0],
            [0, 0],
            [0, -0.58650207519531],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [-0.58650207519531, 0],
            [0, 0],
            [0, -0.58650207519531],
            [0, 0],
            [0.58650207519531, 0],
            [0, 0],
            [0, 0.58650207519531]
        ];

        createPathGrp(
            contents,
            'Gas_Hide',
            true,
            false,
            getColorsFromMitug(mitug).pri,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-1.9819, -15.077]
        );
    };

    createGasHide();
    createGas();
    createIconCircle();

    setLayerTransform(iconLayer, iconPos, iconAnchor, iconScale);

    return iconLayer;
};

const createGasStationLocation = (lang: Lingo, mitug: Mitug): void => {
    const args: LocationArgs[] = [
        {
            lang: 'Hebrew',
            text: 'תחנת דלק',
            fontSize: 77.3332,
            tracking: -19,
            textPos: [912.9691, 540.1691],
            textAnchor: [getOS() === 'Win' ? 89.969 : -89.969, -19.0808],
            bgSize: [332, 110],
            iconPos: [1064.5, 538.5],
            iconAnchor: [0, 0],
            iconScale: 100,
            iconId: 'Gas Station'
        },
        {
            lang: 'English',
            text: 'Gas station',
            fontSize: 77,
            tracking: -29,
            textPos: [1006.895, 536.953],
            textAnchor: [getOS() === 'Win' ? 145.145 : -145.145, -27.797],
            bgSize: [428, 106],
            iconPos: [806.7103, 539.0989],
            iconAnchor: [0, 0],
            iconScale: 97,
            iconId: 'Gas Station'
        },
        {
            lang: 'Arabic',
            text: 'محطة وقود',
            fontSize: 64,
            tracking: -19,
            textPos: [918.4655, 540.125],
            textAnchor: [getOS() === 'Win' ? 175.4655 : -175.4655, -16.625],
            bgSize: [474, 92],
            iconPos: [1145.6731, 540.1018],
            iconAnchor: [0, 0],
            iconScale: 83,
            iconId: 'Gas Station'
        }
    ];
    createLocation(args, lang, mitug);
};

const createGovernmentBuildingIcon: CreateLocationIconFn = (
    iconPos,
    iconAnchor,
    iconScale,
    name,
    mitug
) => {
    const iconLayer = createIconBase(name);

    const contents = iconLayer.property('Contents') as PropertyGroup;

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
            getColorsFromMitug(mitug).pri,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [0, 0]
        );
    };

    const createStairs = () => {
        const vertices: [number, number][] = [
            [-25.1040191650391, 1.42855834960938],
            [-23.0668029785156, 1.41877746582031],
            [-22.767822265625, 1.111083984375],
            [-22.7725372314453, -1.11479187011719],
            [-22.4613647460938, -1.4345703125],
            [-20.6102905273438, -1.430908203125],
            [-20.3329162597656, -1.71473693847656],
            [-20.3368530273438, -3.94064331054688],
            [-20.0252075195312, -4.25564575195312],
            [-11.8004913330078, -4.25596618652344],
            [19.7861785888672, -4.25596618652344],
            [20.0203094482422, -4.2574462890625],
            [20.3162078857422, -3.96415710449219],
            [20.3091735839844, -1.71484375],
            [20.5934295654297, -1.43124389648438],
            [22.4444580078125, -1.43809509277344],
            [22.7270660400391, -1.154296875],
            [22.7189331054688, 1.165283203125],
            [22.9758911132812, 1.41639709472656],
            [24.8269195556641, 1.40936279296875],
            [25.1039886474609, 1.67463684082031],
            [25.1039581298828, 3.9942626953125],
            [24.8285217285156, 4.25814819335938],
            [24.6411895751953, 4.25709533691406],
            [-24.7071075439453, 4.25643920898438],
            [-25.1040191650391, 4.24078369140625]
        ];
        const inTangents: [number, number][] = [
            [0, 0.93740844726562],
            [-0.67881774902344, -0.01177978515625],
            [0.00419616699219, 0.23188781738281],
            [-0.00071716308594, 0.74198913574219],
            [-0.302734375, 0.00065612792969],
            [-0.6168212890625, -0.01197814941406],
            [0.00315856933594, 0.21279907226562],
            [-0.00082397460938, 0.74198913574219],
            [-0.31002807617188, 0.00006103515625],
            [-2.7415771484375, 0],
            [-10.5288848876953, 0],
            [-0.07688903808594, 0.00965881347656],
            [0.00282287597656, -0.22171020507812],
            [0.00926208496094, -0.74967956542969],
            [-0.21501159667969, 0.00381469726562],
            [-0.61691284179688, 0.00907897949219],
            [0.00314331054688, -0.2174072265625],
            [0.00950622558594, -0.77311706542969],
            [-0.61689758300781, 0.00987243652344],
            [-0.19065856933594, 0.0029296875],
            [0.00216674804688, -0.20751953125],
            [-0.00799560546875, -0.77314758300781],
            [0.20179748535156, 0.0240478515625],
            [0.06248474121094, 0],
            [16.4494323730469, 0.00071716308594],
            [0.13230895996094, 0.00544738769531]
        ];
        const outTangents: [number, number][] = [
            [0.67910766601562, -0.00523376464844],
            [0.24398803710938, 0.00424194335938],
            [-0.01344299316406, -0.74174499511719],
            [0.00030517578125, -0.31010437011719],
            [0.61705017089844, -0.00132751464844],
            [0.21823120117188, 0.00422668457031],
            [-0.01101684570312, -0.7418212890625],
            [0.00035095214844, -0.31318664550781],
            [2.7415771484375, -0.00048828125],
            [10.5288848876953, 0],
            [0.07810974121094, 0],
            [0.22785949707031, -0.02859497070312],
            [-0.00955200195312, 0.74967956542969],
            [-0.00263977050781, 0.21376037597656],
            [0.61685180664062, -0.01094055175781],
            [0.21115112304688, -0.00311279296875],
            [-0.01115417480469, 0.7730712890625],
            [-0.00244140625, 0.19804382324219],
            [0.61689758300781, -0.00949096679688],
            [0.2000732421875, -0.00320434570312],
            [-0.00808715820312, 0.77314758300781],
            [0.00212097167969, 0.20588684082031],
            [-0.06159973144531, -0.00733947753906],
            [-16.4494323730469, 0],
            [-0.13230895996094, 0],
            [0, -0.93740844726562]
        ];

        createPathGrp(
            contents,
            'Stairs',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [0, 15.9159]
        );
    };

    const createRoof = () => {
        const vertices: [number, number][] = [
            [0.07791137695312, -6.1719970703125],
            [2.86775207519531, -4.841552734375],
            [10.1114501953125, -1.421630859375],
            [20.743896484375, 3.59886169433594],
            [22.2266845703125, 4.29850769042969],
            [22.4416809082031, 4.64295959472656],
            [22.4414520263672, 5.9080810546875],
            [22.1852264404297, 6.16883850097656],
            [-22.0054779052734, 6.16786193847656],
            [22.0213165283203, 6.16813659667969],
            [-22.4367980957031, 5.74058532714844],
            [-22.4413146972656, 4.63954162597656],
            [-22.2136688232422, 4.28323364257812],
            [-17.6801605224609, 2.14474487304688],
            [-11.1775207519531, -0.92532348632812],
            [-0.37557983398438, -6.02647399902344],
            [-0.10957336425781, -6.1719970703125]
        ];
        const inTangents: [number, number][] = [
            [-0.0625, 0],
            [-0.93141174316406, -0.44039916992188],
            [-2.41456604003906, -1.13998413085938],
            [-3.5440673828125, -1.67369079589844],
            [-0.49745178222656, -0.2261962890625],
            [0.0030517578125, -0.17007446289062],
            [-0.00736999511719, -0.42161560058594],
            [0.19877624511719, 0.02232360839844],
            [0.05467224121094, 0],
            [14.6755981445312, 0.00035095214844],
            [0.00247192382812, 0.458984375],
            [0.01414489746094, 0.36651611328125],
            [-0.16307067871094, 0.076416015625],
            [-1.5108642578125, 0.71348571777344],
            [-2.16752624511719, 1.02339172363281],
            [-3.60035705566406, 1.70098876953125],
            [-0.08856201171875, 0.04875183105469]
        ];
        const outTangents: [number, number][] = [
            [0.92987060546875, 0.44366455078125],
            [2.41390991210938, 1.14137268066406],
            [3.54423522949219, 1.67332458496094],
            [0.49418640136719, 0.23338317871094],
            [0.15907287597656, 0.07232666015625],
            [-0.00758361816406, 0.42160034179688],
            [0.00325012207031, 0.18612670898438],
            [-0.05398559570312, -0.00605773925781],
            [-14.6755981445312, 0.00001525878906],
            [-0.47959899902344, -0.00001525878906],
            [-0.00717163085938, -0.18609619140625],
            [-0.00196838378906, -0.3670654296875],
            [1.51295471191406, -0.70901489257812],
            [2.16744995117188, -1.0235595703125],
            [3.60076904296875, -1.70010375976562],
            [0.09123229980469, -0.04310607910156],
            [0.0625, 0]
        ];

        createPathGrp(
            contents,
            'Roof',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-0.0114, -21.6667]
        );
    };

    const createPole01 = () => {
        const vertices: [number, number][] = [
            [-0.00334167480469, 11.0274505615234],
            [-2.37010192871094, 11.0313415527344],
            [-2.66268920898438, 10.7342376708984],
            [-2.50515747070312, 4.27166748046875],
            [-2.42701721191406, 1.53298950195312],
            [-2.31892395019531, -3.19721984863281],
            [-2.23396301269531, -6.47483825683594],
            [-2.13142395019531, -10.6895446777344],
            [-1.78092956542969, -11.0263671875],
            [1.73406982421875, -11.0313720703125],
            [2.05012512207031, -10.7277679443359],
            [2.15032958984375, -6.51313781738281],
            [2.29461669921875, -1.48005676269531],
            [2.38726806640625, 1.70358276367188],
            [2.52888488769531, 6.71327209472656],
            [2.62020874023438, 9.92037963867188],
            [2.66021728515625, 10.7387084960938],
            [2.36341857910156, 11.0310821533203]
        ];
        const inTangents: [number, number][] = [
            [0.7889404296875, 0.00001525878906],
            [0.78880310058594, -0.010009765625],
            [-0.0059814453125, 0.22573852539062],
            [-0.05316162109375, 2.1541748046875],
            [-0.02224731445312, 0.91299438476562],
            [-0.03753662109375, 1.57669067382812],
            [-0.02720642089844, 1.09257507324219],
            [-0.03556823730469, 1.40486145019531],
            [-0.33650207519531, 0.00010681152344],
            [-1.17158508300781, 0.0106201171875],
            [-0.00431823730469, -0.23518371582031],
            [-0.03761291503906, -1.40476989746094],
            [-0.05632019042969, -1.67741394042969],
            [-0.02284240722656, -1.06155395507812],
            [-0.05691528320312, -1.66957092285156],
            [-0.01252746582031, -1.06959533691406],
            [-0.0247802734375, -0.27177429199219],
            [0.21849060058594, 0.00254821777344]
        ];
        const outTangents: [number, number][] = [
            [-0.7889404296875, -0.00001525878906],
            [-0.22442626953125, 0.00285339355469],
            [0.05712890625, -2.15406799316406],
            [0.02253723144531, -0.91297912597656],
            [0.03842163085938, -1.57667541503906],
            [0.0260009765625, -1.09259033203125],
            [0.03497314453125, -1.40487670898438],
            [0.00848388671875, -0.33468627929688],
            [1.17169189453125, -0.00039672851562],
            [0.23405456542969, -0.00212097167969],
            [0.02581787109375, 1.40501403808594],
            [0.04493713378906, 1.67778015136719],
            [0.03562927246094, 1.06112670898438],
            [0.03593444824219, 1.67015075683594],
            [0.03643798828125, 1.06892395019531],
            [0.00318908691406, 0.27296447753906],
            [0.02120971679688, 0.23252868652344],
            [-0.78883361816406, -0.00920104980469]
        ];

        createPathGrp(
            contents,
            'Pole_01',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [14.3382, -0.098]
        );
    };

    const createPole02 = () => {
        const vertices: [number, number][] = [
            [-0.02055358886719, 11.0274505615234],
            [-2.38729858398438, 11.0303497314453],
            [-2.66091918945312, 10.7637329101562],
            [-2.52253723144531, 5.54292297363281],
            [-2.47833251953125, 3.55256652832031],
            [-2.36318969726562, -1.57574462890625],
            [-2.26957702636719, -5.34529113769531],
            [-2.1715087890625, -9.06779479980469],
            [-2.13658142089844, -10.7301788330078],
            [1.742431640625, -11.031494140625],
            [-1.8427734375, -11.0312347412109],
            [2.0455322265625, -10.7340393066406],
            [2.08659362792969, -9.02485656738281],
            [2.20155334472656, -4.5762939453125],
            [2.34587097167969, 0.43325805664062],
            [2.43756103515625, 3.64030456542969],
            [2.57818603515625, 8.62654113769531],
            [2.36959838867188, 11.0314483642578],
            [2.66014099121094, 10.7321472167969]
        ];
        const inTangents: [number, number][] = [
            [0.79673767089844, 0.00006103515625],
            [0.78886413574219, -0.00717163085938],
            [-0.00619506835938, 0.21192932128906],
            [-0.04481506347656, 1.74031066894531],
            [-0.02108764648438, 0.66351318359375],
            [-0.03855895996094, 1.70945739746094],
            [-0.03143310546875, 1.25651550292969],
            [-0.04666137695312, 1.24031066894531],
            [-0.00254821777344, 0.55415344238281],
            [-0.234130859375, -0.00204467773438],
            [-1.19500732421875, 0.01100158691406],
            [-0.00639343261719, -0.20793151855469],
            [-0.02067565917969, -0.56977844238281],
            [-0.03941345214844, -1.48284912109375],
            [-0.05792236328125, -1.66950988769531],
            [-0.02528381347656, -1.0692138671875],
            [-0.05006408691406, -1.6619873046875],
            [-0.03561401367188, -0.70146179199219],
            [0.22669982910156, 0.00289916992188]
        ];
        const outTangents: [number, number][] = [
            [-0.78892517089844, -0.00006103515625],
            [-0.197021484375, 0.00178527832031],
            [0.05085754394531, -1.74012756347656],
            [0.01708984375, -0.66337585449219],
            [0.05430603027344, -1.70893859863281],
            [0.02835083007812, -1.25657653808594],
            [0.03103637695312, -1.24089050292969],
            [0.02084350585938, -0.55422973632812],
            [0.0009765625, -0.21360778808594],
            [1.19500732421875, 0.01045227050781],
            [0.23194885253906, -0.00213623046875],
            [0.01753234863281, 0.56961059570312],
            [0.05377197265625, 1.48228454589844],
            [0.04438781738281, 1.66995239257812],
            [0.039306640625, 1.66226196289062],
            [0.03709411621094, 1.06890869140625],
            [0.02114868164062, 0.70207214355469],
            [0.01139831542969, 0.22444152832031],
            [-0.79660034179688, -0.01016235351562]
        ];

        createPathGrp(
            contents,
            'Pole_02',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [4.7721, -0.098]
        );
    };

    const createPole03 = () => {
        const vertices: [number, number][] = [
            [-0.03567504882812, 11.0270385742188],
            [-2.37911987304688, 11.030517578125],
            [-2.658935546875, 10.756103515625],
            [-2.54277038574219, 5.53364562988281],
            [-2.45588684082031, 2.11528015136719],
            [-2.30909729003906, -3.83230590820312],
            [-2.21992492675781, -7.34439086914062],
            [-2.13409423828125, -10.7628021240234],
            [-1.85722351074219, -11.0303649902344],
            [1.75172424316406, -11.0305633544922],
            [2.02784729003906, -10.7657318115234],
            [2.09115600585938, -8.75267028808594],
            [2.20771789550781, -4.30387878417969],
            [2.35163879394531, 0.70603942871094],
            [2.44447326660156, 3.91326904296875],
            [2.59095764160156, 8.87611389160156],
            [2.65602111816406, 10.771484375],
            [2.40155029296875, 11.0295562744141]
        ];
        const inTangents: [number, number][] = [
            [0.81240844726562, -0.00007629394531],
            [0.78106689453125, -0.00845336914062],
            [-0.00607299804688, 0.22843933105469],
            [-0.039306640625, 1.74081420898438],
            [-0.02838134765625, 1.13946533203125],
            [-0.04927062988281, 1.98251342773438],
            [-0.03018188476562, 1.17068481445312],
            [-0.02232360839844, 1.13958740234375],
            [-0.20188903808594, -0.00120544433594],
            [-1.20294189453125, 0.0076904296875],
            [-0.01742553710938, -0.20281982421875],
            [-0.02720642089844, -0.67076110839844],
            [-0.03941345214844, -1.48294067382812],
            [-0.05671691894531, -1.669677734375],
            [-0.02339172363281, -1.06939697265625],
            [-0.07009887695312, -1.65339660644531],
            [-0.06814575195312, -0.62980651855469],
            [0.18954467773438, 0.00141906738281]
        ];
        const outTangents: [number, number][] = [
            [-0.78115844726562, 0.00007629394531],
            [-0.205322265625, 0.00222778320312],
            [0.04621887207031, -1.74061584472656],
            [0.02572631835938, -1.1395263671875],
            [0.04939270019531, -1.98252868652344],
            [0.02908325195312, -1.17071533203125],
            [0.02938842773438, -1.13945007324219],
            [0.00399780273438, -0.20396423339844],
            [1.20295715332031, 0.00721740722656],
            [0.20213317871094, -0.00129699707031],
            [0.05757141113281, 0.67034912109375],
            [0.06010437011719, 1.48207092285156],
            [0.04438781738281, 1.67007446289062],
            [0.03631591796875, 1.06898498535156],
            [0.03617858886719, 1.65461730957031],
            [0.02679443359375, 0.6318359375],
            [0.02159118652344, 0.1995849609375],
            [-0.81236267089844, -0.006103515625]
        ];

        createPathGrp(
            contents,
            'Pole_03',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-4.7961, -0.0976]
        );
    };

    const createPole04 = () => {
        const vertices: [number, number][] = [
            [-0.00587463378906, 11.0275268554688],
            [-2.39569091796875, 11.0307922363281],
            [-2.65420532226562, 10.7510833740234],
            [-2.58674621582031, 8.528076171875],
            [-2.470458984375, 3.44746398925781],
            [-2.37637329101562, -0.34492492675781],
            [-2.28323364257812, -4.06704711914062],
            [-2.18766784667969, -7.88285827636719],
            [-2.10993957519531, -10.76171875],
            [-1.83544921875, -11.0298919677734],
            [1.77273559570312, -11.0308074951172],
            [2.19212341308594, -5.57011413574219],
            [2.04981994628906, -10.7429962158203],
            [2.28482055664062, -2.36357116699219],
            [2.42646789550781, 2.62184143066406],
            [2.52037048339844, 5.92208862304688],
            [2.65518188476562, 10.6968078613281],
            [2.33711242675781, 11.0272827148438]
        ];
        const inTangents: [number, number][] = [
            [0.78099060058594, 0.00007629394531],
            [0.79652404785156, -0.00831604003906],
            [-0.01885986328125, 0.19902038574219],
            [-0.0267333984375, 0.74101257324219],
            [-0.03828430175781, 1.69358825683594],
            [-0.03160095214844, 1.26412963867188],
            [-0.03099060058594, 1.24070739746094],
            [-0.033447265625, 1.27189636230469],
            [-0.01832580566406, 0.95976257324219],
            [-0.2027587890625, -0.001220703125],
            [-1.20266723632812, 0.00950622558594],
            [-0.00486755371094, -0.20376586914062],
            [-0.05738830566406, -1.72396850585938],
            [-0.02328491210938, -1.06916809082031],
            [-0.05783081054688, -1.66145324707031],
            [-0.02543640136719, -1.10031127929688],
            [-0.04365539550781, -1.59161376953125],
            [0.32058715820312, -0.00041198730469]
        ];
        const outTangents: [number, number][] = [
            [-0.79661560058594, -0.00007629394531],
            [-0.21101379394531, 0.002197265625],
            [0.070068359375, -0.73922729492188],
            [0.02857971191406, -1.26419067382812],
            [0.06105041503906, -1.69273376464844],
            [0.031005859375, -1.24070739746094],
            [0.03176879882812, -1.27194213867188],
            [0.02523803710938, -0.95964050292969],
            [0.00389099121094, -0.20413208007812],
            [1.20269775390625, 0.00727844238281],
            [0.22372436523438, -0.00177001953125],
            [0.04121398925781, 1.72444152832031],
            [0.03558349609375, 1.06877136230469],
            [0.03619384765625, 1.66206359863281],
            [0.03828430175781, 1.09996032714844],
            [0.03680419921875, 1.59176635742188],
            [0.00900268554688, 0.32823181152344],
            [-0.78099060058594, 0.00100708007812]
        ];

        createPathGrp(
            contents,
            'Pole_04',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-14.3859, -0.0981]
        );
    };

    const createCeiling = () => {
        const vertices: [number, number][] = [
            [0.01043701171875, 1.44029235839844],
            [-17.6570281982422, 1.44026184082031],
            [-17.9147033691406, 1.44059753417969],
            [-18.1226196289062, 1.23432922363281],
            [-18.1228332519531, -1.22586059570312],
            [-17.9180297851562, -1.440673828125],
            [-17.6837463378906, -1.44146728515625],
            [17.6746215820312, -1.44151306152344],
            [18.1225280761719, -0.99331665039062],
            [18.1221466064453, 1.11543273925781],
            [17.7950134277344, 1.44015502929688]
        ];
        const inTangents: [number, number][] = [
            [5.92819213867188, -0.00001525878906],
            [5.88916015625, 0.00003051757812],
            [0.08554077148438, -0.00550842285156],
            [-0.0006103515625, 0.14964294433594],
            [0.00347900390625, 0.82005310058594],
            [-0.15028381347656, -0.00495910644531],
            [-0.07809448242188, 0],
            [-11.7861175537109, -0.00003051757812],
            [-0.00007629394531, -0.44805908203125],
            [0.00120544433594, -0.70291137695312],
            [0.32478332519531, -0.00001525878906]
        ];
        const outTangents: [number, number][] = [
            [-5.88916015625, 0],
            [-0.08592224121094, 0],
            [-0.15040588378906, 0.00968933105469],
            [0.00335693359375, -0.82005310058594],
            [-0.00062561035156, -0.14715576171875],
            [0.0780029296875, 0.00257873535156],
            [11.7861175537109, -0.00006103515625],
            [0.44769287109375, 0],
            [0.00010681152344, 0.70292663574219],
            [-0.00054931640625, 0.32379150390625],
            [-5.92819213867188, 0.00018310546875]
        ];

        createPathGrp(
            contents,
            'Ceiling',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-0.0124, -13.3268]
        );
    };

    createCeiling();
    createPole04();
    createPole03();
    createPole02();
    createPole01();
    createRoof();
    createStairs();
    createIconCircle();

    setLayerTransform(iconLayer, iconPos, iconAnchor, iconScale);

    return iconLayer;
};

const createGovernmentBuildingLocation = (lang: Lingo, mitug: Mitug): void => {
    const args: LocationArgs[] = [
        {
            lang: 'Hebrew',
            text: 'מבנה ממשל',
            fontSize: 77.3332,
            tracking: -19,
            textPos: [908.4594, 535.3016],
            textAnchor: [getOS() === 'Win' ? 104.9593 : -104.9593, -23.9483],
            bgSize: [356, 110],
            iconPos: [1075, 539],
            iconAnchor: [0, 0],
            iconScale: 100,
            iconId: 'Government Building'
        },
        {
            lang: 'English',
            text: 'Government\nBuilding',
            fontSize: 70.0703,
            tracking: -19,
            textPos: [1006.895, 536.953],
            textAnchor: [getOS() === 'Win' ? 144.895 : -144.895, -0.197],
            bgSize: [424, 146],
            iconPos: [808.4603, 539.3489],
            iconAnchor: [0, 0],
            iconScale: 97,
            iconId: 'Government Building',
            leading: 59
        },
        {
            lang: 'Arabic',
            text: 'مبنى حكومي',
            fontSize: 64,
            tracking: -19,
            textPos: [918.2936, 545.4062],
            textAnchor: [getOS() === 'Win' ? 197.2936 : -197.2936, -11.3438],
            bgSize: [512, 91],
            iconPos: [1164.7981, 544.6018],
            iconAnchor: [0, 0],
            iconScale: 83,
            iconId: 'Government Building'
        }
    ];
    createLocation(args, lang, mitug);
};

const createPumpingStationIcon: CreateLocationIconFn = (
    iconPos,
    iconAnchor,
    iconScale,
    name,
    mitug
) => {
    const iconLayer = createIconBase(name);

    const contents = iconLayer.property('Contents') as PropertyGroup;

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
            getColorsFromMitug(mitug).pri,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [0, 0]
        );
    };

    const createBigDrop = () => {
        const vertices: [number, number][] = [
            [14.536376953125, 23.3396453857422],
            [14.5363616943359, 23.3396759033203],
            [-14.5363616943359, 23.3396759033203],
            [-14.536376953125, 23.3396606445312],
            [-17.3201904296875, -2.27023315429688],
            [0, -29.36083984375],
            [17.3201904296875, -2.27023315429688]
        ];
        const inTangents: [number, number][] = [
            [6.82470703125, -6.82470703125],
            [0, 0],
            [8.02821350097656, 8.02821350097656],
            [0, 0],
            [-5.19892883300781, 8.13168334960938],
            [0, 0],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [-8.02821350097656, 8.02821350097656],
            [0, 0],
            [-6.82470703125, -6.82470703125],
            [0, 0],
            [0, 0],
            [5.19892883300781, 8.13168334960938]
        ];

        createPathGrp(
            contents,
            'Big_Drop',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-4.259, 6.6779]
        );
    };

    const createLittleDrop = () => {
        const vertices: [number, number][] = [
            [6.12968444824219, 9.31932067871094],
            [6.12966918945312, 9.31932067871094],
            [-6.12966918945312, 9.3193359375],
            [-6.12966918945312, 9.31932067871094],
            [-7.08578491210938, -1.80409240722656],
            [0, -11.8583221435547],
            [7.08578491210938, -1.80409240722656]
        ];
        const inTangents: [number, number][] = [
            [2.98173522949219, -2.98173522949219],
            [0, 0],
            [3.38531494140625, 3.38531494140625],
            [0, 0],
            [-2.42916870117188, 3.44682312011719],
            [0, 0],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [-3.38531494140625, 3.38531494140625],
            [0, 0],
            [-2.98173522949219, -2.98173522949219],
            [0, 0],
            [0, 0],
            [2.42916870117188, 3.44682312011719]
        ];

        createPathGrp(
            contents,
            'Little_Drop',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [18.1802, -19.2982]
        );
    };

    const createDropHighlight = () => {
        const vertices: [number, number][] = [
            [5.55082702636719, 10.1707000732422],
            [5.26551818847656, 10.1485748291016],
            [-3.01443481445312, 5.94314575195312],
            [-6.79644775390625, -8.83953857421875],
            [-4.50321960449219, -10.0962982177734],
            [-3.24647521972656, -7.80308532714844],
            [-0.39981079101562, 3.32850646972656],
            [5.83070373535156, 6.49388122558594],
            [7.37547302246094, 8.60382080078125]
        ];
        const inTangents: [number, number][] = [
            [0.89561462402344, 0],
            [0.095703125, 0.014892578125],
            [2.263427734375, 2.263427734375],
            [-1.53302001953125, 5.25318908691406],
            [-0.97958374023438, -0.28575134277344],
            [0.28619384765625, -0.98048400878906],
            [-2.9107666015625, -2.91030883789062],
            [-2.37176513671875, -0.36700439453125],
            [0.15618896484375, -1.00892639160156]
        ];
        const outTangents: [number, number][] = [
            [-0.09480285644531, 0],
            [-3.15362548828125, -0.48799133300781],
            [-3.865966796875, -3.86506652832031],
            [0.28619384765625, -0.98004150390625],
            [0.98048400878906, 0.28619384765625],
            [-1.15473937988281, 3.95579528808594],
            [1.70365905761719, 1.70365905761719],
            [1.00938415527344, 0.15618896484375],
            [-0.14173889160156, 0.91368103027344]
        ];

        createPathGrp(
            contents,
            'Drop_Highlight',
            true,
            false,
            getColorsFromMitug(mitug).pri,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-11.8231, 19.2685]
        );
    };

    createDropHighlight();
    createLittleDrop();
    createBigDrop();
    createIconCircle();

    setLayerTransform(iconLayer, iconPos, iconAnchor, iconScale);

    return iconLayer;
};

const createPumpingStationLocation = (lang: Lingo, mitug: Mitug): void => {
    const args: LocationArgs[] = [
        {
            lang: 'Hebrew',
            text: 'תחנת שאיבה',
            fontSize: 77.3332,
            tracking: -19,
            textPos: [-54.5092 + 960, -1.1351 + 540],
            textAnchor: [getOS() === 'Win' ? 117.1903 : -117.1903, -20.4437],
            bgSize: [372, 110],
            iconPos: [1083, 539],
            iconAnchor: [0, 0],
            iconScale: 100,
            iconId: 'Pumping Station'
        },
        {
            lang: 'English',
            text: 'Pumping Station',
            fontSize: 74.9495,
            tracking: -20,
            textPos: [1008.1195, 548.5892],
            textAnchor: [getOS() === 'Win' ? 212.3694 : -212.3694, -21.0608],
            bgSize: [556, 106],
            iconPos: [742, 539],
            iconAnchor: [0, 0],
            iconScale: 97,
            iconId: 'Pumping Station'
        },
        {
            lang: 'Arabic',
            text: 'محطة ضخ',
            fontSize: 64,
            tracking: -19,
            textPos: [915.8832, 542.875],
            textAnchor: [getOS() === 'Win' ? 144.3833 : -144.3833, -13.875],
            bgSize: [404, 91],
            iconPos: [1110.625, 540],
            iconAnchor: [0, 0],
            iconScale: 83,
            iconId: 'Pumping Station'
        }
    ];
    createLocation(args, lang, mitug);
};

const createPoliceIcon: CreateLocationIconFn = (
    iconPos,
    iconAnchor,
    iconScale,
    name,
    mitug
) => {
    const iconLayer = createIconBase(name);

    const contents = iconLayer.property('Contents') as PropertyGroup;

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
            getColorsFromMitug(mitug).pri,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [0, 0]
        );
    };

    const createBadgeFrameTop = () => {
        const vertices: [number, number][] = [
            [21.9000244140625, -8.67498779296875],
            [17.27001953125, -10.4650268554688],
            [10.260009765625, -10.114990234375],
            [-0.010009765625, -14.1649780273438],
            [-10.260009765625, -10.10498046875],
            [-17.27001953125, -10.4650268554688],
            [-21.9000244140625, -8.66497802734375],
            [-21.0999755859375, 14.1649780273438],
            [-15.6099853515625, 14.1649780273438],
            [-15.489990234375, 13.614990234375],
            [-15.030029296875, -4.9949951171875],
            [-14.530029296875, -4.96502685546875],
            [-10.260009765625, -4.7550048828125],
            [0, -7.29498291015625],
            [10.260009765625, -4.7550048828125],
            [14.5399780273438, -4.96502685546875],
            [15.030029296875, -5.0050048828125],
            [15.5, 13.635009765625],
            [15.6300048828125, 14.1649780273438],
            [21.1099853515625, 14.1649780273438]
        ];
        const inTangents: [number, number][] = [
            [-4.35003662109375, 10.2999877929688],
            [2.05999755859375, 0],
            [2.52996826171875, 0],
            [3.010009765625, 3.3499755859375],
            [3.5400390625, 0],
            [2.0400390625, 0],
            [0.9200439453125, -1.44000244140625],
            [1.22998046875, -5.7099609375],
            [0, 0],
            [-0.0400390625, 0.19000244140625],
            [1.99005126953125, 7.92999267578125],
            [-0.16998291015625, -0.00994873046875],
            [-1.52996826171875, 0],
            [-4.260009765625, 2.53997802734375],
            [-1.69000244140625, 0],
            [-1.28997802734375, 0.10003662109375],
            [-0.1600341796875, 0.010009765625],
            [-1.07000732421875, -4.6400146484375],
            [-0.04998779296875, -0.16998291015625],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [-0.9200439453125, -1.42999267578125],
            [-2.0400390625, 0],
            [-3.5400390625, 0],
            [-3, 3.3599853515625],
            [-2.52996826171875, 0],
            [-2.05999755859375, 0],
            [4.34002685546875, 10.2799682617188],
            [0, 0],
            [0.03997802734375, -0.17999267578125],
            [1.05999755859375, -4.6400146484375],
            [0.1600341796875, 0.010009765625],
            [1.280029296875, 0.10003662109375],
            [1.69000244140625, 0],
            [4.260009765625, 2.53997802734375],
            [1.52996826171875, 0],
            [0.1600341796875, -0.00994873046875],
            [-2, 7.95001220703125],
            [0.03997802734375, 0.17999267578125],
            [0, 0],
            [-1.22998046875, -5.699951171875]
        ];

        createPathGrp(
            contents,
            'Badge_Frame_Top',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [0, -11.515]
        );
    };

    const createBadgeFrameBottom = () => {
        const vertices: [number, number][] = [
            [19.3804473876953, -17.635009765625],
            [14.0304107666016, -17.635009765625],
            [15.4904327392578, -5.92498779296875],
            [-0.00956726074219, 11.8049926757812],
            [-15.4995574951172, -5.94500732421875],
            [-14.0495452880859, -17.635009765625],
            [-19.4095916748047, -17.635009765625],
            [-0.00956726074219, 17.635009765625]
        ];
        const inTangents: [number, number][] = [
            [-0.6300048828125, 15.77001953125],
            [0, 0],
            [-0.72998046875, -3.17999267578125],
            [17.7999877929688, -7.79998779296875],
            [-1.54998779296875, 6.760009765625],
            [0.15997314453125, 4.6600341796875],
            [0, 0],
            [-32.3900146484375, -13.7100219726562]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [1.55999755859375, 6.72998046875],
            [-0.15997314453125, 4.67999267578125],
            [-17.780029296875, -7.77001953125],
            [0.72998046875, -3.17999267578125],
            [0, 0],
            [0.6500244140625, 15.760009765625],
            [32.4400024414062, -13.77001953125]
        ];

        createPathGrp(
            contents,
            'Badge_Frame_Bottom',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [0.0096, 8.045]
        );
    };

    const createStar = () => {
        const vertices: [number, number][] = [
            [0, -10.5857543945312],
            [3.43951416015625, -3.61653137207031],
            [11.1305236816406, -2.49896240234375],
            [5.56526184082031, 2.92582702636719],
            [6.87904357910156, 10.5857543945312],
            [0, 6.96923828125],
            [-6.87904357910156, 10.5857543945312],
            [-5.56526184082031, 2.92582702636719],
            [-11.1305236816406, -2.49896240234375],
            [-3.43951416015625, -3.61653137207031]
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
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Star',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [0, -1.9946]
        );
    };

    createStar();
    createBadgeFrameBottom();
    createBadgeFrameTop();
    createIconCircle();

    setLayerTransform(iconLayer, iconPos, iconAnchor, iconScale);

    return iconLayer;
};

const createPoliceLocation = (lang: Lingo, mitug: Mitug): void => {
    const args: LocationArgs[] = [
        {
            lang: 'Hebrew',
            text: 'משטרה',
            fontSize: 77.3332,
            tracking: -19,
            textPos: [914.9214, 538.8649],
            textAnchor: [getOS() === 'Win' ? 69.1209 : -69.1209, -20.4437],
            bgSize: [294, 110],
            iconPos: [1044.5, 539],
            iconAnchor: [0, 0],
            iconScale: 100,
            iconId: 'Police'
        },
        {
            lang: 'English',
            text: 'Police',
            fontSize: 74.9495,
            tracking: -20,
            textPos: [1013.4949, 542.9679],
            textAnchor: [getOS() === 'Win' ? 81.9948 : -81.9948, -26.682],
            bgSize: [284, 106],
            iconPos: [878, 539],
            iconAnchor: [0, 0],
            iconScale: 97,
            iconId: 'Police'
        },
        {
            lang: 'Arabic',
            text: 'مبنى شرطة',
            fontSize: 64,
            tracking: -13,
            textPos: [919.7453, 536.4375],
            textAnchor: [getOS() === 'Win' ? 180.4954 : -180.4954, -20.3125],
            bgSize: [486, 91],
            iconPos: [1151.125, 540],
            iconAnchor: [0, 0],
            iconScale: 83,
            iconId: 'Police'
        }
    ];
    createLocation(args, lang, mitug);
};

const createWaterFacilityIcon: CreateLocationIconFn = (
    iconPos,
    iconAnchor,
    iconScale,
    name,
    mitug
) => {
    const iconLayer = createIconBase(name);

    const contents = iconLayer.property('Contents') as PropertyGroup;

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
            getColorsFromMitug(mitug).pri,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [0, 0]
        );
    };

    const createDrop = () => {
        const vertices: [number, number][] = [
            [0, -28.6298522949219],
            [0, 28.6298522949219]
        ];
        const inTangents: [number, number][] = [
            [0, 0],
            [-36.3336029052734, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [36.3336029052734, 0]
        ];

        createPathGrp(
            contents,
            'Drop',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [0, 0.8716]
        );
    };

    createDrop();
    createIconCircle();

    setLayerTransform(iconLayer, iconPos, iconAnchor, iconScale);

    return iconLayer;
};

const createWaterFacilityLocation = (lang: Lingo, mitug: Mitug): void => {
    const args: LocationArgs[] = [
        {
            lang: 'Hebrew',
            text: 'מתקן מים',
            fontSize: 77.3332,
            tracking: -19,
            textPos: [909.074, 543.7325],
            textAnchor: [getOS() === 'Win' ? 87.0235 : -87.0235, -15.5761],
            bgSize: [318, 110],
            iconPos: [1056, 539],
            iconAnchor: [0, 0],
            iconScale: 100,
            iconId: 'Water Facility'
        },
        {
            lang: 'English',
            text: 'Water Facility',
            fontSize: 74.9495,
            tracking: -20,
            textPos: [1013.4949, 542.9679],
            textAnchor: [getOS() === 'Win' ? 179.2417 : -179.2417, -20.7235],
            bgSize: [486, 106],
            iconPos: [777, 539],
            iconAnchor: [0, 0],
            iconScale: 97,
            iconId: 'Water Facility'
        },
        {
            lang: 'Arabic',
            text: 'مجمع مياه',
            fontSize: 64,
            tracking: -19,
            textPos: [918.1465, 541.375],
            textAnchor: [getOS() === 'Win' ? 154.3966 : -154.3966, -13.875],
            bgSize: [424, 91],
            iconPos: [1119.625, 539.25],
            iconAnchor: [0, 0],
            iconScale: 83,
            iconId: 'Water Facility'
        }
    ];
    createLocation(args, lang, mitug);
};

const createResidentialNeighborhoodIcon: CreateLocationIconFn = (
    iconPos,
    iconAnchor,
    iconScale,
    name,
    mitug
) => {
    const iconLayer = createIconBase(name);

    const contents = iconLayer.property('Contents') as PropertyGroup;

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
            getColorsFromMitug(mitug).pri,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-1.738, 0]
        );
    };

    const createMHouse = () => {
        const vertices: [number, number][] = [
            [22.9131622314453, -2.52333068847656],
            [18.7977447509766, -2.52333068847656],
            [18.7977447509766, 26.367431640625],
            [13.5069885253906, 26.367431640625],
            [13.5069885253906, 6.00593566894531],
            [-0.95298767089844, 6.00593566894531],
            [-0.95298767089844, 26.367431640625],
            [-18.7977447509766, 26.367431640625],
            [-18.7977447509766, -2.52333068847656],
            [-22.9131622314453, -2.52333068847656],
            [0, -26.367431640625]
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
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Middle_House',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-1.2362, -3.1699]
        );
    };

    const createLHouse = () => {
        const vertices: [number, number][] = [
            [13.7579803466797, -3.09284973144531],
            [11.2869110107422, -3.09284973144531],
            [11.2869110107422, 15.8320617675781],
            [4.34127807617188, 15.8320617675781],
            [4.34127807617188, 3.60621643066406],
            [-4.34107971191406, 3.60621643066406],
            [-4.34107971191406, 15.8320617675781],
            [-11.2869110107422, 15.8320617675781],
            [-11.2869110107422, -3.09284973144531],
            [-13.7579803466797, -3.09284973144531],
            [0, -15.8320617675781]
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
            [0, 0]
        ];

        createPathGrp(
            contents,
            'L_House',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-36.5779, 7.3654]
        );
    };

    const createRHouse = () => {
        const vertices: [number, number][] = [
            [13.7579803466797, -3.09284973144531],
            [11.2869110107422, -3.09284973144531],
            [11.2869110107422, 15.8320617675781],
            [4.34127807617188, 15.8320617675781],
            [4.34127807617188, 3.60621643066406],
            [-4.34107971191406, 3.60621643066406],
            [-4.34107971191406, 15.8320617675781],
            [-11.2869110107422, 15.8320617675781],
            [-11.2869110107422, -3.09284973144531],
            [-13.7579803466797, -3.09284973144531],
            [0, -15.8320617675781]
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
            [0, 0]
        ];

        createPathGrp(
            contents,
            'R_House',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [36.5779, 7.3654]
        );
    };

    const createWindow01 = () => {
        const vertices: [number, number][] = [
            [2.46131896972656, 2.46131896972656],
            [-2.46131896972656, 2.46131896972656],
            [-2.46131896972656, -2.46131896972656],
            [2.46131896972656, -2.46131896972656]
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
            'Window_01',
            true,
            false,
            getColorsFromMitug(mitug).pri,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-13.3726, -5.0146]
        );
    };

    const createWindow02 = () => {
        const vertices: [number, number][] = [
            [2.46131896972656, 2.46131896972656],
            [-2.46131896972656, 2.46131896972656],
            [-2.46131896972656, -2.46131896972656],
            [2.46131896972656, -2.46131896972656]
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
            'Window_02',
            true,
            false,
            getColorsFromMitug(mitug).pri,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-7.7292, -5.0146]
        );
    };

    const createWindow03 = () => {
        const vertices: [number, number][] = [
            [2.46131896972656, 2.46131896972656],
            [-2.46131896972656, 2.46131896972656],
            [-2.46131896972656, -2.46131896972656],
            [2.46131896972656, -2.46131896972656]
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
            'Window_03',
            true,
            false,
            getColorsFromMitug(mitug).pri,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-13.3726, 0.8716]
        );
    };

    const createWindow04 = () => {
        const vertices: [number, number][] = [
            [2.46131896972656, 2.46131896972656],
            [-2.46131896972656, 2.46131896972656],
            [-2.46131896972656, -2.46131896972656],
            [2.46131896972656, -2.46131896972656]
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
            'Window_04',
            true,
            false,
            getColorsFromMitug(mitug).pri,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-7.7292, 0.8716]
        );
    };

    createWindow04();
    createWindow03();
    createWindow02();
    createWindow01();
    createRHouse();
    createLHouse();
    createMHouse();
    createIconCircle();

    setLayerTransform(iconLayer, iconPos, iconAnchor, iconScale);

    return iconLayer;
};

const createResidentialNeighborhoodLocation = (
    lang: Lingo,
    mitug: Mitug
): void => {
    const args: LocationArgs[] = [
        {
            lang: 'Hebrew',
            text: 'שכונת מגורים',
            fontSize: 77.3332,
            tracking: -20,
            textPos: [905.9881, 539.4101],
            textAnchor: [getOS() === 'Win' ? 122.4377 : -122.4377, -19.8985],
            bgSize: [380, 110],
            iconPos: [1090, 539],
            iconAnchor: [0, 0],
            iconScale: 100,
            iconId: 'Residential Neighborhood'
        },
        {
            lang: 'English',
            text: 'Residential\nNeighborhood',
            fontSize: 59,
            tracking: -18,
            leading: 50,
            textPos: [1007.2187, 546.5324],
            textAnchor: [getOS() === 'Win' ? 143.3405 : -143.3405, 8.716],
            bgSize: [422, 136],
            iconPos: [809.6875, 542.4375],
            iconAnchor: [0, 0],
            iconScale: 100,
            iconId: 'Residential Neighborhood'
        },
        {
            lang: 'Arabic',
            text: 'حي سكني',
            fontSize: 59.991,
            tracking: -19,
            textPos: [918.1465, 541.375],
            textAnchor: [getOS() === 'Win' ? 147.1732 : -147.1732, -10.6332],
            bgSize: [410, 91],
            iconPos: [1114.875, 541.5],
            iconAnchor: [0, 0],
            iconScale: 83,
            iconId: 'Residential Neighborhood'
        }
    ];
    createLocation(args, lang, mitug);
};

const createAmusementParkIcon: CreateLocationIconFn = (
    iconPos,
    iconAnchor,
    iconScale,
    name,
    mitug
) => {
    const iconLayer = createIconBase(name);

    const contents = iconLayer.property('Contents') as PropertyGroup;

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
            getColorsFromMitug(mitug).pri,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [0, -2.4971]
        );
    };

    const createRPole = () => {
        const vertices: [number, number][] = [
            [-12.8439178466797, -20.0448608398438],
            [12.8439178466797, 20.0448608398438]
        ];
        const inTangents: [number, number][] = [
            [0, 0],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'R_Pole',
            false,
            true,
            [0, 0, 0],
            getColorsFromMitug(mitug).bg,
            3,
            vertices,
            inTangents,
            outTangents,
            true,
            [17.0875, 25.0419]
        );
    };

    const createLPole = () => {
        const vertices: [number, number][] = [
            [-12.7528839111328, 19.9027709960938],
            [12.7528839111328, -19.9027709960938]
        ];
        const inTangents: [number, number][] = [
            [0, 0],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'L_Pole',
            false,
            true,
            [0, 0, 0],
            getColorsFromMitug(mitug).bg,
            3,
            vertices,
            inTangents,
            outTangents,
            true,
            [-17.1785, 25.184]
        );
    };

    const createBigCircle = () => {
        const vertices: [number, number][] = [
            [27.192138671875, 0],
            [0, -27.192138671875],
            [-27.192138671875, 0],
            [0, 27.192138671875]
        ];
        const inTangents: [number, number][] = [
            [0, 15.0178070068359],
            [15.0178070068359, 0],
            [0, -15.0178070068359],
            [-15.0178070068359, 0]
        ];
        const outTangents: [number, number][] = [
            [0, -15.0178070068359],
            [-15.0178070068359, 0],
            [0, 15.0178070068359],
            [15.0178070068359, 0]
        ];

        createPathGrp(
            contents,
            'Big_Circle',
            false,
            true,
            [0, 0, 0],
            getColorsFromMitug(mitug).bg,
            3,
            vertices,
            inTangents,
            outTangents,
            true,
            [0, -1.6255]
        );
    };

    const createLittleCircle = () => {
        const vertices: [number, number][] = [
            [8.24102783203125, 0],
            [0, -8.24102783203125],
            [-8.24102783203125, 0],
            [0, 8.24102783203125]
        ];
        const inTangents: [number, number][] = [
            [0, 4.5513916015625],
            [4.5513916015625, 0],
            [0, -4.5513916015625],
            [-4.5513916015625, 0]
        ];
        const outTangents: [number, number][] = [
            [0, -4.5513916015625],
            [-4.5513916015625, 0],
            [0, 4.5513916015625],
            [4.5513916015625, 0]
        ];

        createPathGrp(
            contents,
            'Little_Circle',
            false,
            true,
            [0, 0, 0],
            getColorsFromMitug(mitug).bg,
            3,
            vertices,
            inTangents,
            outTangents,
            true,
            [0, -1.6255]
        );
    };

    const createWheel01 = () => {
        const vertices: [number, number][] = [
            [-6.78562927246094, 0],
            [0, -6.78562927246094],
            [6.78562927246094, 0],
            [0, 6.78562927246094]
        ];
        const inTangents: [number, number][] = [
            [0, 3.74760437011719],
            [-3.74760437011719, 0],
            [0, -3.74760437011719],
            [3.74760437011719, 0]
        ];
        const outTangents: [number, number][] = [
            [0, -3.74760437011719],
            [3.74760437011719, 0],
            [0, 3.74760437011719],
            [-3.74760437011719, 0]
        ];

        createPathGrp(
            contents,
            'Wheel_01',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [0, -27.9795]
        );
    };

    const createWheel02 = () => {
        const vertices: [number, number][] = [
            [-3.392822265625, -5.87652587890625],
            [5.87652587890625, -3.392822265625],
            [3.392822265625, 5.87652587890625],
            [-5.87652587890625, 3.392822265625]
        ];
        const inTangents: [number, number][] = [
            [-3.24551391601562, 1.87379455566406],
            [-1.87379455566406, -3.24551391601562],
            [3.24551391601562, -1.87379455566406],
            [1.87379455566406, 3.24551391601562]
        ];
        const outTangents: [number, number][] = [
            [3.24551391601562, -1.87379455566406],
            [1.87379455566406, 3.24551391601562],
            [-3.24551391601562, 1.87379455566406],
            [-1.87379455566406, -3.24551391601562]
        ];

        createPathGrp(
            contents,
            'Wheel_02',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [22.8232, -14.8026]
        );
    };

    const createWheel03 = () => {
        const vertices: [number, number][] = [
            [3.392822265625, -5.87652587890625],
            [5.87652587890625, 3.392822265625],
            [-3.392822265625, 5.87652587890625],
            [-5.87652587890625, -3.392822265625]
        ];
        const inTangents: [number, number][] = [
            [-3.24551391601562, -1.87379455566406],
            [1.87379455566406, -3.24551391601562],
            [3.24551391601562, 1.87379455566406],
            [-1.87379455566406, 3.24551391601562]
        ];
        const outTangents: [number, number][] = [
            [3.24551391601562, 1.87379455566406],
            [-1.87379455566406, 3.24551391601562],
            [-3.24551391601562, -1.87379455566406],
            [1.87379455566406, -3.24551391601562]
        ];

        createPathGrp(
            contents,
            'Wheel_03',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [22.8232, 11.5514]
        );
    };

    const createWheel04 = () => {
        const vertices: [number, number][] = [
            [3.392822265625, -5.87652587890625],
            [-5.87652587890625, -3.392822265625],
            [-3.392822265625, 5.87652587890625],
            [5.87652587890625, 3.392822265625]
        ];
        const inTangents: [number, number][] = [
            [3.24551391601562, 1.87379455566406],
            [1.87379455566406, -3.24551391601562],
            [-3.24551391601562, -1.87379455566406],
            [-1.87379455566406, 3.24551391601562]
        ];
        const outTangents: [number, number][] = [
            [-3.24551391601562, -1.87379455566406],
            [-1.87379455566406, 3.24551391601562],
            [3.24551391601562, 1.87379455566406],
            [1.87379455566406, -3.24551391601562]
        ];

        createPathGrp(
            contents,
            'Wheel_04',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-22.8232, -14.8026]
        );
    };

    const createWheel05 = () => {
        const vertices: [number, number][] = [
            [-3.392822265625, -5.87652587890625],
            [-5.87652587890625, 3.392822265625],
            [3.392822265625, 5.87652587890625],
            [5.87652587890625, -3.392822265625]
        ];
        const inTangents: [number, number][] = [
            [3.24551391601562, -1.87379455566406],
            [-1.87379455566406, -3.24551391601562],
            [-3.24551391601562, 1.87379455566406],
            [1.87379455566406, 3.24551391601562]
        ];
        const outTangents: [number, number][] = [
            [-3.24551391601562, 1.87379455566406],
            [1.87379455566406, 3.24551391601562],
            [3.24551391601562, -1.87379455566406],
            [-1.87379455566406, -3.24551391601562]
        ];

        createPathGrp(
            contents,
            'Wheel_05',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-22.8232, 11.5514]
        );
    };

    const createWheel06 = () => {
        const vertices: [number, number][] = [
            [6.78562927246094, 0],
            [0, 6.78562927246094],
            [-6.78562927246094, 0],
            [0, -6.78562927246094]
        ];
        const inTangents: [number, number][] = [
            [0, -3.74760437011719],
            [3.74760437011719, 0],
            [0, 3.74760437011719],
            [-3.74760437011719, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 3.74760437011719],
            [-3.74760437011719, 0],
            [0, -3.74760437011719],
            [3.74760437011719, 0]
        ];

        createPathGrp(
            contents,
            'Wheel_06',
            true,
            false,
            getColorsFromMitug(mitug).bg,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [0, 24.7284]
        );
    };

    createWheel06();
    createWheel05();
    createWheel04();
    createWheel03();
    createWheel02();
    createWheel01();
    createLittleCircle();
    createBigCircle();
    createLPole();
    createRPole();
    createIconCircle();

    setLayerTransform(iconLayer, iconPos, iconAnchor, iconScale);

    return iconLayer;
};

const createAmusementParkLocation = (lang: Lingo, mitug: Mitug): void => {
    const args: LocationArgs[] = [
        {
            lang: 'Hebrew',
            text: 'פארק משחקים',
            fontSize: 77.3332,
            tracking: -20,
            textPos: [913.0949, 543.7325],
            textAnchor: [getOS() === 'Win' ? 134.5445 : -134.5445, -15.5761],
            bgSize: [422, 110],
            iconPos: [1108.25, 541.0954],
            iconAnchor: [0, -0.4046],
            iconScale: 100,
            iconId: 'Amusement Park'
        },
        {
            lang: 'English',
            text: 'Amusement Park',
            fontSize: 74.9495,
            tracking: -20,
            leading: 50,
            textPos: [1009.3293, 542.8844],
            textAnchor: [getOS() === 'Win' ? 220.9511 : -220.9511, -26.682],
            bgSize: [570, 106],
            iconPos: [735.1875, 541.0329],
            iconAnchor: [0, -0.4046],
            iconScale: 100,
            iconId: 'Amusement Park'
        },
        {
            lang: 'Arabic',
            text: 'ملعب',
            fontSize: 64.1684,
            tracking: -19,
            textPos: [918.1465, 541.375],
            textAnchor: [getOS() === 'Win' ? 81.5578 : -81.5578, -16.3554],
            bgSize: [282, 91],
            iconPos: [1048.7811, 541.2777],
            iconAnchor: [0, -0.4046],
            iconScale: 83,
            iconId: 'Amusement Park'
        }
    ];
    createLocation(args, lang, mitug);
};

const createHotelIcon: CreateLocationIconFn = (
    iconPos,
    iconAnchor,
    iconScale,
    name,
    mitug
) => {
    const iconLayer = createIconBase(name);

    const contents = iconLayer.property('Contents') as PropertyGroup;

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
            getColorsFromMitug(mitug).pri,
            [0, 0, 0],
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [0, 0]
        );
    };

    const createSide = () => {
        const vertices: [number, number][] = [
            [0, -20.0343933105469],
            [0, 20.0343933105469]
        ];
        const inTangents: [number, number][] = [
            [0, 0],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Side',
            false,
            true,
            [0, 0, 0],
            getColorsFromMitug(mitug).bg,
            3,
            vertices,
            inTangents,
            outTangents,
            false,
            [-26.9079, 0]
        );
    };

    const createBed = () => {
        const vertices: [number, number][] = [
            [28.9371948242188, 6.33441162109375],
            [28.9371948242188, -6.33441162109375],
            [-28.9371948242188, -6.33441162109375]
        ];
        const inTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Bed',
            false,
            true,
            [0, 0, 0],
            getColorsFromMitug(mitug).bg,
            3,
            vertices,
            inTangents,
            outTangents,
            false,
            [2.0293, 13.7]
        );
    };

    const createBody = () => {
        const vertices: [number, number][] = [
            [16.4273681640625, 8.02848815917969],
            [16.4273681640625, 8.02847290039062],
            [0.37040710449219, -8.02848815917969],
            [-16.4273681640625, -8.02848815917969],
            [-16.4273681640625, 8.02848815917969]
        ];
        const inTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [8.86801147460938, 0],
            [0, 0],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [0, -8.86801147460938],
            [0, 0],
            [0, 0],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Body',
            false,
            true,
            [0, 0, 0],
            getColorsFromMitug(mitug).bg,
            3,
            vertices,
            inTangents,
            outTangents,
            false,
            [14.5391, -3.1672]
        );
    };

    const createHead = () => {
        const vertices: [number, number][] = [
            [5.22111511230469, 0],
            [0, -5.22111511230469],
            [-5.22111511230469, 0],
            [0, 5.22111511230469]
        ];
        const inTangents: [number, number][] = [
            [0, 2.883544921875],
            [2.883544921875, 0],
            [0, -2.883544921875],
            [-2.883544921875, 0]
        ];
        const outTangents: [number, number][] = [
            [0, -2.883544921875],
            [-2.883544921875, 0],
            [0, 2.883544921875],
            [2.883544921875, 0]
        ];

        createPathGrp(
            contents,
            'Head',
            false,
            true,
            [0, 0, 0],
            getColorsFromMitug(mitug).bg,
            3,
            vertices,
            inTangents,
            outTangents,
            true,
            [-14.6074, -5.9745]
        );
    };

    createHead();
    createBody();
    createBed();
    createSide();
    createIconCircle();

    setLayerTransform(iconLayer, iconPos, iconAnchor, iconScale);

    return iconLayer;
};

const createHotelLocation = (lang: Lingo, mitug: Mitug): void => {
    const args: LocationArgs[] = [
        {
            lang: 'Hebrew',
            text: 'בית מלון',
            fontSize: 77.3332,
            tracking: -20,
            textPos: [906.8351, 540.2278],
            textAnchor: [getOS() === 'Win' ? 74.2847 : -74.2847, -19.0808],
            bgSize: [286, 110],
            iconPos: [1040.25, 539],
            iconAnchor: [0, 0],
            iconScale: 100,
            iconId: 'Hotel'
        },
        {
            lang: 'English',
            text: 'Hotel',
            fontSize: 74.9495,
            tracking: -20,
            leading: 50,
            textPos: [1007.8199, 537.8844],
            textAnchor: [getOS() === 'Win' ? 67.9417 : -67.9417, -26.682],
            bgSize: [262, 106],
            iconPos: [888.4375, 538.6875],
            iconAnchor: [0, 0],
            iconScale: 100,
            iconId: 'Hotel'
        },
        {
            lang: 'Arabic',
            text: 'فندق',
            fontSize: 64.1684,
            tracking: -19,
            textPos: [915.716, 541.6739],
            textAnchor: [getOS() === 'Win' ? 82.1273 : -82.1273, -15.5565],
            bgSize: [282, 91],
            iconPos: [1048.7811, 540.0277],
            iconAnchor: [0, 0],
            iconScale: 83,
            iconId: 'Hotel'
        }
    ];
    createLocation(args, lang, mitug);
};

// ====================================

const createLocationFromId = (
    id: LocationID,
    lang: Lingo,
    mitug: Mitug
): void => {
    app.beginUndoGroup(`@@name: Create Location - ${id}`);

    const comp = app.project.activeItem as CompItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert('No Composition Selected');
        return;
    }

    switch (id) {
        case 'Kindergarden':
            createKindergardenLocation(lang, mitug);
            break;
        case 'Medical Clinic':
            createMedicalLocation(lang, mitug);
            break;
        case 'Sports':
            createSportsLocation(lang, mitug);
            break;
        case 'University':
            createUniversityLocation(lang, mitug);
            break;
        case 'Mosque':
            createMosqueLocation(lang, mitug);
            break;
        case 'U.N. Building':
            createUNBuildingLocation(lang, mitug);
            break;
        case 'Diplomatic Building':
            createDiplomaticBuildingLocation(lang, mitug);
            break;
        case 'Gas Station':
            createGasStationLocation(lang, mitug);
            break;
        case 'Government Building':
            createGovernmentBuildingLocation(lang, mitug);
            break;
        case 'Factory':
            alert('...');
            break;
        case 'Pumping Station':
            createPumpingStationLocation(lang, mitug);
            break;
        case 'Police':
            createPoliceLocation(lang, mitug);
            break;
        case 'Water Facility':
            createWaterFacilityLocation(lang, mitug);
            break;
        case 'Residential Neighborhood':
            createResidentialNeighborhoodLocation(lang, mitug);
            break;
        case 'Amusement Park':
            createAmusementParkLocation(lang, mitug);
            break;
        case 'Hotel':
            createHotelLocation(lang, mitug);
            break;
    }

    app.endUndoGroup();
};
