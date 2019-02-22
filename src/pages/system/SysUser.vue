<template>
  <div class="mbT30 p10" v-loading="fullloading" id="SysUser">

    <div class="table-box">
      <div class=" p10">
          <el-table :data="sysUserList" size="mini" border stripe @selection-change="handleSelectionChange" v-loading="tableLoading" style="width: 100%">
        <el-table-column type="selection" align="left">
        </el-table-column>
        <el-table-column prop="name" align="center" label="姓名">
        </el-table-column>
        <el-table-column prop="username" align="center" label="用户名">
        </el-table-column>
        <el-table-column prop="phone" align="center" label="手机号码">
        </el-table-column>
        <el-table-column prop="telephone" align="center" label="住宅电话">
        </el-table-column>
        <el-table-column prop="address" align="center" label="联系地址">
        </el-table-column>
        <el-table-column prop="remark" align="center" label="备注">
        </el-table-column>
        <el-table-column align="center" label="用户角色">
          <template slot-scope="scope">
            <el-tag v-for="role in scope.row.roles" :key="role.id" type="success"
              size="mini" style="margin-right: 5px" :disable-transitions="false">
              {{role.nameZh}}
            </el-tag>
            <el-popover
              placement="bottom"
              title="角色列表"
              width="200"
              trigger="click"
              @hide="updateRole(scope.row.id)">
              <el-select v-model="setRoleList" multiple placeholder="请选择角色">
                <el-option
                  v-for="item in roleList"
                  :key="item.id"
                  :label="item.nameZh"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-button type="text" icon="el-icon-more" style="color: #09c0f6;padding-top: 0px"
                         @click="loadSetRoles(scope.row.roles)" slot="reference"></el-button>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="300"  fixed="right">
          <template slot-scope="scope">
            <el-button @click="update(scope.row,{title:'修改'})" type="primary"
                       size="small">修改
            </el-button>
            <el-button @click="deleteMsg(scope.row.id)" type="danger"
                       size="small">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>
      <div style="background: #f7f7f7;padding: 10px;margin-top: 10px" class="clearfix table-footer">
        <div class="fl">
          <el-button size="medium"  @click="add" type="success" icon="el-icon-circle-plus-outline">新增</el-button>
          <el-button size="medium" @click="deleteAll()" type="danger" icon="el-icon-delete">删除</el-button>
        </div>
      </div>
    </div>
    <!--新增或修改弹框-->
    <el-form style="margin: 0px;padding: 0px;">
      <div style="text-align: left">
        <el-dialog
          :title="dialogTitle"
          v-dialogDrag
          ref="dialog__wrapper"
          :close-on-click-modal="false"
          :visible.sync="dialogVisible">
            <el-form style="margin: 0px;padding: 0px;">
              <el-form-item label="姓名：" prop="name" :label-width="labelWidth" style="margin-top: 20px">
                <el-input placeholder="请输入姓名" prefix-icon="el-icon-edit"  :style="{width: inputWidth}" v-model="sysUser.name"></el-input>
              </el-form-item>
              <el-form-item label="用户名：" prop="username" :label-width="labelWidth">
                <el-input placeholder="请输入用户名" prefix-icon="el-icon-edit" :style="{width: inputWidth}" v-model="sysUser.username"></el-input>
              </el-form-item>
              <el-form-item label="密码：" prop="" :label-width="labelWidth">
                <el-input type = "password" placeholder="请输入密码" prefix-icon="el-icon-edit" :style="{width: inputWidth}" v-model="sysUser.password"></el-input>
              </el-form-item>
              <el-form-item label="手机号码：" prop="phone" :label-width="labelWidth">
                <el-input placeholder="请输入手机号码" prefix-icon="el-icon-edit" :style="{width: inputWidth}" v-model="sysUser.phone"></el-input>
              </el-form-item>
              <el-form-item label="住宅电话：" prop="telephone" :label-width="labelWidth">
                <el-input placeholder="请输入住宅电话" prefix-icon="el-icon-edit" :style="{width: inputWidth}" v-model="sysUser.telephone"></el-input>
              </el-form-item>
              <el-form-item label="联系地址：" prop="address" :label-width="labelWidth">
                <el-input placeholder="请输入联系地址" prefix-icon="el-icon-edit" :style="{width: inputWidth}" v-model="sysUser.address"></el-input>
              </el-form-item>
              <el-form-item label="备注：" prop="remark" :label-width="labelWidth">
                <el-input placeholder="请输入备注" prefix-icon="el-icon-edit" :style="{width: inputWidth}" v-model="sysUser.remark"></el-input>
              </el-form-item>
            </el-form>
              <span slot="footer" class="dialog-footer" >
                <el-button size="medium"  type="warning" @click="cancelEidt()">取 消</el-button>
                <el-button size="medium" type="primary" @click="sendMsg()">确 定</el-button>
              </span>
        </el-dialog>
      </div>
    </el-form>

  </div>
</template>
<script>
  import mixin from '@/mixins/mixins';
  export default{
    mixins: [mixin],  // 混入公共部分的代码
    data(){
      return {
        fullloading: false,
        dialogTitle: '',//表单标题
        dialogVisible:false,//修改的表单的弹框
        addbool: false,
        keywords: '',
        sysUserList:[],
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
        },
        roleList: [],
        setRoleList: [],
      }
    },
    mounted: function () {
      this.getList();
    },
    methods: {
      //获取列表
      getList(){
        let _this = this;
        this.tableLoading = true;
        this.$http.get("/backstage/system/sysUser/getAll").then(resp=> {
          this.tableLoading = false;
          if (resp && resp.status == 200) {
            if(resp.data.status == 1){//成功
              _this.sysUserList = resp.data.data; //列表数据
            }else{//失败
              this.$message.error("查询失败");
            }
          }
        }).catch((error=>{
          if (error.response.status == '403') {
            this.$router.push({path: '/forbidden403'}); // 对象
          }
        }))
      },

      //获取所有角色
      getAllRole(){
        let _this = this;
        this.$http.get("/backstage/system/role/getAll").then(resp=> {
          if (resp && resp.status == 200) {
            if(resp.data.status == 1){//成功
              _this.roleList = resp.data.data; //列表数据
            }else{//失败
              this.$message.error("查询失败");
            }
          }else if(resp && resp.status == 401){
            this.$message.error("没有权限");
          }
        })
      },

      //添加信息的预处理
      add(){
        this.sysUser = {};
        this.addbool = true;
        this.dialogVisible = true;
        this.dialogTitle = "新增";
      },
      //修改信息的预处理
      update(val,obj){
        this.dialogVisible = true;//弹框
        this.addbool = false;
        this.dialogTitle = obj.title;
        this.sysUser = window.clone(val);//克隆
      },

      searchClick(){
        alert("ff")
      },
      //选择框
      handleSelectionChange(val) {
        var idstr = "";
        for(var　i in val ){
          idstr+=val[i].id+","
        }
        this.idstr = idstr;
      },

      //取消调用弹框的方法
      cancelEidt(){
        this.dialogVisible = false;
      },
      sendMsg(){
        if(this.addbool){
          this.postMsg();
        }else{
          this.putMsg();
        }
      },

      //新增信息   post请求
      postMsg(){
        let md5 = require("crypto").createHash("md5").update(this.sysUser.password);
        this.sysUser.password = md5.digest('hex')
        let params = this.sysUser;
        this.$http({
          method:"post",
          url:"/backstage/system/sysUser/save",
          data:params
        }).then((response)=> {
          let data = response.data;
          if(data.status == 1){ //添加成功
            this.dialogVisible = false;
            this.$message({
              message:'新增成功',
              type:'success'
            });
            this.getList();
          }else {
            data.msg!=null?this.$message.error(data.msg):this.$message.error('新增失败');
          }
        }).catch((error)=>{
          console.log(error);
        })
      },
      //修改信息   put请求
      putMsg(){
        let md5 = require("crypto").createHash("md5").update(this.sysUser.password);
        this.sysUser.password = md5.digest('hex')
        let params = this.sysUser;
        this.$http({
          method:"put",
          url:"/backstage/system/sysUser/update",
          data:params
        }).then((response)=> {
          let data = response.data;
          if(data.status == 1){ //添加成功
            this.dialogVisible = false;
            this.$message({
              message:'修改成功',
              type:'success'
            });
            this.getList();
          }else {
            data.msg!=null?this.$message.error(data.msg):this.$message.error('修改失败');
          }
        }).catch((error)=>{
          console.log(error);
        })
      },
      //删除数据  delete请求
      deleteMsg(val){
        let _this = this;
        this.$confirm('确定删除此操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.$http({
            method:"delete",
            url:"/backstage/system/sysUser/delete/"+val
          }).then((response)=>{
            let data = response.data;
            if(data.status == 1){ //删除成功
              this.$message({
                message:'删除成功',
                type:'success'
              });
              this.getList();
            }else {
              data.msg!=null?this.$message.error(data.msg):this.$message.error('删除失败');
            }
          }).catch((error)=>{
            console.log(error);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      deleteAll(){
        let ids = this.idstr;
        if(!ids){
          this.$message.error("提示，您还没有选择任何信息");
          return false;
        }else{
          this.deleteMsg(ids);
        }
      },

      //修改用户角色
      updateRole(val){
        let params = this.$qs.stringify({
          sysUserId:val,
          roleIds:this.setRoleList.toString()
        });
        this.$http({
          method:'put',
          url:'/backstage/system/sysUser/updateRoles',
          data:params
        }).then((response)=>{
          let data = response.data;
          if(data.status == 1){
            this.getList();
          }else {
            data.msg!=null?this.$message.error(data.msg):this.$message.error('修改失败');
          }
        }).catch((error)=>{
        });
      },

      //加载原来的角色
      loadSetRoles(val){
        if(this.roleList.length == 0)
          this.getAllRole();
        this.setRoleList = [];
        val.forEach(role => {
          this.setRoleList.push(role.id);
        })
      },

    }
  }
</script>
<style lang="less">
  #SysUser{
    .table-box{
      border: 1px solid #eee;
      box-shadow: 0 0 3px #eee;
      .table-header{
        padding: 8px;
        margin-bottom: 5px;
        background: #F7F7F7;
        border-bottom: 1px solid #e5e5e5;
        .label-group{
          .label-key{
            margin-top: 6px;
            font-weight: bold;
            font-size: 14px;
          }
          .label-value{

          }
        }
      }
    }

    .el-dialog{
      width: 605px;
    }
    .el-dialog__header{
      background: #eee;
      padding: 12px 20px;
      .el-dialog__title{
        font-size: 20px;
        font-weight: 600;
      }
    }
    .el-dialog__footer{
      background: #eee;
      padding: 8px 20px;
    }
    .el-form-item__label{
      font-size: 16px;
    }

    .el-upload--picture-card{
      width: 100px;
      height: 100px;
      display: table;
      line-height: 0;
      .el-icon-plus{
        display: table-cell;
        vertical-align: middle;
      }
    }
    .el-upload-list--picture-card{
      float: left;
      .el-upload-list__item{
        width: 100px;
        height: 100px;
      }
    }

  }

</style>
