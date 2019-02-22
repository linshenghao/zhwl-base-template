import Vue from 'vue'
import Router from 'vue-router'
import componentsRoute from './modules/componentsRoute.js'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('@/pages/login/Login'),
      hidden: true
    },
    {
      path: '/Home',
      name: '首页',
      component: () => import('@/pages/layout/Home'),
      hidden: true,
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: '/Home',
          name: '主页',
          component: () => import('@/pages/firstPage.vue'),
          hidden: true,
          meta: {
            requireAuth: false
          },
        }, {
          path: '/Nofound404',
          name: '404页面',
          component: () => import('@/pages/errorpage/Nofound404.vue'),
          hidden: true,
          meta: {
            requireAuth: true,
            // isHiddenBar:true   //判断是否需要在tabbar中展示   true的话就不显是bar  false的话就显示bar,不填的话就显示
          },
        }, {
          path: '/personalCenter',
          name: '个人中心',
          component: import('@/pages/system/PersonalCenter'),
          meta: {
            keepAlive: false,
            requireAuth: true
          }
        }, {
          path: '/setting',
          name: '设置',
          component: import('@/pages/system/Setting'),
          meta: {
            keepAlive: false,
            requireAuth: true
          }
        }
      ]
    },
    ...componentsRoute
  ]
})
