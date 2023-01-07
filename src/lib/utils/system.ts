const getOS = (): OS => {
    if ($.os.indexOf('Win') != -1) return 'Win';
    return 'Mac';
};

const getAssetsPath = (): string => {
    const nameNoSpaces = '@@name'.replace(/\s+/g, '');
    return (
        $.fileName.toString().replace(`${nameNoSpaces}_v@@version.jsx`, '') +
        `${nameNoSpaces}_v@@version Assets`
    );
};

const openFs = (path: string): void => {
    const folder = Folder(path);
    const cmd =
        getOS() === 'Win'
            ? 'explorer ' + Folder.decode(folder.fsName)
            : // @ts-ignore
              'open "' + Folder.execute(folder.fsName) + '"';
    system.callSystem(cmd);
};

const createFolder = (folderObj: Folder): Folder => {
    if (!folderObj.exists) folderObj.create();
    return folderObj;
};

const readPrefs = (): string => {
    const docsFolder = File(Folder.myDocuments.toString()).toString();
    const file = File(docsFolder + '/@@name/Prefs/Prefs.json');
    file.open('r');
    const stringData: string = file.read();
    file.close();

    return stringData;
};

const parsePrefs = (): Prefs => {
    const stringData = readPrefs();
    const parsedData = JSON.parse(stringData);
    return parsedData;
};

const setUpPrefs = (): void => {
    const docsFolder = File(Folder.myDocuments.toString()).toString();
    createFolder(Folder(docsFolder + '/@@name'));
    createFolder(Folder(docsFolder + '/@@name/Prefs'));
    const myJSON = File(docsFolder + '/@@name/Prefs/Prefs.json');

    const boilerplatePrefs: Prefs = {
        version: '@@version',
        iconsLabelIndex: 5,
        locsLabelIndex: 13,
        texLabelIndex: 2,
        showHelpTips: true
    };

    if (myJSON.exists) {
        const parsedPrefs = parsePrefs();
        parsedPrefs.version = '@@version';
        myJSON.open('w');
        myJSON.write(
            JSON.stringify({ ...boilerplatePrefs, ...parsedPrefs }, null, 2)
        );
        myJSON.close();
    } else {
        myJSON.open('w');
        myJSON.write(JSON.stringify(boilerplatePrefs, null, 2));
        myJSON.close();
    }
};

const writePrefsToMemory = (prefs: Prefs) => {
    const docsFolder = File(Folder.myDocuments.toString()).toString();
    createFolder(Folder(docsFolder + '/@@name'));
    createFolder(Folder(docsFolder + '/@@name/Prefs'));
    const myJSON = File(docsFolder + '/@@name/Prefs/Prefs.json');
    const parsedPrefs = parsePrefs();
    myJSON.open('w');
    myJSON.write(JSON.stringify({ ...parsedPrefs, ...prefs }, null, 2));
    myJSON.close();
    return myJSON;
};

const writeBinaryImageDataToFile = (binary: string, path: string): File => {
    const file = File(path);
    file.open('w');
    file.encoding = 'BINARY';
    file.write(binary);
    file.close();

    return file;
};
