// UI
const createLocationsUI = (tpanel: TabbedPanel): Tab => {
    const locationsTab = tpanel.add('tab', undefined, ['Locations']);

    const locationsGrp = locationsTab.add('group');
    locationsGrp.orientation = 'column';
    locationsGrp.alignChildren = 'left';

    const locationsDDGrp = locationsGrp.add('group');
    locationsDDGrp.add('statictext', undefined, 'Location:');
    const locationsList: LocationID[] = [
        'Kindergarden',
        'Medical Clinic',
        'Sports',
        'University',
        'Mosque'
    ];
    const locationsDD = locationsDDGrp.add(
        'dropdownlist',
        undefined,
        locationsList
    );
    locationsDD.preferredSize[0] = 100;
    locationsDD.selection = 0;

    const langDDGrp = locationsGrp.add('group');
    langDDGrp.add('statictext', undefined, 'Language:');
    const langDD = langDDGrp.add('dropdownlist', undefined, [
        'Hebrew',
        'English',
        'Arabic'
    ]);
    langDD.preferredSize[0] = 100;
    langDD.selection = 0;

    const locationsCreateBtn = locationsGrp.add(
        'button',
        undefined,
        'Create Location'
    );
    locationsCreateBtn.preferredSize[0] = 100;

    locationsCreateBtn.onClick = () => {
        const id = locationsDD.selection.toString() as LocationID;
        const lang = langDD.selection.toString() as Lingo;
        createLocationFromId(id, lang);
    };

    return locationsTab;
};
