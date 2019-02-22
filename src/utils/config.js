'use strict';
/**
 * 用于处理 分页的结果
 * @param {Object,Object} list 获取到的数据,Vue当前的实例对象
 */
const __initPage = function (Vue,list) {
  Vue.total = list.totalResult;  //总条数
  Vue.totalPage = list.totalPage;  //总页数
  Vue.page = list.page;   //当前页
  Vue.size = list.size; //每页总数
};

/**
 * 用于统一清除所有表单的校验----在重新打开或者关闭弹框的时候....
 * @param {}
 */
const _clearForm = function (Vue,formName) {
  Vue.$refs[formName].clearValidate()
}
/*
* 重置表单
* */
const _resetForm = function (Vue,formName) {
  Vue.$refs[formName].resetFields();
}

export {__initPage,_clearForm,_resetForm}
