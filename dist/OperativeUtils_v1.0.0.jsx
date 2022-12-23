/**
 * @name Operative Utils
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
var getAssetsPathFromOS = function (os) {
    if (os === void 0) { os = getOS(); }
    if (os === 'Win') {
        return "".concat(File('.'), "/Scripts/ScriptUI Panels/Operative Utils_v1.0.0 Assets");
    }
    else if (os === 'Mac') {
        return "/Applications/Adobe After Effects 20".concat(app.version.substring(0, 2), "/Scripts/ScriptUI Panels");
    }
};
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
var getOS = function () {
    if ($.os.indexOf('Win') != -1)
        return 'Win';
    return 'Mac';
};
var openFs = function (path) {
    var folder = Folder(path);
    var cmd = getOS() === 'Win'
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
var createFolder = function (folderObj) {
    if (!folderObj.exists)
        folderObj.create();
    return folderObj;
};
var readPrefs = function () {
    var appDataFolder = File(Folder.appData.toString()).toString();
    var file = File(appDataFolder + '/Operative Utils/Prefs/Prefs.json');
    file.open('r');
    var stringData = file.read();
    file.close();
    return stringData;
};
var parsePrefs = function () {
    var stringData = readPrefs();
    var parsedData = JSON.parse(stringData);
    return parsedData;
};
var setUpPrefs = function () {
    var appDataFolder = File(Folder.appData.toString()).toString();
    createFolder(Folder(appDataFolder + '/Operative Utils'));
    createFolder(Folder(appDataFolder + '/Operative Utils/Prefs'));
    var myJSON = File(appDataFolder + '/Operative Utils/Prefs/Prefs.json');
    if (myJSON.exists) {
        var parsedPrefs = parsePrefs();
        parsedPrefs.version = '1.0.0';
        myJSON.open('w');
        myJSON.write(JSON.stringify(parsedPrefs, null, 2));
        myJSON.close();
    }
    else {
        myJSON.open('w');
        myJSON.write(JSON.stringify({ version: '1.0.0' }, null, 2));
        myJSON.close();
    }
};
var writePrefsToMemory = function (prefs) {
    var appDataFolder = File(Folder.appData.toString()).toString();
    createFolder(Folder(appDataFolder + '/Operative Utils'));
    createFolder(Folder(appDataFolder + '/Operative Utils/Prefs'));
    var myJSON = File(appDataFolder + '/Operative Utils/Prefs/Prefs.json');
    myJSON.open('w');
    myJSON.write(JSON.stringify(prefs, null, 2));
    myJSON.close();
    return myJSON;
};
var importGoogleMaps = function (location) {
    var keyState = ScriptUI.environment.keyboardState;
    var whichMap = 'Clean';
    if (keyState.ctrlKey) {
        whichMap = 'Guide';
    }
    var mapItem = app.project.importFile(new ImportOptions(File("".concat(getAssetsPathFromOS(), "/Images/").concat(location, "_Map_").concat(whichMap, ".png"))));
    var comp = app.project.activeItem;
    var mapLayer = comp.layers.add(mapItem);
    mapLayer.selected = true;
    app.executeCommand(2732);
};
var createHelpWindow = function () {
    var helpWin = new Window('dialog', 'Help & Info');
    if (helpWin == null) {
        helpWin;
    }
    var tpanel = helpWin.add('tabbedpanel');
    var aboutTab = tpanel.add('tab', undefined, ['About']);
    var abtStr = '‹ Operative Utils - 1.0.0 - Created By Eyal Cohen ›';
    aboutTab.add('edittext', [0, 0, 380, 300], abtStr, {
        multiline: true,
        readonly: true,
        scrollable: true
    });
    var settingsTab = tpanel.add('tab', undefined, ['Settings']);
    settingsTab.orientation = 'row';
    var reviewsTab = tpanel.add('tab', undefined, ['Reviews']);
    reviewsTab.add('edittext', [0, 0, 380, 300], '', {
        multiline: true,
        readonly: true,
        scrollable: true
    });
    var okBtn = helpWin.add('button', undefined, 'Ok', { name: 'Ok' });
    helpWin.layout.layout(true);
    if (helpWin != null && helpWin instanceof Window) {
        helpWin.center();
        helpWin.show();
    }
};
var generateCaspiQuote = function () {
    var quotes = ['1', '2', '3', '4'];
    var theQuote = quotes[Math.floor(Math.random() * quotes.length)];
    alert(theQuote, 'Caspi Says:');
};
var scaleWithOvershoot = function (layers) {
    if (layers === void 0) { layers = app.project.activeItem.selectedLayers; }
    var comp = app.project.activeItem;
    if (layers.length === 0)
        return;
    layers.forEach(function (sl) {
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
var colorNameToRGB = function (name) {
    if (name === 'White') {
        return [255, 255, 255];
    }
    else if (name === 'Black') {
        return [0, 0, 0];
    }
    else if (name === 'Red') {
        return [197, 24, 24];
    }
};
var createTvaiStroke = function () {
    app.beginUndoGroup('Create Tunnel Stroke');
    var comp = app.project.activeItem;
    var layer = comp.layers.addShape();
    layer.name = 'Tunnel';
    var contents = layer.property('ADBE Root Vectors Group');
    var shapeGrp = contents.addProperty('ADBE Vector Group');
    shapeGrp.name = 'Tunnel_Stroke';
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
    sliderVal.setValue(-100);
    sliderVal.expression =
        'var endProp = content("Tunnel_Stroke").content("Trim Paths 1").end;\n' +
            'var speedSlider = effect("Speed")("Slider");\n' +
            'linear(endProp, 100, 0, 0, speedSlider)';
    var parentGrp = contents
        .property('Tunnel_Stroke')
        .property('ADBE Vectors Group');
    var trimPathsGrp = parentGrp.addProperty('ADBE Vector Filter - Trim');
    var trimPathsEnd = trimPathsGrp.property('ADBE Vector Trim End');
    trimPathsEnd.setValueAtTime(0, 0);
    trimPathsEnd.setValueAtTime((1 / 24) * 30, 100);
    trimPathsEnd.setTemporalEaseAtKey(1, [new KeyframeEase(0.5, 33)], [new KeyframeEase(0.5, 33)]);
    trimPathsEnd.setTemporalEaseAtKey(2, [new KeyframeEase(0.5, 88)], [new KeyframeEase(0.5, 88)]);
    layer
        .property('ADBE Root Vectors Group')
        .property('ADBE Vector Group')
        .property('ADBE Vectors Group')
        .property('ADBE Vector Shape - Group').selected = true;
    app.endUndoGroup();
};
var scaleWithOvershootQA = function (layers) {
    if (layers === void 0) { layers = app.project.activeItem.selectedLayers; }
    app.beginUndoGroup('Pop Animation');
    scaleWithOvershoot(layers);
    app.endUndoGroup();
};
var importLogos = function () {
    app.beginUndoGroup('Import Logos');
    var idfItem = app.project.importFile(new ImportOptions(File("".concat(getAssetsPathFromOS(), "/Logos/IDF_Logo.png"))));
    var dotzItem = app.project.importFile(new ImportOptions(File("".concat(getAssetsPathFromOS(), "/Logos/Dotz_Logo.png"))));
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
    app.endUndoGroup();
};
var createIllustrationText = function () {
    app.beginUndoGroup('Create Illustration Text');
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
    app.endUndoGroup();
};
var formatLayerName = function () {
    app.beginUndoGroup('Format Layer Name');
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
    app.endUndoGroup();
};
var textReverse = function () {
    app.beginUndoGroup('Reverse Text');
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
    app.endUndoGroup();
};
var createBg = function () {
    app.beginUndoGroup('Create Background');
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
    var endPointPos = comp.width >= comp.height ? [comp.width / 2, 0] : [0, comp.height / 2];
    endPoint.setValue(endPointPos);
    var fx = layer.property('ADBE Effect Parade');
    var tint = fx.addProperty('ADBE Tint');
    var tintBlack = tint.property('ADBE Tint-0001');
    var tintWhite = tint.property('ADBE Tint-0002');
    tintWhite.setValue([118 / 255, 15 / 255, 15 / 255]);
    tintBlack.setValue([25 / 255, 0, 0]);
    app.endUndoGroup();
};
var createIsraelMap = function () {
    app.beginUndoGroup('Create Israel Map');
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
    app.endUndoGroup();
};
var createGazaMap = function () {
    app.beginUndoGroup('Create Gaza Map');
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
    app.endUndoGroup();
};
var createCountingText = function () {
    app.beginUndoGroup('Create Counting Numbers');
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
    app.endUndoGroup();
};
var importIsraelGoogleMaps = function () {
    app.beginUndoGroup('Import Israel Map');
    importGoogleMaps('Israel');
    app.endUndoGroup();
};
var importGazaGoogleMaps = function () {
    app.beginUndoGroup('Import Gaza Map');
    importGoogleMaps('Gaza');
    app.endUndoGroup();
};
var createAnimatedFrame = function () {
    app.beginUndoGroup('Create Animated Frame');
    var comp = app.project.activeItem;
    var layer = comp.layers.addShape();
    layer.name = 'Frame';
    var contents = layer.property('ADBE Root Vectors Group');
    var shapeGrp = contents.addProperty('ADBE Vector Group');
    shapeGrp.name = 'Frame';
    var xSlider = layer.effect.addProperty('ADBE Slider Control');
    xSlider.name = 'Size X';
    var xSliderProp = xSlider.property('ADBE Slider Control-0001');
    xSliderProp.setValue(100);
    var ySlider = layer.effect.addProperty('ADBE Slider Control');
    ySlider.name = 'Size Y';
    var ySliderProp = ySlider.property('ADBE Slider Control-0001');
    ySliderProp.setValue(100);
    var lineGrp = shapeGrp.property('ADBE Vectors Group');
    var rectGrp = lineGrp.addProperty('ADBE Vector Shape - Rect');
    var rectSize = rectGrp.property('ADBE Vector Rect Size');
    rectSize.expression =
        '[effect("Size X")("Slider"), effect("Size Y")("Slider")]';
    var myStroke = lineGrp.addProperty('ADBE Vector Graphic - Stroke');
    var strokeWidth = myStroke.property('ADBE Vector Stroke Width');
    strokeWidth.setValue(10);
    var strokeColor = myStroke.property('ADBE Vector Stroke Color');
    strokeColor.setValue([1, 1, 1]);
    var parentGrp = contents
        .property('Frame')
        .property('ADBE Vectors Group');
    var trimPathsGrp = parentGrp.addProperty('ADBE Vector Filter - Trim');
    var trimPathsEnd = trimPathsGrp.property('ADBE Vector Trim End');
    trimPathsEnd.setValueAtTime(0, 0);
    trimPathsEnd.setValueAtTime((1 / 24) * 30, 100);
    trimPathsEnd.setTemporalEaseAtKey(1, [new KeyframeEase(0.5, 34)], [new KeyframeEase(0.5, 34)]);
    trimPathsEnd.setTemporalEaseAtKey(2, [new KeyframeEase(0.5, 92)], [new KeyframeEase(0.5, 92)]);
    var trimPathsOffset = trimPathsGrp.property('ADBE Vector Trim Offset');
    trimPathsOffset.setValueAtTime(0, -324);
    trimPathsOffset.setValueAtTime((1 / 24) * 32, 0);
    trimPathsOffset.setTemporalEaseAtKey(1, [new KeyframeEase(0.5, 24)], [new KeyframeEase(0.5, 24)]);
    trimPathsOffset.setTemporalEaseAtKey(2, [new KeyframeEase(0.5, 72)], [new KeyframeEase(0.5, 72)]);
    app.endUndoGroup();
};
var openProjectInFinder = function () {
    var writeSelectDialogToPrefs = function () {
        var selFolder = Folder.selectDialog('Select Project Folder');
        writePrefsToMemory({
            projectFolderPath: selFolder.fsName,
            version: '1.0.0'
        });
    };
    var ctrlKey = ScriptUI.environment.keyboardState.ctrlKey;
    if (ctrlKey) {
        writeSelectDialogToPrefs();
    }
    else {
        var parsedPrefs = parsePrefs();
        var path = parsedPrefs.projectFolderPath;
        if (!path) {
            var conf = confirm('No folder selected yet.\nWould you like to choose now?');
            if (conf)
                writeSelectDialogToPrefs();
        }
        else {
            openFs(path);
        }
    }
};
var setUpIcon = function (name, circleColor, iconColor) {
    var comp = app.project.activeItem;
    var layer = comp.layers.addShape();
    layer.name = name;
    var contents = layer.property('Contents');
    var circleColorRgb = colorNameToRGB(circleColor);
    var iconColorRgb = colorNameToRGB(iconColor);
    return { layer: layer, contents: contents, circleColorRgb: circleColorRgb, iconColorRgb: iconColorRgb };
};
var iconAftermath = function (hasCircle, contents, circleColorRgb, scale, layer) {
    if (hasCircle)
        createIconCircle(contents, circleColorRgb);
    if (scale)
        scaleWithOvershoot([layer]);
};
var createExplosionIcon = function (circleColor, iconColor, hasCircle, scale) {
    var _a = setUpIcon('Boom', circleColor, iconColor), layer = _a.layer, contents = _a.contents, circleColorRgb = _a.circleColorRgb, iconColorRgb = _a.iconColorRgb;
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
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer);
};
var createTunnelIcon = function (circleColor, iconColor, hasCircle, scale) {
    var _a = setUpIcon('Tunnel', circleColor, iconColor), layer = _a.layer, contents = _a.contents, circleColorRgb = _a.circleColorRgb, iconColorRgb = _a.iconColorRgb;
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
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer);
};
var createTerrorTunnelIcon = function (circleColor, iconColor, hasCircle, scale) {
    var _a = setUpIcon('Terror_Tunnel', circleColor, iconColor), layer = _a.layer, contents = _a.contents, circleColorRgb = _a.circleColorRgb, iconColorRgb = _a.iconColorRgb;
    var createBigBoom = function () {
        var vertices = [
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
            [0, 0]
        ];
        createPathGrp(contents, 'Big_Boom', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [4.5148, 15.2649]);
    };
    var createLittleBoom = function () {
        var vertices = [
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
        createPathGrp(contents, 'Little_Boom', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [2.978, 52.1255]);
    };
    var createCircleOne = function () {
        var vertices = [
            [2.00054931640625, 0],
            [-0.0045166015625, 2.00131225585938],
            [-2.00054931640625, 0],
            [-0.0045166015625, -2.00131225585938],
            [2.00054931640625, 0]
        ];
        var inTangents = [
            [0, 0],
            [1.10519409179688, 0],
            [0, 1.10557556152344],
            [-1.101806640625, 0],
            [0, -1.10519409179688]
        ];
        var outTangents = [
            [0, 1.10557556152344],
            [-1.101806640625, 0],
            [0, -1.10519409179688],
            [1.10519409179688, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Circle_01', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [-40.3515, 15.2593]);
    };
    var createCircleTwo = function () {
        var vertices = [
            [1.61491394042969, 0.00094604492188],
            [0.00094604492188, 1.61491394042969],
            [-1.61491394042969, 0.00094604492188],
            [0.00094604492188, -1.61491394042969],
            [1.61491394042969, 0.00094604492188]
        ];
        var inTangents = [
            [0, 0],
            [0.88671875, 0],
            [0, 0.89234924316406],
            [-0.89422607421875, 0],
            [0, -0.89422607421875]
        ];
        var outTangents = [
            [0, 0.89234924316406],
            [-0.89422607421875, 0],
            [0, -0.89422607421875],
            [0.88671875, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Circle_02', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [33.3021, -23.4531]);
    };
    var createCircleThree = function () {
        var vertices = [
            [1.69389343261719, -0.00018310546875],
            [-0.00282287597656, 1.69276428222656],
            [-1.69389343261719, -0.00018310546875],
            [-0.00282287597656, -1.69276428222656],
            [1.69389343261719, -0.00018310546875]
        ];
        var inTangents = [
            [0, 0],
            [0.93635559082031, 0],
            [0, 0.93296813964844],
            [-0.93070983886719, 0],
            [0, -0.93635559082031]
        ];
        var outTangents = [
            [0, 0.93296813964844],
            [-0.93070983886719, 0],
            [0, -0.93635559082031],
            [0.93635559082031, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Circle_03', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [38.6104, 32.1923]);
    };
    var createBorder = function () {
        var vertices = [
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
        var inTangents = [
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
        var outTangents = [
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
        createPathGrp(contents, 'Border', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [0, 0]);
    };
    var createInsideR = function () {
        var vertices = [
            [-24.6310577392578, -21.1304931640625],
            [24.6310577392578, 21.1304931640625]
        ];
        var inTangents = [
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Inside_R', false, true, iconColorRgb, iconColorRgb, 0.85, vertices, inTangents, outTangents, true, [43.388, 73.2559]);
    };
    var createInsideL = function () {
        var vertices = [
            [26.6930847167969, -22.1788787841797],
            [-26.6930847167969, 22.1788787841797]
        ];
        var inTangents = [
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Inside_L', false, true, iconColorRgb, iconColorRgb, 0.85, vertices, inTangents, outTangents, true, [-39.4005, 72.2038]);
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
var createTargetIcon = function (circleColor, iconColor, hasCircle, scale) {
    var _a = setUpIcon('Target', circleColor, iconColor), layer = _a.layer, contents = _a.contents, circleColorRgb = _a.circleColorRgb, iconColorRgb = _a.iconColorRgb;
    var createLittleCircle = function () {
        var vertices = [
            [31.2296600341797, 0],
            [0, 31.2296600341797],
            [-31.2296600341797, 0],
            [0, -31.2296600341797]
        ];
        var inTangents = [
            [0, -17.2476654052734],
            [17.2476654052734, 0],
            [0, 17.2476654052734],
            [-17.2476654052734, 0]
        ];
        var outTangents = [
            [0, 17.2476654052734],
            [-17.2476654052734, 0],
            [0, -17.2476654052734],
            [17.2476654052734, 0]
        ];
        createPathGrp(contents, 'Little_Circle', false, true, iconColorRgb, iconColorRgb, 24, vertices, inTangents, outTangents, true, [2.2409, -0.9836]);
    };
    var createBigCircle = function () {
        var vertices = [
            [84.0924072265625, 0],
            [0, 84.0924072265625],
            [-84.0924072265625, 0],
            [0, -84.0924072265625]
        ];
        var inTangents = [
            [0, -46.4429473876953],
            [46.4429473876953, 0],
            [0, 46.4429473876953],
            [-46.4429473876953, 0]
        ];
        var outTangents = [
            [0, 46.4429473876953],
            [-46.4429473876953, 0],
            [0, -46.4429473876953],
            [46.4429473876953, 0]
        ];
        createPathGrp(contents, 'Big_Circle', false, true, iconColorRgb, iconColorRgb, 24, vertices, inTangents, outTangents, true, [2.2409, -2.9498]);
    };
    var createRecTop = function () {
        var vertices = [
            [11.7978515625, 8.88459777832031],
            [-11.7978515625, 8.88459777832031],
            [-11.7978515625, -8.88459777832031],
            [11.7978515625, -8.88459777832031]
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
        createPathGrp(contents, 'Rec_Top', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [0.9845, -100.2375]);
    };
    var createRecBottom = function () {
        var vertices = [
            [11.7978515625, 8.88459777832031],
            [-11.7978515625, 8.88459777832031],
            [-11.7978515625, -8.88459777832031],
            [11.7978515625, -8.88459777832031]
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
        createPathGrp(contents, 'Rec_Bottom', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [0.9845, 100.2375]);
    };
    var createRecRight = function () {
        var vertices = [
            [13.4363098144531, 11.8039245605469],
            [-13.4363098144531, 11.8039245605469],
            [-13.4363098144531, -11.8039245605469],
            [13.4363098144531, -11.8039245605469]
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
        createPathGrp(contents, 'Rec_Right', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [97.652, -1.0784]);
    };
    var createRecLeft = function () {
        var vertices = [
            [13.4363098144531, 11.8039245605469],
            [-13.4363098144531, 11.8039245605469],
            [-13.4363098144531, -11.8039245605469],
            [13.4363098144531, -11.8039245605469]
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
        createPathGrp(contents, 'Rec_Left', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [-97.652, -1.0784]);
    };
    createRecLeft();
    createRecRight();
    createRecBottom();
    createRecTop();
    createBigCircle();
    createLittleCircle();
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer);
};
var createSniperTargetIcon = function (circleColor, iconColor, hasCircle, scale) {
    var _a = setUpIcon('Sniper_Target', circleColor, iconColor), layer = _a.layer, contents = _a.contents, circleColorRgb = _a.circleColorRgb, iconColorRgb = _a.iconColorRgb;
    var createOuterRing = function () {
        var vertices = [
            [0, -103.27001953125],
            [-103.27001953125, -0.00001525878906],
            [0, 103.269958496094],
            [103.27001953125, -0.00001525878906]
        ];
        var inTangents = [
            [57.0399780273438, 0],
            [0, -57.0400238037109],
            [-57.0399780273438, 0],
            [0, 57.0399932861328]
        ];
        var outTangents = [
            [-57.0399780273438, 0],
            [0, 57.0399932861328],
            [57.0399780273438, 0],
            [0, -57.0400238037109]
        ];
        createPathGrp(contents, 'Outer_Ring', false, true, iconColorRgb, iconColorRgb, 7, vertices, inTangents, outTangents, true, [0, 0]);
    };
    var createMiddleTR = function () {
        var vertices = [
            [17.1749877929688, 13.6750183105469],
            [1.82501220703125, 13.6750183105469],
            [-1.67498779296875, 17.1750183105469],
            [-13.2949829101562, 17.1750183105469],
            [-17.1749877929688, 13.2950134277344],
            [-17.1749877929688, 1.67501831054688],
            [-13.6749877929688, -1.82498168945312],
            [-13.6749877929688, -17.1750183105469]
        ];
        var inTangents = [
            [-1.6300048828125, -16.280029296875],
            [0, 0],
            [0, -1.92999267578125],
            [0, 0],
            [2.1400146484375, 0],
            [0, 0],
            [0, 1.92999267578125],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [-1.92999267578125, 0],
            [0, 0],
            [0, -2.1400146484375],
            [0, 0],
            [1.92999267578125, 0],
            [0, 0],
            [16.280029296875, 1.6300048828125]
        ];
        createPathGrp(contents, 'Middle_Top_Right', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [17.175, -17.175]);
    };
    var createMiddleBR = function () {
        var vertices = [
            [17.1749877929688, -13.6749877929688],
            [-13.6749877929688, 17.1749877929688],
            [-13.6749877929688, 1.82501220703125],
            [-17.1749877929688, -1.67498779296875],
            [-17.1749877929688, -13.2949829101562],
            [-13.2949829101562, -17.1749877929688],
            [-1.67498779296875, -17.1749877929688],
            [1.82501220703125, -13.6749877929688]
        ];
        var inTangents = [
            [0, 0],
            [16.280029296875, -1.6300048828125],
            [0, 0],
            [1.92999267578125, 0],
            [0, 0],
            [0, 2.1400146484375],
            [0, 0],
            [-1.92999267578125, 0]
        ];
        var outTangents = [
            [-1.6300048828125, 16.2799682617188],
            [0, 0],
            [0, -1.92999267578125],
            [0, 0],
            [2.1400146484375, 0],
            [0, 0],
            [0, 1.92999267578125],
            [0, 0]
        ];
        createPathGrp(contents, 'Middle_Bottom_Right', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [17.175, 17.175]);
    };
    var createMiddleTL = function () {
        var vertices = [
            [17.1749877929688, 1.67501831054688],
            [17.1749877929688, 13.2950134277344],
            [13.2949829101562, 17.1750183105469],
            [1.67498779296875, 17.1750183105469],
            [-1.82501220703125, 13.6750183105469],
            [-17.1749877929688, 13.6750183105469],
            [13.6749877929688, -17.1750183105469],
            [13.6749877929688, -1.82498168945312]
        ];
        var inTangents = [
            [-1.92999267578125, 0],
            [0, 0],
            [0, -2.1400146484375],
            [0, 0],
            [1.92999267578125, 0],
            [0, 0],
            [-16.280029296875, 1.6300048828125],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [-2.1400146484375, 0],
            [0, 0],
            [0, -1.92999267578125],
            [0, 0],
            [1.6300048828125, -16.280029296875],
            [0, 0],
            [0, 1.92999267578125]
        ];
        createPathGrp(contents, 'Middle_Top_Left', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [-17.175, -17.175]);
    };
    var createMiddleBL = function () {
        var vertices = [
            [17.1749877929688, -13.2949829101562],
            [17.1749877929688, -1.67498779296875],
            [13.6749877929688, 1.82501220703125],
            [13.6749877929688, 17.1749877929688],
            [-17.1749877929688, -13.6749877929688],
            [-1.82501220703125, -13.6749877929688],
            [1.67498779296875, -17.1749877929688],
            [13.2949829101562, -17.1749877929688]
        ];
        var inTangents = [
            [-2.1400146484375, 0],
            [0, 0],
            [0, -1.92999267578125],
            [0, 0],
            [1.6300048828125, 16.2799682617188],
            [0, 0],
            [0, 1.92999267578125],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [-1.92999267578125, 0],
            [0, 0],
            [-16.280029296875, -1.6300048828125],
            [0, 0],
            [1.92999267578125, 0],
            [0, 0],
            [0, 2.1400146484375]
        ];
        createPathGrp(contents, 'Middle_Bottom_Left', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [-17.175, 17.175]);
    };
    var createTopLeft = function () {
        var vertices = [
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
        var inTangents = [
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
        var outTangents = [
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
        createPathGrp(contents, 'Top_Left', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [-47.615, -47.615]);
    };
    var createTopRight = function () {
        var vertices = [
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
        var inTangents = [
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
        var outTangents = [
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
        createPathGrp(contents, 'Top_Right', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [47.615, -47.615]);
    };
    var createBottomRight = function () {
        var vertices = [
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
        var inTangents = [
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
        var outTangents = [
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
        createPathGrp(contents, 'Bottom_Right', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [47.615, 47.615]);
    };
    var createBottomLeft = function () {
        var vertices = [
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
        var inTangents = [
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
        var outTangents = [
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
        createPathGrp(contents, 'Bottom_Left', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [0, 0]);
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
var createHouseBombingIcon = function (circleColor, iconColor, hasCircle, scale) {
    var _a = setUpIcon('House_Bombing', circleColor, iconColor), layer = _a.layer, contents = _a.contents, circleColorRgb = _a.circleColorRgb, iconColorRgb = _a.iconColorRgb;
    var createBigBoom = function () {
        var vertices = [
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
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Big_Boom', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [65.4645, -66.554]);
    };
    var createLittleBoom = function () {
        var vertices = [
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
        createPathGrp(contents, 'Little_Boom', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [30.675, -28.324]);
    };
    var createCircleOne = function () {
        var vertices = [
            [1.96058654785156, 1.96180725097656],
            [-1.96549987792969, 1.96180725097656],
            [-1.96046447753906, -1.9619140625],
            [1.96322631835938, -1.95953369140625]
        ];
        var inTangents = [
            [1.08480834960938, -1.08216857910156],
            [1.08718872070312, 1.0819091796875],
            [-1.08193969726562, 1.0819091796875],
            [-1.0819091796875, -1.08454895019531]
        ];
        var outTangents = [
            [-1.08454895019531, 1.08454895019531],
            [-1.08216857910156, -1.08718872070312],
            [1.08450317382812, -1.08480834960938],
            [1.08216857910156, 1.08480834960938]
        ];
        createPathGrp(contents, 'Circle_01', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [24.4686, -107.3976]);
    };
    var createCircleTwo = function () {
        var vertices = [
            [1.58273315429688, 1.58628845214844],
            [-1.58595275878906, 1.58364868164062],
            [-1.58595275878906, -1.58529663085938],
            [1.58537292480469, -1.58265686035156]
        ];
        var inTangents = [
            [0.87617492675781, -0.87612915039062],
            [0.87322998046875, 0.87322998046875],
            [-0.87348937988281, 0.87348937988281],
            [-0.87586975097656, -0.87586975097656]
        ];
        var outTangents = [
            [-0.87586975097656, 0.87322998046875],
            [-0.87348937988281, -0.87850952148438],
            [0.87850952148438, -0.87322998046875],
            [0.87586975097656, 0.87586975097656]
        ];
        createPathGrp(contents, 'Circle_02', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [134.5952, -73.0661]);
    };
    var createCircleThree = function () {
        var vertices = [
            [1.65907287597656, 1.6605224609375],
            [-1.66183471679688, 1.65788269042969],
            [-1.65919494628906, -1.66038513183594],
            [1.66171264648438, -1.66038513183594]
        ];
        var inTangents = [
            [0.91728210449219, -0.91702270507812],
            [0.91464233398438, 0.91728210449219],
            [-0.91461181640625, 0.91728210449219],
            [-0.91728210449219, -0.91438293457031]
        ];
        var outTangents = [
            [-0.91966247558594, 0.91464233398438],
            [-0.91702270507812, -0.91702270507812],
            [0.91966247558594, -0.91438293457031],
            [0.91464233398438, 0.919921875]
        ];
        createPathGrp(contents, 'Circle_03', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [85.2107, -13.3492]);
    };
    var createHouse = function () {
        var vertices = [
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
            [0, 0]
        ];
        createPathGrp(contents, 'House', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [-32.845, 35.12]);
    };
    var createRoof = function () {
        var vertices = [
            [-32.849365234375, -89.4986877441406],
            [-137.056411743164, 9.88291931152344],
            [-120.251113891602, 9.88291931152344],
            [-32.849365234375, -73.8296356201172],
            [56.6365356445312, 9.88291931152344],
            [71.3576965332031, 9.88291931152344]
        ];
        var inTangents = [
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
            [0, 0]
        ];
        createPathGrp(contents, 'Roof', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [0, 0]);
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
var createFireIcon = function (circleColor, iconColor, hasCircle, scale) {
    var _a = setUpIcon('Fire', circleColor, iconColor), layer = _a.layer, contents = _a.contents, circleColorRgb = _a.circleColorRgb, iconColorRgb = _a.iconColorRgb;
    var createFireL = function () {
        var vertices = [
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
        var inTangents = [
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
        var outTangents = [
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
        createPathGrp(contents, 'Fire_L', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [-37.5212, 0.2258]);
    };
    var createFireR = function () {
        var vertices = [
            [80.0287933349609, 6.43951416015625],
            [17.8787689208984, -102.990478515625],
            [10.5087738037109, -109.210510253906],
            [10.5087738037109, -7.32049560546875],
            [40.2387542724609, 35.4194946289062],
            [10.5087738037109, 71.0994873046875],
            [10.5087738037109, 109.359497070312],
            [61.6287689208984, 88.6895141601562]
        ];
        var inTangents = [
            [11.97998046875, 28.6599731445312],
            [-14.4400024414062, 63.4299926757812],
            [3.94000244140625, -1.72998046875],
            [0, 0],
            [0, -17.3099975585938],
            [17.6300048828125, -1.52001953125],
            [0, 0],
            [-14.27001953125, 13.0700073242188]
        ];
        var outTangents = [
            [-16.7900390625, -43.6500244140625],
            [1.010009765625, -4.46002197265625],
            [0, 0],
            [9.94000244140625, 13.9799957275391],
            [0.55999755859375, 17.9199829101562],
            [0, 0],
            [18.6199951171875, -1.3599853515625],
            [22.25, -20.6400146484375]
        ];
        createPathGrp(contents, 'Fire_R', true, false, iconColorRgb, iconColorRgb, 0, vertices, inTangents, outTangents, true, [0, 0]);
    };
    createFireR();
    createFireL();
    var offsetPaths = contents.addProperty('ADBE Vector Filter - Offset');
    var offsetAmt = offsetPaths.property('ADBE Vector Offset Amount');
    offsetAmt.setValue(0.5);
    iconAftermath(hasCircle, contents, circleColorRgb, scale, layer);
};
var createIconFromId = function (id, circleColor, iconColor, hasCircle, scale) {
    app.beginUndoGroup("Create Icon: ".concat(id));
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
    }
    app.endUndoGroup();
};
var createLocationBG = function (id, size, color) {
    if (color === void 0) { color = [1, 1, 1]; }
    var comp = app.project.activeItem;
    var layer = comp.layers.addShape();
    layer.name = "".concat(id, "_BG");
    var contents = layer.property('ADBE Root Vectors Group');
    var grp = contents.addProperty('ADBE Vector Group');
    grp.name = "".concat(id, "_BG");
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
var createLocationText = function (lang, text, fontSize, tracking, leading, textPos, textAnchor) {
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
    if (leading) {
        textDoc.leading = leading;
    }
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
var createIconBase = function (name) {
    var comp = app.project.activeItem;
    var iconLayer = comp.layers.addShape();
    iconLayer.name = "".concat(name, "_Icon");
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
var createLocationIconFromId = function (id, iconPos, iconAnchor, iconScale) {
    switch (id) {
        case 'Kindergarden':
            return createKindergardenIcon(iconPos, iconAnchor, iconScale, id);
        case 'Medical Clinic':
            return createMedicalIcon(iconPos, iconAnchor, iconScale, id);
        case 'Sports':
            return createSportsIcon(iconPos, iconAnchor, iconScale, id);
        case 'University':
            return createUniversityIcon(iconPos, iconAnchor, iconScale, id);
    }
};
var createLocation = function (inputLang, argsArr) {
    var _a = argsArr.find(function (args) { return args.lang === inputLang; }), bgSize = _a.bgSize, fontSize = _a.fontSize, lang = _a.lang, text = _a.text, textAnchor = _a.textAnchor, textPos = _a.textPos, tracking = _a.tracking, leading = _a.leading, iconAnchor = _a.iconAnchor, iconPos = _a.iconPos, iconScale = _a.iconScale, iconId = _a.iconId;
    var bgLayer = createLocationBG(iconId, bgSize);
    var iconLayer = createLocationIconFromId(iconId, iconPos, iconAnchor, iconScale);
    var textLayer = createLocationText(lang, text, fontSize, tracking, leading, textPos, textAnchor);
    iconLayer.parent = textLayer.parent = bgLayer;
    bgLayer.label = iconLayer.label = textLayer.label = 11;
    iconLayer.selected = textLayer.selected = false;
    bgLayer.selected = true;
};
var createKindergardenIcon = function (iconPos, iconAnchor, iconScale, name) {
    var iconLayer = createIconBase(name);
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
            iconId: 'Kindergarden'
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
            iconId: 'Kindergarden'
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
            iconId: 'Kindergarden'
        }
    ];
    createLocation(lang, args);
};
var createMedicalIcon = function (iconPos, iconAnchor, iconScale, name) {
    var iconLayer = createIconBase(name);
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
            iconId: 'Medical Clinic'
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
            iconId: 'Medical Clinic'
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
            iconId: 'Medical Clinic'
        }
    ];
    createLocation(lang, args);
};
var createSportsIcon = function (iconPos, iconAnchor, iconScale, name) {
    var iconLayer = createIconBase(name);
    var contents = iconLayer.property('Contents');
    var createBallBorder = function () {
        var vertices = [
            [26.9803924560547, 0],
            [0, 26.9803924560547],
            [-26.9803924560547, 0],
            [0, -26.9803924560547]
        ];
        var inTangents = [
            [0, -14.9008636474609],
            [14.9008636474609, 0],
            [0, 14.9008636474609],
            [-14.9008636474609, 0]
        ];
        var outTangents = [
            [0, 14.9008636474609],
            [-14.9008636474609, 0],
            [0, -14.9008636474609],
            [14.9008636474609, 0]
        ];
        createPathGrp(contents, 'Ball_Border', false, true, [0, 0, 0], [255, 255, 255], 4, vertices, inTangents, outTangents, true, [177.6914, -0.8718]);
    };
    var createBallPattern01 = function () {
        var vertices = [
            [-2.0587158203125, -7.95933532714844],
            [-9.53825378417969, -3.40415954589844],
            [-5.0865478515625, 7.95933532714844],
            [9.53825378417969, 7.95933532714844],
            [8.969482421875, -2.07745361328125]
        ];
        var inTangents = [
            [7.33279418945312, 2.37643432617188],
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
            [0, 0]
        ];
        createPathGrp(contents, 'Ball_Pattern_01', true, false, [255, 255, 255], [0, 0, 0], 0, vertices, inTangents, outTangents, true, [186.5702, -19.2442]);
    };
    var createBallPattern02 = function () {
        var vertices = [
            [-4.03433227539062, -7.84432983398438],
            [3.20297241210938, -8.99632263183594],
            [7.81706237792969, 2.06472778320312],
            [-1.34603881835938, 8.99632263183594],
            [-7.81706237792969, 4.27694702148438]
        ];
        var inTangents = [
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
            [0, 0]
        ];
        createPathGrp(contents, 'Ball_Pattern_02', true, false, [255, 255, 255], [0, 0, 0], 0, vertices, inTangents, outTangents, true, [158.4209, -6.8679]);
    };
    var createBallPattern03 = function () {
        var vertices = [
            [-10.4224853515625, -7.16879272460938],
            [4.99301147460938, -1.26144409179688],
            [10.4224853515625, 7.16879272460938],
            [-1.47776794433594, 2.66761779785156]
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
        createPathGrp(contents, 'Ball_Pattern_03', true, false, [255, 255, 255], [0, 0, 0], 0, vertices, inTangents, outTangents, true, [164.2615, 19.1702]);
    };
    var createBallPattern04 = function () {
        var vertices = [
            [4.08897399902344, -9.21754455566406],
            [-8.051025390625, -5.53053283691406],
            [-8.051025390625, 5.67800903320312],
            [2.32806396484375, 9.21754455566406],
            [8.051025390625, 0.9586181640625]
        ];
        var inTangents = [
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
            [0, 0]
        ];
        createPathGrp(contents, 'Ball_Pattern_04', true, false, [255, 255, 255], [0, 0, 0], 0, vertices, inTangents, outTangents, true, [178.5192, 6.774]);
    };
    var createBallPattern05 = function () {
        var vertices = [
            [3.44915771484375, -10.29736328125],
            [-3.88815307617188, 3.47108459472656],
            [-1.09207153320312, 10.29736328125],
            [3.88815307617188, 1.25888061523438]
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
        createPathGrp(contents, 'Ball_Pattern_05', true, false, [255, 255, 255], [0, 0, 0], 0, vertices, inTangents, outTangents, true, [200.8771, 4.5565]);
    };
    var createBallPattern06 = function () {
        var vertices = [
            [-9.75572204589844, 4.17427062988281],
            [-4.83880615234375, -0.86390686035156],
            [9.75572204589844, -4.17427062988281],
            [0.74287414550781, 2.04646301269531]
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
        createPathGrp(contents, 'Ball_Pattern_06', true, false, [255, 255, 255], [0, 0, 0], 0, vertices, inTangents, outTangents, true, [187.4469, 22.1648]);
    };
    var createBallLine01 = function () {
        var vertices = [
            [0.380126953125, 9.05567932128906],
            [-1.5057373046875, 8.93757629394531],
            [-0.380126953125, -9.05567932128906],
            [1.5057373046875, -8.93757629394531]
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
        createPathGrp(contents, 'Ball_Line_01', true, false, [255, 255, 255], [0, 0, 0], 0, vertices, inTangents, outTangents, true, [182.0461, -6.8678]);
    };
    var createBallLine02 = function () {
        var vertices = [
            [-4.1038818359375, -3.21076965332031],
            [0, 0],
            [0, 0],
            [0, 0],
            [0.57388305664062, 0.58863830566406],
            [0, 0]
        ];
        var inTangents = [
            [0, 0],
            [0.49453735351562, 0.60525512695312],
            [0, 0],
            [0, 0],
            [0, 0],
            [-5.08003234863281, -3.9765625]
        ];
        var outTangents = [
            [-4.1038818359375, -3.21076965332031],
            [0, 0],
            [0, 0],
            [0, 0],
            [0.57388305664062, 0.58863830566406],
            [0, 0]
        ];
        createPathGrp(contents, 'Ball_Line_02', true, false, [255, 255, 255], [0, 0, 0], 0, vertices, inTangents, outTangents, true, [166.771, -2.0904]);
    };
    var createBallLine03 = function () {
        var vertices = [
            [-10.4728546142578, 5.2987060546875],
            [-11.1888122558594, 3.54937744140625],
            [10.4728546142578, -5.2987060546875],
            [11.1888122558594, -3.54937744140625]
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
        createPathGrp(contents, 'Ball_Line_03', true, false, [255, 255, 255], [0, 0, 0], 0, vertices, inTangents, outTangents, true, [170.6526, -18.076]);
    };
    var createBallLine04 = function () {
        var vertices = [
            [8.58975219726562, 1.38580322265625],
            [-8.68569946289062, 0.50007629394531],
            [-8.58975219726562, -1.38580322265625],
            [8.68569946289062, -0.50007629394531]
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
        createPathGrp(contents, 'Ball_Line_04', true, false, [255, 255, 255], [0, 0, 0], 0, vertices, inTangents, outTangents, true, [192.2395, 7.8806]);
    };
    var createBallLine05 = function () {
        var vertices = [
            [1.67181396484375, 6.34220886230469],
            [-3.41006469726562, -5.60409545898438],
            [-1.67181396484375, -6.34220886230469],
            [3.41006469726562, 5.60409545898438]
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
        createPathGrp(contents, 'Ball_Line_05', true, false, [255, 255, 255], [0, 0, 0], 0, vertices, inTangents, outTangents, true, [181.0608, 17.3929]);
    };
    var createBallLine06 = function () {
        var vertices = [
            [-2.19033813476562, 6.61068725585938],
            [-3.88798522949219, 5.77662658691406],
            [2.19033813476562, -6.61068725585938],
            [3.88798522949219, -5.77662658691406]
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
        createPathGrp(contents, 'Ball_Line_06', true, false, [255, 255, 255], [0, 0, 0], 0, vertices, inTangents, outTangents, true, [169.884, 14.0742]);
    };
    var createBallLine07 = function () {
        var vertices = [
            [4.63255310058594, 6.99728393554688],
            [-6.07925415039062, -5.7830810546875],
            [-4.63255310058594, -6.99728393554688],
            [6.07925415039062, 5.7830810546875]
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
        createPathGrp(contents, 'Ball_Line_07', true, false, [255, 255, 255], [0, 0, 0], 0, vertices, inTangents, outTangents, true, [199.4093, -7.2617]);
    };
    var createBallLine08 = function () {
        var vertices = [
            [-0.67536926269531, 9.75965881347656],
            [-1.21418762207031, -9.70799255371094],
            [0.67536926269531, -9.75965881347656],
            [1.21418762207031, 9.70799255371094]
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
        createPathGrp(contents, 'Ball_Line_08', true, false, [255, 255, 255], [0, 0, 0], 0, vertices, inTangents, outTangents, true, [157.1978, 6.2585]);
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
        createPathGrp(contents, 'Icon_Circle', true, false, [53, 33, 28], [0, 0, 0], 0, vertices, inTangents, outTangents, true, [177.6913, -0.8716]);
    };
    createBallLine08();
    createBallLine07();
    createBallLine06();
    createBallLine05();
    createBallLine04();
    createBallLine03();
    createBallLine02();
    createBallLine01();
    createBallPattern06();
    createBallPattern05();
    createBallPattern04();
    createBallPattern03();
    createBallPattern02();
    createBallPattern01();
    createBallBorder();
    createIconCircle();
    setLayerTransform(iconLayer, iconPos, iconAnchor, iconScale);
    return iconLayer;
};
var createSportsLocation = function (lang) {
    var args = [
        {
            lang: 'Hebrew',
            text: 'מתחם ספורט ופנאי',
            fontSize: 77.3332,
            tracking: -19,
            textPos: [812.8363, 540.1692],
            textAnchor: [75.0863, -19.0808],
            bgSize: [480, 110],
            iconPos: [1045.5764, 539.1284],
            iconAnchor: [85.5764, -0.8716],
            iconScale: 100,
            iconId: 'Sports'
        },
        {
            lang: 'English',
            text: 'Sports and\nRecreation Complex',
            fontSize: 59,
            tracking: -31,
            leading: 53,
            textPos: [1001.1015, 542.921],
            textAnchor: [201.1015, 9.921],
            bgSize: [555, 134],
            iconPos: [743.8515, 536.0034],
            iconAnchor: [177.6913, -0.8716],
            iconScale: 100,
            iconId: 'Sports'
        },
        {
            lang: 'Arabic',
            text: 'ملعب رياضة',
            fontSize: 64,
            tracking: -19,
            textPos: [918.5146, 540.4375],
            textAnchor: [173.2645, -16.3125],
            bgSize: [466, 92],
            iconPos: [1141.5318, 540.1284],
            iconAnchor: [177.6913, -0.8716],
            iconScale: 83,
            iconId: 'Sports'
        }
    ];
    createLocation(lang, args);
};
var createUniversityIcon = function (iconPos, iconAnchor, iconScale, name) {
    var iconLayer = createIconBase(name);
    var contents = iconLayer.property('Contents');
    var createCoverL = function () {
        var vertices = [
            [14.0190734863281, 19.1502380371094],
            [-14.0190734863281, 17.6841888427734],
            [-9.80418395996094, -17.8674468994141],
            [-5.03953552246094, -19.1502380371094],
            [-10.9037170410156, 11.0869750976562]
        ];
        var inTangents = [
            [-2.19906616210938, -2.93209838867188],
            [5.31442260742188, -1.83256530761719],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Cover_L', true, false, [255, 255, 255], [0, 0, 0], 0, vertices, inTangents, outTangents, true, [91.8363, -1.761]);
    };
    var createPaperL = function () {
        var vertices = [
            [12.3697662353516, -10.0790710449219],
            [-5.58930969238281, -20.3414001464844],
            [-12.3697662353516, 10.4455871582031],
            [12.3697662353516, 20.3414001464844]
        ];
        var inTangents = [
            [0, 0],
            [10.4065246582031, 2.35177612304688],
            [0, 0],
            [-6.04743957519531, -5.13116455078125]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Paper_L', true, false, [255, 255, 255], [0, 0, 0], 0, vertices, inTangents, outTangents, true, [95.5015, -2.9521]);
    };
    var createCoverR = function () {
        var vertices = [
            [-14.0190734863281, 19.1502380371094],
            [14.0190734863281, 17.6841888427734],
            [9.80418395996094, -17.8674468994141],
            [5.03953552246094, -19.1502380371094],
            [10.9037170410156, 11.0869750976562]
        ];
        var inTangents = [
            [2.19906616210938, -2.93209838867188],
            [-5.31442260742188, -1.83256530761719],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Cover_R', true, false, [255, 255, 255], [0, 0, 0], 0, vertices, inTangents, outTangents, true, [126.4342, -1.761]);
    };
    var createPaperR = function () {
        var vertices = [
            [-12.3697662353516, -10.0790710449219],
            [5.58930969238281, -20.3414001464844],
            [12.3697662353516, 10.4455871582031],
            [-12.3697662353516, 20.3414001464844]
        ];
        var inTangents = [
            [0, 0],
            [-10.4065246582031, 2.35177612304688],
            [0, 0],
            [6.04743957519531, -5.13116455078125]
        ];
        var outTangents = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ];
        createPathGrp(contents, 'Paper_R', true, false, [255, 255, 255], [0, 0, 0], 0, vertices, inTangents, outTangents, true, [122.769, -2.9521]);
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
        createPathGrp(contents, 'Icon_Circle', true, false, [53, 33, 28], [0, 0, 0], 0, vertices, inTangents, outTangents, true, [110.002, -0.8716]);
    };
    createCoverL();
    createPaperL();
    createCoverR();
    createPaperR();
    createIconCircle();
    setLayerTransform(iconLayer, iconPos, iconAnchor, iconScale);
    return iconLayer;
};
var createUniversityLocation = function (lang) {
    var args = [
        {
            lang: 'Hebrew',
            text: 'אוניברסיטה',
            fontSize: 77.3332,
            tracking: -19,
            textPos: [907.7467, 539.0399],
            textAnchor: [102.9967, -20.21],
            bgSize: [344, 110],
            iconPos: [1045.5764, 539.1284],
            iconAnchor: [85.5764, -0.8716],
            iconScale: 100,
            iconId: 'University'
        },
        {
            lang: 'English',
            text: 'University',
            fontSize: 77,
            tracking: -29,
            textPos: [1006.8615, 543.4595],
            textAnchor: [130.8615, -21.2905],
            bgSize: [388, 106],
            iconPos: [826.9122, 539.0034],
            iconAnchor: [110.002, -0.8716],
            iconScale: 97,
            iconId: 'University'
        },
        {
            lang: 'Arabic',
            text: 'جامعة',
            fontSize: 64,
            tracking: -19,
            textPos: [920.9957, 540.4375],
            textAnchor: [90.2456, -16.3125],
            bgSize: [302, 92],
            iconPos: [1058.9747, 540.1284],
            iconAnchor: [110.002, -0.8716],
            iconScale: 83,
            iconId: 'University'
        }
    ];
    createLocation(lang, args);
};
var createLocationFromId = function (id, lang) {
    app.beginUndoGroup("Create Location: ".concat(id));
    switch (id) {
        case 'Kindergarden':
            createKindergardenLocation(lang);
            break;
        case 'Medical Clinic':
            createMedicalLocation(lang);
            break;
        case 'Sports':
            createSportsLocation(lang);
            break;
        case 'University':
            createUniversityLocation(lang);
            break;
    }
    app.endUndoGroup();
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
    posProp.expression =
        scaleProp.expression =
            rotProp.expression =
                'loopOut()';
};
var getPathFromTextureID = function (id) {
    return "".concat(getAssetsPathFromOS(), "/Textures/").concat(id.replace(/ /g, '_'), ".jpg");
};
var getCommandId = function (_a, _b) {
    var compW = _a.width, compH = _a.height;
    var texW = _b.width, texH = _b.height;
    if (texW >= texH && compW >= compH)
        return 2732;
    if (texH >= texW && compW >= compH)
        return 2732;
    if (texW >= texH && compH >= compW)
        return 2733;
    if (texH >= texW && compH >= compW)
        return 2732;
    return 2732;
};
var createTexture = function (id, loop, fit) {
    app.beginUndoGroup("Import Texture: ".concat(id));
    var path = getPathFromTextureID(id);
    var textureItem = importTexture(path);
    var comp = app.project.activeItem;
    var textureLayer = comp.layers.add(textureItem);
    if (loop)
        loopTexture(textureLayer);
    if (fit) {
        var commandId = getCommandId(comp, textureItem);
        textureLayer.selected = true;
        app.executeCommand(commandId);
    }
    app.endUndoGroup();
};
var tvaiBinary = '\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x18\x00\x00\x00\x18\b\x06\x00\x00\x00\u00E0w=\u00F8\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x00\u00FBIDATH\u0089\u00B5U\u0081\r\u00820\x10<\r\x03\u00E0\x06N`p\x03\u00DD\u0084\x11t\x136\u00B0\x0B\u00988\u0082#\u00E0\x04\u00AE\u00C0\x06o>>\u00C9\x17\u00DBZ\u00F8r\u00C9\u00A7@\u009A\u00FF\u00EB\u00DD\u00D3\u00DF\x10\x11\n\u00E2\'\u00D9\u00B6dv\u00C1\x15\u00C0YVT+\x14\u00E8\x01<\u00C7\u00975\n4z-\u00E9\u00C1\x1E\u00C0{\u00FA\u00B1\u0094\x07N\u00A492i/\u00F8\x04\u00C6h\u00E8\u008B\u009E\u0088\u00EAi.\u00ABDN\f\x1D\u00D4\u00EA\u00C3\u00C0\u00BES\u00CC\u00A3\u00FB\u0096v\u00D1\x05\u00C0]\u008Cm\u0093;\x170w\u00C2\u00DC\u00E5\u00EC\u009F\u00EB\x013~\u00C8\u00F3)\u00A8\u00B9\u00E1\x04\u00CCx \u00A2C\u00A8[b\u0091\u009B\u00BCM\u00B5\u00A2U\u00A2N~\u00A2Z\u00DA\u00F2\u00BF,3$\u00CAj\u00C5T\u00A4\u00AE\u008AV\u0098\u00BF\u00C4\u00D0E\u0088\x15`)n"K3[\x16\u0085\u0090\x07\u00B5\u00BA\u00CF\u00F3Z1\u0081*4\u00E6\x00\u00ECd5%\u0087\u0092\u00C8\x1Bs\u0092\u00D8\u009C\x1Cj\u00A2yc\u00AE$\u00C6\x02\u00DE\u0098+\t69\u00E4\x01O#;\x00|\x00\u00E1a\u00F0\u0083\x02\u00DB\u00B5q\x00\x00\x00\x00IEND\u00AEB`\u0082';
var countingNumbersBinary = '\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x18\x00\x00\x00\x18\b\x06\x00\x00\x00\u00E0w=\u00F8\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x010IDATH\u0089\u00EDU\u00D1\u00AD\u0082P\f=\x1A\u00FFe\x03\x19\u00E1\u00BA\x01#0\x02#0\x02#0\x02#\u00E8\x06\u008C\u00A0\x1B\u00F86\u00E0MPS-/}\u00B5\u00D5\u00EB\u008711\u009E\u00A4\x01.\u00A7\u00ED\u00ED\u00ED),\u0088\b\u00AF\u00C4\u00F2\u00A5\u00D1?"\u00C1\u00CA<\u0097b\x15\u0080\u0093\u00D8\x01\u00C0\x14\u00F8\x17\x00\u0092\u00F2\x1B\u0095\u00DF\x15\u00DCd"JD4\u0092\u008F\u0089\u0088z\u00E1i\u00EB\x03>I\u00ACt\x11\x10\x11\u0095\x12\u00E4\x11\x06\x15|\u00C8\u00E0s\u00CC2\u0097<#\u0089\u00E5b\u00E0&\u00D7\u00CE\u00D9n\x01\u00EC\u009D\u00F5:\u00E0\u00EF\u00C5\u00E7\u0086\u00CF\t\u00D6f\u00F1(\u008D\u00ED\u0083\u00C6z\u00E8\u00C5\u00E7h\u00DE\u00AD=\u0099\x16\u00E6\u009A\u0083\u00D0\u0087e\u00FA\x03`\u00A3\u00D6\u00F8\u00BE\r\u008E"\u0092k#2\u00DD\u0098\u00F5_nr\u00F7D\u00D3XqE\u00A6\u00EA\x18\u00C33\u00B2\x1B\u0095L\u009B\u00CC$\u00A5\x1E\u009CJ\u00AA98\u00C4Iv\u00AF\u00F9\\I{g\u00E0\u00BAy\u00D0\u00B4\u00D5\x01\u00B9v&yN\u00E2m\u00E8\u00AFZMNA\u00D9]\x10<:\u00DAI\x12\u00FFK\u00F0p\'\u008E\u00B5A\u00B5Is\u00E7\x1B\u00EFCw\u00D2;1V\x05\u00C1\x1B\u00CB]\\:}\u00D5\u00B1\u00C5N\u00A6\u00F3\u009E\u00EE\u00ED\u008C\u00DCL\u00FF\u00F7\u009F\u00FC\u00E6\x04\x00\u00CE=*\u0087W\x0E\u00A9\u0095\u00DB\x00\x00\x00\x00IEND\u00AEB`\u0082';
var bgBinary = '\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x18\x00\x00\x00\x18\b\x06\x00\x00\x00\u00E0w=\u00F8\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x01\x0BIDATH\u0089\u00CD\u0096\u00E1m\u00C20\x10\u0085\u00BF"\u00FE7\x1B\x106\u00C8\x06x\x03\u00D8\u00A0\u008C\x00\x1Bd\u0083\u0096\r\u00D8\u00A0\u008C\u0090n\u00D0\x11\u00D2\r\u00D8\u00E0\u00D0I\x07\u00B2\u00ACs\u0095\u008A\u008B\u00D4\'Y\u00B2\u00CE\u00F6{>\u00FB\u00E5\x1CD$\u0089\u00C8 \u00F1P\u00CE\u00F4\u00A2\x1D`\u00C3<\u00F8R\x011\u00EA#\u00F0\x1D$\u00D3\x01\u00EF\u00DAYfA%\x1F\u00A2\u00F3XD\x13F\x0B\u00E8Q\u009C\u0081=\u00D0x\x13\u0096^\u00F0\x0F\u00B8\x00+\u00E0\u00CD\u0096\u009C#3h\u008D\u00FC\u008E\u00E4MzF`\x04N\u00D6\u00FF\x01>\u00A2\x05\x14\x07`m\u00D9\u00B8\x16\u008Fp\u00D1\u00F8\u00DB\u00E0\u00BF\u00B6\u00A9\u00DAr\u00F7\u00AC\u0080\u00EBm\u0083Z\u00F2\u00B3\u00E6\u009E\u00A9\x02\u00EA\u00F3\u00DE\u0089\u00EB\u00E5n\u00B39\u00F5\u008DdEZ\u00CB6Y\u00EB\u00B3\u00B1.\u008BwNa\x1F\u008A\u00B5\u00E9>P\x13\u00D8\x15\x04\u00A3\u00884\u00D6\u00AE\u0095\u0097\u00A3\u009F*\u00D0VH.\x13\x1E\u00A6T\n\u0094\u00B5\u00A8\u00B13}uNs\u00EB\u00C4\u00BC;k\u00F3@)p\u00B5\n\x19\u0086\u00D9?\u00B4<\u0083\u00C8\u009D?\u00B8f\x7F\u00F4\u00E7\u00FDm\x11I7\x1D\u00C4\u00E2\x1A\u00DFx\u0084\u00C7\x00\x00\x00\x00IEND\u00AEB`\u0082';
var textReverseBinary = '\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x18\x00\x00\x00\x18\b\x06\x00\x00\x00\u00E0w=\u00F8\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x00\u00ABIDATH\u0089\u00D5\u0096\u00E1\t\u0080 \x10\u0085_\u00D1\x00\u008D\u00D0\bm\u00D0(5\u0092#8J#\u00B9\u00C1\u0085p\u0092\u0094\u008A\u00E1\u009D\u00D0\u0083\u00C3\x1F\u00E2\u00FBN\u00EFD\x07"\u0082\u00A6F!\u00EF\x03\u0080I\u00CE\u00F8\x1D4\u00C6B\u00B7\u00EC\u00D3K\x02\u00E0\u00E3\u00C8A\u00A4\x00Y\u0088$ \t\u0099\u00B8\x14\'\u0080M\u00B8\u0099v\bvQ^\u00DAG\u00F4\u009B"\x7FnS\u00C3\u008Bj\u00CCg"r)\u00F3\x1C\u00C0F\u00D9,\u0095\u0090\u0095\u0093z\u00CD\u0095\u00CCkwP\fU\u00F3\x18\u00A0b\x1E\x00\u00B1\u00B9\u00A4N\x0F\u00E8v\u0093U\u008F\u00A8K\u0091\u00BB\u00B4\u00E9\x13\u00E2\u00F8\u00966\x01\u00C2{\x10\u00CB?\u00E0\x0E\u0080\u00E5\u00B1I\u00BA\u00DF\x16\x00\x17\u00D4}\x15Y\u00BBDg\u00AE\x00\x00\x00\x00IEND\u00AEB`\u0082';
var logosBinary = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x18\x00\x00\x00\x18\b\x06\x00\x00\x00\u00E0w=\u00F8\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x02]IDATH\u0089\u00B5\u0096Oh\u00CFq\x18\u00C7_\x1B#\u00FFFF.\u00F3\u00A7\u0090v\u00E0 \x07\u00DBE\x0E\x1C\u00CC.\x1C\x10\u0092rP\u00A3\x15\u00A7qq\x17\u00CD\u00C1a%\x17\x07iEb9\x10\x0E\u00944B\u00B8\u00AC,'\x12m\u00CD\u00CCl\u00B6\u0097><\u00BF|\u00FB\u00FA\u00FE\u00D6oeO=\u00F5\u00EDy\u009E\u00CF\u00E7\u00F9<\u00CF\u00FB\u00FD|>\u00DF*\u0095\u00E9\u0094\u00EA)\u00EC\u00DD\t\u00DC\x07\u00AA\u00A6t\u009ETA\x05\u00DA\u00A4N\u00F8G\x0EW\u00B8\u00E6\u00B7V\x12T\u00AD>\u00F3\u00AF|T\x17\u00FE\u00CF\x04G\u00FDW:*M03\u00D3\u00AD\u008D\u00C0\u00A6\\\x07\u00D7\x00\u00C7S'\u0081\u0097@\x03\u00F0)l\u00F3\u0080\u009E\u00F0\u0095\u00A4\x17xP\x0E\u0083\u00EB\x05'-\u00C9\u00B8:\u00A8~-SQI\u00DE\u00E4+\u00C8\u00D24U\u00F0\x14\x18\x07Z\u0081\u0091\u00B0\u00F7\x03\u00C3@\x170\x1B\u00E8\x06\x06\u0080G\u00E1O\u00AC:\x0B,\x03\u00F6\x02\u00D7&cQg\u009C\u00E4t\u00CE\u009E\u00AA{\x19\x15|Pwd|\u00BBc\u00CD\u00C3J@^\u00A2~Q\u0087\u00D4\u00FA\u008C\u00BD=h\u009A\u00ECO\u00D45\u00EA\x16u\u008E\u00DA\u00A7\u008E\u00A9\x1B\u008A\x12\u00E4\x07\u00ED3p9\x00l\u00CF\u00B4\u00A0\x0F\u00B8\x05\u00CC\x02\u00BE\x06\u00E0\u00F5\u00C0\x11`\x15p\x07xU4gE\u0093\u00BC \u00D3{\u0082%\x07\u0080\x16`,z=\x01\u00DC\u00CD\u00C4\u00D4\x16m^\u0084A*}$\u00FA\\\u009B\u00B1\u00CFU{\u0082M\u00F7\u00D4}\u00EA\u0099\x18\u00C2\u009Eh\u00DF\u00B6J0\u00B8\x1D\u0080\x1D*\b\u00BE\x11\u00BE\u00B4\u00D9M\u00F5R\u00D8\x1B#\u00F1[\u00B5\u00A6\b\u0083\u00B6(\u00A69t\x14X\x1F\u00D4Kz\nX\x1BZ\u00C2\u00A4\x11\x18\n\u00FF\u00AE\u00C0\u00AE!\x060\u00C9\x1E\u00A0\x03\u00A8Is0\x18\x01K\u0081\u00F9e:\u00F9<\u00FC\u00CB\u00CB\u00F6\u00FA\u008F\u00A4\u00D9\u00F9\x00,\u008A\u00EF\x15\u0094\u0099\u00DAVu\u00B3\u00BA?.\u00B7\u009F\u00EA\u00BBL\u00CC\u00B0z,b\x0E\u00AA\u00DF\x0B\u00F69W\u00C2\u00E0\u00AA:\u0090qt\u00E5\u00FA\u00D8\\\u00B0\u00F8d.\u00A6-\u00E3+a\u00B4.\x0B\u00F2\u00DE8e)\u00E0B\fQ\x1E|\x0B\u00C0lQ\u00FB3\u00FE+\u00E5X\u0094\u00A8\u00F7#\x13\u00F8^=\u00A1\u00AET\u00D7\x06}S\u00F2\u00ED\u0091|\u00A7\u00DA\u009Dy\u0088\f\u00A6\u00D5\u0094K\u0090tk\u00CC@^\x12\x0E\u00DF\u00E2J\u00E8UGs\u00FE\u0094\u00E4\u00BC:\u00A3\u0092\x07\u00A7N\u00BDX\x06\u00B8\u00BC\u00A4\u008D\x1F\u00C7\u00BDT\u00F8\u00E0L\u00F6WQ\x17\u00D7C\x13\u00B0\x1AX\x1C3\u0090\u00F8\u00FF\x1Ex\x11w\u00D0\u00EB\u00C9x;\u00BD\u00BF-\u00C0/\u00B5\u00B0\u00BB\u00ABQn_\x17\x00\x00\x00\x00IEND\u00AEB`\u0082";
var formatBinary = '\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x18\x00\x00\x00\x18\b\x06\x00\x00\x00\u00E0w=\u00F8\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x01\x0EIDATH\u0089\u00CDU\u0081\r\u00C2 \x10<\u008D\x03\u00E0\x04e\x047\x107\u00E9\b\u008C\u00E2(u\x02\u00E3\x06\u00ED\x068\u0081u\x02\f\u00C9\u00A3\u00D8\u00D0\u00E7il\u00E2%_\u009A\u0087\u00FF#\x7F<\u00C0{/5\u00EB?\u00B0\u00D2\u00B8M\u00F8\b\u00E1\x004\u00B4\u00F4\x0E@K\u00C2\u00B6\u00C2\u00E4\u0086\u0092?\u00C9\x1A\u00F2\u00FD\u008C\u00A0\u00A5\u00B1#K},$%R\x00\x1E\u00F4\x7F\u00A2\u00F1J\u00E3\x1E\u00C0\u00C8F\x0B\u0084\u008A\u00E2\u00BA\u00C4\u00E7\u00C8W\x14[B\u0090K\u0096#]D`\u0092\u00A3\u00A9\x13\u00BFN\u00FC\u0086\u00CBQ\x129\ny\u00A1c\x1A\u00E1\u00C8W\x16\u009BaW\u00C9.\u00DB\u00CC|\u009B\u00CC\u00AB%%\u008Au\x1E\u00995cIl\u00EE\u0098\u00A6\u009D[\u00C2lg\u00CFi`*\u0092\u0083\u00EB\u00EC9\u0082(\u00DC\x10\u009A\u00B1`\u00C3$\u00E6\x1B\x05q%\u00B7\u00A6\u00E5\u00C4\u00AE\x0E\u00A8\u00DDP.\u00A0\u00A7\u00C5\u009D y\u00B4\u008Eb\u00FA\u00E9\u00DCnR1M\u0097\u00D7\r\u00C0\u00B9B\u00E43]\u008A1\u00C7\u00BB)k\x1E\u009CE\u0090\u00BE\x07\u00FFK\x1048T\u00D6\u00BB\x066\x10\x04q\u008E+\x11\u00A8uK\x04\u00E0\x05:\u00AF\u00D3k\x1C;\x7Fu\x00\x00\x00\x00IEND\u00AEB`\u0082';
var illustrationBinary = '\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x18\x00\x00\x00\x18\b\x06\x00\x00\x00\u00E0w=\u00F8\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x01\x1EIDATH\u0089\u00B5U\u00D1\x11\u00820\f}z\u00FE\u00CB\x06\u00E2\x04:\x02\x1B\u00B0\x02\x1B\u00C8\b\u00B8\x01#8\x02N`\u00DD\u0080\x11\x18\u00A1N\x10\u00AF\\\u00CBU\u00ACM\u00CA\u00C9\u00BB\u00EBW_\u00FB\u0092\u0097\u00B4\u00D9\x10Q\x01\u00C0\u00AC\x18:\x00}`\u00BF\x02\u0090G\u00CE\r \u00A2\u009C\u00884\u00C5\u00D1\x13\x11\x02K1\u00E7\u00D4vT\x01\x1A&\u0083\u0093\u0080\x13\u0086\x17\x15\x17\u008D\u00C1y\u0096\u0085(\x03\u00DF\u00CF\x17\x13\u00CF-5\x01_\u00C0X\u00D52\u00FCt\u00AB\x02\u0085\u00EB\u0099\u00B4\u00B5m\u008Cd\u008B\x1C*&\u00A6}\u0092U\u00B3\u00E8\x0B"\u00EA\x04mk\u00D0\b8\u00CA]\u009C\u00D9\u008B\u00FF\u008D\u00C9"\u0093r\u0099T<\x19\u0094\u00FB*\x1E+\\np\u00DC\n\u008A\u00BA\x14W\u00F7\x17\r+x_\u00BB\u00C6\u0081\u0080l\u008A\u00DF\nx\u0083\u00E5\u00E5~gJ\x04\x1A\u00DBe\\\u00A6\u00DA\u00F2>Z?\u00F4\u00D0B\u00D0\x00j\u0086\x13|\u0080R\x01\u00D8\u00A1sg8\u00E5|x\u00A5\b \u00E1\u00C7\u00CD\u0096\nhA[\x1F\u00FC\x1F7U\x00\u00D6\u00AA\'\u00C3\u00B98\u00AB\u0096\b\x18\u0088\u0087\u00D3R\x01\u00C9\x1C\x1F\u00AD\u00DA\u00D9\'\x1D\u0083\u00FA\u00B1\u00E9\u00A6\u00DFT\u00D0/\x00x\x03\u00B8\u008B\u00F8\u00D5Z\u0086N\x14\x00\x00\x00\x00IEND\u00AEB`\u0082';
var israelShapeBinary = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x18\x00\x00\x00\x18\b\x06\x00\x00\x00\u00E0w=\u00F8\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x00\u00F5IDATH\u0089\u00BDU\u00DB\r\u00C20\f<\x10\u00FFd\x03\x18\u00A1#t\u0084\u008C\u00C0\b\u008C\u00D0\x11:B\u00D9\x00&\u00A0#t\u0084v\x03\u0098\u00C0\u00C8(\u0095\u00A2(\x0F\u00BB\n\u009CT5Jm_\u00ED\u00F8\x1C\x10\u00D1\u00D6\u00C7\x12\u00D1\\\u00F2=@\u008F\u00DEyX\x00'\u00F7\u00BE'\u00A3l\u00F8\u00FB\x10]\u00CE^\x1B|\f\u0082ODdr>\u00BB/\u008B\x1C/\x00Gg\u00BD\x00h\u00DC^\x12{Ep\u00E3\x05g\u00CC\u00A5\u00E0P\x12\u00B4\n\u00DBM\x04\u00F6\u00DF\x04sM\u0082KP\x7F\u00C6\u00B9\x16\x01\x1Fn\x17\u00D9\u00AF\u0096A\u00EF\x14\x1B\"\u00AD^\x1F\x05a]#\u00CA]\u00D1H\u00C4Y\u00CA W\u0086\u00A2\x06 (\x11\u0097\u00E1\u009D\u00F8fj\x100\u0086\u00C8\u00DE\r\u00C0$!\u0090\f\u00B8&R\u00FFV: \u00A5\u00C3\u00CE7Z\u00A4\x1A\u0080Bh\x0Fo-\u00EA\x7F-\u0081\x7F\x0E\u00E3/\br\u00DDT\u0085`%a\u00A82\u00D0\u00DCh|\x1F<\u00D9GC\u00A0\u00C9\u0080\u00FB\u009E\u00FB_\x0E\x00\x1F\u00E8N\u00A1$\u0093\u0096\u00FCj\x00\x00\x00\x00IEND\u00AEB`\u0082";
var gazaShapeBinary = '\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x18\x00\x00\x00\x18\b\x06\x00\x00\x00\u00E0w=\u00F8\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x00\u00F5IDATH\u0089\u00AD\u0095\u00E1\r\u0083 \x10F\u00BFv\u0081\u00BAA\u00BBA\u00E9\x06\u008E\u00D0\x11\u00EC\x06\u008E`7\u00E9(\u008E\u00E0\b\u008E\u00E0\x06\u00D7` \u00A5x\u0087\x1E\u00F0%\u00FC\x11\u00F2\u00DE\x01\x17\x04\x11\u0095\x0ECD\x13\x11\u00DD8N\r\u0081\u0085\u00DB,NVU0\u00D06]-\u0081a\u00E0>}\u00A9\u00A0!\u00A2Y\u0080/n\u00BEH0\np+}\u0096\x1E\u00D1G\u00A8\u00BA\u00AD\u00D1E=\x03\x17[T+\u00E8\u0084\u00CAE\u00B8F\u00D0\n\u00F0M\u00DF\u00E7\b\u008C\u0083\u00A9*?*\u00E0\u00E0\u00C93\u00D7\b\u009A\u00E0\x19P\x1D\u00CB\x11\x01\x07\u00A7\u00B8\u00C7s\x05\x12|\u00D6\u00C2\u00ED8\u00E3?\r\u0080\x11\u00C0\x1D\u00DB\u00CC\u00CC\u00B7\u00DD\u0084\u0082\x14\u00DC\u00CF\x17\t\u00BA\x04\x1C;sbN\u00EBE\u00FC*\u009C\x00\\S\u00EB\u00B5\u0082p\x07\x0B\u0080>\u00B1\u00F6\u00AD\u0085#\u00DAA(\u00BAD\u00DF\x1Enw\u00EA\u00C4]\x04w\u00D1a^\u00B9\u00F05\u0089W\u00D3\u00FET\x0E?\t\u00D2\u00E0\u008E\u00C8\u00B7\u00AB\u00C9\u00AE\u00DA\x07\u00C0\x17\u00AD\x7F\u00DF\u00E8g\u00DD\u009By\x00\x00\x00\x00IEND\u00AEB`\u0082';
var ILMapPhotoBinary = '\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x18\x00\x00\x00\x18\b\x06\x00\x00\x00\u00E0w=\u00F8\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x00LIDATH\u0089c\u00FC\u00FF\u00FF?\x03-\x01\x13MM\x1F\u00B5\u0080\x1C\x0B\x1A\x18\x18\x18\u00FE\u00A3a\x07"\u00E4\u0088\u00B6\u0080\u00EA`\u00D4\u0082Q\x0BF-```\u00A1P\x7F\x02\u0096\u00DC|\x00\u008A\u00A9bA<\x0Eq\u00B8\x05C?\u0092G\u00AB\u00CC\u00E1n\x01\x03\x03\x03\x00\x15\\\x12\u00E4A\u00B92J\x00\x00\x00\x00IEND\u00AEB`\u0082';
var GAMapPhotoBinary = '\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x18\x00\x00\x00\x18\b\x06\x00\x00\x00\u00E0w=\u00F8\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x01\tIDATH\u0089\u00EDUQ\r\u0083@\f\u00ED\u0096\u00FD\x0F\x07L\x02\x12\u0090\u0080\x04$ \u00819@\x02\x12\u0090p\x12n\x0E\u0098\x03\u00A6\u00E0-\u0097\x14\u00D25\u00BD\x0Bd\u00E3g\u00A1\t\t4\u00EF\u00DA\u00BE\u00BE\u00F68\x01\u00A0=\u00ED\u00BCk\u00F4#\u00C1\x1A\u00BB\x18\u0098\u0082\u00882~w_g\bS\x04 \x03\u00D0\u00C36\x07\u00A0`\u009C|n\x06\u00DAk\u00DC\x1C|\u008C\x04\u009Fm\u00E2\u0080\u00F2p\x13\u00C1~\u00E0\u0082\x065\x11\u00E5\u008A\u00D8K}_\u0089\u00A8U\u00BE:\u00D2\u0094J\u00B7\u00C8\u00A9\n:f\u00E5\x13\u00F4\u008B\x04\u00DBQ2\u00B0D\x1EX\u00E4&!\u009D\u00AE\u00FE)\u00BA\u0090\u00F3\u00A0\u00F8\x18\u0083\x12@\x1B\u00A9n\u00AELk\u00A6\u00F5\u00E8\u00A4\x06[\u00ADT\u009A=\u0098\u00B5\u00A9C,A\u0098\u00FF\u00FB\u00CA\u00F6\u0084v\u00F6\u00CA\u0097/I""\x13\u00B7J\u009Ac\u00FF\u0094\x10XZ?\u00EF\u00815\u00CF\u00DE\b\x14\x12W+\u0083\u0083\u00CF/\u008B\u00A6G\u00D2\x02\u0087\x05\x1A\u0094\u00DF\t\u00E13\u00E3\\\u00BD\u00E5\u00AA\u00B0\x02\u00B4j\u00BBu\u00A1\u0083\u00F5G\u00FB\u00E9ew\u00FC2\u00FF=\x01\x11\u00BD\x01U~\u00D8\u00CC\x1D5 \u00CA\x00\x00\x00\x00IEND\u00AEB`\u0082';
var popBinary = '\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x18\x00\x00\x00\x18\b\x06\x00\x00\x00\u00E0w=\u00F8\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x00\u00D7IDATH\u0089\u00B5\u0095\u00D1\x11\u00820\f\u0086?=\u00DFe\x146\u00B0\u008E\u00E4\x06\u008C\u00E0H\u00B8AG\u00C1\t\u00E2\x15\u00DB;\u00E4R,m\u00F8\u00EF\u00F2@\u00DA~?\t\x01N"B\u0085z\u00E0Yp\u00CC_j\u00E8@\x07\u00DCJ6\u00D6\x1Ax\u00E0\u00AE\u00E4Ce\x03pM\u0089\u00DA\x16i\n\u00F0q\t\x07^\u00E7\x03\u00E0o\u00E0\u0091\x16j[\u00B4\x05w\u00F1\x19\u00CDj\u00AD@\u0083\u00FB\u00E5\u0086\x16\u0083\u00BF\u00F0\x16\u0083"x\u00ADA1|V\x18\u00D3\x1D\u00D1\u008B\u00C8$_M\u00F1Z;\u00DF\u0089\u0088\x0B\u00EBG\u00C0\x7F\u00E2Px2\u00E8c9\u009D5<\x19\u008C\u00F1\u00B0\u00B3\u0086\u0087\u00D8\u009A\u00A2}\u00D3\u0092Q\u00CE\u00C0\x04N\u00C6\u00C0\f\u00AE\x19\u0098\u00C2\u00D7\x06\u00E6\u00F0Y\u008B)\u0092\u0096i\u00C9\u0085\u00F6?\x18\u00E2\u00F7\u00DC\u00AD\u00F2\u00A1\u009A\u00C9\u00A2\u0082\u009C\u00B4\u00F7\u00A4\u00A8\u0082\u00D2>\u00EF\u00BF{\u00E0\x03\x07\u00DBG\u00B9q4\f\u00D0\x00\x00\x00\x00IEND\u00AEB`\u0082';
var frameBinary = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x18\x00\x00\x00\x18\b\x06\x00\x00\x00\u00E0w=\u00F8\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x00\u008DIDATH\u0089c\u00FC\u00FF\u00FF?\x03-\x01\x13MMg```! \u00DF@\u00A9\x05\u0084\u0082\u0088\u00E2\u00F0#\u00E4\u0083F2\u00CDU```\u0088g \u00C2\x07\u00E4\x02\x07\x06\x06\u0086\u00FD\f\u00F4\u0088\u00E4Q\x0B\b\x02ZE\u00B2\x00\x03\x03\u0083\x01\x03\r-\u0080\x03\u00BA\x14\x15\x0EP\u00F6\x05\x06\x06\u0086\x0F\u00D4\u00B6\x00\x14D\u00B00rd``8@m\x0BF\u00F3\u00C1\u00C0[\u0080\x1C\u00C9\x0B\x19\x18\x18\x1E\u0090i\x0E\u00CE\u008A\t\u00D9\x02J\x00#.\u00BD,\x14T*D\u0081!^T000\x00\x00\x1D\u009F'T\x1DC\u00D4<\x00\x00\x00\x00IEND\u00AEB`\u0082";
var folderBinary = '\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x18\x00\x00\x00\x18\b\x06\x00\x00\x00\u00E0w=\u00F8\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x00\u00D2IDATH\u0089\u00ED\u0095\u00DD\r\u00C20\f\u0084\u00BFV\fP&`\x04V(\x1B0BVb\x13Fh7\u0080\r\u00C2\x06e\x02#W\tDyhJ\u00E5\u00F0\u00C4IV\u00FBP\u009D}\u00E7\u009F6"BM\u00B4U\u00D9\x7F\u0095\u00C0\x01\x13 \u0085p[\x12h\x0F<pX\u00F9\u00FD%\x14S\u00C2\x10\x02\u00A4\x1E\u009C\x0E\u00D0.\u00A9\u00E4\t\\\x01\u00BF\u00C5\u008A%\u008B\u00E2\u009C\u009E\u00DE\u00B2\f\u0091\u008Ei$\u00EF\u0083\u008AR\u00D3K\u00A1\x1C.U\u00D0\u0084\u00E7\r8\x1Ai\x18\u00F3E\u00EB\f\u00C9g\u00BE<AoH\u00AE\x18\u00AA\'\u00C8{`\u00E9\u00BFb\u009F*\u00B0\u00F6\u00FF\u00AE[\u009F&8\x1B\u0092\x13\u00C7>M`\u00EE?\u00D9&?\u00BE8zk0\u00EFU\u00AA\u00C0\u0092|\u008C/m\u00A8\u00DC\x1A\u009F\u009B\x16\u00CE\u00EAdx\u00B4\u00BD\u0088t\u00EA\u00BC\u00C6\u00FF\u00A7\u00BF\f\u00E0\x05\u00BB\u00A4\x03\u00F3\u00D1~\x02\u00D0\x00\x00\x00\x00IEND\u00AEB`\u0082';
var helpBinary = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x10\x00\x00\x00\x10\b\x06\x00\x00\x00\x1F\u00F3\u00FFa\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x00\u00ACIDAT8\u008D\u00A5\u0091a\r\u00C3 \x14\u0084\u00AFSP\x07\u00AD\x04$LB%TJ\u00E7`\x12\u0090\u00B09\u0098\x04$ \u0081)\u00B8\u0085\u00E55\u00A1/\u00F4\u0095\u00AD\u0097\u00BC\x1F\u0085\u00BB\u008F\u0083\u0082\u00A4\u009E\u0091\u00A4'\u0099\u00B8\u00D5\u0083\u00E4U\u00FBux\u00E6\u00B1&\x0B\x10\x1B\x00\u00D1\x028\u00A9\u009E\u00A4\u00CD(k\x1A\u00BC\x0BX!\u00AE\u00F8\u00EEI\u0086_\x00z\u00BC\n\u00FBV@>\u00F9\u00A5\u00C2A\u00D6\u009B\x00\u00F7\u00CAo\u00EC\u00B5\u00CF\x02$\u00EB\u00E4u.\u00D8W(v<\u0080TsZ\u0080\x1Cz\x03x*\u00D8F\u00DD\u00F7\x1E'd5p\x00\u00A2\u00CC\u00FCO\u0083\x1C\x1CJo\u00CDd5h\u0092\x05X\u00E4\x11\u00B3nU\x07\u0080\x0F\u00AE|\u00F2\u00F6\x1C\u008E\u00B6\u00DF\x00\x00\x00\x00IEND\u00AEB`\u0082";
var quoteBinary = '\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x10\x00\x00\x00\x10\b\x06\x00\x00\x00\x1F\u00F3\u00FFa\x00\x00\x00\tpHYs\x00\x00\x0B\x12\x00\x00\x0B\x12\x01\u00D2\u00DD~\u00FC\x00\x00\x00xIDAT8\u008Dc\u00FC\u00FF\u00FF?\x03%\u0080\u0089"\u00DD\f\f\f,\f\f\f\x07\u00F0\u00C8;@i\u009Cj@^\u00C0\u00E7\x07F(\u008DS\r\u00C5^\x185\x00\x12\u008D\u008EH\u00FC\r\f\f\f\u00FCP\u00F6C$q\u00DCj@\u00B1\b\u00C5\t\u00FFQA\x02\u0092\x1CN5\u00C8\u0092\x0F\u0090$\x1E`\u00D1\u008CU\rE\u00B6\u0083\u00C4Aa\x00\x02\u00A0${\x10\u00CA\u00FE\u00C0\u00C0\u00C0\u00B0\x00Kx\x19`S3\u00C0\u00B9\u0091\u0081\u0081\x01\x00\b\u00F8\u00BB\u0088y\u00F5\x0B\u00D9\x00\x00\x00\x00IEND\u00AEB`\u0082';
var createQAUI = function (tpanel) {
    var quickActionsTab = tpanel.add('tab', undefined, ['Quick Actions']);
    var QABtnsGrp = quickActionsTab.add('group');
    QABtnsGrp.orientation = 'column';
    QABtnsGrp.alignChildren = 'left';
    var QABtnsRowOne = QABtnsGrp.add('group');
    var tvaiBtn = QABtnsRowOne.add('iconbutton', undefined, tvaiBinary, {
        style: 'toolbutton'
    });
    tvaiBtn.helpTip = 'Tunnel Illustration';
    var scaleBtn = QABtnsRowOne.add('iconbutton', undefined, popBinary, {
        style: 'toolbutton'
    });
    scaleBtn.helpTip = 'Pop Animation';
    var logosBtn = QABtnsRowOne.add('iconbutton', undefined, logosBinary, {
        style: 'toolbutton'
    });
    logosBtn.helpTip = 'Import IDF and Dotz Logos';
    var illustrationBtn = QABtnsRowOne.add('iconbutton', undefined, illustrationBinary, { style: 'toolbutton' });
    illustrationBtn.helpTip = 'Illustration Text';
    var QABtnsRowTwo = QABtnsGrp.add('group');
    var formatLayerBtn = QABtnsRowTwo.add('iconbutton', undefined, formatBinary, { style: 'toolbutton' });
    formatLayerBtn.helpTip = 'Format Layer Name';
    var textReverseBtn = QABtnsRowTwo.add('iconbutton', undefined, textReverseBinary, { style: 'toolbutton' });
    textReverseBtn.helpTip = 'Reverse Text';
    var bgBtn = QABtnsRowTwo.add('iconbutton', undefined, bgBinary, {
        style: 'toolbutton'
    });
    bgBtn.helpTip = 'Create Background';
    var IsraelMapShapeBtn = QABtnsRowTwo.add('iconbutton', undefined, israelShapeBinary, { style: 'toolbutton' });
    IsraelMapShapeBtn.helpTip = 'Israel Map Shape';
    var QABtnsRowThree = QABtnsGrp.add('group');
    var GazaMapShapeBtn = QABtnsRowThree.add('iconbutton', undefined, gazaShapeBinary, { style: 'toolbutton' });
    GazaMapShapeBtn.helpTip = 'Gaza Map Shape';
    var numCountBtn = QABtnsRowThree.add('iconbutton', undefined, countingNumbersBinary, { style: 'toolbutton' });
    numCountBtn.helpTip = 'Counting Numbers';
    var frameBtn = QABtnsRowThree.add('iconbutton', undefined, frameBinary, {
        style: 'toolbutton'
    });
    frameBtn.helpTip = 'Animated Frame';
    var israelMapPic = QABtnsRowThree.add('iconbutton', undefined, ILMapPhotoBinary, { style: 'toolbutton' });
    israelMapPic.helpTip =
        'Israel Map Photo\n\nCLICK: Clean Map\nCTRL + CLICK: Map With Labels';
    var QABtnsRowFour = QABtnsGrp.add('group');
    var gazaMapPic = QABtnsRowFour.add('iconbutton', undefined, GAMapPhotoBinary, { style: 'toolbutton' });
    gazaMapPic.helpTip =
        'Gaza Map Photo\n\nCLICK: Clean Map\nCTRL + CLICK: Map With Labels';
    var openFinderBtn = QABtnsRowFour.add('iconbutton', undefined, folderBinary, { style: 'toolbutton' });
    openFinderBtn.helpTip = "Open Project Folder in ".concat(getOS() === 'Win' ? 'Explorer' : 'Finder', "\n\nClick: Open Project Folder\nCTRL + CLICK: Choose New Project Folder");
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
    frameBtn.onClick = createAnimatedFrame;
    openFinderBtn.onClick = openProjectInFinder;
    israelMapPic.onClick = importIsraelGoogleMaps;
    gazaMapPic.onClick = importGazaGoogleMaps;
    return quickActionsTab;
};
var createIconsUI = function (tpanel) {
    var iconsTab = tpanel.add('tab', undefined, ['Icons']);
    var iconsGrp = iconsTab.add('group');
    iconsGrp.orientation = 'column';
    iconsGrp.alignChildren = 'left';
    var iconDDGrp = iconsGrp.add('group');
    iconDDGrp.add('statictext', undefined, 'Icon:');
    var iconsList = [
        'Boom',
        'Tunnel',
        'Terror Tunnel',
        'Target',
        'Sniper Target',
        'House Bombing',
        'Fire'
    ];
    var iconDD = iconDDGrp.add('dropdownlist', undefined, iconsList);
    iconDD.preferredSize[0] = 100;
    iconDD.selection = 0;
    var IconsBtnsGrp = iconsGrp.add('group');
    IconsBtnsGrp.alignChildren = 'left';
    var iconsChecksGrp = iconsGrp.add('group');
    var circleCheck = iconsChecksGrp.add('checkbox', undefined, 'Circle');
    var scaleCheck = iconsChecksGrp.add('checkbox', undefined, 'Scale');
    var circleColorGrp = iconsGrp.add('group');
    circleColorGrp.add('statictext', undefined, 'Circle Color:');
    var circleColorDD = circleColorGrp.add('dropdownlist', undefined, [
        'White',
        'Black',
        'Red'
    ]);
    var iconColorGrp = iconsGrp.add('group');
    iconColorGrp.add('statictext', undefined, 'Icon Color:');
    var iconColorDD = iconColorGrp.add('dropdownlist', undefined, [
        'Black',
        'White',
        'Red'
    ]);
    circleColorDD.selection = iconColorDD.selection = 0;
    var iconCreateBtn = iconsGrp.add('button', undefined, 'Create Icon');
    iconCreateBtn.preferredSize[0] = 100;
    iconCreateBtn.onClick = function () {
        var id = iconDD.selection.toString();
        createIconFromId(id, circleColorDD.selection.toString(), iconColorDD.selection.toString(), circleCheck.value, scaleCheck.value);
    };
    return iconsTab;
};
var createLocationsUI = function (tpanel) {
    var locationsTab = tpanel.add('tab', undefined, ['Locations']);
    var locationsGrp = locationsTab.add('group');
    locationsGrp.orientation = 'column';
    locationsGrp.alignChildren = 'left';
    var locationsDDGrp = locationsGrp.add('group');
    locationsDDGrp.add('statictext', undefined, 'Location:');
    var locationsList = [
        'Kindergarden',
        'Medical Clinic',
        'Sports',
        'University'
    ];
    var locationsDD = locationsDDGrp.add('dropdownlist', undefined, locationsList);
    locationsDD.preferredSize[0] = 100;
    locationsDD.selection = 0;
    var langDDGrp = locationsGrp.add('group');
    langDDGrp.add('statictext', undefined, 'Language:');
    var langDD = langDDGrp.add('dropdownlist', undefined, [
        'Hebrew',
        'English',
        'Arabic'
    ]);
    langDD.preferredSize[0] = 100;
    langDD.selection = 0;
    var locationsCreateBtn = locationsGrp.add('button', undefined, 'Create Location');
    locationsCreateBtn.preferredSize[0] = 100;
    locationsCreateBtn.onClick = function () {
        var id = locationsDD.selection.toString();
        var lang = langDD.selection.toString();
        createLocationFromId(id, lang);
    };
    return locationsTab;
};
var createTexturesUI = function (tpanel) {
    var texturesTab = tpanel.add('tab', undefined, ['Textures']);
    var texturesGrp = texturesTab.add('group');
    texturesGrp.orientation = 'column';
    texturesGrp.alignChildren = 'left';
    var texturesDDGrp = texturesGrp.add('group');
    texturesDDGrp.add('statictext', undefined, 'Texture:');
    var texturesList = [
        'Paper Dark',
        'Paper Medium',
        'Paper Light',
        'Smoke',
        'Noise',
        'Dust'
    ];
    var texturesDD = texturesDDGrp.add('dropdownlist', undefined, texturesList);
    texturesDD.preferredSize[0] = 100;
    texturesDD.selection = 0;
    var textureChecksGrp = texturesGrp.add('group');
    var textureLoopCheck = textureChecksGrp.add('checkbox', undefined, 'Loop');
    var textureFitCheck = textureChecksGrp.add('checkbox', undefined, 'Fit To Comp');
    textureLoopCheck.onClick = function () {
        textureFitCheck.enabled = !textureLoopCheck.value;
        textureFitCheck.value = false;
    };
    var texturesCreateBtn = texturesGrp.add('button', undefined, 'Import Texture');
    texturesCreateBtn.preferredSize[0] = 100;
    texturesCreateBtn.onClick = function () {
        var id = texturesDD.selection.toString();
        var loop = textureLoopCheck.value;
        var fit = textureFitCheck.value;
        createTexture(id, loop, fit);
    };
    return texturesTab;
};
var init = function (thisObj) {
    var w = thisObj instanceof Panel
        ? thisObj
        : new Window('palette', 'Operative Utils', undefined, {
            resizeable: true
        });
    if (w == null)
        w;
    w = w;
    var tpanel = w.add('tabbedpanel');
    tpanel.alignment = tpanel.alignChildren = ['fill', 'fill'];
    var qaTab = createQAUI(tpanel);
    var iconsTab = createIconsUI(tpanel);
    var locTab = createLocationsUI(tpanel);
    var texTab = createTexturesUI(tpanel);
    var extraBtnsQA = qaTab.add('group');
    var extraBtnsIcons = iconsTab.add('group');
    var extraBtnsLocations = locTab.add('group');
    var extraBtnsTextures = texTab.add('group');
    extraBtnsQA.spacing =
        extraBtnsIcons.spacing =
            extraBtnsLocations.spacing =
                extraBtnsTextures.spacing =
                    2;
    extraBtnsQA.alignment =
        extraBtnsQA.alignChildren =
            extraBtnsIcons.alignment =
                extraBtnsIcons.alignChildren =
                    extraBtnsLocations.alignment =
                        extraBtnsLocations.alignChildren =
                            extraBtnsTextures.alignment =
                                extraBtnsTextures.alignChildren =
                                    ['fill', 'fill'];
    var quoteBtnQA = extraBtnsQA.add('iconbutton', undefined, quoteBinary, {
        style: 'toolbutton'
    });
    var helpBtnQA = extraBtnsQA.add('iconbutton', undefined, helpBinary, {
        style: 'toolbutton'
    });
    var quoteBtnIcons = extraBtnsIcons.add('iconbutton', undefined, quoteBinary, {
        style: 'toolbutton'
    });
    var helpBtnIcons = extraBtnsIcons.add('iconbutton', undefined, helpBinary, {
        style: 'toolbutton'
    });
    var quoteBtnLocations = extraBtnsLocations.add('iconbutton', undefined, quoteBinary, { style: 'toolbutton' });
    var helpBtnLocations = extraBtnsLocations.add('iconbutton', undefined, helpBinary, { style: 'toolbutton' });
    var quoteBtnTextures = extraBtnsTextures.add('iconbutton', undefined, quoteBinary, { style: 'toolbutton' });
    var helpBtnTextures = extraBtnsTextures.add('iconbutton', undefined, helpBinary, { style: 'toolbutton' });
    qaTab.alignment = qaTab.alignChildren = ['fill', 'fill'];
    helpBtnQA.alignment =
        helpBtnIcons.alignment =
            helpBtnLocations.alignment =
                helpBtnTextures.alignment =
                    quoteBtnQA.alignment =
                        quoteBtnIcons.alignment =
                            quoteBtnLocations.alignment =
                                quoteBtnTextures.alignment =
                                    ['right', 'bottom'];
    helpBtnQA.onClick =
        helpBtnIcons.onClick =
            helpBtnLocations.onClick =
                helpBtnTextures.onClick =
                    createHelpWindow;
    quoteBtnQA.onClick =
        quoteBtnIcons.onClick =
            quoteBtnLocations.onClick =
                quoteBtnTextures.onClick =
                    generateCaspiQuote;
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
    setUpPrefs();
    init(thisObj);
})(this);