<template>
  <div class="aside">
    <ul>
      <li v-for="(nav,index) in menu" :key="index">
        <router-link :to="nav.route">{{nav.name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        menu: [{
          name: '广告管理',
          route: '/adManage'
        }]
      }
    },
    methods: {}
  }
</script>

<style lang='less' scoped>
  .aside {
    position: fixed;
    z-index: 200;
    left: 0;
    top: 50px;
    bottom: 0;
    width: 150px;
    padding: 30px 0 0;
    background: #31354B;
    ul {
      li {
        a {
          font-size: 14px;
          height: 40px;
          line-height: 40px;
          color: #fff;
          display: block;
          padding: 0 20px;
          &.active{
            background-color: rgba(0, 0, 0, .3)
          }
        }
      }
    }
  }
</style>