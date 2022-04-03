import axiosService from '@/common/api/api-common'

const product = {
    namespaced: true,
    state: {
        products: []
    },
    getters: {
        getProducts: (state) => state.products
    },
    mutations: {
        setProducts(state, payload) {
            state.products = payload
        }
    },
    actions: {
        async getProducts({commit}, params) {
            await axiosService.get("products")
                .then((res) => {
                    console.log(res.data)
                    commit("setProducts", res.data)
                })
                .catch((err) => {
                    throw new Error(err)
                })
        }
    }
}

export default product