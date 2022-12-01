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
