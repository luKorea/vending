<template>
    <div>
        <el-tree ref="tree" accordion @check="check" :data="data" show-checkbox node-key="controlId"  :default-checked-keys="defaultExpandedKeys" :props="defaultProps">
        </el-tree>
    </div>
</template>
<script>
/**
 * TODO:角色权限树  
 */
export default {
  props: {
    data: {},
    defaultExpandedKeys:{
      type:Array,
      default:[]
    },
  },
  data() {
    return {
      defaultProps: {
        children: 'controlList',
        label: 'controlName'
      }
    };
  },
  created() {
  },
  methods: {
    check() {
      let res = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
      this.$emit('checked', res);
    },
  }
};
</script>
