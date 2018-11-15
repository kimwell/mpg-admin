<template>
  <div>
    <Card :bordered="false" title="广告管理" dis-hover>
      <Button slot="extra" type="primary" @click="previewApp">预览小程序</Button>
      <Button slot="extra" type="primary" @click="publishApp" style="margin: 0 15px;">发布小程序</Button>
      <Button slot="extra" type="primary" @click="openModel(false)">新增广告</Button>
      <div>
        <Table :columns="tableHeader" ref="goodsTable" border :data="list">
          <!-- 操作 -->
          <template slot="action" slot-scope="props">
              <Button type="warning" size="small" style="margin-right:8px;" @click="openModel(true,props.row)">编辑</Button>
              <Button type="success" size="small" style="margin-right:8px;" @click="del(props.row)">删除</Button>
          </template>
        </Table>
      </div>
    </Card>
    <Modal v-model="prevImgShow" title="查看图片" width="800">
      <div class="prevImg">
        <img :src="prevImg">
      </div>
      <div slot="footer">
        <Button @click="prevImgShow = false">关闭</Button>
      </div>
    </Modal>
    <Modal v-model="show" :title="isEdit?`编辑广告`:`新增广告`" :closable="false" :mask-closable="false">
      <Form :label-width="100" ref="formRef" :model="dataApi" :rules="rules">
        <FormItem label="标题：">
          <Input type="text" v-model="dataApi.name" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="广告类型：" prop="advType">
          <Select v-model="dataApi.advType" style="width:100%">
                    <Option v-for="item in [{val: '1',name: '图片广告'},{val: '2',name: '小程序连接'},{val: '3',name: '网页连接'}]" :value="item.val" :key="item.val">{{ item.name }}</Option>
                </Select>
        </FormItem>
        <FormItem label="广告位置：" prop="position">
          <Select v-model="dataApi.position" style="width:100%">
                    <Option v-for="item in [{val: '1',name: '首页顶部'},{val: '2',name: '首页滚动广告'},{val: '3',name: '首页底部广告'},{val:'4',name: '其他'}]" :value="item.val" :key="item.val">{{ item.name }}</Option>
                </Select>
        </FormItem>
        <FormItem label="图片：" prop="img">
          <uploadBtn single :showPreview="true" v-model="dataApi.img"></uploadBtn>
        </FormItem>
        <FormItem label="appId：">
          <Input type="text" v-model="dataApi.appId" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="获得积分：">
          <Input type="text" v-model="dataApi.credits" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="小程序版本：">
          <Input type="text" v-model="dataApi.envVersion" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="目标小程序：">
          <Input type="text" v-model="dataApi.extraData" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="页面路径：">
          <Input type="text" v-model="dataApi.url" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="排序：">
          <Input type="text" v-model="dataApi.sortIndex" placeholder="请输入..."></Input>
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
  import uploadBtn from '@/components/uploadBtn'
  export default {
    components: {
      uploadBtn
    },
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
        tableHeader: [{
          title: '编号',
          key: 'id'
        }, {
          title: '标题',
          key: 'name'
        }, {
          title: '广告类型',
          key: 'advType',
          render: (h, params) => {
            let str = ['图片广告', '小程序链接', '网页链接'][params.row.advType - 1];
            return h('div', str)
          }
        }, {
          title: '小程序编号',
          key: 'appId'
        }, {
          title: '获得积分',
          key: 'credits'
        }, {
          title: '小程序版本',
          key: 'envVersion'
        }, {
          title: '目标小程序',
          key: '目标小程序'
        }, {
          title: '位置',
          key: 'position',
          render: (h, params) => {
            let str = ['首页顶部', '首页滚动广告', '首页底部广告', '其他'][params.row.position - 1];
            return h('div', str)
          }
        }, {
          title: '图片',
          key: 'img',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.showImg(params.row)
                  }
                }
              }, '查看图片')
            ])
          }
        }, {
          title: '排序',
          key: 'sortIndex'
        }, {
          title: '页面路径',
          key: 'url'
        }, {
          title: '操作',
          key: 'action',
          minWidth: 120,
          fixed: 'right',
          align: 'center',
          render: (h, params) => {
            return h(
              'div',
              this.$refs.goodsTable.$scopedSlots.action({
                row: params.row
              })
            )
          }
        }],
        rules: {
          advType: [{
            required: true,
            message: '请选择',
            trigger: 'change'
          }],
          position: [{
            required: true,
            message: '请选择',
            trigger: 'change'
          }],
          img: [{
            required: true,
            message: '请上传图片',
            trigger: 'blur'
          }, {
            validator: (rule, value, callback) => {
              if (value != '') {
                callback();
              }
            }
          }]
        },
        loading: false,
        editItem: {},
        prevImgShow: false,
        prevImg: ''
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
      previewApp(){
        this.$http.get(this.$api.previewApp).then(res =>{
          if(res.code === 1000){
            this.prevImgShow = true
            this.prevImg = res.data;
          }
        })
      },
      publishApp(){

      },
      openModel(isEdit, item) {
        this.isEdit = isEdit
        if (isEdit) {
          this.editItem = item || {};
          this.dataApi = {
            advType: item.advType.toString(),
            appId: item.appId,
            credits: item.credits,
            envVersion: item.envVersion,
            extraData: item.extraData,
            id: item.id,
            img: item.img,
            name: item.name,
            position: item.position.toString(),
            sortIndex: item.sortIndex,
            url: item.url
          }
        } else {
          this.dataApi = {
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
          }
        }
        this.show = true;
      },
      cancel(name) {
        this.$refs[name].resetFields();
        this.show = false;
      },
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          this.loading = true
          if (valid) {
            let params = this.$clearData(this.dataApi);
            this.$http.post(this.$api.advertisementSave, params).then(res => {
              if (res.code === 1000) {
                this.$Message.success(this.isEdit ? '编辑成功' : '保存成功');
                this.getList();
                this.show = false;
              }
              this.loading = false;
            })
          } else {
            this.$Message.error('验证失败');
          }
        })
      },
      del(item) {
        this.$Modal.confirm({
          title: '删除广告',
          content: '确认是否删除广告？',
          onOk: () => {
            this.$http.post(this.$api.advertisementDelete, {
              id: item.id
            }).then(res => {
              if (res.code === 1000) {
                this.getList();
                this.$Message.success('删除成功!');
              } else {
                this.$Message.error(res.message);
              }
            })
          }
        })
      },
      showImg(item){
        this.prevImg = item.img;
        this.prevImgShow = true;
      }
    },
    created() {
      this.getList();
    }
  }
</script>

<style lang='less' scoped>
  .prevImg{
    text-align: center;
    img{
      max-width: 100%;
    }
  }
</style>