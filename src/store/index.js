import Vue from 'vue'
import Vuex from 'vuex'
import {user} from './modules/user.js';
import {count} from './modules/count.js';
import {errorLog} from './modules/errorLog.js';
import {stompSocket} from './modules/stompSocket.js';
import {app} from './modules/app.js';
import {layout} from './modules/layout/index'

//vuex状态持久化
// import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex);



export default new Vuex.Store({
  modules:{
    app,
    count,
    errorLog,
    stompSocket,
    layout
  },
  ...user,
  // plugins: [createPersistedState()],
});
