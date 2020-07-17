import { Module } from 'vuex-smart-module';
import { queryModule } from './modules/query';

export const root = new Module({
  modules: {
    query: queryModule
  }
});

export const { state, getters, mutations, actions, modules, plugins } = root.getStoreOptions();
