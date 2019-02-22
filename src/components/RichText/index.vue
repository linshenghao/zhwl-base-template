<template>
  <div>
    <textarea  class='tinymce-textarea' id="tinymceEditer" style="height: 800px"></textarea>
  </div>
</template>
<script>
import tinymce from 'tinymce';
export default {
  name: 'index',
  data () {
    return {
      spinShow: true,
      editorModel: {
        content: 'dfsd'
      },
      content2: 'sdds',
      editorRules: {
        content: [
          {
            type: 'string',
            min: 5,
            message: 'the username size shall be no less than 5 chars ',
            trigger: 'blur'
          }
        ]
      },
      customEditor: null
    };
  },
  methods: {
    handleSuccess(res){
      console.log(res)
      this.customEditor=res.content;
      console.log('haoxy'+this.customEditor)
      tinymce.get('tinymceEditer').setContent(this.customEditor);
      /*this.$nextTick(() => {
        this.customEditor = tinymce.get("tinymceEditer");
      })*/
    },
    init () {
      this.$nextTick(() => {
        let vm = this
        let height = document.body.offsetHeight - 300;
        tinymce.init({
          selector: '#tinymceEditer',
          branding: false,
          elementpath: false,
          height: height,
          language: 'zh_CN.GB2312',
          menubar: 'edit insert view format table tools',
          plugins: [
            'advlist autolink lists link image charmap print preview hr anchor pagebreak imagetools',
            'searchreplace visualblocks visualchars code fullpage',
            'insertdatetime media nonbreaking save table contextmenu directionality',
            'emoticons paste textcolor colorpicker textpattern imagetools codesample'
          ],
          toolbar1: ' newnote print preview | undo redo | insert | styleselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image emoticons media codesample',
          autosave_interval: '20s',
          image_advtab: true,
          table_default_styles: {
            width: '100%',
            height: '100%',
            borderCollapse: 'collapse'
          },
          setup: function (editor) {
            editor.on('init', function (e) {
              vm.spinShow = false;
             /* if (localStorage.editorContent) {
                tinymce.get('tinymceEditer').setContent(localStorage.editorContent);
              }*/
            });

            editor.on('keydown', function (e) {
              console.log(localStorage.editorContent);
              localStorage.editorContent = tinymce.get('tinymceEditer').getContent();
              vm.editorModel.content = tinymce.get('tinymceEditer').getContent();
              console.log("new content is : ")
              console.log(localStorage.editorContent);
            });
            editor.on('keyup', function (e) {
              localStorage.editorContent = tinymce.get('tinymceEditer').getContent();
              vm.editorModel.content = tinymce.get('tinymceEditer').getContent();
            });
            /* editor.addButton('example', {
              title : 'example.desc',
              image : 'https://avatars0.githubusercontent.com/u/32768756?s=460&v=4',
              onclick : function() {
                editor.windowManager.alert('Hello world!! Selection: ' + editor.selection.getContent({format : 'text'}));
              }
            }); */
          }
        });
        /*this.customEditor = tinymce.get("tinymceEditer");*/
      });
    },


    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          util.post('/html/pdf', this.editorModel).then(res => {
            this.$Message.success('Success!');
          });
        } else {
          this.$Message.error('Fail!');
        }
      });
    },
    handleReset (name) {
      this.$refs[name].resetFields();
    },
  },
  mounted () {
    this.init();
  },
  destroyed () {
    tinymce.get('tinymceEditer').destroy();
  }
}
</script>
