/**
 * 本地存储管理  业务存储
 */

export default class StorageHelp {

  constructor() {
  }

  /*
  *   获取
  * */
  static getStorage(key = '',type){
    let val = window.localStorage.getItem(key);
    return val && type === "object" ? JSON.parse(val) :val
  }
  /*
  *   设置
  * */
  static setStorage(key = '',val = '',type = 'string'){
    if(!key){
      throw new Error('没有key值啊')
    }
    type === "object" ?
      window.localStorage.setItem(key,JSON.stringify(val))
      : window.localStorage.setItem(key,val)
  }
  /*
  *   根据key 删除
  * */
  static removeStorage(key = ''){
    if(!key){
      throw new Error('没有key值啊')
    }
    window.localStorage.removeItem(key)
  }

  /*
  *   清除
  * */
  static clearStorage(){
    window.localStorage.clear()
  }
  /*
  *
  * */
  getSearchStorage() {
    let seachList = getStorage(StorageHelp.SEARCHKEY,'object');
    return seachList;
  }

  getPersonInfo() {
    let seachList = getStorage(StorageHelp.SEARCHKEY,'object');
    return seachList;
  }

  setSearchStorage(seachName) {
    let seachList =  getStorage(StorageHelp.SEARCHKEY,'object');
    if (seachList.length == 0) {
      seachList = [];
    }
    let result = seachList.find((value, index, arr) => {
      return value == seachName;
    })
    if (result == undefined) {
      seachList.push(seachName);
      //最多储存20条搜索记录
      if (seachList.length > 20) {
        seachList.shift();
      }
      setStorage(StorageHelp.SEARCHKEY,seachList,'object');
    }
  }

  setPersonInfoStorage(personInfo) {
    setStorage(StorageHelp.PERSONINFOKEY,personInfo,'object');
  }

  cleanPersonInfoStorage(successFn) {
    removeStorage(StorageHelp.PERSONINFOKEY);
    if (successFn) {
      successFn(res);
    }
  }

  cleanSearchStorage(successFn) {
    removeStorage(StorageHelp.SEARCHKEY);
    if (successFn) {
      successFn(res);
    }
  }

  cleanAll(successFn) {
    clearStorage();
    if (successFn) {
      successFn(res);
    }
  }
}

// 搜索的关键字
StorageHelp.SEARCHKEY = 'searchInfo';
//  个人信息
StorageHelp.PERSONINFOKEY = 'personInfo';
//  历史记录
StorageHelp.HISTORY = 'historyList';
//当前类版本
StorageHelp.VERSION = '0.0.1';



