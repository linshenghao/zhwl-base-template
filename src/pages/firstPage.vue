<template>
  <div id="firstPage">
    <el-row :gutter="10" style="margin: 0;margin-top: 10px">
      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" style="margin-bottom: 15px">
        <infor-card
          id-name="user_created_count"
          :end-val="count.createUser"
          icon-type="tianjiayonghu"
          color="#2d8cf0"
          :icon-size="'50px'"
          intro-text="职工人数"
        ></infor-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" style="margin-bottom: 15px">
        <infor-card
          id-name="visit_count"
          :end-val="count.visit"
          icon-type="chuangweiyuyue1"
          color="rgb(25, 190, 107)"
          :icon-size="'50px'"
          intro-text="使用人数"
        ></infor-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" style="margin-bottom: 15px">
        <infor-card
          id-name="collection_count"
          :end-val="count.collection"
          icon-type="bachelor"
          color="rgb(255, 153, 0)"
          :icon-size="'50px'"
          intro-text="打卡次数"
        ></infor-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" style="margin-bottom: 15px">
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
</template>
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
    },
    mounted(){

    },
    methods:{
    /*  changeRoute(str){
        this.$router.push({path:str})
      }*/
    }
  }
</script>
<style lang="less">
  #firstPage{

  }
</style>
