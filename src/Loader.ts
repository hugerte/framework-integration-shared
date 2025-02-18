import type { HugeRTE } from 'hugerte';
import { cleanupGlobalHugeRTE } from './TestHelpers';

/* Based on code from TinyMCE, MODIFIED */
/* See LICENSE.txt for the original license information */
const loadScript = (url: string, success: () => void, failure: (err: Error) => void): void => {
  const script = document.createElement('script');
  script.src = url;

  const onLoad = () => {
    script.removeEventListener('load', onLoad);
    script.removeEventListener('error', onError);
    success();
  };

  const onError = () => {
    script.removeEventListener('error', onError);
    script.removeEventListener('load', onLoad);
    failure(new Error(`Failed to load script: ${url}`));
  };

  script.addEventListener('load', onLoad);
  script.addEventListener('error', onError);
  document.body.appendChild(script);
};

const getHugeRTE = (): HugeRTE | undefined => (globalThis as any).hugerte as HugeRTE | undefined;

const setHugeRTEBaseUrl = (hugerte: any, baseUrl: string): void => {
  const prefix = document.location.protocol + '//' + document.location.host;
  hugerte.baseURL = baseUrl.indexOf('://') === -1 ? prefix + baseUrl : baseUrl;
  hugerte.baseURI = new hugerte.util.URI(hugerte.baseURL);
};

const updateHugeRTEUrls = (packageName: string): void => {
  const hugerte = getHugeRTE();
  if (hugerte) {
    setHugeRTEBaseUrl(hugerte, `/project/node_modules/${packageName}`);
  }
};

const versionToPackageName = (version: string) => version === 'latest' ? 'hugerte' : `hugerte-${version}`;

const unload = (): void => {
  const hugerte = getHugeRTE();
  if (hugerte) {
    hugerte.remove();
  }
  cleanupGlobalHugeRTE();
};

const load = (version: string, success: () => void, failure: (err: Error) => void): void => {
  const packageName = versionToPackageName(version);

  unload();
  loadScript(`/project/node_modules/${packageName}/hugerte.min.js`, () => {
    updateHugeRTEUrls(versionToPackageName(version));
    success();
  }, failure);
};

export const pLoadVersion = (version: string): Promise<void> =>
  new Promise((resolve, reject) => {
    load(version, resolve, reject);
  });
