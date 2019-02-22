import {Profn} from '@/utils/proFn.js'
export const layout = {
  namespaced: true,
  state:{
    //  菜单导航折叠状态
    isCollapse: false,
    //  全屏状态
    fullPagebool:false,
    zhDrawerClose:false
  },
  getters: {
    getIsCollapse (state) {
      return state.isCollapse
    }
  },
  actions:{

  },
  mutations:{
    CHANGE_COLLAPSE: (state, data) => {
      if(state.isCollapse){
        state.isCollapse = false
      }else{
        state.isCollapse = true;
      }
    },
    FULL_SCREEN: (state, WINDOW)=>{
      //  判断是否是全屏状态   false为否
      let $window = document.documentElement;
      if(!state.fullPagebool){
        Profn.fullPage($window);
      }else{
        Profn.cancelFullpage($window)
      }
      state.fullPagebool = state.fullPagebool ? false :true;
    },
    HANDLER_DRAWER:(state,data)=>{
      if(state.zhDrawerClose){
        state.zhDrawerClose = false
      }else{
        state.zhDrawerClose = true;
      }
    }
  }
}
