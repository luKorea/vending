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
import permissionMix from "@/mixins/permissionMix";
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
    permissionMix,
  ],
  data() {
    return {
      search: {
        conditionTwo: '',
      },
      config: {
        detail: '/role/findByRId',
        save: '/role/addRole',
        delete: '/role/deRoleByUId',
        update: '/role/updateRole',
        list: '/role/findAll'
      },
      method: {//修改请求method post GET
        detail: 'GET',
        delete: 'GET',
        list: 'GET'
      },
      rowKey: 'id',
      option: {
        addBtn: true,
        viewBtn: false,
        column: [
          {
            label: "角色名", prop: "roleName", fixed: 'left',
            searchSpan: 6,

            search: true, minWidth: 180,
            rules: [
              {
                required: true,
                message: "请输入角色名",
                trigger: "blur"
              },
            ],
          },
          {
            label: "备注", prop: "remark", type: "textarea", minWidth: 180,
          },
          {
            label: "用户角色", prop: "controlList", minWidth: 180,
            type: 'checkbox',
            all: true,
            multiple: true,
            span: 24,
            hide: true,
            dicData: [],
          },
          {
            label: "创建人", prop: "addUser", display: false,
            formatter: function (row, value, label, column) {
              return row.addUser ? row.addUser.username : ''
            },
          },
          { label: "创建时间", prop: "addTime", display: false, minWidth: 180, },
          {
            label: "最后更改人", prop: "updateUser", display: false,
            formatter: function (row, value, label, column) {
              return row.updateUser ? row.updateUser.username : ''
            },
          },
          { label: "最后更改时间", prop: "updateTime", display: false, minWidth: 180, },
        ]
      },
    }
  },
  methods: {
    delBefore(row) {
      let rowtemp = row
      rowtemp = { roleId: row.roleId }
      return rowtemp
    },
    openBefore(type) {
      let that = this;
      if (type == 'edit') {
        that.form.id = that.form.roleId
      }
      that.form = Object.assign(that.form, that.form)
    },
    openAfter(res, form, index, type) {
      let that = this
      form.controlList = res.data.map((item) => {
        return item.controlId
      })
      that.form = Object.assign(form, {})
    },
    listAfter(data) {
      this.data.forEach((v) => {
        v.controlList = [];//声明参数，绑定组件
      })
    },
    findControl() {
      let that = this;
      req('/role/findControl', {}, "GET").then(function (res) {
        let obj = {};
        res.data.forEach((v) => {
          obj[v.controlId] = v;
        })
        let arr = [];
        for (let k in obj) {
          arr.push(obj[k])
        }
        that.option.column.forEach((v) => {
          if (v.prop == 'controlList') {
            v.dicData = arr.map((item) => {
              return { label: item.controlName, value: item.controlId }
            })
          }
        })
      }).catch(function (error) {
        console.log(error);
      });
    },
  },
  created() {
    this.findControl();
  },
}
</script>