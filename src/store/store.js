import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loginData: "",
        signUp: ""
    },
    getters: {
        getLoginData: (state) => state.loginData,
        getSignUp: (state) => state.signUp
    },
    mutations: {
        setLoginData(state, payload) {
            state.loginData = payload
        },
        setSignUp(state, payload) {
            state.signUp = payload
        }
    },
    actions: {
        async login({commit}, params) {
            console.log("******* login Call ********")
            await axios.post("http://localhost:8070/login", params)
                .then((res) => {
                    commit("setLoginData", res.data)
                })
                .catch((err) => {
                    console.log(err)
                    throw new Error(err)
                })
        },
        async signUp({commit}, params) {
            console.log("******* signUp Call ********")
            await axios.post("http://localhost:8070/accounts", params)
                .then((res) => {
                    commit("setSignUp", res.data)
                })
                .catch((err) => {
                    console.log(err)
                    throw new Error(err)
                })
        }
    }
})