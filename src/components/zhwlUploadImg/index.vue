<template>
  <div id="zhwlUploadImg">
    <el-upload
      ref="upload"
      action="http://upload.qiniup.com/"
      :limit="limit"
      :on-exceed="handleExceed"
      :file-list="imgList"
      :on-success="handleSuccess"
      :data="uploadToken"
      :on-change="addListenerChange"
      :before-upload="beforeUpload"
      :auto-upload="autoUpload"
      :before-remove="beforeRemove"
      :disabled="disabled"
      :on-error="errorFn"
      :on-progress="handleProgress"
      :list-type="listType"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisibleimg">
      <img width="100%" :src="dialogImageUrl" alt="图片">
    </el-dialog>
    <div class="upload-loading" v-show="uploadloading">

      </div>
  </div>
</template>
<script>
  /**
   * @author Deku
   * @date 2018/11/24
   * @Description:   图片上传组件
   * @params {warningMessage--超出的时候的提示,limit,keyUrl,fileList,disabled,isHideUploadBtn,listType},
   * @callback  @success--成功的回调,@remove --失败的回到
   * @function  _resertFn   重置的方法，this.$refs.xxx._resertFn
   */
  import EventBus from '@/utils/EventBus';
  import {qiniuPrivateUri, qiniuPublicUri} from '../../config/zhwlUri.js'
  export default {
    name: 'zhwlUploadImg',
    props: {
      //  超出的时候的提示
      warningMessage: {
        type: String,
        default: '图片上传超出指定范围'
      },
      //限制图片的张数，默认一张
      limit: {
        type: Number,
        default: 1
      },
      listType: {
        type: String,
        default: 'picture-card'
      },
      //上传图片所属空间  1:公有  2:私有
      belongType: {
        type: Number,
        default: 1
      },
      //默认图片的数组
      fileList: Array,
      //是否禁用
      disabled: {
        type: Boolean,
        default: false
      },
      //是否隐藏上传的按钮
      isHideUploadBtn: {
        type: Boolean,
        default: true
      },
      //是否自动上传
      autoUpload: {
        type: Boolean,
        default: true
      }
    },
    watch: {
      fileList: {
        handler(val, oldVal){
          this._setDefault(this.fileList);
        },
        deep: true
      }
    },
    data(){
      return {
        dialogVisibleimg: false,   //图片是否展示
        dialogImageUrl: '',       //图片路径
        uploadToken: {   //上传图片的token
          token: '',
          key: ''
        },
        imgList: [],  //默认图片
        recordLength: 0, //记录图片的数量
        finalKey: [],
        uploadloading: false,

        //用于存放之前删除的数据
        moddleKeyArr: [],
        EvenListener: new EventBus(),
        SUCCESS_CODE: 0,  //判断是否成功的状态码
        isChange: false,
        //记录是否是空的数组
        modelArr: [],
        modelKey: '',
        keyIndex: 0,
        //准备上传的图片
        readerFile: []
      }
    },
    mounted(){
      this._setDefault(this.fileList);
      this.getKey();
    },
    methods: {

      //自定义上传请求--------使用默认的上传会出现重复多次请求
      upLoadBySelf(){

      },
      _changStatus(){
        this.isChange = true;
      },
      //判断文件是否有变化，有的话才触发提交函数----
      addListenerChange(file, fileList){
        this._changStatus();
        //过滤准备上传的数据
        this.readerFile = fileList.filter(f => f.status === 'ready');
      },
      _listenArr(){

      },

      //获取后台的key值
      getKey(){
        this.zhwl.getRequest(this.keyUrl).then(resp => {
          if (resp.data.status == 1) {
            this.uploadToken.token = resp.data.data || '';
          } else {
            this.$message.error(resp.data.msg || '获取key值失败');
          }
        }).catch(err => {
          this.$message.error(`提示，${err}`);
        })
      },

      //上传失败的回调
      errorFn(){
        if (!this.autoUpload) {
          //判断上传次数是否大于目前的即将上传的文件
          if (this.keyIndex < this.readerFile.length - 1) {
            this.keyIndex++;
          } else {
            this.SUCCESS_CODE = 0;
            this.EvenListener.dispatch("success", "0")
          }
        }
      },
      //设置默认的图片
      _setDefault(arr){
        this.imgList = window.deepClone(arr || []);
        this.recordLength = this.imgList.length;
        if (this.imgList.length > 0) {
          let arr = [];
          let key = '';
          (this.imgList || []).forEach((val, index) => {
            key = val.key ? val.key : '';
            if (key) {
              arr.push(key)
            }
          });
          this.finalKey = arr;
        }
        if (this.recordLength >= this.limit) {
          if (this.isHideUploadBtn) {
            document.getElementsByClassName('el-upload')[0].style.display = 'none';
          }
        } else {
          document.getElementsByClassName('el-upload')[0].style.display = 'inline-block';
        }
      },
      //记录上传图片的数量
      _changeRecord(str){
        str === 'add' ? ++this.recordLength : --this.recordLength
      },
      //图片上传超出限制的回调
      handleExceed(){
        this.$message.warning(this.warningMessage || '不能超过限制的图片数');
      },
      handleProgress(event, file, fileList){

      },
      //图片上传成功的回调
      handleSuccess(response, file, fileList){
        //设置中间数组
        this._changStatus();
        //更新key数组
        this.pushFinalkey(file, fileList);
        this.$emit('success', this.finalKey);
        //判断是否是自动提交
        if (!this.autoUpload) {
          //判断上传次数是否大于目前的即将上传的文件
          if (this.keyIndex < this.readerFile.length - 1) {
            this.keyIndex++;
          } else {
            this.SUCCESS_CODE = 1;
            this.EvenListener.dispatch("success", this.finalKey)
          }
        }
        this._changeRecord('add');
        //如果图片的长度大于限制的长度，将上传的框隐藏
        if (this.recordLength >= this.limit) {
          if (this.isHideUploadBtn) {
            document.getElementsByClassName('el-upload')[0].style.display = 'none';
          }
        }
      },

      //点击大图的回调
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisibleimg = true;
      },

      //判断是否是默认的图片，有的话进行删除
      deleteDefault(file, fileList){
        this.imgList.forEach((val, index) => {
          if (file.url == val.url) {
            this.imgList.splice(index, 1)
          }
        });
        this.$emit("beforeremove", 1, file, fileList);
      },

      //最终删除操作
      _deleteLaster(){
        let key = '';
        if (this.moddleKeyArr.length > 0) {
          key = this.moddleKeyArr.join(',');
          let params = {
            fileKeys: key
          };
          this.zhwl.deleteRequest('/qiniu/deleteFileByKeys/', params).then(resp => {
            this.moddleKeyArr = [];
          }).catch(err => {

          })
        }
      },

      //删除的操作
      _deleteFn(file, fileList){
        return new Promise((resolve, reject) => {
          if ((file && file.response) || file.key) {   //判断该图片是否已经上传到服务器，是否有key
            let key = (file && file.response) ? file.response.key : file.key ? file.key : '';
            if (key) {
              let params = {
                fileKeys: key
              }
              this.zhwl.deleteRequest('/qiniu/deleteFileByKeys/' , params).then(resp => {
                const isSuccess = resp
                if (isSuccess.data.status == 1) {
                  resolve(true);
                  this.$emit("beforeremove", 1, file, fileList)
                  this._showButn();
                } else {
                  this.$message.warning(isSuccess.data.msg || '图片删除失败');
                  this.$emit("beforeremove", 0, file, fileList)
                  reject(false);
                }
              }).catch(err => {
                this.$message.warning(err || '删除失败');
                this.$emit("beforeremove", 0, file, fileList)
                reject(false);
              });
            }
          } else {
            resolve(true);
          }
        });
      },

      //删除前的回调
      beforeRemove(file, fileList){
        this.deleteDefault(file, fileList);
        //判断是否有key  有的话将要删除的数据存放到一个临时数组中
        if ((file && file.response) || file.key) {
          let key = (file && file.response) ? file.response.key : file.key ? file.key : '';
          this.moddleKeyArr.push(key);
          return true;
        } else {
          return true;
        }
      },

      //展示上传按钮
      _showButn(){
        if (this.recordLength < this.limit) {
          document.getElementsByClassName('el-upload')[0].style.display = 'inline-block';
        }
      },

      //图片删除的回调
      handleRemove(file, fileList) {
        //过滤准备上传的数据
        this.readerFile = fileList.filter(f => f.status === 'ready');
        this._changeRecord('del');
        this._showButn();
        this._changStatus();
        this.pushFinalkey(file, fileList);
        this.$emit('remove', file, this.finalKey);
      },

      //获取最新的key数组
      pushFinalkey(file, fileList){
        let key = '';
        let arr = [];
        (fileList || []).forEach((val, index) => {
          if (val && val.response) {
            key = val.response.key
          } else if (val.key) {
            key = val.key
          }
          if (key) {
            arr.push(key)
          }
        });
        this.finalKey = arr;
      },

      //初始化数据
      _initValue(){
        this.recordLength = 0;
        this._initSuccessValue();
        document.getElementsByClassName('el-upload')[0].style.display = 'inline-block';
      },

      //上传成功的初始化
      _initSuccessValue(){
        this.isChange = false;
        this.readerFile = [];   //清空准备上传的图片
        this.keyIndex = 0;      //记录上传的次数
        this.moddleKeyArr = [];
        this.SUCCESS_CODE = 0;   //重置成功的状态
        //重置的时候将自定义监听事件移除
        this.EvenListener.removeHandler("success");
      },

      //上传成功清空所有的图片
      _resertFn(){
        this._initValue();
        this.$refs.upload.clearFiles();
      },

      //上传图片限制
      beforeUpload(file){
        //获取上传文件的类型
        const fileType = file.type.split('/')[1];
        //上传之前给每张图片起一个别名
        const keyName = `zhwl-${window.formatDate(new Date()) + Number.parseInt(Math.random() * 1000, 10) + (new Date().getTime())}.${fileType}`;
        this.uploadToken.key = keyName;
      },

      successCBK(){
        let _that = this
        const result = {
          resultCode: _that.SUCCESS_CODE,
          resultKey: window.deepClone(arr)
        };
        _that._initSuccessValue();
        resolve(result);
      },


      //手动上传组件
      _setSubmit(){
        this._deleteLaster();
        return new Promise((resolve, reject) => {
          //判断文件状态是否发生改变
          if (this.isChange) {
            //判断此时要上传的文件是否大于0
            if (this.readerFile.length > 0) {
              this.$refs.upload.submit();
              //通过发布订阅模式，监听成功的函数
              let _that = this;
              //上传成功
              this.EvenListener.on("success", function (arr) {
                const result = {
                  resultCode: _that.SUCCESS_CODE,
                  resultKey: window.deepClone(arr)
                };
                _that._initSuccessValue();
                resolve(result);
              })
            } else {
              resolve({
                resultCode: 1,
                resultKey: this.finalKey
              })
            }
          } else {
            resolve({
              resultCode: 1,
              resultKey: this.finalKey
            })
          }
        });
      }
    },
    computed: {
      _isChange(){
        return this.isChange
      },
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
  }
</script>
<style lang="less">
  #zhwlUploadImg {

    /*element ui 禁止触发的颜色*/
    .is-disabled + div {
      background: #e5e5e5 !important;
    }
  }

</style>
