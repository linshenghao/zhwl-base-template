<template>
  <div class="mbT30 p10" v-loading="fullloading" id="SysRole">

    <div class="table-box">
      <div class=" p10">
      <el-table :data="roleList" size="mini" border stripe @selection-change="handleSelectionChange" v-loading="tableLoading" >
        <el-table-column type="selection" align="left">
        </el-table-column>
        <el-table-column prop="nameZh" align="center" label="角色">
        </el-table-column>

        <el-table-column label="操作" align="center" width="400"  fixed="right">
          <template slot-scope="scope">
            <el-button @click="setAuthority(scope.row.id,{title:'菜单权限'})" type="primary"
                       size="small">菜单权限
            </el-button>
            <el-button v-if="$hasButton('roleButtonEdit')" @click="setButtonAuthority(scope.row.id,{title:'按钮权限'})" type="success"
                       size="small">按钮权限
            </el-button>
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
    </div>

    <div style="background: #f7f7f7;padding: 10px;margin-top: 10px" class="clearfix table-footer">
      <div class="fl">
        <el-button size="medium"  @click="add" type="success" icon="el-icon-circle-plus-outline">新增</el-button>
        <el-button size="medium" @click="deleteAll()" type="danger" icon="el-icon-delete">删除</el-button>
      </div>
    </div>

    <!--新增或修改弹框-->
    <el-form style="margin: 0px;padding: 0px;">
      <div style="text-align: left" id="adminRole">
        <el-dialog
          v-dialogDrag
          :title="dialogTitle"
          :close-on-click-modal="false"
          :visible.sync="dialogVisible"
        >
              <el-form style="margin: 0px;padding: 0px;">
                <el-form-item label="角色英文名：" prop="name" :label-width="labelWidth" style="margin-top: 20px">
                  <el-input placeholder="请输入角色英文名" prefix-icon="el-icon-edit" v-model="role.name"   :style="{width: inputWidth}" >
                    <template slot="prepend">ROLE_</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="角色中文名：" prop="username" :label-width="labelWidth">
                  <el-input placeholder="请输入角色中文名" prefix-icon="el-icon-edit" v-model="role.nameZh"   :style="{width: inputWidth}" ></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button size="small"  type="warning" @click="cancelEidt()">取 消</el-button>
                <el-button size="small" type="primary" @click="sendMsg()">确 定</el-button>
              </span>
        </el-dialog>
      </div>
    </el-form>

    <!--权限设置弹框-->
    <el-form style="width: 100px">
      <div style="text-align: left" >
        <el-dialog
          v-dialogDrag
          :title="dialogTitle"
          style="padding: 50px;"
          :close-on-click-modal="false"
          :visible.sync="authorityVisible"
          width="25%">
          <div style="text-align: center">
            <el-tree :props="props"
                     :key="role.id"
                     :data="treeData"
                     :default-expanded-keys="checkedKeys"
                     :default-checked-keys="checkedKeys"
                     node-key="id"
                     ref="tree"
                     show-checkbox
                     highlight-current
                     @check-change="handleCheckChange">
            </el-tree>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="cancelEidt">取消修改</el-button>
            <el-button type="primary" size="mini" @click="updateRoleMenu">确认修改</el-button>
          </span>
        </el-dialog>
      </div>
    </el-form>

    <!--按钮权限设置弹框-->
    <el-form style="width: 100px">
      <div style="text-align: left">
        <el-dialog
          :title="dialogTitle"
          style="padding: 50px;"
          :close-on-click-modal="false"
          :visible.sync="buttonauthorityVisible">
          <div class="dialog_B Detail">
            <div class="" style="width: 700px;margin: auto">
              <el-table :data="menuButtonList" size="mini" border stripe style="width: 100%">
                <el-table-column prop="menuName" align="center" label="所属菜单">
                </el-table-column>
                <el-table-column align="center" label="按钮名称">
                  <template slot-scope="scope">
                    <el-checkbox-group v-model="buttonIds" @change="handleCheckedButtonChange">
                      <el-checkbox v-for="button in scope.row.buttons" :label="button.id" :key="button.id">{{button.buttonName}}</el-checkbox>
                    </el-checkbox-group>
                  </template>
                </el-table-column>
              </el-table>
              <span slot="footer" class="dialog-footer" style="text-align: right;margin-top: 20px;width: 100%;display: block">
                <el-button size="small" @click="buttonauthorityVisible=false">取 消</el-button>
                <el-button size="small" type="primary" @click="updateRoleButton">确 定</el-button>
              </span>
            </div>
          </div>
        </el-dialog>
      </div>
    </el-form>

  </div>
</template>
<script>
  import mixin from '@/mixins/mixins';
  import {initMenu} from '../../utils/utils'
  export default{
    mixins: [mixin],  // 混入公共部分的代码
    data(){
      return {
        fullloading: false,
        dialogTitle: '',//表单标题
        dialogVisible:false,//修改的表单的弹框
        authorityVisible:false,//菜单权限弹框
        addbool: false,
        keywords: '',
        roleList:[],
        role:{
          id: null,
          name:"",//角色英文名,
          nameZh:"",//角色中文名,
        },
        props: {
          label: 'menuName',
          children: 'children'
        },
        treeData: [],
        checkedKeys: [],
        buttonauthorityVisible:false,//按钮权限弹框
        menuButtonList:[],
        buttonIds:[],
      }
    },
    mounted: function () {
      this.getList();
    },
    methods: {

      handleCheckedButtonChange(){
        console.log(this.buttonIds.toString())
      },

      //修改按钮权限
      setButtonAuthority(val,obj){
        this.buttonauthorityVisible = true;//弹框
        this.dialogTitle = obj.title;
        this.role.id = val;
        this.loadButton(val);
      },
      //加载菜单下的按钮
      loadButton(val){
        if (this.menuButtonList.length === 0){
          this.$http({
            method:'get',
            url:'/backstage/system/menu/getMenuButtons'
          }).then((response=>{
            let data = response.data;
            if (data.status == 1) {
              _this.menuButtonList = data.data;
            }
          })).catch((error=>{

          }));
        }
        let _this = this;
        this.$http({
          method:'get',
          url:'/backstage/system/menu/getButtonIdByRoleId/'+val
        }).then((response=>{
          let data = response.data;
          if (data.status == 1) {
            _this.buttonIds = data.data;
          }
        })).catch((error=>{

        }));
      },

      updateRoleButton(){
        let params = this.$qs.stringify({
          roleId:this.role.id,
          buttonIds:this.buttonIds.toString()
        });
        let _this = this;
        this.$http({
          method:'put',
          url:'/backstage/system/role/updateRoleButton',
          data:params
        }).then((response)=>{
          let data = response.data;
          if(data.status == 1){
            this.$message({
              message:'修改成功',
              type:'success'
            });
            this.getList();
          }else {
            data.msg!=null?this.$message.error(data.msg):this.$message.error('修改失败');
          }
        }).catch((error)=>{
        });
      },


      //获取列表
      getList(){
        let _this = this;
        this.tableLoading = true;
        this.zhwl.getRequest("/system/role/getAll").then(resp=> {
          this.tableLoading = false;
          if (resp && resp.status == 200) {
            if(resp.data.status == 1){//成功
              this.authorityVisible = false;
              _this.roleList = resp.data.data; //列表数据
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

      //添加信息的预处理
      add(){
        this.role = {};
        this.addbool = true;
        this.dialogVisible = true;
        this.dialogTitle = "新增";
      },
      //修改信息的预处理
      update(val,obj){
        this.dialogVisible = true;//弹框
        this.addbool = false;
        this.dialogTitle = obj.title;
        this.role = window.clone(val);//克隆
        let name = this.role.name;
        name = name.startsWith("ROLE_") ? name.slice(5) : name;
        this.role.name = name;

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
        this.authorityVisible = false;
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
        let params = this.role;
        this.$http({
          method:"post",
          url:"/backstage/system/role/save",
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
        let params = this.role;
        this.$http({
          method:"put",
          url:"/backstage/system/role/update",
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
            url:"/backstage/system/role/delete/"+val
          }).then((response)=>{
            let data = response.data;
            if(data.status == 1){ //删除成功
              this.$message({
                message:'删除成功',
                type:'success'
              });
              this.authorityVisible = false;
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

      //设置菜单权限加载菜单
      setAuthority(val,obj){
        this.authorityVisible = true;//弹框
        this.dialogTitle = obj.title;
        this.role.id = val;
        this.loadMenu(val);
      },
      //加载菜单
      loadMenu(val){
        let _this = this;
        this.$http({
          method:'get',
          url:'/backstage/system/menu/tree/'+val
        }).then((response=>{
          let data = response.data;
          if (data.status == 1) {
            _this.treeData = data.data.menus;
            _this.checkedKeys = data.data.mids;
          }
        })).catch((error=>{
        }));
      },

      updateRoleMenu(){
        let params = this.$qs.stringify({
          roleId:this.role.id,
          menuIds:this.$refs.tree.getCheckedKeys(true).toString()
        });
        console.log(params)
        let _this = this;
        this.$http({
          method:'put',
          url:'/backstage/system/role/updateRoleMenu',
          data:params
        }).then((response)=>{
          let data = response.data;
          if(data.status == 1){
            this.$message({
              message:'修改成功',
              type:'success'
            });
//            window.location.reload();
          }else {
            data.msg!=null?this.$message.error(data.msg):this.$message.error('修改失败');
          }
        }).catch((error)=>{
        });
      },

      handleCheckChange(data, checked, indeterminate) {
        //console.log(data, checked, indeterminate);
      },

    }
  }
</script>
<style lang="less">
  #SysRole{
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
      width: 800px;
    }
    #adminRole{
      .el-dialog{
        width: 605px !important;
      }
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
