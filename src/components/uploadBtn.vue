<template>
  <div class="upload-wrapper">
    <Upload :show-upload-list="false" :headers="ajaxHead" :action="apis" :format="['jpg','jpeg','png']" :max-size="2048" :on-success="handleSuccess" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="setLoading" :on-error="ctryErr">
      <Button type="primary" :loading="loading" icon="ios-cloud-upload-outline">上传图片</Button>
    </Upload>
    <div class="upload-img-list">
      <div class="img-list" v-for="(item,index) in imgSrc" :key="index" v-if="item!=''">
        <div class="upload-list-cover">
          <Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
          <Icon type="ios-eye" v-if="showPreview" @click.native="handlePrev(index)"></Icon>
        </div>
        <img :src="item">
      </div>
    </div>
    <Modal v-model="show" title="预览" width="800">
      <img :src="currentImg" style="max-width: 100%;">
      <div slot="footer">
        <Button @click="show = false">关闭</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: String,
        default: ''
      },
      single: {
        // 是否上传多张图片
        type: Boolean,
        default: false
      },
      showPreview: {
        //  是否有大图预览
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        imgSrc: [],
        loading: false,
        show: false,
        currentImg: ''
      }
    },
    computed: {
      apis() {
        return this.$api.uploadApi
      },
      ajaxHead() {
        return {
          authorization: this.$store.state.authorization
        }
      }
    },
    watch: {
      imgSrc(val) {
        this.$emit('input', val.toString())
      },
      value(val) {
        if (val != '') {
          this.imgSrc = val.split(',');
        } else {
          this.imgSrc = []
        }
      }
    },
    methods: {
      setLoading() {
        this.loading = true;
      },
      handleSuccess(res, file) {
        if (res.code === 1000) {
          if (this.single) {
            this.imgSrc = [];
          }
          if (process.env.NODE_ENV == 'development') {
            const commHost = 'http://192.168.0.81:8090'
            this.imgSrc.push(commHost + res.data);
          }else{
            this.imgSrc.push(res.data);
          }
          this.$Message.success('上传成功！');
          this.loading = false;
        }
      },
      ctryErr(error) {
        this.$Notice.warning({
          title: '上传异常!',
          desc: error
        });
        this.loading = false;
      },
      handleFormatError(file) {
        this.$Notice.warning({
          title: '上传文件类型错误！',
          desc: '您上传的： ' + file.name + ' 格式不正确, 请选择(.png,.jpg,.jpeg)后缀的文件。'
        });
        this.loading = false;
      },
      handleMaxSize(file) {
        this.$Notice.warning({
          title: '上传文件超出尺寸',
          desc: '您上传的：  ' + file.name + ' 太大了, 不得超过2MB。'
        });
        this.loading = false;
      },
      handleRemove(index) {
        if (this.imgSrc.length === 1) {
          this.imgSrc = []
        } else {
          this.imgSrc.splice(index, 1)
        }
      },
      handlePrev(index) {
        this.show = true;
        this.currentImg = this.imgSrc[index];
      },

    },
    created() {
      if (this.value) {
        this.imgSrc = this.value.split(',');
      }
    }
  }
</script>

<style lang='less' scoped>
  .upload-wrapper {
    display: inline-block;
  }
  
  .upload-img-list {
    margin-top: 10px;
    .img-list {
      width: 60px;
      height: 60px;
      text-align: center;
      line-height: 60px;
      border: 1px solid transparent;
      border-radius: 4px;
      overflow: hidden;
      background: #fff;
      position: relative;
      box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
      margin-right: 4px;
      display: inline-block;
      img {
        width: 100%;
        height: 100%;
      }
      .upload-list-cover {
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, .6);
      }
      &:hover {
        .upload-list-cover {
          display: block;
        }
      }
      i {
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
      }
    }
  }
</style>