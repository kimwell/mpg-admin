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
            <Col class-name="col" span="4">{{item.updateTime | dateformat}}</Col>
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
    <Modal v-model="show" title="扣积分" :closable="false" :mask-closable="false">
      <Form :label-width="100" ref="formRef" :model="dataApi" :rules="rules">
        <FormItem label="积分：" prop="credits">
          <InputNumber :max="max" :min="0" v-model.number="dataApi.credits" style="width:100%;"></InputNumber>
        </FormItem>
        <FormItem label="备注：">
          <Input type="text" v-model="dataApi.remark" placeholder="请输入..."></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancel('formRef')">取消</Button>
        <Button type="primary" @click="handleSubmit('formRef')" :loading="loading">保存</Button>
      </div>
    </Modal>
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
        totalCount: 0,
        show: false,
        dataApi: {
          credits: 0,
          remark: '',
          userId: ''
        },
        rules: {
          credits:[{
            required: true,
            message: '请选择',
            trigger: 'blur',
            type: 'number'
          }]
        },
        max: 0,
        loading: false
      }
    },
    methods: {
      getData(params) {
        this.$http.get(this.$api.userPage, params).then(res => {
          if (res.code === 1000) {
            this.list = res.data.data;
            this.totalCount = res.data.totalCount
          }
        })
      },
      cancel(name){
        this.$refs[name].resetFields();
        this.show = false;
      },
      handleSubmit(name){
        this.$refs[name].validate((valid) => {
          this.loading = true
          if (valid) {
            let params = this.$clearData(this.dataApi);
            this.$http.post(this.$api.changCredits, params).then(res => {
              if (res.code === 1000) {
                this.$Message.success('保存成功');
                this.getData(this.pageApi);
                this.show = false;
              }
              this.loading = false;
            })
          } else {
            this.$Message.error('验证失败');
          }
        })
      },
      changePage(page) {
        this.pageIndex = page;
        this.getData(this.pageApi)
      },
      openModal(item){
        this.dataApi.userId = item.id;
        this.max = item.credits;
        this.show = true;
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