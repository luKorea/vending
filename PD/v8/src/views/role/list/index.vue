<template>
    <div class="app-container">
        <avue-crud v-bind="bindVal" v-on="onEvent" :search.sync="search" v-model="form" :page.sync="page">
        </avue-crud>
    </div>
</template>
<script>
import crudMix from "@/mixins/crudMix";
import { mapGetters } from 'vuex'
import { req } from '@/utils/req.js'
import permissionMix from "@/mixins/permissionMix";
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
          ...this.column_def("角色名", "roleName", true, { search: true, searchSpan: 6, fixed: 'left', minWidth: 180, }),
          ...this.column_textarea("备注", "remark", false, { minWidth: 180, }),
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
    //删除前
    delBefore(row) {
      let rowtemp = row
      rowtemp = { roleId: row.roleId }
      return rowtemp
    },
    //打开前
    openBefore(type) {
      let that = this;
      if (type == 'edit') {
        that.form.id = that.form.roleId
      }
      that.form = Object.assign(that.form, that.form)
    },
    //打开获取数据后
    openAfter(res, form, index, type) {
      let that = this
      form.controlList = res.data.map((item) => {
        return item.controlId
      })
      that.form = Object.assign(form, {})
    },
    //获取列表后
    listAfter(data) {
      this.data.forEach((v) => {
        v.controlList = [];//声明参数，绑定组件
      })
    },
    //获取控制列表
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