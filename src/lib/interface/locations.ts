// UI
const createLocationsUI = (
    tpanel: TabbedPanel
): {
    locTab: Tab;
    dropdownsGrp: Group;
    locLangDDGrp: Group;
    mitugAnimDDGrp: Group;
} => {
    const locTab = tpanel.add('tab', undefined, ['Locations']);

    const locationsGrp = locTab.add('group');
    locationsGrp.orientation = 'column';
    locationsGrp.alignChildren = 'left';
    locationsGrp.alignment = 'left';
    locationsGrp.margins = 4;
    // @ts-ignore
    locationsGrp.margins.left = 10;

    const dropdownsGrp = locationsGrp.add('group');

    const locLangDDGrp = dropdownsGrp.add('group');
    const mitugAnimDDGrp = dropdownsGrp.add('group');

    dropdownsGrp.alignChildren =
        locLangDDGrp.alignChildren =
        mitugAnimDDGrp.alignChildren =
            'left';
    dropdownsGrp.alignment =
        locLangDDGrp.alignment =
        mitugAnimDDGrp.alignment =
            'left';

    const locationsDDGrp = locLangDDGrp.add('group');
    locationsDDGrp.add('statictext', undefined, 'Location:');
    const locationsList: LocationID[] = [
        'Kindergarden',
        'Medical Clinic',
        'Sports',
        'University',
        'Mosque',
        'U.N. Building',
        'Diplomatic Building',
        'Gas Station',
        'Government Building',
        // 'Factory', ...
        'Pumping Station',
        'Police',
        'Water Facility',
        'Residential Neighborhood',
        'Amusement Park',
        'Hotel',
        'School',
        'Stadium',
        'Tourism Attraction',
        'Communication Antenna',
        'Education and Culture Site',
        'Hospital',
        'College'
        // 'Library' ...
        // 'Cemetery' ...
    ];
    const locationsDD = locationsDDGrp.add(
        'dropdownlist',
        undefined,
        locationsList
    );
    locationsDD.preferredSize[0] = 100;
    locationsDD.selection = 0;

    const langDDGrp = locLangDDGrp.add('group');
    langDDGrp.add('statictext', undefined, 'Language:');
    const langs: Lingo[] = ['Hebrew', 'English', 'Arabic'];
    const langDD = langDDGrp.add('dropdownlist', undefined, langs);
    langDD.preferredSize[0] = 100;
    langDD.selection = 0;

    const mitugDDGrp = mitugAnimDDGrp.add('group');
    mitugDDGrp.add('statictext', undefined, 'Mitug:');
    const mitugim: Mitug[] = ['Gaza', 'Pakmaz', 'Lebanon'];
    const mitugDD = mitugDDGrp.add('dropdownlist', undefined, mitugim);
    mitugDD.preferredSize[0] = 100;
    mitugDD.selection = 0;

    const animationDDGrp = mitugAnimDDGrp.add('group');
    animationDDGrp.add('statictext', undefined, 'Animation:');
    const animationTypes: LocationAnimation[] = [
        'None',
        'Open',
        'Scale',
        'Scale & Open'
    ];
    const animationDD = animationDDGrp.add(
        'dropdownlist',
        undefined,
        animationTypes
    );
    animationDD.preferredSize[0] = 100;
    animationDD.selection = 0;

    const locationsCreateBtn = locationsGrp.add(
        'button',
        undefined,
        'Create Location'
    );
    locationsCreateBtn.preferredSize[0] = 100;

    locationsCreateBtn.onClick = () => {
        const id = locationsDD.selection.toString() as LocationID;
        const lang = langDD.selection.toString() as Lingo;
        const mitug = mitugDD.selection.toString() as Mitug;
        const animation = animationDD.selection.toString() as LocationAnimation;
        createLocationFromId(id, lang, mitug, animation);
    };

    return { locTab, dropdownsGrp, locLangDDGrp, mitugAnimDDGrp };
};
