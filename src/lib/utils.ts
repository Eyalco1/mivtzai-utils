const createTvaiStroke = () => {
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

const scaleWithOvershoot = () => {
  const comp = app.project.activeItem as CompItem;
  const selectedLayers = comp.selectedLayers;
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
