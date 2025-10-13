import { action, makeObservable, observable } from 'mobx';
import type { RootStore } from './root-store';

type AllowedKeys =
  | '{yourDomain}'
  | '{yourClientId}'
  | '{yourClientSecret}'
  | '{yourSecret}'
  | '{yourAudience}';

export class VariableStore {
  rootStore: RootStore;

  values = observable.map<AllowedKeys, string>({
    '{yourDomain}': '{yourDomain}',
    '{yourClientId}': '{yourClientId}',
    '{yourClientSecret}': '{yourClientSecret}',
    '{yourSecret}': '{yourSecret}',
    '{yourAudience}': '{yourAudience}',
  });

  constructor(rootStore: RootStore) {
    makeObservable(this, {
      init: action,
      setValue: action,
      reset: action,
    });
    this.rootStore = rootStore;
  }

  init() {
    // TODO: implement this
  }

  getValue(key: string) {
    if (!this.values.has(key as AllowedKeys)) {
      console.warn(`${key} is not allowed in VariableStore`);
    }
    return this.values.get(key as AllowedKeys) ?? key;
  }

  setValue(key: string, value: string) {
    if (!this.values.has(key as AllowedKeys)) {
      console.warn(`${key} is not allowed in VariableStore`);
      return;
    }

    console.log(`Setting ${key} to ${value}`);
    this.values.set(key as AllowedKeys, value);
    console.log('Values after update:', this.values);
  }

  reset() {
    const values = this.values;
    for (const key of this.values.keys()) {
      if (!Object.prototype.hasOwnProperty.call(values, key)) continue;
      this.values.set(key as AllowedKeys, key);
    }
  }
}
