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
    | 'Medal';
type LocationID =
    | 'Kindergarden'
    | 'Medical Clinic'
    | 'Sports'
    | 'University'
    | 'Mosque'
    | 'U.N. Building';
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
