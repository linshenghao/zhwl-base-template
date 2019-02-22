<template>
  <div style="margin: 30px">
    <el-form style="margin: 0px;padding: 0px;">
      <el-form-item label="姓名：" prop="name" :label-width="labelWidth">
        <el-input placeholder="请输入姓名" prefix-icon="el-icon-edit" v-model="sysUser.name"></el-input>
      </el-form-item>
      <el-form-item label="用户名：" prop="username" :label-width="labelWidth">
        <el-input placeholder="请输入用户名" prefix-icon="el-icon-edit" v-model="sysUser.username"  :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="" :label-width="labelWidth">
        <el-input type = "password" placeholder="请输入密码" prefix-icon="el-icon-edit" v-model="sysUser.password"></el-input>
      </el-form-item>
      <el-form-item label="手机号码：" prop="phone" :label-width="labelWidth">
        <el-input placeholder="请输入手机号码" prefix-icon="el-icon-edit" v-model="sysUser.phone"></el-input>
      </el-form-item>
      <el-form-item label="住宅电话：" prop="telephone" :label-width="labelWidth">
        <el-input placeholder="请输入住宅电话" prefix-icon="el-icon-edit" v-model="sysUser.telephone"></el-input>
      </el-form-item>
      <el-form-item label="联系地址：" prop="address" :label-width="labelWidth">
        <el-input placeholder="请输入联系地址" prefix-icon="el-icon-edit" v-model="sysUser.address"></el-input>
      </el-form-item>
      <el-form-item label="备注：" prop="remark" :label-width="labelWidth">
        <el-input placeholder="请输入备注" prefix-icon="el-icon-edit" v-model="sysUser.remark"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer" style="text-align: right;margin-top: 20px;width: 100%;display: block">
      <el-button size="small" type="primary" @click="sendMsg">确 定</el-button>
    </span>
    </div>
</template>

<script>
    export default {
        data(){
          return{
            labelWidth:'100px',
            sysUser:{
              id: null,
              name:"",//姓名,
              phone:"",//手机号码,
              telephone:"",//住宅电话,
              address:"",//联系地址,
              username:"",//用户名,
              password:"",//密码,
              userface:"",  //用户图像
              remark:"",//备注,
            }
          }
        },
      mounted: function () {
        this.sysUser = this.$store.state.user;
      },
      methods:{
        sendMsg(){
          let params = window.clone(this.sysUser);
          let md5 = require("crypto").createHash("md5").update(params.password);
          params.password = md5.digest('hex')
          this.$http({
            method:"put",
            url:"/backstage/config/sysUser/update",
            data:params
          }).then((response)=> {
            let data = response.data;
            if(data.status == 1){ //成功

              this.$alert('修改成功！请重新登录系统', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$router.push({path:'/'}); //路由跳转
                }
              });
              //this.$store.commit('login', params);  //保存session
            }else {
              data.msg!=null?this.$message.error(data.msg):this.$message.error('修改失败');
            }
          }).catch((error)=>{
            console.log(error);
          })
        }
      }
    }
</script>

<style scoped>
  tr,th {
    background-color: #CEA;
    width: 400px;
    margin: auto
  }
  tr,td {
    background-color: #eff4f7;
    width: 400px;
    margin: auto
  }
</style>
