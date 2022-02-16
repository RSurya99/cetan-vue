import { createStore } from 'vuex'
import VuexPersist from 'vuex-persist'

const vuexPersist = new VuexPersist({
  key: 'cetan',
  storage: localStorage,
})

const store = createStore({
  modules: {},
  plugins: [vuexPersist.plugin],
})

export default store
