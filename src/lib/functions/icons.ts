const createExplosionIcon = (
    circleColor: ColorDropdown,
    iconColor: ColorDropdown,
    hasCircle: Boolean,
    scale: boolean
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
    if (scale) scaleWithOvershoot([layer]);
};

const createTunnelIcon = (
    circleColor: ColorDropdown,
    iconColor: ColorDropdown,
    hasCircle: Boolean,
    scale: boolean
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
    if (scale) scaleWithOvershoot([layer]);
};

const createTerrorTunnelIcon = (
    circleColor: ColorDropdown,
    iconColor: ColorDropdown,
    hasCircle: Boolean,
    scale: boolean
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
    if (scale) scaleWithOvershoot([layer]);
};

const createTargetIcon = (
    circleColor: ColorDropdown,
    iconColor: ColorDropdown,
    hasCircle: Boolean,
    scale: boolean
): void => {
    const comp = app.project.activeItem as CompItem;
    const layer = comp.layers.addShape();
    layer.name = 'Target';
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
    if (hasCircle) createIconCircle(contents, circleColorRgb);
    if (scale) scaleWithOvershoot([layer]);
};

const createSniperTargetIcon = (
    circleColor: ColorDropdown,
    iconColor: ColorDropdown,
    hasCircle: Boolean,
    scale: boolean
): void => {
    const comp = app.project.activeItem as CompItem;
    const layer = comp.layers.addShape();
    layer.name = 'Sniper_Target';
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
    if (hasCircle) createIconCircle(contents, circleColorRgb);
    if (scale) scaleWithOvershoot([layer]);
};

const createHouseBombingIcon = (
    circleColor: ColorDropdown,
    iconColor: ColorDropdown,
    hasCircle: Boolean,
    scale: boolean
): void => {
    const comp = app.project.activeItem as CompItem;
    const layer = comp.layers.addShape();
    layer.name = 'House_Bombing';
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
    if (hasCircle) createIconCircle(contents, circleColorRgb);
    if (scale) scaleWithOvershoot([layer]);
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
    }

    app.endUndoGroup();
};
