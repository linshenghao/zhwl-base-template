<template>
  <div style="">
    <div class="wrap" id="wrap">
      <div id="small">
        <img :src="src.bg.admin_bg" alt="">
        <div id="move"></div>
      </div>
      <div id="big" style="display: none">
        <img :src="src.bg.admin_bg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import {resource} from '@/config/base/index'
  export default {
    name: 'magnifying-glass',
    props: {

    },
    data(){
      return{
        src:resource
      }
    },
    create(){
    },
    mounted(){
      this.initScole()
    },
    methods:{
      initScole(){
        var oWrap = document.getElementById('wrap');
        var smallDiv = document.getElementById('small');
        var move = document.getElementById('move');
        var bigDiv = document.getElementById('big');

        smallDiv.onmousemove = function(ev) {
          var oEvent = ev || event;
          var iScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
          var iScrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
          var disX = oEvent.clientX + iScrollLeft - move.offsetWidth / 2 - oWrap.offsetLeft;
          var disY = oEvent.clientY + iScrollTop - move.offsetHeight / 2 - oWrap.offsetTop;
          if (disX < 0) {
            disX = 0;
          } else if (disX > smallDiv.offsetWidth - move.offsetWidth) {
            disX = smallDiv.offsetWidth - move.offsetWidth;
          };
          if (disY < 0) {
            disY = 0;
          } else if (disY > smallDiv.offsetHeight - move.offsetHeight) {
            disY = smallDiv.offsetHeight - move.offsetHeight;
          };
          move.style.left = disX + 'px';
          move.style.top = disY + 'px';
          /*算出move块在X轴的移动距离与总的移动距离的比例*/
          var _pageX = disX / (smallDiv.offsetWidth - move.offsetWidth);
          /*算出move块在Y轴的移动距离与总的移动距离的比例*/
          var _pageY = disY / (smallDiv.offsetHeight - move.offsetHeight);
          /*求出大图片在X轴的移动距离*/
          var mX = _pageX * (bigDiv.children[0].offsetWidth - bigDiv.offsetWidth);
          /*求出大图片在Y轴的移动距离*/
          var mY = _pageY * (bigDiv.children[0].offsetHeight - bigDiv.offsetHeight);
          bigDiv.children[0].style.left = -mX + 'px';
          bigDiv.children[0].style.top = -mY + 'px';
        };

//3.
        smallDiv.onmouseover = function(ev) {
          bigDiv.style.display = 'block';
          move.style.display = 'block';
          smallDiv.onmousemove(); //兼容IE
        };
        smallDiv.onmouseout = function() {
          bigDiv.style.display = 'none';
          move.style.display = 'none';
        };
      }
    },
    computed: {

    }
  }
</script>

<style scoped>
  *{
    margin:0;
    padding:0;
  }
  .wrap{
    width: 600px;
    height: 360px;
    margin:100px;
  }
  #small,#big{
    width: 298px;
    height: 358px;
    border:1px solid #ccc;
    float:left;
  }
  #small{
    text-align:center;
    position: relative;
  }
  #small img{
    width: 285px;
    height:346px;
    margin-top:6px;
  }
  #move{
    width: 150px;
    height: 150px;
    /*background:rgba(255,255,255,.5);*/
    background:#fff;
    opacity:.5;
    filter:alpha(opacity=50);
    position: absolute;
    top: 0;
    left: 0;
    cursor:move;
    display:none;
  }
  #big{
    position:relative;
    overflow:hidden;
    display:block;
  }
  #big img{
    position:absolute;
    top:0;
    left:0;
  }
</style>
