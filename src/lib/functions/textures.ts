const loopTexture = (comp: CompItem, layer: Layer): void => {
    const posProp = layer
        .property('ADBE Transform Group')
        .property('ADBE Position') as Property<[number, number]>;
    const scaleProp = layer
        .property('ADBE Transform Group')
        .property('ADBE Scale') as Property<[number, number]>;
    const rotProp = layer
        .property('ADBE Transform Group')
        .property('ADBE Rotate Z') as Property<number>;

    posProp.setValueAtTime(0, [960, 540]);
    scaleProp.setValueAtTime(0, [100, 100]);
    rotProp.setValueAtTime(0, 0);

    posProp.setValueAtTime((1 / comp.frameRate) * 10, [840, 804]);
    scaleProp.setValueAtTime((1 / comp.frameRate) * 10, [100, 100]);
    rotProp.setValueAtTime((1 / comp.frameRate) * 10, 50);

    posProp.setValueAtTime((1 / comp.frameRate) * 20, [1284, 913]);
    scaleProp.setValueAtTime((1 / comp.frameRate) * 20, [116, 116]);
    rotProp.setValueAtTime((1 / comp.frameRate) * 20, -35);

    posProp.setValueAtTime((1 / comp.frameRate) * 30, [960, 540]);
    scaleProp.setValueAtTime((1 / comp.frameRate) * 30, [100, 100]);
    rotProp.setValueAtTime((1 / comp.frameRate) * 30, 0);

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

const getPathFromTextureID = (id: TextureID): string => {
    return `${getAssetsPath()}/Textures/${id.replace(/ /g, '_')}.jpg`;
};

const getCommandId = (
    { width: compW, height: compH }: CompItem,
    { width: texW, height: texH }: AVItem
): 2732 | 2733 => {
    if (texW >= texH && compW >= compH) return 2732;
    if (texH >= texW && compW >= compH) return 2732;
    if (texW >= texH && compH >= compW) return 2733;
    if (texH >= texW && compH >= compW) return 2732;
    return 2732;
};

const createTexture = (id: TextureID, loop: Boolean, fit: Boolean) => {
    app.beginUndoGroup(`@@name: Import Texture - ${id}`);

    const path = getPathFromTextureID(id);
    const textureItem = specialImport(
        path,
        // @ts-ignore
        `caspion-${id.replace(' ', '-').toLowerCase()}`
    );

    const comp = app.project.activeItem as CompItem;
    if (!comp || !(comp instanceof CompItem)) return;

    const textureLayer = comp.layers.add(textureItem);
    textureLayer.label = parsePrefs().texLabelRandom
        ? Math.floor(Math.random() * 16) + 1
        : parsePrefs().texLabelIndex + 1;

    if (loop) loopTexture(comp, textureLayer);

    if (fit) {
        const commandId = getCommandId(comp, textureItem);
        textureLayer.selected = true;
        app.executeCommand(commandId);
    }

    app.endUndoGroup();
};
