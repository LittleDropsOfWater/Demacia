状态管理库
vuex
- modules
  - state	源数据
  - getters	派生数据 因state而改变
  - actions 异步操作
  - mutations 同步操作 它才能改变state
- plugins
   - createlogger
安装 cnpm i vuex

获取`index` module下的list属性
mapState({
   list:'index/list'
})
获取`index` module下的addList方法
mapMutations({
   addList:(state)=>state.index.addList
})
