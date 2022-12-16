/* eslint @typescript-eslint/ban-types: off */
import { IntlMessages } from './IntlMessages';

export interface CoreState {
  brandConfigLoaded: boolean;
  brandConfig: any;
  languages: CoreLanguages;
  theme: CoreTheme[];
  homepageScrollHandler?: Function;
  currency: string;
  isMapsLoaded: boolean;
}

export interface CoreTheme {
  key: string;
  value: string;
}

export interface SimplenightFeatures {
  [key: string]: boolean;
}

export interface ClientConfigImages {
  logo: string;
  background: string;
  favicon: string;
  [key: string]: string;
}

export interface CoreLanguages {
  intlMessages: IntlMessages;
  locale: string;
}
