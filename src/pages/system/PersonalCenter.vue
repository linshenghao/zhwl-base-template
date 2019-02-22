<template>
  <div style="margin: 30px">
    <table border="1" cellspacing="0" style="height:210px;">
      <tr>
        <th>姓名</th>
        <td>{{sysUser.name}}</td>
        <th>用户名</th>
        <td>{{sysUser.username}}</td>
      </tr>
      <tr>
        <th>手机号码</th>
        <td>{{sysUser.phone}}</td>
        <th>住宅电话</th>
        <td>{{sysUser.telephone}}</td>
      </tr>
      <tr>
        <th>联系地址</th>
        <td>{{sysUser.address}}</td>
        <th>备注</th>
        <td>{{sysUser.remark}}</td>
      </tr>
    </table>
    </div>
</template>

<script>
    export default {
        data(){
          return{
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
