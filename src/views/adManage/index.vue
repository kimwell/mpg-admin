<template>
  <div>
    <Card :bordered="false" title="广告管理">
      <Button slot="extra" type="primary" @click="openModel(false)">新增广告</Button>
    </Card>
    <Modal v-model="show" :title="isEdit?`编辑广告`:`新增广告`" :closable="false" :mask-closable="false">
      <Form :label-width="80" ref="formRef" :model="dataApi" :rules="rules">
        <FormItem label="广告类型：" prop="advType">
          <Select v-model="dataApi.advType" style="width:100%">
              <Option v-for="item in [{val: '1',name: '图片广告'},{val: '2',name: '小程序连接'},{val: '3',name: '网页连接'}]" :value="item.val" :key="item.val">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="分类名称" prop="name">
          <Input type="text" v-model="dataApi.appId" placeholder="请输入..."></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancel('formRef')">取消</Button>
        <Button type="primary" @click="handleSubmit('formRef')" :loading="loading">{{ isEdit ? '编辑' : '添加' }}</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [],
        show: false,
        isEdit: false,
        dataApi: {
          advType: '',
          appId: '',
          credits: '',
          envVersion: '',
          extraData: '',
          id: '',
          img: '',
          name: '',
          position: '',
          sortIndex: 0,
          url: ''
        },
        rules: {},
        loading: false
      }
    },
    methods: {
      getList() {
        this.$http.get(this.$api.advertisementList).then(res => {
          if (res.code === 1000) {
            this.list = res.data;
          }
        })
      },
      openModel(item, isEdit) {
        this.isEdit = isEdit
        this.show = true;
      },
      cancel(name) {},
      handleSubmit(name) {
  
      }
    },
    created() {
      this.getList();
    }
  }
</script>

<style lang='less' scoped>
  
</style>