//form表单公共匹配规则

export const commomRules = {
  name: [{required: true, message: '必填:姓名', trigger: 'blur'}],
  age: [{
    required: true, message: "必填:年龄", trigger: 'blur'
  }
    , {pattern: /^[0-9]{1,20}$/, message: '年龄必须为数字', trigger: 'blur'}],
  idcard: [{
    required: true,
    message: '必填:身份证号码',
    trigger: 'blur'
  }, {
    pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
    message: '身份证号码格式不正确',
    trigger: 'blur'
  }],
  birthday: [{required: true, message: '必填:出生日期', trigger: 'blur'}],
  gender: [{required: true, message: '必填:性别', trigger: 'blur'}],
  email: [{required: true, message: '必填:电子邮箱', trigger: 'blur'}, {
    type: 'email',
    message: '邮箱格式不正确',
    trigger: 'blur'
  }],
  phone: [{required: true, message: '必填:电话号码', trigger: 'blur'}, {
    pattern: /^1[3|4|5|8][0-9]\d{4,8}$/,
    message: '手机号码格式不正确',
    trigger: 'blur'
  }],
  username: [
    {required: true, message: '必填:登录用户名', trigger: 'blur'},
    {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '必填:登录密码', trigger: 'blur'},
  ],
};
