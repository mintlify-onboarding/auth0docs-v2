import { autorun, makeAutoObservable } from 'mobx';

import { SessionStore } from './session-store';
import { TenantStore } from './tenant-store';
import { ClientStore } from './client-store';
import { ResourceServerStore } from './resource-server-store';
import { VariableStore } from './variable-store';

export class RootStore {
  sessionStore: SessionStore;
  tenantStore: TenantStore;
  clientStore: ClientStore;
  resourceServerStore: ResourceServerStore;
  variableStore: VariableStore;

  constructor() {
    makeAutoObservable(this);
    this.sessionStore = new SessionStore(this);
    this.tenantStore = new TenantStore(this);
    this.clientStore = new ClientStore(this);
    this.resourceServerStore = new ResourceServerStore(this);
    this.variableStore = new VariableStore(this);
  }

  async init() {
    await this.sessionStore.init();

    autorun(() => {
      if (!this.sessionStore.isAuthenticated) {
        this.tenantStore.reset();
        this.clientStore.reset();
        this.resourceServerStore.reset();
        this.variableStore.reset();
        return;
      }

      this.tenantStore.init();
      this.clientStore.init();
      this.resourceServerStore.init();
      this.variableStore.init();
    });
  }

  reset() {
    this.sessionStore.reset();
    this.tenantStore.reset();
    this.clientStore.reset();
    this.resourceServerStore.reset();
    this.variableStore.reset();
  }
}
