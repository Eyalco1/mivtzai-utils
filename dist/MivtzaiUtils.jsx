/**
 * @name mivtzai-utils
 * @description Utilites for operative projects
 * @version 1.0.0
 * @author Eyal Cohen
 * @license ISC
 */

Array.prototype.map || (Array.prototype.map = function (callback) { var T, A, k; if (null == this)
    throw new TypeError("this is null or not defined"); var O = Object(this), len = O.length >>> 0; if ("function" != typeof callback)
    throw new TypeError(callback + " is not a function"); for (arguments.length > 1 && (T = arguments[1]), A = new Array(len), k = 0; k < len;) {
    var kValue, mappedValue;
    k in O && (kValue = O[k], mappedValue = callback.call(T, kValue, k, O), A[k] = mappedValue), k++;
} return A; });
Array.prototype.forEach || (Array.prototype.forEach = function (callback, thisArg) { if (null == this)
    throw new TypeError("Array.prototype.forEach called on null or undefined"); var T, k, O = Object(this), len = O.length >>> 0; if ("function" != typeof callback)
    throw new TypeError(callback + " is not a function"); for (arguments.length > 1 && (T = thisArg), k = 0; k < len;) {
    var kValue;
    k in O && (kValue = O[k], callback.call(T, kValue, k, O)), k++;
} });
Array.prototype.filter || (Array.prototype.filter = function (fun) {
    "use strict";
    if (null == this)
        throw new TypeError;
    var t = Object(this), len = t.length >>> 0;
    if ("function" != typeof fun)
        throw new TypeError;
    for (var res = [], thisArg = arguments.length >= 2 ? arguments[1] : void 0, i = 0; i < len; i++)
        if (i in t) {
            var val = t[i];
            fun.call(thisArg, val, i, t) && res.push(val);
        }
    return res;
});
Array.prototype.every || (Array.prototype.every = function (callbackfn, thisArg) {
    "use strict";
    var T, k;
    if (null == this)
        throw new TypeError("this is null or not defined");
    var O = Object(this), len = O.length >>> 0;
    if ("function" != typeof callbackfn && "[object Function]" !== Object.prototype.toString.call(callbackfn))
        throw new TypeError;
    for (arguments.length > 1 && (T = thisArg), k = 0; k < len;) {
        var kValue, testResult;
        if (k in O)
            if (kValue = O[k], !(testResult = T ? callbackfn.call(T, kValue, k, O) : callbackfn(kValue, k, O)))
                return !1;
        k++;
    }
    return !0;
});
Array.prototype.some || (Array.prototype.some = function (fun, thisArg) {
    "use strict";
    if (null == this)
        throw new TypeError("Array.prototype.some called on null or undefined");
    if ("function" != typeof fun)
        throw new TypeError;
    for (var t = Object(this), len = t.length >>> 0, i = 0; i < len; i++)
        if (i in t && fun.call(thisArg, t[i], i, t))
            return !0;
    return !1;
});
Array.prototype.find = Array.prototype.find || function (callback) { if (null === this)
    throw new TypeError("Array.prototype.find called on null or undefined"); if ("function" != typeof callback)
    throw new TypeError("callback must be a function"); for (var list = Object(this), length = list.length >>> 0, thisArg = arguments[1], i = 0; i < length; i++) {
    var element = list[i];
    if (callback.call(thisArg, element, i, list))
        return element;
} };
var createPathGrp = function (contents, name, hasFill, hasStroke, fillColor, strokeColor, strokeSize, vertices, inTangents, outTangents, pathClosed, position) {
    var grp = contents.addProperty('ADBE Vector Group');
    grp.name = name;
    var grpContents = contents
        .property(name)
        .property('Contents');
    var pathGrp = grpContents.addProperty('ADBE Vector Shape - Group');
    var pathProp = pathGrp.property('ADBE Vector Shape');
    var pathShape = new Shape();
    pathShape.vertices = vertices;
    pathShape.inTangents = inTangents;
    pathShape.outTangents = outTangents;
    pathShape.closed = pathClosed;
    pathProp.setValue(pathShape);
    if (hasStroke) {
        var strokeGrp = grpContents.addProperty('ADBE Vector Graphic - Stroke');
        var colorProp = strokeGrp.property('ADBE Vector Stroke Color');
        var mappedColor = strokeColor.map(function (c) { return c / 255; });
        colorProp.setValue(mappedColor);
        var strokeSizeProp = strokeGrp.property('ADBE Vector Stroke Width');
        strokeSizeProp.setValue(strokeSize);
    }
    if (hasFill) {
        var fillGrp = grpContents.addProperty('ADBE Vector Graphic - Fill');
        var colorProp = fillGrp.property('ADBE Vector Fill Color');
        var mappedColor = fillColor.map(function (c) { return c / 255; });
        colorProp.setValue(mappedColor);
    }
    var positionProp = grp
        .property('ADBE Vector Transform Group')
        .property('ADBE Vector Position');
    positionProp.setValue(position);
};
var createAnimatedMap = function (name, vertices, inTangents, outTangents) {
    var comp = app.project.activeItem;
    var shapeLayer = comp.layers.addShape();
    shapeLayer.name = name;
    var contents = shapeLayer.property('Contents');
    createPathGrp(contents, "".concat(name, "_Stroke"), false, true, [0, 0, 0], [255, 255, 255], 10, vertices, inTangents, outTangents, true, [0, 0]);
    createPathGrp(contents, "".concat(name, "_Fill"), true, false, [202, 5, 5], [0, 0, 0], 0, vertices, inTangents, outTangents, true, [0, 0]);
    var fillOpacity = contents
        .property("".concat(name, "_Fill"))
        .property('ADBE Vectors Group')
        .property('ADBE Vector Graphic - Fill')
        .property('ADBE Vector Fill Opacity');
    fillOpacity.setValueAtTime(0, 0);
    fillOpacity.setValueAtTime((1 / 24) * 14, 50);
    fillOpacity.setTemporalEaseAtKey(1, [new KeyframeEase(0.5, 33)], [new KeyframeEase(0.5, 33)]);
    fillOpacity.setTemporalEaseAtKey(2, [new KeyframeEase(0.5, 33)], [new KeyframeEase(0.5, 33)]);
    var myStroke = contents
        .property("".concat(name, "_Stroke"))
        .property('ADBE Vectors Group')
        .property('ADBE Vector Graphic - Stroke');
    var dashesProp = myStroke.property('ADBE Vector Stroke Dashes');
    var dashOne = dashesProp.addProperty('ADBE Vector Stroke Dash 1');
    dashOne.setValue(60);
    var gapOne = dashesProp.addProperty('ADBE Vector Stroke Gap 1');
    gapOne.setValue(25);
    var dashOffset = dashesProp.addProperty('ADBE Vector Stroke Offset');
    dashOffset.expression = 'time * -50';
    var lineCapProp = myStroke.property('ADBE Vector Stroke Line Cap');
    lineCapProp.setValue(2);
    var lineJoinProp = myStroke.property('ADBE Vector Stroke Line Join');
    lineJoinProp.setValue(2);
    var parentGrp = contents
        .property("".concat(name, "_Stroke"))
        .property('ADBE Vectors Group');
    var trimPathsGrp = parentGrp.addProperty('ADBE Vector Filter - Trim');
    var trimPathsEnd = trimPathsGrp.property('ADBE Vector Trim End');
    trimPathsEnd.setValueAtTime(0, 0);
    trimPathsEnd.setValueAtTime((1 / 24) * 30, 100);
    trimPathsEnd.setTemporalEaseAtKey(1, [new KeyframeEase(0.5, 33)], [new KeyframeEase(0.5, 33)]);
    trimPathsEnd.setTemporalEaseAtKey(2, [new KeyframeEase(0.5, 66)], [new KeyframeEase(0.5, 66)]);
};
var importTexture = function (path) {
    var textureItem = app.project.importFile(new ImportOptions(File(path)));
    return textureItem;
};
var loopTexture = function (layer) {
    var posProp = layer
        .property('ADBE Transform Group')
        .property('ADBE Position');
    var scaleProp = layer
        .property('ADBE Transform Group')
        .property('ADBE Scale');
    var rotProp = layer
        .property('ADBE Transform Group')
        .property('ADBE Rotate Z');
    posProp.setValueAtTime(0, [960, 540]);
    scaleProp.setValueAtTime(0, [100, 100]);
    rotProp.setValueAtTime(0, 0);
    posProp.setValueAtTime((1 / 24) * 10, [840, 804]);
    scaleProp.setValueAtTime((1 / 24) * 10, [100, 100]);
    rotProp.setValueAtTime((1 / 24) * 10, 50);
    posProp.setValueAtTime((1 / 24) * 20, [1284, 913]);
    scaleProp.setValueAtTime((1 / 24) * 20, [116, 116]);
    rotProp.setValueAtTime((1 / 24) * 20, -35);
    posProp.setValueAtTime((1 / 24) * 30, [960, 540]);
    scaleProp.setValueAtTime((1 / 24) * 30, [100, 100]);
    rotProp.setValueAtTime((1 / 24) * 30, 0);
    posProp.setInterpolationTypeAtKey(1, KeyframeInterpolationType.HOLD);
    posProp.setInterpolationTypeAtKey(2, KeyframeInterpolationType.HOLD);
    posProp.setInterpolationTypeAtKey(3, KeyframeInterpolationType.HOLD);
    posProp.setInterpolationTypeAtKey(4, KeyframeInterpolationType.HOLD);
    scaleProp.setInterpolationTypeAtKey(1, KeyframeInterpolationType.HOLD);
    scaleProp.setInterpolationTypeAtKey(2, KeyframeInterpolationType.HOLD);
    scaleProp.setInterpolationTypeAtKey(3, KeyframeInterpolationType.HOLD);
    scaleProp.setInterpolationTypeAtKey(4, KeyframeInterpolationType.HOLD);
    rotProp.setInterpolationTypeAtKey(1, KeyframeInterpolationType.HOLD);
    rotProp.setInterpolationTypeAtKey(2, KeyframeInterpolationType.HOLD);
    rotProp.setInterpolationTypeAtKey(3, KeyframeInterpolationType.HOLD);
    rotProp.setInterpolationTypeAtKey(4, KeyframeInterpolationType.HOLD);
    posProp.expression = scaleProp.expression = rotProp.expression = 'loopOut()';
};
var importAndLoopTexture = function (path) {
    var textureItem = importTexture(path);
    var comp = app.project.activeItem;
    var textureLayer = comp.layers.add(textureItem);
    loopTexture(textureLayer);
};
var openFs = function (path) {
    var folder = File(path).parent;
    var cmd = $.os.indexOf('Win') != -1
        ? 'explorer ' + Folder.decode(folder.fsName)
        :
            'open "' + Folder.execute(folder.fsName) + '"';
    system.callSystem(cmd);
};
var createTvaiStroke = function () {
    var comp = app.project.activeItem;
    var layer = comp.layers.addShape();
    var contents = layer.property('ADBE Root Vectors Group');
    var shapeGrp = contents.addProperty('ADBE Vector Group');
    shapeGrp.name = 'Shape 1';
    var lineGrp = shapeGrp.property('ADBE Vectors Group');
    var pathGrp = lineGrp.addProperty('ADBE Vector Shape - Group');
    var linePath = pathGrp.property('ADBE Vector Shape');
    var size = comp.width;
    var myShape = new Shape();
    myShape.vertices = [
        [-(size / 2), 0],
        [size / 2, 0]
    ];
    myShape.closed = false;
    linePath.setValue(myShape);
    var myStroke = lineGrp.addProperty('ADBE Vector Graphic - Stroke');
    var strokeWidth = myStroke.property('ADBE Vector Stroke Width');
    strokeWidth.setValue(10);
    var dashesProp = myStroke.property('ADBE Vector Stroke Dashes');
    var dashOne = dashesProp.addProperty('ADBE Vector Stroke Dash 1');
    dashOne.setValue(25);
    var dashOffset = dashesProp.addProperty('ADBE Vector Stroke Offset');
    dashOffset.expression = 'time * effect("Speed")("Slider")';
    var slider = layer.effect.addProperty('ADBE Slider Control');
    slider.name = 'Speed';
    var sliderVal = slider.property('ADBE Slider Control-0001');
    sliderVal.setValue(50);
    layer
        .property('ADBE Root Vectors Group')
        .property('ADBE Vector Group')
        .property('ADBE Vectors Group')
        .property('ADBE Vector Shape - Group').selected = true;
};
var scaleWithOvershoot = function () {
    var comp = app.project.activeItem;
    var selectedLayers = comp.selectedLayers;
    if (selectedLayers.length === 0)
        return;
    selectedLayers.forEach(function (sl) {
        var scaleProp = sl
            .property('ADBE Transform Group')
            .property('ADBE Scale');
        var origVal = scaleProp.value;
        var beforeKeys = 0;
        var numKeys = scaleProp.numKeys;
        for (var i = 1; i <= numKeys; i++) {
            var keyTime = scaleProp.keyTime(i);
            if (keyTime < comp.time)
                beforeKeys++;
        }
        scaleProp.setValueAtTime(comp.time, [0, 0]);
        scaleProp.setValueAtTime(comp.time + (1 / 24) * 10, [
            origVal[0] + 5,
            origVal[1] + 5
        ]);
        scaleProp.setValueAtTime(comp.time + (1 / 24) * 14, origVal);
        var easeIn = new KeyframeEase(0.5, 66);
        var easeOut = new KeyframeEase(0.75, 66);
        scaleProp.setTemporalEaseAtKey(beforeKeys + 1, [easeIn, easeIn, easeIn], [easeOut, easeOut, easeOut]);
        scaleProp.setTemporalEaseAtKey(beforeKeys + 2, [easeIn, easeIn, easeIn], [easeOut, easeOut, easeOut]);
        scaleProp.setTemporalEaseAtKey(beforeKeys + 3, [easeIn, easeIn, easeIn], [easeOut, easeOut, easeOut]);
    });
};
var importLogos = function () {
    var idfItem = app.project.importFile(new ImportOptions(File('C:/Users/eyalc/DevProjects/mivtzai-utils/src/assets/IDF_Logo.png')));
    var dotzItem = app.project.importFile(new ImportOptions(File('C:/Users/eyalc/DevProjects/mivtzai-utils/src/assets/Dotz_Logo.png')));
    var comp = app.project.activeItem;
    var idfLayer = comp.layers.add(idfItem);
    var padding = 200;
    var idfScale = idfLayer
        .property('ADBE Transform Group')
        .property('ADBE Scale');
    idfScale.setValue([4, 4]);
    var idfPos = idfLayer
        .property('ADBE Transform Group')
        .property('ADBE Position');
    idfPos.setValue([comp.width - padding, 0 + padding]);
    var dotzLayer = comp.layers.add(dotzItem);
    var dotzScale = dotzLayer
        .property('ADBE Transform Group')
        .property('ADBE Scale');
    dotzScale.setValue([67, 67]);
    var dotzPos = dotzLayer
        .property('ADBE Transform Group')
        .property('ADBE Position');
    dotzPos.setValue([0 + padding, 0 + padding]);
};
var createIllustrationText = function () {
    var comp = app.project.activeItem;
    var textLayer = comp.layers.addText();
    var srcText = textLayer
        .property('ADBE Text Properties')
        .property('ADBE Text Document');
    srcText.setValue('אילוסטרציה');
    var textDoc = srcText.value;
    textDoc.font = 'NarkisBlockCondensedMF-Bold';
    textDoc.fontSize = 100;
    textDoc.applyFill = true;
    textDoc.fillColor = [1, 1, 1];
    textDoc.applyStroke = false;
    textDoc.tracking = 0;
    srcText.setValue(textDoc);
    var boundingBox = textLayer.sourceRectAtTime(comp.time, false);
    var layerPos = textLayer
        .property('ADBE Transform Group')
        .property('ADBE Position');
    var padding = 40;
    layerPos.setValue([-boundingBox.left + padding, comp.height - padding]);
};
var formatLayerName = function () {
    var comp = app.project.activeItem;
    var selLayers = comp.selectedLayers;
    if (selLayers.length === 0)
        return;
    for (var i = 0; i < selLayers.length; i++) {
        var cur = selLayers[i];
        var name = cur.name;
        var capitalize = function (str) {
            return str
                .split(' ')
                .map(function (word) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            })
                .join(' ');
        };
        cur.name = capitalize(name).replace(/ /g, '_');
        if (cur instanceof AVLayer) {
            cur.source.name = cur.name;
        }
    }
};
var textReverse = function () {
    var comp = app.project.activeItem;
    var selLayers = comp.selectedLayers;
    for (var i = 0; i < selLayers.length; i++) {
        var curLayer = selLayers[i];
        if (curLayer instanceof TextLayer) {
            var srcTextProp = curLayer
                .property('ADBE Text Properties')
                .property('ADBE Text Document');
            var srcValue = srcTextProp.value.toString();
            var srcValueReverse = srcValue.split('').reverse().join('');
            srcTextProp.setValue(srcValueReverse.toString());
        }
    }
};
var createBg = function () {
    var comp = app.project.activeItem;
    var layer = comp.layers.addShape();
    layer.name = 'BG';
    layer.label = 16;
    var contents = layer.property('ADBE Root Vectors Group');
    var grp = contents.addProperty('ADBE Vector Group');
    grp.name = 'Rectangle 1';
    var recGrp = grp.property('ADBE Vectors Group');
    var recShape = recGrp.addProperty('ADBE Vector Shape - Rect');
    var recSize = recShape.property('ADBE Vector Rect Size');
    recSize.setValue([comp.width, comp.height]);
    var gFill = recGrp.addProperty('ADBE Vector Graphic - G-Fill');
    var gradType = gFill.property('ADBE Vector Grad Type');
    gradType.setValue(2);
    var endPoint = gFill.property('ADBE Vector Grad End Pt');
    endPoint.setValue([comp.width / 2, 0]);
    var fx = layer.property('ADBE Effect Parade');
    var tint = fx.addProperty('ADBE Tint');
    var tintBlack = tint.property('ADBE Tint-0001');
    var tintWhite = tint.property('ADBE Tint-0002');
    tintWhite.setValue([118 / 255, 15 / 255, 15 / 255]);
    tintBlack.setValue([25 / 255, 0, 0]);
};
var createIsraelMap = function () {
    var vertices = [
        [163.25, -515.875],
        [150.375, -508.625],
        [140.625, -513.75],
        [131.875, -477.625],
        [125.75, -463.25],
        [113, -462.875],
        [92.125, -456.625],
        [76.5, -469.375],
        [33.7499847412109, -465.25],
        [33.7499847412109, -438.75],
        [31.2500152587891, -391],
        [0.5, -393.5],
        [-174, 22.0001220703125],
        [-107.5, 199.5],
        [-102.5, 242.75],
        [-25.5000152587891, 450],
        [-18.4999847412109, 487],
        [-21.75, 498.25],
        [-12.9999694824219, 523.25],
        [14.7499542236328, 471.750061035156],
        [26.2499694824219, 422.000061035156],
        [32.5, 390.749938964844],
        [44.0000457763672, 366.750061035156],
        [43.6249389648438, 342.75],
        [45.625, 304.749938964844],
        [55.4999389648438, 282.750061035156],
        [54.4999847412109, 252.750061035156],
        [57.875, 225.625],
        [78.75, 178.000122070312],
        [90, 164.375],
        [88.75, 151.375],
        [99.625, 130.75],
        [112.375, 107.125],
        [112.625, 74.2498779296875],
        [104.125, 38.6246948242188],
        [120.125, 2.375],
        [124.25, -52.5],
        [141, -98.5],
        [131.5, -173],
        [141.25, -216.000122070312],
        [139, -267],
        [144, -315.375],
        [142, -342.5],
        [204.375, -395.625],
        [222, -430.5],
        [203.875, -467.75],
        [192.625, -515.5],
        [185.75, -531.75]
    ];
    var inTangents = [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [15, 0],
        [136.345733642578, -103.107299804688],
        [-6, -14.5],
        [0, 0],
        [-3.99998474121094, -14.0000610351562],
        [-0.25001525878906, -5.5],
        [-0.74998474121094, -3],
        [0, 0],
        [-2.87495422363281, 8.62493896484375],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
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
    var outTangents = [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [-10.6641082763672, 56.8751831054688],
        [20.5, 56.4998779296875],
        [6, 14.5],
        [0, 0],
        [0, 0],
        [0.24996948242188, 5.5],
        [0.75004577636719, 3],
        [0, 0],
        [0, 0],
        [1.27046203613281, -3.81146240234375],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
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
    createAnimatedMap('Israel_Map', vertices, inTangents, outTangents);
};
var createGazaMap = function () {
    var vertices = [
        [209.749725341797, -480.25],
        [128.999969482422, -358],
        [34.9997253417969, -236.500030517578],
        [-200.499862670898, 27.0000915527344],
        [-384.75, 215.25],
        [-348.75, 282],
        [-339.25, 283.25],
        [-279.75, 480.25],
        [-229.25, 427.25],
        [-166.25, 394],
        [-113.000061035156, 327],
        [-61.4999694824219, 297.75],
        [-46.7499084472656, 256.5],
        [-65.5000915527344, 111.25],
        [-51.7500610351562, 94.25],
        [-40.7499694824219, 63.5],
        [-32.4999389648438, 42.5],
        [-7.5, 19.4994812011719],
        [21.7500915527344, -17.2499084472656],
        [41.2499694824219, -34.7502746582031],
        [78.0000915527344, -63.2501831054688],
        [87.5, -81.9997863769531],
        [110.499786376953, -95.9999694824219],
        [185.999847412109, -183.250061035156],
        [255.250091552734, -241.000427246094],
        [286.500091552734, -246.750015258789],
        [305.749969482422, -261.75],
        [334.749969482422, -272.75],
        [361.249969482422, -315],
        [376.999969482422, -342.75]
    ];
    var inTangents = [
        [0, 0],
        [16, -17],
        [20.0003051757812, -24.9999694824219],
        [26.1709289550781, -21.6585388183594],
        [-0.00003051757812, 0],
        [-0.00003051757812, 0],
        [-0.00003051757812, 0],
        [-3, -10.75],
        [-6.25, 7],
        [-32.25, 16],
        [-4.99993896484375, 4.5],
        [-4.75006103515625, 2.75],
        [-1.75006103515625, 9.5],
        [0.7501220703125, 10.75],
        [-5.24990844726562, 2.5],
        [-8.00003051757812, 7],
        [-1.00006103515625, 3],
        [-6.25, 6.50033569335938],
        [-11.5, 7.50003051757812],
        [-5.74993896484375, 5.750244140625],
        [-5.25009155273438, 4.50042724609375],
        [-4.75021362304688, 5.99954223632812],
        [-13.4996948242188, 4.75009155273438],
        [-19.249755859375, 11.0000915527344],
        [-8.25, 4.25041198730469],
        [-3.5001220703125, 1.49983215332031],
        [-7.2498779296875, 5.25],
        [-3.5, 5],
        [-11.5, 8.5],
        [0, 0]
    ];
    var outTangents = [
        [0, 0],
        [-14.5387573242188, 15.4473876953125],
        [-19.9996643066406, 25.0000305175781],
        [-29.0001373291016, 23.9999084472656],
        [-0.00003051757812, 0],
        [-0.00003051757812, 0],
        [-0.00003051757812, 0],
        [5.75, -3.5],
        [6.25, -7],
        [32.2499694824219, -16],
        [4.99996948242188, -4.5],
        [4.75, -2.75],
        [-0.74993896484375, -10.75],
        [1.74981689453125, -9.5],
        [5.25003051757812, -2.5],
        [7.9998779296875, -7],
        [1.00003051757812, -3],
        [6.24990844726562, -6.49966430664062],
        [11.4999694824219, -7.50054931640625],
        [5.74990844726562, -5.749755859375],
        [5.24984741210938, -4.49981689453125],
        [4.74993896484375, -6.00039672851562],
        [13.5004577636719, -4.74996948242188],
        [19.2501220703125, -10.9999694824219],
        [8.2498779296875, -4.249755859375],
        [3.499755859375, -1.50028991699219],
        [7.25, -5.25],
        [3.5, -5],
        [11.5, -8.5],
        [0, 0]
    ];
    createAnimatedMap('Gaza_Map', vertices, inTangents, outTangents);
};
var createCountingText = function () {
    var comp = app.project.activeItem;
    var layer = comp.layers.addText();
    layer.name = 'Numbers';
    var fx = layer.property('ADBE Effect Parade');
    var numFx = fx.addProperty('ADBE Numbers2');
    var decPointsProp = numFx.property('ADBE Numbers2-0004');
    decPointsProp.setValue(0);
    var fillProp = numFx.property('ADBE Numbers2-0008');
    fillProp.setValue([255, 255, 255]);
    var sizeProp = numFx.property('ADBE Numbers2-0006');
    sizeProp.setValue(150);
    var numValProp = numFx.property('ADBE Numbers2-0003');
    numValProp.setValueAtTime(0, 0);
    numValProp.setValueAtTime((1 / 24) * 40, 99);
    numValProp.setTemporalEaseAtKey(1, [new KeyframeEase(0.5, 20)]);
    numValProp.setTemporalEaseAtKey(2, [new KeyframeEase(0.5, 75)]);
};
var init = function (thisObj) {
    var w = thisObj instanceof Panel
        ? thisObj
        : new Window('palette', 'Mivtzai Utils', undefined, { resizeable: true });
    if (w == null)
        w;
    w = w;
    var tpanel = w.add('tabbedpanel');
    var quickActionsTab = tpanel.add('tab', undefined, ['Quick Actions']);
    var QABtnsGrp = quickActionsTab.add('group');
    var tvaiBtn = QABtnsGrp.add('button', undefined, 'T');
    var scaleBtn = QABtnsGrp.add('button', undefined, 'S');
    var logosBtn = QABtnsGrp.add('button', undefined, 'L');
    var illustrationBtn = QABtnsGrp.add('button', undefined, 'I');
    var formatLayerBtn = QABtnsGrp.add('button', undefined, 'F');
    var textReverseBtn = QABtnsGrp.add('button', undefined, 'R');
    var bgBtn = QABtnsGrp.add('button', undefined, 'BG');
    var IsraelMapBtn = QABtnsGrp.add('button', undefined, 'IL');
    var GazaMapBtn = QABtnsGrp.add('button', undefined, 'GA');
    var numCountBtn = QABtnsGrp.add('button', undefined, 'N');
    var testBtn = QABtnsGrp.add('button', undefined, '!TEST!');
    testBtn.onClick = function () {
        openFs('C:/Users/eyalc/DevProjects/mivtzai-utils/src/assets/Kyle_Paper_Dark.jpg');
    };
    var iconsTab = tpanel.add('tab', undefined, ['Icons']);
    var locationsTab = tpanel.add('tab', undefined, ['Locations']);
    var texturesTab = tpanel.add('tab', undefined, ['Textures']);
    var TexBtnsGrp = texturesTab.add('group');
    var kylePaperBtn = TexBtnsGrp.add('button', undefined, 'Kyle');
    tvaiBtn.onClick = createTvaiStroke;
    scaleBtn.onClick = scaleWithOvershoot;
    logosBtn.onClick = importLogos;
    illustrationBtn.onClick = createIllustrationText;
    formatLayerBtn.onClick = formatLayerName;
    textReverseBtn.onClick = textReverse;
    bgBtn.onClick = createBg;
    IsraelMapBtn.onClick = createIsraelMap;
    GazaMapBtn.onClick = createGazaMap;
    numCountBtn.onClick = createCountingText;
    kylePaperBtn.onClick = function () {
        importAndLoopTexture('C:/Users/eyalc/DevProjects/mivtzai-utils/src/assets/Kyle_Paper_Dark.jpg');
    };
    w.layout.layout(true);
    w.layout.resize();
    w.onResizing = w.onResize = function () {
        w = w;
        w.onResize = function () {
            w.layout.resize();
        };
    };
    if (w != null && w instanceof Window) {
        w.center();
        w.show();
    }
};
(function (thisObj) {
    init(thisObj);
})(this);