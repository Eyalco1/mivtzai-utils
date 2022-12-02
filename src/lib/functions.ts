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

    var easeIn = new KeyframeEase(0.5, 66);
    var easeOut = new KeyframeEase(0.75, 66);
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

const createILMap = () => {
  const comp = app.project.activeItem as CompItem;

  comp.openInViewer();

  const shapeLayer = comp.layers.addShape();
  shapeLayer.name = 'Israel_Map';
  const contents = shapeLayer.property('Contents') as PropertyGroup;

  createPathGrp(
    contents,
    'Israel_Map',
    true,
    true,
    [202, 5, 5],
    [255, 255, 255],
    10,
    [
      [188.375, -531.375],
      [179.625, -526.75],
      [176.25, -529.875],
      [173.5, -524.375],
      [161.875, -515],
      [153.125, -514.5],
      [150.5, -508.375],
      [140.625, -513.75],
      [135.625, -509],
      [131.875, -477.625],
      [126.5, -470.625],
      [125.75, -463.25],
      [112.625, -464.5],
      [109.5, -457.625],
      [98.375, -457],
      [91.5, -455.625],
      [84.5, -467.625],
      [76.5, -469.375],
      [66.2499847412109, -465.125],
      [58.4999847412109, -466.25],
      [54.75, -462.25],
      [51.625, -465.5],
      [47.25, -462.5],
      [33.7499847412109, -465.25],
      [33.7499847412109, -438.75],
      [31.5, -416.25],
      [31.2500152587891, -391],
      [18.25, -385.5],
      [0.5, -393.5],
      [-174, 22.0001831054688],
      [-107.5, 199.5],
      [-105, 237.5],
      [-94, 248.5],
      [-99, 270],
      [-81.9999847412109, 281.5],
      [-25.5000152587891, 450],
      [-22.0000152587891, 471.5],
      [-18.4999847412109, 487],
      [-21.75, 498.25],
      [-12.9999694824219, 523.25],
      [16.2499542236328, 474.75],
      [13.2500610351562, 468.5],
      [26.2499694824219, 422.000061035156],
      [29.5, 404],
      [29.5, 393.75],
      [37.2500457763672, 384.25],
      [34.9999847412109, 378],
      [41, 367.000061035156],
      [45, 365.5],
      [47.3749542236328, 345.625],
      [44.5000152587891, 338.375],
      [45.9999389648438, 327.75],
      [44.7500152587891, 304.874938964844],
      [55.3749694824219, 288.5],
      [49.2499237060547, 273.5],
      [48.625, 261.375],
      [55.7499847412109, 246.125],
      [57.875, 225.625],
      [73.2499389648438, 199.5],
      [78.875, 180.125061035156],
      [79.6250152587891, 174.25],
      [83.75, 173.5],
      [83.875, 167.125],
      [90, 164.375],
      [89.75, 158.125],
      [88.25, 149.75],
      [93.125, 137.375],
      [97.375, 129.25],
      [103.375, 129.375],
      [108.375, 123.125],
      [109.875, 97.75],
      [116.75, 66.25],
      [116.875, 81],
      [104.875, 46.75],
      [104.125, 38.6246948242188],
      [120.125, 2.375],
      [124, -52.5],
      [141, -98.5],
      [137, -125],
      [132.5, -149],
      [136.5, -165],
      [131.5, -173],
      [141.25, -216.000122070312],
      [139, -267],
      [141.25, -286.5],
      [140.25, -311],
      [144, -326],
      [142, -342.5],
      [159.75, -352.25],
      [178.5, -365.25],
      [193, -381.25],
      [205, -389],
      [207.25, -408.75],
      [222, -430.5],
      [212.25, -442.25],
      [204.625, -461.125],
      [205.375, -469.5],
      [202.625, -483],
      [202, -491.25],
      [196, -506.875],
      [189.125, -516],
      [194.375, -526.25]
    ],
    [
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
      [0, 0],
      [0.75, -4],
      [136.345733642578, -103.107360839844],
      [-6, -14.5],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [-3.99998474121094, -14],
      [0, 0],
      [-0.25001525878906, -5.5],
      [-0.74998474121094, -3],
      [0, 0],
      [0.70169067382812, 7.48382568359375],
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
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0.375],
      [0, 0],
      [0, 0]
    ],
    [
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
      [0, 0],
      [-10.6641082763672, 56.8752136230469],
      [20.5, 56.4998168945312],
      [6, 14.5],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [4.00004577636719, 14],
      [0.24996948242188, 5.5],
      [0.75004577636719, 3],
      [0, 0],
      [-0.37498474121094, -4],
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
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, -0.375],
      [0, 0],
      [0, 0]
    ],
    true,
    [0, 0]
  );
};
