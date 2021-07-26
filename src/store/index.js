import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'


Vue.use(Vuex)

let path = "/payment.json"

export default new Vuex.Store({
  state: 
  {
    data: [] 
  },
  getters:
  {
    payment: (state) => state.data
  },
  mutations: 
  {
    fetch(state , {payload})
    {
      state.data = payload.data.payment
      console.log(state.data)
    },
    add(state , {payload}){
      state.data.push(payload)
    },
  },
  actions: 
  {
    async fetchData( {commit} )
    {
      let payload = await Axios.get(path)
      
      commit("fetch" , {payload})
    },
    addData({commit}, payload){
      // call api to add data
      commit('add' , {payload})
    },
  },
  modules: {
  }
})
