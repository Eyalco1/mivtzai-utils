const createTvaiStroke = (): void => {
  const comp = app.project.activeItem as CompItem;
  const layer = comp.layers.addShape();

  const contents = layer.property('ADBE Root Vectors Group') as PropertyGroup;
  const shapeGrp = contents.addProperty('ADBE Vector Group');
  shapeGrp.name = 'Shape 1';

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
  sliderVal.setValue(50);

  layer
    .property('ADBE Root Vectors Group')
    .property('ADBE Vector Group')
    .property('ADBE Vectors Group')
    .property('ADBE Vector Shape - Group').selected = true;
};

const scaleWithOvershoot = (): void => {
  const comp = app.project.activeItem as CompItem;
  const selectedLayers = comp.selectedLayers;
  if (selectedLayers.length === 0) return;

  selectedLayers.forEach(sl => {
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

const importLogos = (): void => {
  const idfItem = app.project.importFile(
    new ImportOptions(
      File('C:/Users/eyalc/DevProjects/mivtzai-utils/src/assets/IDF_Logo.png')
    )
  ) as AVItem;
  const dotzItem = app.project.importFile(
    new ImportOptions(
      File('C:/Users/eyalc/DevProjects/mivtzai-utils/src/assets/Dotz_Logo.png')
    )
  ) as AVItem;

  const comp = app.project.activeItem as CompItem;
  const idfLayer = comp.layers.add(idfItem);

  const padding = 200;

  const idfScale = idfLayer
    .property('ADBE Transform Group')
    .property('ADBE Scale') as Property<any>;
  idfScale.setValue([4, 4]);
  const idfPos = idfLayer
    .property('ADBE Transform Group')
    .property('ADBE Position') as Property<any>;
  idfPos.setValue([comp.width - padding, 0 + padding]);

  const dotzLayer = comp.layers.add(dotzItem);
  const dotzScale = dotzLayer
    .property('ADBE Transform Group')
    .property('ADBE Scale') as Property<any>;
  dotzScale.setValue([67, 67]);
  const dotzPos = dotzLayer
    .property('ADBE Transform Group')
    .property('ADBE Position') as Property<any>;
  dotzPos.setValue([0 + padding, 0 + padding]);
};

const createIllustrationText = (): void => {
  const comp = app.project.activeItem as CompItem;
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
};

const formatLayerName = (): void => {
  const comp = app.project.activeItem as CompItem;

  const selLayers = comp.selectedLayers;
  if (selLayers.length === 0) return;

  for (let i = 0; i < selLayers.length; i++) {
    const cur = selLayers[i];
    const name = cur.name;

    const capitalize = (str: string) => {
      return str
        .split(' ')
        .map(function (word) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
    };

    cur.name = capitalize(name).replace(/ /g, '_');
    if (cur instanceof AVLayer) {
      cur.source.name = cur.name;
    }
  }
};

const textReverse = (): void => {
  const comp = app.project.activeItem as CompItem;
  const selLayers = comp.selectedLayers;

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
};

const createBg = (): void => {
  const comp = app.project.activeItem as CompItem;
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

  const gradType = gFill.property('ADBE Vector Grad Type') as Property<number>;
  gradType.setValue(2);

  const endPoint = gFill.property('ADBE Vector Grad End Pt') as Property<
    [number, number]
  >;
  endPoint.setValue([comp.width / 2, 0]);

  // const colors = gFill.property('ADBE Vector Grad Colors') as Property<any>;
  // colors.setValue([
  //   [255, 0, 0],
  //   [0, 0, 255]
  // ]);

  const fx = layer.property('ADBE Effect Parade') as PropertyGroup;
  const tint = fx.addProperty('ADBE Tint');
  const tintBlack = tint.property('ADBE Tint-0001') as Property<any>;
  const tintWhite = tint.property('ADBE Tint-0002') as Property<any>;

  tintWhite.setValue([118 / 255, 15 / 255, 15 / 255]);
  tintBlack.setValue([25 / 255, 0, 0]);
};

const createIsraelMap = (): void => {
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
};

const createGazaMap = (): void => {
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
};

const createCountingText = (): void => {
  const comp = app.project.activeItem as CompItem;
  const layer = comp.layers.addText();
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

  numValProp.setValueAtTime(0, 0);
  numValProp.setValueAtTime((1 / 24) * 40, 99);

  numValProp.setTemporalEaseAtKey(1, [new KeyframeEase(0.5, 20)]);
  numValProp.setTemporalEaseAtKey(2, [new KeyframeEase(0.5, 75)]);
};