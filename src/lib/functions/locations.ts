const createLocationBG = (
  size: [number, number],
  locationName: string,
  color: [number, number, number] = [1, 1, 1]
): ShapeLayer => {
  const comp = app.project.activeItem as CompItem;
  const layer = comp.layers.addShape();
  layer.name = `${locationName}_BG`;
  const contents = layer.property('ADBE Root Vectors Group') as PropertyGroup;
  const grp = contents.addProperty('ADBE Vector Group');
  grp.name = `${locationName}_BG`;
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

const createIconBase = (
  name: string,
  iconPos: [number, number],
  iconAnchor: [number, number],
  iconScale: number
): ShapeLayer => {
  const comp = app.project.activeItem as CompItem;
  const iconLayer = comp.layers.addShape();
  iconLayer.name = `${name} Icon`;
  const contents = iconLayer.property('Contents') as PropertyGroup;
  // const posProp = iconLayer
  //   .property('ADBE Transform Group')
  //   .property('ADBE Position') as Property<[number, number]>;

  // posProp.setValue(iconPos);

  // const anchorProp = iconLayer
  //   .property('ADBE Transform Group')
  //   .property('ADBE Anchor Point') as Property<[number, number]>;

  // anchorProp.setValue(iconAnchor);

  // const scaleProp = iconLayer
  //   .property('ADBE Transform Group')
  //   .property('ADBE Scale') as Property<[number, number]>;

  // scaleProp.setValue([iconScale, iconScale]);

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
  id: string,
  iconPos: [number, number],
  iconAnchor: [number, number],
  iconScale: number
): ShapeLayer => {
  id = id.toLowerCase();
  if (id === 'kindergarden') {
    return createKindergardenIcon(iconPos, iconAnchor, iconScale);
  }

  if (id === 'medical') {
    return createMedicalIcon(iconPos, iconAnchor, iconScale);
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
    iconAnchor,
    iconPos,
    iconScale,
    iconId
  } = argsArr.find(args => args.lang === inputLang);

  const bgLayer = createLocationBG(bgSize, 'Kindergarden');
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
  iconScale: number
): ShapeLayer => {
  const iconLayer = createIconBase(
    'Kindergarden',
    iconPos,
    iconAnchor,
    iconScale
  );

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
      iconId: 'kindergarden'
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
      iconId: 'kindergarden'
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
      iconId: 'kindergarden'
    }
  ];
  createLocation(lang, args);
};

const createMedicalIcon = (
  iconPos: [number, number],
  iconAnchor: [number, number],
  iconScale: number
): ShapeLayer => {
  const iconLayer = createIconBase(
    'Kindergarden',
    iconPos,
    iconAnchor,
    iconScale
  );

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
      iconId: 'medical'
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
      iconId: 'medical'
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
      iconId: 'medical'
    }
  ];
  createLocation(lang, args);
};

// ====================================

const createLocationFromId = (id: LocationID, lang: Lingo): void => {
  switch (id) {
    case 'Kindergarden':
      return createKindergardenLocation(lang);
    case 'Medical Clinic':
      return createKindergardenLocation(lang);
  }
};
