<template>
  <div class="page-inner">
    <Card :bordered="false" title="门店管理" dis-hover>
      <Button type="primary" slot="extra" class="extra-button" @click="openPanel(false)">新增门店</Button>
      <Form :mode="pageApi" :label-width="100" inline @submit.native.prevent>
        <FormItem label="门店名称：">
          <Input v-model="pageApi.shopName" placeholder="请输入..." style="width:200px;"></Input>
        </FormItem>
        <FormItem>
          <Button type="warning" @click="search" style="margin-right: 10px;">搜索</Button>
          <Button type="warning" @click="resetFilter">清除</Button>
        </FormItem>
      </Form>
      <div class="card-contnet">
        <div class="table-contnet">
          <Row class-name="head">
            <Col class-name="col" span="6">门店名称</Col>
            <Col class-name="col" span="6">门店地址</Col>
            <Col class-name="col" span="4">门店积分</Col>
            <Col class-name="col" span="3">联系电话</Col>
            <Col class-name="col" span="2">状态</Col>
            <Col class-name="col" span="3">操作</Col>
          </Row>
          <Row v-for="(item,index) in list" :key="index">
            <Col class-name="col" span="6">{{item.shopName}}</Col>
            <Col class-name="col" span="6">{{item.address}}</Col>
            <Col class-name="col" span="4">{{item.credits}}</Col>
            <Col class-name="col" span="3">{{item.phone}}</Col>
            <Col class-name="col" span="2">{{item.status === 1 ? '正常':'禁用'}}</Col>
            <Col class-name="col" span="3">
              <Button type="warning" size="small" @click="openPanel(true,item)">编辑</Button>
            </Col>
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
    <Modal v-model="show" :title="isEdit ? '编辑门店':'新增门店'" :closable="false" :mask-closable="false">
      <Form :label-width="100" ref="formRef" :model="dataApi" :rules="rule">
        <FormItem label="门店名称：" prop="shopName">
          <Input type="text" v-model="dataApi.shopName" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="登录账号：" prop="userName">
          <Input type="text" v-model="dataApi.userName" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="登录密码：" prop="password">
          <Input v-model="dataApi.password" type="password" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="状态：">
          <RadioGroup v-model="dataApi.status">
            <Radio v-for="(item,index) in [{value:1,name: '正常'},{value: 0,name: '禁用'}]" :key="index" :label="item.value">
              {{item.name}}
            </Radio>
        </RadioGroup>
        </FormItem>
        <FormItem label="门店地址：">
          <Input type="text" v-model="dataApi.address" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="联系电话：">
          <Input type="text" v-model="dataApi.phone" placeholder="请输入..."></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="quit('formRef')">取消</Button>
        <Button type="primary" @click="handleSubmit('formRef')" :loading="loading">{{isEdit ? '编辑':'保存'}}</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pageApi: {
          pageIndex: 1,
          pageSize: 10,
          shopName: ''
        },
        list: [],
        totalCount: 0,
        dataApi:{
          id: '',
          address: '',
          password: '',
          phone: '',
          shopName: '',
          userName: '',
          status: 1
        },
        isEdit: false,
        show: false,
        editItem: {},
        loading: false,
        rule:{
          shopName: [{
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }],
          userName: [{
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      getList() {
        this.$http.post(this.$api.shopPage, this.pageApi).then(res => {
          if (res.code === 1000) {
            this.list = res.data.data;
            this.totalCount = res.data.totalCount
          }
        })
      },
      resetFilter() {
        this.pageApi.shopName = '';
        this.getList();
      },
      search(){
        this.getList();
      },
      changePage(page) {
        this.pageApi.pageIndex = page;
        this.getList();
      },
      openPanel(isEdit,item) {
        this.isEdit = isEdit;
        if(this.isEdit){
          this.editItem = Object.assign({},item);
          this.dataApi = {
            id: item.id,
            address: item.address,
            password: item.adminUser.password,
            phone: item.phone,
            shopName: item.shopName,
            userName: item.adminUser.userName,
            status: item.status
          }
        };
        this.show = true;
      },
      quit(name){
        this.dataApi = {
          id: '',
          address: '',
          password: '',
          phone: '',
          shopName: '',
          userName: '',
          status: 1
        };
        this.show = false;
        this.$refs[name].resetFields();
      },
      handleSubmit(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.loading = true;
            let params = this.$clearData(this.dataApi);
            if (this.isEdit) {
              params.id = this.editItem.id;
            }
            this.$http.post(this.$api.shopSave, params).then(res => {
              if (res.code === 1000) {
                this.$Message.success(this.isEdit ? '编辑成功' : '保存成功')
                this.getList(this.pageFilter);
                this.show = false;
                this.$refs[name].resetFields();
              } else {
                this.$Message.error(res.message);
              }
              this.loading = false;
            })
          } else {
            this.$Message.error('表单验证失败');
          }
        })
      }
    },
    created() {
      this.getList();
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