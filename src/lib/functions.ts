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

const createILMap = () => {
  // const comp = app.project.activeItem as CompItem;
  // const shapeLayer = comp.layers.addShape();
  // shapeLayer.name = 'Israel_Map';
  // const contents = shapeLayer.property('Contents') as PropertyGroup;

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

  // createPathGrp(
  //   contents,
  //   'Israel_Map_Stroke',
  //   false,
  //   true,
  //   [0, 0, 0],
  //   [255, 255, 255],
  //   10,
  //   vertices,
  //   inTangents,
  //   outTangents,
  //   true,
  //   [0, 0]
  // );

  // createPathGrp(
  //   contents,
  //   'Israel_Map_Fill',
  //   true,
  //   false,
  //   [202, 5, 5],
  //   [0, 0, 0],
  //   0,
  //   vertices,
  //   inTangents,
  //   outTangents,
  //   true,
  //   [0, 0]
  // );

  // const fillOpacity = contents
  //   .property('Israel_Map_Fill')
  //   .property('ADBE Vectors Group')
  //   .property('ADBE Vector Graphic - Fill')
  //   .property('ADBE Vector Fill Opacity') as Property<number>;

  // fillOpacity.setValueAtTime(0, 0);
  // fillOpacity.setValueAtTime((1 / 24) * 14, 50);

  // fillOpacity.setTemporalEaseAtKey(
  //   1,
  //   [new KeyframeEase(0.5, 33)],
  //   [new KeyframeEase(0.5, 33)]
  // );
  // fillOpacity.setTemporalEaseAtKey(
  //   2,
  //   [new KeyframeEase(0.5, 33)],
  //   [new KeyframeEase(0.5, 33)]
  // );

  // const myStroke = contents
  //   .property('Israel_Map_Stroke')
  //   .property('ADBE Vectors Group')
  //   .property('ADBE Vector Graphic - Stroke') as Property<number>;
  // const dashesProp = myStroke.property(
  //   'ADBE Vector Stroke Dashes'
  // ) as PropertyGroup;
  // const dashOne = dashesProp.addProperty(
  //   'ADBE Vector Stroke Dash 1'
  // ) as Property<number>;
  // dashOne.setValue(60);
  // const gapOne = dashesProp.addProperty(
  //   'ADBE Vector Stroke Gap 1'
  // ) as Property<number>;
  // gapOne.setValue(25);
  // const dashOffset = dashesProp.addProperty(
  //   'ADBE Vector Stroke Offset'
  // ) as Property<number>;
  // dashOffset.expression = 'time * -50';

  // const lineCapProp = myStroke.property(
  //   'ADBE Vector Stroke Line Cap'
  // ) as Property<number>;
  // lineCapProp.setValue(2);

  // const lineJoinProp = myStroke.property(
  //   'ADBE Vector Stroke Line Join'
  // ) as Property<number>;
  // lineJoinProp.setValue(2);

  // const parentGrp = contents
  //   .property('Israel_Map_Stroke')
  //   .property('ADBE Vectors Group') as PropertyGroup;
  // const trimPathsGrp = parentGrp.addProperty('ADBE Vector Filter - Trim');
  // const trimPathsEnd = trimPathsGrp.property(
  //   'ADBE Vector Trim End'
  // ) as Property<number>;
  // trimPathsEnd.setValueAtTime(0, 0);
  // trimPathsEnd.setValueAtTime((1 / 24) * 30, 100);

  // trimPathsEnd.setTemporalEaseAtKey(
  //   1,
  //   [new KeyframeEase(0.5, 33)],
  //   [new KeyframeEase(0.5, 33)]
  // );
  // trimPathsEnd.setTemporalEaseAtKey(
  //   2,
  //   [new KeyframeEase(0.5, 66)],
  //   [new KeyframeEase(0.5, 66)]
  // );

  createAnimatedMap('Israel_Map', vertices, inTangents, outTangents);
};
