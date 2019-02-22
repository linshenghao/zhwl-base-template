import Cookies from 'js-cookie'

//设置 Symbol 私有属性
const _defaultTime = Symbol('defaultTime');

export default class Session{
  static [_defaultTime] = new Date()
  constructor(){}
  /*
  *   设置，私有的默认时间，不予许修改
  * */
  static get getDefaultTime(){
      return this[_defaultTime].setTime(this[_defaultTime].getTime() + 7*24*60*60*1000)
  }

  static getToken(TOKEN_KEY = "token"){
    return Cookies.get(TOKEN_KEY)
  }

  static setToken(TOKEN_KEY = "token",token,time){
    return Cookies.set(TOKEN_KEY, token,{expires:time||this.getDefaultTime})
  }

  static clearToken(TOKEN_KEY = "token"){
    return Cookies.remove(TOKEN_KEY)
  }

}
