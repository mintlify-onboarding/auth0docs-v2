import { action, makeAutoObservable } from 'mobx';

import { getTenants, type Tenant } from '@/lib/api';

import type { RootStore } from './root-store';

export class TenantStore {
  rootStore: RootStore;

  tenants: Tenant[] = [];

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {
      init: action,
      clear: action,
    });
    this.rootStore = rootStore;
  }

  async init() {
    this.tenants = await getTenants();
  }

  clear() {
    this.tenants = [];
  }
}
