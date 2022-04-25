import axiosService from '@/common/api/api-account'



const account = {
    namespaced: true,
    state: {
        signUp: "",
        accounts: []
    },
    getters: {
        getSignUp: (state) => state.signUp,
        getAccounts: (state) => state.accounts
    },
    mutations: {
        setSignUp(state, payload) {
            state.signUp = payload
        },
        setAccounts(state, payload) {
            state.accounts = payload
        }
    },
    actions: {
        async signUp({commit}, params) {
            await axiosService.post("accounts", params)
                .then((res) => {
                    commit("setSignUp", res.data)
                })
                .catch((err) => {
                    throw new Error(err)
                })
        },
        async getAccounts({commit}, params) {
            await axiosService.get("accounts")
                .then((res) => {
                    commit("setAccounts", res.data)
                })
                .catch((err) => {
                    throw new Error(err)
                })
        },
        async deleteAccounts({}, params) {
            await axiosService.delete('accounts', {data: params})
                .then((res)=>{
                }).catch( (err) => {
                    throw new Error(err)
                })
        }
    }
}

export default account