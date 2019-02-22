<template>
  <div class="components-container">
    <!--<code>-->
      <!--{{ $t('components.tinymceTips') }}-->
      <!--<a target="_blank" class="link-type" href="https://panjiachen.github.io/vue-element-admin-site/component/rich-editor.html"> {{ $t('components.documentation') }}</a>-->
    <!--</code>-->
    <div>
      <tinymce ref="tinymce" :height="300" v-model="content"/>
    </div>
       <p class="editor-content " v-html="content"/>

    <div id="test" @click="resert">
      重置
    </div>
  </div>
</template>

<script>
import Tinymce from './Tinymce/index.vue'

export default {
  name: 'TinymceDemo',
  components: { Tinymce },
  data() {
    return {
      content:
      `<p>测试</p>`
    }
  },
  mounted(){
  },
  watch:{
    content(val ,oldval){
    }
  },
  methods:{
    resert(){
      this.$refs.tinymce._resertFn();
      console.log(this.content)
    }
  }
}
</script>

<style scoped>
.editor-content{
  margin-top: 20px;
}
</style>

