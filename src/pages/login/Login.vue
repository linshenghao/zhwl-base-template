<template xmlns:v-focus="http://www.w3.org/1999/xhtml">
  <div id="login">
    <div id="login-box">
      <div style="position: relative">
        <div class="login_loading" v-if="loginloading">
          正在登录，请稍后...
        </div>
      </div>
      <div>
        <img class="login_logo" src="../../assets/img/logo/zhwllogolink.png" alt="">
      </div>

      <h4 class="t">
        居家服务
      </h4>

      <div class="title">
        用户登录
      </div>

      <div class="input_b">
        <label><img :src="src.icon.admin_icon_user"/></label>
        <input type="text" v-model="loginInfo.username" class="un" v-on:keyup.13="setLogin"
               placeholder="用户名">
      </div>
      <div class="input_b">
        <label><img :src="src.icon.admin_icon_password"/></label>
        <input type="password" v-model="loginInfo.password" class="pw" v-on:keyup.13="setLogin"
               placeholder="密码">
        <div>

        </div>
      </div>
      <div class="input_b input_v">
        <input type="text" class="pw" v-model="loginInfo.validateCode" v-on:keyup.13="setLogin" maxlength="4"
               placeholder="请输入验证码">
        <img class="imgcode" id="vcode" @click="getCode($event)"
             :src="'/backstage/code/generate'" alt="">
        <span
          class="imgtext"
          @click="getCode($event)">换一换</span>
      </div>
      <div>
        <button class="login_btn" @click="setLogin()">登录</button>
      </div>
    </div>
    <div id="login-base">
      <a href="http://www.miitbeian.gov.cn">
        广州众合未来信息科技有限公司  粤ICP备18021768号
      </a>
    </div>
  </div>
</template>
<script>
  import md5 from 'js-md5/build/md5.min';
  import {resource} from '../../config/base/index.js'
  export default{
    data(){
      return {
        message: '',
        active: "",
        loginInfo: {
          username: '',
          password: '',
          validateCode: ''
        },
        img: '',
        loginloading: false,
        src:resource
      }
    },
    mounted(){

    },
    methods: {
      getCode(e){
        document.getElementById("vcode").src = '/backstage/code/generate?v' + Math.random();
//        e.target.src = '/code/generate?v'+Math.random();
      },

      //登录成功后触发websocket请求
      getWebSocketApi(){
        this.$store.dispatch('connect',"socket连接");
      },

      setLogin(){
          this.loginloading = true;
        let params = {
          username: this.loginInfo.username,
          password: md5(this.loginInfo.password),
          validateCode: this.loginInfo.validateCode
        };
        this.zhwl.postRequest('/login', params).then(resp => {
          console.log(resp)
          let data = resp.data;
          if (data.status == "error") {
            this.$message.error({message: data.msg});
            document.getElementById("vcode").src = '/backstage/code/generate?v' + Math.random();
          }
          else {
            this.$store.commit('login', data.msg);  //保存session
            const path = this.$route.query.redirect || '/Home';
            try {
              this.$router.push({path: path == '/' || path == undefined ? '/Home' : path});
            }catch (err){
              console.log(err)
            }
            console.log(path);
          }
        }).catch(err => {
          this.$message.error({message:err});
        }).finally(()=>{
          this.loginloading = false;
        })
      },
    }
  }
</script>
<style lang="less">
  @current:'../../';
  #login {
    position: relative;
    background: url('@{current}@{admin_bg}') no-repeat;
    background-size: cover;
    background-position: 0 60%;
    height: 100%;
    width: 100%;
    min-height: 900px;
    #login-box {
      transform: perspective(500px);
      position: absolute;
      top: 10%;
      left: 0;
      right: 0;
      margin: auto;
      max-width: 350px;
      min-height: 558px;
      background: #fff;
      padding: 45px 25px;
      padding-bottom: 20px;
      border-radius: 20px;
      box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
      .title {
        font-size: 17px;
        color: black;
        margin: 30px auto;
        text-align: left;
      }
      .input_b {
        width: 100%;
        position: relative;
        margin-bottom: 25px;
        .imgcode {
          cursor: pointer;
          /*position: absolute;*/
          /*right: 40px;*/
          /*top: 10px;*/
          z-index: 1000;
        }
        .imgtext {
          font-size: 14px;
          cursor: pointer;
          color: #ff6600;
          top: 15px;
          height: 100%;
          right: 20px;
        }
        input {
          width: 80%;
          padding: 12px 14px;
          margin-left: 40px;
          z-index: 3;
          outline: none;
          color: #000000;
          border: solid 1px #c9c9c9;
          transition: all 0.5s;
          font-size: 14px;
        }

        label {
          position: absolute;
          left: 0;
          top: 0;
          z-index: 100;
          font-size: 16px;
          transition: 0.3s;
          pointer-events: none;
          width: 40px;
          height: 42px;
          background-color: #c9c9c9;
          img {
            margin-left: 1px;
            margin-top: 10px;
          }
        }
      }
      .input_v {
        text-align: left;
        margin-bottom: 45px !important;
        input {
          width: 40%;
          margin-left: 0px;
          margin-top: 14px;
        }
      }
      .login_btn {
        width: 100%;
        height: 40px;
        color: #ffffff;
        background-color: #1695d4;
        border: none;
        border-radius: 5px;
        font-family: SimHei;
        font-size: 17px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;

      }

      .login_loading {
        width: 130px;
        height: 20px;
        position: absolute;
        top: -35px;
        left: 0;
        right: 0;
        margin: auto;
        line-height: 20px;
        padding: 3px;
        font-size: 12px;
        text-align: left;
        padding-left: 6px;
        border-radius: 3px;
        color: white;
        background-color: rgba(0, 100, 0, 0.5);
      }
    }
    #login-base {
      position: absolute;
      top: 80%;
      left: 0;
      right: 0;
      margin: auto;
      a {
        color: white;
        font-size: 14px;
        &:link {
          color: white;
        }
      }
    }

    @media screen  and (max-width: 1490px) {
      #login-box {
        top: 50% !important;
        transform: translateY(-585px/2) !important;
        height: 520px;
        padding: 25px !important;
        padding-top: 20px !important;

      }

      #login-base {
        top: 90%;
      }

      .input_b {
        margin-bottom: 22px !important;
      }

      .logo_box {
        width: calc(194px / 1.2) !important;
        height: calc(213px / 1.2) !important;
      }

      .login_logo {
        width: 105px;
        height: 102px;
        margin: 26px 0px;
      }
    }
  }

</style>
