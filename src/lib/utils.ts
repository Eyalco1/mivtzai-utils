const getAssetsPathFromOS = (os: OS = getOS()) => {
    if (os === 'Win') {
        return `${File(
            '.'
        )}/Scripts/ScriptUI Panels/MivtzaiUtils_v${VERSION.toString()} Assets`;
    } else if (os === 'Mac') {
        return `/Applications/Adobe After Effects 20${app.version.substring(
            0,
            2
        )}/Scripts/ScriptUI Panels`;
    }
};

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
    const shapeLayer = comp.layers.addShape();
    shapeLayer.name = name;
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

    fillOpacity.setValueAtTime(0, 0);
    fillOpacity.setValueAtTime((1 / 24) * 14, 50);

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
    trimPathsEnd.setValueAtTime(0, 0);
    trimPathsEnd.setValueAtTime((1 / 24) * 30, 100);

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

const getOS = (): OS => {
    if ($.os.indexOf('Win') != -1) return 'Win';
    return 'Mac';
};

const openFs = (path: string): void => {
    const folder = Folder(path);
    const cmd =
        getOS() === 'Win'
            ? 'explorer ' + Folder.decode(folder.fsName)
            : // @ts-ignore
              'open "' + Folder.execute(folder.fsName) + '"';
    system.callSystem(cmd);
};

const createIconCircle = (
    contents: PropertyGroup,
    circleColorRgb: [number, number, number]
) => {
    const vertices: [number, number][] = [
        [180, 0],
        [0, 180],
        [-180, 0],
        [0, -180]
    ];
    const inTangents: [number, number][] = [
        [0, -100],
        [100, 0],
        [0, 100],
        [-100, 0]
    ];
    const outTangents: [number, number][] = [
        [0, 100],
        [-100, 0],
        [0, -100],
        [100, 0]
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

const getLanguageFromKeyboard = (): Lingo => {
    const keyState = ScriptUI.environment.keyboardState;
    if (keyState.ctrlKey) {
        return 'English';
    } else if (keyState.shiftKey) {
        return 'Arabic';
    } else {
        return 'Hebrew';
    }
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

const createFolder = (folderObj: Folder): Folder => {
    if (!folderObj.exists) folderObj.create();
    return folderObj;
};

const readPrefs = (): string => {
    const appDataFolder = File(Folder.appData.toString()).toString();
    const file = File(appDataFolder + '/Mivtzai/Prefs/Prefs.json');
    file.open('r');
    const stringData: string = file.read();
    file.close();

    return stringData;
};

const parsePrefs = (): Prefs => {
    const stringData = readPrefs();
    const parsedData = JSON.parse(stringData);
    return parsedData;
};

const setUpPrefs = (): void => {
    const appDataFolder = File(Folder.appData.toString()).toString();
    createFolder(Folder(appDataFolder + '/Mivtzai'));
    createFolder(Folder(appDataFolder + '/Mivtzai/Prefs'));
    const myJSON = File(appDataFolder + '/Mivtzai/Prefs/Prefs.json');
    if (myJSON.exists) {
        const parsedPrefs = parsePrefs();
        parsedPrefs.version = VERSION;
        myJSON.open('w');
        myJSON.write(JSON.stringify(parsedPrefs, null, 2));
        myJSON.close();
    } else {
        myJSON.open('w');
        myJSON.write(JSON.stringify({ version: VERSION }, null, 2));
        myJSON.close();
    }
};

const writePrefsToMemory = (prefs: Prefs) => {
    const appDataFolder = File(Folder.appData.toString()).toString();
    createFolder(Folder(appDataFolder + '/Mivtzai'));
    createFolder(Folder(appDataFolder + '/Mivtzai/Prefs'));
    const myJSON = File(appDataFolder + '/Mivtzai/Prefs/Prefs.json');
    myJSON.open('w');
    myJSON.write(JSON.stringify(prefs, null, 2));
    myJSON.close();
    return myJSON;
};

const importGoogleMaps = (location: GoogleMapsLocation): void => {
    const keyState = ScriptUI.environment.keyboardState;
    let whichMap = 'Clean';
    if (keyState.ctrlKey) {
        whichMap = 'Guide';
    }

    const mapItem = app.project.importFile(
        new ImportOptions(
            File(
                `${getAssetsPathFromOS()}/Images/${location}_Map_${whichMap}.png`
            )
        )
    ) as AVItem;

    const comp = app.project.activeItem as CompItem;
    const mapLayer = comp.layers.add(mapItem);

    // Fit To Comp Height
    mapLayer.selected = true;
    app.executeCommand(2732);
};

const createHelpWindow = () => {
    const helpWin = new Window('dialog', 'Help & Info');
    if (helpWin == null) {
        helpWin;
    }

    const tpanel = helpWin.add('tabbedpanel');

    // === About ===
    const aboutTab = tpanel.add('tab', undefined, ['About']);
    aboutTab.add('edittext', [0, 0, 380, 300], '', {
        multiline: true,
        readonly: true,
        scrollable: true
    });

    // === Settings ===
    const settingsTab = tpanel.add('tab', undefined, ['Settings']);
    settingsTab.orientation = 'row';

    // === Reviews ===
    const reviewsTab = tpanel.add('tab', undefined, ['Reviews']);
    reviewsTab.add('edittext', [0, 0, 380, 300], '', {
        multiline: true,
        readonly: true,
        scrollable: true
    });

    // === Ok Button ===
    const okBtn = helpWin.add('button', undefined, 'Ok', { name: 'Ok' });

    // === Initilaztion ===
    helpWin.layout.layout(true);

    if (helpWin != null && helpWin instanceof Window) {
        helpWin.center();
        helpWin.show();
    }
};

const generateCaspiQuote = () => {
    const quotes = ['1', '2', '3', '4'];
    const theQuote = quotes[Math.floor(Math.random() * quotes.length)];
    alert(theQuote, 'Caspi Says:');
};

const scaleWithOvershoot = (
    layers: Layer[] = (<CompItem>app.project.activeItem).selectedLayers
): void => {
    const comp = app.project.activeItem as CompItem;
    // const selectedLayers = comp.selectedLayers;
    if (layers.length === 0) return;

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
        scaleProp.setValueAtTime(comp.time + (1 / 24) * 10, [
            origVal[0] + 5,
            origVal[1] + 5
        ]);
        scaleProp.setValueAtTime(comp.time + (1 / 24) * 14, origVal);

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
