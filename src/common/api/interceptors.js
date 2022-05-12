export function setInterceptors(axiosService) {
    axiosService.interceptors.request.use(function (config) {
        console.log('config', config)
        return config;
    },function (error) {
        console.log('error', error)
        return Promise.reject(error)
    })

    axiosService.interceptors.response.use(function (response) {
        console.log('response', response)
        return response
    }, function (error) {
        console.log('error', error)
        return Promise.reject(error)
    })

    return axiosService
}