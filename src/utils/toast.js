import {Message} from 'element-ui'
/**
 * @date 2019/1/11
 * @Description:
 * @param
*/
export default class Toast{
  constructor(){

  }
  //上线的时候会给提示
  static show({title = '',type = '',message = '',icon = '',duration = 1000}){
    Message({
      message: message||title,
      type: type
    })
  }

  //  上线的时候不提示
  static showlog({title = '',type = '',message = '',icon = '',duration = 1000}){
    // todo 写一个区分开发环境、测试环境、生产环境的区别
    if(process.env.pathType === 'local'){
      Message({
        message: message||title,
        type: type
      })
    }else{
      Message({
        message: message,
        type: type
      })
      console.error(message)
    }

  }
}
