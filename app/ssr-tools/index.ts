import { createContext } from 'react';
import createCache from '@emotion/cache';

export const createEmotionCache = () => {
  return createCache({ key: 'css' });
}

export const ClientStyleContext = createContext({
  reset: () => {},
});
