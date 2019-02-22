<template>
  <div class="upload-container">
    <el-button :style="{background:color,borderColor:color}" icon="el-icon-upload" size="mini" type="primary" @click=" dialogVisible=true">上传图片
    </el-button>
    <el-dialog :visible.sync="dialogVisible">
      <el-upload
        :multiple="true"
        :file-list="fileList"
        :show-file-list="true"
        :on-remove="handleRemove"
        :data="uploadToken"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        class="editor-slide-upload"
        action="http://upload.qiniup.com/"
        list-type="picture-card">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </el-dialog>
  </div>
</template>

<script>
  import {qiniuPrivateUri,qiniuPublicUri} from '../../../../config/zhwlUri.js'
export default {
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    },
    //上传图片所属空间  1:公有  2:私有
    belongType: {
      type: Number,
      default: 1
    },
  },
  computed: {
    //上传到后台的url
    keyUrl(){
      if (this.belongType == 1) {
        return qiniuPublicUri;
      }
      if (this.belongType == 2) {
        return qiniuPrivateUri;
      }
      return qiniuPublicUri;
    },
  },
  data() {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: [],
      uploadToken:{   //上传图片的token
        token:'',
        key:''
      },
    }
  },
  mounted(){
    this.getKey();
  },
  methods: {
    //获取后台的key值
    getKey(){
      this.zhwl.getRequest(this.keyUrl).then(resp =>{
        if(resp.data.status==1){
          this.uploadToken.token = resp.data.data||'';
        }else{
          this.$message.error(resp.data.msg||'获取key值失败');
        }
      }).catch(err=>{
        this.$message.error(`提示，${err}`);
      })
    },

    //监测是否全部上传成功
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },

    //提醒商家正在上传
    handleSubmit() {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      if (!this.checkAllSuccess()) {
        this.$message('请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！')
        return
      }
      this.$emit('successCBK', arr)
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
    },

    //上传成功
    handleSuccess(response, file) {
      const key = response.key;
      const uid = file.uid;
      const objKeyArr = Object.keys(this.listObj);
      let params = {
        fileKey:key
      };
      this.zhwl.getRequest("/qiniu/getPublicFileUrl",params).then(resp=>{
        for (let i = 0, len = objKeyArr.length; i < len; i++) {
          if (this.listObj[objKeyArr[i]].uid === uid) {
            this.listObj[objKeyArr[i]].url = resp.data.data
            this.listObj[objKeyArr[i]].hasSuccess = true
            return
          }
        }
      }).catch(err=>{
        this.$message.error(`提示：${err}`||'获取图片失败')
      });
    },
    //获取最新的key数组
    pushFinalkey(file,fileList){
      let key = '';
      let arr = [];
      (fileList||[]).forEach((val,index)=>{
        if(val&&val.response){
          key = val.response.key
        }else if(val.key){
          key = val.key
        }
        if(key){
          arr.push(key)
        }
      });
      this.finalKey = arr;
    },
    handleRemove(file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },
    beforeUpload(file) {
      console.log(file)
      //获取上传文件的类型
      const fileType = file.type.split('/')[1];
      //上传之前给每张图片起一个别名
      const keyName = `zhwl-${window.formatDate(new Date())+Number.parseInt(Math.random() * 1000,10) + (new Date().getTime())}.${fileType}`;
      this.uploadToken.key = keyName;
      console.log(keyName)

      const _self = this
      const _URL = window.URL || window.webkitURL
      const fileName = file.uid
      this.listObj[fileName] = {}
//      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = _URL.createObjectURL(file);
        //判断图片是否渲染完成
        img.onload = function() {
          _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
//          resolve(true)
        };
//      })
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  /deep/ .el-upload--picture-card {
    width: 100%;
  }
}
</style>
