<template>
  <div class="zh-scroller">
      <div class="zh-scroller-handler-icon">
            <span class="bar" @click="closeBar">
              <i class="bar-box" style="">
                   <i class="fa fa-backward fa-lg bar-item"  :class="isCollapse?'tranH':'tranV'"></i>
              </i>
            </span>
      </div>
    <!--解决火狐滚动条问题-->
      <div class="zh-scroller-outbar" :class="isCollapse?'boxminWidth zh-scroller-outbar-hiden':'boxmaxWidth'">
        <div class="zh-scroller-innerbar">
          <slot></slot>
        </div>
      </div>
  </div>
</template>
<script>
  import { mapGetters,mapMutations,mapActions ,mapState  } from 'vuex'
  export default {
    name:'zh-scroller',
    data(){
      return{}
    },
    methods:{
      ...mapMutations({
        //  折叠菜单栏的函数
        closeBar:'layout/CHANGE_COLLAPSE',
      }),
    },
    computed: {
      ...mapState({
        //  折叠菜单
        isCollapse:(state)=>state.layout.isCollapse,
      }),
    }
  }
</script>
<style lang="less" scoped>
  @import "../../pages/layout/styles/mixins-menubar-commom";
  .zh-scroller{
    background: #001529;
    position:relative;
    margin-left: -1px;
    margin-top: -1px;
    margin-bottom: -1px;
    /*操作图标*/
    .zh-scroller-handler-icon{
      position: relative
    }
    /*处理兼容火狐的外层div 打开状态*/
    .zh-scroller-outbar{
      height: 100%;
      width: 200px;
      overflow-x: hidden;
      overflow-y: hidden;
      transition: all .3s;
      .zh-scroller-innerbar{
        overflow-y:scroll;
        height: 100%;
        /*浏览器默认滚动条宽度17px*/
        width: 217px;
        overflow-x: hidden;
      }
    }
    /*菜单栏关闭状态*/
    .zh-scroller-outbar-hiden{
      .zh-scroller-innerbar{
        /*width: calc(55px + 17px);*/
      }
    }
    .mixinCollapse()
  }
</style>
