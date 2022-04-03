import Vuex from 'vuex'
import Vue from 'vue'
import login from './modules/login'
import account from './modules/account'
import product from './modules/product'


Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        login: login,
        account: account,
        product: product
    }
})