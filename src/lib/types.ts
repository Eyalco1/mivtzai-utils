type OS = 'Win' | 'Mac';

type ColorDropdown = 'White' | 'Black' | 'Red';

type Lingo = 'Hebrew' | 'Arabic' | 'English';

type IconID =
  | 'Boom'
  | 'Tunnel'
  | 'Terror Tunnel'
  | 'Target'
  | 'Sniper Target'
  | 'House Bombing';
type LocationID = 'Kindergarden' | 'Medical Clinic' | 'Sports' | 'University';
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
  version: string;
  projectFolderPath: string;
}

type GoogleMapsLocation = 'Israel' | 'Gaza';
