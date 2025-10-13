import { action, makeAutoObservable } from 'mobx';

import { getCurrentUser, userLogin, userLogout } from '@/lib/api';

import type { RootStore } from './root-store';

interface UserData {
  id: string;
  email: string;
  name: string;
  profilePicture?: string;
  // /dashboard/<locality>/<tenant-name>/profile/general
  profileUrl: string;
}

export class SessionStore {
  rootStore: RootStore;

  isAuthenticated = false;

  user: UserData | null = null;

  selectedTenantName: string | null = null;

  get selectedTenant() {
    const tenant = this.rootStore.tenantStore.tenants.find(
      (t) => t.name === this.selectedTenantName,
    );
    return tenant ?? null;
  }

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {
      init: action,
    });
    this.rootStore = rootStore;
  }

  async init() {
    const response = await getCurrentUser();
    this.isAuthenticated = response.is_authenticated;
    this.user = {
      id: response.profile?.sub ?? '',
      email: response.profile?.email ?? 'guest@example.com',
      name: response.profile?.name ?? 'Guest',
      profilePicture: response.profile?.picture ?? '',
      profileUrl: `/dashboard/<locality>/<tenant-name>/profile/general`,
    };
    this.selectedTenantName = response.account.tenant;
  }

  async login(returnTo?: string) {
    userLogin(returnTo ?? window.location.href);
  }

  async logout(returnTo?: string) {
    userLogout(returnTo ?? window.location.href);
  }
}
