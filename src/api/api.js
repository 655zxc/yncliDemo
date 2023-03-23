import DsUtils from "yn-p1/libs/utils/DsUtils";


// const baseUrl = ".." 
// const baseUrl = "http://192.168.110.84:8060"  
// const baseUrl = "http://192.168.60.134"   
const baseUrl = "http://192.168.60.135"        
// const baseUrl = "http://192.168.12.90"
// const baseUrl = "http://localhost:8060"

 

//精准发布
const getSearchForm = `${baseUrl}/ce/form/searchForm`
const getSearchList = `${baseUrl}/ce/form/querySheet`
const buildCache = `${baseUrl}/ce/form/buildCache`
const detectDifferences = `${baseUrl}/ce/form/detectDifference`
const accuratePublish = `${baseUrl}/ce/form/accuratePublish`
const getTaskState = `${baseUrl}/ce/form/getTaskState`
const markInvalid = `${baseUrl}/ce/form/markInvalid`
const detectDifferencesDetail = `${baseUrl}/ce/form/detectDifferenceDetail`
const accuratePublishCalc = (p) => { return DsUtils.post(`${baseUrl}/ce/form/accuratePublishCalc`, p) }
const batchFormPublish = (p) => { return DsUtils.post(`${baseUrl}/ce/form/batchFormPublish`, p) }
const getTaskState2 = (id) => { return DsUtils.get(`${baseUrl}/ce/form/getTaskState?taskId=${id}`) }
const accurateDetection = (p) => { return DsUtils.post(`${baseUrl}/ce/form/resetDetect`, p) }

//公式追踪
const getFormulaTrace = (id,formula) => {return DsUtils.post(`${baseUrl}/ce/calc/getFormulaTrace?sheetId=${id}`,formula,{headers: {'Content-Type': "text/plain"}})} 
const expandFormulaTrace = p => { return DsUtils.post(`${baseUrl}/ce/calc/expandFormulaTrace`, p) } 
const searchPageDim = p => { return DsUtils.post(`${baseUrl}/ce/form/searchPageDim`, p) } 
  
//表单分组 
const getGroupTree = () => {return DsUtils.get(`${baseUrl}/ce/group/getGroupTree`)}
const addGroup = p => { return DsUtils.post(`${baseUrl}/ce/group/addGroup`, p) }
const rename = p => { return DsUtils.post(`${baseUrl}/ce/group/rename`, p) }
const deleteGroup = p => { return DsUtils.post(`${baseUrl}/ce/group/deleteGroup`,{targetId:p}) }
const moveGroup = (optionId,targetId,moveType) => { return DsUtils.post(`${baseUrl}/ce/group/moveGroup`,{optionId,targetId,moveType}) }
const accuratePublishFormula = p => { return DsUtils.post(`${baseUrl}/ce/form/accuratePublishFormula`, p) }
const getSceneForm = () => { return DsUtils.get(`${baseUrl}/ce/magic/getScene?withAuth=false`)}
const getSceneChildForm = p => { return DsUtils.get(`${baseUrl}/ce/magic/getScene?withAuth=false&&parentId=${p}`)}
const addForm = p => { return DsUtils.post(`${baseUrl}/ce/group/addForm`, p) }
const getForm = p => { return DsUtils.post(`${baseUrl}/ce/group/getForm`, p) }
const deleteForm = p => { return DsUtils.post(`${baseUrl}/ce/group/deleteForm`,{targetId:p})}
const moveForm = (optionId,targetId,moveType) => { return DsUtils.post(`${baseUrl}/ce/group/moveForm`,{optionId,targetId,moveType})}
 
const api = {
    getSearchForm,
    getSearchList,
    buildCache,
    detectDifferences,
    accuratePublish,
    getTaskState,
    markInvalid,
    detectDifferencesDetail,
    accuratePublishCalc,
    batchFormPublish,
    getTaskState2,
    accurateDetection,
    getFormulaTrace,
    expandFormulaTrace,
    getGroupTree,
    addGroup,
    rename,
    deleteGroup,
    moveGroup,
    accuratePublishFormula,
    getSceneForm,
    getSceneChildForm,
    addForm,
    getForm,
    deleteForm,
    moveForm,
    searchPageDim
}


export default api;