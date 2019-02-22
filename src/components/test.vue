<template>
  <div>
    <zhwl-upload-img ref="zhwlUploadImg" :limit="6" :belongType="2"
                     @beforeremove="beforeremoveFn" @success="successFn"
                     @remove="removeFn"
                     :autoUpload="autoUpload"
                     :fileList="fileList"
                     :warningMessage="message">
    </zhwl-upload-img >
    <button @click="resertFn">重置</button>
    <button @click="uploadMany">多张上传</button>
     <button @click="add('add')">add</button> <span>{{count}}</span>  {{count1}}<button @click="del('del')">del</button>
  </div>
</template>
<script>
  import zhwlUploadImg from './zhwlUploadImg/index.vue'
  import zhwlManyUpload from './zhwlUploadImg/zhwlManyUpload.vue'
  import { mapGetters,mapMutations,mapActions ,mapState  } from 'vuex'
  export default {
    name:'test',
    data(){
      return{
        message:'图片上传不能超过2张',
        autoUpload:false,
        fileList:[
          {key: 'zhwl-1543220943435.png', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
        ]
      }
    },
    computed:{
      ...mapState({
        count:(state)=>state.count.count,  //    // 映射 this.count 为==>this.$store.state.count.count
      }),
      ...mapGetters({
        count1:'count/getCount'         //  映射 this.count1 为  ==>this.$store.getters.count.count
      }
      ),
    },

    methods:{
      ...mapMutations({
        add:'count/changCount'    //  映射 this.add 为  ==> this.$store.commit('count/changCount','add')
      }),
      ...mapActions({
        del:'count/toggleCount'   //  映射 this.add 为  ==> this.$store.dispatch('count/toggleCount','del')
      }),

      addtest(){
        this.$store.commit('count/changCount','add')
      },
      deltest(){
        this.$store.dispatch('count/toggleCount','del')
      },

      //获取要传递给后台的key
      successFn(key){
//        console.log("成功回调")
      },
      //删除的回调
      removeFn(file,fileList){
//        console.log('删除回调',file,fileList)
      },
      //重置
      resertFn(){
        this.$refs.zhwlUploadImg._resertFn();
      },
      beforeremoveFn(val,file, fileList){
//        console.log(val,file, fileList)
      },
      uploadMany(){
        this.$refs.zhwlUploadImg._setSubmit().then(resp=>{
          console.log(resp)
          console.log(resp.resultKey)
          console.log(resp.resultKey.length)
            console.log("外围",resp)
        });
      }
    },
    components:{
      zhwlUploadImg,zhwlManyUpload
    }
  }
</script>
<style lang="less">

</style>
