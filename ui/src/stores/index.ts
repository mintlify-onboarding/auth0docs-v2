import { autorun, reaction } from 'mobx';

import { RootStore } from './root-store';

declare global {
  interface Window {
    rootStore: RootStore;
    autorun: typeof autorun;
    reaction: typeof reaction;
  }
}

export async function initRootStore() {
  const rootStore = new RootStore();
  await rootStore.init();

  window.rootStore = rootStore;
  window.autorun = autorun;
  window.reaction = reaction;

  // broadcast store ready event
  const storeReadyEvent = new CustomEvent('adu:storeReady', {
    bubbles: true,
    cancelable: false,
  });
  window.dispatchEvent(storeReadyEvent);

  return rootStore;
}
