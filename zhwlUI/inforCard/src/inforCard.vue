<style lang="less">
    @import '../styles/infor-card.less';
</style>

<template>
  <el-card class="box-card" :shadow="shadow">
      <el-row  class="infor-card-con">
        <el-col :span="8" class="infor-card-icon-con height-100"   :style="{backgroundColor: color, color: 'white'}">
          <el-row class="height-100"  type="flex"  justify="center" align="middle">
            <svg-icon :icon-class="iconType" :size="iconSize" style="height: 100%"></svg-icon>
          </el-row>
        </el-col>
        <el-col :span="16"  class="height-100" >
          <el-row class="height-100"  type="flex"  justify="center" align="middle">
            <count-up
              class="infor-card-count user-created-count"
              :id-name="idName"
              :end-val="endVal"
              :color="color"
              :countSize="countSize"
              :countWeight="countWeight"
            >
              <p class="infor-intro-text" slot="intro">{{ introText }}</p>
            </count-up>
          </el-row>
        </el-col>
      </el-row>
  </el-card>
</template>

<script>
import countUp from '../../countUp/src/countUp.vue';

export default {
    name: 'inforCard',
    components: {
        countUp
    },
    props: {
        idName: String,
        endVal: Number,
        color: String,
        iconType: String,
        introText: String,
        countSize: {
            type: String,
            default: '30px'
        },
        countWeight: {
            type: Number,
            default: 700
        },
        iconSize: {
            type: String,
        },
        shadow:{
            type: String,
        }
    }
};
</script>

