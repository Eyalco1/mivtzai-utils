const setUpIcon = (name: string, circleColor: string, iconColor: string) => {
    const comp = app.project.activeItem as CompItem;
    const layer = comp.layers.addShape();
    layer.name = formatLayerName(name);
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

const createExplosionIcon: CreateIconFn = (
    circleColor,
    iconColor,
    hasCircle,
    scale
) => {
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

const createTunnelIcon: CreateIconFn = (
    circleColor,
    iconColor,
    hasCircle,
    scale
) => {
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

const createTerrorTunnelIcon: CreateIconFn = (
    circleColor,
    iconColor,
    hasCircle,
    scale
) => {
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

const createTargetIcon: CreateIconFn = (
    circleColor,
    iconColor,
    hasCircle,
    scale
) => {
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

const createSniperTargetIcon: CreateIconFn = (
    circleColor,
    iconColor,
    hasCircle,
    scale
) => {
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

const createHouseBombingIcon: CreateIconFn = (
    circleColor,
    iconColor,
    hasCircle,
    scale
) => {
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

const createFireIcon: CreateIconFn = (
    circleColor,
    iconColor,
    hasCircle,
    scale
) => {
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

const createMoneyIcon: CreateIconFn = (
    circleColor,
    iconColor,
    hasCircle,
    scale
) => {
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

const createEarthIcon: CreateIconFn = (
    circleColor,
    iconColor,
    hasCircle,
    scale
) => {
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

const createKaboomIcon: CreateIconFn = (
    circleColor,
    iconColor,
    hasCircle,
    scale
) => {
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

const createMedalIcon: CreateIconFn = (
    circleColor,
    iconColor,
    hasCircle,
    scale
) => {
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

const createSaluteWithM16Icon: CreateIconFn = (
    circleColor,
    iconColor,
    hasCircle,
    scale
) => {
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

const createHoldingM16Icon: CreateIconFn = (
    circleColor,
    iconColor,
    hasCircle,
    scale
) => {
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

const createShootingM16Icon: CreateIconFn = (
    circleColor,
    iconColor,
    hasCircle,
    scale
) => {
    const { layer, contents, circleColorRgb, iconColorRgb } = setUpIcon(
        'Shooting M16',
        circleColor,
        iconColor
    );

    const createBoom = () => {
        const vertices: [number, number][] = [
            [22.4373474121094, 2.12002563476562],
            [10.3540344238281, 22.0729827880859],
            [9.59526062011719, 23.8569030761719],
            [7.71046447753906, 23.2854309082031],
            [5.10099792480469, 20.9362945556641],
            [-11.1118316650391, 18.1293792724609],
            [-13.6685943603516, 18.4035491943359],
            [-13.4969787597656, 15.8827514648438],
            [-20.2327423095703, -3.61973571777344],
            [-22.3766937255859, -5.96400451660156],
            [-19.6738433837891, -7.06611633300781],
            [-4.28692626953125, -21.3797760009766],
            [-2.91255187988281, -23.9317626953125],
            [-0.80511474609375, -21.9953765869141],
            [13.2439575195312, -17.4006805419922],
            [16.3445281982422, -17.6454925537109],
            [15.5499725341797, -14.5028381347656],
            [16.5634155273438, -2.25100708007812],
            [22.4373474121094, 0.7132568359375]
        ];
        const inTangents: [number, number][] = [
            [0, -0.46891784667969],
            [-1.08345031738281, -9.74613952636719],
            [0.76057434082031, -0.32994079589844],
            [0.54167175292969, 0.4923095703125],
            [0.87319946289062, 0.77926635742188],
            [6.02593994140625, -2.57423400878906],
            [0.94908142089844, 0.89285278320312],
            [-0.31077575683594, 0.8233642578125],
            [7.4769287109375, 4.5267333984375],
            [-0.39277648925781, 1.53253173828125],
            [-1.02090454101562, 0.15034484863281],
            [-1.87925720214844, 7.88792419433594],
            [-1.33116149902344, 0.27476501464844],
            [-0.53358459472656, -0.810302734375],
            [-5.62841796875, 2.06161499023438],
            [-1.03776550292969, -1.42489624023438],
            [0.467529296875, -0.97242736816406],
            [-3.1700439453125, -3.13618469238281],
            [-1.94834899902344, -1.00241088867188]
        ];
        const outTangents: [number, number][] = [
            [-8.49044799804688, 3.94837951660156],
            [0.08229064941406, 0.74046325683594],
            [-0.73780822753906, 0.320068359375],
            [-0.86611938476562, -0.78712463378906],
            [-4.82075500488281, -4.30226135253906],
            [-0.78195190429688, 0.33404541015625],
            [-0.96417236328125, -0.90702819824219],
            [3.09626770019531, -8.20265197753906],
            [-0.92880249023438, -0.56233215332031],
            [0.3134765625, -1.22309875488281],
            [7.85887145996094, -1.15733337402344],
            [0.23316955566406, -0.97877502441406],
            [1.43870544433594, -0.29696655273438],
            [3.29055786132812, 4.99739074707031],
            [0.97059631347656, -0.35551452636719],
            [0.8892822265625, 1.22103881835938],
            [-2.49484252929688, 5.18888854980469],
            [1.66194152832031, 1.64418029785156],
            [0, 0.46891784667969]
        ];

        createPathGrp(
            contents,
            'BOOOOOM',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [157.9753, -124.8603]
        );
    };

    const createDude = () => {
        const vertices: [number, number][] = [
            [97.7233734130859, -132.352035522461],
            [93.1433563232422, -122.372055053711],
            [47.5833587646484, -77.9520111083984],
            [32.3134002685547, -74.1720428466797],
            [-4.30659484863281, -83.8120574951172],
            [-8.44660949707031, -83.9620208740234],
            [11.9434051513672, -72.8520355224609],
            [14.8433685302734, -68.0320434570312],
            [14.7534027099609, -7.20201110839844],
            [31.1820831298828, 40.3683319091797],
            [32.7733612060547, 48.9279327392578],
            [32.7534027099609, 129.797988891602],
            [19.0733642578125, 148.32795715332],
            [-1.11666870117188, 139.127944946289],
            [-3.09663391113281, 128.907974243164],
            [-4.13458251953125, 48.2178802490234],
            [-21.1566314697266, 1.46797180175781],
            [-26.6865997314453, -1.68205261230469],
            [-28.6466217041016, 2.65797424316406],
            [-30.8766021728516, 55.3379516601562],
            [-63.3246002197266, 137.658706665039],
            [-82.1966094970703, 148.607986450195],
            [-95.9761047363281, 122.927749633789],
            [-68.5666046142578, 56.5479736328125],
            [-66.2366485595703, 45.6779327392578],
            [-64.3864135742188, -107.572067260742],
            [-38.3266143798828, -129.952011108398],
            [-35.1466217041016, -127.952011108398],
            [-16.0866241455078, -118.782028198242],
            [-13.9666290283203, -120.682052612305],
            [-0.90664672851562, -133.552047729492],
            [43.0433807373047, -134.292037963867],
            [-0.09663391113281, -115.612045288086],
            [-0.02662658691406, -114.542037963867],
            [29.1133880615234, -106.842025756836],
            [34.6033782958984, -108.272018432617],
            [71.5733489990234, -144.382064819336]
        ];
        const inTangents: [number, number][] = [
            [1.2100830078125, -13.7003173828125],
            [2.780029296875, -2.719970703125],
            [15.2100219726562, -14.7900390625],
            [5.739990234375, 1.489990234375],
            [12.1999664306641, 3.239990234375],
            [1.5799560546875, -0.70001220703125],
            [-6.780029296875, -3.58003234863281],
            [0.02001953125, -2.47001647949219],
            [0.03997802734375, -20.27001953125],
            [-5.11471557617188, -15.9060668945312],
            [-0.010009765625, -2.949951171875],
            [0.05999755859375, -26.9500122070312],
            [8.29002380371094, -2.03997802734375],
            [3.83003234863281, 7.29998779296875],
            [0, 3.54998779296875],
            [2.830078125, 26.5567321777344],
            [5.5, 15.6400146484375],
            [2.6099853515625, -0.28997802734375],
            [0.07000732421875, -1.52001953125],
            [0.69000244140625, -17.5599822998047],
            [10.2559814453125, -27.541259765625],
            [8.47998046875, 0.91998291015625],
            [-5.45314025878906, 10.6251831054688],
            [-9.21002197265625, 22.0999755859375],
            [-0.19000244140625, 3.7900390625],
            [0.20852661132812, 51.087890625],
            [-17.8699951171875, -1.69000244140625],
            [-0.92999267578125, -0.83001708984375],
            [-7.0999755859375, -1.5400390625],
            [-0.03997802734375, 1.66998291015625],
            [-11.4899749755859, 0.1500244140625],
            [-14.5168914794922, 0.16244506835938],
            [33.8269500732422, -0.08782958984375],
            [-0.02996826171875, -0.3599853515625],
            [-9.67999267578125, -2.70001220703125],
            [-1.71002197265625, 1.69000244140625],
            [-12.3799438476562, 11.9800415039062]
        ];
        const outTangents: [number, number][] = [
            [-0.22998046875, 3.9000244140625],
            [-15.1599731445312, 14.8300170898438],
            [-4.32000732421875, 4.18992614746094],
            [-12.2200317382812, -3.16999816894531],
            [-1.300048828125, -0.3499755859375],
            [6.91998291015625, 3.77996826171875],
            [2.0799560546875, 1.0899658203125],
            [-0.1199951171875, 20.2799835205078],
            [3.34019470214844, 16.2983703613281],
            [1.03128051757812, 2.78964233398438],
            [0, 26.9600067138672],
            [-0.02001953125, 9.37994384765625],
            [-7.95997619628906, 1.95001220703125],
            [-1.69993591308594, -3.219970703125],
            [-0.84854125976562, -26.7967834472656],
            [-5.75202941894531, -15.5599060058594],
            [-1.0999755859375, -3.1300048828125],
            [-3.09002685546875, 0.33000183105469],
            [-0.83001708984375, 17.5499877929688],
            [-7.68003845214844, 28.2259979248047],
            [-3.31201171875, 7.94927978515625],
            [-11.6753082275391, -0.94918823242188],
            [9.13948059082031, -22.1198120117188],
            [1.469970703125, -3.53001403808594],
            [2.63003540039062, -51.0438079833984],
            [-0.24018859863281, -11.8699951171875],
            [1.469970703125, 0.13995361328125],
            [5.5, 4.8599853515625],
            [1.8599853515625, 0.39996337890625],
            [0.280029296875, -11.5599975585938],
            [14.5487213134766, -0.17153930664062],
            [-23.6508026123047, 24.0440673828125],
            [0.02001953125, 0.3599853515625],
            [9.72003173828125, 2.54998779296875],
            [2.33001708984375, 0.65997314453125],
            [12.260009765625, -12.1000366210938],
            [9.69221496582031, -10.1063842773438]
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
            [-81.9413, 21.3234]
        );
    };

    const createHead = () => {
        const vertices: [number, number][] = [
            [-1.42767333984375, -29.2824554443359],
            [27.0469970703125, 16.6500854492188],
            [22.4419860839844, 19.4886322021484],
            [2.78680419921875, 19.6891174316406],
            [-12.4208221435547, 27.9941711425781],
            [-15.9774169921875, 28.0755767822266],
            [-30.8260192871094, -0.88401794433594],
            [-12.1605224609375, -26.8411712646484]
        ];
        const inTangents: [number, number][] = [
            [-2.72029113769531, -0.07562255859375],
            [11.3855743408203, -20.5387878417969],
            [2.36567687988281, 0.03517150878906],
            [6.55215454101562, -0.07914733886719],
            [3.28643798828125, -5.85847473144531],
            [1.02951049804688, 0.65252685546875],
            [-0.9993896484375, 12.4810485839844],
            [-11.1153717041016, 5.10221862792969]
        ];
        const outTangents: [number, number][] = [
            [25.0948791503906, 0.15899658203125],
            [-1.08035278320312, 1.94888305664062],
            [-6.54927062988281, -0.09738159179688],
            [-6.54437255859375, 0.07905578613281],
            [-1.39726257324219, 2.49079895019531],
            [-10.6141357421875, -6.72738647460938],
            [0.97526550292969, -12.1798553466797],
            [3.87062072753906, -1.77670288085938]
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
            [-89.6458, -140.138]
        );
    };

    const createM16 = () => {
        const vertices: [number, number][] = [
            [-12.9834594726562, 6.16433715820312],
            [-10.8552703857422, 8.93498229980469],
            [-15.9564208984375, 17.7403259277344],
            [-49.0567016601562, 17.8067169189453],
            [-51.1778106689453, -4.41748046875],
            [-47.1505584716797, -5.063232421875],
            [20.3086700439453, -6.43336486816406],
            [24.1109466552734, -10.5628204345703],
            [28.2076110839844, -17.4921112060547],
            [34.5418395996094, -15.7282867431641],
            [35.9488372802734, -10.1120910644531],
            [39.5309143066406, -6.78620910644531],
            [45.4974517822266, -6.86512756347656],
            [51.1715393066406, -1.2642822265625],
            [46.3067169189453, 4.73138427734375],
            [42.4691467285156, 5.04736328125],
            [-10.9418487548828, 6.06922912597656]
        ];
        const inTangents: [number, number][] = [
            [0.94337463378906, -0.04486083984375],
            [-0.488525390625, -0.8592529296875],
            [4.73100280761719, -0.08964538574219],
            [11.1007232666016, 0],
            [4.105712890625, 7.35101318359375],
            [-1.3074951171875, 0.02960205078125],
            [-22.4884796142578, 0.31431579589844],
            [0.35108947753906, 3.11279296875],
            [-3.3111572265625, 1.16780090332031],
            [-1.7572021484375, -1.83062744140625],
            [0.19479370117188, -1.96577453613281],
            [-2.66436767578125, 0.31793212890625],
            [-1.98336791992188, -0.11308288574219],
            [-0.14085388183594, -3.03759765625],
            [3.02801513671875, -0.63429260253906],
            [1.28245544433594, -0.02529907226562],
            [17.8036956787109, -0.33912658691406]
        ];
        const outTangents: [number, number][] = [
            [0.92024230957031, 1.18341064453125],
            [2.22064208984375, 3.90597534179688],
            [-10.9964752197266, 0.2083740234375],
            [2.15007019042969, -7.26405334472656],
            [1.28271484375, -0.9642333984375],
            [22.4854736328125, -0.50895690917969],
            [3.30455017089844, -0.04618835449219],
            [-0.3568115234375, -3.16374206542969],
            [2.53384399414062, -0.89366149902344],
            [1.530517578125, 1.59446716308594],
            [-0.28462219238281, 2.87260437011719],
            [1.96543884277344, -0.23452758789062],
            [3.20458984375, 0.18270874023438],
            [0.1322021484375, 2.85107421875],
            [-1.24714660644531, 0.26124572753906],
            [-17.803466796875, 0.35110473632812],
            [-0.54940795898438, 0.01046752929688]
        ];

        createPathGrp(
            contents,
            'M16',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [74.9752, -120.9183]
        );
    };

    createM16();
    createHead();
    createDude();
    createBoom();
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer, 250);
};

const createRocketIcon: CreateIconFn = (
    circleColor,
    iconColor,
    hasCircle,
    scale
) => {
    const { layer, contents, circleColorRgb, iconColorRgb } = setUpIcon(
        'Rocket',
        circleColor,
        iconColor
    );

    const createRocket = () => {
        const vertices: [number, number][] = [
            [-43.5300140380859, 119.984497070312],
            [-34.4872131347656, 87.4645690917969],
            [97.7692565917969, -68.9322052001953],
            [121.544967651367, -138.406066894531],
            [56.9946136474609, -103.416275024414],
            [-75.2580413818359, 52.9786071777344],
            [-105.83464050293, 67.2960357666016],
            [-121.544967651367, 84.930419921875],
            [-88.7843017578125, 92.3727416992188],
            [-94.1649475097656, 107.981201171875],
            [-91.528564453125, 110.241882324219],
            [-88.2521362304688, 113.009826660156],
            [-85.5840911865234, 115.240631103516],
            [-71.0854339599609, 107.333633422852],
            [-58.3045959472656, 138.406066894531]
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
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Rocket',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-20, 0]
        );
    };

    createRocket();
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer, 200);
};

const createRocketLauncherIcon: CreateIconFn = (
    circleColor,
    iconColor,
    hasCircle,
    scale
) => {
    const { layer, contents, circleColorRgb, iconColorRgb } = setUpIcon(
        'Rocket Launcher',
        circleColor,
        iconColor
    );

    const createRocket = () => {
        const vertices: [number, number][] = [
            [-70.6373901367188, 50.3896942138672],
            [-55.3504486083984, 33.3243713378906],
            [72.1864776611328, -22.0354614257812],
            [107.559906005859, -57.1524810791016],
            [57.7544097900391, -55.2878723144531],
            [-69.7796478271484, 0.07196044921875],
            [-92.691162109375, -0.41835021972656],
            [-107.559906005859, 5.58389282226562],
            [-89.8646850585938, 19.9709777832031],
            [-97.8370971679688, 27.8487854003906],
            [-96.9118499755859, 30.0176696777344],
            [-95.7527160644531, 32.6878356933594],
            [-94.7980499267578, 34.8480834960938],
            [-83.5979766845703, 34.4001617431641],
            [-85.1724395751953, 57.1524810791016]
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
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Rocket',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [0.0056, -42.3866]
        );
    };

    const createLauncher = () => {
        const vertices: [number, number][] = [
            [-91.5698547363281, 25.0742797851562],
            [-91.4781188964844, 9.99700927734375],
            [-87.5562438964844, 0.5897216796875],
            [-75.8984069824219, -5.76177978515625],
            [-77.6433410644531, 1.654296875],
            [-63.2323303222656, -1.70001220703125],
            [-39.2351989746094, -22.4977416992188],
            [-38.8774719238281, -22.0803833007812],
            [-37.4565124511719, -22.9257202148438],
            [80.7858581542969, -76.11376953125],
            [91.3073425292969, -71.711669921875],
            [80.5113220214844, -65.165771484375],
            [-0.24533081054688, -23.4327392578125],
            [-0.24795532226562, -23.4321899414062],
            [-18.8473205566406, 4.2061767578125],
            [16.0020446777344, 76.7611083984375],
            [-87.1478576660156, 76.7611083984375],
            [-91.5698547363281, 26.2882690429688]
        ];
        const inTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [-4.966796875, 5.486572265625],
            [-4.0162353515625, 0.25640869140625],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [-0.5145263671875, 0.2308349609375],
            [0, 0],
            [-1.8870849609375, -4.19647216796875],
            [3.9248046875, -1.76336669921875],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [0, -12.5452117919922],
            [0, 0],
            [4.29974365234375, -4.75421142578125],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0.43353271484375, -0.32818603515625],
            [0, 0],
            [3.9237060546875, -1.7659912109375],
            [1.8856201171875, 4.19384765625],
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
            'Launcher',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-15.9957, 22.7779]
        );
    };

    createLauncher();
    createRocket();
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer);
};

const createMaskIcon: CreateIconFn = (
    circleColor,
    iconColor,
    hasCircle,
    scale
) => {
    const { layer, contents, circleColorRgb, iconColorRgb } = setUpIcon(
        'Mask',
        circleColor,
        iconColor
    );

    const createMaskBottom = () => {
        const vertices: [number, number][] = [
            [86.159912109375, 49.6799926757812],
            [76.9599609375, 45.0700073242188],
            [70.6300048828125, 51.3999633789062],
            [62.47998046875, 43.260009765625],
            [37.6900024414062, 43.260009765625],
            [38.3499755859375, 50.4400024414062],
            [-0.58001708984375, 89.3699951171875],
            [-39.510009765625, 50.4400024414062],
            [-38.8499755859375, 43.260009765625],
            [-62.47998046875, 43.260009765625],
            [-70.6300048828125, 51.3999633789062],
            [-76.9600219726562, 45.0700073242188],
            [-86.1599731445312, 49.6799926757812],
            [-54.7100219726562, 100.690002441406],
            [-43.5800170898438, 95.3200073242188],
            [-47.0399780273438, 90.3299560546875],
            [-38.5999755859375, 83.0499877929688],
            [-2.05999755859375, 104.760009765625],
            [-2.05999755859375, 104.909973144531],
            [-0.00001525878906, 104.859985351562],
            [2.05999755859375, 104.909973144531],
            [2.05999755859375, 104.760009765625],
            [38.5999755859375, 83.0499877929688],
            [47.0399780273438, 90.3299560546875],
            [43.5800170898438, 95.3200073242188],
            [54.7100219726562, 100.690002441406]
        ];
        const inTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, -2.45001220703125],
            [21.5, 0],
            [0, 21.5],
            [-0.4300537109375, 2.3299560546875],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [-34.9099731445312, -14.5800170898438],
            [0, 0],
            [0, 0],
            [0, 0],
            [-27.7899780273438, -1.82000732421875],
            [0, 0],
            [-0.67997741699219, 0.02001953125],
            [-0.70001220703125, 0],
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
            [0.42999267578125, 2.3299560546875],
            [0, 21.5],
            [-21.510009765625, 0],
            [0, -2.45001220703125],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0.70001220703125, 0],
            [0, 0],
            [0.68000793457031, 0.02001953125],
            [27.7999877929688, -1.82000732421875],
            [0, 0],
            [0, 0],
            [0, 0],
            [34.8999633789062, -14.5800170898438]
        ];

        createPathGrp(
            contents,
            'Mask_Bottom',
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

    const createMaskMiddle = () => {
        const vertices: [number, number][] = [
            [76.9599609375, 45.0700073242188],
            [70.6300048828125, 51.3999633789062],
            [61.6099853515625, 42.3900146484375],
            [69.280029296875, 11.7000122070312],
            [82.330078125, -2.489990234375],
            [85.179931640625, -36.3099975585938],
            [67.3800048828125, -36.3099975585938],
            [67.780029296875, -26.8500366210938],
            [56.27001953125, 4.6099853515625],
            [34.4099884033203, 9.969970703125],
            [20.97998046875, -9.97003173828125],
            [6.08001708984375, -36.3099975585938],
            [-8.1500244140625, -36.3099975585938],
            [-23.0499877929688, -9.97003173828125],
            [-36.469970703125, 9.969970703125],
            [-58.3400268554688, 4.6099853515625],
            [-69.8499755859375, -26.8500366210938],
            [-69.4600219726562, -36.3099975585938],
            [-85.1799926757812, -36.3099975585938],
            [-82.3300170898438, -2.489990234375],
            [-69.280029296875, 11.7000122070312],
            [-61.6099853515625, 42.3900146484375],
            [-70.6300048828125, 51.3999633789062],
            [-76.9600219726562, 45.0700073242188],
            [-86.1599731445312, 49.6799926757812],
            [-83.6599731445312, 69.2799682617188],
            [-34.6599731445312, 69.2799682617188],
            [-39.510009765625, 50.4400024414062],
            [-0.58001708984375, 11.510009765625],
            [38.3499755859375, 50.4400024414062],
            [33.4900054931641, 69.2799682617188],
            [83.659912109375, 69.2799682617188],
            [86.159912109375, 49.6799926757812]
        ];
        const inTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [-7.2900390625, 9.969970703125],
            [1.91015625, 13.8699951171875],
            [0, 0],
            [-0.090087890625, -3.3699951171875],
            [6.90997314453125, -9.21002197265625],
            [8.05003356933594, 3.46002197265625],
            [7.67999267578125, 7.2900390625],
            [0.9599609375, 14.989990234375],
            [0, 0],
            [7.51995849609375, -7.14996337890625],
            [8.04998779296875, -3.45001220703125],
            [6.9000244140625, 9.20001220703125],
            [-0.3800048828125, 14.5800170898438],
            [-0.19000244140625, 2.91998291015625],
            [0, 0],
            [-5.02996826171875, -6.8800048828125],
            [0, 0],
            [-5.3699951171875, -4.22003173828125],
            [0, 0],
            [0, 0],
            [0, 0],
            [-3.34002685546875, -10.739990234375],
            [0, 0],
            [0, 6.8299560546875],
            [-21.510009765625, 0],
            [0, -21.5],
            [3.10002136230469, -5.5899658203125],
            [0, 0],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [5.3699951171875, -4.22003173828125],
            [0, 0],
            [5.0198974609375, -6.8800048828125],
            [0, 0],
            [0.2000732421875, 2.91998291015625],
            [0.3798828125, 14.5800170898438],
            [-6.9000244140625, 9.20001220703125],
            [-8.06001281738281, -3.45001220703125],
            [-7.51994323730469, -7.14996337890625],
            [0, 0],
            [-0.9599609375, 14.989990234375],
            [-7.66998291015625, 7.2900390625],
            [-8.06005859375, 3.46002197265625],
            [-6.90997314453125, -9.21002197265625],
            [0, 0],
            [0.0899658203125, -3.3699951171875],
            [-1.9100341796875, 13.8699951171875],
            [7.2900390625, 9.969970703125],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [-3.09002685546875, -5.5899658203125],
            [0, -21.5],
            [21.5, 0],
            [0, 6.8299560546875],
            [0, 0],
            [3.340087890625, -10.72998046875],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Mask_Middle',
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

    const createMaskTop = () => {
        const vertices: [number, number][] = [
            [81.93994140625, -55.0400390625],
            [55.0900268554688, -72.2999877929688],
            [4.3599853515625, -104.799987792969],
            [4.3599853515625, -104.910034179688],
            [0, -104.890014648438],
            [-4.3599853515625, -104.910034179688],
            [-4.3599853515625, -104.799987792969],
            [-55.0900268554688, -72.2999877929688],
            [-81.9400024414062, -55.0400390625],
            [-85.5399780273438, -10.2900390625],
            [-67.2999877929688, -10.2900390625],
            [-69.8499755859375, -26.8500366210938],
            [-62.1799926757812, -56],
            [-40.6900024414062, -58.6900024414062],
            [-8.09002685546875, -37.2100219726562],
            [-22.719970703125, -10.2900390625],
            [20.6400146484375, -10.2900390625],
            [6.02001953125, -37.2100219726562],
            [38.6300201416016, -58.6900024414062],
            [60.1099853515625, -56],
            [67.780029296875, -26.8500366210938],
            [65.22998046875, -10.2900390625],
            [85.5400390625, -10.2900390625]
        ];
        const inTangents: [number, number][] = [
            [3.0400390625, 15.4800415039062],
            [0, 0],
            [21.9800415039062, 0.6099853515625],
            [0, 0],
            [1.489990234375, -0.010009765625],
            [1.41998291015625, 0],
            [0, 0],
            [2.36004638671875, -27.6600341796875],
            [3.83001708984375, -19.5699462890625],
            [-2.48004150390625, -11.6399536132812],
            [0, 0],
            [-0.1700439453125, 6.71002197265625],
            [-6.52001953125, 3.8299560546875],
            [-6.90997314453125, -0.3800048828125],
            [0.77001953125, -15.719970703125],
            [7.52996826171875, -7.0999755859375],
            [0, 0],
            [0.760009765625, 15.5],
            [-25.0900421142578, 1.39996337890625],
            [-6.51995849609375, -3.84002685546875],
            [-0.3900146484375, -14.5799560546875],
            [1.77001953125, -4.6099853515625],
            [0, 0]
        ];
        const outTangents: [number, number][] = [
            [-3.8299560546875, -19.5699462890625],
            [-2.36004638671875, -27.6600341796875],
            [0, 0],
            [-1.40997314453125, 0],
            [-1.489990234375, -0.010009765625],
            [0, 0],
            [-21.9800415039062, 0.6099853515625],
            [0, 0],
            [-3.03997802734375, 15.4800415039062],
            [0, 0],
            [-1.77001953125, -4.6099853515625],
            [0.3800048828125, -14.5799560546875],
            [6.52001953125, -3.84002685546875],
            [25.0700073242188, 1.39996337890625],
            [-0.75994873046875, 15.5],
            [0, 0],
            [-7.52001953125, -7.0999755859375],
            [-0.760009765625, -15.719970703125],
            [6.90000915527344, -0.3800048828125],
            [6.52001953125, 3.8299560546875],
            [0.169921875, 6.71002197265625],
            [0, 0],
            [2.469970703125, -11.6300048828125]
        ];

        createPathGrp(
            contents,
            'Mask_Top',
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

    const createCircle01 = () => {
        const vertices: [number, number][] = [
            [6.71333312988281, 0.00129699707031],
            [-0.00129699707031, 6.71333312988281],
            [-6.71333312988281, 0.00129699707031],
            [-0.00129699707031, -6.71333312988281]
        ];
        const inTangents: [number, number][] = [
            [0, -3.70932006835938],
            [3.70932006835938, 0],
            [0, 3.70672607421875],
            [-3.70672607421875, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 3.70672607421875],
            [-3.70672607421875, 0],
            [0, -3.70932006835938],
            [3.70932006835938, 0]
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
            [-13.0482, 29.3444]
        );
    };

    const createCircle02 = () => {
        const vertices: [number, number][] = [
            [6.71188354492188, 0.00129699707031],
            [0.00013732910156, 6.71333312988281],
            [-6.71188354492188, 0.00129699707031],
            [0.00013732910156, -6.71333312988281]
        ];
        const inTangents: [number, number][] = [
            [0, -3.70932006835938],
            [3.70643615722656, 0],
            [0, 3.70672607421875],
            [-3.70960998535156, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 3.70672607421875],
            [-3.70960998535156, 0],
            [0, -3.70932006835938],
            [3.70643615722656, 0]
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
            [10.9279, 29.3444]
        );
    };

    const createCircle03 = () => {
        const vertices: [number, number][] = [
            [6.71333312988281, -0.00013732910156],
            [-0.00129699707031, 6.71188354492188],
            [-6.71333312988281, -0.00013732910156],
            [-0.00129699707031, -6.71188354492188]
        ];
        const inTangents: [number, number][] = [
            [0, -3.70932006835938],
            [3.70932006835938, 0],
            [0, 3.70932006835938],
            [-3.70672607421875, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 3.70932006835938],
            [-3.70672607421875, 0],
            [0, -3.70932006835938],
            [3.70932006835938, 0]
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
            [-13.0482, 70.0031]
        );
    };

    const createCircle04 = () => {
        const vertices: [number, number][] = [
            [6.71188354492188, -0.00013732910156],
            [0.00013732910156, 6.71188354492188],
            [-6.71188354492188, -0.00013732910156],
            [0.00013732910156, -6.71188354492188]
        ];
        const inTangents: [number, number][] = [
            [0, -3.70932006835938],
            [3.70643615722656, 0],
            [0, 3.70932006835938],
            [-3.70960998535156, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 3.70932006835938],
            [-3.70960998535156, 0],
            [0, -3.70932006835938],
            [3.70643615722656, 0]
        ];

        createPathGrp(
            contents,
            'Circle_04',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [10.9279, 70.0031]
        );
    };

    const createCircle05 = () => {
        const vertices: [number, number][] = [
            [6.71333312988281, 0.00013732910156],
            [-0.00129699707031, 6.71188354492188],
            [-6.71333312988281, 0.00013732910156],
            [-0.00129699707031, -6.71188354492188]
        ];
        const inTangents: [number, number][] = [
            [0, -3.70960998535156],
            [3.70932006835938, 0],
            [0, 3.70932006835938],
            [-3.70672607421875, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 3.70932006835938],
            [-3.70672607421875, 0],
            [0, -3.70960998535156],
            [3.70932006835938, 0]
        ];

        createPathGrp(
            contents,
            'Circle_05',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [23.2011, 49.4813]
        );
    };

    const createCircle06 = () => {
        const vertices: [number, number][] = [
            [6.71333312988281, 0.00013732910156],
            [-0.00129699707031, 6.71188354492188],
            [-6.71333312988281, 0.00013732910156],
            [-0.00129699707031, -6.71188354492188]
        ];
        const inTangents: [number, number][] = [
            [0, -3.70960998535156],
            [3.70643615722656, 0],
            [0, 3.70932006835938],
            [-3.70672607421875, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 3.70932006835938],
            [-3.70672607421875, 0],
            [0, -3.70960998535156],
            [3.70643615722656, 0]
        ];

        createPathGrp(
            contents,
            'Circle_06',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-0.1961, 49.4813]
        );
    };

    const createCircle07 = () => {
        const vertices: [number, number][] = [
            [6.71188354492188, 0.00013732910156],
            [-0.00013732910156, 6.71188354492188],
            [-6.71188354492188, 0.00013732910156],
            [-0.00013732910156, -6.71188354492188]
        ];
        const inTangents: [number, number][] = [
            [0, -3.70960998535156],
            [3.70960998535156, 0],
            [0, 3.70932006835938],
            [-3.70643615722656, 0]
        ];
        const outTangents: [number, number][] = [
            [0, 3.70932006835938],
            [-3.70643615722656, 0],
            [0, -3.70960998535156],
            [3.70960998535156, 0]
        ];

        createPathGrp(
            contents,
            'Circle_07',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-24.3636, 49.4813]
        );
    };

    createCircle07();
    createCircle06();
    createCircle05();
    createCircle04();
    createCircle03();
    createCircle02();
    createCircle01();
    createMaskTop();
    createMaskMiddle();
    createMaskBottom();
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer, 160);
};

const createShoeIcon: CreateIconFn = (
    circleColor,
    iconColor,
    hasCircle,
    scale
) => {
    const { layer, contents, circleColorRgb, iconColorRgb } = setUpIcon(
        'Shoe',
        circleColor,
        iconColor
    );

    const createSole = () => {
        const vertices: [number, number][] = [
            [-117.953872680664, -4.52000427246094],
            [-115.888549804688, -15.2752075195312],
            [-112.247116088867, -13.2851715087891],
            [-69.5648193359375, -13.9685668945312],
            [5.97535705566406, -2.22113037109375],
            [56.7619323730469, 1.00537109375],
            [104.860275268555, -9.38253784179688],
            [111.726058959961, -12.6094207763672],
            [114.68928527832, -12.3582305908203],
            [113.425506591797, 1.38914489746094],
            [99.5922241210938, 7.00787353515625],
            [55.9788513183594, 14.5531005859375],
            [24.0476379394531, 14.8462066650391],
            [-17.0269622802734, 6.49905395507812],
            [-41.7108917236328, 1.25091552734375],
            [-43.7506866455078, 2.58619689941406],
            [-45.3443298339844, 6.39071655273438],
            [-53.0701751708984, 10.8340301513672],
            [-82.6657867431641, 9.10623168945312],
            [-113.880874633789, 7.46218872070312],
            [-117.953872680664, 5.60911560058594]
        ];
        const inTangents: [number, number][] = [
            [0, 3.37637329101562],
            [-1.299072265625, 3.84393310546875],
            [-1.6591796875, 0.22999572753906],
            [-14.2542724609375, -0.77374267578125],
            [-25.0114440917969, -5.05073547363281],
            [-17.0786743164062, 1.10966491699219],
            [-15.4459686279297, 6.15965270996094],
            [-2.24411010742188, 1.16294860839844],
            [-0.98036193847656, -0.67973327636719],
            [5.45751953125, -2.88510131835938],
            [4.77725219726562, -1.42738342285156],
            [14.8088989257812, -1.01922607421875],
            [10.6443481445312, 0.7432861328125],
            [13.2646942138672, 4.97607421875],
            [8.34584045410156, 1.2039794921875],
            [0.357666015625, -1.0361328125],
            [0.66720581054688, -1.19355773925781],
            [3.50968933105469, 0.08552551269531],
            [9.86358642578125, 0.60722351074219],
            [10.4382934570312, -0.12229919433594],
            [0.82417297363281, 1.79498291015625]
        ];
        const outTangents: [number, number][] = [
            [0.50224304199219, -3.43074035644531],
            [0.87516784667969, 2.03787231445312],
            [14.1925048828125, -1.96737670898438],
            [25.5827484130859, 1.38865661621094],
            [16.7454071044922, 3.3814697265625],
            [16.5615081787109, -1.07608032226562],
            [2.34556579589844, -0.93539428710938],
            [1.12493896484375, -0.58297729492188],
            [4.84431457519531, 3.35891723632812],
            [-4.41719055175781, 2.33514404296875],
            [-14.23095703125, 4.25210571289062],
            [-10.6472930908203, 0.73281860351562],
            [-14.0476989746094, -0.98097229003906],
            [-7.9375, -2.9776611328125],
            [-1.12916564941406, -0.16290283203125],
            [-0.4482421875, 1.29843139648438],
            [-1.6712646484375, 2.98966979980469],
            [-9.88594055175781, -0.24093627929688],
            [-10.3990936279297, -0.64019775390625],
            [-1.69552612304688, 0.01983642578125],
            [0, -3.37637329101562]
        ];

        createPathGrp(
            contents,
            'Sole',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [0, 84.6094]
        );
    };

    const createShoe = () => {
        const vertices: [number, number][] = [
            [-63.4697723388672, -88.7600555419922],
            [-31.6182861328125, -90.7322235107422],
            [-19.0197143554688, -90.9511260986328],
            [-11.8643493652344, -83.3431091308594],
            [-7.36891174316406, -47.3194732666016],
            [-9.72427368164062, -44.6190795898438],
            [-34.8381042480469, -42.0498809814453],
            [-37.9995574951172, -38.6858215332031],
            [-33.8128662109375, -36.2358703613281],
            [-19.7066040039062, -38.2097015380859],
            [-7.98193359375, -38.5293273925781],
            [-5.97909545898438, -36.8377838134766],
            [-4.01644897460938, -19.9449920654297],
            [-5.77940368652344, -17.8988189697266],
            [-22.5050659179688, -16.6015930175781],
            [-26.8337860107422, -16.0354309082031],
            [-29.5537567138672, -12.3440093994141],
            [-26.2047729492188, -10.3218231201172],
            [-6.72482299804688, -11.7926025390625],
            [-3.47663879394531, -8.68110656738281],
            [-3.56147766113281, -0.21173095703125],
            [-5.13908386230469, 2.09254455566406],
            [-16.7415161132812, 12.8620910644531],
            [-17.1759948730469, 17.6464996337891],
            [-12.2184600830078, 16.7810974121094],
            [-1.99415588378906, 7.21928405761719],
            [1.54403686523438, 7.44094848632812],
            [7.46783447265625, 12.8902893066406],
            [7.49052429199219, 15.6586761474609],
            [0.63320922851562, 23.9925079345703],
            [0.89820861816406, 28.4180145263672],
            [5.46794128417969, 27.4529571533203],
            [11.5121154785156, 19.9258575439453],
            [14.9077911376953, 19.8846588134766],
            [23.9677429199219, 30.5923004150391],
            [23.8940887451172, 34.2213134765625],
            [20.0493011474609, 39.9458923339844],
            [20.3161468505859, 44.4056243896484],
            [24.4394836425781, 44.0361633300781],
            [27.4727172851562, 39.4250030517578],
            [30.0780029296875, 39.2401580810547],
            [57.5707702636719, 51.3814086914062],
            [81.9106597900391, 52.1761016845703],
            [101.68962097168, 58.4779968261719],
            [111.924057006836, 76.3477325439453],
            [109.867034912109, 78.9725646972656],
            [81.3997497558594, 87.8923950195312],
            [36.3198547363281, 91.026611328125],
            [-3.65234375, 85.1174774169922],
            [-55.5857543945312, 76.7474670410156],
            [-85.1920166015625, 75.1356811523438],
            [-107.681045532227, 76.2807006835938],
            [-110.718338012695, 74.1529693603516],
            [-111.309127807617, 52.8823699951172],
            [-99.6194152832031, 14.5199737548828],
            [-93.3800048828125, -17.5247955322266],
            [-105.373306274414, -75.4790496826172],
            [-103.789413452148, -80.1505737304688],
            [-70.1427917480469, -88.7652435302734]
        ];
        const inTangents: [number, number][] = [
            [-2.224365234375, 0],
            [-10.5888824462891, 1.18009948730469],
            [-4.21623229980469, -0.59513854980469],
            [-0.2872314453125, -4.55430603027344],
            [-1.64030456542969, -11.9889678955078],
            [2.02626037597656, -0.04658508300781],
            [8.27334594726562, -1.84687805175781],
            [-0.30451965332031, -2.37367248535156],
            [-2.53048706054688, 0.41496276855469],
            [-4.73728942871094, 0.44309997558594],
            [-3.90800476074219, 0.09669494628906],
            [-0.13697814941406, -1.16648864746094],
            [-0.65519714355469, -5.63081359863281],
            [1.3958740234375, -0.11906433105469],
            [1.42387390136719, -0.2838134765625],
            [5.54763793945312, -0.78582763671875],
            [-0.33427429199219, -1.59321594238281],
            [-1.59323120117188, 0.10955810546875],
            [-6.52456665039062, 0.07780456542969],
            [-0.10722351074219, -3.15069580078125],
            [-0.68951416015625, -2.84197998046875],
            [0.80049133300781, -0.55136108398438],
            [3.45457458496094, -4.03692626953125],
            [-1.46257019042969, -1.29032897949219],
            [-1.77224731445312, 2.05194091796875],
            [-3.82321166992188, 2.75653076171875],
            [-1.2275390625, -1.25823974609375],
            [-2.03681945800781, -1.74565124511719],
            [1.13252258300781, -1.00782775878906],
            [2.09088134765625, -2.93865966796875],
            [-1.77079772949219, -1.3515625],
            [-1.41262817382812, 1.82441711425781],
            [-2.29718017578125, 2.28880310058594],
            [-1.30357360839844, -1.43376159667969],
            [-2.76441955566406, -3.79606628417969],
            [0.98257446289062, -1.28785705566406],
            [1.21209716796875, -1.95271301269531],
            [-1.26138305664062, -1.37957763671875],
            [-1.13456726074219, 1.55343627929688],
            [-0.981689453125, 1.55613708496094],
            [-1.01873779296875, -1.33198547363281],
            [-11.0283813476562, 0.08941650390625],
            [-8.0853271484375, -1.29800415039062],
            [-6.02519226074219, -3.88130187988281],
            [-0.65882873535156, -7.55032348632812],
            [1.12841796875, -0.52101135253906],
            [9.775390625, -2.08670043945312],
            [15.1212158203125, 0.66557312011719],
            [13.1834716796875, 2.93569946289062],
            [17.4875335693359, 1.74110412597656],
            [9.87939453125, 0.10018920898438],
            [7.45780944824219, -1.0584716796875],
            [0.39620971679688, 1.8245849609375],
            [-0.89712524414062, 7.12522888183594],
            [-5.38334655761719, 12.3388214111328],
            [-0.07237243652344, 11.0943298339844],
            [7.384033203125, 18.6164398193359],
            [-2.80863952636719, 1.65252685546875],
            [-12.0031280517578, -0.19635009765625]
        ];
        const outTangents: [number, number][] = [
            [10.7021942138672, 0.70347595214844],
            [4.17495727539062, -0.46528625488281],
            [4.42198181152344, 0.62417602539062],
            [0.76322937011719, 12.1017761230469],
            [0.29025268554688, 2.12152099609375],
            [-8.43339538574219, 0.19387817382812],
            [-1.89813232421875, 0.42373657226562],
            [0.24540710449219, 1.91297912597656],
            [4.68858337402344, -0.76885986328125],
            [3.90956115722656, -0.36566162109375],
            [1.24273681640625, -0.03074645996094],
            [0.66114807128906, 5.63011169433594],
            [0.15467834472656, 1.32936096191406],
            [-5.57205200195312, 0.47529602050781],
            [-1.44111633300781, 0.20413208007812],
            [-1.80357360839844, 0.35948181152344],
            [0.38385009765625, 1.82957458496094],
            [6.49659729003906, -0.44673156738281],
            [3.22514343261719, -0.0384521484375],
            [0.09617614746094, 2.82597351074219],
            [0.29362487792969, 1.21026611328125],
            [-4.39390563964844, 3.02645874023438],
            [-1.74305725097656, 2.03689575195312],
            [1.56375122070312, 1.37959289550781],
            [3.07220458984375, -3.55702209472656],
            [1.35762023925781, -0.97883605957031],
            [1.87136840820312, 1.91818237304688],
            [1.17146301269531, 1.00395202636719],
            [-2.71473693847656, 2.41574096679688],
            [-1.0975341796875, 1.54251098632812],
            [1.5303955078125, 1.16806030273438],
            [1.97061157226562, -2.54505920410156],
            [1.17074584960938, -1.16648864746094],
            [3.14907836914062, 3.46365356445312],
            [1.01138305664062, 1.38880920410156],
            [-1.39210510253906, 1.82464599609375],
            [-0.93161010742188, 1.50080871582031],
            [1.21400451660156, 1.3277587890625],
            [1.08389282226562, -1.48408508300781],
            [0.80679321289062, -1.27886962890625],
            [6.9393310546875, 9.07316589355469],
            [8.11904907226562, -0.06582641601562],
            [6.91777038574219, 1.11058044433594],
            [6.49931335449219, 4.18667602539062],
            [0.143310546875, 1.64244079589844],
            [-9.103759765625, 4.20329284667969],
            [-14.8861236572266, 3.17768859863281],
            [-13.5029449462891, -0.59434509277344],
            [-17.1444396972656, -3.81770324707031],
            [-9.85301208496094, -0.98098754882812],
            [-7.49765014648438, -0.07601928710938],
            [-1.80288696289062, 0.25587463378906],
            [-1.53399658203125, -7.06416320800781],
            [1.6949462890625, -13.4617767333984],
            [4.45439147949219, -10.2095794677734],
            [0.13168334960938, -20.1869812011719],
            [-1.17718505859375, -2.96791076660156],
            [10.3807525634766, -6.10774230957031],
            [2.22377014160156, 0.036376953125]
        ];

        createPathGrp(
            contents,
            'Shoe',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-2.439, -8.6185]
        );
    };

    createShoe();
    createSole();
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer);
};

const createHelmetIcon: CreateIconFn = (
    circleColor,
    iconColor,
    hasCircle,
    scale
) => {
    const { layer, contents, circleColorRgb, iconColorRgb } = setUpIcon(
        'Helmet',
        circleColor,
        iconColor
    );

    const createHelmetTop = () => {
        const vertices: [number, number][] = [
            [93.7057037353516, 14.1942749023438],
            [37.8857574462891, -52.6957397460938],
            [-2.05424499511719, -56.0557250976562],
            [-72.3142547607422, -37.2957153320312],
            [-105.034286499023, 2.644287109375],
            [-111.984237670898, 56.644287109375],
            [-35.8542327880859, 56.644287109375],
            [-74.3742523193359, 7.16424560546875],
            [-59.8942718505859, 5.2642822265625],
            [-38.0742645263672, 33.5042724609375],
            [-34.9442596435547, 29.394287109375],
            [-34.5342864990234, 18.5042724609375],
            [-36.6442718505859, 2.2542724609375],
            [-23.2442474365234, 0.5142822265625],
            [-21.2842864990234, 15.604248046875],
            [-25.8442840576172, 35.374267578125],
            [-32.2242279052734, 41.2342529296875],
            [-19.6542816162109, 56.644287109375],
            [46.8557281494141, 56.644287109375],
            [51.3657379150391, 55.5842895507812],
            [111.995742797852, 36.3342895507812]
        ];
        const inTangents: [number, number][] = [
            [2.2900390625, 5.969970703125],
            [38.5, 18.77001953125],
            [17.8099975585938, -2.40997314453125],
            [30.3200073242188, -18.2900390625],
            [7.70001220703125, -23.0900268554688],
            [-0.27001953125, -23.5800170898438],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [-0.5, 1.55999755859375],
            [0.58001708984375, 4.41998291015625],
            [0, 0],
            [0, 0],
            [0, 0],
            [4.0400390625, -5.46002197265625],
            [2.88995361328125, -2.13995361328125],
            [0, 0],
            [0, 0],
            [-1.5899658203125, 0.16998291015625],
            [-0.02001953125, 8.16998291015625]
        ];
        const outTangents: [number, number][] = [
            [-2.280029296875, -5.969970703125],
            [0, 0],
            [-17.7999877929688, 2.4000244140625],
            [0, 0],
            [-2.67999267578125, 8.03997802734375],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [1.59002685546875, -1.17999267578125],
            [0.8499755859375, -2.84002685546875],
            [0, 0],
            [0, 0],
            [0, 0],
            [1.010009765625, 7.72003173828125],
            [-1.3599853515625, 1.77001953125],
            [0, 0],
            [0, 0],
            [1.4100341796875, -0.52001953125],
            [13.4700927734375, -1.45001220703125],
            [0.02001953125, -7.17999267578125]
        ];

        createPathGrp(
            contents,
            'Helmet_Top',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [0.0043, -48.5843]
        );
    };

    const createHelmetMiddle = () => {
        const vertices: [number, number][] = [
            [105.168762207031, -39.0099792480469],
            [-21.6211547851562, -39.0099792480469],
            [-25.8411865234375, -29.7900085449219],
            [-32.2211303710938, -23.9300231933594],
            [-17.7711791992188, -6.22000122070312],
            [-16.43115234375, 3.92001342773438],
            [-62.2311401367188, 9.87997436523438],
            [-63.671142578125, -1.18002319335938],
            [-33.2211303710938, -5.13998413085938],
            [-59.5911865234375, -39.0099792480469],
            [-109.941162109375, -39.0099792480469],
            [-107.071166992188, 26.3899841308594],
            [-97.7811889648438, 39.0099792480469],
            [-2.0711669921875, 39.0099792480469],
            [7.578857421875, 30.3600158691406],
            [21.048828125, 13.9999694824219],
            [20.6888427734375, 39.0099792480469],
            [31.6588134765625, 39.0099792480469],
            [30.9088134765625, 7.49996948242188],
            [51.3688354492188, -9.57998657226562],
            [111.998840332031, -28.8299865722656]
        ];
        const inTangents: [number, number][] = [
            [3.7000732421875, 3.4599609375],
            [0, 0],
            [2.05999755859375, -2.77996826171875],
            [2.88995361328125, -2.13995361328125],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [-6.55999755859375, -20.6599731445312],
            [-4.39996337890625, -3.90997314453125],
            [0, 0],
            [-1.93998718261719, 2],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [-13.47998046875, 1.44000244140625],
            [-0.02001953125, 8.16998291015625]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [-0.760009765625, 3.3699951171875],
            [-1.3599853515625, 1.77001953125],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [-2.65997314453125, 19],
            [1.25, 3.95001220703125],
            [0, 0],
            [3.52003479003906, -3],
            [3.54998779296875, -3.6700439453125],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [13.4700927734375, -1.45001220703125],
            [0.010009765625, -3.17999267578125]
        ];

        createPathGrp(
            contents,
            'Helmet_Middle',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [0.0012, 16.58]
        );
    };

    const createHelmetBottom = () => {
        const vertices: [number, number][] = [
            [89.9184722900391, -2.84226989746094],
            [90.6384429931641, 11.9577178955078],
            [71.1484527587891, 20.6177520751953],
            [45.1684722900391, -7.90226745605469],
            [44.5884552001953, -32.3522796630859],
            [34.1984405517578, -32.3522796630859],
            [33.8584747314453, -9.10227966308594],
            [5.46846008300781, -12.4722747802734],
            [20.8684844970703, -25.9422454833984],
            [26.3784942626953, -32.3522796630859],
            [-94.5115203857422, -32.3522796630859],
            [-93.7815399169922, -29.9122772216797],
            [-72.0115203857422, -10.0622406005859],
            [-47.4715423583984, -6.69224548339844],
            [37.2284698486328, 2.92774963378906],
            [66.0984649658203, 31.8077545166016],
            [94.2484283447266, 14.2977447509766]
        ];
        const inTangents: [number, number][] = [
            [4.3299560546875, 5.4100341796875],
            [0.9700927734375, -1.38995361328125],
            [5.23004150390625, 1.07000732421875],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [-3.6700439453125, 3.78997802734375],
            [-2.1500244140625, 2.6300048828125],
            [0, 0],
            [-0.260009765625, -0.79998779296875],
            [-8.45001220703125, -1.95001220703125],
            [-16.3599853515625, 0.47998046875],
            [0, 0],
            [-9.52001953125, -3.69000244140625],
            [-1.0799560546875, 6.5]
        ];
        const outTangents: [number, number][] = [
            [3.6099853515625, 9.20001220703125],
            [-4.5098876953125, 6.489990234375],
            [-8.5, -1.75],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [1.26995849609375, -1.32000732421875],
            [0, 0],
            [0.22998046875, 0.82000732421875],
            [2.3800048828125, 7.5],
            [7.82000732421875, 1.79998779296875],
            [0, 0],
            [0, 0],
            [9.1400146484375, 3.52996826171875],
            [0.77001953125, -4.60003662109375]
        ];

        createPathGrp(
            contents,
            'Helmet_Bottom',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-13.2885, 72.8823]
        );
    };

    createHelmetBottom();
    createHelmetMiddle();
    createHelmetTop();
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer);
};

const createRunningWithM16Icon: CreateIconFn = (
    circleColor,
    iconColor,
    hasCircle,
    scale
) => {
    const { layer, contents, circleColorRgb, iconColorRgb } = setUpIcon(
        'Running With M16',
        circleColor,
        iconColor
    );

    const createBody = () => {
        const vertices: [number, number][] = [
            [-112.426223754883, 92.5795745849609],
            [-97.9319763183594, 77.8319702148438],
            [-49.4823760986328, 47.4068756103516],
            [-46.4323272705078, 42.8886108398438],
            [-38.4660949707031, -0.35137939453125],
            [-36.8851776123047, -5.24737548828125],
            [6.10946655273438, -99.8761749267578],
            [36.7722015380859, -111.243118286133],
            [66.6426239013672, -97.4080200195312],
            [78.7846527099609, -66.5413818359375],
            [79.1910247802734, -63.3890838623047],
            [82.0041198730469, -59.7902526855469],
            [62.9147796630859, -55.8725738525391],
            [58.1524353027344, -59.1194610595703],
            [52.8610382080078, -74.1751403808594],
            [54.0639495849609, -48.7123565673828],
            [56.428955078125, -46.6899871826172],
            [101.744079589844, -33.6977844238281],
            [112.425430297852, -20.3093109130859],
            [103.01188659668, -6.97785949707031],
            [94.1098022460938, -6.88980102539062],
            [37.9207458496094, -22.9569396972656],
            [26.7787933349609, -37.3346099853516],
            [25.1080474853516, -70.3237457275391],
            [24.4043426513672, -72.4245758056641],
            [19.1839599609375, -48.5726013183594],
            [16.5473937988281, -35.9197692871094],
            [14.1225891113281, -33.5236358642578],
            [-3.29081726074219, -29.9604339599609],
            [-16.9640045166016, -9.20619201660156],
            [-13.3678283691406, 8.20149230957031],
            [-8.261962890625, 17.7016754150391],
            [-7.05726623535156, 21.6361083984375],
            [-13.8439331054688, 57.8597259521484],
            [-23.1189880371094, 71.9060668945312],
            [-84.6015472412109, 110.749938964844],
            [-111.848785400391, 101.050247192383],
            [-112.426223754883, 100.355545043945]
        ];
        const inTangents: [number, number][] = [
            [0, 2.59199523925781],
            [-6.08999633789062, 3.77340698242188],
            [-16.1884918212891, 10.0797424316406],
            [-0.365478515625, 2.0068359375],
            [-2.66670227050781, 14.4112701416016],
            [-0.72198486328125, 1.58645629882812],
            [-14.3258056640625, 31.5455474853516],
            [-13.1468658447266, -6.06570434570312],
            [-9.97087097167969, -4.58110046386719],
            [5.89630126953125, -14.0601654052734],
            [-0.97071838378906, -1.01828002929688],
            [-1.08683776855469, -1.41046142578125],
            [6.3111572265625, -1.04669189453125],
            [0.73167419433594, 2.72215270996094],
            [2.14225769042969, 4.9158935546875],
            [-0.342041015625, -8.48997497558594],
            [-1.11137390136719, -0.31776428222656],
            [-15.0945892333984, -4.3668212890625],
            [-0.06613159179688, -6.32377624511719],
            [5.74870300292969, -1.99455261230469],
            [2.97908020019531, 0.85142517089844],
            [18.718017578125, 5.39619445800781],
            [0.38520812988281, 7.70712280273438],
            [0.56338500976562, 10.9960479736328],
            [0.55419921875, 0.73114013671875],
            [1.72848510742188, -7.95318603515625],
            [0.75076293945312, -4.24034118652344],
            [1.48565673828125, -0.28349304199219],
            [5.7913818359375, -1.24974060058594],
            [-2.01731872558594, -9.98823547363281],
            [-1.13461303710938, -5.81507873535156],
            [-2.83171081542969, -2.5064697265625],
            [0.322021484375, -1.66146850585938],
            [2.10737609863281, -12.1017456054688],
            [5.2972412109375, -3.31947326660156],
            [20.3691711425781, -13.1419982910156],
            [2.57928466796875, 10.8191375732422],
            [0.19818115234375, 0.23020935058594]
        ];
        const outTangents: [number, number][] = [
            [2.51608276367188, -7.19697570800781],
            [16.2102966308594, -10.0440826416016],
            [1.85075378417969, -1.15237426757812],
            [2.62586975097656, -14.4187316894531],
            [0.31410217285156, -1.69741821289062],
            [14.3509979248047, -31.5340881347656],
            [5.96858215332031, -13.1428985595703],
            [9.96359252929688, 4.59701538085938],
            [13.8972778320312, 6.38508605957031],
            [-0.52276611328125, 1.24659729003906],
            [0.9573974609375, 1.00433349609375],
            [-6.54115295410156, 1.37763977050781],
            [-2.05946350097656, 0.341552734375],
            [-1.37696838378906, -5.12300109863281],
            [0.41143798828125, 8.4871826171875],
            [0.06990051269531, 1.73524475097656],
            [15.1081848144531, 4.31980895996094],
            [6.56407165527344, 1.89897155761719],
            [0.06343078613281, 6.06716918945312],
            [-2.961669921875, 1.02757263183594],
            [-18.7304229736328, -5.35319519042969],
            [-7.31805419921875, -2.10969543457031],
            [-0.54963684082031, -10.9967498779297],
            [-0.03518676757812, -0.68687438964844],
            [-1.74136352539062, 7.95039367675781],
            [-0.9150390625, 4.21040344238281],
            [-0.27662658691406, 1.56239318847656],
            [-5.81930541992188, 1.11044311523438],
            [-10.0334625244141, 2.16514587402344],
            [1.17300415039062, 5.80780029296875],
            [0.72628784179688, 3.72230529785156],
            [1.32591247558594, 1.17362976074219],
            [-2.33750915527344, 12.0602569580078],
            [-1.06781005859375, 6.1319580078125],
            [-20.5419006347656, 12.8723754882812],
            [-11.41259765625, 7.36332702636719],
            [-0.06259155273438, -0.26255798339844],
            [0, -2.59199523925781]
        ];

        createPathGrp(
            contents,
            'Body',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-53.4611, 28.5644]
        );
    };

    const createRLeg = () => {
        const vertices: [number, number][] = [
            [-36.4159240722656, -36.2896575927734],
            [0.18609619140625, -54.5562591552734],
            [5.24899291992188, -54.6132049560547],
            [25.7752227783203, -44.4268951416016],
            [36.3846282958984, -27.3234710693359],
            [36.3619689941406, 37.1324005126953],
            [20.8439483642578, 55.2081146240234],
            [1.95535278320312, 41.5594177246094],
            [1.58444213867188, 36.4136199951172],
            [1.65119934082031, -14.1138610839844],
            [-1.596923828125, -19.1658172607422]
        ];
        const inTangents: [number, number][] = [
            [11.6434478759766, 5.74180603027344],
            [-12.1006317138672, 6.12417602539062],
            [-1.85182189941406, -0.95578002929688],
            [-6.84953308105469, -3.38108825683594],
            [-0.00755310058594, -7.86526489257812],
            [0.0916748046875, -21.4849243164062],
            [8.8824462890625, -0.81326293945312],
            [1.9649658203125, 8.84284973144531],
            [0.00259399414062, 1.71812438964844],
            [-0.16444396972656, 16.8411407470703],
            [2.2568359375, 1.09333801269531]
        ];
        const outTangents: [number, number][] = [
            [12.3391571044922, -6.13996887207031],
            [1.8148193359375, -0.91844177246094],
            [6.78668212890625, 3.50276184082031],
            [7.08619689941406, 3.49789428710938],
            [0.02059936523438, 21.4853057861328],
            [-0.0416259765625, 9.75718688964844],
            [-9.05293273925781, 0.828857421875],
            [-0.3692626953125, -1.66181945800781],
            [-0.0255126953125, -16.8427276611328],
            [0.02676391601562, -2.74067687988281],
            [-11.6180267333984, -5.62857055664062]
        ];

        createPathGrp(
            contents,
            'R_Leg',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-9.4068, 87.3026]
        );
    };

    const createHead = () => {
        const vertices: [number, number][] = [
            [31.2649383544922, -0.05308532714844],
            [0.06922912597656, 31.2880706787109],
            [-31.2645721435547, 0.05278015136719],
            [-0.04360961914062, -31.2880096435547]
        ];
        const inTangents: [number, number][] = [
            [-0.03712463378906, -17.3032684326172],
            [17.2919464111328, -0.05267333984375],
            [0.09197998046875, 17.3253173828125],
            [-17.2840728759766, 0.0626220703125]
        ];
        const outTangents: [number, number][] = [
            [0.03707885742188, 17.2826538085938],
            [-17.2353363037109, 0.052490234375],
            [-0.09129333496094, -17.1961517333984],
            [17.2443084716797, -0.06248474121094]
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
            [26.4224, -111.3031]
        );
    };

    const createM16Top = () => {
        const vertices: [number, number][] = [
            [3.55961608886719, 7.17466735839844],
            [7.6522216796875, 11.4467620849609],
            [1.87889099121094, 19.8394317626953],
            [-28.8368225097656, 26.1351165771484],
            [-32.2675476074219, 24.7341003417969],
            [-45.1245269775391, 15.9963531494141],
            [-69.2481842041016, 9.03141784667969],
            [-53.6650085449219, 5.76966857910156],
            [36.6334381103516, -12.4796142578125],
            [39.1605834960938, -17.7775268554688],
            [46.5835418701172, -26.0654754638672],
            [51.5973510742188, -19.6704254150391],
            [56.2350311279297, -16.5531463623047],
            [61.9317016601562, -17.6854553222656],
            [69.1845245361328, -12.3954925537109],
            [63.9355621337891, -5.35377502441406],
            [38.92822265625, -0.18934631347656],
            [6.61550903320312, 6.36882019042969]
        ];
        const inTangents: [number, number][] = [
            [1.24903869628906, -0.33245849609375],
            [-0.59196472167969, -1.98512268066406],
            [4.64898681640625, -0.95655822753906],
            [10.2193908691406, -2.18794250488281],
            [0.94415283203125, 1.27908325195312],
            [5.25469970703125, 1.502197265625],
            [8.63679504394531, 2.49581909179688],
            [-4.92704772949219, 1.002685546875],
            [-30.1303558349609, 5.92620849609375],
            [0.51806640625, 2.44602966308594],
            [-4.9351806640625, -1.12055969238281],
            [-0.23208618164062, -3.05796813964844],
            [-3.0389404296875, 0.9952392578125],
            [-1.92036437988281, 0.20481872558594],
            [-0.49386596679688, -3.4844970703125],
            [3.60922241210938, -0.77719116210938],
            [8.34030151367188, -1.69967651367188],
            [10.7693176269531, -2.19386291503906]
        ];
        const outTangents: [number, number][] = [
            [1.93939208984375, 1.15879821777344],
            [1.19287109375, 4.00016784667969],
            [-10.2371215820312, 2.10635375976562],
            [-1.7021484375, 0.36444091796875],
            [-3.24549865722656, -4.39674377441406],
            [-7.74894714355469, -2.21524047851562],
            [5.73997497558594, -1.2030029296875],
            [30.0914001464844, -6.12393188476562],
            [4.10990905761719, -0.808349609375],
            [-1.13441467285156, -5.35624694824219],
            [3.34609985351562, 0.75975036621094],
            [0.252685546875, 3.3294677734375],
            [1.82855224609375, -0.59884643554688],
            [3.8272705078125, -0.40817260742188],
            [0.46383666992188, 3.2725830078125],
            [-8.32066345214844, 1.79167175292969],
            [-10.7691650390625, 2.19462585449219],
            [-0.91372680664062, 0.18614196777344]
        ];

        createPathGrp(
            contents,
            'M16_Top',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [96.6392, -30.9853]
        );
    };

    const createM16Bottom = () => {
        const vertices: [number, number][] = [
            [29.4790191650391, -2.853515625],
            [-9.61445617675781, 16.7855377197266],
            [-26.5176544189453, 8.40226745605469],
            [-29.2888488769531, -5.53448486328125],
            [-22.9286041259766, -15.5811004638672],
            [-5.19541931152344, -19.1757659912109],
            [-2.957275390625, -18.1382446289062],
            [10.0404510498047, -8.43539428710938]
        ];
        const inTangents: [number, number][] = [
            [-7.07809448242188, -2.04452514648438],
            [12.5193939208984, -6.84977722167969],
            [1.21629333496094, 10.9260559082031],
            [0.90086364746094, 4.65199279785156],
            [-4.75759887695312, 1.08135986328125],
            [-5.90170288085938, 1.24363708496094],
            [-0.5478515625, -1.13551330566406],
            [-5.6817626953125, -1.50828552246094]
        ];
        const outTangents: [number, number][] = [
            [-13.5962677001953, 6.77742004394531],
            [-9.19235229492188, 5.02940368652344],
            [-0.52210998535156, -4.69000244140625],
            [-0.92912292480469, -4.79791259765625],
            [5.87950134277344, -1.33627319335938],
            [1.1536865234375, -0.24311828613281],
            [2.6356201171875, 5.46273803710938],
            [6.21199035644531, 1.6490478515625]
        ];

        createPathGrp(
            contents,
            'M16_Bottom',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-32.5757, 22.8265]
        );
    };

    const createRHand = () => {
        const vertices: [number, number][] = [
            [15.7018737792969, -5.04953002929688],
            [5.26484680175781, 2.65328979492188],
            [-13.3794555664062, 4.82839965820312],
            [-15.6500549316406, 3.70761108398438],
            [-14.0944213867188, 0.90434265136719]
        ];
        const inTangents: [number, number][] = [
            [-10.1698608398438, 2.04397583007812],
            [4.60586547851562, -0.66334533691406],
            [6.21833801269531, -0.69754028320312],
            [0.0936279296875, 1.95742797851562],
            [-1.89579772949219, 0.36663818359375]
        ];
        const outTangents: [number, number][] = [
            [-2.30854797363281, 4.59469604492188],
            [-6.19085693359375, 0.89166259765625],
            [-0.95414733886719, 0.10704040527344],
            [-0.0650634765625, -1.35978698730469],
            [9.82389831542969, -1.89984130859375]
        ];

        createPathGrp(
            contents,
            'R_Hand',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [84.8898, 2.3984]
        );
    };

    createRHand();
    createM16Bottom();
    createM16Top();
    createHead();
    createRLeg();
    createBody();
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer, 220);
};

const createCrouchingWithM16Icon: CreateIconFn = (
    circleColor,
    iconColor,
    hasCircle,
    scale
) => {
    const { layer, contents, circleColorRgb, iconColorRgb } = setUpIcon(
        'Crouching With M16',
        circleColor,
        iconColor
    );

    const createM16 = () => {
        const vertices: [number, number][] = [
            [114.406814575195, -20.4551391601562],
            [107.558364868164, -15.7241973876953],
            [51.3649139404297, -4.26710510253906],
            [48.8287658691406, -3.33200073242188],
            [52.6322784423828, 4.38600158691406],
            [45.7724151611328, 9.4007568359375],
            [-0.89439392089844, 18.9436645507812],
            [-6.50015258789062, 17.7509613037109],
            [-30.3699798583984, 14.2151794433594],
            [-89.3620910644531, 34.7115478515625],
            [-97.5578460693359, 36.3651733398438],
            [-111.498275756836, 37.0146026611328],
            [-114.072570800781, 33.6849212646484],
            [-107.236038208008, 27.5370330810547],
            [-56.4315490722656, 17.2422027587891],
            [-39.9302368164062, 13.9010620117188],
            [-40.5143280029297, 12.9894409179688],
            [-43.7469329833984, 6.18717956542969],
            [-38.1873779296875, 1.02996826171875],
            [-19.1390991210938, -2.86758422851562],
            [82.4623870849609, -23.5495300292969],
            [84.5990600585938, -26.5872192382812],
            [83.9280090332031, -30.0785827636719],
            [89.0165100097656, -36.9294281005859],
            [96.1815643310547, -32.7738494873047],
            [96.3255004882812, -32.1411895751953],
            [103.853607177734, -27.9219055175781],
            [114.406814575195, -23.7043609619141]
        ];
        const inTangents: [number, number][] = [
            [0, -1.08306884765625],
            [3.13702392578125, -0.62158203125],
            [18.7282867431641, -3.83367919921875],
            [0.80705261230469, -0.75230407714844],
            [0.85542297363281, -3.49858093261719],
            [3.09141540527344, -0.62614440917969],
            [15.5469665527344, -3.22271728515625],
            [1.87548828125, 1.47311401367188],
            [8.57583618164062, -2.9794921875],
            [19.6604156494141, -6.84254455566406],
            [2.86038208007812, -0.05177307128906],
            [4.62104797363281, -0.47567749023438],
            [-0.67047119140625, 2.2032470703125],
            [-3.52459716796875, 0.71028137207031],
            [-16.934326171875, 3.43415832519531],
            [-5.49114990234375, 1.11174011230469],
            [0.31700134277344, 0.1903076171875],
            [-0.57925415039062, 3.01693725585938],
            [-2.891357421875, 0.59393310546875],
            [-6.35002136230469, 1.29624938964844],
            [-33.8787994384766, 6.83633422851562],
            [0.81050109863281, 2.18873596191406],
            [0.10990905761719, 1.17742919921875],
            [-3.28433227539062, 0.66543579101562],
            [-1.09934997558594, -3.07931518554688],
            [-0.06117248535156, -0.20706176757812],
            [-5.89617919921875, 1.30375671386719],
            [-2.28370666503906, -4.76947021484375]
        ];
        const outTangents: [number, number][] = [
            [-1.51095581054688, 2.69660949707031],
            [-18.7516479492188, 3.71556091308594],
            [-0.84310913085938, 0.17257690429688],
            [3.123779296875, 1.67826843261719],
            [-0.85594177246094, 3.50074768066406],
            [-15.5615234375, 3.15187072753906],
            [-2.11674499511719, 0.43878173828125],
            [-7.21044921875, -5.66342163085938],
            [-19.6641235351562, 6.83189392089844],
            [-2.66264343261719, 0.92669677734375],
            [-4.65118408203125, 0.08419799804688],
            [-3.14605712890625, 0.32383728027344],
            [1.03245544433594, -3.39283752441406],
            [16.9384918212891, -3.41348266601562],
            [5.50474548339844, -1.11631774902344],
            [0.22010803222656, -0.58668518066406],
            [-2.5894775390625, -1.55455017089844],
            [0.58326721191406, -3.03794860839844],
            [6.34841918945312, -1.3040771484375],
            [33.8634185791016, -6.91259765625],
            [2.02326965332031, -0.40827941894531],
            [-0.40650939941406, -1.09768676757812],
            [-0.3155517578125, -3.38023376464844],
            [3.11659240722656, -0.63143920898438],
            [0.07218933105469, 0.20219421386719],
            [1.63140869140625, 5.52317810058594],
            [6.21296691894531, -1.37380981445312],
            [0, 1.08306884765625]
        ];

        createPathGrp(
            contents,
            'M16',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [52.2731, -96.1919]
        );
    };

    const createBody = () => {
        const vertices: [number, number][] = [
            [-18.2429656982422, -60.8072967529297],
            [10.8074340820312, -47.6115417480469],
            [12.7822723388672, -43.6678161621094],
            [5.20391845703125, 2.17286682128906],
            [23.6801452636719, -1.58079528808594],
            [44.2853851318359, 11.5037231445312],
            [61.8495941162109, 76.20556640625],
            [63.0651397705078, 90.1854095458984],
            [50.0789489746094, 102.390869140625],
            [33.2238464355469, 95.7367401123047],
            [32.3244476318359, 92.2133483886719],
            [25.25537109375, 68.346435546875],
            [23.4595336914062, 64.6338806152344],
            [16.264404296875, 37.7264556884766],
            [12.3569030761719, 35.3927459716797],
            [-15.8574676513672, 41.3509216308594],
            [-22.8273162841797, 40.1351013183594],
            [-28.8280639648438, 36.8961181640625],
            [-26.7115936279297, 39.9068298339844],
            [12.4074249267578, 72.076416015625],
            [18.4773101806641, 88.8392333984375],
            [0.68244934082031, 102.280364990234],
            [-78.9021148681641, 102.291213989258],
            [-88.6446685791016, 102.226119995117],
            [-103.471099853516, 92.7962493896484],
            [-102.387634277344, 76.1646881103516],
            [-87.82421875, 68.4646453857422],
            [-49.8185272216797, 68.4616394042969],
            [-46.3020324707031, 68.4616088867188],
            [-48.7635040283203, 65.8384857177734],
            [-67.7572174072266, 50.0876159667969],
            [-77.4673004150391, 24.1064910888672],
            [-61.0843353271484, -76.7392730712891],
            [-36.8056182861328, -93.9627075195312],
            [22.1050872802734, -81.1958312988281],
            [28.1002197265625, -81.5593872070312],
            [86.8361663818359, -101.874923706055],
            [104.954681396484, -92.19091796875],
            [95.8866271972656, -76.3043212890625],
            [66.2417907714844, -65.9640808105469],
            [34.7859497070312, -54.9419250488281],
            [16.7033233642578, -54.4149475097656],
            [-14.4595794677734, -60.5834045410156]
        ];
        const inTangents: [number, number][] = [
            [1.91716003417969, 0.10490417480469],
            [-9.4251708984375, -4.16860961914062],
            [0.35322570800781, -2.06492614746094],
            [2.55599975585938, -15.5783386230469],
            [-6.08700561523438, 1.09724426269531],
            [-2.72007751464844, -9.99430847167969],
            [-5.88192749023438, -21.5598602294922],
            [1.54179382324219, -4.83494567871094],
            [6.78271484375, -1.33544921875],
            [4.37562561035156, 5.37294006347656],
            [-0.27891540527344, 1.49459838867188],
            [6.44895935058594, 6.71896362304688],
            [0.36308288574219, 1.34159851074219],
            [2.27772521972656, 8.99972534179688],
            [2.42169189453125, -0.54452514648438],
            [9.3782958984375, -2.10415649414062],
            [2.20280456542969, 1.46150207519531],
            [2.15690612792969, 1.14662170410156],
            [-0.81968688964844, -0.67619323730469],
            [-13.0099945068359, -10.7590637207031],
            [1.42182922363281, -6.75758361816406],
            [9.35121154785156, -0.01202392578125],
            [26.5281982421875, 0.00263977050781],
            [3.2376708984375, 0.18994140625],
            [3.01341247558594, 6.07756042480469],
            [-3.51380920410156, 5.24948120117188],
            [-6.20648193359375, 0.00259399414062],
            [-12.6685638427734, 0.00048828125],
            [-1.38876342773438, 0],
            [0.84025573730469, 0.7000732421875],
            [6.31185913085938, 5.27348327636719],
            [-1.71568298339844, 10.5324249267578],
            [-5.47233581542969, 33.6134033203125],
            [-11.7816009521484, -2.42796325683594],
            [-19.6202545166016, -4.33224487304688],
            [-2.00468444824219, 0.6973876953125],
            [-19.6017761230469, 6.70433044433594],
            [-2.01615905761719, -8.23443603515625],
            [7.00627136230469, -2.5230712890625],
            [9.88623046875, -3.43377685546875],
            [10.3627471923828, -3.99211120605469],
            [6.12571716308594, 1.31594848632812],
            [10.3951568603516, 2.0191650390625]
        ];
        const outTangents: [number, number][] = [
            [10.2753753662109, 4.688232421875],
            [-2.58638000488281, 15.1183166503906],
            [1.99583435058594, 0.88272094726562],
            [6.34906005859375, -1.29922485351562],
            [10.1883697509766, -1.83659362792969],
            [5.86878967285156, 21.5634307861328],
            [1.255859375, 4.60330200195312],
            [-2.06710815429688, 6.48225402832031],
            [-6.94436645507812, 1.36724853515625],
            [-0.84791564941406, -1.04116821289062],
            [1.70135498046875, -9.11668395996094],
            [-1.05435180664062, -1.09848022460938],
            [-2.42549133300781, -8.96212768554688],
            [-0.6090087890625, -2.40628051757812],
            [-9.37725830078125, 2.10844421386719],
            [-2.64366149902344, 0.5931396484375],
            [-1.81643676757812, -1.20516967773438],
            [-0.06045532226562, 1.97483825683594],
            [13.0228271484375, 10.74365234375],
            [5.26422119140625, 4.35342407226562],
            [-1.77413940429688, 8.43197631835938],
            [-26.5281524658203, 0.03408813476562],
            [-3.24812316894531, -0.00033569335938],
            [-6.6463623046875, -0.38992309570312],
            [-2.82499694824219, -5.69760131835938],
            [3.41561889648438, -5.102783203125],
            [12.6685638427734, -0.00534057617188],
            [1.06385803222656, -0.00006103515625],
            [-0.55056762695312, -1.37489318847656],
            [-6.31907653808594, -5.264892578125],
            [-8.15101623535156, -6.81005859375],
            [5.47538757324219, -33.6129150390625],
            [1.94731140136719, -11.9612121582031],
            [19.6783752441406, 4.05534362792969],
            [2.11405944824219, 0.466796875],
            [19.5665130615234, -6.80682373046875],
            [8.27552795410156, -2.83045959472656],
            [1.6361083984375, 6.68226623535156],
            [-9.84599304199219, 3.54566955566406],
            [-10.496337890625, 3.64570617675781],
            [-6.12852478027344, 2.36094665527344],
            [-10.3517303466797, -2.22380065917969],
            [-0.91032409667969, -0.17683410644531]
        ];

        createPathGrp(
            contents,
            'Body',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [-60.7939, 29.8704]
        );
    };

    const createHead = () => {
        const vertices: [number, number][] = [
            [-13.4357299804688, 28.9772338867188],
            [-29.4022674560547, -6.72044372558594],
            [2.60710144042969, -28.88671875],
            [30.3855895996094, -2.01850891113281],
            [30.4932098388672, 4.77635192871094],
            [26.983154296875, 8.71430969238281],
            [2.80833435058594, 13.4156341552734]
        ];
        const inTangents: [number, number][] = [
            [1.88044738769531, -9.04072570800781],
            [-3.98115539550781, 14.1634368896484],
            [-14.5939788818359, -1.11811828613281],
            [-1.61392211914062, -14.2208709716797],
            [0.05400085449219, -2.27436828613281],
            [2.44789123535156, -0.43898010253906],
            [8.07565307617188, -1.47203063964844]
        ];
        const outTangents: [number, number][] = [
            [-13.387451171875, -6.63441467285156],
            [3.91758728027344, -13.9372711181641],
            [14.2317199707031, 1.09036254882812],
            [0.25759887695312, 2.26974487304688],
            [-0.05972290039062, 2.51481628417969],
            [-8.07945251464844, 1.44883728027344],
            [-8.81629943847656, 1.60704040527344]
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
            [-57.897, -91.5925]
        );
    };

    createHead();
    createBody();
    createM16();
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer, 220);
};

const createDroneIcon: CreateIconFn = (
    circleColor,
    iconColor,
    hasCircle,
    scale
) => {
    const { layer, contents, circleColorRgb, iconColorRgb } = setUpIcon(
        'Drone',
        circleColor,
        iconColor
    );

    const createDrone = () => {
        const vertices: [number, number][] = [
            [166.69921875, -22.0413208007812],
            [144.672119140625, -24.6941528320312],
            [139.252685546875, -22.4027099609375],
            [133.51416015625, -27.059326171875],
            [126.81201171875, -23.8638305664062],
            [122.047119140625, -27.4744262695312],
            [100.02001953125, -30.127197265625],
            [93.419677734375, -24.9457397460938],
            [98.60107421875, -18.3453369140625],
            [120.628173828125, -15.6925048828125],
            [126.078857421875, -18.0238037109375],
            [127.276245117188, -15.8048706054688],
            [117.7529296875, -4.8201904296875],
            [117.391723632812, -1.82110595703125],
            [71.8065185546875, -7.31109619140625],
            [72.8186187744141, -15.7147216796875],
            [59.1074066162109, -33.1807250976562],
            [-56.8676147460938, -47.1480102539062],
            [-74.3335571289062, -33.436767578125],
            [-75.3456573486328, -25.0331420898438],
            [-122.264892578125, -30.683837890625],
            [-121.755676269531, -34.9120483398438],
            [-128.398620605469, -47.8436889648438],
            [-126.767578125, -49.622802734375],
            [-122.047058105469, -46.1102905273438],
            [-100.02001953125, -43.45751953125],
            [-93.4196166992188, -48.6389770507812],
            [-98.60107421875, -55.2393798828125],
            [-120.628112792969, -57.8922119140625],
            [-126.047607421875, -55.6007690429688],
            [-131.786071777344, -60.2573852539062],
            [-138.488159179688, -57.0618896484375],
            [-143.253173828125, -60.6724853515625],
            [-165.280212402344, -63.3252563476562],
            [-171.880615234375, -58.143798828125],
            [-166.699157714844, -51.5433959960938],
            [-144.672119140625, -48.8905639648438],
            [-139.221374511719, -51.2218627929688],
            [-138.023986816406, -49.0029296875],
            [-147.547302246094, -38.0182495117188],
            [-148.056518554688, -33.7899780273438],
            [-160.670959472656, -35.3092041015625],
            [-168.761901855469, -28.9575805664062],
            [-170.297302246094, -16.208984375],
            [-163.945678710938, -8.1180419921875],
            [-78.620361328125, 2.15802001953125],
            [-80.5955810546875, 18.5590209960938],
            [-67.2755126953125, 35.957763671875],
            [-68.1929321289062, 43.5751342773438],
            [-62.3897094726562, 50.9675903320312],
            [-62.3896484375, 50.9675903320312],
            [-54.9971923828125, 45.1643676757812],
            [-54.0822296142578, 37.5668334960938],
            [35.2887573242188, 48.3300170898438],
            [34.3737640380859, 55.9276123046875],
            [40.1770172119141, 63.320068359375],
            [47.5694580078125, 57.5167846679688],
            [48.4844818115234, 49.9192504882812],
            [49.0906372070312, 49.9922485351562],
            [66.5566558837891, 36.2810668945312],
            [68.53173828125, 19.8800659179688],
            [154.080322265625, 30.1829833984375],
            [162.17138671875, 23.8313598632812],
            [163.706787109375, 11.082763671875],
            [157.355102539062, 2.9918212890625],
            [143.183349609375, 1.28509521484375],
            [143.544555664062, -1.7139892578125],
            [136.901611328125, -14.6456298828125],
            [138.53271484375, -16.4248046875],
            [143.253173828125, -12.9122314453125],
            [165.2802734375, -10.2594604492188],
            [171.880615234375, -15.44091796875]
        ];
        const inTangents: [number, number][] = [
            [3.25341796875, 0.39178466796875],
            [0, 0],
            [1.23388671875, -1.611328125],
            [2.737060546875, 0.32965087890625],
            [1.3876953125, -2.19696044921875],
            [2.19921875, 0.264892578125],
            [0, 0],
            [0.3917236328125, -3.25347900390625],
            [-3.25341796875, -0.39178466796875],
            [0, 0],
            [-1.23095703125, 1.6361083984375],
            [-0.5284423828125, -0.656005859375],
            [0.652587890625, -5.41937255859375],
            [0, 0],
            [0, 0],
            [0, 0],
            [8.60939025878906, 1.036865234375],
            [0, 0],
            [1.036865234375, -8.609375],
            [0, 0],
            [0, 0],
            [0, 0],
            [4.50640869140625, 2.4786376953125],
            [-0.4395751953125, 0.6868896484375],
            [-2.1610107421875, -0.26025390625],
            [0, 0],
            [-0.39178466796875, 3.25347900390625],
            [3.25347900390625, 0.39178466796875],
            [0, 0],
            [1.2340087890625, -1.611328125],
            [2.737060546875, 0.32958984375],
            [1.3876953125, -2.19696044921875],
            [2.19927978515625, 0.264892578125],
            [0, 0],
            [0.391845703125, -3.25347900390625],
            [-3.25347900390625, -0.39178466796875],
            [0, 0],
            [-1.23089599609375, 1.6361083984375],
            [-0.52850341796875, -0.656005859375],
            [0.6527099609375, -5.41937255859375],
            [0, 0],
            [0, 0],
            [0.48028564453125, -3.98822021484375],
            [0, 0],
            [-3.98822021484375, -0.48028564453125],
            [0, 0],
            [0, 0],
            [-8.40032958984375, -1.22552490234375],
            [0, 0],
            [-3.64385986328125, -0.4388427734375],
            [0, 0],
            [-0.4388427734375, 3.64385986328125],
            [0, 0],
            [0, 0],
            [0, 0],
            [-3.64393615722656, -0.4388427734375],
            [-0.4388427734375, 3.6439208984375],
            [0, 0],
            [0, 0],
            [-1.036865234375, 8.609375],
            [0, 0],
            [0, 0],
            [-0.4803466796875, 3.98822021484375],
            [0, 0],
            [3.9881591796875, 0.48028564453125],
            [0, 0],
            [0, 0],
            [4.50634765625, 2.4786376953125],
            [-0.439697265625, 0.68682861328125],
            [-2.1610107421875, -0.26025390625],
            [0, 0],
            [-0.391845703125, 3.25347900390625]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [-2.1610107421875, -0.26025390625],
            [-0.8363037109375, -2.4447021484375],
            [-2.7515869140625, -0.33135986328125],
            [-0.796875, -1.9078369140625],
            [0, 0],
            [-3.25341796875, -0.391845703125],
            [-0.391845703125, 3.25347900390625],
            [0, 0],
            [2.178955078125, 0.26239013671875],
            [0.26318359375, 0.81121826171875],
            [-4.966064453125, 1.33782958984375],
            [0, 0],
            [0, 0],
            [0, 0],
            [1.036865234375, -8.609375],
            [0, 0],
            [-8.60931396484375, -1.03680419921875],
            [0, 0],
            [0, 0],
            [0, 0],
            [0.65264892578125, -5.41937255859375],
            [0.6405029296875, -0.4898681640625],
            [0.816162109375, 1.8582763671875],
            [0, 0],
            [3.25347900390625, 0.391845703125],
            [0.391845703125, -3.25347900390625],
            [0, 0],
            [-2.1610107421875, -0.26025390625],
            [-0.83624267578125, -2.44476318359375],
            [-2.7515869140625, -0.33135986328125],
            [-0.796875, -1.9078369140625],
            [0, 0],
            [-3.25347900390625, -0.391845703125],
            [-0.391845703125, 3.25347900390625],
            [0, 0],
            [2.17901611328125, 0.26239013671875],
            [0.26324462890625, 0.81121826171875],
            [-4.966064453125, 1.337890625],
            [0, 0],
            [0, 0],
            [-3.9881591796875, -0.48028564453125],
            [0, 0],
            [-0.48028564453125, 3.98822021484375],
            [0, 0],
            [0, 0],
            [-1.02088928222656, 8.4764404296875],
            [0, 0],
            [-0.43885803222656, 3.64385986328125],
            [0, 0],
            [3.64385986328125, 0.4388427734375],
            [0, 0],
            [0, 0],
            [0, 0],
            [-0.4388427734375, 3.64385986328125],
            [3.64390563964844, 0.4388427734375],
            [0, 0],
            [0, 0],
            [8.60931396484375, 1.036865234375],
            [0, 0],
            [0, 0],
            [3.98828125, 0.48028564453125],
            [0, 0],
            [0.480224609375, -3.98822021484375],
            [0, 0],
            [0, 0],
            [0.6527099609375, -5.41937255859375],
            [0.640380859375, -0.4898681640625],
            [0.816162109375, 1.8582763671875],
            [0, 0],
            [3.25341796875, 0.391845703125],
            [0.391845703125, -3.25347900390625]
        ];

        createPathGrp(
            contents,
            'Drone',
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

    createDrone();
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer, 200);
};

const createTentIcon: CreateIconFn = (
    circleColor,
    iconColor,
    hasCircle,
    scale
) => {
    const { layer, contents, circleColorRgb, iconColorRgb } = setUpIcon(
        'Tent',
        circleColor,
        iconColor
    );

    const createTent = () => {
        const vertices: [number, number][] = [
            [-98.5404815673828, 48.0601501464844],
            [-126.751678466797, 73.2512664794922],
            [-133.593780517578, 82.4936828613281],
            [-138.805953979492, 65.1069793701172],
            [-130.075408935547, 60.671875],
            [-128.058120727539, 60.6524658203125],
            [-95.8792724609375, 31.8505859375],
            [-90.6877746582031, 20.6207122802734],
            [-29.0709838867188, -42.6084899902344],
            [-5.01272583007812, -78.7591400146484],
            [-0.35118103027344, -82.5047454833984],
            [4.65562438964844, -79.2748565673828],
            [85.2505493164062, 15.6759033203125],
            [96.3676605224609, 32.4019012451172],
            [127.294677734375, 60.0970153808594],
            [130.385711669922, 60.3466949462891],
            [138.558013916016, 64.0049896240234],
            [133.440307617188, 82.4944458007812],
            [128.408233642578, 77.5966186523438],
            [125.580444335938, 72.2987976074219],
            [98.3235321044922, 48.0645141601562],
            [98.2917633056641, 80.2535247802734],
            [35.5873870849609, 80.3302001953125],
            [5.00822448730469, 22.3052368164062],
            [-5.15403747558594, 22.2933807373047],
            [-16.3853759765625, 50.3178558349609],
            [-34.8841247558594, 80.3104705810547],
            [-97.5891571044922, 80.2596588134766]
        ];
        const inTangents: [number, number][] = [
            [0.55801391601562, 7.64497375488281],
            [9.61685180664062, -8.53497314453125],
            [5.72807312011719, 0.45405578613281],
            [0.74252319335938, 5.44680786132812],
            [-3.36799621582031, -3.62947082519531],
            [-0.74887084960938, 0.672607421875],
            [-10.7431793212891, 9.58172607421875],
            [-4.10333251953125, 2.77845764160156],
            [-19.1983489990234, 22.3808441162109],
            [-4.77114868164062, 13.8418426513672],
            [-2.39659118652344, 0.13294982910156],
            [-0.70997619628906, -2.22795104980469],
            [-28.6686859130859, -29.5264282226562],
            [-4.6649169921875, -9.77412414550781],
            [-10.2880249023438, -9.25474548339844],
            [-1.46942138671875, 1.197021484375],
            [-0.26287841796875, -4.26425170898438],
            [8.30789184570312, -0.81883239746094],
            [-0.02999877929688, 2.93020629882812],
            [1.64727783203125, 1.45846557617188],
            [9.37977600097656, 8.03341674804688],
            [11.207275390625, -1.06886291503906],
            [20.8995361328125, -0.1292724609375],
            [2.4552001953125, 10.4587860107422],
            [0.88127136230469, -6.08683776855469],
            [4.47587585449219, -9.03457641601562],
            [7.09922790527344, -3.24432373046875],
            [20.9010925292969, 0.01742553710938]
        ];
        const outTangents: [number, number][] = [
            [-9.86557006835938, 8.717529296875],
            [-2.97483825683594, 2.86474609375],
            [-7.9901123046875, -0.45719909667969],
            [-0.51533508300781, -4.66273498535156],
            [0.8153076171875, 0.79910278320312],
            [10.7098236083984, -9.61897277832031],
            [2.32661437988281, -3.64486694335938],
            [21.5007019042969, -20.1364898681641],
            [9.11459350585938, -11.1642761230469],
            [0.64530944824219, -2.25236511230469],
            [2.40107727050781, -0.13319396972656],
            [17.5132446289062, 37.9862213134766],
            [10.1730346679688, 8.54708862304688],
            [10.3310546875, 9.20767211914062],
            [1.03582763671875, 0.93177795410156],
            [3.2799072265625, -2.67192077636719],
            [-0.48712158203125, 5.78956604003906],
            [-2.70480346679688, -0.01434326171875],
            [0.02557373046875, -2.49809265136719],
            [-9.2523193359375, -8.095458984375],
            [-0.21180725097656, 8.10723876953125],
            [-20.8996887207031, 0.04722595214844],
            [-8.75579833984375, -2.29208374023438],
            [-0.87789916992188, -6.09564208984375],
            [-2.11538696289062, 9.99588012695312],
            [-4.88917541503906, 7.39175415039062],
            [-20.9027557373047, -0.06454467773438],
            [-12.7110290527344, 0.46697998046875]
        ];

        createPathGrp(
            contents,
            'Tent',
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

    createTent();
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer, 180);
};

const createAirplaneIcon: CreateIconFn = (
    circleColor,
    iconColor,
    hasCircle,
    scale
) => {
    const { layer, contents, circleColorRgb, iconColorRgb } = setUpIcon(
        'Airplane',
        circleColor,
        iconColor
    );

    const createAirplane = () => {
        const vertices: [number, number][] = [
            [73.7751617431641, 43.9639892578125],
            [73.7751617431641, 34.1128540039062],
            [50.7967681884766, 25.4818878173828],
            [50.7967681884766, 29.9192962646484],
            [56.8526763916016, 33.60791015625],
            [58.8245086669922, 43.5684661865234],
            [50.7967681884766, 40.1464080810547],
            [50.7967681884766, 48.28076171875],
            [42.1798706054688, 48.28076171875],
            [42.1798706054688, 40.9793701171875],
            [35.4411773681641, 42.4889068603516],
            [37.5294189453125, 32.4889068603516],
            [42.1798706054688, 29.5519409179688],
            [42.1798706054688, 22.0262298583984],
            [16.1860961914062, 10.2144775390625],
            [14.4833984375, 79.9995574951172],
            [42.8585510253906, 93.5476226806641],
            [47.8319396972656, 108.697265625],
            [12.4638824462891, 109.704299926758],
            [10.9631042480469, 120.088226318359],
            [-8.41629028320312, 120.088226318359],
            [-10.0095520019531, 109.704299926758],
            [-45.4700927734375, 108.287673950195],
            [-40.6819763183594, 93.3456878662109],
            [-12.6744842529297, 79.8955841064453],
            [-17.4315795898438, 10.1610412597656],
            [-46.8613891601562, 21.8633728027344],
            [-46.8613891601562, 29.5519409179688],
            [-39.8714141845703, 33.60791015625],
            [-40.1434173583984, 43.5684661865234],
            [-46.8613891601562, 40.9793701171875],
            [-46.8613891601562, 48.28076171875],
            [-52.6059875488281, 48.28076171875],
            [-52.6059875488281, 40.1464080810547],
            [-58.272216796875, 43.5684661865234],
            [-56.5976257324219, 33.6078796386719],
            [-52.6059875488281, 25.3193206787109],
            [-75.5843811035156, 33.9557495117188],
            [-75.5843811035156, 43.9639892578125],
            [-68.6702270507812, 48.01708984375],
            [-68.9169616699219, 57.9805145263672],
            [-75.5843811035156, 55.3885498046875],
            [-75.5843811035156, 59.7699584960938],
            [-81.3289794921875, 59.7699584960938],
            [-81.3289794921875, 54.56103515625],
            [-87.7356872558594, 57.9805145263672],
            [-86.8070678710938, 48.01708984375],
            [-84.2012786865234, 44.3313446044922],
            [-84.2012786865234, 37.4085388183594],
            [-105.081497192383, 46.5220489501953],
            [-124.163909912109, 33.5714263916016],
            [-84.2012786865234, 1.14578247070312],
            [-84.2012634277344, -33.8990783691406],
            [-75.5843811035156, -33.8994445800781],
            [-75.5843811035156, -5.26348876953125],
            [-52.6059875488281, -21.2940673828125],
            [-52.6059112548828, -48.31396484375],
            [-46.8613891601562, -48.3143615722656],
            [-46.8613891601562, -27.7090606689453],
            [-26.7552947998047, -42.1349029541016],
            [-26.7552947998047, -80.9726867675781],
            [-12.9042663574219, -80.9726867675781],
            [1.50749206542969, -120.088226318359],
            [15.4510803222656, -80.9726867675781],
            [27.8183898925781, -80.9726867675781],
            [27.8183898925781, -42.1349029541016],
            [42.1798706054688, -27.6725921630859],
            [42.1798858642578, -48.3139953613281],
            [50.7967681884766, -48.3143615722656],
            [50.7967681884766, -21.2463989257812],
            [73.7751617431641, -5.17645263671875],
            [73.7751770019531, -33.8990783691406],
            [82.3920593261719, -33.8994445800781],
            [82.3920593261719, 1.24974060058594],
            [124.163909912109, 33.5714263916016],
            [104.492340087891, 46.5220489501953],
            [82.3920593261719, 37.5630645751953],
            [82.3920593261719, 44.3313446044922],
            [87.0370941162109, 48.01708984375],
            [87.5980529785156, 57.9805145263672],
            [79.5197601318359, 54.56103515625],
            [79.5197601318359, 59.7699584960938],
            [73.7751617431641, 59.7699584960938],
            [73.7751617431641, 55.3885498046875],
            [67.4411773681641, 57.3712615966797],
            [70.4280395507812, 46.2443695068359]
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
            [4.83345031738281, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [-1.0286865234375, -0.63050842285156],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0.000244140625, 0.00003051757812],
            [0.24946594238281, 5.86605834960938],
            [0, 0],
            [0, 0],
            [-1.00566101074219, -0.61988830566406],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [-0.00001525878906, -0.0003662109375],
            [-0.00762939453125, -5.33209228515625],
            [0, 0],
            [0, 0],
            [-0.00007629394531, -0.00039672851562],
            [0.66188049316406, -5.39064025878906],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [-1.91926574707031, 0],
            [0, -38.7148742675781],
            [0, 0],
            [0, 0],
            [0, 0],
            [-0.00001525878906, -0.0003662109375],
            [-0.0089111328125, -5.32771301269531],
            [0, 0],
            [0, 0],
            [-0.00001525878906, -0.0003662109375],
            [-0.00570678710938, -5.33154296875],
            [0, 0],
            [0, 0],
            [0, 0],
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
            [-4.82231140136719, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [1.24998474121094, -0.17985534667969],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [3.95182800292969, -3.8297119140625],
            [0, 0],
            [0, 0],
            [1.22146606445312, -0.17207336425781],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0.00691223144531, -5.33914184570312],
            [0, 0],
            [0, 0],
            [0, 0],
            [-0.66242980957031, -5.395751953125],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, -39.1968383789062],
            [1.91926574707031, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0.01011657714844, -5.33335876464844],
            [0, 0],
            [0, 0],
            [0, 0],
            [0.00885009765625, -5.33969116210938],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
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
            'Airplane',
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

    createAirplane();
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer, 170);
};

const createSubmarineIcon: CreateIconFn = (
    circleColor,
    iconColor,
    hasCircle,
    scale
) => {
    const { layer, contents, circleColorRgb, iconColorRgb } = setUpIcon(
        'Submarine',
        circleColor,
        iconColor
    );

    const createBody = () => {
        const vertices: [number, number][] = [
            [126.16682434082, 0.12257385253906],
            [96.1533203125, -38.1096343994141],
            [-63.5599517822266, -38.1096343994141],
            [-86.0728759765625, -25.2462615966797],
            [-108.580047607422, -53.473876953125],
            [-118.942276000977, -53.473876953125],
            [-110.007995605469, -9.16934204101562],
            [-126.16682434082, -0.12257385253906],
            [-125.915893554688, 0.02392578125],
            [-126.084915161133, 0.12257385253906],
            [-110.087020874023, 9.16934204101562],
            [-119.021011352539, 53.473876953125],
            [-108.656188964844, 53.473876953125],
            [-86.1490173339844, 25.2491455078125],
            [-63.6389770507812, 38.1096343994141],
            [96.0774688720703, 38.1096343994141],
            [126.07942199707, 0.12257385253906]
        ];
        const inTangents: [number, number][] = [
            [0, 0],
            [17.5080413818359, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [-0.0986328125, 20.9693298339844]
        ];
        const outTangents: [number, number][] = [
            [0, -21.0820922851562],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [17.4373779296875, 0],
            [0, 0]
        ];

        createPathGrp(
            contents,
            'Body',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [0, 39.849]
        );
    };

    const createTop = () => {
        const vertices: [number, number][] = [
            [20.9002532958984, -42.1525726318359],
            [20.9002532958984, -30.0047607421875],
            [8.0400390625, -11.4266967773438],
            [8.39767456054688, 15.7306060791016],
            [18.7570343017578, 19.66259765625],
            [29.1218566894531, 42.1726379394531],
            [-29.1218566894531, 42.1726379394531],
            [-24.1195526123047, 21.8032073974609],
            [-6.61180114746094, 15.0153350830078],
            [-6.61180114746094, -13.2122802734375]
        ];
        const inTangents: [number, number][] = [
            [-20.3665313720703, -0.71527099609375],
            [0, 0],
            [0, -17.1472320556641],
            [0, 0],
            [-3.21382141113281, -5.71757507324219],
            [0, 0],
            [0, 0],
            [-2.85906982421875, 10.0072021484375],
            [-6.07261657714844, 0],
            [0, 11.0774993896484]
        ];
        const outTangents: [number, number][] = [
            [0, 0],
            [0, 0],
            [0, 17.1529998779297],
            [0, 0],
            [3.21641540527344, 5.71498107910156],
            [0, 0],
            [0, 0],
            [2.85877990722656, -10.0042877197266],
            [0, 0],
            [0, -11.0749053955078]
        ];

        createPathGrp(
            contents,
            'Top',
            true,
            false,
            iconColorRgb,
            iconColorRgb,
            0,
            vertices,
            inTangents,
            outTangents,
            true,
            [32.3765, -51.1502]
        );
    };

    createBody();
    createTop();
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer, 170);
};

// ====================================

const createIconFromId = (
    id: IconID,
    circleColor: string,
    iconColor: string,
    hasCircle: boolean,
    scale: boolean
): void => {
    app.beginUndoGroup(`@@name: Create Icon - ${id}`);

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
        case 'Shooting M16':
            createShootingM16Icon(circleColor, iconColor, hasCircle, scale);
            break;
        case 'Running With M16':
            createRunningWithM16Icon(circleColor, iconColor, hasCircle, scale);
            break;
        case 'Crouching With M16':
            createCrouchingWithM16Icon(
                circleColor,
                iconColor,
                hasCircle,
                scale
            );
            break;
        case 'Rocket':
            createRocketIcon(circleColor, iconColor, hasCircle, scale);
            break;
        case 'Rocket Launcher':
            createRocketLauncherIcon(circleColor, iconColor, hasCircle, scale);
            break;
        case 'Mask':
            createMaskIcon(circleColor, iconColor, hasCircle, scale);
            break;
        case 'Shoe':
            createShoeIcon(circleColor, iconColor, hasCircle, scale);
            break;
        case 'Helmet':
            createHelmetIcon(circleColor, iconColor, hasCircle, scale);
            break;
        case 'Drone':
            createDroneIcon(circleColor, iconColor, hasCircle, scale);
            break;
        case 'Tent':
            createTentIcon(circleColor, iconColor, hasCircle, scale);
            break;
        case 'Airplane':
            createAirplaneIcon(circleColor, iconColor, hasCircle, scale);
            break;
        case 'Submarine':
            createSubmarineIcon(circleColor, iconColor, hasCircle, scale);
            break;
    }

    app.endUndoGroup();
};
