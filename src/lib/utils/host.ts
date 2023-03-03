const createPathGrp = (
    contents: PropertyGroup,
    name: string,
    hasFill: boolean,
    hasStroke: boolean,
    fillColor: [number, number, number],
    strokeColor: [number, number, number],
    strokeSize: number,
    vertices: [number, number][],
    inTangents: [number, number][],
    outTangents: [number, number][],
    pathClosed: boolean,
    position: [number, number]
): void => {
    const grp = contents.addProperty('ADBE Vector Group');
    grp.name = name;

    const grpContents = contents
        .property(name)
        .property('Contents') as PropertyGroup;

    const pathGrp = grpContents.addProperty('ADBE Vector Shape - Group');
    const pathProp = pathGrp.property('ADBE Vector Shape') as Property<Shape>;

    const pathShape = new Shape();
    pathShape.vertices = vertices;
    pathShape.inTangents = inTangents;
    pathShape.outTangents = outTangents;
    pathShape.closed = pathClosed;

    pathProp.setValue(pathShape);

    if (hasStroke) {
        const strokeGrp = grpContents.addProperty(
            'ADBE Vector Graphic - Stroke'
        );
        const colorProp = strokeGrp.property(
            'ADBE Vector Stroke Color'
        ) as Property<[number, number, number]>;
        const mappedColor = strokeColor.map(c => c / 255) as [
            number,
            number,
            number
        ];
        colorProp.setValue(mappedColor);
        const strokeSizeProp = strokeGrp.property(
            'ADBE Vector Stroke Width'
        ) as Property<number>;
        strokeSizeProp.setValue(strokeSize);
    }

    if (hasFill) {
        const fillGrp = grpContents.addProperty('ADBE Vector Graphic - Fill');
        const colorProp = fillGrp.property(
            'ADBE Vector Fill Color'
        ) as Property<[number, number, number]>;
        const mappedColor = fillColor.map(c => c / 255) as [
            number,
            number,
            number
        ];
        colorProp.setValue(mappedColor);
    }

    const positionProp = grp
        .property('ADBE Vector Transform Group')
        .property('ADBE Vector Position') as Property<[number, number]>;

    positionProp.setValue(position);
};

const createAnimatedMap = (
    name: string,
    vertices: [number, number][],
    inTangents: [number, number][],
    outTangents: [number, number][]
): void => {
    const comp = app.project.activeItem as CompItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert('No Composition Selected');
        return;
    }

    const shapeLayer = comp.layers.addShape();
    shapeLayer.name = name;
    shapeLayer.inPoint = comp.time;
    const contents = shapeLayer.property('Contents') as PropertyGroup;

    createPathGrp(
        contents,
        `${name}_Stroke`,
        false,
        true,
        [0, 0, 0],
        [255, 255, 255],
        10,
        vertices,
        inTangents,
        outTangents,
        true,
        [0, 0]
    );

    createPathGrp(
        contents,
        `${name}_Fill`,
        true,
        false,
        [202, 5, 5],
        [0, 0, 0],
        0,
        vertices,
        inTangents,
        outTangents,
        true,
        [0, 0]
    );

    const fillOpacity = contents
        .property(`${name}_Fill`)
        .property('ADBE Vectors Group')
        .property('ADBE Vector Graphic - Fill')
        .property('ADBE Vector Fill Opacity') as Property<number>;

    fillOpacity.setValueAtTime(shapeLayer.inPoint, 0);
    fillOpacity.setValueAtTime((1 / comp.frameRate) * 14 + shapeLayer.inPoint, 50);

    fillOpacity.setTemporalEaseAtKey(
        1,
        [new KeyframeEase(0.5, 33)],
        [new KeyframeEase(0.5, 33)]
    );
    fillOpacity.setTemporalEaseAtKey(
        2,
        [new KeyframeEase(0.5, 33)],
        [new KeyframeEase(0.5, 33)]
    );

    const myStroke = contents
        .property(`${name}_Stroke`)
        .property('ADBE Vectors Group')
        .property('ADBE Vector Graphic - Stroke') as Property<number>;
    const dashesProp = myStroke.property(
        'ADBE Vector Stroke Dashes'
    ) as PropertyGroup;
    const dashOne = dashesProp.addProperty(
        'ADBE Vector Stroke Dash 1'
    ) as Property<number>;
    dashOne.setValue(60);
    const gapOne = dashesProp.addProperty(
        'ADBE Vector Stroke Gap 1'
    ) as Property<number>;
    gapOne.setValue(25);
    const dashOffset = dashesProp.addProperty(
        'ADBE Vector Stroke Offset'
    ) as Property<number>;
    dashOffset.expression = 'time * -50';

    const lineCapProp = myStroke.property(
        'ADBE Vector Stroke Line Cap'
    ) as Property<number>;
    lineCapProp.setValue(2);

    const lineJoinProp = myStroke.property(
        'ADBE Vector Stroke Line Join'
    ) as Property<number>;
    lineJoinProp.setValue(2);

    const parentGrp = contents
        .property(`${name}_Stroke`)
        .property('ADBE Vectors Group') as PropertyGroup;
    const trimPathsGrp = parentGrp.addProperty('ADBE Vector Filter - Trim');
    const trimPathsEnd = trimPathsGrp.property(
        'ADBE Vector Trim End'
    ) as Property<number>;
    trimPathsEnd.setValueAtTime(shapeLayer.inPoint, 0);
    trimPathsEnd.setValueAtTime((1 / comp.frameRate) * 30 + shapeLayer.inPoint, 100);

    trimPathsEnd.setTemporalEaseAtKey(
        1,
        [new KeyframeEase(0.5, 33)],
        [new KeyframeEase(0.5, 33)]
    );
    trimPathsEnd.setTemporalEaseAtKey(
        2,
        [new KeyframeEase(0.5, 66)],
        [new KeyframeEase(0.5, 66)]
    );
};

const createIconCircle = (
    contents: PropertyGroup,
    circleColorRgb: [number, number, number],
    size: number
) => {
    const vertices: [number, number][] = [
        [size, 0],
        [0, size],
        [-size, 0],
        [0, -size]
    ];
    const inTangents: [number, number][] = [
        [0, -(size / 1.8)],
        [size / 1.8, 0],
        [0, size / 1.8],
        [-(size / 1.8), 0]
    ];
    const outTangents: [number, number][] = [
        [0, size / 1.8],
        [-(size / 1.8), 0],
        [0, -(size / 1.8)],
        [size / 1.8, 0]
    ];

    createPathGrp(
        contents,
        'Circle',
        true,
        false,
        circleColorRgb,
        circleColorRgb,
        0,
        vertices,
        inTangents,
        outTangents,
        true,
        [0, 0]
    );
};

const getFontFromLanguage = (lang: Lingo) => {
    if (lang === 'English') {
        return 'TradeGothicLT-BoldCondTwenty';
    } else if (lang === 'Hebrew') {
        return 'NarkisBlockCondensedMF-Bold';
    } else if (lang === 'Arabic') {
        return 'DroidArabicKufi-Bold';
    }
};

const getFontFromName = (name: CaspionFont) => {
    if (name === 'Trade Gothic') {
        return 'TradeGothicLT-BoldCondTwenty';
    } else if (name === 'Narkis') {
        return 'NarkisBlockCondensedMF-Bold';
    } else if (name === 'Almoni') {
        return 'AlmoniNeueDL4.0AAA-Bold';
    } else if (name === 'Droid') {
        return 'DroidArabicKufi-Bold';
    } else if (name === 'Janna') {
        return 'JannaLT-Bold';
    }
};

const importGoogleMaps = (location: GoogleMapsLocation): void => {
    const keyState = ScriptUI.environment.keyboardState;
    const modKey = getOS() === 'Win' ? keyState.ctrlKey : keyState.metaKey;

    const whichMap = modKey ? 'Guide' : 'Clean';

    const mapItem = app.project.importFile(
        new ImportOptions(
            File(`${getAssetsPath()}/Images/${location}_Map_${whichMap}.png`)
        )
    ) as AVItem;

    const comp = app.project.activeItem as CompItem;
    if (!comp || !(comp instanceof CompItem)) return;

    const mapLayer = comp.layers.add(mapItem);

    // Fit To Comp Height
    mapLayer.selected = true;
    app.executeCommand(2732);
};

const scaleWithOvershoot = (layers: Layer[]): void => {
    const comp = app.project.activeItem as CompItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert('No Composition Selected');
        return;
    }
    if (layers.length === 0) {
        alert('No Layers Selected');
        return;
    }

    layers.forEach(sl => {
        const scaleProp = sl
            .property('ADBE Transform Group')
            .property('ADBE Scale') as Property<any>;
        const origVal = scaleProp.value;

        let beforeKeys: number = 0;
        const numKeys = scaleProp.numKeys;
        for (let i = 1; i <= numKeys; i++) {
            const keyTime = scaleProp.keyTime(i);
            if (keyTime < comp.time) beforeKeys++;
        }

        scaleProp.setValueAtTime(comp.time, [0, 0]);
        scaleProp.setValueAtTime(comp.time + (1 / comp.frameRate) * 10, [
            origVal[0] + 3,
            origVal[1] + 3
        ]);
        scaleProp.setValueAtTime(
            comp.time + (1 / comp.frameRate) * 14,
            origVal
        );

        const easeIn = new KeyframeEase(0.5, 66);
        const easeOut = new KeyframeEase(0.75, 66);
        scaleProp.setTemporalEaseAtKey(
            beforeKeys + 1,
            [easeIn, easeIn, easeIn],
            [easeOut, easeOut, easeOut]
        );
        scaleProp.setTemporalEaseAtKey(
            beforeKeys + 2,
            [easeIn, easeIn, easeIn],
            [easeOut, easeOut, easeOut]
        );
        scaleProp.setTemporalEaseAtKey(
            beforeKeys + 3,
            [easeIn, easeIn, easeIn],
            [easeOut, easeOut, easeOut]
        );
    });
};

const colorNameToRGB = (name: ColorDropdown): [number, number, number] => {
    if (name === 'White') {
        return [255, 255, 255];
    } else if (name === 'Black') {
        return [0, 0, 0];
    } else if (name === 'Red') {
        return [197, 24, 24];
    }
};

const getLabelsFromPrefs = (): string[] => {
    // @ts-ignore
    $.appEncoding = 'CP1252';

    const sectionName = 'Label Preference Color Section 5';
    const prefFile = PREFType.PREF_Type_MACHINE_INDEPENDENT;
    let keyName: string;
    let mypref: string;
    const resArray: string[] = [];

    for (var i = 1; i <= 16; i++) {
        keyName = 'Label Color ID 2 # ' + i.toString();
        mypref = app.preferences.getPrefAsString(
            sectionName,
            keyName,
            prefFile
        );

        var res = '';
        for (var j = 1; j < mypref.length; j++) {
            var charCode = mypref.charCodeAt(j);
            if (charCode > 254) {
                charCode = table1252[mypref[j]];
            }
            var newCode = charCode.toString(16).toUpperCase();
            if (newCode.toString().length === 1) {
                newCode = '0' + newCode;
            }
            res += newCode;
        }
        resArray.push(res);
    }
    return resArray;
};

const getLabelNamesFromPrefs = (): string[] => {
    const outputArray: string[] = [];
    const sectionName = 'Label Preference Text Section 7';
    const prefFile = PREFType.PREF_Type_MACHINE_INDEPENDENT;
    for (var i = 1; i <= 16; i++) {
        const keyName = 'Label Text ID 2 # ' + i.toString();
        outputArray.push(
            app.preferences.getPrefAsString(sectionName, keyName, prefFile)
        );
    }
    return outputArray;
};

const hexToRgb = (hex: string): [number, number, number] => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? [
              Math.round(parseInt(result[1], 16)) / 255,
              Math.round(parseInt(result[2], 16)) / 255,
              Math.round(parseInt(result[3], 16)) / 255
          ]
        : null;
};

const formatLayerName = (str: string): string => {
    const capitalize = (str: string) => {
        return str
            .split(' ')
            .map(function (word) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            })
            .join(' ');
    };

    str = capitalize(str).replace(/ /g, '_');

    return str;
};
