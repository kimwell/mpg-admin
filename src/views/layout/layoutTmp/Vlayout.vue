<template>
  <div class="layout">
    <layoutAside></layoutAside>
    <div class="layout-content">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import layoutAside from '../layoutAside/index.vue'
  export default {
    components: {
      layoutAside
    },
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style lang='less' scoped>
  
</style>