<template>
  <div class="page-inner">
    <Card :bordered="false" title="系统设置" dis-hover>
      <div class="card-contnet">
        <div class="table-contnet">
          <Row class-name="head">
            <Col class-name="col" span="5">小程序最新版本号</Col>
            <Col class-name="col" span="5">服务器域名或IP</Col>
            <Col class-name="col" span="5">小程序appId</Col>
            <Col class-name="col" span="5">小程序appSecret</Col>
            <Col class-name="col" span="4">操作</Col>
          </Row>
          <Row>
            <Col class-name="col" span="5">{{item.miniProgramVersion}}</Col>
            <Col class-name="col" span="5">{{item.webHost}}</Col>
            <Col class-name="col" span="5">{{item.wxAppId}}</Col>
            <Col class-name="col" span="5">{{item.wxAppSecret}}</Col>
            <Col class-name="col" span="4">
            <Button type="primary" size="small" @click="openModel(false)">编辑</Button>
            </Col>
          </Row>
        </div>
      </div>
    </Card>
    <Modal v-model="show" title="编辑设置" :closable="false" :mask-closable="false">
      <Form :label-width="100" ref="formRef" :model="dataApi">
        <FormItem label="标题：">
          <Input type="text" v-model="dataApi.miniProgramVersion" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="服务器域名或IP：">
          <Input type="text" v-model="dataApi.webHost" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="小程序appId：">
          <Input type="text" v-model="dataApi.wxAppId" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="小程序appSecret：">
          <Input type="text" v-model="dataApi.wxAppSecret" placeholder="请输入..."></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="show = false">取消</Button>
        <Button type="primary" @click="handleSubmit('formRef')" :loading="loading">编辑</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        item: {},
        dataApi: {
          miniProgramVersion: '',
          webHost: '',
          wxAppId: '',
          wxAppSecret: ''
        },
        loading: false,
        show: false
      }
    },
    methods: {
      getData() {
        this.$http.get(this.$api.settingData).then(res => {
          if (res.code === 1000) {
            this.item = Object.assign({}, res.data)
          }
        })
      },
      openModel() {
        this.dataApi = {
          miniProgramVersion: this.item.miniProgramVersion,
          webHost: this.item.webHost,
          wxAppId: this.item.wxAppId,
          wxAppSecret: this.item.wxAppSecret
        }
        this.show = true;
      },
      handleSubmit() {
        let params = this.$clearData(this.dataApi);
        this.$http.post(this.$api.settingChange,params).then(res =>{
          if(res.code === 1000){
            this.getData();
            this.$Message.success('编辑成功')
            this.show = false
          }else{
            this.$Message.error(res.message)
          }
        })
      }
    },
    created() {
      this.getData();
    }
  }
</script>

<style lang='less' scoped>
  .page-inner {
    .extra-button {
      margin-top: -4px;
    }
    .card-contnet {
      position: relative;
      .table-contnet {
        line-height: 40px;
        text-align: center;
        border-top: 1px solid #e8eaec;
        border-left: 1px solid #e8eaec;
        .head {
          background-color: #f8f8f9;
        }
        .title {
          text-align: left;
        }
        .col {
          height: 40px;
          padding: 0 5px;
          border-right: 1px solid #e8eaec;
          border-bottom: 1px solid #e8eaec;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .paging {
        padding: 30px 0;
        text-align: right;
      }
    }
  }
</style>