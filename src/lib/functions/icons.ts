const setUpIcon = (
    name: string,
    circleColor: ColorDropdown,
    iconColor: ColorDropdown
) => {
    const comp = app.project.activeItem as CompItem;
    const layer = comp.layers.addShape();
    layer.name = name;
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
    layer: ShapeLayer
) => {
    if (hasCircle) createIconCircle(contents, circleColorRgb);
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

// ====================================

const createIconFromId = (
    id: IconID,
    circleColor: ColorDropdown,
    iconColor: ColorDropdown,
    hasCircle: boolean,
    scale: boolean
): void => {
    app.beginUndoGroup(`Create Icon: ${id}`);

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
    }

    app.endUndoGroup();
};
