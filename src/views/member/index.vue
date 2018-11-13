<template>
  <div class="page-inner">
    <Card :bordered="false" title="系统设置">
      <div class="card-contnet">
        <div class="table-contnet">
          <Row class-name="head">
            <Col class-name="col" span="5">小程序最新版本号</Col>
            <Col class-name="col" span="5">服务器域名或IP</Col>
            <Col class-name="col" span="5">小程序appId</Col>
            <Col class-name="col" span="5">小程序appSecret</Col>
            <Col class-name="col" span="4">操作</Col>
          </Row>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [],
        pageApi: {
          idCardNo: '',
          pageIndex: 1,
          pageSize: 10,
          phone: ''
        },
        totalCount: 0
      }
    },
    methods: {
      getData(params) {
        this.$http.get(this.$api.userPage,params).then(res => {
          if (res.code === 1000) {
            this.list = res.data.data;
            this.totalCount = res.data.totalCount
          }
        })
      },
      edit() {
  
      },
      save(){
        
      }
    },
    created() {
      this.getData(this.pageApi);
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