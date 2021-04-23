<template>
    <div class="app-container">
        <avue-crud v-bind="bindVal" v-on="onEvent" :search.sync="search" v-model="form" :before-open="beforeOpen" :page.sync="page">
        </avue-crud>
    </div>
</template>
<script>
import crudMix from "@/mixins/crudMix";
import { mapGetters } from 'vuex'
import { req } from '@/utils/req.js'
export default {
  components: {

  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mixins: [
    crudMix,
  ],
  data() {
    return {
      search: {
        conditionTwo: '',
      },
      config: {
        detail: '',
        save: 'user/addUser',
        delete: 'user/deleteUserById',
        update: 'user/updateUser',
        list: 'user/getUser'
      },
      method: {//修改请求method post GET
        delete: 'GET',
      },
      rowKey: 'uId',
      option: {
        addBtn: true,
        column: [

          {
            label: "用户名", prop: "username", fixed: 'left',
            searchSpan: 6,
            search: true, minWidth: 180,
            rules: [
              {
                required: true,
                message: "请输入用户名",
                trigger: "blur"
              },
            ],
          },
          {
            label: "姓名", prop: "name", minWidth: 180,
            rules: [
              {
                required: true,
                message: "请输入姓名",
                trigger: "blur"
              },
            ],
          },
          {
            label: "商家名", prop: "company", type: 'select', minWidth: 180,
            dicData: [],
            formatter: function (row, value, label, column) {
              return row.company ? row.company.companyName : ''
            },
            rules: [
              {
                required: true,
                message: "请输入商家名",
                trigger: "blur"
              },
            ],
          },
          {
            label: "登录密码", prop: "password",
            hide: true,
            viewDisplay: false,
          },
          {
            label: "是否启用", prop: "lockCount", addDisplay: false,
            type: 'select',
            dicData: [
              { label: '否', value: 0 },
              { label: '是', value: 2 },
            ],
          },
          {
            label: "状态", prop: "lockCountStr", display: false,

          },
          {
            label: "用户角色", prop: "roleList", minWidth: 180,
            type: 'select', multiple: true,
            dicData: [],
            formatter: function (row, value, label, column) {
              return row.roleList && row.roleList.map(item => {
                return item.roleName
              }).join(',')
            },
          },
          {
            label: "创建人", prop: "addUser", display: false,
            formatter: function (row, value, label, column) {
              return row.addUser ? row.addUser.username : ''
            },
          },
          { label: "创建时间", prop: "addTime", display: false, minWidth: 180, },
          {
            label: "更改人", prop: "updateUser", display: false,
            formatter: function (row, value, label, column) {
              return row.updateUser ? row.updateUser.username : ''
            },
          },
          { label: "更改时间", prop: "updateTime", display: false, minWidth: 180, },
        ]
      },

    }
  },
  methods: {
    listBefore() {
      this.params.conditionTwo = this.params.username;
    },
    validateFn(type) {
      let that = this;
      if (type == 'add') {
        if (!that.form.password) {
          this.$message({
            message: `请填写密码`,
            type: 'error',
            duration: 3 * 1000
          })
          return 1
        }
      }
      return 0
    },
    delBefore(row) {
      let rowtemp = row
      rowtemp = { uId: row.id }
      return rowtemp
    },
    addBefore() {
      if (this.validateFn('add')) {
        return 0
      }
      if (this.form.password) {
        this.form.password = hex_md5(this.form.password)
      }
      return 1
    },
    updateBefore() {
      if (this.validateFn()) {
        return 0
      }
      if (this.form.password) {
        this.form.password = hex_md5(this.form.password)
      }
      return 1
    },
    openBefore(type) {
      let that = this;
      if (type == 'edit') {
        let company = that.form.company;
        that.form.company = company.companyId
        that.form.companyId = company.companyId
        that.form.companyName = company.companyName
        that.form.roleList = that.form.roleList.map((v) => { return v.roleId })
        that.form = Object.assign(that.form, {})
      }
    },
    getAll() {
      let that = this;
      req('company/getAll', {}, "GET").then(function (res) {
        that.option.column.forEach((v) => {
          if (v.prop == 'company') {
            v.dicData = res.data.map((item) => {
              return { label: item.companyName, value: item.companyId }
            })
          }
        })
      }).catch(function (error) {
        reject(error);
      });
    },
    findAll() {
      let that = this;
      req('role/findAll', { pageNum: 1, pageSize: 1000 }, "GET").then(function (res) {
        that.option.column.forEach((v) => {
          if (v.prop == 'roleList') {
            v.dicData = res.data.list.map((item) => {
              return { label: item.roleName, value: item.roleId }
            })
          }
        })
      }).catch(function (error) {
        reject(error);
      });
    },
  },
  created() {
    this.getAll();
    this.findAll();
  },
}
</script>