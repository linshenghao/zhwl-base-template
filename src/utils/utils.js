import {getRequest} from './api'
import {Message} from 'element-ui'
import {routerList} from './_routerList.js'
import axios from 'axios'
import store from "../store";
let registerRouteFresh = true
export const initMenu = (router, store)=> {
  if (store.state.routes.length > 0) {
    // let fomatroter = formatRoutes(window.deepClone(store.state.routes))
    // router.addRoutes(fomatroter);
    // console.log(router)
    return;
  }
  let fmtRoutes = [];
  function getList() {
    axios({
      method:'get',
      url:'/backstage/config/sysMenu'
    }).then((response=>{
      if(response.data.status == 1){//成功
        console.log("返回数据",response.data.data)
        fmtRoutes = formatRoutes(response.data.data);
        if(registerRouteFresh){
          router.addRoutes(fmtRoutes);
          registerRouteFresh = false
        }
        store.commit('initMenu', fmtRoutes);
      }else{//失败
        Message.error({message: response.msg});
        router.push('/');
      }
    })).catch((error=>{
      Message.error({message: error});
      /*
      *  在后台重启的时候，重定向到当前路由...
      * */
      router.push({path: '/', query: {redirect:router.currentRoute.path}});
    }));
  }
  getList();
  return fmtRoutes;
};
export const isNotNullORBlank = (...args)=> {
  for (var i = 0; i < args.length; i++) {
    var argument = args[i];
    if (argument == null || argument == '' || argument == undefined) {
      Message.warning({message: '数据不能为空!'})
      return false;
    }
  }
  return true;
};
export const formatRoutes = (routes)=> {
  let fmRoutes = [];
  routes.forEach(router=> {
    let {
      path,
      component,
      menuName,
      meta,
      iconCls,
      children
    } = router;
    if (children && children instanceof Array) {
       children = formatRoutes(children);
    }

    let fmRouter = {
      path: '/'+component,
      component(resolve){
        if (component.startsWith("Home")) {
          require(['../pages/layout/' + component + '.vue'], resolve)
        }else if(component.startsWith("War")||component.startsWith("war")){
          require(['../pages/' + component + '.vue'], resolve)
        } else if(component.startsWith("infocard")){
          require(['../zhwl_doc/doc/' + component + '.md'], resolve)
        }  else if(component.startsWith("firstPage")){
          require(['../pages/' + component + '.vue'], resolve)
        } else if(component.startsWith("zhDirective")){
          require(['../pages/' + component + '.vue'], resolve)
        } else if(component.startsWith("Sys")){
          require(['../pages/system/' + component + '.vue'], resolve)
        }else if(component.startsWith("Personal")){
          require(['../pages/system/' + component + '.vue'], resolve)
        } else if(component.startsWith("Setting")){
          require(['../pages/system/' + component + '.vue'], resolve)
        } else{
          require(['../pages/errorpage/Nofound404.vue'], resolve)
        }
      },
      name: menuName,
      iconCls: iconCls,
      meta: meta,
      children: children
    };
    fmRoutes.push(fmRouter);
  })
  return fmRoutes;
};



export const initButton = (router, store)=> {
  if (store.state.buttonNumbers.length > 0) {
    return;
  }
  axios({
    method:'get',
    url:'/backstage/config/sysButton'
  }).then((response=>{
    if(response.data.status === 1){//成功
      store.commit('initButton', response.data.data);
    }else{//失败
      Message.error({message: response.msg});
      router.push('/');
    }
  })).catch((error=>{
  }));
};

export const hasButton = (val) =>{
  let buttonList = store.state.buttonNumbers;
  for(let i in buttonList){
    if (val === buttonList[i])
      return true;
  }
  return false;
};
