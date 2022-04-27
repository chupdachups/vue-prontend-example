import axiosService from '@/common/api/api-reserve'

const reserve = {
    namespaced: true,
    state: {
        reserve: [],
        userReserve: []
    },
    getters: {
        getReserve: (state) => state.reserve,
        getUserReserve: (state) => state.userReserve
    },
    mutations: {
        setReserve(state, payload) {
            state.reserve = payload
        },
        setUserReserve(state, payload) {
            state.userReserve = payload
        }
    },
    actions: {
        async getReserve({commit}, params) {
            await axiosService.get("reserve")
                .then((res) => {
                    commit("setReserve", res.data)
                })
                .catch((err) => {
                    throw new Error(err)
                })
        },
        async reserveProduct({}, params) {
            await axiosService.post("reserve", params)
                .then((res)=>{
                }).catch( (err) => {
                    throw new Error(err)
                })
        },
        async cancelReserve({}, params) {
            await axiosService.delete(`reserve/${params}`,)
                .then((res)=>{
                }).catch( (err) => {
                    throw new Error(err)
                })
        },
        async getUserReserve({commit}, params) {
            await axiosService.get(`reserve/${params}`,)
                .then((res)=>{
                    commit("setUserReserve", res.data)
                }).catch( (err) => {
                    throw new Error(err)
                })
        }
    }
}

export default reserve