export interface ApiCountryData {
  name: {
    common: string;
    official: string;
    nativeName: Record<string, string>;
  };
  ccn3: string;
}
