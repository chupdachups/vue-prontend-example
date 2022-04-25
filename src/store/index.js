import Vuex from 'vuex'
import Vue from 'vue'
import persistedstate from 'vuex-persistedstate'
import login from './modules/login'
import account from './modules/account'
import product from './modules/product'
import reserve from './modules/reserve'


Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        login: login,
        account: account,
        product: product,
        reserve: reserve
    },
    plugins: [persistedstate({
       paths: ["login"]
    })]
})