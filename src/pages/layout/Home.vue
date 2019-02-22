<template>
  <div id="home">
    <el-container style="border: 1px solid #eee">
      <zh-scroller>
        <el-menu  :background-color="theme.backgroundColor"
                  :text-color="theme.textColor"
                  :default-active="RouteListactive"
                  unique-opened router
                  :active-text-color="theme.activeTextColor"
                  class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
          <template v-for="(item,index) in this.routes" v-if="!item.hidden">
            <el-submenu :hide-timeout="300" v-if="item.children.length>0"  :key="index"  :index="index+''" >
              <template slot="title">
                <i  :class="item.iconCls"></i>
                <span slot="title" class="parent-item">
                    <el-badge v-if="Object.keys(menuInfo).length>0" :value="item.name==menuInfo.parentMenuName
                     ? 'new':item.name==businessSocketInfo.parentMenuName
                     ? 'new':''"  class="item">
                      {{item.name}}
                    </el-badge>
                    <el-badge v-else>
                         {{item.name}}
                    </el-badge>
                  </span>
              </template>
              <!-- @click="addRouteList(child)"    暂时注释这段代码，加入了路由变化函数，所以不需要-->
              <el-menu-item v-for="(child,is) in item.children" :index="child.path"  :key="is+'key'" >
                  <span slot="title" class="child-item">
                    <el-badge v-if="Object.keys(menuInfo).length>0" :value="child.name==menuInfo.menuName
                    ? menuInfo.unprocessedMessage:child.name==businessSocketInfo.menuName
                    ? businessSocketInfo.unprocessedMessage:''"  class="item">
                        {{child.name}}
                    </el-badge>
                     <el-badge v-else>
                           {{child.name}}
                    </el-badge>
                  </span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-if="item.children.length==0" :index="item.path" :key="index+'key'">
              <i class="el-icon-menu"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </zh-scroller>
      <el-container style="height: 100%;overflow:hidden;">
        <el-main style="background: white;padding: 0">
          <el-header style="text-align: right; font-size: 12px;line-height: 60px">
            <div style="display: flex;align-items: center;margin-right: 7px; justify-content:space-between;height: 100%">
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
                <theme-picker style="height: 100%;line-height: 60px;margin-right: 20px" class="theme-picker right-menu-item"/>
                <el-dropdown @command="handleCommand" >
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
                <img :src="src.defaultImg"
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
                :name="item.name">
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
    <zh-drawer></zh-drawer>
  </div>
</template>
<script>
  import {resource} from '@/config/base';
  import zhScroller from '@/components/scrollbar/zhScroller.vue'
  import zhDrawer from '@/components/Drawer/zhDrawer.vue'
  import ThemePicker from '@/components/ThemePicker'
  import { mapGetters,mapMutations,mapActions ,mapState  } from 'vuex'
  export default{
    data(){
      return {
        routerQuery:{},
        //主题色
        theme:{
          backgroundColor:'#001529',
          textColor:'#fff',
          activeTextColor:'#ffd04b'
        },
        userInfo:{
          name:'',
          userface:resource.defaultImg
        },
        RouteListactive: '/',
        RouteList:[],
        menuSocket:{},
        src:resource
      }
    },
    created(){},
    mounted: function () {
      if(this.zhwl.jsCookie.get('user')){
        this.userInfo.name = JSON.parse(this.zhwl.jsCookie.get('user')).username
      }else {
        this.userInfo.name = '临时管理员'
      }
      //初始化当前激活的路由
      this.initRouteList();

      //防止刷新的时候vuex的socket消失
      this.getWebSocketResponse();
    },

    watch:{
      menuInfo:{
        handler(val, oldVal){
        },
        deep:true
      },
      //监听路由的变化，添加bar
      $route: {
        handler: function(val, oldVal){
          this.addRouteList(val);
        },
        // 深度观察监听
        deep: true
      }
    },
    methods: {
      ...mapMutations({
        // 折叠菜单栏的函数
        closeBar:'layout/CHANGE_COLLAPSE',
        // 全屏展示window
        fullWindow:'layout/FULL_SCREEN',
        // 控制右侧菜单栏
        closeDrawer: 'layout/HANDLER_DRAWER',
      }),
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
      //初始化路由,一开始进来的时候显示主页
      initRouteList(){
        let json = {
          title: '主页',
          name: '/Home',
          closable:false,
        };
        this.RouteList.push(json);
        //判断是否是主页或者根路由
        if(this.$router.currentRoute.path!='/Home'&&this.$router.currentRoute.path!='/'){
          //判断是否是要显示在tab页上的
          if(!(this.$router.currentRoute.meta&&this.$router.currentRoute.meta.isHiddenBar)){
            this.RouteList.push({
              title: this.$router.currentRoute.name,
              name: this.$router.currentRoute.path,
              closable:true,
            })
          }
        }
        this.RouteListactive = this.$router.currentRoute.path;
      },
      //点击菜单栏的是否，添加路由到tab导航路由组中，做遍历处理
      addRouteList(val){
        let key = false;
        for(let i in this.RouteList){
          if(this.RouteList[i].name == val.path ){
            key = true;
            break;
          }
        }
        if(!key){
          //判断是否展示tabBar
          if(val.meta&&val.meta.isHiddenBar){
            return false
          }
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

      //获取websocket  请求
      getWebSocketResponse(){
          //TODO  暂时关闭socket
//        this.$store.dispatch("connect").then(resp=>{
//          console.log("socket信息");
//        });
      },
    },
    computed: {
      ...mapState({
        //  用户信息
        user:(state)=>state.user,
        //  返回路由页面
        routes:(state)=>state.routes,
        //  折叠菜单
        isCollapse:(state)=>state.layout.isCollapse,
        //  全屏
        fullPagebool:(state)=>state.layout.fullPagebool,
        //  系统管理员消息提示
        menuInfo:(state)=>state.menuInfo,
        //  商家消息提示
        businessSocketInfo:(state)=>state.businessSocketInfo,
      }),
    },
    components:{
      zhScroller,
      zhDrawer,
      ThemePicker
    }
  }
</script>
<style lang="less">
  @import "styles/el-tab-bar";
  @import "styles/el-menu";
  @import "styles/el-badge";
  @import "styles/mixins-menubar-commom";
  //收起的是否的小弹窗样式
  /*.el-menu--vertical{*/
    /*left: 51px !important;*/
  /*}*/
  #home{
    height: 100%;
    .el-container{
      height: 100%;
    }
    .mixinCollapse();
    /*el-main的背景色*/
    .el-main{
      background-color: rgb(238, 241, 246);
    }


  }
</style>
