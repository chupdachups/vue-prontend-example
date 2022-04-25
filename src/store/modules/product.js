import axiosService from '@/common/api/api-product'

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
                    commit("setProducts", res.data)
                })
                .catch((err) => {
                    throw new Error(err)
                })
        },
        async saveProduct({}, params) {
            await axiosService.post("products", params)
                .then((res)=>{
                }).catch( (err) => {
                    throw new Error(err)
                })
        },
        async deleteProduct({}, params) {
            await axiosService.delete(`products/${params}`,)
                .then((res)=>{
                }).catch( (err) => {
                    throw new Error(err)
                })
        }
    }
}

export default product