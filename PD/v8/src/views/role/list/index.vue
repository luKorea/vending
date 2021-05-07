<template>
    <div class="app-container">
        <avue-crud v-bind="bindVal" v-on="onEvent" :search.sync="search" v-model="form" :page.sync="page">
            <template slot-scope="scope" slot="controlListForm">
                <ControlTree class="ControlTree" :key="scope" @checked="checked" :defaultExpandedKeys="form.controlList" :data="controlList"></ControlTree>
            </template>
        </avue-crud>
    </div>
</template>
<script>
import crudMix from "@/mixins/crudMix";
import { mapGetters } from 'vuex'
import { req } from '@/utils/req.js'
import permissionMix from "@/mixins/permissionMix";
import ControlTree from "@/views/role/list/ControlTree";

/**
 * TODO:角色管理
 */
export default {
  components: {
    ControlTree
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
      controlList: [],
      controlListChecked: [],
      isIndeterminate: false,
      defaultProps: {
        children: 'controlList',
        label: 'controlName'
      },
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
            label: "用户权限", prop: "controlList", minWidth: 180,
            span: 24,
            hide: true,
            formslot: true,
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
  watch: {
    //监听处理添加时，编辑除用户权限之外的权限，把用户权限清除
    form: {
      handler: function (val, oldVal) {
        val.controlList = this.controlListChecked
      },
      deep: true
    }
  },
  methods: {
    updateBefore() {
      this.form.controlList = this.controlListChecked
      return 1;
    },
    addBefore() {
      this.form.controlList = this.controlListChecked
      return 1;
    },
    //选择
    checked(val) {
      console.log('checked', val);
      this.controlListChecked = val;
    },
    //删除前
    delBefore(row) {
      let rowtemp = row
      rowtemp = { roleId: row.roleId }
      return rowtemp
    },
    recursive(flag) {
      let that = this;
      var recursiveFunction = function () {
        const getStr = function (list) {
          list.forEach(function (row) {
            if (row.controlList && row.controlList.length > 0) {
              row.controlList = getStr(row.controlList || [])
            }

            row.disabled = flag;
          })
          return list
        }
        that.controlList = Object.assign(getStr(that.controlList), {})
      }
      recursiveFunction()
    },
    //打开前
    openBefore(type) {
      let that = this;
      //获取列表参数给个默认值
      if (type == 'edit') {
        that.form.id = that.form.roleId
        console.log('openBefore', that.form);
        if (that.form.status && that.form.status == 1) {
          that.recursive(true)
        } else {
          that.recursive(false)
        }
      }
      if (type == 'add') {
        that.form.controlList = [];
        that.controlListChecked = [];
      }
      that.form = Object.assign(that.form, that.form)
    },
    //打开获取数据后
    openAfter(res, form, index, type) {
      let that = this
      form.controlList = res.data.map((item) => {
        return item.controlId
      })
      //form.controlList//去除有上级节点的选中//上级选中下级就会全选
      let obj = {};
      var recursiveFunction = function () {
        const getStr = function (list) {
          list.forEach(function (row) {
            if (row.controlList && row.controlList.length > 0) {
              row.controlList = getStr(row.controlList || [])
            } else {
              obj[row.controlId] = true;
            }
          })
          return list
        }
        getStr(that.controlList)
      }
      recursiveFunction()
      form.controlList = form.controlList.filter((v) => {
        return obj[v]
      })
      that.controlListChecked = form.controlList;
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
        that.controlList = res.data
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