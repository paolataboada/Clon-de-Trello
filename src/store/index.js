import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    strict: debug, // Si es true
    plugins: debug ? [createLogger] : [],
    state: {},
    getters: {},
    actions: {},
    // Cambian los estados a partir de los eventos emitidos
    mutations: {}
})
