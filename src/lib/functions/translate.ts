const grabFontFromSelectedLayer = (): string => {
    const comp = app.project.activeItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert('No Composition Selected');
        return;
    }

    if (
        comp.selectedLayers.length !== 1 ||
        !(comp.selectedLayers[0] instanceof TextLayer)
    ) {
        alert('Please Select a Text Layer');
        return;
    }

    const srcText = comp.selectedLayers[0]
        .property('ADBE Text Properties')
        .property('ADBE Text Document') as Property<any>;
    const srcTextObj = srcText.value as TextDocument;

    return srcTextObj.font.toString();
};

const findAndReplaceTextInComp = (
    comp: CompItem,
    fromTextArr: string[],
    toTextArr: string[],
    font: string
) => {
    if (comp.numLayers > 0) {
        for (let t = 0; t < fromTextArr.length; t++) {
            const fromText = fromTextArr[t];
            const toText = toTextArr[t];

            for (let i = 1; i <= comp.numLayers; i++) {
                const curLayer = comp.layer(i);
                if (curLayer instanceof TextLayer) {
                    const srcText = curLayer
                        .property('ADBE Text Properties')
                        .property('ADBE Text Document') as Property<any>;
                    const srcTextValue = srcText.value.toString();
                    // srcTextValue = srcTextValue.toLowerCase();
                    // fromText = fromText.toLowerCase();
                    srcText.setValue(srcTextValue.replaceAll(fromText, toText));

                    if (font) {
                        const textDoc = srcText.value;
                        textDoc.font = font;
                        srcText.setValue(textDoc);
                    }
                }
            }
        }
    }
};

const getAllPrecompsOfComp = (comp: CompItem) => {
    const allPrecomps = [];

    const getPrecompsOnLevel = (comp: CompItem) => {
        for (let i = 1; i <= comp.numLayers; i++) {
            const curLayer = comp.layer(i) as AVLayer;
            if (curLayer.source instanceof CompItem) {
                allPrecomps.push(curLayer.source);
                getPrecompsOnLevel(curLayer.source);
            }
        }
    };

    getPrecompsOnLevel(comp);

    return allPrecomps;
};

const findAndReplaceText = (
    fromTextArr: string[],
    toTextArr: string[],
    font: string,
    deepSearch: boolean
) => {
    const comp = app.project.activeItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert('No Composition Selected');
        return;
    }

    findAndReplaceTextInComp(comp, fromTextArr, toTextArr, font);

    if (deepSearch) {
        const allPrecomps = getAllPrecompsOfComp(comp);
        for (let i = 0; i < allPrecomps.length; i++) {
            findAndReplaceTextInComp(
                allPrecomps[i],
                fromTextArr,
                toTextArr,
                font
            );
        }
    }
};

const readJSON = (file: File): object => {
    file.open('r');
    let data = file.read();
    file.close();
    data = JSON.parse(data);
    return data as any as object;
};

const exportJson = (fromTextArr: string[], toTextArr: string[]) => {
    // convert arrays to object
    const obj = {};

    fromTextArr.forEach((element, index) => {
        obj[element] = toTextArr[index];
    });

    // stringify
    const stringified = JSON.stringify(obj, null, 2);

    // open dialog

    const savedFile = File.saveDialog('Save File...', '*.json');
    if (!savedFile) return;

    // write to selected folder
    const transJsonFile = new File(savedFile.fsName);
    transJsonFile.encoding = 'UTF-8';
    transJsonFile.open('w');
    transJsonFile.write(stringified);
    transJsonFile.close();
};

const importJson = (): {
    fromTextArr: string[];
    toTextArr: string[];
} => {
    // open dialog
    const openedFile = File.openDialog('Open File...', '*.json', false);
    if (!openedFile) return;

    const read = readJSON(openedFile);

    const fromTextArr = [];
    const toTextArr = [];

    for (let i in read) {
        fromTextArr.push(i);
        toTextArr.push(read[i]);
    }

    return { fromTextArr, toTextArr };
};

const removeDups = (arr: any[]) =>
    arr.filter((value, index) => arr.indexOf(value) === index);

const readAllTextInComp = (comp: CompItem): string[] => {
    const fromTextArr: string[] = [];

    if (comp.numLayers > 0) {
        for (let i = 1; i <= comp.numLayers; i++) {
            const curLayer = comp.layer(i);
            if (curLayer instanceof TextLayer) {
                const srcText = curLayer
                    .property('ADBE Text Properties')
                    .property('ADBE Text Document') as Property<any>;
                const srcTextValue = srcText.value as TextDocument;

                fromTextArr.push(srcTextValue.text.toString());
            }
        }
    }

    return fromTextArr;
};

const readAllTextInActiveComp = (deepSearch: boolean): string[] => {
    const comp = app.project.activeItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert('No Composition Selected');
        return;
    }

    const fromTextArr: string[] = [];

    const read = readAllTextInComp(comp);
    read.forEach(r => fromTextArr.push(r));

    if (deepSearch) {
        const allPrecomps = getAllPrecompsOfComp(comp);
        for (let i = 0; i < allPrecomps.length; i++) {
            const read = readAllTextInComp(allPrecomps[i]);
            read.forEach(r => fromTextArr.push(r));
        }
    }

    const noDups = removeDups(fromTextArr);
    return noDups;
};
