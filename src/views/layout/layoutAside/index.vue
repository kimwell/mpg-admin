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
        menu: []
      }
    },
    computed: {
      role(){
        return this.$store.state.user
      }
    },
    methods: {},
    created(){
      if(this.role.level === 1){
        let mneuArr = [{
          name: '会员管理',
          route: '/member'
        },{
          name: '广告管理',
          route: '/adManage'
        },{
          name: '系统设置',
          route: '/system'
        },{
          name: '门店管理',
          route: '/shop'
        },{
          name: '积分兑换记录',
          route: '/record'
        }]
        this.menu = [...mneuArr]
      }else{
        let mneuArr = [{
          name: '积分兑换',
          route: '/exchange'
        },{
          name: '积分兑换记录',
          route: '/record'
        }]
        this.menu = [...mneuArr]
      }
    }
  }
</script>

<style lang='less' scoped>
  .aside {
    position: fixed;
    z-index: 200;
    left: 0;
    top: 40px;
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