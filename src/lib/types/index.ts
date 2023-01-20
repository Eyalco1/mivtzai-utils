type OS = 'Win' | 'Mac';

type ColorDropdown = 'White' | 'Black' | 'Red';

type Lingo = 'Hebrew' | 'Arabic' | 'English';

type Mitug = 'Pakmaz' | 'Gaza' | 'Lebanon';

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
    | 'Rocket'
    | 'Rocket Launcher'
    | 'Mask';
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
    | 'Pumping Station';
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
}

type GoogleMapsLocation = 'Israel' | 'Gaza';

type CreateIconFn = (
    circleColor: ColorDropdown,
    iconColor: ColorDropdown,
    hasCircle: boolean,
    scale: boolean
) => void;

type CreateLocationIconFn = (
    iconPos: [number, number],
    iconAnchor: [number, number],
    iconScale: number,
    name: LocationID,
    mitug: Mitug
) => ShapeLayer;
