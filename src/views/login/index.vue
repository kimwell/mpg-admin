<template>
  <div class="login-box">
    <div class="login-main">
      <Form :model="dataApi" :label-width="80">
        <FormItem label="用户名：">
          <Input v-model="dataApi.userName" placeholder="请输入用户名"></Input>
        </FormItem>
        <FormItem label="密码：">
          <Input type="password" v-model="dataApi.password" placeholder="请输入密码"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" style="width:100%;" @click="login">登录</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
  import * as types from '@/store/types'
  export default {
    data() {
      return {
        dataApi: {
          userName: '',
          password: ''
        }
      }
    },
    methods: {
      setUser(data) {
        this.$store.commit(types.LOGIN, data);
        let redirect = decodeURIComponent(this.$route.query.redirect || '/');
        this.$router.push({
          path: redirect
        })
      },
      login() {
        this.$http.post(this.$api.login, this.dataApi).then(res => {
          if (res.code === 1000) {
            this.setUser({
              authorization: res.data.token
            });
          }
        })
      }
    }
  }
</script>

<style lang='less' scoped>
  .login-box {
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    height: 400px;
    margin-left: -200px;
    margin-top: -200px;
    .login-main {
      padding: 30px;
    }
  }
</style>