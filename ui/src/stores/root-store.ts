import { autorun, makeAutoObservable } from 'mobx';

import { SessionStore } from './session-store';
import { TenantStore } from './tenant-store';
import { VariableStore } from './variable-store';

export class RootStore {
  sessionStore: SessionStore;
  tenantStore: TenantStore;
  variableStore: VariableStore;

  constructor() {
    makeAutoObservable(this);
    this.sessionStore = new SessionStore(this);
    this.tenantStore = new TenantStore(this);
    this.variableStore = new VariableStore(this);
  }

  async init() {
    await this.sessionStore.init();

    autorun(() => {
      if (!this.sessionStore.isAuthenticated) {
        console.log('User is not authenticated');
        this.tenantStore.clear();
        this.variableStore.reset();
        return;
      }

      console.log('User authenticated, initializing tenant store');
      this.tenantStore.init();
      this.variableStore.init();
    });
  }
}
