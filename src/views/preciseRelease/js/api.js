
const baseUrl = "192.168.110.84:8060"
// const baseUrl = "192.168.60.134"


const getSearchForm = `http://${baseUrl}/ce/form/searchForm`
const getSearchList = `http://${baseUrl}/ce/form/querySheet`
const buildCache = `http://${baseUrl}/ce/form/buildCache`
const detectDifferences = `http://${baseUrl}/ce/form/detectDifferences`
const accuratePublish = `http://${baseUrl}/ce/form/accuratePublish`
const getTaskState = `http://${baseUrl}/ce/form/getTaskState`

const api = {
    getSearchForm,
    getSearchList,
    buildCache,
    detectDifferences,
    accuratePublish,
    getTaskState
}


export default api;