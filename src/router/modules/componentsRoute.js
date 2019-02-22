/**
 * @author
 * @date 2018/11/30
 * @Description:  开发环境路由匹配
*/

let componentsRoute = []
if(process.env.NODE_ENV==='development') {  //判断是开发环境还是生产环境
  componentsRoute = [
     {
       path: '/DocHome',
       name: '组件文档',
       component: ()=>import('@/zhwl_doc/DocHome.vue'),
       hidden: true,
       meta: {
         requireAuth: true
       },
       iconCls:'fa fa-file-pdf-o',
       children: [
         {
           path: '/DocHome',
           name: 'infocard',
           iconCls:'fa fa-connectdevelop',
           component: ()=>import('@/zhwl_doc/doc/infocard.md'),
           hidden: true
         },
         {
           path: '/RiceText',
           name: '富文本',
           component: ()=>import('@/components/RichText/tinymce.vue'),
           hidden: true,
           iconCls:'fa fa-snapchat-square',
           meta: {
             requireAuth: true
           },
         },
         {
           path: '/Dialog',
           name: '弹框组件',
           component: ()=>import('@/zhwl_doc/doc/Dialog.md'),
           hidden: true,
           iconCls:'fa fa-snapchat-square',
           meta: {
             requireAuth: true
           },
         },
         {
           path: '/chatroom',
           name: '聊天室',
           component: ()=>import('@/pages/test/chatroom.vue'),
           hidden: true,
           iconCls:'fa fa-snapchat-square',
           meta: {
             requireAuth: true
           },
         },

         {
           path: '/magnifyingGlass',
           name: '放大镜',
           component: ()=>import('@/components/magnifyingGlass/index.vue'),
           hidden: true,
           iconCls:'fa fa-snapchat-square',
           meta: {
             requireAuth: true
           },
         },
         {
           path: '/zhimgUpload',
           name: '图片上传',
           component: ()=>import('@/components/test.vue'),
           hidden: true,
           iconCls:'fa fa-snapchat-square',
           meta: {
             requireAuth: true
           },
         }
       ]
     }
  ]
}else{
  componentsRoute = []
}


export default componentsRoute
