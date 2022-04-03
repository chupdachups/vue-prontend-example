import axiosService from '@/common/api/api-common'

const login = {
    namespaced: true,
    state: {
        loginData: "",
        signUp: ""
    },
    getters: {
        getLoginData: (state) => state.loginData
    },
    mutations: {
        setLoginData(state, payload) {
            state.loginData = payload
        }
    },
    actions: {
        async login({commit}, params) {
            console.log("******* login Call ********")
            await axiosService.post("login", params)
                .then((res) => {
                    // console.log('res', res.data)
                    commit("setLoginData", res.data)
                })
                .catch((err) => {
                    console.log(err)
                    throw new Error(err)
                })
        }
    }
}

export default login