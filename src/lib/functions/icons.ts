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

const createTerrorTunnelIcon = (
  circleColor: ColorDropdown,
  iconColor: ColorDropdown,
  hasCircle: Boolean
): void => {
  const comp = app.project.activeItem as CompItem;
  const layer = comp.layers.addShape();
  layer.name = 'Terror_Tunnel';
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
      [-33.0333709716797, 49.8754119873047],
      [-15.0133514404297, 34.6204986572266],
      [-27.6258697509766, 18.1576690673828],
      [-9.31216430664062, 29.7033386230469],
      [-10.6926116943359, 20.0048065185547],
      [-5.46522521972656, 25.3957672119141],
      [-2.38618469238281, 7.54121398925781],
      [0.3848876953125, 23.6990051269531],
      [16.0854644775391, 10.3062591552734],
      [6.16842651367188, 34.760009765625],
      [11.9305572509766, 32.1637420654297],
      [9.38737487792969, 36.8605346679688],
      [25.2387390136719, 46.2252044677734],
      [19.9361419677734, 31.8591461181641],
      [30.7105560302734, 28.1645812988281],
      [22.7068328857422, 21.8519287109375],
      [46.7179870605469, -17.0907897949219],
      [15.6266784667969, 2.45860290527344],
      [16.7025451660156, -10.9308624267578],
      [7.46315002441406, 3.68864440917969],
      [10.3955383300781, -49.8754119873047],
      [-3.307861328125, -3.54568481445312],
      [-12.2351531982422, -18.17041015625],
      [-10.2338409423828, -0.61894226074219],
      [-39.1696624755859, -35.7169799804688],
      [-25.3214721679688, 11.0775299072266],
      [-46.7179870605469, 16.9272613525391],
      [-27.6258697509766, 29.8575286865234]
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
      [4.5148, 15.2649]
    );
  };

  const createLittleBoom = () => {
    const vertices: [number, number][] = [
      [-3.77227783203125, 3.30880737304688],
      [3.31169128417969, 3.30880737304688],
      [6.23274230957031, 0.69418334960938],
      [2.69453430175781, 0.69418334960938],
      [4.23330688476562, -3.00007629394531],
      [1.15426635742188, -0.22750854492188],
      [0.53718566894531, -3.30880737304688],
      [-0.69317626953125, -0.22750854492188],
      [-3.77227783203125, -2.23257446289062],
      [-2.85247802734375, 0.84835815429688],
      [-6.23274230957031, 1.15670776367188]
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
      [2.978, 52.1255]
    );
  };

  const createCircleOne = () => {
    const vertices: [number, number][] = [
      [2.00054931640625, 0],
      [-0.0045166015625, 2.00131225585938],
      [-2.00054931640625, 0],
      [-0.0045166015625, -2.00131225585938],
      [2.00054931640625, 0]
    ];
    const inTangents: [number, number][] = [
      [0, 0],
      [1.10519409179688, 0],
      [0, 1.10557556152344],
      [-1.101806640625, 0],
      [0, -1.10519409179688]
    ];
    const outTangents: [number, number][] = [
      [0, 1.10557556152344],
      [-1.101806640625, 0],
      [0, -1.10519409179688],
      [1.10519409179688, 0],
      [0, 0]
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
      [-40.3515, 15.2593]
    );
  };

  const createCircleTwo = () => {
    const vertices: [number, number][] = [
      [1.61491394042969, 0.00094604492188],
      [0.00094604492188, 1.61491394042969],
      [-1.61491394042969, 0.00094604492188],
      [0.00094604492188, -1.61491394042969],
      [1.61491394042969, 0.00094604492188]
    ];
    const inTangents: [number, number][] = [
      [0, 0],
      [0.88671875, 0],
      [0, 0.89234924316406],
      [-0.89422607421875, 0],
      [0, -0.89422607421875]
    ];
    const outTangents: [number, number][] = [
      [0, 0.89234924316406],
      [-0.89422607421875, 0],
      [0, -0.89422607421875],
      [0.88671875, 0],
      [0, 0]
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
      [33.3021, -23.4531]
    );
  };

  const createCircleThree = () => {
    const vertices: [number, number][] = [
      [1.69389343261719, -0.00018310546875],
      [-0.00282287597656, 1.69276428222656],
      [-1.69389343261719, -0.00018310546875],
      [-0.00282287597656, -1.69276428222656],
      [1.69389343261719, -0.00018310546875]
    ];
    const inTangents: [number, number][] = [
      [0, 0],
      [0.93635559082031, 0],
      [0, 0.93296813964844],
      [-0.93070983886719, 0],
      [0, -0.93635559082031]
    ];
    const outTangents: [number, number][] = [
      [0, 0.93296813964844],
      [-0.93070983886719, 0],
      [0, -0.93635559082031],
      [0.93635559082031, 0],
      [0, 0]
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
      [38.6104, 32.1923]
    );
  };

  const createBorder = () => {
    const vertices: [number, number][] = [
      [2.404296875, -94.3845367431641],
      [-103.415161132812, 68.3920135498047],
      [-101.872634887695, 91.4246978759766],
      [-66.0935821533203, 94.3845367431641],
      [-66.0935821533203, 70.6358642578125],
      [0.896728515625, -59.9953308105469],
      [67.8851623535156, 70.6358642578125],
      [68.0152740478516, 94.3845367431641],
      [103.79997253418, 93.6354522705078],
      [103.79997253418, 64.1066131591797],
      [103.79997253418, 41.9918670654297],
      [2.404296875, -94.3845367431641]
    ];
    const inTangents: [number, number][] = [
      [0, 0],
      [-7.53553771972656, -109.9228515625],
      [0, 0],
      [0, 0],
      [0, 0],
      [-59.2505798339844, -0.10641479492188],
      [-1.52786254882812, -72.6674499511719],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [66.1306762695312, 0]
    ];
    const outTangents: [number, number][] = [
      [-66.1310577392578, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [1.52786254882812, -72.6674499511719],
      [67.3370208740234, 0.12297058105469],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [4.9156494140625, -87.4576263427734],
      [0, 0]
    ];

    createPathGrp(
      contents,
      'Border',
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

  const createInsideR = () => {
    const vertices: [number, number][] = [
      [-24.6310577392578, -21.1304931640625],
      [24.6310577392578, 21.1304931640625]
    ];
    const inTangents: [number, number][] = [
      [0, 0],
      [0, 0]
    ];
    const outTangents: [number, number][] = [
      [0, 0],
      [0, 0]
    ];

    createPathGrp(
      contents,
      'Inside_R',
      false,
      true,
      iconColorRgb,
      iconColorRgb,
      0.85,
      vertices,
      inTangents,
      outTangents,
      true,
      [43.388, 73.2559]
    );
  };

  const createInsideL = () => {
    const vertices: [number, number][] = [
      [26.6930847167969, -22.1788787841797],
      [-26.6930847167969, 22.1788787841797]
    ];
    const inTangents: [number, number][] = [
      [0, 0],
      [0, 0]
    ];
    const outTangents: [number, number][] = [
      [0, 0],
      [0, 0]
    ];

    createPathGrp(
      contents,
      'Inside_L',
      false,
      true,
      iconColorRgb,
      iconColorRgb,
      0.85,
      vertices,
      inTangents,
      outTangents,
      true,
      [-39.4005, 72.2038]
    );
  };

  createInsideL();
  createInsideR();
  createBorder();
  createCircleThree();
  createCircleTwo();
  createCircleOne();
  createLittleBoom();
  createBigBoom();
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
    case 'Terror Tunnel':
      return createTerrorTunnelIcon(circleColor, iconColor, hasCircle);
  }
};
