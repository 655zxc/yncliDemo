
const baseUrl = "192.168.110.84:8060"
// const baseUrl = "192.168.60.134"


const getSearchForm = `http://${baseUrl}/ce/form/searchForm`
const getSearchList = `http://${baseUrl}/`


const api = {
    getSearchForm,
    getSearchList,
}


export default api;