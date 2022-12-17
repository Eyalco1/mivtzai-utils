type ColorDropdown = 'White' | 'Black' | 'Red';

type Lingo = 'Hebrew' | 'Arabic' | 'English';

type IconID = 'Boom' | 'Tunnel' | 'Terror Tunnel';
type LocationID = 'Kindergarden' | 'Medical Clinic' | 'Sports' | 'University';

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
  projectFolderPath: string;
}

type GoogleMapsLocation = 'Israel' | 'Gaza';
