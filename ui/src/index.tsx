import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

import { AppStoreProvider, NavActions, OptOutBanner } from '@/components';
import { patchRolloutConsent } from '@/lib/api';
import { initOneTrust } from '@/lib/one-trust';
import { initRootStore } from '@/stores';

function main() {
  const root = document.createElement('div');
  root.id = 'adu-root';
  document.body.appendChild(root);

  // initialize the mobx store
  initRootStore();
  // initialize one-trust for cookie-consent management
  initOneTrust();

  createRoot(root).render(
    <StrictMode>
      <AppStoreProvider>
        <OptOutBanner
          onOptOut={async () => {
            await patchRolloutConsent({ choice: 'opt_out' });
            window.heap.track('docs-v2:opt_out');
            window.location.reload();
          }}
        />
        <NavActions />
      </AppStoreProvider>
    </StrictMode>,
  );
}

main();

export {
  AuthMenu,
  Button,
  ContentText,
  DisplayText,
  FlagIcon,
  SvgIcon,
  type TenantData,
} from './components';
