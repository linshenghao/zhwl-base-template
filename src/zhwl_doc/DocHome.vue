<template>
  <div id="DocHome">
    <el-container style="border: 1px solid #eee">
      <div style="background: #001529;position:relative;margin-left: -1px;margin-top: -1px">
        <div style="position: relative">
            <span class="bar" @click="closeBar">
              <i style="position: relative;display: block;width: 14px;height: 14px">
                   <i class="fa fa-backward fa-lg" style="position: absolute;" :class="isCollapse?'tranH':'tranV'"></i>
              </i>
            </span>
        </div>
        <el-aside  style="background: #001529;position: relative;" :class="isCollapse?'minmenuWidth':'maxmenuWidth'">
          <el-menu  background-color="#001529"
                    text-color="#fff"
                    :class="isCollapse?'minmenuWidth':'maxmenuWidth'"
                    unique-opened router
                    active-text-color="#ffd04b"
                    class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
            <template v-for="(item,index) in docRoute">
              <el-submenu v-if="item.children.length>0"  :key="index"  :index="index+''" >
                <template slot="title">
                  <i  :class="item.iconCls"></i>
                  <span slot="title" class="parent-item">
                      {{item.name}}
                  </span>
                </template>
                <el-menu-item v-for="(child,is) in item.children" :index="child.path"  :key="is+'key'"  @click="addRouteList(child)">
                  <i  :class="child.iconCls"></i>
                  <span slot="title" class="child-item">
                        {{child.name}}
                  </span>
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-if="item.children.length==0" :index="item.path" :key="index+'key'">
                <i class="el-icon-menu"></i>
                <span slot="title">{{item.name}}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </el-aside>
      </div>
      <el-container style="height: 100%;overflow:hidden;">
        <el-main style="background: white;padding: 0">
          <el-header style="text-align: right; font-size: 12px;line-height: 60px">
            <div style="display: flex;align-items: center;margin-right: 7px; justify-content:space-between">
              <div  style="display: flex;align-items: center;">
                <el-breadcrumb separator-class="el-icon-arrow-right" style="display: inline-block">
                  <el-breadcrumb-item style="cursor: pointer">
                    <i class="fa fa-home fa-fw"   aria-hidden="true" @click="goHome"></i></el-breadcrumb-item>
                  <el-breadcrumb-item v-if="!Array.isArray(this.$router.currentRoute.name)">
                    <router-link style="text-decoration: none"
                                 :to="{path:this.$router.currentRoute.path}" class="el-breadcrumb__inner">{{this.$router.currentRoute.name}}</router-link>
                  </el-breadcrumb-item >
                  <el-breadcrumb-item  v-else-if="Array.isArray(this.$router.currentRoute.name)" v-for="(child,is) in arr" :index="child.path" :key="is+'key'">
                    活动列表
                  </el-breadcrumb-item>
                </el-breadcrumb>
              </div>
              <div style="display: flex;align-items: center;">
                <i :class="fullPagebool?'fa fa-arrows-alt success':'fa fa-arrows-alt'" style="font-size: 16px;margin-right: 20px;cursor: pointer" @click="fullWindow"></i>
                <el-badge style="margin-right: 20px;cursor: pointer" :is-dot="this.$store.state.nfDot">
                  <i class="fa fa-bell" style="font-size: 14px;"></i>
                </el-badge>
                <el-dropdown @command="handleCommand">
                 <span class="el-dropdown-link"  style="font-size: 16px;cursor: pointer;color: #f18d00">
                  {{userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="personalCenter" >个人中心</el-dropdown-item>
                    <el-dropdown-item command="setting">设置</el-dropdown-item>
                    <el-dropdown-item  command="logout" divided>
                      <span>注销登录</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <img src="../assets/img/default.jpg"
                     style="width: 35px;height: 35px; margin-right: 5px;margin-top: -4px;margin-left: 21px;"/>
              </div>
            </div>
          </el-header>
          <div class="tag_box">
            <el-tabs v-model="RouteListactive" type="card" closable @tab-remove="removeTab" @tab-click="changRoute">
              <el-tab-pane
                v-for="(item, index) in RouteList"
                :key="item.name"
                :label="item.title"
                :name="item.name"
              >
              </el-tab-pane>
            </el-tabs>
          </div>
          <keep-alive>
            <router-view v-if="this.$route.meta.keepAlive" @changRouter="queryGet"></router-view>
          </keep-alive>
          <router-view v-if="!this.$route.meta.keepAlive" @changRouter="queryGet"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  import {Profn} from '../utils/proFn.js'
  import componentsRoute from '../router/modules/componentsRoute'
  export default{
    data(){
      return {
        routerQuery:{},
        isCollapse: false,
        tableData:[],
        checkable:false,
        menuWidth:false,
        //主题色
        theme:{
          backgroundColor:'#545c64',
          textColor:'#fff',
          activeTextColor:'#ffd04b'
        },
        userInfo:{
          name:'',
          userface:'../assets/default.jpg'
        },
        RouteListactive: '/',
        RouteList:[],
        fullPagebool:false,
        menuSocket:{},
        docRoute:componentsRoute
      }
    },
    created(){},
    mounted: function () {
      console.log("docRoute",this.docRoute)
      if(this.zhwl.jsCookie.get('user')){
        this.userInfo.name = JSON.parse(this.zhwl.jsCookie.get('user')).name
      }else {
        this.userInfo.name = '临时管理员'
      }
      //当前激活的路由
      this.initRouteList();

      //防止刷新的时候vuex的socket消失
    },

    watch:{
      menuInfo:{
        handler(val, oldVal){
        },
        deep:true
      }
    },
    methods: {

      //下拉框点击不同按钮的不同逻辑
      handleCommand(cmd){
        switch(cmd) {
          case 'logout':
            this.logout();
            break;
          case "personalCenter":
            this.$router.push({path: '/personalCenter'}); // 对象
            break;
          case "setting":
            this.$router.push({path: '/setting'}); // 对象
            break;
        }
      },

      //点击退出
      logout:function (event) {
        this.$confirm('注销登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            method:'get',
            url:'/logout'
          });
          this.$store.commit('logout');
          this.$router.push({path: '/'}); // 对象
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消'
          });
        });
      },
      login_out(){
        this.$store.commit('logout', data.msg);  //保存session
        this.$router.replace({path:'/'});
      },
      //初始化路由
      initRouteList(){
        let json = {
          title: '主页',
          name: '/Home',
          closable:false,
        };
        this.RouteList.push(json);
        if(this.$router.currentRoute.path!='/Home'&&this.$router.currentRoute.path!='/'){
          this.RouteList.push({
            title: this.$router.currentRoute.name,
            name: this.$router.currentRoute.path,
            closable:true,
          })
        }
        this.RouteListactive = this.$router.currentRoute.path;
      },
      //全屏展示window
      fullWindow(){
        //  判断是否是全屏状态    false为否.....
        let $window = document.documentElement;
        if(!this.fullPagebool){
          Profn.fullPage($window);
        }else{
          Profn.cancelFullpage($window)
        }
        this.fullPagebool = this.fullPagebool ? false :true;

      },
      //添加路由到导航路由组中
      addRouteList(val){
        let key = false;
        for(let i in this.RouteList){
          if(this.RouteList[i].name == val.path ){
            key = true;
            break;
          }
        }
        if(!key){
          let json = {
            title: val.name,
            name: val.path,
            closable:true,
          };
          this.RouteList.push(json);
        }
        this.RouteListactive = val.path;
      },

      //切换路由
      changRoute(val){
        this.$router.push({path:val.name})
      },

      handleOpen(key, keyPath) {
      },
      handleClose(key, keyPath) {
      },
      goChat(){
        this.$router.push({path: '/chat'});
      },
      // handleCommand(cmd){
      //   var _this = this;
      //   if (cmd == 'logout') {
      //     this.$confirm('注销登录, 是否继续?', '提示', {
      //       confirmButtonText: '确定',
      //       cancelButtonText: '取消',
      //       type: 'warning'
      //     }).then(() => {
      //       window.location.href = 'logout';
      //     }).catch(() => {
      //       _this.$message({
      //         type: 'info',
      //         message: '取消'
      //       });
      //     });
      //   }
      // },
      gotoLocalRouter(path,query){
        console.log('path:',path);
        let querys = this.routerQuery;
        this.$router.push({path:path,query:querys});
      },
      //通过组件通讯，改变路由query的值，并改变跳转的参数-----2018.3.9
      queryGet(nestStatus){
        // console.log("nestStatus",nestStatus)
        this.routerQuery = nestStatus
      },

      //折叠菜单栏的函数
      closeBar(){//关闭和打开bar的时候，进行变化
        if(this.isCollapse){
          this.isCollapse = false
        }else{
          this.isCollapse = true;
        }
      },

      //关闭标签时的函数，删除当前关闭的标签...
      removeTab(targetName) {
        for(let i = 0;i< this.RouteList.length;i++){
          if(targetName!='/Home'){
            if(this.RouteList[i].name == targetName){
              if(this.RouteList[i].name==this.$router.currentRoute.path){
                this.RouteListactive = this.RouteList[i-1].name;
                this.$router.push({path:this.RouteList[i-1].name})
              }
              this.RouteList.splice(i,1);
            }
          }else {
            this.RouteListactive = '/Home';
            this.$router.push({path:'/Home'})
          }

        }
      },

      //回到首页
      goHome(val){
        this.RouteListactive = '/Home';
        this.$router.push({path:'/Home'})
      },

    },
    computed: {
      //返回用户信息
      user(){
        return this.$store.state.user;
      },
      //返回路由页面
      routes(){
        // console.log(this.$store.state.routes);
        return this.$store.state.routes
      },
      _this(){
        return this.$router
      },
      //websocket返回商家审核提醒
      menuInfo(){
        return this.$store.state.menuInfo
      }
    }
  }
</script>
<style lang="less">
  #DocHome{
    height: 100%;
    .el-container{
      height: 100%;
    }

    /*aside的样式*/
    .el-aside{
      /*margin-left: -1px;*/
      margin-top: -1px;
      margin-bottom: -1px;
      overflow-x: hidden;
      overflow-y: scroll;
    }
    .el-aside::-webkit-scrollbar{//隐藏滚动条，可以滚动
      display:none;
    }
    .cellBar{

    }

    /*el-main的背景色*/
    .el-main{
      background-color: rgb(238, 241, 246);
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      /*width: 200px;*/
      min-height: 400px;
    }


    .el-submenu__title{
      border-bottom: 1px dashed  #2d374b ;
    }
    .el-menu{
      /*margin-left: -1px;*/
      /*margin-top: -1px;*/
      margin-bottom: -1px;

    }
    .el-menu--inline{
      /*background-color: #292f3f !important;*/
    }
    .el-menu-item{
      background-color: rgb(0, 21, 33) !important;
    }
    .el-menu-item:hover{
      background-color: #292f3f !important;
    }


    .el-submenu__title{
      text-align: left;
    }
    .el-menu-item{
      text-align: left;
    }
    .el-submenu__title span{
      transition: all 0.5s;
    }

    /*菜单栏的宽度*/
    .maxmenuWidth{
      .el-submenu{
        width: 200px !important;
      }
    }
    /*执行变宽的过度*/
    .maxmenuWidth{
      /*min-width: 200px !important;*/
      width: 200px !important;
      transition: all 0.5s;
    }
    /*执行变窄的过度*/
    .minmenuWidth{
      transition: all 0.5s;
      width: 64px !important;
    }


    /*折叠板的样式*/
    .bar{
      padding: 9px;
      display: block;
      box-shadow: 0px 0px 3px #3fad7e,   /*左边阴影*/
        0px -1px 3px #3fad7e,  /*上边阴影*/
      1px 0px 3px #3fad7e,  /*右边阴影*/
      0px 1px 3px #3fad7e;
      background-color: white;
      border-radius: 2em;
      position: absolute;
      z-index: 10000;
      right: -15px;
      top: 45px;
      cursor: pointer;
    }

    /*折叠版的选装样式修改*/
    .tranH{
      left: 1px;
      top: 1px;
      transition: all 0.5s;
      color: #f18d00;
      transform: rotate(180deg);
    }
    .tranV{
      top: 0px;
      left: -2px;
      transition: all 0.5s;
      transform: rotate(0);
    }

    /*顶部卡片tab切换的样式修好*/
    .el-tabs__content{
      /*height: calc(100% - 40px);*/
    }
    .el-tabs__header{
      margin: 0;
      /*background: white;*/
    }
    .tag_box{
      padding: 8px;
      background: #eee;
      .v-ul{
        li{
          float:left;
          display: block;
          background: white;
          padding: 5px;
          margin-right: 10px;
          list-style: none;
          min-width: 80px;
        }
      }
    }
    .el-tabs--card>.el-tabs__header .el-tabs__item{
      border-bottom: none;
    }
    .el-tabs--card>.el-tabs__header{
      border: none;
    }
    .el-tabs--card>.el-tabs__header .el-tabs__nav{
      border: none;
    }
    .el-tabs--card>.el-tabs__header .el-tabs__item{
      border: none;
      background: white;
      margin-right: 10px;
    }
    .el-tabs__nav-next{
      background: white;
      width: 30px;
      z-index: 50;
      color: #f18d00;
    }
    .el-tabs__nav-prev{
      background: white;
      width: 30px;
      z-index: 50;
      color: #f18d00;
    }
    .el-tabs__nav-wrap.is-scrollable{
      padding: 0 35px;
    }



    /*子路由的消息提示样式*/
    .child-item{
      /*通知标识*/
      .el-badge__content.is-fixed{
        top: 25px;
        right: -9px;
      }
      .el-badge__content{
        border: none;
      }
    }

    /*父路由的消息提示*/
    .parent-item{
      /*通知标识*/
      .el-badge__content.is-fixed{
        top: 28px;
        right: -9px;
      }
      .el-badge__content{
        border: none;
      }
    }
  }
</style>
