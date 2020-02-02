import { createStore } from 'vuex-smart-module';
import { rootModule } from './modules/root';

export default () => createStore(rootModule, {
  strict: false
});
