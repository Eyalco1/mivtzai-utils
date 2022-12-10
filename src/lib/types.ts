type ColorDropdown = 'White' | 'Black' | 'Red';
type Lingo = 'Hebrew' | 'Arabic' | 'English';
interface LocationArgs {
  lang: Lingo;
  text: string;
  fontSize: number;
  tracking: number;
  textPos: [number, number];
  textAnchor: [number, number];
  bgSize: [number, number];
  iconPos: [number, number];
  iconAnchor: [number, number];
  iconScale: number;
  iconId: string;
}
