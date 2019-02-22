// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import ZhUI from '../zhwlUI/main.js'
import axios from 'axios'
//  ele css样式
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
//  Progress 进度条
import NProgress from 'nprogress'
//  Progress 进度条样式
import 'nprogress/nprogress.css'
//  浅封装的axios方法
import {getRequest,uploadbaseToqiniu,postRequest,postjsonRequest,putjsonRequest,deleteRequest,putRequest} from './utils/api'
//  权限按钮和动态路由函数
import {initMenu,initButton,hasButton} from './utils/utils'
// import {isNotNullORBlank} from './utils/utils'
//  挂载在window上的方法
import {Commomfu} from "./common/commomJS";
//  过滤
import './filters/index'
import 'font-awesome/css/font-awesome.min.css'
//  公共的样式
import './assets/styles/commom.less'
import './styles/cssPrefix/cssPrefix.less'
//  修改的element ui 的样式
import "./assets/eleStyle/elementUi.less";
//  阿里巴巴图标库
import './assets/iconfont/zhwl_version_0.0_icon/iconfont.js'

import {__initPage,_clearForm,_resetForm} from './utils/config.js'
//  jscookie
import jsCookie from 'js-cookie'
//  自定义过滤
import './directive/index.js'

Vue.prototype.$http= axios;
Vue.prototype.$hasButton = hasButton;
import qs from 'qs';
Vue.prototype.$qs = qs;
// icon图标
import '@/icons'

//开发文档
// import demoBlock from './zhwl_doc/demo-block.vue'
// import './zhwl_doc/assert/md.less'
// Vue.component('demo-block', demoBlock);

if(process.env.NODE_ENV==='development'){  //判断是开发环境还是生产环境---开发坏境使用的开发文档
  const zhwlBlock = resolve => require(['./zhwl_doc/zhwl-block.vue'], resolve);
  Vue.component('zhwl-block', zhwlBlock)
}


//使用websocket
// import VueSocketio from 'vue-socket.io';
// import socketio from 'socket.io-client';
// Vue.use(VueSocketio, socketio('/ws/webSocket'));


Vue.config.productionTip = false
Vue.use(ElementUI);//使用element ui
Vue.use(ZhUI);//使用自己的UI控件

//  异步加载代码--------------代码分割，减少一开始加载时的代码时间
// require.ensure([],function (require) {
//   var list = require( './utils/api');
//   console.log(list)
// });

Vue.prototype.zhwl = {
  // jsCookiethis.zhwl.jsCookie.get('key')  this.zhwl.jsCookie.set('key')
  jsCookie,
  // get请求
  getRequest,
  // post 请求content-type为form
  postRequest,
  // post 请求  content-type为json
  postjsonRequest,
  // 更新请求-------content-type为json
  putjsonRequest,
  // 删除的请求
  deleteRequest,
  // 更新的请求-----content-type为form
  putRequest,
  // 判断数据是否为空
  // isNotNullORBlank,
  // 上传图片
  uploadbaseToqiniu,
  // 分页初始化
  __initPage,
  // 清除表单
  _clearForm,
  // 重置表单
  _resetForm
}
// 使用

/*
*   在路由跳转前，进行路由的动态加载......
* */
router.beforeEach((to, from, next) => {
  /* if(to.matched.length<=0){
    next({path: '/', query: {redirect: to.path}});
  } */
  NProgress.start();
  if (to.name == 'Login') {
    next();
    NProgress.done()
    return;
  }
  const ID = store.state.user.id;
  console.log(ID)
  // 设置cook过期或者没有时调回登录
  if (!ID) {
    /*
    *   未登录拦截
    * */
    // if (to.meta.requireAuth || to.name == null) {
    //   next({path: '/', query: {redirect: to.path}})
    // } else {
    //   next();
    // }
    next({path: '/', query: {redirect: to.path}});
    // window.location.reload()
    NProgress.done()
  } else {
    // 判断两次的当前页面和去往页面是否一样，一样的话就不再去调用菜单
    if (to.path !== from.path) {
      initMenu(router, store);
      initButton(router, store);
    }
    if (to.path=='/chat') {
      store.commit( "updateMsgList", []);
    }
    next();
    NProgress.done()
  }
}
);

router.afterEach(() => {
  NProgress.done() // 结束Progress
});
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
