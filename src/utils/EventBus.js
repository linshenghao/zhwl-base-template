/**
 * @author Deku
 * @date 2018/11/27
 * @Description:  自定义事件，通过发布订阅模式实现事件的监听
 * @function  on(监听事件)， dispatch（触发事件） removeHandler(删除某个事件)
*/

function EventTarget(){
  this.handlers = {};
}
EventTarget.prototype = {
  constructor: EventTarget,
  on: function(eventName, handler){
    if (!this.handlers[eventName]){
      this.handlers[eventName] = [];
    }
    this.handlers[eventName].push(handler);
  },
  dispatch:function(eventName){
    if(this.handlers[eventName]){
      var handlers = this.handlers[eventName];
      for(var i=0,len=handlers.length;i<len;i++){
        this.handlers[eventName][i](arguments[1]);
      }
    }
  },
  //加入key来删除对应的函数
  removeHandler: function(eventName, handler,Fnkey){
    if (this.handlers[eventName]){
      var handlers = this.handlers[eventName];
      for (var i=0, len=handlers.length; i < len; i++){
        if (handlers[i] === handler){
          break;
        }
      }
      handlers.splice(i, 1);

      //暂时这么写
      delete this.handlers[eventName]
    }
  }
};

export default EventTarget
