<style lang='less' scoped>
  @import "../assert/md.less";
  .javascript{
    color:#3fad7e;
  }
</style>
<script>
  export default {
    name:'zhylInfoCard',
    data(){
      return{
        count: {
          createUser: 496,
          visit: 3264,
          collection: 24389305,
          transfer: 39503498
        },
      }
    }
  }
</script>
#  动态字卡片

### 动态字卡片,能让文字展示成动画的效果的一种卡片展示风格
<div class="zhwl-block">
  <el-row :gutter="10">
       <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
         <infor-card
           id-name="user_created_count"
           :end-val="count.createUser"
           icon-type="tianjiayonghu"
           color="#2d8cf0"
           :icon-size="'50px'"
           intro-text="老人用户量"
         ></infor-card>
       </el-col>
       <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
         <infor-card
           id-name="visit_count"
           :end-val="count.visit"
           icon-type="chuangweiyuyue1"
           color="rgb(25, 190, 107)"
           :icon-size="'50px'"
           intro-text="床位数"
         ></infor-card>
       </el-col>
       <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
         <infor-card
           id-name="collection_count"
           :end-val="count.collection"
           icon-type="bachelor"
           color="rgb(255, 153, 0)"
           :icon-size="'50px'"
           intro-text="访客数量"
         ></infor-card>
       </el-col>
       <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
         <infor-card
           id-name="transfer_count"
           :end-val="count.transfer"
           icon-type="bianlitie"
           color="#64d572"
           :icon-size="'50px'"
           intro-text="外出数量"
         ></infor-card>
       </el-col>
     </el-row>
</div>

::: zhwl
```html
<div>
  <el-row :gutter="10">
       <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
         <infor-card
           id-name="user_created_count"
           :end-val="count.createUser"
           icon-type="tianjiayonghu"
           color="#2d8cf0"
           :icon-size="'50px'"
           intro-text="老人用户量"
         ></infor-card>
       </el-col>
       <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
         <infor-card
           id-name="visit_count"
           :end-val="count.visit"
           icon-type="chuangweiyuyue1"
           color="rgb(25, 190, 107)"
           :icon-size="'50px'"
           intro-text="床位数"
         ></infor-card>
       </el-col>
       <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
         <infor-card
           id-name="collection_count"
           :end-val="count.collection"
           icon-type="bachelor"
           color="rgb(255, 153, 0)"
           :icon-size="'50px'"
           intro-text="访客数量"
         ></infor-card>
       </el-col>
       <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
         <infor-card
           id-name="transfer_count"
           :end-val="count.transfer"
           icon-type="bianlitie"
           color="#64d572"
           :icon-size="'50px'"
           intro-text="外出数量"
         ></infor-card>
       </el-col>
     </el-row>
  <script>
    export default {
      name:'firstPage',
      data(){
        return{
          count: {
            createUser: 496,
            visit: 3264,
            collection: 24389305,
            transfer: 39503498
          },
        }
      }
    }
  </script>

</div>

```
:::
