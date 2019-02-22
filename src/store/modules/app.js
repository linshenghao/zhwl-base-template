export const app = {
  namespaced: true,
  state:{
    //富文本的语言，默认是中文
    language: localStorage.getItem('language') || 'zh',
  },
  getters: {
    getLanguage (state) {
      return state.language
    }
  },
  actions:{
    SET_LANGUAGE: (state, language) => {
      state.language = language
      localStorage.setItem('language', language)
    },
  },
  mutations:{
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    },
  }
}
