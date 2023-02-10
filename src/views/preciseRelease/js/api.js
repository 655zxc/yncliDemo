import DsUtils from "yn-p1/libs/utils/DsUtils";


// const baseUrl = ".."
const baseUrl = "http://192.168.110.84:8060"
// const baseUrl = "http://192.168.60.134"
// const baseUrl = "http://192.168.60.135"
// const baseUrl = "http://localhost:8060"




const getSearchForm = `${baseUrl}/ce/form/searchForm`
const getSearchList = `${baseUrl}/ce/form/querySheet`
const buildCache = `${baseUrl}/ce/form/buildCache`
const detectDifferences = `${baseUrl}/ce/form/detectDifference`
const accuratePublish = `${baseUrl}/ce/form/accuratePublish`
const getTaskState = `${baseUrl}/ce/form/getTaskState`
const markInvalid = `${baseUrl}/ce/form/markInvalid`
const detectDifferencesDetail = `${baseUrl}/ce/form/detectDifferenceDetail`

const accuratePublishCalc = (p)=>{return DsUtils.post(`${baseUrl}/ce/form/accuratePublishCalc`, p)}




//改成
//const 接口名 = (参数)=>{return DsUtils.方法(地址, 参数)}
//使用时
//let res = await 接口名(参数)


const api = {
    getSearchForm,
    getSearchList,
    buildCache,
    detectDifferences,
    accuratePublish,
    getTaskState,
    markInvalid,
    detectDifferencesDetail,
    accuratePublishCalc
}


export default api;