export interface ApiCountryData {
  name: {
    common: string;
    official: string;
    nativeName: Record<string, string>;
  };
  cca3: string;
}
