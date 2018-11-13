<template>
  <div class="page-inner">
    <Card :bordered="false" title="会员管理" dis-hover>
      <div class="card-contnet">
        <div class="table-contnet">
          <Row class-name="head">
            <Col class-name="col" span="5">编号</Col>
            <Col class-name="col" span="5">手机号</Col>
            <Col class-name="col" span="5">积分</Col>
            <Col class-name="col" span="5">openId</Col>
            <Col class-name="col" span="4">更新时间</Col>
          </Row>
          <Row v-for="(item,index) in list" :key="index">
            <Col class-name="col" span="5">{{item.id}}</Col>
            <Col class-name="col" span="5">{{item.phone}}</Col>
            <Col class-name="col" span="5">{{item.credits}}</Col>
            <Col class-name="col" span="5">{{item.openId}}</Col>
            <Col class-name="col" span="4">{{item.updateTime}}</Col>
          </Row>
        </div>
          <Row v-if="list.length === 0">
            <Col span="24" style="text-align: center;padding: 20px 0;">暂无数据</Col>
          </Row>
        <div class="paging">
          <Page class="page-count" size="small" show-elevator :total="totalCount" show-total :current="pageApi.pageIndex" :page-size="pageApi.pageSize" @on-change="changePage"></Page>
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
        
      },
      changePage(page){
        this.pageIndex = page;
        this.getData(this.pageApi)
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