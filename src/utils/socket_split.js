import { Notification } from 'element-ui';
export function socketSplit(userType,context,stomp,resolve) {
  if(stomp){
    //判断是否是管理员
    if(userType===1){
      stomp.subscribe("/backstage/topic/shopAudit", message=> {
        context.commit('getMenuInfo',message.body)
        if(message.body){
          if(JSON.parse(message.body).unprocessedMessage>0){
            Notification({
              type:'info',
              title: '消息',
              dangerouslyUseHTMLString: true,
              message: `<p style="color: #5573b6">${JSON.parse(message.body).menuName}有 ${JSON.parse(message.body).unprocessedMessage} 条信息待处理</p>`,
              duration: 0
            });
          }
        }
        //通知服务器，已经收到消息
        message.ack();
        resolve(true)
      })
    }
    //判断是否是商家
    if(userType===2){
      stomp.subscribe(`/backstage/user/${context.state.user.username}/shop/settledAudit`, message=> {
        console.log("商家订阅",message)
        context.commit('getbusinessSocketInfo',message.body);

        if(message.body){
          //判断是否消息是否多余0条
          if(JSON.parse(message.body).unprocessedMessage>0){
            Notification({
              type:'info',
              title: '消息',
              dangerouslyUseHTMLString: true,
              message: `<p style="color: #5573b6">${JSON.parse(message.body).menuName}有 ${JSON.parse(message.body).unprocessedMessage} 条信息待处理</p>`,
              duration: 0
            });
          }
        }
        message.ack();
        resolve(true)
      })
    }
  }
}
