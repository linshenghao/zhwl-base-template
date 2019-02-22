<template>
  <div class="mbT30 p10" v-loading="fullloading" id="SysButton">
    <div class="table-box">
        <div class="table-header">
          <div class="clearfix label-group">
              <el-input
                placeholder="请输入按钮所属菜单"
                v-model="menuName"
                size="small"
                class="fl label-value"
                style="width: 25%"
                suffix-icon="el-icon-search"
                clearable>
              </el-input>
              <el-button  class="fl" style="margin-left: 15px" type="primary" size="small" icon="el-icon-search"
                         @click="searchKeyword" >搜索</el-button>
          </div>
         </div>
        <el-table :data="buttonList" size="mini" border stripe @selection-change="handleSelectionChange" v-loading="tableLoading" style="width: 100%">
        <el-table-column type="selection" align="left">
        </el-table-column>
        <el-table-column prop="buttonNumber" align="center" label="按钮编号">
        </el-table-column>
        <el-table-column prop="buttonName" align="center" label="按钮名称">
        </el-table-column>
        <el-table-column prop="url" align="center" label="链接">
        </el-table-column>
        <el-table-column prop="requestMethod" align="center" label="请求方式">
        </el-table-column>
        <el-table-column prop="menu.menuName" align="center" label="所属菜单">
        </el-table-column>

        <el-table-column label="操作" align="center" width="300"  fixed="right">
          <template slot-scope="scope">

            <el-button v-if="$hasButton('buttonEdit')" @click="update(scope.row,{title:'修改'})" type="primary"
                       size="small">修改
            </el-button>
            <el-button v-if="$hasButton('buttonDel')" @click="deleteMsg(scope.row.id)" type="danger"
                       size="small">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div style="background: #eeee;padding: 10px;margin-top: 10px" class="clearfix table-footer">
      <div class="fl" >
        <el-button  v-if="$hasButton('buttonAdd')" @click="add" type="success" icon="el-icon-circle-plus-outline">新增</el-button>
        <el-button  v-if="$hasButton('buttonDel')" @click="deleteAll()" type="danger" icon="el-icon-delete">删除</el-button>
      </div>
        <el-pagination
          background
          style="text-align: right;margin-right: 20px"
          @current-change="changePage"
          @size-change="handleSizeChange"
          layout="total,sizes,prev, pager, next"
          :page-count="totalPage"
          :page-size="size"
          :total="total"
          :current-page="page"
          :page-sizes="[3, 6, 10, 20]"
        >
        </el-pagination>
    </div>

    <!--新增或修改弹框-->
    <el-form style="margin: 0px;padding: 0px;">
      <div style="text-align: left" id="Bdialog">
        <el-dialog
          v-dialogDrag
          style="padding: 0px;"
          :title="dialogTitle"
          :close-on-click-modal="false"
          :visible.sync="dialogVisible">
              <el-form style="margin: 0px;padding: 0px;">
                <el-form-item label="按钮编号：" prop="buttonNumber" :label-width="labelWidth">
                  <el-input placeholder="请输入按钮编号" prefix-icon="el-icon-edit"clearable v-model="button.buttonNumber"></el-input>
                </el-form-item>
                <el-form-item label="按钮名称：" prop="buttonName" :label-width="labelWidth">
                  <el-input placeholder="请输入按钮名称" prefix-icon="el-icon-edit" clearablev-model="button.buttonName"></el-input>
                </el-form-item>
                <el-form-item label="链接：" prop="url" :label-width="labelWidth">
                  <el-input placeholder="请输入链接" prefix-icon="el-icon-edit" clearablev-model="button.url"></el-input>
                </el-form-item>
                  <el-form-item label="请求方式：" prop="requestMethod" :label-width="labelWidth">
                  <el-select v-model="button.requestMethod"
                             prefix-icon="el-icon-edit" clearable
                             :style="{width: selectWidth}"
                             placeholder="请选择请求方式">
                            <el-option
                              v-for="item in requestMethodList"
                             :key="item.value"
                             :label="item.label"
                              :value="item.value">
                            </el-option>
                 </el-select>
                  <!--<el-input placeholder="请输入请求方式" prefix-icon="el-icon-edit" v-model="button.requestMethod"></el-input>-->
                </el-form-item>
                <el-form-item label="所属菜单：" prop="menuId" :label-width="labelWidth">
                  <el-tree :props="props"
                           :data="treeData"
                           :default-expanded-keys="checkMenuIds"
                           :default-checked-keys="checkMenuIds"
                           node-key="id"
                           ref="tree"
                           check-strictly
                           show-checkbox
                           @check-change="handleCheckChange">
                  </el-tree>
                </el-form-item>
              </el-form>
              <span slot="footer"  class="dialog-footer" style="text-align: right;width: 100%;display: block">
                <el-button size="medium" @click="cancelEidt()">取 消</el-button>
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
        selectWidth:'630px', // input的label宽度
        dialogTitle: '',//表单标题
        dialogVisible:false,//修改的表单的弹框
        addbool: false,
        keywords: '',
        buttonList:[],
        button:{
          id: null,
          buttonNumber: "",//按钮编号,
          buttonName: "",//按钮名称,
          url: "",//链接,
          requestMethod: "",//请求方式,
          menuId: "",//菜单Id,
          menu:""
        },
        requestMethodList:[
          {
            value: "post",
            label: 'post'
          },
          {
            value: "get",
            label: 'get'
          },
          {
            value:"put",
            label: 'put'
          },
          {
            value: "delete",
            label: 'delete'
          }
        ],
        treeNodeI:0,
        checkMenuIds:[],
        props: {
          label: 'menuName',
          children: 'children'
        },
        treeData: [],
        idstr:"",
        total: -1,  //总页数
        page: 1,  //当前页
        size:10,   //每页多少条
        totalPage: 0, //总条数
        menuName:""
      }
    },
    mounted: function () {
      this.getList();
      this.loadMenu();
    },
    methods: {
      //获取列表
      getList(){
        let _this = this;
        this.tableLoading = true;
        this.$http.get("/backstage/system/button/getByPage?page="+_this.page+"&size="+_this.size).then(resp=> {
          this.tableLoading = false;
          if (resp && resp.status == 200) {
            if(resp.data.status == 1){//成功
              let data = resp.data.data;
              _this.buttonList = data.data; //列表数据
              _this.total = data.totalResult;  //总条数
              _this.totalPage = data.totalPage;//总页数
              _this.page = data.page;   //当前页
              _this.size = data.size; //每页总数
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

      //加载菜单
      loadMenu(){
        let _this = this;
        this.$http({
          method:'get',
          url:'/backstage/system/menu/getMenuTree'
        }).then((response=>{
          let data = response.data;
          if (data.status == 1) {
            _this.treeData = data.data;
          }
        })).catch((error=>{
        }));
      },

      //添加信息的预处理
      add(){
        this.button = {};
        this.addbool = true;
        this.dialogVisible = true;
        this.dialogTitle = "新增";
      },
      //修改信息的预处理
      update(val,obj){
        this.dialogVisible = true;//弹框
        this.addbool = false;
        this.dialogTitle = obj.title;
        this.button = window.clone(val);//克隆
        this.checkMenuIds = [];
        this.checkMenuIds.push(val.menuId);
        if (this.checkMenuIds.length === 1){
          this.treeNodeI = 1;
        }
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
        this.button.menuId = this.$refs.tree.getCheckedKeys(true).toString();
        let params = this.button;
        this.$http({
          method:"post",
          url:"/backstage/system/button/save",
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
        this.button.menuId = this.$refs.tree.getCheckedKeys(true).toString();
        let params = this.button;
        this.$http({
          method:"put",
          url:"/backstage/system/button/update",
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
            url:"/backstage/system/button/deleteByIds/"+val
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

      //分页方法
      changePage(pageNum) {//分页
        var _this = this;
        this.tableLoading = true;
        this.$http.get("/backstage/system/button/getByPage?page="+pageNum+"&size="+_this.size).then(resp =>{
          this.tableLoading = false;
          if (resp && resp.status == 200) {
            if (resp.data.status == 1) {//成功
              let data = resp.data.data;
              _this.buttonList = data.data; //列表数据
              _this.total = data.totalResult;  //总条数
              _this.totalPage = data.totalPage;//总页数
              _this.page = data.page;   //当前页
              _this.size = data.size; //每页总数

            } else {//失败
              this.$message.error("查询失败");
            }
          } else if (resp && resp.status == 401) {
            this.$message.error("没有权限");
          }
        }).catch((error=>{
          if (error.response.status == '403') {
            this.$router.push({path: '/forbidden403'}); // 对象
          }
        }));
      },
      //  改变当前页
      handleSizeChange(val) {
        this.size = val;
        this.searchKeyword()
      },
      handleCheckChange(data, checked, indeterminate) {
        this.treeNodeI++;
        if(this.treeNodeI %2 == 0){
          //点击已经选中的节点，置空
          this.$refs.tree.setCheckedNodes([]);
          if(checked){
            this.$refs.tree.setCheckedNodes([data]); //交叉点击节点
          }
          this.treeNodeI = 0;
        }
      },

      searchKeyword(){
        let _this = this;
        this.tableLoading = true;
        this.$http.get("/backstage/system/button/getByPage?page="+_this.page+"&size="+_this.size+"&menuName="+_this.menuName).then(resp=> {
          this.tableLoading = false;
          if (resp && resp.status == 200) {
            if(resp.data.status == 1){//成功
              let data = resp.data.data;
              _this.buttonList = data.data; //列表数据
              _this.total = data.totalResult;  //总条数
              _this.totalPage = data.totalPage;//总页数
              _this.page = data.page;   //当前页
              _this.size = data.size; //每页总数
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

    }
  }
</script>
<style lang="less">
  #SysButton{
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
      width: 800px;
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
      padding: 13px 20px;
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
  }


</style>
