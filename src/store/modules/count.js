export const count = {
  namespaced: true,
  state:{
    count:0,
  },
  getters: {
    getCount (state) {
      return state.count
    }
  },
  actions:{
    toggleCount({commit},str){
      console.log(str)
      commit('changCount',str)
    }
  },
  mutations:{
    changCount:(state,str)=>{
      console.log(str)
      str==='add'? state.count++ : state.count--
    }
  }
}
