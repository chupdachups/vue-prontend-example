import axiosService from '@/common/api/api-account'

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
            await axiosService.post("login", params)
                .then((res) => {
                    commit("setLoginData", res.data)
                })
                .catch((err) => {
                    if (!err.response) {
                        // network error
                        console.log(err);
                        console.log('Error: Network Error');
                    } else {
                        console.log(err);
                        console.log(err.response.data.message);
                    }

                    throw new Error(err)
                })
        }
    }
}

export default login