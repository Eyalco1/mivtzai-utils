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
) => {
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
