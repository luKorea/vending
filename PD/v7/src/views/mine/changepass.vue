<template>
    <div class="app-container">
        <avue-form ref="form" v-model="obj" :option="option" @submit="submit">
        </avue-form>
    </div>
</template>
<script>

import { req } from '@/utils/req.js'
import { mapGetters } from 'vuex'
export default {
  mixins: [
  ],
  computed: {
    ...mapGetters([
      'uuid'
    ])
  },
  data() {
    return {
      obj: {},
      option: {
        emptyBtn: true,
        submitBtn: true,
        column: [
          {
            label: "旧密码",
            prop: "oldPassWord",
            type: 'password',
            row: true,
            labelWidth: '120',
            span: 24,
            rules: [{
              required: true,
              message: "请输入旧密码",
              trigger: "blur"
            }]
          },
          {
            label: "密码",
            prop: "newPassWord",
            type: 'password',
            row: true,
            labelWidth: '120',
            span: 24,
            rules: [{
              required: true,
              message: "请输入密码",
              trigger: "blur"
            }]
          },
          {
            label: "再次输入密码",
            prop: "newPassWord2",
            type: 'password',
            row: true,
            labelWidth: '120',
            span: 24,
            rules: [{
              required: true,
              message: "请再次输入密码",
              trigger: "blur"
            }]
          }]
      }
    }
  },
  created() {


  },
  methods: {
    validateFn() {
      let that = this;
      if (that.obj.newPassWord != that.obj.newPassWord2) {
        this.$message({
          message: `两次密码不一致`,
          type: 'error',
          duration: 3 * 1000
        })
        return 1
      }
      return 0
    },
    submit(form, done) {
      let that = this;
      return new Promise(function (resolve, reject) {
        if (that.validateFn()) {
          done();
          return
        }
        let params = {
          oldPassWord: hex_md5(form.oldPassWord),
          newPassWord: hex_md5(form.newPassWord),
          uuid: that.uuid,
        }
        req('main/updateLoginAdmin', params, "post", true).then(function (res) {
          that.$refs.form.resetForm();
          done();
          resolve(true);
        }).catch(function (error) {
          that.$refs.form.resetForm();
          done();
          reject(error);
        });
      });
    }
  }
}
</script>

