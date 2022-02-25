export default {
    setSystemError: (context, payload) => {
        if (payload) {
            payload.errorMessage = payload.errorMessage || ''
            return context.commit('setSystemError', payload)
        } else {
            return context.commit('setSystemError', {
                errorMessage: '',
                statusCode: null
            })
        }
    }
}