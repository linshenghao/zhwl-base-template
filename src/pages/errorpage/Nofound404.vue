<template>
  <div id="Nofound" style="margin: auto;text-align: center" >
    <img :src="src.errorPage.Nofound404" alt="" style="width: auto;height: 500px" >
  </div>
</template>
<script>
  import {resource} from '@/config/base/index'
  export default {
    name:"Nofound",
    data(){
      return{
        src:resource
      }
    }
  }
</script>

<style lang="less">
  @prefix: ~'vue-scroller-bars';
  .handel{
    font-size: 16px;
    &-scoller{
      color: #f18d00;
    }
    &.wx{
      background: #f18d00;
    }
    .@{prefix}-scoller{
      color: red;
    }

  }

</style>
