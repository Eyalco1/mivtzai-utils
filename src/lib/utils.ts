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
