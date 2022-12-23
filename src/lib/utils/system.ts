const getOS = (): OS => {
    if ($.os.indexOf('Win') != -1) return 'Win';
    return 'Mac';
};

const getAssetsPathFromOS = (os: OS = getOS()) => {
    if (os === 'Win') {
        return `${File(
            '.'
        )}/Scripts/ScriptUI Panels/@@nospacename_v@@version Assets`;
    } else if (os === 'Mac') {
        return `/Applications/Adobe After Effects 20${app.version.substring(
            0,
            2
        )}/Scripts/ScriptUI Panels`;
    }
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
    const appDataFolder = File(Folder.appData.toString()).toString();
    const file = File(appDataFolder + '/@@name/Prefs/Prefs.json');
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
    const appDataFolder = File(Folder.appData.toString()).toString();
    createFolder(Folder(appDataFolder + '/@@name'));
    createFolder(Folder(appDataFolder + '/@@name/Prefs'));
    const myJSON = File(appDataFolder + '/@@name/Prefs/Prefs.json');
    if (myJSON.exists) {
        const parsedPrefs = parsePrefs();
        parsedPrefs.version = '@@version';
        myJSON.open('w');
        myJSON.write(JSON.stringify(parsedPrefs, null, 2));
        myJSON.close();
    } else {
        myJSON.open('w');
        myJSON.write(JSON.stringify({ version: '@@version' }, null, 2));
        myJSON.close();
    }
};

const writePrefsToMemory = (prefs: Prefs) => {
    const appDataFolder = File(Folder.appData.toString()).toString();
    createFolder(Folder(appDataFolder + '/@@name'));
    createFolder(Folder(appDataFolder + '/@@name/Prefs'));
    const myJSON = File(appDataFolder + '/@@name/Prefs/Prefs.json');
    myJSON.open('w');
    myJSON.write(JSON.stringify(prefs, null, 2));
    myJSON.close();
    return myJSON;
};
