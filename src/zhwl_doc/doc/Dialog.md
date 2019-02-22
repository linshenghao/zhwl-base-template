<style lang='less' scoped>
  @import "../assert/md.less";
  .javascript{
    color:#3fad7e;
  }
</style>
<script>
  import zhDialog from '../../components/Dialog/zhDialog.vue'
  export default {
    name:'Test',
    components: {
      zhDialog
    },
    data(){
      return{
        zhDialogDialod:false
      }
    },
    methods:{
      showDialog(){
        this.zhDialogDialod = true;
      }
    }
  }
</script>
#  众合未来弹框组件
### 支持缩小、放大、拖拽
<div class="zhwl-block">
  <div id="Dialog_Test">
    <button @click="showDialog">查看弹框</button>
    <zh-dialog  :zhDialogDialod.sync="zhDialogDialod">
      <template slot="header">头部</template>
      <template slot="main">主要内容</template>
      <template slot="footer">底部</template>
    </zh-dialog>
  </div>
</div>

::: zhwl
```html
<div>
 <div id="Dialog_Test">
    <button @click="showDialog">查看弹框</button>
    <zh-dialog  :zhDialogDialod.sync="zhDialogDialod">
      <template slot="header">头部</template>
      <template slot="main">主要内容</template>
      <template slot="footer">底部</template>
    </zh-dialog>
  </div>
  <script>
    export default {
      name:'Test',
       data(){
          return{
            zhDialogDialod:false
          }
        },
       methods:{
          showDialog(){
            this.zhDialogDialod = true;
          }
        }
    }
  </script>
</div>

```
:::
