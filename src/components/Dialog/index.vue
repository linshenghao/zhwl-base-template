<template>
  <div id="Dialog_Test">
    <button @click="showDialog">查看弹框</button>
    <zh-dialog  :zhDialogdialog.sync="zhDialogdialog">
      <template slot="header">头部</template>
      <template slot="main">主要内容</template>
      <template slot="footer">底部</template>
    </zh-dialog>
  </div>
</template>

<script>
  import zhDialog from './zhDialog.vue'
  export default {
    name:'Test',
    components: {
      zhDialog
    },
    data(){
      return{
        zhDialogdialog:false
      }
    },
    methods:{
      showDialog(){
        this.zhDialogdialog = true;
      }
    }
  }
</script>

<style lang="less" scoped>
  #Test{

  }
</style>

