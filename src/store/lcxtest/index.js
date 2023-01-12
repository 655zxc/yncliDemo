const actions = {
   
};

const mutations = {
    change(state,data) {
        state.nowData = data
    }
};

const state = {
    nowData: [],
    test:1
};

const getters = {
    
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};