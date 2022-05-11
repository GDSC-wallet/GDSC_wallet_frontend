import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        date: new Date().toISOString(),
        month : new Date().getMonth()+1,
    },
    mutations: {
        change (state, new_date) {
            state.date = new Date(new_date).toISOString();
        },
    },
    actions: {
    },
    modules: {
    }
})
