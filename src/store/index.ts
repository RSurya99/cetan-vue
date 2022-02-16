import { createStore } from 'vuex'
import VuexPersist from 'vuex-persist'
import auth from './modules/auth'
import room from './modules/room'
import chat from './modules/chat'

const vuexPersist = new VuexPersist({
  key: 'cetan',
  storage: localStorage,
})

const store = createStore({
  modules: {
    auth,
    room,
    chat,
  },
  plugins: [vuexPersist.plugin],
})

export default store
