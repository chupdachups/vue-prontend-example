import axiosService from '@/common/api/api-common'



const account = {
    namespaced: true,
    state: {
        signUp: ""
    },
    getters: {
        getSignUp: (state) => state.signUp
    },
    mutations: {
        setSignUp(state, payload) {
            state.signUp = payload
        }
    },
    actions: {
        async signUp({commit}, params) {
            console.log("******* signUp Call ********")
            await axiosService.post("accounts", params)
                .then((res) => {
                    commit("setSignUp", res.data)
                })
                .catch((err) => {
                    console.log(err)
                    throw new Error(err)
                })
        }
    }
}

export default account