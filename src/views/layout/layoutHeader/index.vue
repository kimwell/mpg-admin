<template>
  <div class="v-header">
    header
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style lang='less' scoped>
  .v-header {
    position: fixed;
    z-index: 300;
    left: 0;
    top: 0;
    width: 100%;
    min-width: 1200px;
    height: 50px;
    background: #2d303b;
  }
</style>