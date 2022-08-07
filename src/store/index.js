import { createStore } from 'vuex'

export default createStore({
  state: {
    user: "Ivka",
    events: [],
  },
  // Mutations can update/mutate Vuex State.
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event);
    }
  },
  actions: {},
  modules: {}
})