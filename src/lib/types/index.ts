type OS = 'Win' | 'Mac';

type Lingo = 'Hebrew' | 'Arabic' | 'English';

type Mitug = 'Pakmaz' | 'Gaza' | 'Lebanon';

type LocationAnimation = 'None' | 'Scale' | 'Open' | 'Scale & Open';

type CaspionFont = 'Narkis' | 'Almoni' | 'Trade Gothic' | 'Droid' | 'Janna';

type TextAnimation = 'Y Position' | 'X Position' | 'Scale' | 'Opacity';

type AssetID =
    | 'caspion-idf-logo-he'
    | 'caspion-idf-logo-en'
    | 'caspion-idf-logo-ar'
    | 'caspion-idf-logo-pr'
    | 'caspion-idf-logo-es'
    | 'caspion-idf-logo-rs'
    | 'caspion-idf-logo-fr'
    | 'caspion-dotz-logo'
    | 'caspion-israel-map-guide'
    | 'caspion-israel-map-clean'
    | 'caspion-gaza-map-guide'
    | 'caspion-gaza-map-clean'
    | 'caspion-paper-dark'
    | 'caspion-paper-medium'
    | 'caspion-paper-light'
    | 'caspion-smoke'
    | 'caspion-noise'
    | 'caspion-grunge'
    | 'caspion-dust';

type IconID =
    | 'Boom'
    | 'Tunnel'
    | 'Terror Tunnel'
    | 'Target'
    | 'Sniper Target'
    | 'House Bombing'
    | 'Fire'
    | 'Money'
    | 'Earth'
    | 'Kaboom'
    | 'Medal'
    | 'Salute With M16'
    | 'Holding M16'
    | 'Shooting M16'
    | 'Running With M16'
    | 'Crouching With M16'
    | 'Rocket'
    | 'Rocket Launcher'
    | 'Mask'
    | 'Shoe'
    | 'Helmet'
    | 'Drone'
    | 'Tent'
    | 'Airplane'
    | 'Submarine'
    | 'Ambulance'
    | 'Tank'
    | 'Grenade'
    | 'Boat'
    | 'Binoculars'
    | 'M16';
type LocationID =
    | 'Kindergarden'
    | 'Medical Clinic'
    | 'Sports'
    | 'University'
    | 'Mosque'
    | 'U.N. Building'
    | 'Diplomatic Building'
    | 'Gas Station'
    | 'Government Building'
    | 'Factory'
    | 'Pumping Station'
    | 'Police'
    | 'Water Facility'
    | 'Residential Neighborhood'
    | 'Amusement Park'
    | 'Hotel'
    | 'School'
    | 'Stadium'
    | 'Tourism Attraction'
    | 'Communication Antenna'
    | 'Education and Culture Site'
    | 'Hospital'
    | 'College'
    | 'Library'
    | 'Cemetery';
type TextureID =
    | 'Paper Dark'
    | 'Paper Medium'
    | 'Paper Light'
    | 'Smoke'
    | 'Noise'
    | 'Dust'
    | 'Grunge';

interface LocationArgs {
    lang: Lingo;
    text: string;
    fontSize: number;
    tracking: number;
    leading?: number;
    textPos: [number, number];
    textAnchor: [number, number];
    bgSize: [number, number];
    iconPos: [number, number];
    iconAnchor: [number, number];
    iconScale: number;
    iconId: LocationID;
}

interface Prefs {
    version?: string;
    projectFolderPath?: string;
    iconsLabelIndex?: number;
    iconsLabelRandom?: boolean;
    locsLabelIndex?: number;
    locsLabelRandom?: boolean;
    texLabelIndex?: number;
    texLabelRandom?: boolean;
    textLabelIndex?: number;
    textLabelRandom?: boolean;
    showHelpTips?: boolean;
    iconColor1Name?: string;
    iconColor1Hex?: string;
    iconColor2Name?: string;
    iconColor2Hex?: string;
    iconColor3Name?: string;
    iconColor3Hex?: string;
    mitugGaza?: { color1: string; color2: string };
    mitugPakmaz?: { color1: string; color2: string };
    mitugLebanon?: { color1: string; color2: string };
}

type GoogleMapsLocation = 'Israel' | 'Gaza';

type CreateIconFn = (
    circleColor: string,
    iconColor: string,
    hasCircle: boolean,
    scale: boolean
) => void;

type CreateLocationFn = (
    lang: Lingo,
    mitug: Mitug,
    animation: LocationAnimation
) => void;

type CreateLocationIconFn = (
    iconPos: [number, number],
    iconAnchor: [number, number],
    iconScale: number,
    name: LocationID,
    mitug: Mitug
) => ShapeLayer;
