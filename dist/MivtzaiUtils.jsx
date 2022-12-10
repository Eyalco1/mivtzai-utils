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
var createIconCircle = function (contents, circleColorRgb) {
    var vertices = [
        [180, 0],
        [0, 180],
        [-180, 0],
        [0, -180]
    ];
    var inTangents = [
        [0, -100],
        [100, 0],
        [0, 100],
        [-100, 0]
    ];
    var outTangents = [
        [0, 100],
        [-100, 0],
        [0, -100],
        [100, 0]
    ];
    createPathGrp(contents, 'Circle', true, false, circleColorRgb, circleColorRgb, 0, vertices, inTangents, outTangents, true, [0, 0]);
};
var getLanguageFromKeyboard = function () {
    var keyState = ScriptUI.environment.keyboardState;
    if (keyState.ctrlKey) {
        return 'English';
    }
    else if (keyState.shiftKey) {
        return 'Arabic';
    }
    else {
        return 'Hebrew';
    }
};
var getFontFromLanguage = function (lang) {
    if (lang === 'English') {
        return 'TradeGothicLT-BoldCondTwenty';
    }
    else if (lang === 'Hebrew') {
        return 'NarkisBlockCondensedMF-Bold';
    }
    else if (lang === 'Arabic') {
        return 'DroidArabicKufi-Bold';
    }
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
    var idfItem = app.project.importFile(new ImportOptions(File("".concat(File('.'), "/Scripts/ScriptUI Panels/MivtzaiUtils Assets/Logos/IDF_Logo.png"))));
    var dotzItem = app.project.importFile(new ImportOptions(File("".concat(File('.'), "/Scripts/ScriptUI Panels/MivtzaiUtils Assets/Logos/Dotz_Logo.png"))));
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
var importIsraelGoogleMaps = function () {
    var keyState = ScriptUI.environment.keyboardState;
    var whichMap = 'Clean';
    if (keyState.ctrlKey) {
        whichMap = 'Guide';
    }
    var mapItem = app.project.importFile(new ImportOptions(File("".concat(File('.'), "/Scripts/ScriptUI Panels/MivtzaiUtils Assets/Images/Israel_Map_").concat(whichMap, ".png"))));
    var comp = app.project.activeItem;
    var mapLayer = comp.layers.add(mapItem);
    mapLayer.selected = true;
    app.executeCommand(2732);
};
var createExplosionIcon = function (circleColor, iconColor, hasCircle) {
    var comp = app.project.activeItem;
    var layer = comp.layers.addShape();
    layer.name = 'Boom';
    var contents = layer.property('Contents');
    var circleColorRgb;
    if (circleColor === 'White') {
        circleColorRgb = [255, 255, 255];
    }
    else if (circleColor === 'Black') {
        circleColorRgb = [0, 0, 0];
    }
    else if (circleColor === 'Red') {
        circleColorRgb = [197, 24, 24];
    }
    var iconColorRgb;
    if (iconColor === 'White') {
        iconColorRgb = [255, 255, 255];
    }
    else if (iconColor === 'Black') {
        iconColorRgb = [0, 0, 0];
    }
    else if (iconColor === 'Red') {
        iconColorRgb = [197, 24, 24];
    }
    var createBigBoom = function () {
        var vertices = [
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
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
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
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
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
        createPathGrp(contents, 'Big_Boom', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [0, 0]);
    };
    var createLittleBoom = function () {
        var vertices = [
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
            [0, 0]
        ];
        createPathGrp(contents, 'Little_Boom', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [-4.0612, 115.9381]);
    };
    var createCircleOne = function () {
        var vertices = [
            [5.5621337890625, 0.00120544433594],
            [-0.00120544433594, 5.5621337890625],
            [-5.5621337890625, 0.00120544433594],
            [-0.00120544433594, -5.5621337890625]
        ];
        var inTangents = [
            [0, -3.07241821289062],
            [3.07241821289062, 0],
            [0, 3.06973266601562],
            [-3.06973266601562, 0]
        ];
        var outTangents = [
            [0, 3.06973266601562],
            [-3.06973266601562, 0],
            [0, -3.07241821289062],
            [3.07241821289062, 0]
        ];
        createPathGrp(contents, 'Circle_01', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [-124.4927, 13.475]);
    };
    var createCircleTwo = function () {
        var vertices = [
            [5.5621337890625, 0.00120544433594],
            [-0.00120544433594, 5.5621337890625],
            [-5.5621337890625, 0.00120544433594],
            [-0.00120544433594, -5.5621337890625]
        ];
        var inTangents = [
            [0, -3.07241821289062],
            [3.07241821289062, 0],
            [0, 3.06973266601562],
            [-3.06973266601562, 0]
        ];
        var outTangents = [
            [0, 3.06973266601562],
            [-3.06973266601562, 0],
            [0, -3.07241821289062],
            [3.07241821289062, 0]
        ];
        createPathGrp(contents, 'Circle_02', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [80.2173, -94.1219]);
    };
    var createCircleThree = function () {
        var vertices = [
            [5.5621337890625, 0.00120544433594],
            [-0.00120544433594, 5.5621337890625],
            [-5.5621337890625, 0.00120544433594],
            [-0.00120544433594, -5.5621337890625]
        ];
        var inTangents = [
            [0, -3.07241821289062],
            [3.07241821289062, 0],
            [0, 3.06973266601562],
            [-3.06973266601562, 0]
        ];
        var outTangents = [
            [0, 3.06973266601562],
            [-3.06973266601562, 0],
            [0, -3.07241821289062],
            [3.07241821289062, 0]
        ];
        createPathGrp(contents, 'Circle_03', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [94.976, 60.5347]);
    };
    createCircleThree();
    createCircleTwo();
    createCircleOne();
    createLittleBoom();
    createBigBoom();
    if (hasCircle)
        createIconCircle(contents, circleColorRgb);
};
var createTunnelIcon = function (circleColor, iconColor, hasCircle) {
    var comp = app.project.activeItem;
    var layer = comp.layers.addShape();
    layer.name = 'Tunnel';
    var contents = layer.property('Contents');
    var circleColorRgb;
    if (circleColor === 'White') {
        circleColorRgb = [255, 255, 255];
    }
    else if (circleColor === 'Black') {
        circleColorRgb = [0, 0, 0];
    }
    else if (circleColor === 'Red') {
        circleColorRgb = [197, 24, 24];
    }
    var iconColorRgb;
    if (iconColor === 'White') {
        iconColorRgb = [255, 255, 255];
    }
    else if (iconColor === 'Black') {
        iconColorRgb = [0, 0, 0];
    }
    else if (iconColor === 'Red') {
        iconColorRgb = [197, 24, 24];
    }
    var createInside = function () {
        var vertices = [
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
        var inTangents = [
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
        var outTangents = [
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
        createPathGrp(contents, 'Tunnel_Inside', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [0, 0]);
    };
    var createBorder = function () {
        var vertices = [
            [0.00009155273438, -91.1960754394531],
            [-0.00009155273438, -91.1960754394531],
            [-91.1960754394531, -0.00009155273438],
            [-91.1960754394531, 91.1960754394531],
            [91.1960754394531, 91.1960754394531],
            [91.1960754394531, -0.00009155273438]
        ];
        var inTangents = [
            [50.3661499023438, 0],
            [0, 0],
            [0, -50.3661499023438],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [-50.3661499023438, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, -50.3661499023438]
        ];
        createPathGrp(contents, 'Tunnel_Border', false, true, iconColorRgb, iconColorRgb, 6, vertices, inTangents, outTangents, true, [0, 0]);
    };
    createBorder();
    createInside();
    if (hasCircle)
        createIconCircle(contents, circleColorRgb);
};
var createLocationBG = function (size, locationName, color) {
    if (color === void 0) { color = [1, 1, 1]; }
    var comp = app.project.activeItem;
    var layer = comp.layers.addShape();
    layer.name = "".concat(locationName, "_BG");
    var contents = layer.property('ADBE Root Vectors Group');
    var grp = contents.addProperty('ADBE Vector Group');
    grp.name = "".concat(locationName, "_BG");
    var recGrp = grp.property('ADBE Vectors Group');
    recGrp.addProperty('ADBE Vector Shape - Rect');
    var fillGrp = recGrp.addProperty('ADBE Vector Graphic - Fill');
    var fillProp = fillGrp.property('ADBE Vector Fill Color');
    fillProp.setValue(color);
    var roundProp = recGrp
        .property('ADBE Vector Shape - Rect')
        .property('ADBE Vector Rect Roundness');
    roundProp.setValue(25.7054);
    var sizeProp = recGrp
        .property('ADBE Vector Shape - Rect')
        .property('ADBE Vector Rect Size');
    sizeProp.setValue(size);
    return layer;
};
var createLocationText = function (lang, text, fontSize, tracking, textPos, textAnchor) {
    var comp = app.project.activeItem;
    var textLayer = comp.layers.addText();
    var srcText = textLayer
        .property('ADBE Text Properties')
        .property('ADBE Text Document');
    srcText.setValue(text);
    var textDoc = srcText.value;
    textDoc.font = getFontFromLanguage(lang);
    textDoc.fontSize = fontSize;
    textDoc.applyFill = true;
    textDoc.fillColor = [53 / 255, 33 / 255, 28 / 255];
    textDoc.applyStroke = false;
    textDoc.tracking = tracking;
    srcText.setValue(textDoc);
    var posProp = textLayer
        .property('ADBE Transform Group')
        .property('ADBE Position');
    var anchorProp = textLayer
        .property('ADBE Transform Group')
        .property('ADBE Anchor Point');
    posProp.setValue(textPos);
    anchorProp.setValue(textAnchor);
    return textLayer;
};
var createIconBase = function (name, iconPos, iconAnchor, iconScale) {
    var comp = app.project.activeItem;
    var iconLayer = comp.layers.addShape();
    iconLayer.name = "".concat(name, " Icon");
    var contents = iconLayer.property('Contents');
    return iconLayer;
};
var setLayerTransform = function (layer, pos, anchor, scale) {
    var posProp = layer
        .property('ADBE Transform Group')
        .property('ADBE Position');
    posProp.setValue(pos);
    var anchorProp = layer
        .property('ADBE Transform Group')
        .property('ADBE Anchor Point');
    anchorProp.setValue(anchor);
    var scaleProp = layer
        .property('ADBE Transform Group')
        .property('ADBE Scale');
    scaleProp.setValue([scale, scale]);
    return layer;
};
var createIconFromId = function (id, iconPos, iconAnchor, iconScale) {
    id = id.toLowerCase();
    if (id === 'kindergarden') {
        return createKindergardenIcon(iconPos, iconAnchor, iconScale);
    }
    if (id === 'medical') {
        return createMedicalIcon(iconPos, iconAnchor, iconScale);
    }
};
var createLocation = function (inputLang, argsArr) {
    var _a = argsArr.find(function (args) { return args.lang === inputLang; }), bgSize = _a.bgSize, fontSize = _a.fontSize, lang = _a.lang, text = _a.text, textAnchor = _a.textAnchor, textPos = _a.textPos, tracking = _a.tracking, iconAnchor = _a.iconAnchor, iconPos = _a.iconPos, iconScale = _a.iconScale, iconId = _a.iconId;
    var bgLayer = createLocationBG(bgSize, 'Kindergarden');
    var iconLayer = createIconFromId(iconId, iconPos, iconAnchor, iconScale);
    var textLayer = createLocationText(lang, text, fontSize, tracking, textPos, textAnchor);
    iconLayer.parent = textLayer.parent = bgLayer;
    bgLayer.label = iconLayer.label = textLayer.label = 11;
    iconLayer.selected = textLayer.selected = false;
    bgLayer.selected = true;
};
var createKindergardenIcon = function (iconPos, iconAnchor, iconScale) {
    var iconLayer = createIconBase('Kindergarden', iconPos, iconAnchor, iconScale);
    var contents = iconLayer.property('Contents');
    var createHouseMiddleHide = function () {
        var vertices = [
            [0, 5.30056762695312],
            [0, 5.30056762695312],
            [-4.27423095703125, 1.02633666992188],
            [-4.27423095703125, -1.02633666992188],
            [0, -5.30056762695312],
            [0, -5.30056762695312],
            [4.27423095703125, -1.02633666992188],
            [4.27423095703125, 1.02633666992188]
        ];
        var inTangents = [
            [2.360595703125, 0],
            [0, 0],
            [0, 2.360595703125],
            [0, 0],
            [-2.360595703125, 0],
            [0, 0],
            [0, -2.360595703125],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [-2.360595703125, 0],
            [0, 0],
            [0, -2.360595703125],
            [0, 0],
            [2.360595703125, 0],
            [0, 0],
            [0, 2.360595703125]
        ];
        createPathGrp(contents, 'House_Middle_Hide', true, false, [53, 33, 28], [0, 0, 0], 0, vertices, inTangents, outTangents, true, [76.8601, -5.7216]);
    };
    var createLadderL = function () {
        var vertices = [
            [-0.56208801269531, 13.8012847900391],
            [0.56208801269531, 13.8012847900391],
            [0.56208801269531, -13.8012847900391],
            [-0.56208801269531, -13.8012847900391]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Ladder_L', true, false, [255, 255, 255], [0, 0, 0], 0, vertices, inTangents, outTangents, true, [57.6522, 11.2183]);
    };
    var createLadderR = function () {
        var vertices = [
            [-0.56208801269531, 13.8012847900391],
            [0.56208801269531, 13.8012847900391],
            [0.56208801269531, -13.8012847900391],
            [-0.56208801269531, -13.8012847900391]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Ladder_R', true, false, [255, 255, 255], [0, 0, 0], 0, vertices, inTangents, outTangents, true, [62.2776, 11.2183]);
    };
    var createLadder06 = function () {
        var vertices = [
            [-2.874755859375, -0.65524291992188],
            [2.874755859375, -0.65524291992188],
            [2.874755859375, 0.65524291992188],
            [-2.874755859375, 0.65524291992188]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Ladder_06', true, false, [255, 255, 255], [0, 0, 0], 0, vertices, inTangents, outTangents, true, [59.9649, 0.3872]);
    };
    var createLadder05 = function () {
        var vertices = [
            [-2.874755859375, -0.65524291992188],
            [2.874755859375, -0.65524291992188],
            [2.874755859375, 0.65524291992188],
            [-2.874755859375, 0.65524291992188]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Ladder_05', true, false, [255, 255, 255], [0, 0, 0], 0, vertices, inTangents, outTangents, true, [59.9649, 4.9116]);
    };
    var createLadder04 = function () {
        var vertices = [
            [-2.874755859375, -0.65524291992188],
            [2.874755859375, -0.65524291992188],
            [2.874755859375, 0.65524291992188],
            [-2.874755859375, 0.65524291992188]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Ladder_04', true, false, [255, 255, 255], [0, 0, 0], 0, vertices, inTangents, outTangents, true, [59.9649, 9.4359]);
    };
    var createLadder03 = function () {
        var vertices = [
            [-2.874755859375, -0.65524291992188],
            [2.874755859375, -0.65524291992188],
            [2.874755859375, 0.65524291992188],
            [-2.874755859375, 0.65524291992188]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Ladder_03', true, false, [255, 255, 255], [0, 0, 0], 0, vertices, inTangents, outTangents, true, [59.9649, 13.9603]);
    };
    var createLadder02 = function () {
        var vertices = [
            [-2.874755859375, -0.65524291992188],
            [2.874755859375, -0.65524291992188],
            [2.874755859375, 0.65524291992188],
            [-2.874755859375, 0.65524291992188]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Ladder_02', true, false, [255, 255, 255], [0, 0, 0], 0, vertices, inTangents, outTangents, true, [59.9649, 18.4846]);
    };
    var createLadder01 = function () {
        var vertices = [
            [-2.874755859375, -0.65524291992188],
            [2.874755859375, -0.65524291992188],
            [2.874755859375, 0.65524291992188],
            [-2.874755859375, 0.65524291992188]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Ladder_01', true, false, [255, 255, 255], [0, 0, 0], 0, vertices, inTangents, outTangents, true, [59.9649, 23.009]);
    };
    var createSlide = function () {
        var vertices = [
            [9.17953491210938, 8.79170227050781],
            [-1.21762084960938, -1.0423583984375],
            [-11.4797973632812, -13.2806091308594],
            [-11.5624084472656, -13.2882843017578],
            [-11.5624084472656, -8.4593505859375],
            [-5.71575927734375, 0.44515991210938],
            [9.17953491210938, 13.2882843017578],
            [11.5624084472656, 11.0399932861328]
        ];
        var inTangents = [
            [1.31709289550781, 0],
            [2.26652526855469, 6.09716796875],
            [6.39698791503906, 1.84429931640625],
            [0.02792358398438, 0.00700378417969],
            [0, 0],
            [-1.45497131347656, -3.91241455078125],
            [-10.1202392578125, 0],
            [0, 1.24160766601562]
        ];
        var outTangents = [
            [-6.41560363769531, 0],
            [-1.81275939941406, -4.87202453613281],
            [-0.02792358398438, -0.00796508789062],
            [0, 0],
            [3.10542297363281, 1.55914306640625],
            [2.12690734863281, 5.72172546386719],
            [1.31709289550781, 0],
            [0, -1.24160766601562]
        ];
        createPathGrp(contents, 'Slide', true, false, [255, 255, 255], [0, 0, 0], 0, vertices, inTangents, outTangents, true, [102.5002, 11.7313]);
    };
    var createHouseTop = function () {
        var vertices = [
            [-0.16940307617188, -6.54544067382812],
            [-21.2740783691406, 5.97430419921875],
            [-21.1046600341797, 6.59190368652344],
            [21.1046600341797, 6.59190368652344],
            [21.2740783691406, 5.97430419921875],
            [0.16940307617188, -6.54544067382812]
        ];
        var inTangents = [
            [0.10444641113281, -0.06195068359375],
            [0, 0],
            [-0.33763122558594, 0],
            [0, 0],
            [0, 0],
            [0.29039001464844, 0.17225646972656]
        ];
        var outTangents = [
            [0, 0],
            [-0.29039001464844, 0.17225646972656],
            [0, 0],
            [0.33763122558594, 0],
            [0, 0],
            [-0.10444641113281, -0.06195068359375]
        ];
        createPathGrp(contents, 'House_Top', true, false, [255, 255, 255], [0, 0, 0], 0, vertices, inTangents, outTangents, true, [77.4369, -25.2672]);
    };
    var createHouseMiddle = function () {
        var vertices = [
            [12.7078552246094, 10.8105163574219],
            [-12.7078552246094, 10.8105163574219],
            [-12.7078552246094, -10.8105163574219],
            [12.7078552246094, -10.8105163574219]
        ];
        var inTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'House_Middle', true, false, [255, 255, 255], [0, 0, 0], 0, vertices, inTangents, outTangents, true, [76.8601, -6.6124]);
    };
    var createHouseBottom = function () {
        var vertices = [
            [12.7078399658203, -9.78457641601562],
            [7.62483215332031, -9.78457641601562],
            [-7.62483215332031, -9.78457641601562],
            [-12.7078399658203, -9.78457641601562],
            [-12.7078399658203, -4.70140075683594],
            [-12.7078399658203, 9.78457641601562],
            [-7.62483215332031, 9.78457641601562],
            [-7.62483215332031, 2.92341613769531],
            [0, -4.70140075683594],
            [0, -4.70140075683594],
            [7.62483215332031, 2.92341613769531],
            [7.62483215332031, 9.78457641601562],
            [12.7078399658203, 9.78457641601562],
            [12.7078399658203, -9.78457641601562]
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
            [-4.21107482910156, 0],
            [0, 0],
            [0, -4.21107482910156],
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
            [0, -4.21107482910156],
            [0, 0],
            [4.21107482910156, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'House_Bottom', true, false, [255, 255, 255], [0, 0, 0], 0, vertices, inTangents, outTangents, true, [76.8601, 15.235]);
    };
    var createIconCircle = function () {
        var vertices = [
            [43.39892578125, 0],
            [0, 43.39892578125],
            [-43.39892578125, 0],
            [0, -43.39892578125]
        ];
        var inTangents = [
            [0, -23.9685668945312],
            [23.9685668945312, 0],
            [0, 23.9685668945312],
            [-23.9685668945312, 0]
        ];
        var outTangents = [
            [0, 23.9685668945312],
            [-23.9685668945312, 0],
            [0, -23.9685668945312],
            [23.9685668945312, 0]
        ];
        createPathGrp(contents, 'Icon_Circle', true, false, [53, 33, 28], [0, 0, 0], 0, vertices, inTangents, outTangents, true, [85.5764, -0.8716]);
    };
    createHouseMiddleHide();
    createLadderL();
    createLadderR();
    createLadder06();
    createLadder05();
    createLadder04();
    createLadder03();
    createLadder02();
    createLadder01();
    createSlide();
    createHouseTop();
    createHouseMiddle();
    createHouseBottom();
    createIconCircle();
    setLayerTransform(iconLayer, iconPos, iconAnchor, iconScale);
    return iconLayer;
};
var createKindergardenLocation = function (lang) {
    var args = [
        {
            lang: 'Hebrew',
            text: 'גן ילדים',
            fontSize: 77.3332,
            tracking: -19,
            textPos: [922.3363, 540.1692],
            textAnchor: [75.0863, -19.0808],
            bgSize: [296, 110],
            iconPos: [1045.5764, 539.1284],
            iconAnchor: [85.5764, -0.8716],
            iconScale: 100,
            iconId: 'kindergarden'
        },
        {
            lang: 'English',
            text: 'Kindergarden',
            fontSize: 77.3332,
            tracking: -26,
            textPos: [1019.7664, 549.906],
            textAnchor: [180.7664, -21.344],
            bgSize: [495, 106],
            iconPos: [773.5764, 539.1284],
            iconAnchor: [85.5764, -0.8716],
            iconScale: 100,
            iconId: 'kindergarden'
        },
        {
            lang: 'Arabic',
            text: 'روضة أطفال',
            fontSize: 60,
            tracking: -23,
            textPos: [916.7816, 538.4697],
            textAnchor: [171.7816, -22.2803],
            bgSize: [466, 92],
            iconPos: [1141.2014, 539.5034],
            iconAnchor: [85.5764, -0.8716],
            iconScale: 83,
            iconId: 'kindergarden'
        }
    ];
    createLocation(lang, args);
};
var createMedicalIcon = function (iconPos, iconAnchor, iconScale) {
    var iconLayer = createIconBase('Kindergarden', iconPos, iconAnchor, iconScale);
    var contents = iconLayer.property('Contents');
    var createCross = function () {
        var vertices = [
            [23.6100158691406, -8.60000610351562],
            [23.6100158691406, 8.60000610351562],
            [8.58999633789062, 8.60000610351562],
            [8.58999633789062, 23.6399841308594],
            [-8.58999633789062, 23.6399841308594],
            [-8.58999633789062, 8.60000610351562],
            [-23.6100158691406, 8.60000610351562],
            [-23.6100158691406, -8.60000610351562],
            [-8.58999633789062, -8.60000610351562],
            [-8.58999633789062, -23.6399841308594],
            [8.58999633789062, -23.6399841308594],
            [8.58999633789062, -8.60000610351562]
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
            [0, 0]
        ];
        createPathGrp(contents, 'Cross', true, false, [255, 255, 255], [0, 0, 0], 0, vertices, inTangents, outTangents, true, [86.0601, -1.0216]);
    };
    var createIconCircle = function () {
        var vertices = [
            [43.39892578125, 0],
            [0, 43.39892578125],
            [-43.39892578125, 0],
            [0, -43.39892578125]
        ];
        var inTangents = [
            [0, -23.9685668945312],
            [23.9685668945312, 0],
            [0, 23.9685668945312],
            [-23.9685668945312, 0]
        ];
        var outTangents = [
            [0, 23.9685668945312],
            [-23.9685668945312, 0],
            [0, -23.9685668945312],
            [23.9685668945312, 0]
        ];
        createPathGrp(contents, 'Icon_Circle', true, false, [53, 33, 28], [0, 0, 0], 0, vertices, inTangents, outTangents, true, [85.5764, -0.8716]);
    };
    createCross();
    createIconCircle();
    setLayerTransform(iconLayer, iconPos, iconAnchor, iconScale);
    return iconLayer;
};
var createMedicalLocation = function (lang) {
    var args = [
        {
            lang: 'Hebrew',
            text: 'מרפאה',
            fontSize: 77.3332,
            tracking: -19,
            textPos: [922.3363, 540.1692],
            textAnchor: [75.0863, -19.0808],
            bgSize: [296, 110],
            iconPos: [1045.5764, 539.1284],
            iconAnchor: [85.5764, -0.8716],
            iconScale: 100,
            iconId: 'medical'
        },
        {
            lang: 'English',
            text: 'Medical Clinic',
            fontSize: 77.3332,
            tracking: -31,
            textPos: [1011.831, 537.0827],
            textAnchor: [182.081, -27.9173],
            bgSize: [484, 106],
            iconPos: [779, 539.1284],
            iconAnchor: [85.5764, -0.8716],
            iconScale: 97,
            iconId: 'medical'
        },
        {
            lang: 'Arabic',
            text: 'عيادة',
            fontSize: 64,
            tracking: -21,
            textPos: [919.4213, 540.4375],
            textAnchor: [80.6712, -16.3125],
            bgSize: [284, 91],
            iconPos: [1049.9514, 538.2534],
            iconAnchor: [85.5764, -0.8716],
            iconScale: 83,
            iconId: 'medical'
        }
    ];
    createLocation(lang, args);
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
    var tvaiBtn = QABtnsGrp.add('button', undefined, 'Tunnel');
    var scaleBtn = QABtnsGrp.add('button', undefined, 'Pop');
    var logosBtn = QABtnsGrp.add('button', undefined, 'Logos');
    var illustrationBtn = QABtnsGrp.add('button', undefined, 'Illustration');
    var formatLayerBtn = QABtnsGrp.add('button', undefined, 'Format Layer Name');
    var textReverseBtn = QABtnsGrp.add('button', undefined, 'Reverse Text');
    var bgBtn = QABtnsGrp.add('button', undefined, 'BG');
    var IsraelMapShapeBtn = QABtnsGrp.add('button', undefined, 'Israel Map Shape');
    var GazaMapShapeBtn = QABtnsGrp.add('button', undefined, 'Gaza Map Shape');
    var numCountBtn = QABtnsGrp.add('button', undefined, 'Counting Numbers');
    var israelMapPic = QABtnsGrp.add('button', undefined, 'Israel Google Maps');
    var iconsTab = tpanel.add('tab', undefined, ['Icons']);
    var IconsBtnsGrp = iconsTab.add('group');
    var boomBtn = IconsBtnsGrp.add('button', undefined, 'Boom!');
    var tunnelBtn = IconsBtnsGrp.add('button', undefined, 'Tunnel');
    var circleCheck = iconsTab.add('checkbox', undefined, 'Circle');
    var circleColorGrp = iconsTab.add('group');
    var circleColorText = circleColorGrp.add('statictext', undefined, 'Circle Color');
    var circleColorDD = circleColorGrp.add('dropdownlist', undefined, [
        'White',
        'Black',
        'Red'
    ]);
    var iconColorGrp = iconsTab.add('group');
    var iconColorText = iconColorGrp.add('statictext', undefined, 'Icon Color');
    var iconColorDD = iconColorGrp.add('dropdownlist', undefined, [
        'Black',
        'White',
        'Red'
    ]);
    circleColorDD.selection = iconColorDD.selection = 0;
    var locationsTab = tpanel.add('tab', undefined, ['Locations']);
    var locBtnsGrp = locationsTab.add('group');
    var kindergardenBtn = locBtnsGrp.add('button', undefined, 'Kindergarden');
    var medicalBtn = locBtnsGrp.add('button', undefined, 'Medical Clinic');
    var texturesTab = tpanel.add('tab', undefined, ['Textures']);
    var texBtnsGrp = texturesTab.add('group');
    var paperBtn = texBtnsGrp.add('button', undefined, 'Paper');
    tvaiBtn.onClick = createTvaiStroke;
    scaleBtn.onClick = scaleWithOvershoot;
    logosBtn.onClick = importLogos;
    illustrationBtn.onClick = createIllustrationText;
    formatLayerBtn.onClick = formatLayerName;
    textReverseBtn.onClick = textReverse;
    bgBtn.onClick = createBg;
    IsraelMapShapeBtn.onClick = createIsraelMap;
    GazaMapShapeBtn.onClick = createGazaMap;
    numCountBtn.onClick = createCountingText;
    israelMapPic.onClick = importIsraelGoogleMaps;
    boomBtn.onClick = function () {
        createExplosionIcon(circleColorDD.selection.toString(), iconColorDD.selection.toString(), circleCheck.value);
    };
    tunnelBtn.onClick = function () {
        createTunnelIcon(circleColorDD.selection.toString(), iconColorDD.selection.toString(), circleCheck.value);
    };
    kindergardenBtn.onClick = function () {
        var lang = getLanguageFromKeyboard();
        createKindergardenLocation(lang);
    };
    medicalBtn.onClick = function () {
        var lang = getLanguageFromKeyboard();
        createMedicalLocation(lang);
    };
    paperBtn.onClick = function () {
        importAndLoopTexture("".concat(File('.'), "/Scripts/ScriptUI Panels/MivtzaiUtils Assets/Textures/Kyle_Paper_Dark.jpg"));
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
