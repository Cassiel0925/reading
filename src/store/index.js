import Vue from 'vue'
import Vuex from 'vuex'
import store from './modules/store'
import book from './modules/book'
import login from './modules/login'

import getters from "./getters";
import actions from "./actions";


Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    actions,
    getters,
    modules: {
        store,
        book,
        login
    }
})