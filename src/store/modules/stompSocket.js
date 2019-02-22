import {socketSplit} from '../../utils/socket_split'
import '../../lib/sockjs'
import '../../lib/stomp'
export const stompSocket = {
  namespaced: true,
  state:{
    //  stomp: Stomp.over(new SockJS("/ws/endpointChat"))
    //  websockket  连接
    stomp: null,
    //  菜单信息
    menuInfo:{},
    //  商家路由信息
    businessSocketInfo:{}
  },
  mutations: {
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
      if(Object.keys(state.businessSocketInfo).length <= 0){
        if(businessSocketInfo.unprocessedMessage>0){
          state.businessSocketInfo = businessSocketInfo;
        }else{
          state.businessSocketInfo = {}
        }
      }else{
        if(Object.keys(businessSocketInfo).length > 0){
          if(parseInt(businessSocketInfo.time)> parseInt(state.businessSocketInfo.time)){
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
      return new Promise((resolve,reject)=>{
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
      });
    },
    //发送消息到服务端
  }
};
