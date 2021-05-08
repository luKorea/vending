<template>
    <div class="row-c UploadExcel ">
        <el-upload ref="upload" style="margin: auto;" :limit="1" accept=".xlsx, .xls" :action="data.url" :disabled="isUploading" :http-request="handleFileUpload" :auto-upload="true" drag>
            <i class="el-icon-upload" />
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div slot="tip" class="el-upload__tip" style="color:#ff0000;text-align: center;">
                <el-link :href="data.href" class="dowloadX" :download="data.title+'导入模板.xlsx'" type="primary" style="font-size:12px" icon="el-icon-warning-outline">
                    下载{{data.title}}导入模板</el-link>
                <br v-if="data.msg">
                {{data.msg}}
                <br>
                提示：仅允许导入“xls”或“xlsx”格式文件！
            </div>
        </el-upload>
    </div>
</template>
<script>
import { req } from '@/utils/req.js'
/**
 * TODO:上传文件模板
 */
export default {
  props: {
    data: {},
  },
  watch: {

  },
  data() {
    return {
      isUploading: false,
    };
  },
  created() {
  },
  methods: {
    // http-request(请求)
    handleFileUpload(val) {
      let that = this;
      const form = new FormData()
      form.append('file', val.file)
      that.isUploading = true;
      const loading = this.$loading({
        lock: true,
        text: '文件上传中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      req(that.data.url, form, "upload", true, true).then(function (res) {
        console.log(res);
        that.$refs.upload.clearFiles()
        that.isUploading = false
        that.$emit('closeDialog')
        loading.close();
      }).catch(function (err) {
        that.$refs.upload.clearFiles()
        that.isUploading = false
        loading.close();
      });
    },
  }
};
</script>
<style lang="scss">
.UploadExcel .el-upload {
  width: 100%;
  .el-upload-dragger {
    width: auto;
  }
}
</style>
