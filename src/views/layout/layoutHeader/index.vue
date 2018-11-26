<template>
  <div class="v-header">
    <ul class="header-ul">
      <li class="hasChild">
        <Dropdown @on-click="onClick">
          <a href="javascript:void(0)">
                        {{userInfo ? userInfo.userName : ''}}
                        <Icon type="ios-arrow-down"></Icon>
                    </a>
          <DropdownMenu slot="list">
            <DropdownItem name="logOut">退出登录</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </li>
    </ul>
  </div>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex';
  export default {
    data() {
      return {}
    },
    computed: {
      userInfo() {
        return this.$store.state.user;
      }
    },
    methods: {
      ...mapActions(['loginOut']),
      onClick(data) {
        if (data === 'logOut') {
          this.loginOut();
          window.location.href = '/login';
        }
      }
    }
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
    height: 40px;
    background: #2d303b;
    .header-ul {
      text-align: right;
      padding-right: 20px;
      li {
        list-style: none;
      }
      .hasChild {
        line-height: 40px;
        a {
          color: #fff;
        }
      }
      ul {
        li {
          text-align: center;
        }
      }
    }
  }
</style>