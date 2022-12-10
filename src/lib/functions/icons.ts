const createExplosionIcon = (
  circleColor: ColorDropdown,
  iconColor: ColorDropdown,
  hasCircle: Boolean
): void => {
  const comp = app.project.activeItem as CompItem;
  const layer = comp.layers.addShape();
  layer.name = 'Boom';
  const contents = layer.property('Contents') as PropertyGroup;

  let circleColorRgb: [number, number, number];
  if (circleColor === 'White') {
    circleColorRgb = [255, 255, 255];
  } else if (circleColor === 'Black') {
    circleColorRgb = [0, 0, 0];
  } else if (circleColor === 'Red') {
    circleColorRgb = [197, 24, 24];
  }

  let iconColorRgb: [number, number, number];
  if (iconColor === 'White') {
    iconColorRgb = [255, 255, 255];
  } else if (iconColor === 'Black') {
    iconColorRgb = [0, 0, 0];
  } else if (iconColor === 'Red') {
    iconColorRgb = [197, 24, 24];
  }

  const createBigBoom = () => {
    const vertices: [number, number][] = [
      [-84.9202270507812, 123.637664794922],
      [-31.8689270019531, 123.637664794922],
      [-76.7900543212891, 65.0281066894531],
      [-25.8812561035156, 97.1145477294922],
      [-29.7290954589844, 70.1620330810547],
      [-15.1866760253906, 85.1338653564453],
      [-6.62950134277344, 35.5111694335938],
      [1.07125854492188, 80.4296264648438],
      [44.7087097167969, 43.2092437744141],
      [17.7535095214844, 112.089065551758],
      [33.1576995849609, 103.958892822266],
      [24.6005249023438, 124.067077636719],
      [80.6456604003906, 124.067077636719],
      [55.403564453125, 103.10221862793],
      [85.3526000976562, 92.8373107910156],
      [63.1040496826172, 75.2956848144531],
      [129.841369628906, -32.941650390625],
      [43.42529296875, 21.3906555175781],
      [46.4191284179688, -15.8297271728516],
      [20.7500152587891, 24.8114776611328],
      [28.8777770996094, -124.067077636719],
      [-9.19633483886719, 4.70571899414062],
      [-34.0090179443359, -35.9381713867188],
      [-28.4480895996094, 12.8358917236328],
      [-108.876510620117, -84.7068634033203],
      [-70.3727111816406, 45.3466644287109],
      [-129.841369628906, 61.6045837402344],
      [-76.7900543212891, 97.5415496826172]
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

    createPathGrp(
      contents,
      'Big_Boom',
      true,
      false,
      iconColorRgb,
      iconColorRgb,
      0,
      vertices,
      inTangents,
      outTangents,
      true,
      [0, 0]
    );
  };

  const createLittleBoom = () => {
    const vertices: [number, number][] = [
      [-10.4825592041016, 9.19902038574219],
      [9.19647216796875, 9.19902038574219],
      [17.3266448974609, 1.92526245117188],
      [7.48605346679688, 1.92526245117188],
      [11.7632904052734, -8.34260559082031],
      [3.20854187011719, -0.641845703125],
      [1.49571228027344, -9.19902038574219],
      [-1.92510986328125, -0.641845703125],
      [-10.4825592041016, -6.20518493652344],
      [-7.91546630859375, 2.35198974609375],
      [-17.3266448974609, 3.20867919921875]
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
      [0, 0]
    ];

    createPathGrp(
      contents,
      'Little_Boom',
      true,
      false,
      iconColorRgb,
      iconColorRgb,
      0,
      vertices,
      inTangents,
      outTangents,
      true,
      [-4.0612, 115.9381]
    );
  };

  const createCircleOne = () => {
    const vertices: [number, number][] = [
      [5.5621337890625, 0.00120544433594],
      [-0.00120544433594, 5.5621337890625],
      [-5.5621337890625, 0.00120544433594],
      [-0.00120544433594, -5.5621337890625]
    ];
    const inTangents: [number, number][] = [
      [0, -3.07241821289062],
      [3.07241821289062, 0],
      [0, 3.06973266601562],
      [-3.06973266601562, 0]
    ];
    const outTangents: [number, number][] = [
      [0, 3.06973266601562],
      [-3.06973266601562, 0],
      [0, -3.07241821289062],
      [3.07241821289062, 0]
    ];

    createPathGrp(
      contents,
      'Circle_01',
      true,
      false,
      iconColorRgb,
      iconColorRgb,
      0,
      vertices,
      inTangents,
      outTangents,
      true,
      [-124.4927, 13.475]
    );
  };

  const createCircleTwo = () => {
    const vertices: [number, number][] = [
      [5.5621337890625, 0.00120544433594],
      [-0.00120544433594, 5.5621337890625],
      [-5.5621337890625, 0.00120544433594],
      [-0.00120544433594, -5.5621337890625]
    ];
    const inTangents: [number, number][] = [
      [0, -3.07241821289062],
      [3.07241821289062, 0],
      [0, 3.06973266601562],
      [-3.06973266601562, 0]
    ];
    const outTangents: [number, number][] = [
      [0, 3.06973266601562],
      [-3.06973266601562, 0],
      [0, -3.07241821289062],
      [3.07241821289062, 0]
    ];

    createPathGrp(
      contents,
      'Circle_02',
      true,
      false,
      iconColorRgb,
      iconColorRgb,
      0,
      vertices,
      inTangents,
      outTangents,
      true,
      [80.2173, -94.1219]
    );
  };

  const createCircleThree = () => {
    const vertices: [number, number][] = [
      [5.5621337890625, 0.00120544433594],
      [-0.00120544433594, 5.5621337890625],
      [-5.5621337890625, 0.00120544433594],
      [-0.00120544433594, -5.5621337890625]
    ];
    const inTangents: [number, number][] = [
      [0, -3.07241821289062],
      [3.07241821289062, 0],
      [0, 3.06973266601562],
      [-3.06973266601562, 0]
    ];
    const outTangents: [number, number][] = [
      [0, 3.06973266601562],
      [-3.06973266601562, 0],
      [0, -3.07241821289062],
      [3.07241821289062, 0]
    ];

    createPathGrp(
      contents,
      'Circle_03',
      true,
      false,
      iconColorRgb,
      iconColorRgb,
      0,
      vertices,
      inTangents,
      outTangents,
      true,
      [94.976, 60.5347]
    );
  };

  createCircleThree();
  createCircleTwo();
  createCircleOne();
  createLittleBoom();
  createBigBoom();
  if (hasCircle) createIconCircle(contents, circleColorRgb);
};

const createTunnelIcon = (
  circleColor: ColorDropdown,
  iconColor: ColorDropdown,
  hasCircle: Boolean
): void => {
  const comp = app.project.activeItem as CompItem;
  const layer = comp.layers.addShape();
  layer.name = 'Tunnel';
  const contents = layer.property('Contents') as PropertyGroup;

  let circleColorRgb: [number, number, number];
  if (circleColor === 'White') {
    circleColorRgb = [255, 255, 255];
  } else if (circleColor === 'Black') {
    circleColorRgb = [0, 0, 0];
  } else if (circleColor === 'Red') {
    circleColorRgb = [197, 24, 24];
  }

  let iconColorRgb: [number, number, number];
  if (iconColor === 'White') {
    iconColorRgb = [255, 255, 255];
  } else if (iconColor === 'Black') {
    iconColorRgb = [0, 0, 0];
  } else if (iconColor === 'Red') {
    iconColorRgb = [197, 24, 24];
  }

  const createInside = () => {
    const vertices: [number, number][] = [
      [0, -75.4871215820312],
      [-75.4871215820312, -0.01185607910156],
      [-75.4871215820312, 75.4871215820312],
      [-18.8729705810547, 18.8729705810547],
      [-18.8729705810547, 0],
      [0, -18.8729705810547],
      [18.8705902099609, 0],
      [18.8705902099609, 18.8729705810547],
      [75.4871215820312, 75.4871215820312],
      [75.4871215820312, -0.01185607910156]
    ];

    const inTangents: [number, number][] = [
      [41.6728515625, 0],
      [0, -41.6681213378906],
      [0, 0],
      [0, 0],
      [0, 0],
      [-10.4211730957031, 0],
      [0, -10.4211883544922],
      [0, 0],
      [0, 0],
      [0, 0]
    ];
    const outTangents: [number, number][] = [
      [-41.6704864501953, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, -10.4188079833984],
      [10.4188079833984, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, -41.6704864501953]
    ];

    createPathGrp(
      contents,
      'Tunnel_Inside',
      true,
      false,
      iconColorRgb,
      iconColorRgb,
      0,
      vertices,
      inTangents,
      outTangents,
      true,
      [0, 0]
    );
  };

  const createBorder = () => {
    const vertices: [number, number][] = [
      [0.00009155273438, -91.1960754394531],
      [-0.00009155273438, -91.1960754394531],
      [-91.1960754394531, -0.00009155273438],
      [-91.1960754394531, 91.1960754394531],
      [91.1960754394531, 91.1960754394531],
      [91.1960754394531, -0.00009155273438]
    ];

    const inTangents: [number, number][] = [
      [50.3661499023438, 0],
      [0, 0],
      [0, -50.3661499023438],
      [0, 0],
      [0, 0],
      [0, 0]
    ];
    const outTangents: [number, number][] = [
      [0, 0],
      [-50.3661499023438, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, -50.3661499023438]
    ];

    createPathGrp(
      contents,
      'Tunnel_Border',
      false,
      true,
      iconColorRgb,
      iconColorRgb,
      6,
      vertices,
      inTangents,
      outTangents,
      true,
      [0, 0]
    );
  };

  createBorder();
  createInside();
  if (hasCircle) createIconCircle(contents, circleColorRgb);
};

// ====================================

const createIconFromId = (
  id: IconID,
  circleColor: ColorDropdown,
  iconColor: ColorDropdown,
  hasCircle: Boolean
): void => {
  switch (id) {
    case 'Boom':
      return createExplosionIcon(circleColor, iconColor, hasCircle);
    case 'Tunnel':
      return createTunnelIcon(circleColor, iconColor, hasCircle);
  }
};
