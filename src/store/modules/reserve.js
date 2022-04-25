import axiosService from '@/common/api/api-reserve'

const reserve = {
    namespaced: true,
    state: {
        reserve: []
    },
    getters: {
        getReserve: (state) => state.reserve
    },
    mutations: {
        setReserve(state, payload) {
            state.reserve = payload
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
        async saveReserve({}, params) {
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
        }
    }
}

export default reserve