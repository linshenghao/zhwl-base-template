import Vue from 'vue'
Vue.filter("formatDate", formatDate);
Vue.prototype.formatDate = formatDate;

//时间戳转换
function formatDate(value) {
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
}

//通过时间过去星期

Vue.filter("formatDay",function formatDay(str) {
  if(str){
    let weekDay = new Date(str).getDay();
    if(weekDay===1){
      return "星期一"
    }else if(weekDay===2){
      return "星期二"
    }else if(weekDay===3){
      return "星期三"
    }else if(weekDay===4){
      return "星期四"
    }else if(weekDay===5){
      return "星期五"
    }else if(weekDay===6){
      return "星期六"
    }else if(weekDay===0){
      return "星期天"
    }
  }
})

//时间戳转换带上时间
Vue.filter("formatDateTime", function formatDateTime(value) {
  var date = new Date(value);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  let scored = date.getSeconds();
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
  return year + "-" + month + "-" + day + " " + hours + ":" + minutes+":"+scored;
});

//全局过滤测试------------使用方法{{ phone | phone}}----前一个是值，后一个是过滤方法
Vue.filter("changPhone",function changePhone(phone) {   //
  var str2 = "";
  if(phone){
    var str = JSON.stringify(JSON.parse(phone));
    str2 = str.substr(0,3)+"****"+str.substr(7);//转化成123*****55555
  }
  return str2;
});

