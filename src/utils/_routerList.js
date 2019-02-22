let routerList = [
    // {
    //   path:'/zhwl_doc_home',  //仓库管理
    //   name:'一卡通系统',
    //   parentId: 0,
    //   hidden: true,
    //   component: "Home",
    //   meta: {
    //     requireAuth: true
    //   },
    //   id:53,
    //   iconCls:'fa fa-bar-chart',
    //   roles:[],
    //   children:[{
    //     path:'/zhwl_doc_home/infocard',
    //     name:'动态字卡片',
    //     component:'infocard',
    //     id:55,
    //     iconCls:'fa fa-bar-chart',
    //     hidden: true,
    //     meta: {
    //       keepAlive: false,
    //       requireAuth: true
    //     },
    //   },{
    //     path:'/zhwl_doc_home/directive',
    //     name:'自定义指令',
    //     component:'zhDirective',
    //     id:66,
    //     iconCls:'fa fa-bar-chart',
    //     hidden: true,
    //     meta: {
    //       keepAlive: false,
    //       requireAuth: true
    //     },
    //   }]
    // },
  {
    path:'/payNum',  //仓库管理
    name:'职工刷卡',
    parentId: 0,
    hidden: true,
    component: "payNum",
    meta: {
      requireAuth: true
    },
    id:53,
    iconCls:'fa fa-bar-chart',
    roles:[],
    children:[]
  },
    // {
    //   path:'/Home',  //仓库管理
    //   name:'人员卡管理',
    //   parentId: 0,
    //   hidden: true,
    //   component: "Home",
    //   meta: {
    //     requireAuth: true
    //   },
    //   id:53,
    //   iconCls:'fa fa-bar-chart',
    //   roles:[],
    //   children:[{
    //     path:'/rechargeManage/rechargeCard',
    //     name:'卡号充值',
    //     component:'rechargeCard',
    //     id:55,
    //     iconCls:'fa fa-bar-chart',
    //     hidden: true,
    //     meta: {
    //       keepAlive: false,
    //       requireAuth: true
    //     }
    //   },{
    //     path:'/rechargeManage/rechargeRecord',
    //     name:'充值消费记录',
    //     component:'rechargeRecord',
    //     id:55,
    //     iconCls:'fa fa-bar-chart',
    //     hidden: true,
    //     meta: {
    //       keepAlive: false,
    //       requireAuth: true
    //     }
    //   }]
    // },
  {
    path:'/Home',  //信息管理
    name:'信息管理',
    parentId: 0,
    hidden: true,
    component: "Home",
    meta: {
      requireAuth: true
    },
    id:1,
    iconCls:'fa fa-bar-chart',
    roles:[],
    children:[{
      path:'/personnelFormation/personnelDetails',
      name:'人员登记',
      component:'personnelDetails',
      id:1,
      iconCls:'fa fa-bar-chart',
      hidden: true,
      meta: {
        keepAlive: false,
        requireAuth: true
      },
    },{
      path:'/personnelFormation/personnelRegistration',
      name:'人员类别信息',
      component:'personnelRegistration',
      id:2,
      iconCls:'fa fa-bar-chart',
      hidden: true,
      meta: {
        keepAlive: false,
        requireAuth: true
      }
    }]
  }

];
export {routerList};

