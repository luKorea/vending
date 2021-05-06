<template>
    <div class="app-container">
        <avue-crud v-bind="bindVal" v-on="onEvent" :search.sync="search" v-model="form" :page.sync="page">
        </avue-crud>
    </div>
</template>
<script>
import crudMix from "@/mixins/crudMix";
import permissionMix from "@/mixins/permissionMix";
import { mapGetters } from 'vuex'
import { req } from '@/utils/req.js'
import { required } from '@/utils/rules.js'
/**
 * TODO:用户管理
 */
export default {
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mixins: [
    crudMix,
    permissionMix,
  ],
  data() {
    return {
      search: {
        conditionTwo: '',
      },
      config: {
        detail: '',
        save: '/user/addUser',
        delete: '/user/deleteUserById',
        update: '/user/updateUser',
        list: '/user/getUser'
      },
      method: {//修改请求method post GET
        delete: 'GET',
      },
      rowKey: 'uId',
      option: {
        addBtn: true,
        viewBtn: false,
        column: [
          ...this.column_def("用户名", "username", true, { search: true, searchSpan: 6, fixed: 'left', minWidth: 180, }),
          ...this.column_def("姓名", "name", true, { minWidth: 180, }),
          ...this.column_select("商家名", "company", true, {
            minWidth: 180,
            dicData: [],
            overHidden: true,
            formatter: function (row, value, label, column) {
              return row.company ? row.company.companyName : ''
            },
          }),
          {
            label: "登录密码", prop: "password",
            type: 'password',
            hide: true,
            viewDisplay: false,
          },
          {
            label: "确认密码", prop: "comfirmPassword",
            type: 'password',
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
          // { label: "状态", prop: "lockCountStr", display: false, },
          {
            label: "用户角色", prop: "roleList", minWidth: 180,
            multiple: true,
            type: 'checkbox',
            all: true,
            span: 24,
            dicData: [],
            overHidden: true,
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
    //列表前
    listBefore() {
      this.params.conditionTwo = this.params.username;
    },
    //删除前
    delBefore(row) {
      let rowtemp = row
      rowtemp = { uId: row.id }
      return rowtemp
    },
    //添加前
    addBefore() {
      this.form.companyId = this.form.company
      if (this.form.password) {
        this.form.password = hex_md5(this.form.password)
      }
      return 1
    },
    //更新前
    updateBefore() {
      this.form.companyId = this.form.company
      if (this.form.password) {
        this.form.password = hex_md5(this.form.password)
      }
      return 1
    },
    //打开前
    openBefore(type) {
      let that = this;
      let password = this.findObject(this.option.column, 'password')
      let comfirmPassword = this.findObject(this.option.column, 'comfirmPassword')
      let validator = [{
        required: false, validator: (rule, value, callback) => {
          if (that.form.password) {
            if (value === '') {
              callback(new Error('请再次输入密码'))
            } else if (value !== that.form.password) {
              callback(new Error('两次输入密码不一致!'))
            } else {
              callback()
            }
          } else {
            callback()
          }
        }, trigger: 'blur'
      }]
      if (type === 'add') {
        password.rules = required('密码')
        comfirmPassword.rules = required('确认密码').concat(validator)
      } else {
        password.rules = []
        comfirmPassword.rules = validator
      }
      if (type == 'edit') {
        let company = that.form.company;
        if (company && company.companyId) {
          that.form.company = company.companyId
          that.form.companyId = company.companyId
          that.form.companyName = company.companyName
        }
        that.form.roleList = that.form.roleList.map((v) => { return v.roleId })
        that.form = Object.assign(that.form, {})
      }
    },
    //获取所有商家
    getAll() {
      let that = this;
      req('/company/getAll', {}, "GET").then(function (res) {
        that.option.column.forEach((v) => {
          if (v.prop == 'company') {
            v.dicData = res.data.map((item) => {
              return { label: item.companyName, value: item.companyId }
            })
          }
        })
      }).catch(function (error) {
        console.log(error);
      });
    },
    //所有权限角色
    findAll() {
      let that = this;
      req('/role/findAll', { pageNum: 1, pageSize: 1000 }, "GET").then(function (res) {
        that.option.column.forEach((v) => {
          if (v.prop == 'roleList') {
            v.dicData = res.data.list.map((item) => {
              return { label: item.roleName, value: item.roleId }
            })
          }
        })
      }).catch(function (error) {
        console.log(error);
      });
    },
  },
  created() {
    this.getAll();
    this.findAll();
  },
}
</script>