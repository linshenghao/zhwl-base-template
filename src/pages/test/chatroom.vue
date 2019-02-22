<template>
  <div id="chatRoom">
      <h1 class="T" @click="testsocket()">客服中心</h1>
      <!--<p @click="disconnectsocket()">断开连接</p>-->
    <svg-icon icon-class="eye" size="40px" style="font-size: 14px"></svg-icon>
     <div class="mbT30">
       <el-row :gutter="12">
         <el-col :span="6">
           <el-card shadow="hover" style="cursor: pointer">
             <div style="display: flex;align-items: center;">
                 <img :src="src.defaultImg" alt="" style="width: 30px;height: 30px">
               <div class="" style="margin-left: 10px">
                 <h1 class="chatface">用户名</h1>
               </div>
             </div>
             <p class="chatcontent">
               内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
           </el-card>
         </el-col>
       </el-row>
     </div>

    <el-dialog
      title="提示"
      v-dialogDrag
      ref="dialog__wrapper"

      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <div
        v-dialogDragWidth="$refs.dialog__wrapper"
        class="line"
       ></div>
      <span>需要注意的是内容是默认不居中的</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>


    <div class="chatBox" v-if="chatBoxbool">
        <div class="messageBox">

        </div>
        <div class="sendBox">
          <input type="text" class="sendMessage">
        </div>
      </div>

    <button @click="testSocket">测试连接</button>
    <input type="text" placeholder="请输入发送内容">
    <button @click="sendMessage">发送数据</button>
    <button @click="closeMessage">关闭连接</button>


    <button @click="getWebSocketResponse">测试重新订阅</button>



    <button @click="sendStomp">发送stomp协议给后台</button>




  </div>
</template>
<script>
  import '../../lib/stomp.js'
  import '../../lib/sockjs.js'
  import {resource} from '@/config/base/index.js'
  import draggable from 'vuedraggable'
  export default {
    name:'chatRoom',
    data(){
      return{
        chatBoxbool:false,
        centerDialogVisible:false,
        socket:'',
        wsObject:{},
        src:resource
      }
    },
    sockets:{//不能改
      connect:function() {//与socket.io连接后回调
        console.log('socket connected');
      },
      login:function(value) {
        console.log("????",value);//监听login(后端向前端emit  login的回调)
      },
      res:function (message) {
        console.log("res",message)
      }
    },
    mounted(){
//      this.getWebSocketResponse();
    },

    methods:{
      sendStomp(){
        this.$store.state.stomp.send("/app/shop/loadedSettledAudit", {}, "hello");
      },
      closeMessage(){
        this.wsObject.onclose = function(evt) {
          console.log("Connection closed.");
        };
      },
      sendMessage(){
        this.wsObject.send("Hello WebSockets!");
      },
      testSocket(){
        this.wsObject = new WebSocket('ws://'+'192.168.100.29'+":"+'9999/ws/webSocket/info');
        this.wsObject.onopen = function(evt) {
          console.log("Connection open ...");

        };

        this.wsObject.onmessage = function(evt) {
          console.log( "Received Message: " + evt.data);
//          this.wsObject.close();
        };

      },
      testsocket(){
//        this.centerDialogVisible = true;
        this.$socket.emit('chat',{"hello":"1223"});//触发start
      },
      //获取websocket  请求
      getWebSocketResponse(){
        if(Object.keys(this.menuInfo).length<=0){
          this.$store.dispatch("connect").then(resp=>{
            console.log("socket信息",this.menuInfo);
          });
        }
      },
      move(){

      },
      disconnectsocket(){
        console.log("????")
        this.$socket.emit('disconnectlimt');//触发start
      }
    },
    components: {
      draggable,
    },
    computed: {
      //websocket返回商家审核提醒
      menuInfo(){
        return this.$store.state.menuInfo
      }
    }
  }
</script>
<style lang="less">
  #chatRoom{
    padding: 20px;
    .T{
      margin: 20px 0;
    }
    .chatface{
      font-size: 16px;color: #333333;text-align: left
    }
    .chatcontent{
      line-height: 18px;font-size: 14px;color:#8A8A8A;text-align: left;height: 57px;overflow:hidden
    }
    .chatBox{
      position: fixed;
      height: 600px;
      cursor: move;
      width: 800px;
      background: #eeeeee;
      top: 0;
      left:0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
  }
</style>
