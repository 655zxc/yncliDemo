let baseUrl = "192.168.110.84:8060"
// const baseUrl = "192.168.60.134"
// const baseUrl = "192.168.60.135"



// const getSearchForm = `../ce/form/searchForm`
// const getSearchList = `../ce/form/querySheet`
// const buildCache = `../ce/form/buildCache`
// const detectDifferences = `../ce/form/detectDifferences`
// const accuratePublish = `../ce/form/accuratePublish`
// const getTaskState = `../ce/form/getTaskState`
// const markInvalid = `../ce/form/markInvalid`

const getSearchForm = `http://${baseUrl}/ce/form/searchForm`
const getSearchList = `http://${baseUrl}/ce/form/querySheet`
const buildCache = `http://${baseUrl}/ce/form/buildCache`
const detectDifferences = `http://${baseUrl}/ce/form/detectDifferences`
const accuratePublish = `http://${baseUrl}/ce/form/accuratePublish`
const getTaskState = `http://${baseUrl}/ce/form/getTaskState`
const markInvalid = `http://${baseUrl}/ce/form/markInvalid`


const api = {
    getSearchForm,
    getSearchList,
    buildCache,
    detectDifferences,
    accuratePublish,
    getTaskState,
    markInvalid
}


export default api;