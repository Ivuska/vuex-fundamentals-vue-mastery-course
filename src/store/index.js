import { createStore } from 'vuex';
import EventService from '@/services/EventService.js';

export default createStore({
  state: {
    user: "Ivka",
    events: [],
    event: {},
  },
  // Mutations can update/mutate Vuex State.
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENT(state, event) {
      state.event = event
    }
  },
  actions: {
    createEvent({ commit }, event) {
      EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event);
      })
      .catch(error => {
        console.log(error);
      })
    },
    fetchEvents({ commit }) {
      EventService.getEvents()
      .then(response => {
        commit('SET_EVENTS', response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    fetchEvent ({ commit, state }, id ) {
      // This will check if we need to fetch existing event, if yes the API call is not made.
      const existingEvent = state.events.find(event => event.id === id)
      if(existingEvent) {
        commit('SET_EVENT', existingEvent)
      }else {
        EventService.getEvent(id)
        .then(response => {
          commit('SET_EVENT', response.data)
        })
        .catch(error => {
          console.log(error)
        })
      }
    }
  },
  modules: {}
})