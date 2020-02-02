import { Getters, Mutations, Actions, Module, createMapper } from 'vuex-smart-module';
import { queryModule } from './query';

class RootState {}

class RootGetters extends Getters<RootState> {}

class RootMutations extends Mutations<RootState> {}

class RootActions extends Actions<RootState, RootGetters, RootMutations, RootMutations> {}

export const rootModule = new Module({
  state: RootState,
  getters: RootGetters,
  mutations: RootMutations,
  actions: RootActions,
  modules: {
    query: queryModule
  }
});

export const rootMapper = createMapper(rootModule);
