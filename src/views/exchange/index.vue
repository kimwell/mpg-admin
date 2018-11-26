<template>
  <div class="page-inner">
    <Card :bordered="false" title="积分兑换网费" dis-hover>
      <Form :mode="dataApi" :label-width="100" @submit.native.prevent ref="formRef" :model="dataApi" :rules="rule">
        <FormItem label="手机号：" prop="phone">
          <Input v-model="dataApi.phone" placeholder="请输入..." style="width:200px;"></Input>
        </FormItem>
        <FormItem label="积分：" prop="credits">
          <Input v-model="dataApi.credits" placeholder="请输入..." style="width:200px;"></Input>
        </FormItem>
        <FormItem label="备注：">
          <Input v-model="dataApi.remark" placeholder="请输入..." style="width:200px;"></Input>
        </FormItem>
        <FormItem>
          <Button type="warning" :loading="loading" @click="save('formRef')" style="margin-right: 10px;">保存</Button>
          <Button @click="reset('formRef')">取消</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dataApi: {
          credits: '',
          phone: '',
          remark: ''
        },
        loading: false,
        rule: {
          credits: [{
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }],
          phone: [{
            required: true,
            message: '不能为空',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      reset(name) {
        this.dataApi = {
          credits: '',
          phone: '',
          remark: ''
        }
        this.loading = false;
        this.$refs[name].resetFields();
      },
      save(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.loading = true;
            let params = this.$clearData(this.dataApi);
            this.$http.post(this.$api.changCredits, params).then(res => {
              if (res.code === 1000) {
                this.reset('formRef')
                this.$Message.success('扣除成功')
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
    }
  }
</script>

<style lang='less' scoped>
  
</style>