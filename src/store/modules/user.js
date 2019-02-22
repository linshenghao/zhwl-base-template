import {getCookie,setCookie,removeCookie} from '../../utils/jsCookies'
// import { Notification } from 'element-ui';
import {socketSplit} from '../../utils/socket_split'
import '../../lib/sockjs'
import '../../lib/stomp'

let date=new Date();
date.setTime(date.getTime()+3*60*60*1000);//-----设置时间三个小时

export const user = {
  state:{
    user: {
      id: getCookie('user' || '[]') == null ? '' : JSON.parse(getCookie('user' || '[]')).id,
      name: getCookie('user' || '[]') == null ? '' : JSON.parse(getCookie('user' || '[]')).name,
      userface: getCookie('user' || '[]') == null ? '' : JSON.parse(getCookie('user' || '[]')).userface,
      username: getCookie('user' || '[]') == null ? '' : JSON.parse(getCookie('user' || '[]')).username,
      phone: getCookie('user' || '[]') == null ? '' : JSON.parse(getCookie('user' || '[]')).phone,
      telephone: getCookie('user' || '[]') == null ? '' : JSON.parse(getCookie('user' || '[]')).telephone,
      address: getCookie('user' || '[]') == null ? '' : JSON.parse(getCookie('user' || '[]')).address,
      remark: getCookie('user' || '[]') == null ? '' : JSON.parse(getCookie('user' || '[]')).remark,
      roles: getCookie('user' || '[]') == null ? '' : JSON.parse(getCookie('user' || '[]')).roles,
      shopBasic: getCookie('user' || '[]') == null ? '' : JSON.parse(getCookie('user' || '[]')).shopBasic,
      userType: getCookie('user' || '[]') == null ? '' : JSON.parse(getCookie('user' || '[]')).userType
    },
    routes: [],
    msgList: [],
    isDotMap: new Map(),
    currentFriend: {},
    // stomp: Stomp.over(new SockJS("/ws/endpointChat")),-------------暂时关闭websocket
    nfDot: false,
    buttonNumbers:[],
    stomp: null,  //websockket  连接
    menuInfo:{},
    businessSocketInfo:{}
  },
  mutations: {
    initMenu(state, menus){
      state.routes = menus;
      // window.localStorage.getItem()
    },
    login(state, user){
      state.user = user;
      setCookie('user', JSON.stringify(user),{expires:date});
    },
    clearRoute(){
      state.routes = [];
    },
    logout(state){
      removeCookie('user');//移除cookie
      state.routes = [];
      state.user = null;
      state.buttonNumbers = [];
    },
    toggleNFDot(state, newValue){
      state.nfDot = newValue;
    },
    updateMsgList(state, newMsgList){
      state.msgList = newMsgList;
    },
    updateCurrentFriend(state, newFriend){
      state.currentFriend = newFriend;
    },
    addValue2DotMap(state, key){
      state.isDotMap.set(key, "您有未读消息")
    },
    removeValueDotMap(state, key){
      state.isDotMap.delete(key);
    },
    initButton(state, buttonNumbers){
      state.buttonNumbers = buttonNumbers;
    },

    getMenuInfo(state,body){
      let menInfos = JSON.parse(body);
      //判断此时的state.menuInfo是否有数据
      if(Object.keys(state.menuInfo).length <= 0){
        //判断消息是否大于0条
        if(menInfos.unprocessedMessage>0){
          state.menuInfo = menInfos;
        }else{
          state.menuInfo = {}
        }
      }else{
        if(Object.keys(menInfos).length > 0){
          //判断之前的数据和新来的数据的时间
          if(parseInt(menInfos.time)> parseInt(state.menuInfo.time)){
            //判断消息是否大于0条
            if(menInfos.unprocessedMessage>0){
              state.menuInfo = menInfos;
            }else{
              state.menuInfo = {}
            }
          }
        }
      }
    },
    getbusinessSocketInfo(state,body){
      let businessSocketInfo = JSON.parse(body);
      //判断此时的state.menuInfo是否有数据
      if(Object.keys(state.businessSocketInfo).length <= 0){
        //判断消息是否大于0条
        if(businessSocketInfo.unprocessedMessage>0){
          state.businessSocketInfo = businessSocketInfo;
        }else{
          state.businessSocketInfo = {}
        }
      }else{
        if(Object.keys(businessSocketInfo).length > 0){
          //判断之前的数据和新来的数据的时间
          if(parseInt(businessSocketInfo.time)> parseInt(state.businessSocketInfo.time)){
            //判断消息是否大于0条
            if(businessSocketInfo.unprocessedMessage>0){
              state.businessSocketInfo = businessSocketInfo;
            }else{
              state.businessSocketInfo = {}
            }
          }
        }
      }
    }

  },
  actions: {
    //websocket订阅
     connect(context,str){
/*       return new Promise((resolve,reject)=>{
           //获取 STOMP 子协议的客户端对象
           context.state.stomp = Stomp.over(new SockJS("/backstage/ws/webSocket"));
           //向服务器发起websocket连接并发送CONNECT帧
           context.state.stomp.connect({}, frame=> {
            // 连接成功时（服务器响应 CONNECTED 帧）的回调方法
            //STOMP 客户端要想接收来自服务器推送的消息，必须先订阅相应的URL，即发送一个 SUBSCRIBE 帧，然后才能不断接收来自服务器的推送消息；
            //  var subscription = client.subscribe(...); 取消订阅subscription.unsubscribe();

             //判断角色，发布订阅
             socketSplit(context.state.user&&context.state.user.userType?context.state.user.userType:0,context,context.state.stomp,resolve);

             //关闭stomp日志
             context.state.stomp.debug = null;

           },failedMsg=> {
               console.log("websocket,链接失败")
           });
         });*/
     },
    //发送消息到服务端

  }
};


