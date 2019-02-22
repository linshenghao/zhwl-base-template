<template>
  <div id="com-zhDialog" v-show="zhDialogDialod">
    <div class="zh-dialog-bg">
      <div class="zh-dialog-box" :class="isSmall?'zh-dialog-box-small':isScale?'zh-dialog-box-big':''">
          <div class="zh-dialog-box-re">
              <div  class="zh-dialog-handle zh-dialog-handle-small" @click="Handlesmall">
                <svg-icon iconClass="small"></svg-icon>
              </div>
              <div  class="zh-dialog-handle zh-dialog-handle-scale" @click="Handlescale">
                <svg-icon iconClass="scale"></svg-icon>
              </div>
              <div class="zh-dialog-handle zh-dialog-handle-close" @click="close()">
                <svg-icon iconClass="close"></svg-icon>
              </div>
              <div class="zh-dialog-header" >
                <h1 class="zh-dialog-title">
                  <slot name="header"></slot>
                </h1>
              </div>
              <div class="zh-dialog-body" v-show="!isSmall">
                <slot name="main"></slot>
              </div>
              <div class="zh-dialog-footer"  v-show="!isSmall">
                  <slot name="footer"></slot>
              </div>
          </div>
        </div>
    </div>
    <!--弹框的背景-->
    <div class="zh-dialog-background"  v-show="!isSmall"></div>
  </div>
</template>

<script>
  export default {
    name:'zhDialog',
    props:{
      zhDialogDialod:{
        type:Boolean,
        default:false
      }
    },
    watch:{
      zhDialogDialod:function (newval,oldval) {
        this.childzhDialogDialod = newval;
        //移除之前的move事件
        this.initMove();
        //重新监听
        this.dragFn();
      }
    },
    data(){
      return{
        childzhDialogDialod:this.zhDialogDialod,
        isScale:false,
        isSmall:false
      }
    },
    mounted(){
      //实例化弹框的时候，监听拖拽
      this.dragFn();
    },
    methods:{
      close(){
        this.$emit('update:zhDialogDialod',false);
        this.initArgument();
      },

      //初始化参数
      initArgument(){
        this.isSmall = false;  //缩小为false
        this.isScale = false;  //缩小为false
        this.dragFn();
      },

      //放大弹框----- 点击放大的时候移除拖拽事件   点击放大时缩小为false  ,点击缩小时放大为true
      Handlescale(){
        this.isScale = this.isScale?false:true;
        if(this.isScale){
          this.isSmall = false;  //缩小为false
          this.removeDrag()
        }else{
          this.dragFn();
        }
      },
      //点击缩小
      Handlesmall(){
        this.isSmall = this.isSmall?false:true;
        if(this.isSmall){
          this.isScale = false;  //缩小为false
          this.removeDrag()
        }else{
          this.dragFn();
        }
      },

      //移除弹框拖拽事件
      removeDrag(){
        if(document.getElementsByClassName("zh-dialog-header")[0]){
          document.getElementsByClassName("zh-dialog-header")[0].removeEventListener('mousedown',this.start);
        }
        this.initMove();
      },

      dragFn(){
        document.getElementsByClassName("zh-dialog-header")[0].addEventListener('mousedown',this.start)
      },

      //监听弹框鼠标按下事件
      start(ev){
        let that = this;
        let oDiv = document.getElementsByClassName("zh-dialog-box")[0];
        ev.preventDefault();
        let disX = ev.clientX -oDiv.offsetLeft;
        let disY = ev.clientY - oDiv.offsetTop;
        //边界处理
        //body可视区的宽度
        const screenWidth = document.documentElement.clientWidth || document.body.clientWidth;
        //body可视区域的高度
        const screenHeight = document.documentElement.clientHeight || document.body.clientHeight
        const dragDomWidth = oDiv.offsetWidth  //oDiv.offsetWidth
        const dragDomHeight = oDiv.offsetHeight    //oDiv.offsetHeight
        document.onmousemove = function (ev) {
          that.move(oDiv,ev,disX,disY,screenWidth,screenHeight,dragDomWidth,dragDomHeight);
        } ;
        that.initMove();
      },
      //移动事件
      move(oDiv,ev,disX,disY,screenWidth,screenHeight,dragDomWidth,dragDomHeight){
        oDiv.style.margin = '0';    //设置margin  为auton
        ev.preventDefault();
        if((ev.clientX-disX)<0){
          oDiv.style.left = 0 + "px";
        }else if((ev.clientX-disX)>(screenWidth - parseInt(dragDomWidth))){
          oDiv.style.left = (screenWidth - parseInt(dragDomWidth)) + "px";
        }else{
          oDiv.style.left = (event.clientX - disX) + "px";
        }
        if((ev.clientY-disY)<0){
          oDiv.style.top = 0 + "px";
        }else if((ev.clientY-disY)>(screenHeight - parseInt(dragDomHeight))){
          oDiv.style.top = (screenHeight - parseInt(dragDomHeight)) + "px";
        }else{
          oDiv.style.top = (ev.clientY - disY) + "px";
        }
      },
      //初始化移动事件
      initMove(){
        document.onmouseup = function(ev){
          ev.preventDefault();
          document.onmousemove=null;
          document.onmouseup=null;
        };
      }

    },
    //组件销毁的时候移除监听
    destroyed(){
      this.removeDrag()
    },
  }
</script>

<style lang="less" scoped>
  #com-zhDialog{
    .zh-dialog-background{
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 10;
      background:rgba(0,0,0,0.5) ;
    }
    .zh-dialog-bg{
      /*最外层白框*/
      .zh-dialog-box{
        animation:zh-owe-dialog-body-animation .5s;
        position: fixed;
        left: 0;
        top:0;
        right: 0;
        bottom: 0;
        margin: auto;
        z-index: 10000;
        background: white;
        max-height: 700px;
        overflow-y: scroll;
        width: 60%;
        height: 500px;
        border-radius: 5px;
        box-sizing: border-box;
        /*里面的白框  让其他可定位*/
        .zh-dialog-box-re{
          position: relative;
          width: 100%;
          height: 100%;
          left: 0;
          top:0;
          /*关闭图标样式*/
          .zh-dialog-handle{
            position: absolute;
            right: 10px;
            top: 10px;
            cursor: pointer;
            .zh-dialog-close-icon{
              color: white;
              width: 44px;
              height: 44px;
              &:active{
                color: #3fad7e;
                transition: all .5s;
              }
            }
            &-scale{
              right: 50px;
            }
            &-close{
              right: 10px;
            }
            &-small{
              right: 100px;
            }
          }
          .zh-dialog-close{

          }
          /*弹框的头部*/
          .zh-dialog-header{
            padding: 8px;
            background-color: #e5e5e5;
            box-sizing: border-box;
            cursor: move;
              .zh-dialog-title{
                padding: 0;
                margin: 0;
                font-size: 20px;
                line-height: 20px;
                text-align: left;
                font-weight: normal;
              }
          }
          /*主要内容*/
          .zh-dialog-body{
            padding: 10px;
            box-sizing: border-box;
          }
          /*弹框的底部*/
          .zh-dialog-footer{
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            background-color: #e5e5e5;
            z-index: 10;
            padding: 10px;
            box-sizing: border-box;
          }
        }
        &::-webkit-scrollbar{
          display: none;
        }
      }
      /*放大窗口的样式*/
      .zh-dialog-box-big{
        position: fixed !important;
        left: 0 !important;
        top: 0 !important;
        width: 100% !important;
        height: 100% !important;
        max-height: 100% !important;
        overflow: hidden !important;
        margin: 0 !important;
      }
      //缩小窗口的样式
      .zh-dialog-box-small{
        position: fixed !important;
        left: 30px !important;
        bottom: 30px !important;
        top: auto !important;
        width: 300px !important;
        height: 36px !important;
        margin: 0 !important;
        overflow: hidden !important;
        border: 1px solid @theme;
      }

    }
    @keyframes zh-owe-dialog-body-animation {
      from{
        transform: scale(0.5);
      }
      to{
        transform: scale(1);
      }
    }
  }
</style>
