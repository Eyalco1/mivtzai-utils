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
    const strokeGrp = grpContents.addProperty('ADBE Vector Graphic - Stroke');
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
    const colorProp = fillGrp.property('ADBE Vector Fill Color') as Property<
      [number, number, number]
    >;
    const mappedColor = fillColor.map(c => c / 255) as [number, number, number];
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

const getOS = (): 'Win' | 'Mac' => {
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
  const file = File(appDataFolder + '/Mivtazi/Prefs/Prefs.json');
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

const writeEmptyPrefs = (): void => {
  const appDataFolder = File(Folder.appData.toString()).toString();
  createFolder(Folder(appDataFolder + '/Mivtazi'));
  createFolder(Folder(appDataFolder + '/Mivtazi/Prefs'));
  const myJSON = File(appDataFolder + '/Mivtazi/Prefs/Prefs.json');
  if (!myJSON.exists) {
    myJSON.open('w');
    myJSON.write(JSON.stringify({}, null, 2));
    myJSON.close();
  }
};

const writePrefsToMemory = (prefs: Prefs) => {
  const appDataFolder = File(Folder.appData.toString()).toString();
  createFolder(Folder(appDataFolder + '/Mivtazi'));
  createFolder(Folder(appDataFolder + '/Mivtazi/Prefs'));
  const myJSON = File(appDataFolder + '/Mivtazi/Prefs/Prefs.json');
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
        `${File(
          '.'
        )}/Scripts/ScriptUI Panels/MivtzaiUtils Assets/Images/${location}_Map_${whichMap}.png`
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
  aboutTab.add('edittext', [0, 0, 380, 300], 'aboutString', {
    multiline: true,
    readonly: true,
    scrollable: true
  });

  // === Settings ===
  const settingsTab = tpanel.add('tab', undefined, ['Settings']);
  settingsTab.orientation = 'row';

  // === Reviews ===
  const reviewsTab = tpanel.add('tab', undefined, ['Reviews']);
  reviewsTab.add('edittext', [0, 0, 380, 300], 'howItWorksString', {
    multiline: true,
    readonly: true,
    scrollable: true
  });

  // name?: string
  // multiline?: boolean
  // borderless?: boolean
  // scrollable?: boolean
  // readonly?: boolean
  // noecho?: boolean
  // enterKeySignalsOnChange?: boolean
  // wantReturn?: boolean

  // === Ok Button ===
  const okBtn = helpWin.add('button', undefined, 'Ok', { name: 'Ok' });

  // === Initilaztion ===
  helpWin.layout.layout(true);

  if (helpWin != null && helpWin instanceof Window) {
    helpWin.center();
    helpWin.show();
  }
};
