import { uuid } from './Utils';

export type CallbackFn = () => void;
export interface IStateObj {
  listeners: CallbackFn[];
  scriptId: string;
  scriptLoaded: boolean;
}

const createState = (): IStateObj => ({
  listeners: [],
  scriptId: uuid('hugerte-script'),
  scriptLoaded: false
});

interface ScriptLoader {
  load: (doc: Document, url: string, callback: CallbackFn) => void;
  reinitialize: () => void;
}

const CreateScriptLoader = (): ScriptLoader => {
  let state: IStateObj = createState();

  const injectScriptTag = (scriptId: string, doc: Document, url: string, callback: CallbackFn) => {
    const scriptTag = doc.createElement('script');
    scriptTag.referrerPolicy = 'origin';
    scriptTag.type = 'application/javascript';
    scriptTag.id = scriptId;
    scriptTag.src = url;

    const handler = () => {
      scriptTag.removeEventListener('load', handler);
      callback();
    };
    scriptTag.addEventListener('load', handler);
    if (doc.head) {
      doc.head.appendChild(scriptTag);
    }
  };

  const load = (doc: Document, url: string, callback: CallbackFn) => {
    if (state.scriptLoaded) {
      callback();
    } else {
      state.listeners.push(callback);
      if (!doc.getElementById(state.scriptId)) {
        injectScriptTag(state.scriptId, doc, url, () => {
          state.listeners.forEach((fn) => fn());
          state.scriptLoaded = true;
        });
      }
    }
  };

  // Only to be used by tests.
  const reinitialize = () => {
    state = createState();
  };

  return {
    load,
    reinitialize
  };
};

const ScriptLoader = CreateScriptLoader();

export {
  ScriptLoader
};
