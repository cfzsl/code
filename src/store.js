import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // rolename: localStorage.getItem('role'),
    // jurisdiction: []
  },
  mutations: {
    // addJurisdiction(state, arr){
    //   state.jurisdiction = arr;
    //   localStorage.setItem('jurisdiction', JSON.stringify(arr))
    // }
  },
  actions: {
    // getJurisdiction({commit,state}){
    //   axios.post('/getFuncs', qs.stringify({rolename:state.rolename})).then(res => {
    //     commit('addJurisdiction',res.data)
    //   })
    // }
  }
});
