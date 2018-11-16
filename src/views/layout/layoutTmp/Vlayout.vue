<template>
  <div class="layout">
    <layoutAside></layoutAside>
      <div class="wrapper">
      <!-- <layoutHeader></layoutHeader> -->
      <div class="layout-content">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
  import layoutAside from '../layoutAside/index.vue'
  // import layoutHeader from '../layoutHeader/index.vue'
  export default {
    components: {
      layoutAside,
      // layoutHeader
    },
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style lang='less' scoped>
  .wrapper {
    min-width: 1200px;
    margin: 0 0 0;
    overflow: hidden;
    .layout-content {
      position: absolute;
      left: 150px;
      right: 0;
      top: 0;
      padding: 15px;
      min-width: 1000px;
      margin: 0;
    }
  }
</style>