import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

import { NavActions, OptOutBanner } from '@/components';
import { patchRolloutConsent } from '@/lib/api';
import { overrideHistoryMethods } from '@/lib/history';
import { initOneTrust } from '@/lib/one-trust';
import { initRootStore } from '@/stores';

async function main() {
  const root = document.createElement('div');
  root.id = 'adu-root';
  document.body.appendChild(root);

  // Initialize one-trust for cookie-consent management
  initOneTrust();

  // Override history methods to dispatch events on route changes
  overrideHistoryMethods();

  // Initialize the MobX store before rendering
  await initRootStore();

  createRoot(root).render(
    <StrictMode>
      <OptOutBanner
        onOptOut={async () => {
          await patchRolloutConsent({ choice: 'opt_out' });
          window.heap.track('docs-v2:opt_out');
          window.location.reload();
        }}
      />
      <NavActions />
    </StrictMode>,
  );
}

main();

// exports to expose following components and utilities to mintlify app
// via `window.Auth0DocsUI`

export * from '@/components';
export { initRootStore, rootStore } from '@/stores';
export { autorun, observe, reaction } from 'mobx';
export { observer } from 'mobx-react-lite';
export { getSample, postSample } from '@/lib/api';
