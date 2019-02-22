<template>
  <div class="mbT30 p10" v-loading="fullloading" id="SysMenu">

    <div class="table-box">
      <div class=" p10">
       <el-table :data="menuList" size="mini" border stripe @selection-change="handleSelectionChange" v-loading="tableLoading" style="width: 100%">
        <el-table-column type="selection" align="left">
        </el-table-column>
        <el-table-column prop="menuName" align="center" label="菜单名称">
        </el-table-column>
        <el-table-column prop="url" align="center" label="链接">
        </el-table-column>
        <el-table-column prop="component" align="center" label="组件">
        </el-table-column>
        <el-table-column prop="iconCls" align="center"label="图标">
          <template slot-scope="scope">
            <i slot="prefix" :class="[scope.row.iconCls]"></i>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="300" fixed="right">
          <template slot-scope="scope">
            <el-button @click="getList(scope.row.id,true)" type="primary" style="padding: 6px 10px;margin: 2px"
                       size="mini" v-show="!mainPage">查看子菜单
            </el-button>
            <el-button @click="update(scope.row,{title:'修改'})" type="primary" style="padding: 6px 10px;margin: 2px"
                       size="mini">修改
            </el-button>
            <el-button @click="deleteMsg(scope.row.id)" type="danger" style="padding: 6px 10px;margin: 2px"
                       size="mini">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>
    </div>

    <div style="background: #f7f7f7;padding: 10px;margin-top: 10px" class="clearfix table-footer">
      <div class="fl">
        <el-button size="medium" @click="add" type="success" icon="el-icon-circle-plus-outline">新增</el-button>
        <el-button size="medium" @click="getList(1,false)" icon="el-icon-back" v-show="mainPage">返回</el-button>
      </div>
    </div>
    <!--新增或修改弹框-->
    <el-form style="margin: 0px;padding: 0px;">
      <div style="text-align: left" id="Bdialog">
        <el-dialog
          v-dialogDrag
          :title="dialogTitle"
          :close-on-click-modal="false"
          :visible.sync="dialogVisible"
         >
              <el-form style="margin: 0px;padding: 0px;">
                <el-form-item label="菜单名称：" prop="menuName" :label-width="labelWidth">
                  <el-input placeholder="请输入菜单名称" prefix-icon="el-icon-edit" v-model="menu.menuName"   :style="{width: inputWidth}" ></el-input>
                </el-form-item>
                <el-form-item label="链接：" prop="url" :label-width="labelWidth">
                  <el-input placeholder="请输入链接" prefix-icon="el-icon-edit" v-model="menu.url"   :style="{width: inputWidth}" ></el-input>
                </el-form-item>
                <el-form-item label="组件：" prop="component" :label-width="labelWidth">
                  <el-input placeholder="请输入组件" prefix-icon="el-icon-edit" v-model="menu.component"   :style="{width: inputWidth}" ></el-input>
                </el-form-item>
                <el-form-item label="序号：" prop="menuOrder" :label-width="labelWidth">
                  <el-input placeholder="请输入序号" prefix-icon="el-icon-edit" type="number" min="1" v-model="menu.menuOrder"   :style="{width: inputWidth}" ></el-input>
                </el-form-item>
                <el-form-item label="图标：" prop="iconCls" :label-width="labelWidth">
                  <el-button class="setLeft" type="primary" plain @click="openIcon"><i :class="[iconCls]" ></i></el-button>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer" style="text-align: right;margin-top: 20px;width: 100%;display: block">
                <el-button size="small" @click="cancelEidt()">取 消</el-button>
                <el-button size="small" type="primary" @click="sendMsg()">确 定</el-button>
              </span>
        </el-dialog>
      </div>
    </el-form>

    <!--图标弹框-->
    <el-dialog
      title="请选择图标"
      :visible.sync="iconVisible"
      width="30%"
      :before-close="handleClose">
      <!--<span>请选择图标</span>-->
      <ul class="iconUl">
        <li v-for="icon in icons" class="setLeft">
          <el-button type="primary" plain  @click="checkIcon(icon.name)"><i :class="[icon.name]" ></i></el-button>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
              <el-button @click="iconVisible = false">取 消</el-button>
            </span>
    </el-dialog>

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
        iconVisible:false,//图标弹框
        addbool: false,
        keywords: '',
        menuList:[],
        menu:{
          id: null,
          menuName:"",//菜单名称
          url:"",//链接
          component:"",//组件
          menuOrder:"",//序号
          iconCls:"",//图标
          parentId:"",//父Id
        },
        parentId:"",
        iconCls:'fa fa-plus',
        icons:[
        ],
        mainPage:true,  //是否在首页
      }
    },
    mounted: function () {
      this.getList('1',false);
    },
    methods: {
      //获取列表
      getList(parentId,mainPage){
        let _this = this;
        this.parentId = parentId;
        this.mainPage = mainPage;
        this.tableLoading = true;
        this.zhwl.getRequest("/system/menu/getByParentId/"+parentId).then(resp=> {
          this.tableLoading = false;
            if(resp.data.status == 1){//成功
              _this.menuList = resp.data.data; //列表数据
            }else{//失败
              this.$message.error("查询失败");
            }
        }).catch((error=>{
          if (error.response.status == '403') {
            this.$router.push({path: '/forbidden403'}); // 对象
          }
        }))
      },

      //添加信息的预处理
      add(){
        this.menu = {};
        this.addbool = true;
        this.dialogVisible = true;
        this.dialogTitle = "新增";
      },
      //修改信息的预处理
      update(val,obj){
        this.dialogVisible = true;//弹框
        this.addbool = false;
        this.dialogTitle = obj.title;
        this.menu = window.clone(val);//克隆
        this.iconCls = val.iconCls == undefined?"fa fa-plus":val.iconCls;
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
        this.menu.parentId = this.parentId; //当前父id
        this.menu.iconCls = this.menu.iconCls == undefined? "fa fa-plus":this.iconCls;
        let params = this.menu;
        let _this = this;
        this.$http({
          method:"post",
          url:"/backstage/system/menu/save",
          data:params
        }).then((response)=> {
          let data = response.data;
          if(data.status == 1){ //添加成功
            this.dialogVisible = false;
            this.$message({
              message:'新增成功',
              type:'success'
            });
            this.getList(_this.parentId,_this.mainPage);
          }else {
            data.msg!=null?this.$message.error(data.msg):this.$message.error('新增失败');
          }
        }).catch((error)=>{
          console.log(error);
        })
      },
      //修改信息   put请求
      putMsg(){
        let params = this.menu;
        let _this = this;
        this.$http({
          method:"put",
          url:"/backstage/system/menu/update",
          data:params
        }).then((response)=> {
          let data = response.data;
          if(data.status == 1){ //添加成功
            this.dialogVisible = false;
            this.$message({
              message:'修改成功',
              type:'success'
            });
            this.getList(_this.parentId,_this.mainPage);
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
            url:"/backstage/system/menu/delete/"+val
          }).then((response)=>{
            let data = response.data;
            if(data.status == 1){ //删除成功
              this.$message({
                message:'删除成功',
                type:'success'
              });
              this.getList(_this.parentId,_this.mainPage);
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


      handleClose(){
        this.iconVisible = false;
      },
      /*打开图标选择弹窗*/
      openIcon(){
        this.iconVisible = true;
        this.$http({
          method:'get',
          url:'/backstage/optionalIcon/getAll'
        }).then((response=>{
          let data = response.data;
          if(data.status == 1){
            this.icons = data.data;
          }

        })).catch((error)=>{
        });

      },
      /*选择图标*/
      checkIcon(icon){
        this.iconVisible = false;
        this.menu.iconCls = icon;
        this.iconCls = icon;
        console.log(icon)
      },

    }
  }
</script>
<style lang="less">
  #SysMenu {

    .table-box {
      border: 1px solid #eee;
      box-shadow: 0 0 3px #eee;
      .table-header {
        padding: 8px;
        margin-bottom: 5px;
        background: #F7F7F7;
        border-bottom: 1px solid #e5e5e5;
        .label-group {
          .label-key {
            margin-top: 6px;
            font-weight: bold;
            font-size: 14px;
          }
          .label-value {

          }
        }
      }
    }
    .el-dialog {
      width: 605px;
    }
    .el-dialog__header {
      background: #eee;
      padding: 12px 20px;
      .el-dialog__title {
        font-size: 20px;
        font-weight: 600;
      }
    }
    .el-dialog__footer {
      background: #eee;
      padding: 8px 20px;
    }
    .el-form-item__label {
      font-size: 16px;
    }

    .el-upload--picture-card {
      width: 100px;
      height: 100px;
      display: table;
      line-height: 0;
      .el-icon-plus {
        display: table-cell;
        vertical-align: middle;
      }
    }
    .el-upload-list--picture-card {
      float: left;
      .el-upload-list__item {
        width: 100px;
        height: 100px;
      }
    }

    .el-icon-circle-plus-outline:before {
      margin-right: 5px;
    }
    .setLeft {
      float: left;
    }

    .iconUl li {
      list-style: none;
      margin: 3px 5px;
      box-sizing: border-box;
      width: 60px;
    }
    .iconUl:after {
      content: "";
      height: 0;
      display: block;
      clear: both;
    }
    .iconUl .el-button {
      width: 100%;
    }
  }
</style>
