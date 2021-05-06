<template>
    <div>
        <el-tree ref="tree" accordion @check="check" :data="data" show-checkbox node-key="controlId"  :default-checked-keys="defaultExpandedKeys" :props="defaultProps">
        </el-tree>
    </div>
</template>
<script>

export default {
  props: {
    data: {},
    defaultExpandedKeys:{
      type:Array,
      default:[]
    },
  },
  watch: {

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
      console.log('check', res);
    },
  }
};
</script>
