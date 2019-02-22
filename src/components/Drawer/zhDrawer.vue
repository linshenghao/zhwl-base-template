<template>
  <div class="zh-drawer zh-drawer-right" :class="zhDrawerClose?'zh-drawer-open':''">
    <div class="zh-drawer-mask" @click.stop="closeDrawer">

    </div>
    <div class="zh-drawer-content-wrapper" style="width: 300px" :class="zhDrawerClose?'':'zh-drawer-close-translateX'">
      <div class="zh-drawer-content">
        <div class="zh-drawer-header-no-title">
            <button class="zh-drawer-close" @click="closeDrawer">
              <i class="el-icon-close "></i>
            </button>
        </div>
        <div class="zh-drawer-wrapper-body">
          <div class="zh-setting-drawer-index-content">
            <div class="" style="margin-bottom: 24px;">
              <h3 class="zh-setting-drawer-index-title">
                整体风格设置
              </h3>
              <div class="zh-setting-drawer-index-blockChecbox">
                <div class="zh-setting-drawer-index-item">
                  <img src="https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg" alt="">
                  <i class="el-icon-check"></i>
                </div>
                <div class="zh-setting-drawer-index-item">
                  <img src="https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg" alt="">
                  <i class="el-icon-check"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="zh-setting-drawer-index-content">
            <div class="" style="margin-bottom: 24px;">
              <h3 class="zh-setting-drawer-index-title">
                主体色
              </h3>
              <div class="zh-setting-drawer-index-blockChecbox">
                <div class="antd-setting-drawer-theme-color-colorBlock" style="background-color: rgb(245, 34, 45); " @click="changTheme"></div>
                <div class="antd-setting-drawer-theme-color-colorBlock" style="background-color: rgb(250, 84, 28);"  @click="changTheme"></div>
                <div class="antd-setting-drawer-theme-color-colorBlock" style="background-color: rgb(250, 173, 20);" @click="changTheme"></div>
                <div class="antd-setting-drawer-theme-color-colorBlock" style="background-color: rgb(19, 194, 194);" @click="changTheme"></div>
                <div class="antd-setting-drawer-theme-color-colorBlock" style="background-color: rgb(82, 196, 26);" @click="changTheme"></div>
                <div class="antd-setting-drawer-theme-color-colorBlock" style="background-color: rgb(24, 144, 255);" @click="changTheme"></div>
                <div class="antd-setting-drawer-theme-color-colorBlock" style="background-color: rgb(47, 84, 235);" @click="changTheme"></div>
                <div class="antd-setting-drawer-theme-color-colorBlock" style="background-color: rgb(114, 46, 209);" @click="changTheme"></div>
              </div>
            </div>
          </div>
          <div class="zh-divider zh-divider-horizontal">

          </div>
          <div class="zh-setting-drawer-index-content">
            <div class="" style="margin-bottom: 24px;">
              <h3 class="zh-setting-drawer-index-title">
                导航模式
              </h3>
              <div class="zh-setting-drawer-index-blockChecbox">
                <div class="zh-setting-drawer-index-item">
                  <img src="https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg" alt="">
                  <i class="el-icon-check"></i>
                </div>
                <div class="zh-setting-drawer-index-item">
                  <img src="https://gw.alipayobjects.com/zos/rmsportal/KDNDBbriJhLwuqMoxcAr.svg" alt="">
                  <i class="el-icon-check"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="zh-setting-drawer-index-content">
            <div class="" style="margin-bottom: 24px;">
              <h3 class="zh-setting-drawer-index-title">
                导航颜色
              </h3>
              <div class="zh-setting-drawer-index-blockChecbox">
                <div class="antd-setting-drawer-theme-color-colorBlock" style="background-color: #001529; " @click="changTheme"></div>
                <div class="antd-setting-drawer-theme-color-colorBlock" style="background-color: #DC0968"  @click="changTheme"></div>
                <div class="antd-setting-drawer-theme-color-colorBlock" style="background-color: rgb(250, 173, 20);" @click="changTheme"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="zh-drawer-config" @click="closeDrawer">
          <i class="zh-drawer-config-icon" :class="zhDrawerClose?'el-icon-close':'el-icon-setting'"></i>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  import { mapGetters,mapMutations,mapActions ,mapState  } from 'vuex';
  import { toggleClass } from '@/utils'
  import '@/assets/custom-theme/index.css' // the theme changed version element-ui css
  export default {
    name:'zhDrawer',
    data(){
      return{
        theme:''
      }
    },
    watch: {
      theme() {

      }
    },
    methods: {
      ...mapMutations({
        // 控制抽屉
        closeDrawer: 'layout/HANDLER_DRAWER',
      }),

      changTheme(){
        toggleClass(document.body, 'custom-theme')
      }
    },
    computed: {
      ...mapState({
        // 右侧菜单栏
        zhDrawerClose:(state)=>state.layout.zhDrawerClose,
      }),
    },
  }
</script>

<style lang="less" scoped>
  .zh-drawer{
    .zh-drawer-mask{
      position: fixed;
      left: 0;
      top:0;
      z-index: 9998;
      width: 100%;
      height: 0;
      opacity: 0;
      background-color: rgba(0,0,0,.65);
      filter: alpha(opacity=50);
      transition: opacity .3s linear,height 0s ease .3s;
    }
    .zh-drawer-content-wrapper{
      box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
      right: 0;
      top:0;
      height: 100%;
      position: fixed;
      z-index: 10000;
      transition: all .3s;
      .zh-drawer-content{
        background-color: #fff;
        border: 0;
        background-clip: padding-box;
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 1;
        .zh-drawer-header-no-title{
          position: relative;
          .zh-drawer-close{
            position: absolute;
            right: 0;
            top:0;
            border: 0;
            background: transparent;
            color: rgba(0, 0, 0, 0.45);
            cursor: pointer;
            z-index: 10;
            font-weight: 700;
            text-decoration: none;
            transition: color .3s;
            outline: 0;
            padding: 0;
            display: block;
            font-style: normal;
            text-align: center;
            text-transform: none;
            text-rendering: auto;
            width: 56px;
            height: 56px;
            line-height: 56px;
            font-size: 16px;
            i{
              font-size: 22px;
            }
            &:active{
              color:  #13C2C2;;
            }
            &:hover{
              color:  #13C2C2;;
            }
          }
        }
        /*右侧配置图标*/
        .zh-drawer-config{
          background: #13C2C2;
          border-radius: 4px 0 0 4px;
          position: absolute;
          top: 450px;
          right: 300px;
          z-index: 10001;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 48px;
          height: 48px;
          font-size: 16px;
          text-align: center;
          cursor: pointer;
          pointer-events: auto;
          .zh-drawer-config-icon{
            font-size: 22px;
            color: white;
          }
        }

        .zh-drawer-wrapper-body{
          padding: 24px;
          font-size: 14px;
          line-height: 1.5;
          word-wrap: break-word;
          box-sizing: border-box;
          .zh-setting-drawer-index-content{
            .zh-setting-drawer-index-title{
              color: rgba(0, 0, 0, 0.85);
              margin-bottom: 12px;
              font-size: 14px;
              line-height: 22px;
              text-align: left;
              font-weight: 500;
            }
            .zh-setting-drawer-index-blockChecbox{
              display: flex;
              .zh-setting-drawer-index-item{
                position: relative;
                margin-right: 16px;
                border-radius: 4px;
                cursor: pointer;
                .el-icon-check{
                  color:#13C2C2 ;
                  font-size: 22px;
                  position: absolute;
                  right: 5px;
                  bottom: 10px;
                }
              }
              .antd-setting-drawer-theme-color-colorBlock{
                width: 20px;
                height: 20px;
                margin-right: 8px;
                color: #fff;
                font-weight: 700;
                text-align: center;
                border-radius: 2px;
                cursor: pointer;
              }
            }
          }
        }
      }
    }

    .zh-drawer-close-translateX{
      transform: translateX(100%);
    }

    .pop-model{
      position: fixed;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      z-index: 1000;
      background: rgba(0,0,0,0.5);
      transition: 0.5s;
      .pop-card{
        animation: tranleft 0.5s;
        background: #ebebeb;
        height: 100%;
        width: 80%;
        z-index: 10000;
        position: absolute;
        right: 0;
        .pop-header{
          padding: 5px;
          text-align: center;
          margin-bottom: 10px;
          background: white;
          position: relative;
          h1{
            font-size: 22px;
            font-weight: normal;
            font-family: "Adobe Caslon Pro";
          }
          .close-bar{
            position: absolute;
            padding: 0 15px;
            left: 0;
            top: 0;
            height: 100%;
            .close-bar-icon{
              display: block;
              font-size: 16px;
              height: 100%;
            }
          }
        }
      }

    }
    @keyframes tranleft{
      from{
        transform: translateX(100%);
      }
      to{
        transform: translateX(0);
      }
    }
  }
  .zh-drawer-open{
    .zh-drawer-mask{
      opacity: .3;
      height: 100%;
      animation: antdDrawerFadeIn .3s cubic-bezier(.7,.3,.1,1);
      transition: none;
    }
    .zh-drawer-content-wrapper{
      box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
      right: 0;
      height: 100%;
      position: fixed;
    }
  }
  @keyframes antdDrawerFadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: .3;
    }
  }


/*下划线样式*/
  .zh-divider{
    color: rgba(0, 0, 0, 0.65);
    background: #e8e8e8;
    font-size: 14px;
    font-variant: tabular-nums;
    font-feature-settings: "tnum";
    line-height: 1.5;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .zh-divider-horizontal{
    display: block;
    height: 1px;
    width: 100%;
    min-width: 100%;
    margin: 24px 0;
    clear: both;
  }
  .zh-divider-vertical{
    margin: 0 8px;
    display: inline-block;
    height: .9em;
    width: 1px;
    vertical-align: middle;
    position: relative;
    top: -.06em;
  }






</style>
