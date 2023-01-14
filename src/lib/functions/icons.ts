const setUpIcon = (
    name: string,
    circleColor: ColorDropdown,
    iconColor: ColorDropdown
) => {
    const comp = app.project.activeItem as CompItem;
    const layer = comp.layers.addShape();
    layer.name = name;
    layer.inPoint = comp.time;
    layer.label = parsePrefs().iconsLabelRandom
        ? Math.floor(Math.random() * 16) + 1
        : parsePrefs().iconsLabelIndex + 1;
    const contents = layer.property('Contents') as PropertyGroup;

    const circleColorRgb = colorNameToRGB(circleColor);
    const iconColorRgb = colorNameToRGB(iconColor);

    return { layer, contents, circleColorRgb, iconColorRgb };
};

const iconAftermath = (
    hasCircle: boolean,
    contents: PropertyGroup,
    circleColorRgb: [number, number, number],
    scale: boolean,
    layer: ShapeLayer,
    circleSize: number = 180
) => {
    if (hasCircle) createIconCircle(contents, circleColorRgb, circleSize);
    if (scale) scaleWithOvershoot([layer]);
};

// =======================

const createExplosionIcon = (
    circleColor: ColorDropdown,
    iconColor: ColorDropdown,
    hasCircle: boolean,
    scale: boolean
): void => {
    const { layer, contents, circleColorRgb, iconColorRgb } = setUpIcon(
        'Boom',
        circleColor,
        iconColor
    );

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
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer);
};

const createTunnelIcon = (
    circleColor: ColorDropdown,
    iconColor: ColorDropdown,
    hasCircle: boolean,
    scale: boolean
): void => {
    const { layer, contents, circleColorRgb, iconColorRgb } = setUpIcon(
        'Tunnel',
        circleColor,
        iconColor
    );

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
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer);
};

const createTerrorTunnelIcon = (
    circleColor: ColorDropdown,
    iconColor: ColorDropdown,
    hasCircle: boolean,
    scale: boolean
): void => {
    const { layer, contents, circleColorRgb, iconColorRgb } = setUpIcon(
        'Terror_Tunnel',
        circleColor,
        iconColor
    );

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
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer);
};

const createTargetIcon = (
    circleColor: ColorDropdown,
    iconColor: ColorDropdown,
    hasCircle: boolean,
    scale: boolean
): void => {
    const { layer, contents, circleColorRgb, iconColorRgb } = setUpIcon(
        'Target',
        circleColor,
        iconColor
    );

    const createLittleCircle = () => {
        const vertices: [number, number][] = [
            [31.2296600341797, 0],
            [0, 31.2296600341797],
            [-31.2296600341797, 0],
            [0, -31.2296600341797]
        ];
        const inTangents: [number, number][] = [
            [0, -17.2476654052734],
            [17.2476654052734, 0],
            [0, 17.2476654052734],
            [-17.2476654052734, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 17.2476654052734],
            [-17.2476654052734, 0],
            [0, -17.2476654052734],
            [17.2476654052734, 0]
        ];

        createPathGrp(
            contents,
            'Little_Circle',
            false,
            true,
            iconColorRgb,
            iconColorRgb,
            24,
            vertices,
            inTangents,
            outTangents,
            true,
            [2.2409, -0.9836]
        );
    };

    const createBigCircle = () => {
        const vertices: [number, number][] = [
            [84.0924072265625, 0],
            [0, 84.0924072265625],
            [-84.0924072265625, 0],
            [0, -84.0924072265625]
        ];
        const inTangents: [number, number][] = [
            [0, -46.4429473876953],
            [46.4429473876953, 0],
            [0, 46.4429473876953],
            [-46.4429473876953, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 46.4429473876953],
            [-46.4429473876953, 0],
            [0, -46.4429473876953],
            [46.4429473876953, 0]
        ];

        createPathGrp(
            contents,
            'Big_Circle',
            false,
            true,
            iconColorRgb,
            iconColorRgb,
            24,
            vertices,
            inTangents,
            outTangents,
            true,
            [2.2409, -2.9498]
        );
    };

    const createRecTop = () => {
        const vertices: [number, number][] = [
            [11.7978515625, 8.88459777832031],
            [-11.7978515625, 8.88459777832031],
            [-11.7978515625, -8.88459777832031],
            [11.7978515625, -8.88459777832031]
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
            'Rec_Top',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [0.9845, -100.2375]
        );
    };

    const createRecBottom = () => {
        const vertices: [number, number][] = [
            [11.7978515625, 8.88459777832031],
            [-11.7978515625, 8.88459777832031],
            [-11.7978515625, -8.88459777832031],
            [11.7978515625, -8.88459777832031]
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
            'Rec_Bottom',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [0.9845, 100.2375]
        );
    };

    const createRecRight = () => {
        const vertices: [number, number][] = [
            [13.4363098144531, 11.8039245605469],
            [-13.4363098144531, 11.8039245605469],
            [-13.4363098144531, -11.8039245605469],
            [13.4363098144531, -11.8039245605469]
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
            'Rec_Right',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [97.652, -1.0784]
        );
    };

    const createRecLeft = () => {
        const vertices: [number, number][] = [
            [13.4363098144531, 11.8039245605469],
            [-13.4363098144531, 11.8039245605469],
            [-13.4363098144531, -11.8039245605469],
            [13.4363098144531, -11.8039245605469]
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
            'Rec_Left',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-97.652, -1.0784]
        );
    };

    createRecLeft();
    createRecRight();
    createRecBottom();
    createRecTop();
    createBigCircle();
    createLittleCircle();
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer);
};

const createSniperTargetIcon = (
    circleColor: ColorDropdown,
    iconColor: ColorDropdown,
    hasCircle: boolean,
    scale: boolean
): void => {
    const { layer, contents, circleColorRgb, iconColorRgb } = setUpIcon(
        'Sniper_Target',
        circleColor,
        iconColor
    );

    const createOuterRing = () => {
        const vertices: [number, number][] = [
            [0, -103.27001953125],
            [-103.27001953125, -0.00001525878906],
            [0, 103.269958496094],
            [103.27001953125, -0.00001525878906]
        ];
        const inTangents: [number, number][] = [
            [57.0399780273438, 0],
            [0, -57.0400238037109],
            [-57.0399780273438, 0],
            [0, 57.0399932861328]
        ];
        const outTangents: [number, number][] = [
            [-57.0399780273438, 0],
            [0, 57.0399932861328],
            [57.0399780273438, 0],
            [0, -57.0400238037109]
        ];

        createPathGrp(
            contents,
            'Outer_Ring',
            false,
            true,
            iconColorRgb,
            iconColorRgb,
            7,
            vertices,
            inTangents,
            outTangents,
            true,
            [0, 0]
        );
    };

    const createMiddleTR = () => {
        const vertices: [number, number][] = [
            [17.1749877929688, 13.6750183105469],
            [1.82501220703125, 13.6750183105469],
            [-1.67498779296875, 17.1750183105469],
            [-13.2949829101562, 17.1750183105469],
            [-17.1749877929688, 13.2950134277344],
            [-17.1749877929688, 1.67501831054688],
            [-13.6749877929688, -1.82498168945312],
            [-13.6749877929688, -17.1750183105469]
        ];
        const inTangents: [number, number][] = [
            [-1.6300048828125, -16.280029296875],
            [0, 0],
            [0, -1.92999267578125],
            [0, 0],
            [2.1400146484375, 0],
            [0, 0],
            [0, 1.92999267578125],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [-1.92999267578125, 0],
            [0, 0],
            [0, -2.1400146484375],
            [0, 0],
            [1.92999267578125, 0],
            [0, 0],
            [16.280029296875, 1.6300048828125]
        ];

        createPathGrp(
            contents,
            'Middle_Top_Right',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [17.175, -17.175]
        );
    };

    const createMiddleBR = () => {
        const vertices: [number, number][] = [
            [17.1749877929688, -13.6749877929688],
            [-13.6749877929688, 17.1749877929688],
            [-13.6749877929688, 1.82501220703125],
            [-17.1749877929688, -1.67498779296875],
            [-17.1749877929688, -13.2949829101562],
            [-13.2949829101562, -17.1749877929688],
            [-1.67498779296875, -17.1749877929688],
            [1.82501220703125, -13.6749877929688]
        ];
        const inTangents: [number, number][] = [
            [0, 0],
            [16.280029296875, -1.6300048828125],
            [0, 0],
            [1.92999267578125, 0],
            [0, 0],
            [0, 2.1400146484375],
            [0, 0],
            [-1.92999267578125, 0]
        ];
        const outTangents: [number, number][] = [
            [-1.6300048828125, 16.2799682617188],
            [0, 0],
            [0, -1.92999267578125],
            [0, 0],
            [2.1400146484375, 0],
            [0, 0],
            [0, 1.92999267578125],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Middle_Bottom_Right',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [17.175, 17.175]
        );
    };

    const createMiddleTL = () => {
        const vertices: [number, number][] = [
            [17.1749877929688, 1.67501831054688],
            [17.1749877929688, 13.2950134277344],
            [13.2949829101562, 17.1750183105469],
            [1.67498779296875, 17.1750183105469],
            [-1.82501220703125, 13.6750183105469],
            [-17.1749877929688, 13.6750183105469],
            [13.6749877929688, -17.1750183105469],
            [13.6749877929688, -1.82498168945312]
        ];
        const inTangents: [number, number][] = [
            [-1.92999267578125, 0],
            [0, 0],
            [0, -2.1400146484375],
            [0, 0],
            [1.92999267578125, 0],
            [0, 0],
            [-16.280029296875, 1.6300048828125],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [-2.1400146484375, 0],
            [0, 0],
            [0, -1.92999267578125],
            [0, 0],
            [1.6300048828125, -16.280029296875],
            [0, 0],
            [0, 1.92999267578125]
        ];

        createPathGrp(
            contents,
            'Middle_Top_Left',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-17.175, -17.175]
        );
    };

    const createMiddleBL = () => {
        const vertices: [number, number][] = [
            [17.1749877929688, -13.2949829101562],
            [17.1749877929688, -1.67498779296875],
            [13.6749877929688, 1.82501220703125],
            [13.6749877929688, 17.1749877929688],
            [-17.1749877929688, -13.6749877929688],
            [-1.82501220703125, -13.6749877929688],
            [1.67498779296875, -17.1749877929688],
            [13.2949829101562, -17.1749877929688]
        ];
        const inTangents: [number, number][] = [
            [-2.1400146484375, 0],
            [0, 0],
            [0, -1.92999267578125],
            [0, 0],
            [1.6300048828125, 16.2799682617188],
            [0, 0],
            [0, 1.92999267578125],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [-1.92999267578125, 0],
            [0, 0],
            [-16.280029296875, -1.6300048828125],
            [0, 0],
            [1.92999267578125, 0],
            [0, 0],
            [0, 2.1400146484375]
        ];

        createPathGrp(
            contents,
            'Middle_Bottom_Left',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-17.175, 17.175]
        );
    };

    const createTopLeft = () => {
        const vertices: [number, number][] = [
            [44.114990234375, -32.4349670410156],
            [35.614990234375, -32.4349670410156],
            [44.114990234375, -44.1150207519531],
            [-44.114990234375, 44.1150207519531],
            [-32.5150146484375, 44.1150207519531],
            [-32.5150146484375, 35.6949768066406],
            [-29.0150146484375, 32.1949768066406],
            [-25.5150146484375, 35.6949768066406],
            [-25.5150146484375, 44.1150207519531],
            [-12.9849853515625, 44.1150207519531],
            [-12.9849853515625, 35.6949768066406],
            [-9.4849853515625, 32.1949768066406],
            [-5.9849853515625, 35.6949768066406],
            [-5.9849853515625, 44.1150207519531],
            [5.9649658203125, 44.1150207519531],
            [44.114990234375, 5.96499633789062],
            [44.114990234375, -5.90499877929688],
            [35.614990234375, -5.90499877929688],
            [32.114990234375, -9.40499877929688],
            [35.614990234375, -12.9049987792969],
            [44.114990234375, -12.9049987792969],
            [44.114990234375, -25.4349670410156],
            [35.614990234375, -25.4349670410156],
            [32.114990234375, -28.9349670410156]
        ];
        const inTangents: [number, number][] = [
            [-1.92999267578125, 0],
            [0, 0],
            [0, 0],
            [1.79998779296875, -47.8400268554688],
            [0, 0],
            [0, 0],
            [-1.92999267578125, 0],
            [0, -1.92999267578125],
            [0, 0],
            [0, 0],
            [0, 0],
            [-1.9300537109375, 0],
            [0, -1.92999267578125],
            [0, 0],
            [0, 0],
            [-20.260009765625, 1.67999267578125],
            [0, 0],
            [0, 0],
            [0, 1.92999267578125],
            [-1.92999267578125, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 1.92999267578125]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [-47.8400268554688, 1.800048828125],
            [0, 0],
            [0, 0],
            [0, -1.92999267578125],
            [1.94000244140625, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, -1.92999267578125],
            [1.94000244140625, 0],
            [0, 0],
            [0, 0],
            [1.6800537109375, -20.260009765625],
            [0, 0],
            [0, 0],
            [-1.92999267578125, 0],
            [0, -1.92999267578125],
            [0, 0],
            [0, 0],
            [0, 0],
            [-1.92999267578125, 0],
            [0, -1.9300537109375]
        ];

        createPathGrp(
            contents,
            'Top_Left',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-47.615, -47.615]
        );
    };

    const createTopRight = () => {
        const vertices: [number, number][] = [
            [44.114990234375, 44.1150207519531],
            [-44.114990234375, -44.1150207519531],
            [-44.114990234375, -32.4349670410156],
            [-35.614990234375, -32.4349670410156],
            [-32.114990234375, -28.9349670410156],
            [-35.614990234375, -25.4349670410156],
            [-44.114990234375, -25.4349670410156],
            [-44.114990234375, -12.9049987792969],
            [-35.614990234375, -12.9049987792969],
            [-32.114990234375, -9.40499877929688],
            [-35.614990234375, -5.90499877929688],
            [-44.114990234375, -5.90499877929688],
            [-44.114990234375, 5.96499633789062],
            [-5.9649658203125, 44.1150207519531],
            [5.9849853515625, 44.1150207519531],
            [5.9849853515625, 35.6949768066406],
            [9.4849853515625, 32.1949768066406],
            [12.9849853515625, 35.6949768066406],
            [12.9849853515625, 44.1150207519531],
            [25.5150146484375, 44.1150207519531],
            [25.5150146484375, 35.6949768066406],
            [29.0150146484375, 32.1949768066406],
            [32.5150146484375, 35.6949768066406],
            [32.5150146484375, 44.1150207519531]
        ];
        const inTangents: [number, number][] = [
            [0, 0],
            [47.8400268554688, 1.800048828125],
            [0, 0],
            [0, 0],
            [0, -1.9300537109375],
            [1.92999267578125, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, -1.92999267578125],
            [1.92999267578125, 0],
            [0, 0],
            [0, 0],
            [-1.6800537109375, -20.260009765625],
            [0, 0],
            [0, 0],
            [-1.92999267578125, 0],
            [0, -1.92999267578125],
            [0, 0],
            [0, 0],
            [0, 0],
            [-1.94000244140625, 0],
            [0, -1.92999267578125],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [-1.79998779296875, -47.8400268554688],
            [0, 0],
            [0, 0],
            [1.92999267578125, 0],
            [0, 1.92999267578125],
            [0, 0],
            [0, 0],
            [0, 0],
            [1.92999267578125, 0],
            [0, 1.92999267578125],
            [0, 0],
            [0, 0],
            [20.260009765625, 1.67999267578125],
            [0, 0],
            [0, 0],
            [0, -1.92999267578125],
            [1.9300537109375, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, -1.92999267578125],
            [1.92999267578125, 0],
            [0, 0],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Top_Right',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [47.615, -47.615]
        );
    };

    const createBottomRight = () => {
        const vertices: [number, number][] = [
            [32.5150146484375, -44.114990234375],
            [32.5150146484375, -35.5350341796875],
            [29.0150146484375, -32.0350341796875],
            [25.5150146484375, -35.5350341796875],
            [25.5150146484375, -44.114990234375],
            [12.9849853515625, -44.114990234375],
            [12.9849853515625, -35.5350341796875],
            [9.4849853515625, -32.0350341796875],
            [5.9849853515625, -35.5350341796875],
            [5.9849853515625, -44.114990234375],
            [-5.9649658203125, -44.114990234375],
            [-44.114990234375, -5.96502685546875],
            [-44.114990234375, 6.06500244140625],
            [-35.614990234375, 6.06500244140625],
            [-32.114990234375, 9.56500244140625],
            [-35.614990234375, 13.0650024414062],
            [-44.114990234375, 13.0650024414062],
            [-44.114990234375, 25.594970703125],
            [-35.614990234375, 25.594970703125],
            [-32.114990234375, 29.094970703125],
            [-35.614990234375, 32.594970703125],
            [-44.114990234375, 32.594970703125],
            [-44.114990234375, 44.114990234375],
            [44.114990234375, -44.114990234375]
        ];
        const inTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [1.92999267578125, 0],
            [0, 1.9300537109375],
            [0, 0],
            [0, 0],
            [0, 0],
            [1.9300537109375, 0],
            [0, 1.9300537109375],
            [0, 0],
            [0, 0],
            [20.260009765625, -1.67999267578125],
            [0, 0],
            [0, 0],
            [0, -1.94000244140625],
            [1.92999267578125, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, -1.94000244140625],
            [1.92999267578125, 0],
            [0, 0],
            [0, 0],
            [-1.79998779296875, 47.8399658203125]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [0, 1.9300537109375],
            [-1.94000244140625, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 1.9300537109375],
            [-1.92999267578125, 0],
            [0, 0],
            [0, 0],
            [-1.6800537109375, 20.260009765625],
            [0, 0],
            [0, 0],
            [1.92999267578125, 0],
            [0, 1.92999267578125],
            [0, 0],
            [0, 0],
            [0, 0],
            [1.92999267578125, 0],
            [0, 1.9300537109375],
            [0, 0],
            [0, 0],
            [47.8400268554688, -1.79998779296875],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Bottom_Right',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [47.615, 47.615]
        );
    };

    const createBottomLeft = () => {
        const vertices: [number, number][] = [
            [-12, 53.6799926757812],
            [-3.5, 53.6799926757812],
            [-3.5, 41.6499633789062],
            [-41.6500244140625, 3.5],
            [-53.5999755859375, 3.5],
            [-53.5999755859375, 12.0799560546875],
            [-57.0999755859375, 15.5799560546875],
            [-60.5999755859375, 12.0799560546875],
            [-60.5999755859375, 3.5],
            [-73.1300048828125, 3.5],
            [-73.1300048828125, 12.0799560546875],
            [-76.6300048828125, 15.5799560546875],
            [-80.1300048828125, 12.0799560546875],
            [-80.1300048828125, 3.5],
            [-91.72998046875, 3.5],
            [-3.5, 91.72998046875],
            [-3.5, 80.2099609375],
            [-12, 80.2099609375],
            [-15.5, 76.7099609375],
            [-12, 73.2099609375],
            [-3.5, 73.2099609375],
            [-3.5, 60.6799926757812],
            [-12, 60.6799926757812],
            [-15.5, 57.1799926757812]
        ];
        const inTangents: [number, number][] = [
            [-1.92999267578125, 0],
            [0, 0],
            [0, 0],
            [1.6800537109375, 20.260009765625],
            [0, 0],
            [0, 0],
            [1.94000244140625, 0],
            [0, 1.9300537109375],
            [0, 0],
            [0, 0],
            [0, 0],
            [1.94000244140625, 0],
            [0, 1.9300537109375],
            [0, 0],
            [0, 0],
            [-47.8400268554688, -1.79998779296875],
            [0, 0],
            [0, 0],
            [0, 1.9300537109375],
            [-1.92999267578125, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 1.92999267578125]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [-20.260009765625, -1.67999267578125],
            [0, 0],
            [0, 0],
            [0, 1.9300537109375],
            [-1.9300537109375, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 1.9300537109375],
            [-1.92999267578125, 0],
            [0, 0],
            [0, 0],
            [1.79998779296875, 47.8399658203125],
            [0, 0],
            [0, 0],
            [-1.92999267578125, 0],
            [0, -1.94000244140625],
            [0, 0],
            [0, 0],
            [0, 0],
            [-1.92999267578125, 0],
            [0, -1.94000244140625]
        ];

        createPathGrp(
            contents,
            'Bottom_Left',
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

    createBottomLeft();
    createBottomRight();
    createTopRight();
    createTopLeft();
    createMiddleTR();
    createMiddleTL();
    createMiddleBR();
    createMiddleBL();
    createOuterRing();
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer);
};

const createHouseBombingIcon = (
    circleColor: ColorDropdown,
    iconColor: ColorDropdown,
    hasCircle: boolean,
    scale: boolean
): void => {
    const { layer, contents, circleColorRgb, iconColorRgb } = setUpIcon(
        'House_Bombing',
        circleColor,
        iconColor
    );

    const createBigBoom = () => {
        const vertices: [number, number][] = [
            [-65.4785614013672, 11.6502380371094],
            [-46.7796020507812, 30.3747711181641],
            [-41.9282989501953, -6.13673400878906],
            [-35.3073272705078, 23.1404266357422],
            [-27.1506805419922, 12.2839050292969],
            [-27.3102874755859, 22.6921997070312],
            [-6.7796630859375, 8.22352600097656],
            [-19.9213562011719, 26.7731628417969],
            [8.59579467773438, 29.0556945800781],
            [-25.2132263183594, 43.8180084228516],
            [-16.9149169921875, 46.38916015625],
            [-27.0269622802734, 50.4571990966797],
            [-7.27694702148438, 70.2383270263672],
            [-8.77116394042969, 53.9403381347656],
            [5.40626525878906, 60.8913421630859],
            [3.75502014160156, 46.8582153320312],
            [65.4785614013672, 32.2631683349609],
            [15.8456726074219, 20.9119873046875],
            [30.0387115478516, 8.85218811035156],
            [6.64564514160156, 14.1131896972656],
            [62.0597839355469, -35.4888305664062],
            [3.18807983398438, -3.53974914550781],
            [8.78913879394531, -26.6235809326172],
            [-6.46783447265625, -7.47137451171875],
            [-0.38529968261719, -70.2383270263672],
            [-32.7179718017578, -10.8102264404297],
            [-59.4163513183594, -26.0698394775391],
            [-53.4008026123047, 5.31996154785156]
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
            [65.4645, -66.554]
        );
    };

    const createLittleBoom = () => {
        const vertices: [number, number][] = [
            [-6.86579895019531, -0.90950012207031],
            [0.06964111328125, 6.03385925292969],
            [5.50318908691406, 6.34040832519531],
            [7.16470336914062, 0.75755310058594],
            [2.03269958496094, 2.86753845214844],
            [1.43251037597656, 0.45098876953125],
            [3.84906005859375, -3.16618347167969],
            [-0.37620544433594, -1.36036682128906],
            [-1.42988586425781, -6.34040832519531],
            [-3.54251098632812, -2.41905212402344],
            [-7.16470336914062, -5.43869018554688]
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
            [30.675, -28.324]
        );
    };

    const createCircleOne = () => {
        const vertices: [number, number][] = [
            [1.96058654785156, 1.96180725097656],
            [-1.96549987792969, 1.96180725097656],
            [-1.96046447753906, -1.9619140625],
            [1.96322631835938, -1.95953369140625]
        ];
        const inTangents: [number, number][] = [
            [1.08480834960938, -1.08216857910156],
            [1.08718872070312, 1.0819091796875],
            [-1.08193969726562, 1.0819091796875],
            [-1.0819091796875, -1.08454895019531]
        ];
        const outTangents: [number, number][] = [
            [-1.08454895019531, 1.08454895019531],
            [-1.08216857910156, -1.08718872070312],
            [1.08450317382812, -1.08480834960938],
            [1.08216857910156, 1.08480834960938]
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
            [24.4686, -107.3976]
        );
    };

    const createCircleTwo = () => {
        const vertices: [number, number][] = [
            [1.58273315429688, 1.58628845214844],
            [-1.58595275878906, 1.58364868164062],
            [-1.58595275878906, -1.58529663085938],
            [1.58537292480469, -1.58265686035156]
        ];
        const inTangents: [number, number][] = [
            [0.87617492675781, -0.87612915039062],
            [0.87322998046875, 0.87322998046875],
            [-0.87348937988281, 0.87348937988281],
            [-0.87586975097656, -0.87586975097656]
        ];
        const outTangents: [number, number][] = [
            [-0.87586975097656, 0.87322998046875],
            [-0.87348937988281, -0.87850952148438],
            [0.87850952148438, -0.87322998046875],
            [0.87586975097656, 0.87586975097656]
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
            [134.5952, -73.0661]
        );
    };

    const createCircleThree = () => {
        const vertices: [number, number][] = [
            [1.65907287597656, 1.6605224609375],
            [-1.66183471679688, 1.65788269042969],
            [-1.65919494628906, -1.66038513183594],
            [1.66171264648438, -1.66038513183594]
        ];
        const inTangents: [number, number][] = [
            [0.91728210449219, -0.91702270507812],
            [0.91464233398438, 0.91728210449219],
            [-0.91461181640625, 0.91728210449219],
            [-0.91728210449219, -0.91438293457031]
        ];
        const outTangents: [number, number][] = [
            [-0.91966247558594, 0.91464233398438],
            [-0.91702270507812, -0.91702270507812],
            [0.91966247558594, -0.91438293457031],
            [0.91464233398438, 0.919921875]
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
            [85.2107, -13.3492]
        );
    };

    const createHouse = () => {
        const vertices: [number, number][] = [
            [79.1449890136719, -26.2100219726562],
            [79.1449890136719, 101.669982910156],
            [21.9850158691406, 101.669982910156],
            [21.9850158691406, 34.0399780273438],
            [-21.9850158691406, 34.0399780273438],
            [-21.9850158691406, 101.669982910156],
            [-79.1449890136719, 101.669982910156],
            [-79.1449890136719, -26.2100219726562],
            [-71.5550231933594, -33.4600219726562],
            [-71.4250183105469, -33.5800170898438],
            [-0.00497436523438, -101.669982910156],
            [71.4150085449219, -33.5800170898438],
            [71.5450134277344, -33.4600219726562]
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
            [0, 0]
        ];

        createPathGrp(
            contents,
            'House',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-32.845, 35.12]
        );
    };

    const createRoof = () => {
        const vertices: [number, number][] = [
            [-32.849365234375, -89.4986877441406],
            [-137.056411743164, 9.88291931152344],
            [-120.251113891602, 9.88291931152344],
            [-32.849365234375, -73.8296356201172],
            [56.6365356445312, 9.88291931152344],
            [71.3576965332031, 9.88291931152344]
        ];
        const inTangents: [number, number][] = [
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
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Roof',
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

    createRoof();
    createHouse();
    createCircleThree();
    createCircleTwo();
    createCircleOne();
    createLittleBoom();
    createBigBoom();
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer);
};

const createFireIcon = (
    circleColor: ColorDropdown,
    iconColor: ColorDropdown,
    hasCircle: boolean,
    scale: boolean
): void => {
    const { layer, contents, circleColorRgb, iconColorRgb } = setUpIcon(
        'Fire',
        circleColor,
        iconColor
    );

    const createFireL = () => {
        const vertices: [number, number][] = [
            [42.7799987792969, -19.1463470458984],
            [43.7399597167969, 35.3036651611328],
            [18.2900085449219, 60.0136871337891],
            [48.0299987792969, 70.8736724853516],
            [48.0299987792969, 109.133682250977],
            [24.8099670410156, 108.46369934082],
            [-48.0299987792969, 27.8136749267578],
            [-33.3800354003906, -28.3362884521484],
            [-23.6399841308594, -24.7063446044922],
            [-3.95999145507812, 26.1036529541016],
            [4.05996704101562, 19.7936553955078],
            [47.3799743652344, -109.096298217773],
            [48.0299987792969, -109.436325073242],
            [48.0299987792969, -7.54631042480469]
        ];
        const inTangents: [number, number][] = [
            [0.72998046875, 4.1300048828125],
            [3.530029296875, -15.2999877929688],
            [15.3999633789062, -3.75],
            [-8.989990234375, 0.780029296875],
            [0, 0],
            [7.6400146484375, 0.97998046875],
            [4.05999755859375, 59.9000244140625],
            [-7.26995849609375, 11.1199951171875],
            [0.63995361328125, -5.55999755859375],
            [-19.3600463867188, -14.6499481201172],
            [1.92999267578125, 4.9200439453125],
            [-38.8299560546875, 22.8899536132812],
            [-0.22003173828125, 0.09002685546875],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [-9.29998779296875, 24.1800537109375],
            [-2.13995361328125, 9.84002685546875],
            [10.469970703125, 8.5999755859375],
            [0, 0],
            [-7.760009765625, 0.58001708984375],
            [-18.1799926757812, -2.35003662109375],
            [0, -27.0599975585938],
            [3.10003662109375, -4.60003662109375],
            [-1.72003173828125, 15.0800170898438],
            [4.16998291015625, 3.21002197265625],
            [-23.4299926757812, -60.1099853515625],
            [0.22003173828125, -0.1300048828125],
            [0, 0],
            [-2.60003662109375, -3.6500244140625]
        ];

        createPathGrp(
            contents,
            'Fire_L',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-37.5212, 0.2258]
        );
    };

    const createFireR = () => {
        const vertices: [number, number][] = [
            [80.0287933349609, 6.43951416015625],
            [17.8787689208984, -102.990478515625],
            [10.5087738037109, -109.210510253906],
            [10.5087738037109, -7.32049560546875],
            [40.2387542724609, 35.4194946289062],
            [10.5087738037109, 71.0994873046875],
            [10.5087738037109, 109.359497070312],
            [61.6287689208984, 88.6895141601562]
        ];
        const inTangents: [number, number][] = [
            [11.97998046875, 28.6599731445312],
            [-14.4400024414062, 63.4299926757812],
            [3.94000244140625, -1.72998046875],
            [0, 0],
            [0, -17.3099975585938],
            [17.6300048828125, -1.52001953125],
            [0, 0],
            [-14.27001953125, 13.0700073242188]
        ];
        const outTangents: [number, number][] = [
            [-16.7900390625, -43.6500244140625],
            [1.010009765625, -4.46002197265625],
            [0, 0],
            [9.94000244140625, 13.9799957275391],
            [0.55999755859375, 17.9199829101562],
            [0, 0],
            [18.6199951171875, -1.3599853515625],
            [22.25, -20.6400146484375]
        ];

        createPathGrp(
            contents,
            'Fire_R',
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

    createFireR();
    createFireL();
    const offsetPaths = contents.addProperty('ADBE Vector Filter - Offset');
    const offsetAmt = offsetPaths.property(
        'ADBE Vector Offset Amount'
    ) as Property<number>;
    offsetAmt.setValue(0.5);
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer);
};

const createMoneyIcon = (
    circleColor: ColorDropdown,
    iconColor: ColorDropdown,
    hasCircle: boolean,
    scale: boolean
): void => {
    const { layer, contents, circleColorRgb, iconColorRgb } = setUpIcon(
        'Money',
        circleColor,
        iconColor
    );

    const createBagTop = () => {
        const vertices: [number, number][] = [
            [86.6700439453125, 67.9109954833984],
            [26.489990234375, 67.9109954833984],
            [24.489990234375, 59.5209808349609],
            [24.3699951171875, 59.2910003662109],
            [24.3199615478516, 59.2009735107422],
            [24.2999877929688, 59.1710052490234],
            [24.2799682617188, 59.1310272216797],
            [24.2599487304688, 59.1009979248047],
            [24.2500152587891, 59.0809783935547],
            [24.22998046875, 59.0410003662109],
            [24.1699829101562, 58.9410247802734],
            [24.1499633789062, 58.9109954833984],
            [13.4400024414062, 50.6210174560547],
            [4.5799560546875, 47.9910125732422],
            [4.5799560546875, 28.3610076904297],
            [11.699951171875, 31.1409759521484],
            [14.1499633789062, 33.7109832763672],
            [15, 35.3409881591797],
            [15.5499877929688, 37.0710296630859],
            [20.1599731445312, 40.3909759521484],
            [25.0799560546875, 37.4009857177734],
            [25.5199584960938, 34.4509735107422],
            [25.0299682617188, 32.6009979248047],
            [24.2899780273438, 30.7009735107422],
            [20.1499633789062, 24.7510375976562],
            [6.6099853515625, 18.1810150146484],
            [4.5899658203125, 17.8710174560547],
            [4.5899658203125, 12.1710052490234],
            [1.5699462890625, 7.45097351074219],
            [-4.030029296875, 8.28099060058594],
            [-5.780029296875, 12.1710052490234],
            [-5.780029296875, 17.9009857177734],
            [-19.77001953125, 24.0909881591797],
            [-24.02001953125, 29.9310150146484],
            [-25.5700073242188, 37.4509735107422],
            [-23.9700317382812, 44.8710174560547],
            [-19.3800048828125, 50.3909759521484],
            [-5.780029296875, 56.2610321044922],
            [-5.780029296875, 76.7809906005859],
            [-12.3800048828125, 73.1810150146484],
            [-14.6600341796875, 70.2709808349609],
            [-15.4600219726562, 68.5710296630859],
            [-15.6700439453125, 67.9109954833984],
            [-16.010009765625, 66.7709808349609],
            [-16.3200073242188, 66.0410003662109],
            [-16.4900512695312, 65.7410125732422],
            [-17.4000244140625, 64.6210174560547],
            [-20.4700317382812, 63.2310028076172],
            [-25.530029296875, 66.0010223388672],
            [-26.0900268554688, 67.9109954833984],
            [-86.6700439453125, 67.9109954833984],
            [-18.760009765625, -29.7890167236328],
            [-40.8200073242188, -74.1090240478516],
            [-5.60003662109375, -68.7290191650391],
            [31.3800048828125, -76.0589752197266],
            [11.22998046875, -30.9190216064453]
        ];
        const inTangents: [number, number][] = [
            [-6.41015625, -40.1699829101562],
            [0, 0],
            [1.3599853515625, 2.55999755859375],
            [0.03997802734375, 0.07000732421875],
            [0.02000427246094, 0.030029296875],
            [0.01002502441406, 0.010009765625],
            [0.010009765625, 0.00994873046875],
            [0.010009765625, 0.010009765625],
            [0, 0.010009765625],
            [0.010009765625, 0.010009765625],
            [0.02003479003906, 0.02996826171875],
            [0.010009765625, 0.010009765625],
            [4.27996826171875, 1.69000244140625],
            [3, 0.719970703125],
            [0, 0],
            [-2.0799560546875, -1.53997802734375],
            [-0.64996337890625, -1.010009765625],
            [-0.23004150390625, -0.57000732421875],
            [-0.22001647949219, -0.57000732421875],
            [-2.03996276855469, -0.0899658203125],
            [-0.8800048828125, 1.8800048828125],
            [0.1400146484375, 1],
            [0.19000244140625, 0.5999755859375],
            [0.27996826171875, 0.62005615234375],
            [1.73004150390625, 1.69993591308594],
            [5.00001525878906, 0.89996337890625],
            [0.66998291015625, 0.0799560546875],
            [0, 0],
            [1.82000732421875, 0.84002685546875],
            [1.52001953125, -1.3399658203125],
            [0, -1.47996520996094],
            [0, 0],
            [3.82000732421875, -3.510009765625],
            [1.010009765625, -2.21002197265625],
            [-0.02001953125, -2.5899658203125],
            [-1.1199951171875, -2.29998779296875],
            [-1.9100341796875, -1.489990234375],
            [-4.760009765625, -1.23004150390625],
            [0, 0],
            [1.8299560546875, 1.76995849609375],
            [0.6199951171875, 1.07000732421875],
            [0.219970703125, 0.5799560546875],
            [0.05999755859375, 0.22003173828125],
            [0.1300048828125, 0.3699951171875],
            [0.1199951171875, 0.22998046875],
            [0.05999755859375, 0.0999755859375],
            [0.3599853515625, 0.3299560546875],
            [1.1600341796875, 0.0999755859375],
            [0.96002197265625, -1.84002685546875],
            [0.05999755859375, -0.66998291015625],
            [0, 0],
            [-28.4000244140625, 13.9500122070312],
            [-6.489990234375, 7.12005615234375],
            [-13.0399780273438, 1.58001708984375],
            [-8.760009765625, -1.77001953125],
            [16.0299682617188, -13.469970703125]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [-0.00999450683594, -2.90997314453125],
            [-0.0400390625, -0.0799560546875],
            [-0.02001953125, -0.02996826171875],
            [-0.00994873046875, -0.00994873046875],
            [0, -0.010009765625],
            [-0.010009765625, -0.010009765625],
            [0, -0.010009765625],
            [-0.01002502441406, -0.00994873046875],
            [-0.02001953125, -0.02996826171875],
            [0, -0.010009765625],
            [-2.3800048828125, -4.02996826171875],
            [-2.87005615234375, -1.1300048828125],
            [0, 0],
            [2.52001953125, 0.44000244140625],
            [0.96002197265625, 0.71002197265625],
            [0.33001708984375, 0.510009765625],
            [0.219970703125, 0.55999755859375],
            [0.72998046875, 1.90997314453125],
            [2.07000732421875, 0.09002685546875],
            [0.42999267578125, -0.90997314453125],
            [-0.0999755859375, -0.62994384765625],
            [-0.21002197265625, -0.6500244140625],
            [-0.989990234375, -2.2099609375],
            [-3.64996337890625, -3.61006164550781],
            [-0.66998291015625, -0.1300048828125],
            [0, 0],
            [0, -2.010009765625],
            [-1.8499755859375, -0.8499755859375],
            [-1.1099853515625, 0.98004150390625],
            [0, 0],
            [-5.0899658203125, 0.72003173828125],
            [-1.780029296875, 1.6500244140625],
            [-1.08001708984375, 2.3599853515625],
            [0.01995849609375, 2.550048828125],
            [1.05999755859375, 2.19000244140625],
            [3.92999267578125, 3.050048828125],
            [0, 0],
            [-2.44000244140625, -0.67999267578125],
            [-0.8900146484375, -0.85003662109375],
            [-0.30999755859375, -0.53997802734375],
            [-0.08001708984375, -0.22003173828125],
            [-0.1099853515625, -0.3800048828125],
            [-0.08001708984375, -0.25],
            [-0.04998779296875, -0.1099853515625],
            [-0.25, -0.41998291015625],
            [-0.83001708984375, -0.780029296875],
            [-2.07000732421875, -0.17999267578125],
            [-0.29998779296875, 0.5899658203125],
            [0, 0],
            [4.80999755859375, -39.1199951171875],
            [-17.4100341796875, -11.2899780273438],
            [7.969970703125, -8.75994873046875],
            [9.20001220703125, -1.3599853515625],
            [6.5999755859375, 1.32000732421875],
            [30.8800048828125, 12.7200317382812]
        ];

        createPathGrp(
            contents,
            'Bag_Top',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-0.184, -28.6153]
        );
    };

    const createBagBottom = () => {
        const vertices: [number, number][] = [
            [85.8959808349609, -34.6953125],
            [26.0259857177734, -34.6953125],
            [26.1860198974609, -29.1353149414062],
            [19.0359954833984, -16.5453491210938],
            [4.39599609375, -11.3753051757812],
            [4.39599609375, -5.8553466796875],
            [2.64599609375, -1.96533203125],
            [-2.95399475097656, -1.14532470703125],
            [-5.96400451660156, -5.8553466796875],
            [-5.96400451660156, -11.8853149414062],
            [-8.62397766113281, -12.5053100585938],
            [-21.3139801025391, -20.3052978515625],
            [-25.2240142822266, -26.7653198242188],
            [-25.8640289306641, -28.6453247070312],
            [-26.2740020751953, -30.3953247070312],
            [-25.7140045166016, -33.3153076171875],
            [-24.6540069580078, -34.6953125],
            [-86.3839874267578, -34.6953125],
            [-16.5240020751953, 33.9246826171875]
        ];
        const inTangents: [number, number][] = [
            [7.97998046875, 39.8299560546875],
            [0, 0],
            [0.199951171875, -1.84002685546875],
            [3.96003723144531, -3.07000732421875],
            [5.21000671386719, -0.4200439453125],
            [0, 0],
            [1.11004638671875, -0.97998046875],
            [1.8499755859375, 0.8499755859375],
            [0, 2.010009765625],
            [0, 0],
            [0.8699951171875, 0.239990234375],
            [3.29998779296875, 3.8599853515625],
            [0.92999267578125, 2.3599853515625],
            [0.19000244140625, 0.6400146484375],
            [0.05999755859375, 0.5999755859375],
            [-0.46002197265625, 0.88995361328125],
            [-0.41998291015625, 0.3900146484375],
            [0, 0],
            [-59.719970703125, -4.3599853515625]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [0.30999755859375, 1.8399658203125],
            [-0.5400390625, 5],
            [-4.17999267578125, 3.24005126953125],
            [0, 0],
            [0, 1.48004150390625],
            [-1.51995849609375, 1.34002685546875],
            [-1.82000732421875, -0.84002685546875],
            [0, 0],
            [-0.9000244140625, -0.16998291015625],
            [-4.8699951171875, -1.33001708984375],
            [-1.6400146484375, -1.9200439453125],
            [-0.239990234375, -0.6199951171875],
            [-0.16998291015625, -0.57000732421875],
            [-0.0999755859375, -1.010009765625],
            [0.27001953125, -0.530029296875],
            [0, 0],
            [-5.5400390625, 33.7799682617188],
            [88.6599731445312, 6.469970703125]
        ];

        createPathGrp(
            contents,
            'Bag_Bottom',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [0, 70.701]
        );
    };

    const createDollarHideR = () => {
        const vertices: [number, number][] = [
            [4.16851806640625, -4.86689758300781],
            [1.35610961914062, -6.91098022460938],
            [-5.7691650390625, -9.42826843261719],
            [-5.7691650390625, 9.42826843261719],
            [4.78903198242188, 3.86099243164062],
            [4.78903198242188, 3.86099243164062],
            [5.57273864746094, -2.02523803710938]
        ];
        const inTangents: [number, number][] = [
            [0.73359680175781, 0.80404663085938],
            [1.02923583984375, 0.53718566894531],
            [2.43345642089844, 0.63986206054688],
            [0, 0],
            [-2.07383728027344, 3.6873779296875],
            [0, 0],
            [0.40325927734375, 1.96075439453125]
        ];
        const outTangents: [number, number][] = [
            [-0.78718566894531, -0.86207580566406],
            [-2.24099731445312, -1.16860961914062],
            [0, 0],
            [3.94976806640625, -0.4464111328125],
            [0, 0],
            [0.99005126953125, -1.7613525390625],
            [-0.21873474121094, -1.06245422363281]
        ];

        createPathGrp(
            contents,
            'Dollar_Hide_R',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [10.1704, 39.4956]
        );
    };

    const createDollarHideL = () => {
        const vertices: [number, number][] = [
            [-3.44137573242188, -3.85603332519531],
            [-4.6640625, -0.5406494140625],
            [-4.25979614257812, 3.1234130859375],
            [-1.97811889648438, 5.63424682617188],
            [1.41264343261719, 7.38418579101562],
            [4.71511840820312, 8.53147888183594],
            [4.71511840820312, -8.53147888183594]
        ];
        const inTangents: [number, number][] = [
            [1.81343078613281, -2.64773559570312],
            [0.1175537109375, -1.1973876953125],
            [-0.45584106445312, -1.12942504882812],
            [-0.9384765625, -0.63986206054688],
            [-1.17951965332031, -0.47418212890625],
            [-1.19985961914062, -0.3680419921875],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [-0.67904663085938, 0.99153137207031],
            [-0.1175537109375, 1.19985961914062],
            [0.43402099609375, 1.07635498046875],
            [1.05303955078125, 0.71624755859375],
            [0.98954772949219, 0.39830017089844],
            [0, 0],
            [-3.03115844726562, 0.64682006835938]
        ];

        createPathGrp(
            contents,
            'Dollar_Hide_L',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-10.6841, 8.3408]
        );
    };

    createDollarHideL();
    createDollarHideR();
    createBagBottom();
    createBagTop();
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer);
};

const createEarthIcon = (
    circleColor: ColorDropdown,
    iconColor: ColorDropdown,
    hasCircle: boolean,
    scale: boolean
): void => {
    const { layer, contents, circleColorRgb, iconColorRgb } = setUpIcon(
        'Earth',
        circleColor,
        iconColor
    );

    const createEarthR = () => {
        const vertices: [number, number][] = [
            [58.1924438476562, -0.4354248046875],
            [57.0443267822266, 5.90554809570312],
            [38.9890899658203, 51.4765777587891],
            [-5.35899353027344, 87.7577362060547],
            [-22.7527770996094, 93.5464324951172],
            [-21.0678558349609, 87.2618103027344],
            [-19.6371307373047, 85.8553924560547],
            [-4.00845336914062, 75.4323120117188],
            [-2.16415405273438, 73.0873870849609],
            [1.493408203125, 63.0185394287109],
            [3.46929931640625, 60.8610382080078],
            [13.2068786621094, 56.3894805908203],
            [15.2509307861328, 54.5205841064453],
            [25.7970428466797, 34.4469451904297],
            [25.0522766113281, 32.1288604736328],
            [18.6284637451172, 28.4102630615234],
            [-0.1943359375, 12.7470703125],
            [-3.3193359375, 11.1181488037109],
            [-13.5810852050781, 8.93836975097656],
            [-27.1385803222656, 6.30213928222656],
            [-33.6959533691406, 7.82444763183594],
            [-38.3866271972656, 6.4412841796875],
            [-45.8292846679688, 1.48245239257812],
            [-46.8552093505859, 0.06092834472656],
            [-46.486572265625, -4.885498046875],
            [-48.0623168945312, -6.58767700195312],
            [-48.6808471679688, -6.57035827636719],
            [-55.2673492431641, -3.48231506347656],
            [-56.2883758544922, -2.34300231933594],
            [-58.1360473632812, -10.1018829345703],
            [-57.2959594726562, -11.4621429443359],
            [-50.9706726074219, -14.4762420654297],
            [-49.0418090820312, -14.3656158447266],
            [-42.862060546875, -11.5278930664062],
            [-41.3239288330078, -10.9667053222656],
            [-36.3645629882812, -14.2791595458984],
            [-33.2613220214844, -20.4083709716797],
            [-26.5214385986328, -28.5073699951172],
            [-17.5975341796875, -35.5258178710938],
            [-11.1746673583984, -38.7924041748047],
            [1.94839477539062, -40.7814025878906],
            [3.58224487304688, -40.547119140625],
            [5.12971496582031, -41.6231384277344],
            [3.47175598144531, -47.7653045654297],
            [-0.34159851074219, -51.5414428710938],
            [-10.8114929199219, -66.1273345947266],
            [-13.0789184570312, -67.6866302490234],
            [-22.4831390380859, -69.7985534667969],
            [-31.5400238037109, -71.4832916259766],
            [-32.3686218261719, -70.3521728515625],
            [-33.8620452880859, -61.8134613037109],
            [-35.4440307617188, -60.7587585449219],
            [-44.3620910644531, -62.4606170654297],
            [-45.5333404541016, -63.6322937011719],
            [-45.5745239257812, -64.04345703125],
            [-45.7847137451172, -69.4008026123047],
            [-40.7543029785156, -70.7749786376953],
            [-36.7989501953125, -74.7138671875],
            [-34.7174377441406, -83.9402160644531],
            [-26.8762664794922, -80.7474212646484],
            [-26.2096862792969, -78.8478851318359],
            [-22.7572631835938, -73.6589965820312],
            [-20.2818450927734, -72.6346282958984],
            [-11.4599456787109, -73.1473388671875],
            [-11.1141815185547, -75.2111511230469],
            [-23.2258911132812, -87.6347351074219],
            [-24.4161987304688, -92.9336547851562],
            [-23.1510467529297, -93.4175567626953],
            [-15.0504760742188, -91.8339996337891],
            [-13.8084869384766, -91.1488494873047],
            [-12.5770874023438, -90.0476837158203],
            [-2.26483154296875, -73.8125305175781],
            [0.61763000488281, -69.2349700927734],
            [10.7674865722656, -60.1155395507812],
            [11.8638916015625, -59.1746673583984],
            [16.8042907714844, -60.2229766845703],
            [26.5838470458984, -66.2205352783203],
            [39.4373779296875, -67.7975158691406],
            [40.9861907958984, -66.8495483398438],
            [56.5180511474609, -27.4233551025391],
            [57.7838592529297, -18.0123443603516],
            [58.1924438476562, -16.9784851074219]
        ];
        const inTangents: [number, number][] = [
            [0, -5.51435852050781],
            [0.2999267578125, -2.1182861328125],
            [9.65513610839844, -13.7343292236328],
            [18.1114196777344, -8.01153564453125],
            [6.18051147460938, -1.39389038085938],
            [-0.54313659667969, 2.01579284667969],
            [-0.56507873535156, 0.37791442871094],
            [-5.22984313964844, 3.44354248046875],
            [-0.36134338378906, 1.03182983398438],
            [-1.16903686523438, 3.37364196777344],
            [-1.0164794921875, 0.45289611816406],
            [-3.25886535644531, 1.46151733398438],
            [-0.47982788085938, 0.92884826660156],
            [-3.58561706542969, 6.65353393554688],
            [1.11892700195312, 0.60018920898438],
            [2.21653747558594, 1.08493041992188],
            [5.0087890625, 6.73587036132812],
            [1.36918640136719, 0.04425048828125],
            [3.34632873535156, 1.01744079589844],
            [4.553955078125, 0.65628051757812],
            [2.12057495117188, -0.72212219238281],
            [1.25637817382812, 1.85835266113281],
            [3.35432434082031, 0.35653686523438],
            [-0.09214782714844, 0.86386108398438],
            [-0.18873596191406, 1.64117431640625],
            [1.47946166992188, -0.30606079101562],
            [0.20237731933594, 0.02696228027344],
            [1.49710083007812, -2.53663635253906],
            [0.48805236816406, -0.53672790527344],
            [0.65072631835938, 2.48631286621094],
            [-0.56632995605469, 0.26898193359375],
            [-2.08880615234375, 1.04397583007812],
            [-0.64190673828125, -0.30099487304688],
            [-2.06559753417969, -0.93341064453125],
            [-0.52947998046875, -0.08172607421875],
            [-0.7860107421875, 3.6077880859375],
            [-1.62066650390625, 1.79360961914062],
            [-2.05130004882812, 2.84223937988281],
            [-3.59417724609375, 1.57955932617188],
            [-1.96292114257812, 1.35023498535156],
            [-0.53388977050781, -0.12432861328125],
            [-4.648193359375, -1.13015747070312],
            [-0.26271057128906, 0.9072265625],
            [2.29823303222656, 1.68341064453125],
            [1.34097290039062, 1.181884765625],
            [2.23178100585938, 5.75936889648438],
            [1.28253173828125, -0.1121826171875],
            [3.05024719238281, 1.78462219238281],
            [3.0343017578125, 0.5806884765625],
            [0.09181213378906, -0.51353454589844],
            [0.43003845214844, -2.85646057128906],
            [1.04217529296875, 0.22547912597656],
            [2.98091125488281, 0.5224609375],
            [0.05276489257812, 0.730224609375],
            [-0.001708984375, 0.1368408203125],
            [-1.12162780761719, 1.27218627929688],
            [-1.75344848632812, 0.22328186035156],
            [-0.32159423828125, 2.59217834472656],
            [-0.74772644042969, 3.19346618652344],
            [-2.61480712890625, -0.99839782714844],
            [0.00151062011719, -0.66424560546875],
            [-3.48078918457031, -1.44471740722656],
            [-0.80120849609375, -0.39053344726562],
            [-2.91993713378906, 2.10856628417969],
            [0.79801940917969, 0.99285888671875],
            [4.263427734375, 3.90444946289062],
            [-0.00808715820312, 1.83128356933594],
            [-0.47154235839844, -0.08834838867188],
            [-2.70272827148438, -0.51460266113281],
            [-0.3612060546875, -0.32060241699219],
            [-0.45504760742188, -0.29910278320312],
            [-1.53739929199219, -6.60020446777344],
            [-1.47259521484375, -1.26724243164062],
            [-3.3768310546875, -3.04737854003906],
            [-0.39982604980469, -0.26118469238281],
            [-1.06666564941406, 2.478271484375],
            [-4.66851806640625, 0.05780029296875],
            [-4.16716003417969, 1.44459533691406],
            [-0.36944580078125, -0.56878662109375],
            [-2.44090270996094, -14.2137145996094],
            [-0.42207336425781, -3.13720703125],
            [-0.55091857910156, -0.17929077148438]
        ];
        const outTangents: [number, number][] = [
            [-1.02635192871094, 1.99403381347656],
            [-2.35748291015625, 16.6506958007812],
            [-11.3962860107422, 16.2110900878906],
            [-5.51731872558594, 2.44058227539062],
            [0.60333251953125, -2.25177001953125],
            [0.20086669921875, -0.7454833984375],
            [5.20509338378906, -3.48114013671875],
            [0.91337585449219, -0.60139465332031],
            [1.18016052246094, -3.36997985839844],
            [0.36834716796875, -1.06297302246094],
            [3.26234436035156, -1.45350646972656],
            [0.91767883300781, -0.41154479980469],
            [3.46910095214844, -6.71537780761719],
            [0.67857360839844, -1.25918579101562],
            [-2.17948913574219, -1.16905212402344],
            [-7.5579833984375, -3.69941711425781],
            [-0.80178833007812, -1.0782470703125],
            [-3.53895568847656, -0.1143798828125],
            [-4.43812561035156, -1.34939575195312],
            [-2.27775573730469, -0.3282470703125],
            [-2.02305603027344, 0.68894958496094],
            [-1.77780151367188, -2.62956237792969],
            [-0.78936767578125, -0.08390808105469],
            [0.17529296875, -1.64328002929688],
            [0.14651489257812, -1.27412414550781],
            [-0.19932556152344, 0.04122924804688],
            [-2.85862731933594, -0.38092041015625],
            [-0.20072937011719, 0.340087890625],
            [-0.64886474609375, -2.7593994140625],
            [-0.22834777832031, -0.87245178222656],
            [2.10984802246094, -1.00202941894531],
            [0.71551513671875, -0.35762023925781],
            [2.05223083496094, 0.96232604980469],
            [0.49722290039062, 0.22468566894531],
            [3.66647338867188, 0.56594848632812],
            [0.51197814941406, -2.34996032714844],
            [2.35398864746094, -2.60519409179688],
            [2.33544921875, -3.2359619140625],
            [2.19866943359375, -0.96627807617188],
            [4.11126708984375, -2.82801818847656],
            [0.53211975097656, 0.12937927246094],
            [0.94747924804688, 0.22062683105469],
            [0.70120239257812, -2.42144775390625],
            [-1.42683410644531, -1.04512023925781],
            [-4.61341857910156, -4.06608581542969],
            [-0.42141723632812, -1.08750915527344],
            [-3.34275817871094, 0.29237365722656],
            [-2.61154174804688, -1.52793884277344],
            [-0.81866455078125, -0.15666198730469],
            [-0.508544921875, 2.84455871582031],
            [-0.16374206542969, 1.08767700195312],
            [-2.95722961425781, -0.63984680175781],
            [-0.73666381835938, -0.12910461425781],
            [-0.00991821289062, -0.13739013671875],
            [0.02323913574219, -1.84211730957031],
            [0.96635437011719, -1.09605407714844],
            [2.43179321289062, -0.30966186523438],
            [0.37867736816406, -3.05218505859375],
            [2.65267944335938, 1.0882568359375],
            [1.0909423828125, 0.41654968261719],
            [-0.00848388671875, 3.74345397949219],
            [0.824951171875, 0.34239196777344],
            [3.04322814941406, 1.48335266113281],
            [1.11344909667969, -0.80406188964844],
            [-3.64215087890625, -4.53135681152344],
            [-1.8148193359375, -1.66201782226562],
            [0.00393676757812, -0.89347839355469],
            [2.70414733886719, 0.50666809082031],
            [0.50877380371094, 0.09687805175781],
            [0.4122314453125, 0.36587524414062],
            [5.87921142578125, 3.86447143554688],
            [0.44392395019531, 1.90574645996094],
            [3.44673156738281, 2.96607971191406],
            [0.35777282714844, 0.32286071777344],
            [2.365234375, 1.54510498046875],
            [4.29548645019531, -0.05317687988281],
            [1.91220092773438, -4.44282531738281],
            [0.93162536621094, -0.32296752929688],
            [7.85223388671875, 12.0886383056641],
            [0.53535461425781, 3.11747741699219],
            [0.04995727539062, 0.37117004394531],
            [0, 5.51434326171875]
        ];

        createPathGrp(
            contents,
            'Earth_R',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [47.8895, 9.327]
        );
    };

    const createEarthTop = () => {
        const vertices: [number, number][] = [
            [62.6916809082031, -8.84921264648438],
            [50.4791717529297, -9.67308044433594],
            [47.9909362792969, -9.15495300292969],
            [37.5060272216797, -0.266845703125],
            [35.2502593994141, 0.89439392089844],
            [19.6194458007812, 2.40928649902344],
            [11.0312652587891, 1.44229125976562],
            [9.19749450683594, 2.25553894042969],
            [5.36749267578125, 8.37841796875],
            [3.09194946289062, 9.80534362792969],
            [-10.3298797607422, 10.4018859863281],
            [-18.6793060302734, 8.27890014648438],
            [-22.7351837158203, 8.74395751953125],
            [-38.2134094238281, 13.682373046875],
            [-60.7212371826172, 18.6536712646484],
            [-62.6916809082031, 18.9071807861328]
        ];
        const inTangents: [number, number][] = [
            [-39.3785705566406, -19.9376831054688],
            [4.04042053222656, 0.35565185546875],
            [0.81341552734375, -0.51103210449219],
            [2.8126220703125, -3.76457214355469],
            [0.97773742675781, -0.0849609375],
            [5.20516967773438, -0.55461120605469],
            [2.84991455078125, 0.4012451171875],
            [0.44985961914062, -0.73678588867188],
            [1.24192810058594, -2.06184387207031],
            [1.11912536621094, -0.041259765625],
            [4.47442626953125, -0.01866149902344],
            [2.74552917480469, 0.84988403320312],
            [1.28407287597656, -0.93939208984375],
            [5.56330871582031, -0.44746398925781],
            [7.36767578125, -2.27024841308594],
            [0.71247863769531, 0.32919311523438]
        ];
        const outTangents: [number, number][] = [
            [-4.20672607421875, 1.17646789550781],
            [-0.95704650878906, -0.08424377441406],
            [-3.9237060546875, 2.46513366699219],
            [-0.57774353027344, 0.77328491210938],
            [-5.21485900878906, 0.45310974121094],
            [-2.94468688964844, 0.31375122070312],
            [-0.92608642578125, -0.13038635253906],
            [-1.25445556640625, 2.0545654296875],
            [-0.53950500488281, 0.89570617675781],
            [-4.47578430175781, 0.16500854492188],
            [-2.89755249023438, 0.0120849609375],
            [-1.49423217773438, -0.46253967285156],
            [-4.60592651367188, 3.36955261230469],
            [-7.72206115722656, 0.62110900878906],
            [-0.63917541503906, 0.19694519042969],
            [30.7510528564453, -38.3227081298828]
        ];

        createPathGrp(
            contents,
            'Earth_Top',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-18.0057, -86.6205]
        );
    };

    const createEarthL = () => {
        const vertices: [number, number][] = [
            [57.4036102294922, 63.5877685546875],
            [57.5036468505859, 76.2877197265625],
            [57.7035980224609, 78.1377563476562],
            [56.4535980224609, 79.65771484375],
            [35.8136444091797, 80.40771484375],
            [51.5336151123047, 80.40771484375],
            [29.2736053466797, 79.2977294921875],
            [-58.8363800048828, -2.74224853515625],
            [-47.4363555908203, -77.7022705078125],
            [-45.7964019775391, -79.072265625],
            [-40.3563995361328, -80.1322631835938],
            [-39.8163604736328, -80.292236328125],
            [-40.2563629150391, -80.0222778320312],
            [-46.6163482666016, -74.572265625],
            [-35.8763580322266, -70.4322509765625],
            [-14.0363922119141, -73.322265625],
            [-9.80635070800781, -71.4622802734375],
            [-1.20637512207031, -57.3822631835938],
            [-0.14637756347656, -53.5222778320312],
            [-0.19636535644531, -40.292236328125],
            [13.9936370849609, -19.5222778320312],
            [0.75364685058594, -37.4622802734375],
            [14.7536468505859, -18.55224609375],
            [17.1136322021484, -18.2422485351562],
            [17.5736541748047, -19.812255859375],
            [17.9036102294922, -24.6922607421875],
            [21.6036224365234, -16.9322509765625],
            [27.4836273193359, -12.2222290039062],
            [39.3836517333984, -9.6722412109375],
            [42.1836395263672, -8.13226318359375],
            [44.3536224365234, -5.9222412109375],
            [54.5936126708984, 0.38775634765625],
            [55.4236297607422, 2.15771484375],
            [49.5836029052734, 14.207763671875],
            [49.6536102294922, 16.8577270507812],
            [50.0436248779297, 17.5777587890625],
            [61.2236175537109, 45.7677764892578],
            [61.2635955810547, 48.187744140625]
        ];
        const inTangents: [number, number][] = [
            [1.44000244140625, -5.09002685546875],
            [-0.07000732421875, -4.22998046875],
            [-0.0999755859375, -0.6099853515625],
            [1.1300048828125, -0.1199951171875],
            [1.54998779296875, -0.77996826171875],
            [0, 0],
            [2.17999267578125, 0.32000732421875],
            [9.42999267578125, 43.1799926757812],
            [-13.1300048828125, 23.5800170898438],
            [-0.8399658203125, 0.1300048828125],
            [-1.8800048828125, 0.03997802734375],
            [-0.05999755859375, -0.1700439453125],
            [0.2099609375, -0.00994873046875],
            [1.97998046875, -2],
            [-4.34002685546875, -0.010009765625],
            [-7.22998046875, 1.280029296875],
            [-1.08001708984375, -1.89996337890625],
            [-2.92999267578125, -4.64996337890625],
            [0.02001953125, -1.42999267578125],
            [0.05999755859375, -4.4100341796875],
            [-0.6500244140625, -0.8699951171875],
            [-4.4100341796875, -5.97998046875],
            [-0.2900390625, -0.280029296875],
            [-0.77001953125, 0.15997314453125],
            [-0.02001953125, 0.54998779296875],
            [-0.30999755859375, 1.72003173828125],
            [-0.97998046875, -2.67999267578125],
            [-3.03997802734375, -0.45001220703125],
            [-3.97003173828125, -0.8599853515625],
            [-0.739990234375, -0.90997314453125],
            [-0.65997314453125, -0.780029296875],
            [-4.3499755859375, -0.58001708984375],
            [0.58001708984375, -1.14996337890625],
            [1.98004150390625, -4],
            [-0.7099609375, -0.8800048828125],
            [-0.1500244140625, -0.23002624511719],
            [-2.30999755859375, -9.96003723144531],
            [0.21002197265625, -0.83001708984375]
        ];
        const outTangents: [number, number][] = [
            [-1.219970703125, 4.28997802734375],
            [0.00994873046875, 0.6199951171875],
            [0.1800537109375, 1.01995849609375],
            [-1.63995361328125, 0.1700439453125],
            [0, 0],
            [-2.08001708984375, -0.91998291015625],
            [-43.6300048828125, -6.39996337890625],
            [-5.760009765625, -26.3599853515625],
            [0.38995361328125, -0.7099609375],
            [1.82000732421875, -0.27996826171875],
            [0.11004638671875, -0.3399658203125],
            [0.0999755859375, 0.27996826171875],
            [-1.83001708984375, 2.1400146484375],
            [3.1199951171875, 2.66998291015625],
            [7.4599609375, 0.02001953125],
            [2.02001953125, -0.3599853515625],
            [2.699951171875, 4.7900390625],
            [0.77001953125, 1.22003173828125],
            [-0.07000732421875, 4.4100341796875],
            [-0.010009765625, 1.0999755859375],
            [4.42999267578125, 5.96002197265625],
            [0.239990234375, 0.33001708984375],
            [0.69000244140625, 0.66998291015625],
            [0.8599853515625, -0.16998291015625],
            [0.05999755859375, -1.58001708984375],
            [1.25, 2.58001708984375],
            [1.04998779296875, 2.90997314453125],
            [4, 0.6099853515625],
            [1.0899658203125, 0.239990234375],
            [0.65997314453125, 0.79998779296875],
            [2.72998046875, 3.22998046875],
            [1.16998291015625, 0.15997314453125],
            [-2.010009765625, 3.99005126953125],
            [-0.469970703125, 0.949951171875],
            [0.1700439453125, 0.21002197265625],
            [5.52001953125, 8.69000244140625],
            [0.19000244140625, 0.8399658203125],
            [-1.28997802734375, 5.1300048828125]
        ];

        createPathGrp(
            contents,
            'Earth_L',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-44.2936, 25.6722]
        );
    };

    createEarthL();
    createEarthTop();
    createEarthR();
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer);
};

const createKaboomIcon = (
    circleColor: ColorDropdown,
    iconColor: ColorDropdown,
    hasCircle: boolean,
    scale: boolean
): void => {
    const { layer, contents, circleColorRgb, iconColorRgb } = setUpIcon(
        'Kaboom',
        circleColor,
        iconColor
    );

    const createExplosionPiece01 = () => {
        const vertices: [number, number][] = [
            [47.7749938964844, -19.4231872558594],
            [51.7250061035156, -16.0232238769531],
            [51.9649963378906, -13.1432189941406],
            [48.9349670410156, -13.4831848144531],
            [32.8349914550781, -16.5732116699219],
            [30.2449645996094, -17.3332214355469],
            [30.5049743652344, -19.4231872558594],
            [-22.5249938964844, -19.4231872558594],
            [-26.4649963378906, -15.5531921386719],
            [-29.2350158691406, -14.7532043457031],
            [-29.5149841308594, -17.8031921386719],
            [-28.3349914550781, -19.4231872558594],
            [-112.214996337891, -19.4231872558594],
            [-89.9850158691406, -12.3731994628906],
            [-93.5650329589844, -13.9432067871094],
            [-65.5450134277344, -4.34323120117188],
            [-61.9850158691406, -3.41323852539062],
            [-35.1350402832031, 4.85678100585938],
            [-32.0249938964844, 6.19680786132812],
            [-25.3150329589844, 14.3168029785156],
            [-13.0550231933594, 14.2767639160156],
            [-9.35501098632812, 15.0267639160156],
            [9.31497192382812, 14.9468078613281],
            [12.6149749755859, 14.1667785644531],
            [16.6349792480469, 15.3667907714844],
            [31.8949890136719, 6.06680297851562],
            [35.1149597167969, 4.93679809570312],
            [41.0249938964844, 7.68679809570312],
            [61.6149597167969, -2.89321899414062],
            [65.7149963378906, -4.12319946289062],
            [89.6549377441406, -11.8432312011719],
            [93.9850158691406, -13.7032165527344],
            [106.404937744141, -14.2832336425781],
            [112.214996337891, -19.4231872558594]
        ];
        const inTangents: [number, number][] = [
            [0, 0],
            [-1.23004150390625, -1.3499755859375],
            [0.9599609375, -0.97998046875],
            [0.92999267578125, 0.97998046875],
            [6.1500244140625, -3.05999755859375],
            [0.550048828125, 1.0400390625],
            [-0.53997802734375, 0.51995849609375],
            [0, 0],
            [1.19000244140625, -1.6300048828125],
            [1.16998291015625, 0.78997802734375],
            [-0.6700439453125, 1.1099853515625],
            [-0.44000244140625, 0.51995849609375],
            [0, 0],
            [-6.32000732421875, 3.27001953125],
            [-0.77996826171875, -1.77001953125],
            [-10.3200073242188, 6.08001708984375],
            [-0.91998291015625, -1.75],
            [-11.3399658203125, 6.17999267578125],
            [-0.300048828125, -1.7900390625],
            [-3.489990234375, -1.6300048828125],
            [-4.05999755859375, 1.74005126953125],
            [-1.16998291015625, -1.26995849609375],
            [-5.6199951171875, 5.92999267578125],
            [-1.38996887207031, -0.5999755859375],
            [-1.36997985839844, -0.280029296875],
            [-2, 6.95001220703125],
            [-1.5899658203125, -1.02001953125],
            [-2.17999267578125, -0.47998046875],
            [-4.12994384765625, 8.35003662109375],
            [-2.30999755859375, -1.3900146484375],
            [-4.39990234375, 10.27001953125],
            [-2.760009765625, -1.17999267578125],
            [-4, 2.1400146484375],
            [-1.35009765625, 2.07000732421875]
        ];
        const outTangents: [number, number][] = [
            [1.3900146484375, 0.90997314453125],
            [0.8399658203125, 0.92999267578125],
            [-1.08001708984375, 1.09002685546875],
            [-4.6300048828125, -4.8699951171875],
            [-1.0999755859375, 0.55999755859375],
            [-0.469970703125, -0.8699951171875],
            [0, 0],
            [-1.44000244140625, 0.9599609375],
            [-0.71002197265625, 0.989990234375],
            [-1.27996826171875, -0.8599853515625],
            [0.3399658203125, -0.55999755859375],
            [0, 0],
            [4.010009765625, 6.219970703125],
            [1.8699951171875, -0.97003173828125],
            [4.8499755859375, 11.0599975585938],
            [1.6300048828125, -0.9599609375],
            [6.07000732421875, 11.56005859375],
            [1.62005615234375, -0.8800048828125],
            [0.67999267578125, 4.03997802734375],
            [4.07000732421875, 1.90997314453125],
            [1.510009765625, -0.63995361328125],
            [5.42999267578125, 5.9000244140625],
            [1.00001525878906, -1.05999755859375],
            [1.27001953125, 0.55999755859375],
            [7.1099853515625, 1.42999267578125],
            [0.47998046875, -1.69000244140625],
            [1.85003662109375, 1.20001220703125],
            [8.45001220703125, 1.8800048828125],
            [1.21002197265625, -2.44000244140625],
            [9.5899658203125, 5.760009765625],
            [1.22998046875, -2.8699951171875],
            [4.25, 1.82000732421875],
            [2.5, -1.3399658203125],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Explosion_Piece_01',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [0.295, -14.0068]
        );
    };

    const createExplosionPiece02 = () => {
        const vertices: [number, number][] = [
            [114.330078125, -45.4299926757812],
            [-76.75, -45.4299926757812],
            [-76.5800170898438, -45.3699951171875],
            [-75.010009765625, -42.9299926757812],
            [-77.8599853515625, -41.8099975585938],
            [-83.260009765625, -43.280029296875],
            [-93.989990234375, -40.4600219726562],
            [-96.8699951171875, -40.3099975585938],
            [-96.4400024414062, -43.3300170898438],
            [-93.4000244140625, -45.4299926757812],
            [-113.830017089844, -45.4299926757812],
            [-113.070007324219, -35.5599975585938],
            [-111.919982910156, -33.4299926757812],
            [-111.289978027344, -32.530029296875],
            [-28.75, -32.530029296875],
            [-28.0399780273438, -33.4299926757812],
            [-10.0599975585938, -39.52001953125],
            [-3.05999755859375, -37.75],
            [-1.75, -35.3699951171875],
            [-4.04998779296875, -34.1099853515625],
            [-9.84002685546875, -35.6300048828125],
            [-23.4299926757812, -32.530029296875],
            [-22.22998046875, -33.4299926757812],
            [30.2999877929688, -32.530029296875],
            [30.7999877929688, -33.4299926757812],
            [31.6199951171875, -34.010009765625],
            [40.6099853515625, -35.9400024414062],
            [48.0700073242188, -33.4299926757812],
            [49.3200073242188, -32.530029296875],
            [111.859985351562, -32.530029296875],
            [112.510009765625, -33.4299926757812],
            [114.75, -41.8400268554688]
        ];
        const inTangents: [number, number][] = [
            [0.25, 1.13995361328125],
            [0, 0],
            [-0.05999755859375, -0.02001953125],
            [0.41998291015625, -1.27001953125],
            [1.3499755859375, 0.45001220703125],
            [1.83001708984375, 0.27001953125],
            [3.0999755859375, -2.71002197265625],
            [0.94000244140625, 1],
            [-0.989990234375, 0.8800048828125],
            [-1.04998779296875, 0.54998779296875],
            [0, 0],
            [-1.3499755859375, -3.11004638671875],
            [-0.44000244140625, -0.6700439453125],
            [-0.22003173828125, -0.28997802734375],
            [0, 0],
            [-0.25, 0.28997802734375],
            [-6.5999755859375, -1.08001708984375],
            [-2.27001953125, -0.85003662109375],
            [1.16998291015625, 0.199951171875],
            [0.3800048828125, -1.1600341796875],
            [2.02001953125, 0.28997802734375],
            [3.51995849609375, -2.3800048828125],
            [0.3900146484375, -0.3299560546875],
            [0, 0],
            [-0.26995849609375, 0.25994873046875],
            [-0.32000732421875, 0.15997314453125],
            [-3.89996337890625, -0.010009765625],
            [-2.3900146484375, -1.59002685546875],
            [-0.4100341796875, -0.3299560546875],
            [0, 0],
            [-0.199951171875, 0.30999755859375],
            [0.090087890625, 3.23004150390625]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [0.05999755859375, 0.01995849609375],
            [1.1700439453125, 0.44000244140625],
            [-0.45001220703125, 1.3499755859375],
            [-1.77001953125, -0.60003662109375],
            [-3.92999267578125, -0.55999755859375],
            [-0.96002197265625, 0.84002685546875],
            [-1.05999755859375, -1.11004638671875],
            [0.97003173828125, -0.8599853515625],
            [0, 0],
            [-0.76995849609375, 3.25994873046875],
            [0.33001708984375, 0.75],
            [0, 0],
            [0.20001220703125, 0.30999755859375],
            [0.219970703125, -0.29998779296875],
            [3.8699951171875, -4.52001953125],
            [2.3800048828125, 0.3800048828125],
            [1.08001708984375, 0.39996337890625],
            [-0.33001708984375, 0.97998046875],
            [-1.85003662109375, -0.62005615234375],
            [-4.64996337890625, -0.67999267578125],
            [-0.4100341796875, 0.26995849609375],
            [0, 0],
            [0.04998779296875, -0.3399658203125],
            [0.22003173828125, -0.23004150390625],
            [2.47003173828125, -1.239990234375],
            [2.510009765625, 0.03997802734375],
            [0.41998291015625, 0.27996826171875],
            [0, 0],
            [0.2301025390625, -0.28997802734375],
            [1.56005859375, -2.36004638671875],
            [-0.0400390625, -1.25]
        ];

        createPathGrp(
            contents,
            'Explosion_Piece_02',
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

    const createExplosionPiece03 = () => {
        const vertices: [number, number][] = [
            [105.625, -2.11001586914062],
            [103.244995117188, -4.64999389648438],
            [101.855102539062, -9.47000122070312],
            [63.6050415039062, -9.47000122070312],
            [68.0550537109375, -6.52999877929688],
            [69.0250244140625, -3.19998168945312],
            [65.625, -3.60000610351562],
            [53.6749877929688, -7.86996459960938],
            [46.0549926757812, -6.45999145507812],
            [43.3550415039062, -7.48001098632812],
            [43.864990234375, -9.47000122070312],
            [-101.974975585938, -9.47000122070312],
            [-103.114990234375, -5.67996215820312],
            [-105.945007324219, -1.92996215820312],
            [-114.234985351562, 9.47000122070312],
            [-94.9549560546875, 9.47000122070312],
            [-86.3150024414062, 6.88998413085938],
            [-76.8150024414062, 8.75003051757812],
            [-75.60498046875, 9.47000122070312],
            [114.234985351562, 9.47000122070312]
        ];
        const inTangents: [number, number][] = [
            [4.9400634765625, 2.55999755859375],
            [0.239990234375, 1.57000732421875],
            [0.64990234375, 1.42999267578125],
            [0, 0],
            [-1.2900390625, -1.16998291015625],
            [1.18994140625, -1.41998291015625],
            [1.0499267578125, 0.96002197265625],
            [4.760009765625, 0.03997802734375],
            [2.58001708984375, -0.96002197265625],
            [0.469970703125, 1.20001220703125],
            [-0.5899658203125, 0.47003173828125],
            [0, 0],
            [0.20001220703125, -1.35003662109375],
            [1.74005126953125, -0.84002685546875],
            [0.8900146484375, -4.82000732421875],
            [0, 0],
            [-2.8699951171875, 0.02001953125],
            [-2.8599853515625, -1.10003662109375],
            [-0.29998779296875, -0.29998779296875],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [-1.1099853515625, -0.5699462890625],
            [-0.27001953125, -1.77996826171875],
            [0, 0],
            [1.64996337890625, 0.7900390625],
            [1.010009765625, 0.92999267578125],
            [-1.18994140625, 1.42999267578125],
            [-3.26995849609375, -2.989990234375],
            [-2.3499755859375, 0.03997802734375],
            [-1.239990234375, 0.47003173828125],
            [-0.35003662109375, -0.88995361328125],
            [0, 0],
            [-0.54998779296875, 1.16998291015625],
            [-0.29998779296875, 1.989990234375],
            [-4.42999267578125, 2.14996337890625],
            [0, 0],
            [2.739990234375, -1.80999755859375],
            [3.71002197265625, 0.02001953125],
            [0.489990234375, 0.17999267578125],
            [0, 0],
            [-0.8399658203125, -5.04998779296875]
        ];

        createPathGrp(
            contents,
            'Explosion_Piece_03',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [0.235, -54.12]
        );
    };

    const createExplosionPiece04 = () => {
        const vertices: [number, number][] = [
            [89.2799072265625, -1.41500854492188],
            [86.4100341796875, -4.19503784179688],
            [85.9998779296875, -7.78500366210938],
            [-33.8400268554688, -7.78500366210938],
            [-31.7200317382812, -7.15499877929688],
            [-30.0800170898438, -4.75503540039062],
            [-32.320068359375, -3.37503051757812],
            [-39.06005859375, -4.96499633789062],
            [-56.4700317382812, 1.25497436523438],
            [-59.27001953125, 1.87496948242188],
            [-59.3400268554688, -1.20498657226562],
            [-49.8800659179688, -7.78500366210938],
            [-85.9200439453125, -7.78500366210938],
            [-86.2600708007812, -4.54501342773438],
            [-89.5100708007812, -1.38504028320312],
            [-102.410034179688, 7.78500366210938],
            [43.2599487304688, 7.78500366210938],
            [44.8199462890625, 6.02499389648438],
            [65.8699951171875, 7.78500366210938],
            [102.410034179688, 7.78500366210938]
        ];
        const inTangents: [number, number][] = [
            [6.5400390625, 0.3499755859375],
            [0.10986328125, 2.010009765625],
            [0.2100830078125, 1.15997314453125],
            [0, 0],
            [-0.70001220703125, -0.23004150390625],
            [0.3199462890625, -1.29998779296875],
            [2.33001708984375, 0.27996826171875],
            [1.1600341796875, 0.10003662109375],
            [4.51995849609375, -5.64996337890625],
            [1.1099853515625, 0.8599853515625],
            [-0.79998779296875, 1.01995849609375],
            [-3.66998291015625, 1.19000244140625],
            [0, 0],
            [0.0400390625, -1.0999755859375],
            [2.25, -0.1199951171875],
            [1.8499755859375, -5.300048828125],
            [0, 0],
            [-0.8800048828125, 0.39996337890625],
            [-5.9400634765625, -3.84002685546875],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [-1.949951171875, -0.10003662109375],
            [-0.06005859375, -1.22998046875],
            [0, 0],
            [0.7099609375, 0.19000244140625],
            [1.19000244140625, 0.38995361328125],
            [-0.260009765625, 1.030029296875],
            [-2.14996337890625, -0.69000244140625],
            [-6.8299560546875, -0.80999755859375],
            [-0.780029296875, 0.97998046875],
            [-1.20001220703125, -0.94000244140625],
            [2.57000732421875, -3.2900390625],
            [0, 0],
            [-0.19000244140625, 1.05999755859375],
            [-0.0899658203125, 2.3599853515625],
            [-6.14996337890625, 0.32000732421875],
            [0, 0],
            [0.02001953125, -0.80999755859375],
            [6.3599853515625, -2.91998291015625],
            [0, 0],
            [-2.02001953125, -5.60003662109375]
        ];

        createPathGrp(
            contents,
            'Explosion_Piece_04',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [0.17, -70.155]
        );
    };

    const createExplosionPiece05 = () => {
        const vertices: [number, number][] = [
            [71.4999389648438, -9.96499633789062],
            [49.0499877929688, -9.96499633789062],
            [45.2899780273438, -7.87496948242188],
            [40.8999633789062, -8.77499389648438],
            [40.0399780273438, -9.96499633789062],
            [21.3599853515625, -9.96499633789062],
            [26.3000030517578, -6.23501586914062],
            [27.8800048828125, -4.20498657226562],
            [27.4599761962891, -1.72500610351562],
            [24.9599609375, -1.97500610351562],
            [2.00994873046875, -7.41500854492188],
            [1.3299560546875, -7.24502563476562],
            [-1.71002197265625, -8.34500122070312],
            [-1.4000244140625, -9.96499633789062],
            [-39.9500122070312, -9.96499633789062],
            [-41.2100219726562, -8.30502319335938],
            [-44.9400024414062, -7.71499633789062],
            [-48.760009765625, -9.96499633789062],
            [-71.0900268554688, -9.96499633789062],
            [-86.0700073242188, 9.96499633789062],
            [-51.7100219726562, 9.96499633789062],
            [-44.8900146484375, 8.23501586914062],
            [-31.760009765625, 9.92501831054688],
            [-31.6500244140625, 9.96499633789062],
            [86.0700073242188, 9.96499633789062]
        ];
        const inTangents: [number, number][] = [
            [7.4400634765625, 3.53997802734375],
            [0, 0],
            [1.22998046875, -0.81005859375],
            [1.260009765625, 1.8699951171875],
            [0.30000305175781, 0.3900146484375],
            [0, 0],
            [-1.52001953125, -1.54998779296875],
            [-0.48004150390625, -0.71002197265625],
            [0.83000183105469, -0.66998291015625],
            [0.6600341796875, 0.80999755859375],
            [8.6400146484375, -2.3800048828125],
            [0.21002197265625, -0.0899658203125],
            [0.44000244140625, 1.510009765625],
            [-0.3699951171875, 0.3900146484375],
            [0, 0],
            [0.40997314453125, -0.5699462890625],
            [1.53997802734375, 1.07000732421875],
            [1.29998779296875, 0.6300048828125],
            [0, 0],
            [1.22998046875, -8.82000732421875],
            [0, 0],
            [-2.41998291015625, 0.26995849609375],
            [-4.280029296875, -1.3900146484375],
            [-0.02996826171875, -0.010009765625],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [-1.27001953125, 0.59002685546875],
            [-2, 1.30999755859375],
            [-0.27996826171875, -0.4100341796875],
            [0, 0],
            [1.760009765625, 0.95001220703125],
            [0.59996032714844, 0.61004638671875],
            [0.62001037597656, 0.91998291015625],
            [-0.88002014160156, 0.72003173828125],
            [-6.25, -7.77996826171875],
            [-0.22998046875, 0.05999755859375],
            [-1.3599853515625, 0.57000732421875],
            [-0.21002197265625, -0.719970703125],
            [0, 0],
            [-0.42999267578125, 0.53997802734375],
            [-1.1099853515625, 1.550048828125],
            [-1.239990234375, -0.8699951171875],
            [0, 0],
            [-8.05999755859375, 3.72998046875],
            [0, 0],
            [2.1099853515625, -0.9000244140625],
            [4.489990234375, -0.52001953125],
            [0.03997802734375, 0.010009765625],
            [0, 0],
            [-1.4100341796875, -9.30999755859375]
        ];

        createPathGrp(
            contents,
            'Explosion_Piece_05',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [0.21, -87.235]
        );
    };

    const createExplosionPiece06 = () => {
        const vertices: [number, number][] = [
            [45.1949768066406, 8.24830627441406],
            [40.8049621582031, 7.34828186035156],
            [31.1349792480469, -2.12174987792969],
            [-8.66500854492188, -10.8117523193359],
            [-41.3050231933594, 7.81825256347656],
            [-45.0350036621094, 8.40827941894531],
            [-59.2350158691406, 3.55830383300781],
            [-78.8450012207031, 11.4983062744141],
            [22.3349914550781, 11.4983062744141],
            [1.91494750976562, 8.70826721191406],
            [1.23495483398438, 8.87825012207031],
            [-1.80502319335938, 7.77827453613281],
            [0.03500366210938, 5.32826232910156],
            [10.5449523925781, 3.52827453613281],
            [26.2049865722656, 9.88825988769531],
            [27.4949645996094, 11.4983062744141],
            [78.8450012207031, 11.4983062744141]
        ];
        const inTangents: [number, number][] = [
            [11.6599731445312, -7.6400146484375],
            [1.260009765625, 1.8699951171875],
            [3.78997802734375, 2.57000732421875],
            [14.2699584960938, -2.0699462890625],
            [8.03997802734375, -11.1699829101562],
            [1.53997802734375, 1.07000732421875],
            [4.5899658203125, 0.0699462890625],
            [4.8800048828125, -4.8900146484375],
            [0, 0],
            [7.52001953125, -2.07000732421875],
            [0.21002197265625, -0.0899658203125],
            [0.44000244140625, 1.510009765625],
            [-1.280029296875, 0.4200439453125],
            [-3.719970703125, 0.07000732421875],
            [-4.34002685546875, -4.42999267578125],
            [-0.3900146484375, -0.57000732421875],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [-1.99998474121094, 1.30999755859375],
            [-2.5799560546875, -3.78997802734375],
            [-12.0900268554688, -8.22998046875],
            [-13.2200317382812, 1.9200439453125],
            [-1.1099853515625, 1.550048828125],
            [-4.5400390625, -3.16998291015625],
            [-7.82000732421875, 0.02996826171875],
            [0, 0],
            [-5.83000183105469, -5.10003662109375],
            [-0.22998046875, 0.05999755859375],
            [-1.3599853515625, 0.57000732421875],
            [-0.40997314453125, -1.4000244140625],
            [3.3599853515625, -1.1099853515625],
            [5.9100341796875, 0.1199951171875],
            [0.47998046875, 0.489990234375],
            [0, 0],
            [-8.280029296875, -8.5400390625]
        ];

        createPathGrp(
            contents,
            'Explosion_Piece_06',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [0.3051, -103.3583]
        );
    };

    const createExplosionPiece07 = () => {
        const vertices: [number, number][] = [
            [21.7380218505859, -17.029052734375],
            [22.3280487060547, 0.55096435546875],
            [23.5980072021484, 11.9509887695312],
            [24.5480194091797, 13.5609741210938],
            [25.6380462646484, 13.781005859375],
            [26.3780364990234, 13.5809936523438],
            [26.3780364990234, 19.6909790039062],
            [24.5480194091797, 18.7509765625],
            [-13.7319488525391, 26.8109741210938],
            [-14.2419586181641, 27.490966796875],
            [-26.3319854736328, 21.781005859375],
            [-27.3219757080078, 20.0809936523438],
            [-21.3319854736328, -11.1790161132812],
            [-19.7220001220703, -26.1090087890625],
            [-18.2119903564453, -27.4590454101562],
            [-8.65199279785156, -26.4490356445312],
            [-7.17195129394531, -24.72900390625],
            [-8.21199035644531, -13.759033203125],
            [-6.64198303222656, -10.6790161132812],
            [-4.47200012207031, -13.1190185546875],
            [-3.51197814941406, -24.0989990234375],
            [-1.46199035644531, -26.01904296875],
            [-0.00196838378906, -25.9390258789062],
            [24.5480194091797, -26.0390014648438],
            [27.4780120849609, -26.2490234375],
            [27.0780487060547, -17.1589965820312],
            [25.3680267333984, -18.6090087890625],
            [24.5480194091797, -19.759033203125],
            [23.5980072021484, -19.9390258789062]
        ];
        const inTangents: [number, number][] = [
            [-0.04998779296875, -1.41998291015625],
            [-0.30999755859375, -5.8599853515625],
            [-0.75, -3.760009765625],
            [-0.5, -0.30999755859375],
            [-0.44000244140625, 0.02996826171875],
            [-0.21002197265625, 0.1099853515625],
            [0, 0],
            [0.6199951171875, 0.28997802734375],
            [8.67999267578125, -11.2999877929688],
            [0.15997314453125, -0.22998046875],
            [4.6199951171875, 0.6199951171875],
            [-0.32000732421875, 1.0999755859375],
            [-1.260009765625, 10.5599975585938],
            [-0.489990234375, 4.97998046875],
            [-1.2099609375, -0.15997314453125],
            [-3.19000244140625, -0.28997802734375],
            [0.15997314453125, -1.32000732421875],
            [0.3699951171875, -3.64996337890625],
            [-1.78997802734375, -0.21002197265625],
            [-0.19000244140625, 1.3900146484375],
            [-0.1400146484375, 3.66998291015625],
            [-1.64996337890625, -0.1099853515625],
            [-0.489990234375, -0.02001953125],
            [-8.16998291015625, 0.51995849609375],
            [-0.97998046875, 0.08001708984375],
            [0, 0],
            [0.79998779296875, 0.67999267578125],
            [0.47003173828125, 0.22998046875],
            [0.3900146484375, 0]
        ];
        const outTangents: [number, number][] = [
            [0.19000244140625, 5.86004638671875],
            [0.2099609375, 3.80999755859375],
            [0.1500244140625, 0.72998046875],
            [0.28997802734375, 0.16998291015625],
            [0.27996826171875, -0.02001953125],
            [0, 0],
            [-0.60003662109375, -0.33001708984375],
            [-12.6300048828125, -5.94000244140625],
            [-0.1800537109375, 0.22998046875],
            [-3.45001220703125, -3.1300048828125],
            [-1.21002197265625, -0.1600341796875],
            [2.96002197265625, -10.239990234375],
            [0.59002685546875, -4.97003173828125],
            [0.10003662109375, -1.07000732421875],
            [3.17999267578125, 0.4200439453125],
            [1.1300048828125, 0.10003662109375],
            [-0.4300537109375, 3.64996337890625],
            [-0.1400146484375, 1.41998291015625],
            [1.6099853515625, 0.20001220703125],
            [0.49005126953125, -3.6500244140625],
            [0.05999755859375, -1.3900146484375],
            [0.489990234375, 0.030029296875],
            [8.20001220703125, 0.47003173828125],
            [0.97998046875, -0.05999755859375],
            [0, 0],
            [-0.1300048828125, -0.05999755859375],
            [-0.1199951171875, -0.510009765625],
            [-0.25, -0.1199951171875],
            [-1.79998779296875, 0.030029296875]
        ];

        createPathGrp(
            contents,
            'Explosion_Piece_07',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-11.703, 72.359]
        );
    };

    const createExplosionPiece08 = () => {
        const vertices: [number, number][] = [
            [12.1455230712891, 19.8851165771484],
            [10.7055206298828, 13.9751434326172],
            [4.57551574707031, -25.1448516845703],
            [2.45552062988281, -27.4548492431641],
            [-12.2744598388672, -26.0248565673828],
            [-12.2744598388672, -19.7448883056641],
            [-11.3044281005859, -17.0648956298828],
            [-9.50444030761719, 11.2151336669922],
            [-9.45445251464844, 11.8050994873047],
            [-11.1844329833984, 13.7951507568359],
            [-12.2744598388672, 13.5751190185547],
            [-12.2744598388672, 18.7651214599609],
            [-1.61448669433594, 27.4951019287109],
            [10.9255523681641, 21.6951141357422]
        ];
        const inTangents: [number, number][] = [
            [0.36004638671875, 1.22998046875],
            [0.45001220703125, 1.97998046875],
            [1.33001708984375, 13.1499633789062],
            [2.19000244140625, -0.2900390625],
            [4.91998291015625, -0.30999755859375],
            [0, 0],
            [-0.02001953125, -1.1199951171875],
            [-1.55999755859375, -9.3699951171875],
            [-0.02001953125, -0.27996826171875],
            [1.199951171875, -0.10003662109375],
            [0.28997802734375, 0.16998291015625],
            [0, 0],
            [-2.77996826171875, -3.8599853515625],
            [-4.79998779296875, 0.58001708984375]
        ];
        const outTangents: [number, number][] = [
            [-0.55999755859375, -1.95001220703125],
            [-2.8800048828125, -12.9100341796875],
            [-0.1199951171875, -1.27001953125],
            [-4.89996337890625, 0.63995361328125],
            [0, 0],
            [0.8900146484375, 0.42999267578125],
            [0.15997314453125, 9.45001220703125],
            [0.01995849609375, 0.14996337890625],
            [-0.02001953125, 1.0400390625],
            [-0.44000244140625, 0.02996826171875],
            [0, 0],
            [4.17999267578125, 1.969970703125],
            [3.57000732421875, -3.260009765625],
            [1.19000244140625, -0.1400146484375]
        ];

        createPathGrp(
            contents,
            'Explosion_Piece_08',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [26.5845, 72.3448]
        );
    };

    const createExplosionPiece09 = () => {
        const vertices: [number, number][] = [
            [110.390014648438, 4.06050109863281],
            [108.9599609375, 3.26051330566406],
            [82.5899658203125, 0.56050109863281],
            [79.1700439453125, 0.11048889160156],
            [72.5299072265625, -4.05949401855469],
            [62.7899780273438, -4.05949401855469],
            [60.0599365234375, -3.28947448730469],
            [56.4199829101562, -4.05949401855469],
            [43.2399291992188, -4.05949401855469],
            [44.2999267578125, -2.77946472167969],
            [45.1399536132812, -1.09947204589844],
            [43.8399658203125, 0.89051818847656],
            [41.7699584960938, 0.21052551269531],
            [33.3999633789062, -1.34947204589844],
            [30.3799438476562, -1.90946960449219],
            [30.719970703125, -4.05949401855469],
            [10.7799682617188, -4.05949401855469],
            [10.8199615478516, -1.53947448730469],
            [8.12994384765625, -1.44950866699219],
            [6.5699462890625, -2.83946228027344],
            [4.53997802734375, -4.05949401855469],
            [-0.88006591796875, -4.05949401855469],
            [-2.300048828125, -3.29948425292969],
            [-5.300048828125, -3.74949645996094],
            [-5.4500732421875, -4.05949401855469],
            [-34.31005859375, -4.05949401855469],
            [-33.9900512695312, -1.92948913574219],
            [-36.570068359375, -1.14945983886719],
            [-38.6600341796875, -2.17948913574219],
            [-44.9700317382812, -0.38951110839844],
            [-48.0800170898438, -2.57951354980469],
            [-47.8400268554688, 0.66053771972656],
            [-46.8500366210938, -4.05949401855469],
            [-56.280029296875, -4.05949401855469],
            [-59.8600463867188, -3.25950622558594],
            [-62.6500244140625, -4.05949401855469],
            [-72.4100341796875, -4.05949401855469],
            [-78.9900512695312, 0.05049133300781],
            [-81.9400634765625, 0.71052551269531],
            [-97.7000732421875, -0.39945983886719],
            [-111.170043945312, 4.72053527832031],
            [111.170043945312, 4.72053527832031]
        ];
        const inTangents: [number, number][] = [
            [0.179931640625, 0.1099853515625],
            [0.489990234375, 0.25],
            [9.1400146484375, -2.6099853515625],
            [1.099853515625, 1.1300048828125],
            [2.340087890625, 0.71002197265625],
            [3.37005615234375, -0.79998779296875],
            [0.9100341796875, -0.29998779296875],
            [1.00994873046875, 1.20001220703125],
            [0, 0],
            [-0.3299560546875, -0.47003173828125],
            [-0.02996826171875, -0.530029296875],
            [0.78997802734375, -0.280029296875],
            [0.59002685546875, 0.6300048828125],
            [4.47998046875, -2.1700439453125],
            [0.71002197265625, 1.29998779296875],
            [-0.58001708984375, 0.53997802734375],
            [0, 0],
            [0.73997497558594, -0.79998779296875],
            [0.91998291015625, 0.800048828125],
            [0.54998779296875, 0.41998291015625],
            [0.68000793457031, 0.28997802734375],
            [1.84002685546875, -0.78997802734375],
            [0.47003173828125, -0.30999755859375],
            [0.77001953125, 1.27001953125],
            [0.0400390625, 0.10003662109375],
            [0, 0],
            [0.47003173828125, -0.83001708984375],
            [1.11004638671875, 0.55999755859375],
            [0.719970703125, 0.280029296875],
            [1.82000732421875, -2.41998291015625],
            [1.30999755859375, 0.8599853515625],
            [-0.780029296875, 1.1400146484375],
            [-0.44000244140625, 0.44000244140625],
            [0, 0],
            [1.66998291015625, 0.55999755859375],
            [0.91998291015625, 0.22003173828125],
            [3.0999755859375, -0.95001220703125],
            [2.05999755859375, -2.0899658203125],
            [1.20001220703125, 0.3900146484375],
            [5.34002685546875, -0.8900146484375],
            [4.3599853515625, -2.95001220703125],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [-0.469970703125, -0.27996826171875],
            [-8.4400634765625, -4.28997802734375],
            [-1.25, 0.35003662109375],
            [-2.070068359375, -2.1300048828125],
            [-3.0899658203125, -0.94000244140625],
            [-0.9100341796875, 0.21002197265625],
            [-1.65997314453125, 0.53997802734375],
            [0, 0],
            [0.3800048828125, 0.3800048828125],
            [0.3900146484375, 0.57000732421875],
            [-0.02996826171875, 1.0999755859375],
            [-0.82000732421875, 0.29998779296875],
            [-3.45001220703125, -3.6400146484375],
            [-0.510009765625, -0.94000244140625],
            [-1.22003173828125, 0.5899658203125],
            [0, 0],
            [0.74000549316406, 0.80999755859375],
            [-0.82002258300781, 0.8800048828125],
            [-0.52996826171875, -0.449951171875],
            [-0.66998291015625, -0.52001953125],
            [-1.77001953125, -0.77001953125],
            [-0.469970703125, 0.20001220703125],
            [-1.15997314453125, 0.75],
            [-0.05999755859375, -0.1099853515625],
            [0, 0],
            [0.59002685546875, 0.55999755859375],
            [-0.57000732421875, 1.010009765625],
            [-0.699951171875, -0.35003662109375],
            [-2.77001953125, -1.0999755859375],
            [-0.77001953125, 1.02001953125],
            [-1.4000244140625, -0.9100341796875],
            [0.37994384765625, -0.54998779296875],
            [0, 0],
            [-0.95001220703125, 1.16998291015625],
            [-0.94000244140625, -0.30999755859375],
            [-3.3800048828125, -0.80999755859375],
            [-2.30999755859375, 0.71002197265625],
            [-0.8800048828125, 0.8900146484375],
            [-5.14996337890625, -1.6300048828125],
            [-4.66998291015625, 0.77996826171875],
            [0, 0],
            [-0.4600830078125, -0.3900146484375]
        ];

        createPathGrp(
            contents,
            'Explosion_Piece_09',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [0.17, 109.5995]
        );
    };

    const createExplosionPiece10 = () => {
        const vertices: [number, number][] = [
            [56.2900085449219, 6.40249633789062],
            [55.9999694824219, 6.04251098632812],
            [26.3699645996094, 4.48251342773438],
            [22.2300109863281, 4.09249877929688],
            [-22.3100280761719, 4.02249145507812],
            [-26.5700378417969, 4.33248901367188],
            [-56.0899963378906, 5.97250366210938],
            [-56.4100036621094, 6.40249633789062],
            [-57.8500061035156, 7.43252563476562],
            [-47.8800354003906, 7.43252563476562],
            [-46.9800109863281, 6.40249633789062],
            [-41.1900329589844, 3.94247436523438],
            [-34.8200378417969, 6.10250854492188],
            [-34.4400329589844, 6.40249633789062],
            [-33.8800354003906, 7.43252563476562],
            [-4.79000854492188, 7.43252563476562],
            [-5.43002319335938, 6.71249389648438],
            [-5.58004760742188, 6.40249633789062],
            [-4.45004272460938, 3.98251342773438],
            [1.68997192382812, 2.05252075195312],
            [10.6499938964844, 6.40249633789062],
            [11.1999816894531, 7.43252563476562],
            [29.9899597167969, 7.43252563476562],
            [30.5899963378906, 6.40249633789062],
            [31.4999694824219, 5.74252319335938],
            [43.1099548339844, 6.40249633789062],
            [43.9800109863281, 7.43252563476562],
            [57.8500061035156, 7.43252563476562]
        ];
        const inTangents: [number, number][] = [
            [0.5, 0.59002685546875],
            [0.10003662109375, 0.1300048828125],
            [8.36004638671875, -8.95001220703125],
            [1.5, 2.239990234375],
            [10.1500244140625, -15.2999877929688],
            [1.82000732421875, 2.17999267578125],
            [7.7099609375, -11.3300170898438],
            [0.1099853515625, -0.1300048828125],
            [0.53997802734375, -0.1400146484375],
            [0, 0],
            [-0.32000732421875, 0.32000732421875],
            [-2.3299560546875, 0.07000732421875],
            [-1.91998291015625, -1.260009765625],
            [-0.1099853515625, -0.1099853515625],
            [-0.04998779296875, -0.3900146484375],
            [0, 0],
            [0.20001220703125, 0.33001708984375],
            [0.0400390625, 0.10003662109375],
            [-0.91998291015625, 0.5899658203125],
            [-2.260009765625, -0.010009765625],
            [-2.41998291015625, -2.6300048828125],
            [-0.05999755859375, -0.35003662109375],
            [0, 0],
            [-0.32000732421875, 0.29998779296875],
            [-0.3399658203125, 0.199951171875],
            [-2.94000244140625, -2.94000244140625],
            [-0.27001953125, -0.3699951171875],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [-0.10003662109375, -0.1099853515625],
            [-7.14996337890625, -9.79998779296875],
            [-1.79998779296875, 1.92999267578125],
            [-10.260009765625, -15.3399658203125],
            [-1.57000732421875, 2.35003662109375],
            [-5.8699951171875, -7],
            [-0.11004638671875, 0.15997314453125],
            [-0.45001220703125, 0.55999755859375],
            [0, 0],
            [0.280029296875, -0.3699951171875],
            [1.53997802734375, -1.53997802734375],
            [2.3599853515625, 0.09002685546875],
            [0.1400146484375, 0.0899658203125],
            [0.32000732421875, 0.29998779296875],
            [0, 0],
            [-0.22998046875, -0.1600341796875],
            [-0.05999755859375, -0.1099853515625],
            [-0.43994140625, -1.04998779296875],
            [1.86004638671875, -1.22003173828125],
            [3.66998291015625, 0.03997802734375],
            [0.29998779296875, 0.33001708984375],
            [0, 0],
            [0.05999755859375, -0.4000244140625],
            [0.25, -0.239990234375],
            [4.21002197265625, -2.58001708984375],
            [0.30999755859375, 0.30999755859375],
            [0, 0],
            [-0.57000732421875, -0.11004638671875]
        ];

        createPathGrp(
            contents,
            'Explosion_Piece_10',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [0.24, 98.6225]
        );
    };

    const createExplosionPiece11 = () => {
        const vertices: [number, number][] = [
            [-28.2727661132812, -16.1587066650391],
            [-12.9617767333984, -15.0856475830078],
            [-11.1519470214844, -14.5056610107422],
            [10.7643737792969, -14.50048828125],
            [12.3548583984375, -15.1910858154297],
            [27.89013671875, -16.0926666259766],
            [28.0570983886719, -15.0346527099609],
            [29.3995361328125, 12.6181793212891],
            [27.4664459228516, 14.8464813232422],
            [-11.2006225585938, 16.0031280517578],
            [-13.4854888916016, 13.60302734375],
            [-13.3447723388672, 5.39292907714844],
            [-15.3209991455078, 3.06687927246094],
            [-17.1083068847656, 5.36228942871094],
            [-17.1825256347656, 14.0453491210938],
            [-18.7181396484375, 15.6406860351562],
            [-28.2946319580078, 14.7857055664062],
            [-29.3617553710938, 12.9909362792969]
        ];
        const inTangents: [number, number][] = [
            [-0.37297058105469, 9.92411804199219],
            [-5.18212890625, 1.77955627441406],
            [-0.54779052734375, -0.45645141601562],
            [-7.01991271972656, 5.82575988769531],
            [-0.77557373046875, -0.28988647460938],
            [-5.13633728027344, 2.48847961425781],
            [-0.00936889648438, -0.28410339355469],
            [-0.80064392089844, -9.198974609375],
            [1.64608764648438, -0.160888671875],
            [12.9140930175781, 0.37582397460938],
            [-0.14994812011719, 1.88972473144531],
            [-0.03488159179688, 2.73789978027344],
            [1.47885131835938, -0.06475830078125],
            [0.00318908691406, -1.26437377929688],
            [1.36764526367188, 0.15452575683594],
            [-0.02188110351562, -2.89396667480469],
            [3.19825744628906, 0.18855285644531],
            [-0.02896118164062, 0.79248046875]
        ];
        const outTangents: [number, number][] = [
            [5.03211975097656, 2.60604858398438],
            [0.88777160644531, -0.30485534667969],
            [7.00350952148438, 5.83576965332031],
            [0.46510314941406, -0.38600158691406],
            [5.24858093261719, 1.96176147460938],
            [0.07981872558594, 0.49208068847656],
            [0.30409240722656, 9.22482299804688],
            [0.13887023925781, 1.59544372558594],
            [-12.8667144775391, 1.25765991210938],
            [-1.77713012695312, -0.05172729492188],
            [0.21607971191406, -2.72325134277344],
            [0.01731872558594, -1.35948181152344],
            [-1.31382751464844, 0.05751037597656],
            [-0.00729370117188, 2.89445495605469],
            [0.00852966308594, 1.12889099121094],
            [-3.18424987792969, -0.35984802246094],
            [-1.46568298339844, -0.08641052246094],
            [0.35122680664062, -9.61302185058594]
        ];

        createPathGrp(
            contents,
            'Explosion_Piece_11',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [0.43, 19.2967]
        );
    };

    const createRing = () => {
        const vertices: [number, number][] = [
            [0.954345703125, 8.27532958984375],
            [40.2836761474609, 4.97247314453125],
            [48.3975372314453, 2.07180786132812],
            [48.2118530273438, -4.63456726074219],
            [35.4246520996094, -8.20614624023438],
            [33.3566436767578, -8.59577941894531],
            [32.5840759277344, -11.2622528076172],
            [33.9565124511719, -11.8307189941406],
            [53.1769561767578, -6.84623718261719],
            [58.4500122070312, -3.84767150878906],
            [58.4181365966797, 1.57713317871094],
            [50.5038146972656, 5.53985595703125],
            [22.2700805664062, 10.9974670410156],
            [-25.7621154785156, 10.6130828857422],
            [-52.0310821533203, 4.97695922851562],
            [-58.5754547119141, 1.41197204589844],
            [-58.6000366210938, -3.68836975097656],
            [-50.9812774658203, -7.70611572265625],
            [-33.9304504394531, -11.8204345703125],
            [-32.4303588867188, -11.2254486083984],
            [-33.3431701660156, -8.56367492675781],
            [-40.4860534667969, -7.24737548828125],
            [-48.0166931152344, -4.76589965820312],
            [-48.1631164550781, 2.16665649414062],
            [-35.4322814941406, 5.88699340820312]
        ];
        const inTangents: [number, number][] = [
            [-12.7251434326172, -0.14956665039062],
            [-13.2477569580078, 2.77262878417969],
            [-2.477294921875, 1.5625],
            [3.34788513183594, 1.85023498535156],
            [4.38568115234375, 0.75296020507812],
            [0.63351440429688, 0.26396179199219],
            [0.06996154785156, 0.90861511230469],
            [-0.51518249511719, -0.08920288085938],
            [-6.16804504394531, -2.58331298828125],
            [-1.56190490722656, -1.32672119140625],
            [2.25221252441406, -1.81340026855469],
            [2.81478881835938, -0.97090148925781],
            [9.58039855957031, -0.88519287109375],
            [15.9946136474609, 1.79556274414062],
            [8.47288513183594, 3.19692993164062],
            [1.90739440917969, 1.66923522949219],
            [-2.01943969726562, 1.790283203125],
            [-2.71833801269531, 0.9903564453125],
            [-5.77314758300781, 0.99385070800781],
            [0.12469482421875, -1.28619384765625],
            [1.7674560546875, -0.33840942382812],
            [2.37196350097656, -0.48283386230469],
            [2.34906005859375, -1.28373718261719],
            [-3.50865173339844, -2.0692138671875],
            [-4.39556884765625, -0.68196105957031]
        ];
        const outTangents: [number, number][] = [
            [12.6242523193359, -0.31387329101562],
            [2.83430480957031, -0.59317016601562],
            [3.21640014648438, -2.02870178222656],
            [-3.96345520019531, -2.19044494628906],
            [-0.6932373046875, -0.11898803710938],
            [-1.26057434082031, -0.52525329589844],
            [-0.08302307128906, -1.07778930664062],
            [6.54255676269531, 1.13285827636719],
            [1.880126953125, 0.78742980957031],
            [2.21017456054688, 1.87742614746094],
            [-2.34068298339844, 1.88462829589844],
            [-9.15269470214844, 3.15702819824219],
            [-16.0165863037109, 1.47988891601562],
            [-8.93948364257812, -1.0035400390625],
            [-2.34539794921875, -0.88493347167969],
            [-2.03309631347656, -1.77922058105469],
            [2.20298767089844, -1.95297241210938],
            [5.52613830566406, -2.01325988769531],
            [0.52967834472656, -0.0911865234375],
            [-0.08737182617188, 0.90127563476562],
            [-2.37785339355469, 0.45524597167969],
            [-2.60350036621094, 0.52996826171875],
            [-3.58366394042969, 1.95843505859375],
            [3.91685485839844, 2.30996704101562],
            [11.7808990478516, 1.82777404785156]
        ];

        createPathGrp(
            contents,
            'Ring',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [0.225, 30.9717]
        );
    };

    createRing();
    createExplosionPiece11();
    createExplosionPiece10();
    createExplosionPiece09();
    createExplosionPiece08();
    createExplosionPiece07();
    createExplosionPiece06();
    createExplosionPiece05();
    createExplosionPiece04();
    createExplosionPiece03();
    createExplosionPiece02();
    createExplosionPiece01();
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer);
};

const createMedalIcon = (
    circleColor: ColorDropdown,
    iconColor: ColorDropdown,
    hasCircle: boolean,
    scale: boolean
): void => {
    const { layer, contents, circleColorRgb, iconColorRgb } = setUpIcon(
        'Medal',
        circleColor,
        iconColor
    );

    const createTopCenter = () => {
        const vertices: [number, number][] = [
            [-19.6257781982422, -1.31033325195312],
            [-19.6679992675781, -41.1187286376953],
            [-17.4409942626953, -43.3345489501953],
            [17.6442260742188, -43.3256683349609],
            [19.6681518554688, -41.3709564208984],
            [19.6239318847656, 38.9209442138672],
            [14.0281372070312, 43.1910705566406],
            [-14.2184143066406, 43.2376403808594],
            [-19.623291015625, 38.7232055664062]
        ];
        const inTangents: [number, number][] = [
            [0, 13.3445129394531],
            [0.07769775390625, 13.2690887451172],
            [-1.76240539550781, -0.01217651367188],
            [-11.6949157714844, 0.05999755859375],
            [0.00318908691406, -1.62200927734375],
            [0.00860595703125, -26.7639923095703],
            [2.58595275878906, 0.63461303710938],
            [9.41059875488281, -2.33746337890625],
            [0.00111389160156, 2.71623229980469]
        ];
        const outTangents: [number, number][] = [
            [0, -13.2695465087891],
            [-0.01040649414062, -1.77717590332031],
            [11.6946716308594, 0.08084106445312],
            [1.52314758300781, -0.0078125],
            [-0.0526123046875, 26.7638854980469],
            [-0.00083923339844, 2.61846923828125],
            [-9.4207763671875, -2.31193542480469],
            [-2.482421875, 0.61659240722656],
            [-0.0054931640625, -13.3445129394531]
        ];

        createPathGrp(
            contents,
            'Top_Center',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-0.0022, -53.2999]
        );
    };

    const createMedalCircle = () => {
        const vertices: [number, number][] = [
            [49.9103546142578, 0],
            [0, 49.9103546142578],
            [-49.9103546142578, 0],
            [0, -49.9103546142578]
        ];
        const inTangents: [number, number][] = [
            [0, -27.5647277832031],
            [27.5647277832031, 0],
            [0, 27.5647277832031],
            [-27.5647277832031, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 27.5647277832031],
            [-27.5647277832031, 0],
            [0, -27.5647277832031],
            [27.5647277832031, 0]
        ];

        createPathGrp(
            contents,
            'Medal_Circle',
            false,
            true,
            iconColorRgb,
            iconColorRgb,
            8,
            vertices,
            inTangents,
            outTangents,
            true,
            [0.0308, 46.7243]
        );
    };

    const createTopR01 = () => {
        const vertices: [number, number][] = [
            [-22.0496673583984, 29.9432373046875],
            [-22.0496673583984, 16.1437072753906],
            [-22.0888519287109, -27.7151489257812],
            [-19.9111633300781, -29.9430541992188],
            [20.1238861083984, -29.9365081787109],
            [22.0879821777344, -27.9779815673828],
            [22.0608825683594, -9.53533935546875],
            [21.0680084228516, -6.99064636230469],
            [-21.170654296875, 29.4073486328125]
        ];
        const inTangents: [number, number][] = [
            [0.52090454101562, -0.31455993652344],
            [0, 4.48233032226562],
            [0.06849670410156, 14.6193695068359],
            [-1.80349731445312, -0.01126098632812],
            [-13.3448333740234, 0.06752014160156],
            [0.0242919921875, -1.57113647460938],
            [-0.02365112304688, -6.14767456054688],
            [0.86778259277344, -0.74525451660156],
            [14.0751037597656, -12.1378479003906]
        ];
        const outTangents: [number, number][] = [
            [0, -4.83488464355469],
            [0, -14.6196746826172],
            [-0.008056640625, -1.7177734375],
            [13.3446655273438, 0.08332824707031],
            [1.57221984863281, -0.00794982910156],
            [-0.09503173828125, 6.14628601074219],
            [0.00389099121094, 1.00820922851562],
            [-14.0998992919922, 12.1089630126953],
            [-0.15742492675781, 0.1357421875]
        ];

        createPathGrp(
            contents,
            'Top_R_01',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [46.3738, -47.002]
        );
    };

    const createTopR02 = () => {
        const vertices: [number, number][] = [
            [-0.02409362792969, 7.46441650390625],
            [-20.2504577636719, 7.50099182128906],
            [-22.0826110839844, 5.64453125],
            [-22.0709686279297, -5.81597900390625],
            [-20.5231781005859, -7.50152587890625],
            [20.6045074462891, -7.48548889160156],
            [22.0787811279297, -6.20228576660156],
            [22.0841827392578, 6.15715026855469],
            [20.4273986816406, 7.47372436523438]
        ];
        const inTangents: [number, number][] = [
            [6.81716918945312, 0],
            [6.74124145507812, -0.08357238769531],
            [-0.03924560546875, 1.45408630371094],
            [0.06205749511719, 3.81959533691406],
            [-1.36520385742188, -0.00509643554688],
            [-13.7092437744141, 0.02198791503906],
            [0.02250671386719, -1.21623229980469],
            [-0.09732055664062, -4.11796569824219],
            [0.94796752929688, 0.00242614746094]
        ];
        const outTangents: [number, number][] = [
            [-6.74226379394531, 0],
            [-1.48716735839844, 0.0184326171875],
            [0.10310363769531, -3.81782531738281],
            [-0.01914978027344, -1.17739868164062],
            [13.7091064453125, 0.05119323730469],
            [0.95455932617188, -0.00152587890625],
            [-0.07627868652344, 4.11885070800781],
            [0.03363037109375, 1.422607421875],
            [-6.81712341308594, -0.01741027832031]
        ];

        createPathGrp(
            contents,
            'Top_R_02',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [46.3726, -89.1189]
        );
    };

    const createTopL01 = () => {
        const vertices: [number, number][] = [
            [22.0389251708984, 30.0352783203125],
            [8.10487365722656, 18.0421752929688],
            [-20.8432922363281, -6.91217041015625],
            [-22.0881958007812, -9.56674194335938],
            [-22.0818786621094, -28.2320098876953],
            [-20.4254608154297, -30.0352020263672],
            [20.2793731689453, -30.0049133300781],
            [22.0440826416016, -28.5579986572266],
            [22.0389251708984, -27.8842468261719]
        ];
        const inTangents: [number, number][] = [
            [0, -19.6973724365234],
            [9.66777038574219, 8.29667663574219],
            [4.513427734375, 3.893310546875],
            [-0.01203918457031, 1.17427062988281],
            [0.05619812011719, 6.22142028808594],
            [-1.50576782226562, -0.00750732421875],
            [-13.5683441162109, 0.01399230957031],
            [0.26876831054688, -1.54013061523438],
            [0, -0.22488403320312]
        ];
        const outTangents: [number, number][] = [
            [-4.89897155761719, -4.21601867675781],
            [-9.64668273925781, -8.32127380371094],
            [-0.8670654296875, -0.74409484863281],
            [0.06379699707031, -6.22128295898438],
            [-0.01145935058594, -1.26786804199219],
            [13.5680084228516, 0.06773376464844],
            [1.03623962402344, -0.00106811523438],
            [-0.0380859375, 0.21823120117188],
            [0, 19.111083984375]
        ];

        createPathGrp(
            contents,
            'Top_L_01',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-46.3657, -46.9041]
        );
    };

    const createTopL02 = () => {
        const vertices: [number, number][] = [
            [-0.20443725585938, 7.46730041503906],
            [-20.2047271728516, 7.49867248535156],
            [-22.0806427001953, 5.69866943359375],
            [-22.0654754638672, -5.98533630371094],
            [-20.5848999023438, -7.49403381347656],
            [20.5397644042969, -7.49919128417969],
            [22.0748901367188, -5.80177307128906],
            [22.0823516845703, 5.88299560546875],
            [20.4701080322266, 7.49595642089844]
        ];
        const inTangents: [number, number][] = [
            [6.8916015625, -0.00001525878906],
            [6.6661376953125, -0.07014465332031],
            [-0.04808044433594, 1.5372314453125],
            [0.06776428222656, 3.89405822753906],
            [-1.19532775878906, -0.00361633300781],
            [-13.7080841064453, 0.05233764648438],
            [0.01737976074219, -1.16139221191406],
            [-0.08137512207031, -3.89353942871094],
            [1.26969909667969, 0.01112365722656]
        ];
        const outTangents: [number, number][] = [
            [-6.6668701171875, 0.00001525878906],
            [-1.40322875976562, 0.0147705078125],
            [0.12171936035156, -3.89143371582031],
            [-0.0201416015625, -1.15721130371094],
            [13.7081604003906, 0.04154968261719],
            [1.38258361816406, -0.00527954101562],
            [-0.05827331542969, 3.89436340332031],
            [0.026611328125, 1.2733154296875],
            [-6.89106750488281, -0.06040954589844]
        ];

        createPathGrp(
            contents,
            'Top_L_02',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-46.3792, -89.1218]
        );
    };

    const createBadgeTop = () => {
        const vertices: [number, number][] = [
            [0, -26.1349792480469],
            [-40.9400024414062, 14.7049865722656],
            [-39.3300170898438, 26.1349792480469],
            [-15.4000244140625, 26.1349792480469],
            [-15.0800170898438, 22.3949890136719],
            [-20.6300048828125, 17.1050109863281],
            [-27.6099853515625, 11.0849914550781],
            [-28.7999877929688, 7.96499633789062],
            [-26.0999755859375, 6.38497924804688],
            [-10.8699951171875, 5.14498901367188],
            [-8.41998291015625, 3.44497680664062],
            [-2.6500244140625, -10.4150085449219],
            [-0.0999755859375, -12.8949890136719],
            [2.65997314453125, -10.3849792480469],
            [8.44000244140625, 3.46499633789062],
            [10.6699829101562, 5.13497924804688],
            [26.1300048828125, 6.38497924804688],
            [28.7999877929688, 8.00497436523438],
            [27.5900268554688, 11.1050109863281],
            [15.97998046875, 21.0450134277344],
            [15.0499877929688, 23.9250183105469],
            [15.5900268554688, 26.1349792480469],
            [39.3300170898438, 26.1349792480469],
            [40.9400024414062, 14.7049865722656]
        ];
        const inTangents: [number, number][] = [
            [22.5599975585938, -0.010009765625],
            [0.02001953125, -22.52001953125],
            [-1.04998779296875, -3.6300048828125],
            [0, 0],
            [0.280029296875, 1.1500244140625],
            [1.95001220703125, 1.719970703125],
            [2.3499755859375, 1.97998046875],
            [-0.45001220703125, 1.3399658203125],
            [-1.19000244140625, 0.10003662109375],
            [-5.08001708984375, 0.3499755859375],
            [-0.489990234375, 1.25],
            [-1.94000244140625, 4.6099853515625],
            [-1.58001708984375, 0.05999755859375],
            [-0.52996826171875, -1.260009765625],
            [-1.8800048828125, -4.6300048828125],
            [-1.260009765625, -0.08001708984375],
            [-5.1500244140625, -0.39996337890625],
            [-0.41998291015625, -1.27996826171875],
            [0.97998046875, -0.84002685546875],
            [3.9100341796875, -3.260009765625],
            [-0.33001708984375, -1.2900390625],
            [-0.1700439453125, -0.739990234375],
            [0, 0],
            [0.010009765625, 3.96002197265625]
        ];
        const outTangents: [number, number][] = [
            [-22.5599975585938, 0],
            [-0.010009765625, 3.96002197265625],
            [0, 0],
            [0.3699951171875, -1.30999755859375],
            [-0.5799560546875, -2.27996826171875],
            [-2.29998779296875, -2.0400390625],
            [-0.989990234375, -0.84002685546875],
            [0.44000244140625, -1.260009765625],
            [5.0799560546875, -0.39996337890625],
            [1.27996826171875, -0.09002685546875],
            [1.8499755859375, -4.64996337890625],
            [1.719970703125, -0.050048828125],
            [0.5, -1.17999267578125],
            [1.94000244140625, 4.6099853515625],
            [0.44000244140625, 1.0999755859375],
            [5.1600341796875, 0.34002685546875],
            [1.20001220703125, 0.10003662109375],
            [0.45001220703125, 1.34002685546875],
            [-3.8800048828125, 3.30999755859375],
            [-1, 0.8399658203125],
            [0.19000244140625, 0.72998046875],
            [0, 0],
            [1.04998779296875, -3.6300048828125],
            [-0.02001953125, -22.5399780273438]
        ];

        createPathGrp(
            contents,
            'Badge_Top',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [0, 32.0657]
        );
    };

    const createBadgeBottom = () => {
        const vertices: [number, number][] = [
            [22.6699829101562, -20.1601104736328],
            [15.97998046875, -14.4600982666016],
            [15.0499877929688, -11.5800933837891],
            [18.6300048828125, 3.46989440917969],
            [17.8099975585938, 6.47990417480469],
            [14.7000122070312, 6.28990173339844],
            [1.67999267578125, -1.66011047363281],
            [-1.71002197265625, -1.62013244628906],
            [-14.72998046875, 6.30986022949219],
            [-18.8400268554688, 4.39988708496094],
            [-16.5399780273438, -5.53010559082031],
            [-20.6300048828125, -18.4001007080078],
            [-15.0800170898438, -13.1101226806641],
            [-22.6500244140625, -20.1601104736328],
            [-40.9299926757812, -20.1601104736328],
            [-0.1099853515625, 20.1598968505859],
            [40.9299926757812, -20.1601104736328]
        ];
        const inTangents: [number, number][] = [
            [0, 0],
            [2.25, -1.8800048828125],
            [-0.33001708984375, -1.2900390625],
            [-1.22003173828125, -5.010009765625],
            [1.030029296875, -0.780029296875],
            [1.02996826171875, 0.6300048828125],
            [4.280029296875, 2.739990234375],
            [1.24005126953125, -0.77996826171875],
            [4.3699951171875, -2.5999755859375],
            [0.05999755859375, 2.219970703125],
            [-0.77001953125, 3.3599853515625],
            [0.55999755859375, 2.27001953125],
            [1.95001220703125, 1.719970703125],
            [0.6800537109375, 0.58001708984375],
            [0, 0],
            [-22.3699951171875, -0.07000732421875],
            [-0.30999755859375, 22.3399658203125]
        ];
        const outTangents: [number, number][] = [
            [-2.219970703125, 1.90997314453125],
            [-1, 0.8399658203125],
            [1.260009765625, 5],
            [0.29998779296875, 1.22998046875],
            [-1.08001708984375, 0.8199462890625],
            [-4.34002685546875, -2.6500244140625],
            [-1.28997802734375, -0.83001708984375],
            [-4.28997802734375, 2.71002197265625],
            [-2.050048828125, 1.22003173828125],
            [0.75, -3.22998046875],
            [0.5799560546875, -2.5400390625],
            [-0.5799560546875, -2.27996826171875],
            [-0.66998291015625, -0.59002685546875],
            [0, 0],
            [0.30999755859375, 22.25],
            [22.4299926757812, 0.07000732421875],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Badge_Bottom',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [0, 67.5709]
        );
    };

    const createStar = () => {
        const vertices: [number, number][] = [
            [-0.03280639648438, -19.7418823242188],
            [4.85893249511719, -8.06034851074219],
            [8.22979736328125, -5.68940734863281],
            [20.7470245361328, -4.65255737304688],
            [11.9583587646484, 2.85247802734375],
            [10.1097412109375, 8.45849609375],
            [12.7771759033203, 19.7235717773438],
            [2.48574829101562, 13.4673461914062],
            [-2.60737609863281, 13.5265197753906],
            [-12.8199615478516, 19.7418823242188],
            [-10.6107025146484, 10.3679809570312],
            [-13.4286651611328, 1.61775207519531],
            [-20.7470245361328, -4.62107849121094],
            [-8.6561279296875, -5.63725280761719],
            [-4.69219970703125, -8.54307556152344]
        ];
        const inTangents: [number, number][] = [
            [-1.70582580566406, 4.06689453125],
            [-1.48457336425781, -3.74208068847656],
            [-1.72767639160156, -0.10037231445312],
            [-4.514892578125, -0.38665771484375],
            [2.91917419433594, -2.27029418945312],
            [-0.73185729980469, -2.46965026855469],
            [-0.93325805664062, -4.03036499023438],
            [3.21995544433594, 2.1405029296875],
            [1.80302429199219, -1.1954345703125],
            [3.72303771972656, -2.24662780761719],
            [-1.03599548339844, 2.861328125],
            [3.42240905761719, 2.28231811523438],
            [2.6507568359375, 2.2955322265625],
            [-3.904541015625, 0.16912841796875],
            [-0.73710632324219, 1.92506408691406]
        ];
        const outTangents: [number, number][] = [
            [1.79029846191406, 4.24986267089844],
            [0.64048767089844, 1.61442565917969],
            [4.00653076171875, 0.23271179199219],
            [-3.14781188964844, 2.71051025390625],
            [-1.98603820800781, 1.54454040527344],
            [1.055419921875, 3.56153869628906],
            [-3.68768310546875, -2.22172546386719],
            [-1.84353637695312, -1.22552490234375],
            [-3.16787719726562, 2.100341796875],
            [0.77815246582031, -3.41921997070312],
            [1.38566589355469, -3.82705688476562],
            [-2.5255126953125, -1.68417358398438],
            [4.29475402832031, -0.378662109375],
            [2.13203430175781, -0.09233093261719],
            [1.379638671875, -3.60316467285156]
        ];

        createPathGrp(
            contents,
            'Star',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [0.0308, 47.4115]
        );
    };

    createStar();
    createBadgeBottom();
    createBadgeTop();
    createTopL02();
    createTopL01();
    createTopR02();
    createTopR01();
    createMedalCircle();
    createTopCenter();
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer);
};

const createSaluteWithM16Icon = (
    circleColor: ColorDropdown,
    iconColor: ColorDropdown,
    hasCircle: boolean,
    scale: boolean
): void => {
    const { layer, contents, circleColorRgb, iconColorRgb } = setUpIcon(
        'Salute With M16',
        circleColor,
        iconColor
    );

    const createLegL = () => {
        const vertices: [number, number][] = [
            [1.26661682128906, -60.8985595703125],
            [-15.2351531982422, -71.3491516113281],
            [-17.7493438720703, -73.2995147705078],
            [-17.7493438720703, 55.5501556396484],
            [0, 73.2995147705078],
            [17.7493438720703, 55.5501556396484],
            [17.7493438720703, -59.7161102294922]
        ];
        const inTangents: [number, number][] = [
            [4.92034912109375, 3.11610412597656],
            [0, 0],
            [0.76791381835938, 0.71072387695312],
            [0, 0],
            [-9.80259704589844, 0],
            [0, 9.8026123046875],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [-0.91482543945312, -0.57891845703125],
            [0, 0],
            [0, 9.80259704589844],
            [9.80259704589844, 0],
            [0, 0],
            [-5.37379455566406, 2.41490173339844]
        ];

        createPathGrp(
            contents,
            'Leg_L',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-7.795, 109.7019]
        );
    };

    const createLegR = () => {
        const vertices: [number, number][] = [
            [-13.471435546875, -51.7141723632812],
            [-17.7493438720703, -44.6425628662109],
            [-17.7493438720703, 74.2830047607422],
            [0, 92.0323638916016],
            [17.7493438720703, 74.2830047607422],
            [17.7493438720703, -89.1044464111328],
            [-0.8687744140625, -92.0323638916016]
        ];
        const inTangents: [number, number][] = [
            [5.44528198242188, -17.4213562011719],
            [1.94796752929688, -1.96702575683594],
            [0, 0],
            [-9.80259704589844, 0],
            [0, 9.8026123046875],
            [0, 8.21038818359375],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [-0.83938598632812, 2.68569946289062],
            [0, 0],
            [0, 9.80259704589844],
            [9.80259704589844, 0],
            [0, -5.57232666015625],
            [0, 0],
            [-5.42303466796875, 17.3491058349609]
        ];

        createPathGrp(
            contents,
            'Leg_R',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [32.9694, 90.969]
        );
    };

    const createSalute = () => {
        const vertices: [number, number][] = [
            [4.81709289550781, 89.5789184570312],
            [21.651611328125, 63.106201171875],
            [18.9746398925781, 47.7003021240234],
            [28.7470550537109, 31.7853851318359],
            [31.0746154785156, 24.8972015380859],
            [61.5782775878906, -23.2684631347656],
            [7.75135803222656, -23.2684631347656],
            [-19.4773712158203, -31.2541046142578],
            [9.59449768066406, -47.7654113769531],
            [15.0103912353516, -53.0987091064453],
            [42.9673309326172, -31.6749877929688],
            [71.9192962646484, -60.626953125],
            [42.9673156738281, -89.5789184570312],
            [15.0095977783203, -68.1544036865234],
            [-5.01568603515625, -73.4892883300781],
            [-64.4324035644531, -39.7440185546875],
            [-71.8200836181641, -25.1759185791016],
            [-61.2900848388672, -12.689208984375],
            [4.81709289550781, 6.2830810546875]
        ];
        const inTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [-0.86637878417969, 5.505615234375],
            [-5.06407165527344, 3.65771484375],
            [-1.33808898925781, 2.11314392089844],
            [-3.1455078125, 4.96720886230469],
            [6.19015502929688, 0],
            [0, 0],
            [0, 0],
            [-1.26901245117188, 2.14967346191406],
            [-13.3848419189453, 0],
            [0, 15.9895782470703],
            [15.9895782470703, 0],
            [3.31465148925781, -12.3390045166016],
            [7.02793884277344, -3.98965454101562],
            [0, 0],
            [-0.68531799316406, -5.89871215820312],
            [-5.69859313964844, -1.67082214355469],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [-2.48161315917969, -4.5391845703125],
            [1.04743957519531, -6.65948486328125],
            [0.20965576171875, -2.42204284667969],
            [3.47586059570312, -5.48814392089844],
            [-6.04800415039062, 0],
            [0, 0],
            [0, 0],
            [2.32676696777344, -1.3214111328125],
            [3.31465148925781, 12.3382110595703],
            [15.9895629882812, 0],
            [0, -15.9895782470703],
            [-13.3848571777344, 0],
            [-4.09684753417969, -6.92630004882812],
            [0, 0],
            [-5.16415405273438, 2.93267822265625],
            [0.68531799316406, 5.89871215820312],
            [0, 0],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Salute',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-30.1907, -80.1631]
        );
    };

    const createRifleBottom = () => {
        const vertices: [number, number][] = [
            [8.52272033691406, -21.0725555419922],
            [-3.04122924804688, -26.2367095947266],
            [-21.3988647460938, 2.63107299804688],
            [-18.7449188232422, 14.4539031982422],
            [-2.24314880371094, 24.9044952392578],
            [10.5191345214844, 20.2223815917969],
            [22.7294921875, -18.8379058837891]
        ];
        const inTangents: [number, number][] = [
            [0, 0],
            [3.22172546386719, 2.630126953125],
            [0, 0],
            [-3.99758911132812, -2.53164672851562],
            [0, 0],
            [-1.68353271484375, 5.38412475585938],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [-4.40496826171875, -0.69245910644531],
            [0, 0],
            [-2.53164672851562, 3.99760437011719],
            [0, 0],
            [4.74723815917969, 3.00654602050781],
            [0, 0],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Rifle_Bottom',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [0.4794, 16.3762]
        );
    };

    const createRifleTop = () => {
        const vertices: [number, number][] = [
            [42.9505310058594, -65.376708984375],
            [34.0135345458984, -63.3699798583984],
            [28.8104705810547, -55.1540222167969],
            [24.0227355957031, -58.1859741210938],
            [15.0857238769531, -56.1792297363281],
            [17.0916748046875, -47.2422332763672],
            [21.8794097900391, -44.2102813720703],
            [-45.9629211425781, 62.9123077392578],
            [-39.2772216796875, 63.0314331054688],
            [-17.9678649902344, 66.3826141357422],
            [-17.9599151611328, 66.3571929931641],
            [19.8218383789062, 6.69985961914062],
            [17.8159027099609, -2.23715209960938],
            [10.4178924560547, -1.90362548828125],
            [44.9564819335938, -56.439697265625]
        ];
        const inTangents: [number, number][] = [
            [3.02241516113281, 1.913818359375],
            [1.9154052734375, -3.02400207519531],
            [0, 0],
            [0, 0],
            [1.91462707519531, -3.02320861816406],
            [-3.02162170410156, -1.913818359375],
            [0, 0],
            [0, 0],
            [-2.268798828125, -0.35655212402344],
            [0, 0],
            [0, 0],
            [0, 0],
            [3.02162170410156, 1.913818359375],
            [2.09091186523438, -1.60014343261719],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [-3.02003479003906, -1.91302490234375],
            [0, 0],
            [0, 0],
            [-3.02081298828125, -1.91302490234375],
            [-1.91383361816406, 3.02162170410156],
            [0, 0],
            [0, 0],
            [2.17350769042969, -0.26126098632812],
            [0, 0],
            [0, 0],
            [0, 0],
            [1.91383361816406, -3.02241516113281],
            [-2.35932922363281, -1.49452209472656],
            [0, 0],
            [1.91459655761719, -3.02241516113281]
        ];

        createPathGrp(
            contents,
            'Rifle_Top',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [55.8251, -115.7117]
        );
    };

    const createArmR = () => {
        const vertices: [number, number][] = [
            [42.9001159667969, -21.2110443115234],
            [34.3077545166016, -43.5345153808594],
            [13.3716125488281, -10.4761505126953],
            [13.4335479736328, 1.80726623535156],
            [13.4335479736328, 1.80726623535156],
            [13.4819946289062, 11.4272155761719],
            [-26.0603332519531, 5.20768737792969],
            [-42.9702911376953, 17.5212860107422],
            [-30.6566925048828, 34.4312438964844],
            [26.0624084472656, 43.3515777587891],
            [43.1518249511719, 28.6651458740234]
        ];
        const inTangents: [number, number][] = [
            [0.00634765625, 1.19595336914062],
            [5.30075073242188, 5.95112609863281],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [1.26901245117188, -8.06903076171875],
            [-8.06983947753906, -1.26901245117188],
            [0, 0],
            [0.04527282714844, 9.10139465332031]
        ];
        const outTangents: [number, number][] = [
            [-0.04287719726562, -8.55583190917969],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [-8.06903076171875, -1.26901245117188],
            [-1.26901245117188, 8.06983947753906],
            [0, 0],
            [9.00689697265625, 1.41751098632812],
            [-0.13575744628906, -26.9031372070312]
        ];

        createPathGrp(
            contents,
            'Arm_R',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [41.1351, -48.5094]
        );
    };

    createArmR();
    createRifleTop();
    createRifleBottom();
    createSalute();
    createLegR();
    createLegL();
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer, 250);
};

const createHoldingM16Icon = (
    circleColor: ColorDropdown,
    iconColor: ColorDropdown,
    hasCircle: boolean,
    scale: boolean
): void => {
    const { layer, contents, circleColorRgb, iconColorRgb } = setUpIcon(
        'Holding M16',
        circleColor,
        iconColor
    );

    const createHead = () => {
        const vertices: [number, number][] = [
            [6.97627258300781, -29.0202026367188],
            [30.0746154785156, -2.26789855957031],
            [11.0411529541016, 28.7313995361328],
            [7.3758544921875, 28.5957641601562],
            [7.44075012207031, 23.3938751220703],
            [9.35284423828125, 7.90188598632812],
            [-4.12532043457031, 0.444580078125],
            [-7.1417236328125, -0.658935546875],
            [-29.28173828125, -3.62628173828125],
            [-30.1573333740234, -3.26971435546875],
            [-24.2438201904297, -17.8755950927734],
            [-8.87918090820312, -28.5393218994141]
        ];
        const inTangents: [number, number][] = [
            [-4.84263610839844, -1.12666320800781],
            [-0.87005615234375, -12.4499359130859],
            [12.4440765380859, -4.78849792480469],
            [1.09831237792969, 2.22492980957031],
            [-2.01524353027344, 2.11801147460938],
            [2.71945190429688, 5.05303955078125],
            [5.96452331542969, -0.23117065429688],
            [0.91070556640625, 1.36283874511719],
            [7.892333984375, -6.66741943359375],
            [0.49177551269531, -0.19548034667969],
            [-3.25444030761719, 4.2637939453125],
            [-3.67710876464844, 1.33392333984375]
        ];
        const outTangents: [number, number][] = [
            [12.8216552734375, 2.9830322265625],
            [0.96536254882812, 13.8136444091797],
            [-1.05838012695312, 0.40727233886719],
            [-0.84976196289062, -1.72146606445312],
            [4.07612609863281, -4.28396606445312],
            [-2.86952209472656, -5.33198547363281],
            [-1.23983764648438, 0.04804992675781],
            [-5.71627807617188, -8.55445861816406],
            [0.514892578125, -5.59555053710938],
            [-0.15168762207031, 0.12814331054688],
            [3.96046447753906, -5.18876647949219],
            [3.67710876464844, -1.33392333984375]
        ];

        createPathGrp(
            contents,
            'Head',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [7.6727, -141.6099]
        );
    };

    const createDude = () => {
        const vertices: [number, number][] = [
            [2.48191833496094, -95.9456024169922],
            [8.11865234375, -96.3826141357422],
            [7.40386962890625, -99.8716125488281],
            [-15.1997680664062, -145.912261962891],
            [-16.2914428710938, -148.336761474609],
            [-13.1386566162109, -155.531280517578],
            [-5.89532470703125, -153.253997802734],
            [-2.78866577148438, -146.997283935547],
            [0.47964477539062, -145.982986450195],
            [3.49319458007812, -147.379989624023],
            [10.5910034179688, -144.64860534668],
            [8.81645202636719, -137.226638793945],
            [8.26963806152344, -136.843933105469],
            [3.94955444335938, -134.175491333008],
            [6.09907531738281, -129.07795715332],
            [43.9962463378906, -51.9627227783203],
            [45.0925140380859, -48.4789276123047],
            [13.3452606201172, -72.0634613037109],
            [12.3607330322266, -72.4694976806641],
            [12.6704711914062, -71.4424285888672],
            [21.3786468505859, -53.8238067626953],
            [24.2507171630859, -51.1800079345703],
            [67.0060577392578, -25.25],
            [74.5115203857422, -11.3147430419922],
            [66.0661010742188, 1.37937927246094],
            [52.0047149658203, 0.94245910644531],
            [2.38516235351562, -29.0924377441406],
            [-3.57156372070312, -36.1240692138672],
            [-13.8994903564453, -56.6540832519531],
            [-15.9002838134766, -59.1252746582031],
            [-10.7428436279297, -32.0974884033203],
            [-4.37030029296875, -23.2035064697266],
            [22.7684020996094, -6.88497924804688],
            [26.0327301025391, -2.315673828125],
            [35.9257354736328, 48.0699157714844],
            [51.5622863769531, 62.5437469482422],
            [53.3287200927734, 65.5629272460938],
            [53.3566741943359, 106.994537353516],
            [53.2862701416016, 139.069488525391],
            [37.474365234375, 155.995788574219],
            [18.7013092041016, 142.331024169922],
            [18.3207702636719, 136.347595214844],
            [18.3188018798828, 63.1739349365234],
            [17.4937286376953, 57.9589385986328],
            [0.38523864746094, 11.0348815917969],
            [-5.12496948242188, 8.48692321777344],
            [-6.75729370117188, 12.04931640625],
            [-8.92790222167969, 64.7892303466797],
            [-10.6932220458984, 72.1991577148438],
            [-40.3627319335938, 144.239959716797],
            [-58.2844696044922, 156.021270751953],
            [-74.0198211669922, 142.727508544922],
            [-72.7011566162109, 130.372528076172],
            [-45.8677978515625, 65.4484558105469],
            [-43.6541748046875, 55.1347351074219],
            [-41.8881072998047, -94.50830078125],
            [-19.0098419189453, -117.535873413086],
            [-9.21958923339844, -117.535873413086]
        ];
        const inTangents: [number, number][] = [
            [0, 0],
            [-1.94786071777344, -0.89607238769531],
            [0.484375, 0.9913330078125],
            [0.26527404785156, 0.83950805664062],
            [7.54069519042969, 15.3438873291016],
            [-2.864013671875, 1.28038024902344],
            [-1.612060546875, -2.65528869628906],
            [-0.88058471679688, -2.15119934082031],
            [-1.5634765625, 0.98599243164062],
            [-1.04360961914062, 0.35789489746094],
            [-1.37428283691406, -2.59097290039062],
            [2.41548156738281, -1.83079528808594],
            [0.18328857421875, -0.12611389160156],
            [0.19444274902344, -1.52836608886719],
            [-0.82984924316406, -1.68888854980469],
            [-12.6224670410156, -25.7099304199219],
            [0.20097351074219, -1.66639709472656],
            [8.22520446777344, 10.9548492431641],
            [0.43684387207031, 0.05010986328125],
            [-0.19613647460938, -0.3673095703125],
            [-2.85240173339844, -5.897216796875],
            [-1.12796020507812, -0.684326171875],
            [-14.24267578125, -8.6583251953125],
            [0.33389282226562, -6.05508422851562],
            [5.19805908203125, -2.587158203125],
            [4.50033569335938, 2.69692993164062],
            [16.5215454101562, 10.0418701171875],
            [1.41326904296875, 2.8468017578125],
            [3.49148559570312, 6.818359375],
            [1.51042175292969, 0.23538208007812],
            [-1.69088745117188, -8.98770141601562],
            [-3.48048400878906, -2.06442260742188],
            [-9.06060791015625, -5.41552734375],
            [-0.42918395996094, -2.27430725097656],
            [-3.30380249023438, -16.7942199707031],
            [-9.1357421875, -0.82115173339844],
            [-0.00405883789062, -1.21308898925781],
            [0.00532531738281, -13.8105621337891],
            [0.17912292480469, -10.6890258789062],
            [8.752197265625, -0.81430053710938],
            [1.86041259765625, 8.58245849609375],
            [0.00192260742188, 1.99777221679688],
            [-0.01998901367188, 24.3912200927734],
            [0.63255310058594, 1.71409606933594],
            [5.52742004394531, 15.7032318115234],
            [2.17825317382812, -0.07603454589844],
            [0.05665588378906, -1.26605224609375],
            [0.68994140625, -17.5813751220703],
            [0.98220825195312, -2.38343811035156],
            [9.90864562988281, -24.005859375],
            [7.91908264160156, 0.5390625],
            [1.92573547363281, 7.4586181640625],
            [-1.67373657226562, 4.033203125],
            [-8.99371337890625, 21.6208801269531],
            [-0.20664978027344, 3.61180114746094],
            [0.17207336425781, 49.8846435546875],
            [-13.6530151367188, 0],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [1.63796997070312, -1.39561462402344],
            [0.90458679199219, -1.5482177734375],
            [-7.50534057617188, -15.3611450195312],
            [-0.39105224609375, -0.79573059082031],
            [-0.97561645507812, -3.08747863769531],
            [2.68342590332031, -1.19964599609375],
            [0.75440979003906, 1.843017578125],
            [1.20512390136719, 1.98503112792969],
            [0.92994689941406, -0.58648681640625],
            [2.880126953125, -0.9876708984375],
            [1.3626708984375, 2.569091796875],
            [-0.17716979980469, 0.13430786132812],
            [-1.44650268554688, 0.99522399902344],
            [-0.20146179199219, 1.58351135253906],
            [12.6306304931641, 25.7059631347656],
            [0.47175598144531, 0.96084594726562],
            [-11.4215240478516, -6.99687194824219],
            [-0.23098754882812, -0.25434875488281],
            [0.01890563964844, 0.21903991699219],
            [2.91123962402344, 5.86874389648438],
            [0.63836669921875, 1.31980895996094],
            [14.2503509521484, 8.64569091796875],
            [5.20680236816406, 3.165283203125],
            [-0.31797790527344, 5.76693725585938],
            [-4.71354675292969, 2.34599304199219],
            [-16.5838928222656, -9.93818664550781],
            [-2.74208068847656, -1.6666259765625],
            [-3.40632629394531, -6.86152648925781],
            [-0.45388793945312, -0.88633728027344],
            [1.73179626464844, 9.06065368652344],
            [0.74766540527344, 3.97407531738281],
            [9.07858276367188, 5.38493347167969],
            [1.80117797851562, 1.07655334472656],
            [3.1739501953125, 16.8184967041016],
            [1.79229736328125, 9.11074829101562],
            [2.56263732910156, 0.23033142089844],
            [0.04603576660156, 13.8103942871094],
            [-0.00411987304688, 10.6918640136719],
            [-0.14915466308594, 8.90084838867188],
            [-8.71617126464844, 0.81100463867188],
            [-0.41885375976562, -1.9322509765625],
            [-0.02346801757812, -24.3912048339844],
            [0.00146484375, -1.79689025878906],
            [-5.76374816894531, -15.6194000244141],
            [-1.15386962890625, -3.27806091308594],
            [-2.62229919433594, 0.09152221679688],
            [-0.78648376464844, 17.5771484375],
            [-0.10198974609375, 2.59927368164062],
            [-9.8951416015625, 24.0114135742188],
            [-3.28392028808594, 7.95599365234375],
            [-7.46565246582031, -0.50814819335938],
            [-1.10137939453125, -4.26580810546875],
            [8.97554016113281, -21.6284790039062],
            [1.39137268066406, -3.34489440917969],
            [2.85235595703125, -49.8547821044922],
            [-0.04670715332031, -13.5384063720703],
            [3.55496215820312, 0],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Dude',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-0.7608, 14.6915]
        );
    };

    const createRifleBack = () => {
        const vertices: [number, number][] = [
            [-19.9465179443359, -26.8941955566406],
            [-9.13104248046875, -20.3409576416016],
            [5.40673828125, -16.4241027832031],
            [8.14274597167969, -14.7249450683594],
            [19.1792602539062, 7.673828125],
            [15.6078338623047, 18.39990234375],
            [0.08184814453125, 26.0565490722656],
            [-10.7548370361328, 21.1861724853516],
            [-20.1502838134766, -25.8873901367188]
        ];
        const inTangents: [number, number][] = [
            [-0.12326049804688, 0.58027648925781],
            [-3.46784973144531, -2.17796325683594],
            [-5.28610229492188, 0.43598937988281],
            [-0.61300659179688, -1.26153564453125],
            [-3.5963134765625, -7.50572204589844],
            [4.328857421875, -2.27334594726562],
            [5.24008178710938, -2.41299438476562],
            [1.02459716796875, 4.87553405761719],
            [3.10189819335938, 15.6973876953125]
        ];
        const outTangents: [number, number][] = [
            [3.81257629394531, 2.3043212890625],
            [4.45852661132812, 2.8001708984375],
            [1.51838684082031, -0.12522888183594],
            [3.63777160644531, 7.48626708984375],
            [2.1099853515625, 4.40373229980469],
            [-5.10771179199219, 2.68232727050781],
            [-4.68959045410156, 2.15945434570312],
            [-3.29046630859375, -15.6578979492188],
            [-0.03903198242188, -0.19760131835938]
        ];

        createPathGrp(
            contents,
            'Rifle_Back',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [54.531, 42.3738]
        );
    };

    const createShoulderR = () => {
        const vertices: [number, number][] = [
            [-7.22785949707031, -14.3801116943359],
            [6.9459228515625, 14.3801116943359]
        ];
        const inTangents: [number, number][] = [
            [4.79147338867188, 9.72248840332031],
            [1.79469299316406, -18.9131164550781]
        ];
        const outTangents: [number, number][] = [
            [8.953369140625, 3.07568359375],
            [-4.83944702148438, -9.81979370117188]
        ];

        createPathGrp(
            contents,
            'R_Shoulder',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [27.9637, -87.0391]
        );
    };

    createShoulderR();
    createRifleBack();
    createDude();
    createHead();
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer, 200);
};

// ====================================

const createIconFromId = (
    id: IconID,
    circleColor: ColorDropdown,
    iconColor: ColorDropdown,
    hasCircle: boolean,
    scale: boolean
): void => {
    app.beginUndoGroup(`Create Icon: ${id}`);

    const comp = app.project.activeItem as CompItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert('No Composition Selected');
        return;
    }

    switch (id) {
        case 'Boom':
            createExplosionIcon(circleColor, iconColor, hasCircle, scale);
            break;
        case 'Tunnel':
            createTunnelIcon(circleColor, iconColor, hasCircle, scale);
            break;
        case 'Terror Tunnel':
            createTerrorTunnelIcon(circleColor, iconColor, hasCircle, scale);
            break;
        case 'Target':
            createTargetIcon(circleColor, iconColor, hasCircle, scale);
            break;
        case 'Sniper Target':
            createSniperTargetIcon(circleColor, iconColor, hasCircle, scale);
            break;
        case 'House Bombing':
            createHouseBombingIcon(circleColor, iconColor, hasCircle, scale);
            break;
        case 'Fire':
            createFireIcon(circleColor, iconColor, hasCircle, scale);
            break;
        case 'Money':
            createMoneyIcon(circleColor, iconColor, hasCircle, scale);
            break;
        case 'Earth':
            createEarthIcon(circleColor, iconColor, hasCircle, scale);
            break;
        case 'Kaboom':
            createKaboomIcon(circleColor, iconColor, hasCircle, scale);
            break;
        case 'Medal':
            createMedalIcon(circleColor, iconColor, hasCircle, scale);
            break;
        case 'Salute With M16':
            createSaluteWithM16Icon(circleColor, iconColor, hasCircle, scale);
            break;
        case 'Holding M16':
            createHoldingM16Icon(circleColor, iconColor, hasCircle, scale);
            break;
    }

    app.endUndoGroup();
};
