function getPathData(layerIndex) {
    var layer = app.project.activeItem.layer(layerIndex);
    var pathVal = layer
        .property('ADBE Root Vectors Group')
        .property('ADBE Vector Group')
        .property('ADBE Vectors Group')
        .property('ADBE Vector Shape - Group')
        .property('ADBE Vector Shape').value;

    for (var i = 0; i <= pathVal.vertices.length; i++) {
        var curVert = pathVal.vertices[i];
        var curIn = pathVal.inTangents[i];
        var curOut = pathVal.outTangents[i];

        $.writeln(curVert);
        $.writeln(curIn);
        $.writeln(curOut);
    }

    return [curVert, curIn, curOut]
}
