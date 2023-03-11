type OS = 'Win' | 'Mac';

type Lingo = 'Hebrew' | 'Arabic' | 'English';

type Mitug = 'Pakmaz' | 'Gaza' | 'Lebanon';

type LocationAnimation = 'None' | 'Scale' | 'Open' | 'Scale & Open';

type CaspionFont = 'Narkis' | 'Almoni' | 'Trade Gothic' | 'Droid' | 'Janna';

type TextAnimation = 'Y Position' | 'X Position' | 'Scale' | 'Opacity';

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
    | 'Ambulance';
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
    | 'Dust';

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
    showHelpTips?: boolean;
    iconColor1Name?: string;
    iconColor1Hex?: string;
    iconColor2Name?: string;
    iconColor2Hex?: string;
    iconColor3Name?: string;
    iconColor3Hex?: string;
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
