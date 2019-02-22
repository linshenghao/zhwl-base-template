let mixin = {
  data: function () {
    return {
      total: -1,  //总页数
      page: 1,  //当前页
      size:10,   //每页多少条
      currentPage1: 1, //当前页
      totalPage:0,//总条数
      currentPage:1,
      totalResult:0,//总条数
      pageNum:0,
      dialogVisible:false,//修改的表单的弹框
      multipleSelection: [],//复选框返回的勾选的id数组
      idstr:'', // id 的组合字符串
      labelWidth:'130px',  // form表单的label宽度
      inputWidth:'400px', // input的label宽度
      tableLoading: false, //表格加载的效果
    }
  },
  methods:{

    /*
    *    ElementUI  再次点击取消radio 的选中状态的方法
    *    params  e代表需要传入的label值 ，val需要变更的对象，key代表对象的属性
    * */
    __clickitem(e,val,key){
      e === val[key] ?  this.$set(val,key,"") :  this.$set(val,key,e)
    },



    /*
     *   点击checkbox 的调用函数，将id拼成ids
     *   @param {string}
     *    val是ele ui的返回值，一个val数组
     * */
    handleSelectionChange(val) {
      this.multipleSelection = val;
      var idstr = "";
      for(var　i in val ){
        idstr+=val[i].id+","
      }
      this.idstr = idstr;
    },

    /*
    *   删除一条或者多条数据
    *   @param {string,Function}
    *    val删除数据的id字符串 ,delcb 删除的实际操作函数
    * */

    deleteData(val,url){
      if(val){
        this.$confirm('确定删除此操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(val){
            this.deleteFn(val,url);
          }else{
            this.$message({
              type:'success',
              message:'请选择至少一条记录进行删除'
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }else{
        this.$message({
          type:'error',
          message:'请选择至少一条记录进行删除'
        })
      }
    },
    //删除一条信息
    deleteFn(val,url){
      this.tableLoading = true;
      this.zhwl.deleteRequest(url+val).then(resp => {
        let data = resp.data;
        if(data.resultCode == 1){//成功
          this.$message.success('删除成功');
          this.getList();
        }else{//失败
          this.$message.error(data.msg)
        }
      })
    },

    //  改变当前页
    async handleCurrentChange(val) {
      this.page = val;
      this.getList()
    },
    //  改变页码
    async handleSizeChange(val) {
      this.currentPage1 = 1;
      this.currentPage = 1;
      this.size = val;
      this.getList();
    },

    //过滤数组
    __filterArr(obj){
        let newjson = {};
        if(Object.keys(obj).length>0){
          for(let i in obj){
            if(!window.isArr(obj[i])){
              newjson[i] = obj[i]
            }
          }
        }
        return newjson
    }
  }
};

export default mixin
