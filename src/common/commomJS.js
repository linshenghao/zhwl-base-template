import jsCookie from 'js-cookie'

//挂载在window上的公共方法

//es5中判断是否是数组
window.isArr = function (arr) {
  return Object.prototype.toString.apply(arr) === '[object Array]';
};


//深克隆-----对象 || 数组
window.deepClone = function (source){
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {}
        targetObj[keys] = deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
};

//初始化对象的所有值
window._initObject = function (source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {}
        targetObj[keys] = deepClone(source[keys])
      } else {
        targetObj[keys] = ""
      }
    }
  }
  return targetObj
};
window.clone = function (obj) {
  let temp = null;
  if(obj instanceof Array){
    temp = obj.concat();
  }else if(obj instanceof Function){
    temp = obj;
  }else{
    temp = new Object();
    for(let item in obj){
      let val = obj[item];
      if (typeof val != 'object')
        temp[item] = val;
    }
  }
  return temp;
};



window.zhwl = {
    /*
    *   获取每个月的第一天
    * */
    getFirstDate(){
      let _data = new Date();
      let year = _data.getFullYear(), mouth = _data.getMonth() + 1;
      if(mouth<10){
        mouth = '0' + mouth;
      }
      return year + '-' + mouth + '-' + '01';
    }
};




//判断数组中是否有某个值
window.hasvalueArr = function (arr,val) {
  let flag = false;
  for(var i in arr){
    if(arr[i]==val){
      flag = true;
      return flag;
      break
    }
  }
  return flag;
};


var date=new Date();
date.setTime(date.getTime()+60*60*1000);//-----设置时间一个小时
window.setCookie = function (name="",value=null,expires={expires:date}) {
  jsCookie.set(name,value, expires);
}
window.getCookie = function (name="") {
  return jsCookie.get(name);
}
window.removeCookie = function (name="") {
  jsCookie.remove(name)
}

//  转换成日期格式
window.formatDate = function (value) {
  var date = new Date(value);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  return year + "-" + month + "-" + day;
};

//  去掉所以空格

window.Trim = function(str,is_global) {
  var result;
  result = str.replace(/(^\s+)|(\s+$)/g,"");  //  只匹配开头和结尾是否有空格
  if(is_global.toLowerCase()=="g")
  {
    result = result.replace(/\s/g,"");  //  如果传入 g 的话，证明清除所有的空格。
  }
  return result;
}



//手机号中间带星号
window.changPhone = function (phone) {
  var str2 = "";
  if(phone){
    var str = JSON.stringify(JSON.parse(phone));
    str2 = str.substr(0,3)+"****"+str.substr(7);
  }
  return str2;
};

//获取一个月的最后一天
window.getlastMonth = function () {
  var curDate = new Date();
  /* 获取当前月份 */
  var curMonth = curDate.getMonth();
  /*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
  curDate.setMonth(curMonth + 1);
  /* 将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的 */
  curDate.setDate(0);
  /* 返回当月的天数 */
  return curDate.getDate();
};
window.getlastMonthTime = function () {
  var curDate = new Date();
  /* 获取当前月份 */
  var curMonth = curDate.getMonth();
  /*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
  curDate.setMonth(curMonth + 1);
  /* 将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的 */
  curDate.setDate(0);
  /* 返回当月的天数 */
  return curDate.getTime();
};


// 匹配是否是数字
window.checkNumber = function (value) {
  let res = /^[0-9]*$/
  if (!res.test(value)){
      return false
  }else {
    return true
  }
};

//  获取当前的年月日
window.getNowDate  = function () {
  let data = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var s = date.getSeconds();
  if(hours<10){
    hours = "0"+hours;
  }
  if(minutes<10){
    minutes = "0"+minutes;
  }
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  return year + "-" + month + "-" + day ;
};

//  获取当前的具体时间
window.getNowDateTime  = function () {
  let data = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var s = date.getSeconds();
  if(hours<10){
    hours = "0"+hours;
  }
  if(minutes<10){
    minutes = "0"+minutes;
  }
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  return hours + ":" + minutes+":"+ s;
}

window.formatDateTime = function (value) {
  var date = new Date(value);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var s = date.getSeconds();
  if(hours<10){
    hours = "0"+hours;
  }
  if(minutes<10){
    minutes = "0"+minutes;
  }
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  return year + "-" + month + "-" + day + ' ' + hours + ":" + minutes+":"+ s;
}

//校验格式
//获得当前浏览器的信息
/*
window.BROWSER.versions.trident//IE内核
window.BROWSER.versions.presto//opera内核
window.BROWSER.versions.webKit//苹果、谷歌内核
window.BROWSER.versions.gecko//火狐内核
window.BROWSER.versions.mobile//是否为移动终端
window.BROWSER.versions.ios//ios终端
window.BROWSER.versions.android//android终端或者uc浏览器
window.BROWSER.versions.iPhone//是否为iPhone或者QQHD浏览器
window.BROWSER.versions.iPad//是否iPad
window.BROWSER.versions.webApp//是否web应该程序，没有头部与底部
*/
window.BROWSER = {
  versions: (function () {
    var u = navigator.userAgent, app = navigator.appVersion;
    return {//移动终端浏览器版本信息
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*!/) || !!u.match(/AppleWebKit/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
      iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
    };
  })(),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
};

//获得ie的版本号
window.BROWSER_IE_versions= function () {
  var UA = navigator.userAgent,
    isIE = UA.indexOf('MSIE') > -1,
    v = isIE ? /\d+/.exec(UA.split(';')[1]) :-1;
  return v;
};

//价格格式
window.numberFormat=function(number, decimals, dec_point, thousands_sep,roundtag){
  /*
  * 参数说明：
* number：要格式化的数字
  * decimals：保留几位小数
  * dec_point：小数点符号
  * thousands_sep：千分位符号
  * roundtag:舍入参数，默认 "ceil" 向上取,"floor"向下取,"round" 四舍五入
  * */
  number = (number + '').replace(/[^0-9+-Ee.]/g, '');
  roundtag = roundtag || "ceil"; //"ceil","floor","round"
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 2 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      console.log();
      return '' + parseFloat(Math[roundtag](parseFloat((n * k).toFixed(prec*2))).toFixed(prec*2)) / k;
    };
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  var re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, "$1" + sep + "$2");
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
};


/*
//获取地点坐标
window.getLocation=function(address,callbak){
  $.getJSON(`https://restapi.amap.com/v3/geocode/geo1?address=${address}&key=cab8a7b0e96afa1ed91c1eead856f6de`,
    function(json){
      if('status' in json){
        callbak(null)
      }else{
        //console.log(json);
        if(json.geocodes.status=='1'){
          //geocodes.location
          //console.log('坐标值:',json.geocodes.location);
          callbak(json.geocodes.location)
        }else{
          callbak(null)
        }
      }
    });
}
/!*替换邮箱字符*!/
window.regEmail=function(email) {
  var new_email="";
  if (String(email).indexOf('@') > 0) {
    var str = email.split('@'),
      _s = '';
    var arr=email.lastIndexOf('@');
    if (str[0].length > 3) {
      for (var i = 2; i < arr-2; i++) {
        _s += '*';
      }
    }
    new_email = str[0].substr(0, 2) + _s+email.substr(email.lastIndexOf('@')-2);
  }
  return new_email;
}
/!**
 * 判断input输入框各种限制
 * value == 输入框的值
 * type == 需要验证的类型  {
 *      phone-->手机号
 *      mail -->邮箱
 *      identitycard -- > 身份证
 *      cncode -- > cn号
 *      figure -- >只能输入数字
 *      SBCcase ---> 全角半角转换
 *      mailcode --->邮政号码
 *      bankcart---银行卡
 *      Business_license---营业执照
 *      officephone------办公电话/^([0-9]|(1[0-5]))$/
 *
 *      bankcardfor 招商银行和中国邮政
 * }
 *!/
//var reg = /^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$/;
window.input=function(val, type,Bankcardcode){
  let value = val;
  if(type == "phone"){//手机号
    if(!(/^1[34578]\d{9}$/.test(value))){
      return false;
    }else {
      return true;
    }
  }else if(type == "figure"){
    value=value.replace(/\D/g,'');
    return value;
  }else if(type == "identitycard"){//身份证
    if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value))){
      return false
    }else{
      return true
    }
  }else if(type == 'SBCcase'){
    var str = value;
    var result = "";
    var len = str.length;
    for(var i=0;i<len;i++)
    {
      var cCode = str.charCodeAt(i);
      //全角与半角相差（除空格外）：65248（十进制）
      cCode = (cCode>=0xFF01 && cCode<=0xFF5E)?(cCode - 65248) : cCode;
      //处理空格
      cCode = (cCode==0x03000)?0x0020:cCode;
      result += String.fromCharCode(cCode);
    }
    result=result.trim();
    return result
  }else if(type == "mail"){//邮箱
    if(!(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(value))){
      return false
    }else{
      return true
    }
  }else if(type == "mailcode"){//邮政编码
    if(!(/^[1-9][0-9]{5}$/.test(value))){
      return false
    }else{
      return true
    }
  }
  else if(type == "bankcart"){//判断所有的银行卡
    //开头6位
    var strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
    if(strBin.indexOf(value.substring(0, 2)) == -1) {
      return false;
    }
    if(!(/(^\d{16}$)|(^\d{15}$)|(^\d{18}$)|(^\d{19}$)|(^\d{17}(\d|X|x)$)/.test(value))){
      return false
    }else{
      return true
    }
  }else if(type == "bankcardforzhaogshang"){//判断招商银行卡
    //开头6位
    var strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
    if(strBin.indexOf(value.substring(0, 2)) == -1) {
      return false;
    }
    if(!(/(^\d{16}$)|(^\d{15}(\d|X|x)$)/.test(value))){
      return false
    }else{
      return true
    }
  }else if(type == "bankcardforyouzheng"){//判断邮政银行卡
    //开头6位
    var strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
    if(strBin.indexOf(value.substring(0, 2)) == -1) {
      return false;
    }
    if(!(/(^\d{18}$)|(^\d{19}$)|(^\d{18}(\d|X|x)$)/.test(value))){
      return false
    }else{
      return true
    }
  }else if(type == "Business_license"){//判断商业执照
    if(!(/^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$/.test(value))){
      return false
    }else{
      return true
    }
  }else if(type == "officephone"){//判断办公电话
    if(!(/^(\(d{3,4}\)|\d{3,4}-|\s)?\d{0,15}$/.test(value))){
      return false
    }else{
      return true
    }
  }else if(type == "number"){//判断是否是数字
    if(!(/^[0-9]{1,20}$/.test(value))){
      return false
    }else{
      return true
    }
  }
};*/

