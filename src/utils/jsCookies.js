import jsCookie from "js-cookie";


var date=new Date();
date.setTime(date.getTime()+3*60*60*1000);//-----设置时间一个小时

export function getCookie (name="") {
  return jsCookie.get(name);
}

export function setCookie(name="",value=null,expires={expires:date}) {
  jsCookie.set(name,value, expires);
}
export function removeCookie(name="") {
  jsCookie.remove(name)
}
