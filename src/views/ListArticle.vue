<template>
  <el-container direction="vertical">
<!--    <el-button type="text">如果好用请收藏，永久免费无广告</el-button>-->
    <div class="container">
<!--        <el-carousel indicator-position="outside" class="carousel" style="margin-bottom: 2em">-->
<!--          <el-carousel-item v-for="item in pics" :key="item">-->
<!--            <el-image :src="item.url"></el-image>>-->
<!--          </el-carousel-item>-->
<!--        </el-carousel>-->

        <div v-if="this.list == ''">
          <h4>稍等会儿,正在加载</h4>
        </div>
<div class="demo-image__lazy">
      <el-row>
        <el-col v-for="(item, index) in list" :key="index" :xs="12" :sm="6" :md="6" :lg="4" :xl="4" lazy>
          <el-card :body-style="{ padding: '0px' }" >
            <img :src="item.vod_pic" class="image" @click="getRowId(item.vod_play_url,item.vod_pic)">
            <div style="margin-top: -65px;" @click="getRowId(item.vod_play_url,item.vod_pic)">
              <span>{{item.vod_name}}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
</div>

      </div>
  </el-container>
<!--  -->
<!--  <el-table :data="tableData">-->
<!--    <el-table-column prop="date" label="日期" width="140">-->
<!--    </el-table-column>-->
<!--    <el-table-column prop="name" label="姓名" width="120">-->
<!--    </el-table-column>-->
<!--    <el-table-column prop="address" label="地址">-->
<!--    </el-table-column>-->
<!--  </el-table>-->

</template>

<script>
// import request from '@/../../../../mobile-video/src/utils/request'
export default {
  data() {
    return {
      list:[],
      pics: [
        { url: "https://yzf.qq.com/fsna/kf-file/kf_pic/20210228/KFPIC_1218208844_WXIMAGE_9f35c932a9b04d08a25cec97fad2c137.jpg"},
        { url: "https://bj.bcebos.com/im-cs/9dc7602c36ccf638198d67cc604e94e6.jpg"},
        { url: "https://bj.bcebos.com/im-cs/c249a283e9acda2f48547022e2c02e5e.gif"},
        { url: "https://alime-customer-upload-cn-hangzhou.oss-cn-hangzhou.aliyuncs.com/customer-upload/1602124065682_449j2g12fnhr.png"}
      ]
    };
  },
  mounted () {
    this.getQiniuToken()

    // const player = this.$refs.player.dp
    // player.play()
    // setTimeout(() => {
    //   player.pause()
    // }, 2000)【

  },
  methods: {
    getQiniuToken () {
      this.$axios({
        method: 'get',
        url: 'https://api.okzy.tv/api.php/provide/vod/at/json/?ac=detail&t=1',
        // data 用来设置 POST 请求体
        // data: this.user
      }).then(res => {
        console.log(res.data.list[0])
        this.list = res.data.list
      }).catch(err => { // 登录失败
        console.log('ok', err)
      })
    },
    getRowId (vod_play_url,vod_pic){
      var a=',';
      vod_play_url = vod_play_url.replace(/\$\$\$/g, ",");
      vod_play_url = vod_play_url.replace(/\$/g, ":");
      vod_play_url = vod_play_url.replace(/#/g, ",");
      vod_play_url = vod_play_url+a;
      // vod_play_url = vod_play_url.replace(/集:/g,'集:"');
      // vod_play_url = vod_play_url.replace(/,/g,'",');
      // this.$message({
      //   message: vod_play_url,
      //   center: true
      // });
      // this.vod_play_url=JSON.parse(vod_play_url);
      this.$router.push('/articles/videoplay?url='+vod_play_url+'pic'+vod_pic)
    }
  },

  };
</script>

<style>
html,body{
  padding:0;
  margin:0;
}
.el-card{
  width: 80px;
  height: 150px;
  margin-top: 1vh;
}

/*.el-col {*/
/*  border-radius: 4px;*/
/*  height: 20em;*/
/*  margin-top: 1vh;*/
/*}*/

.image {
  width: 100%;
  height: 90%;
  display: block;
}


.container{
  width: 70%;
  align-content: center;
  margin: 0 auto;
}

@media (max-width:500px ) {
  .container{
    width: 100%
  }
  .carousel{
    height: 6em;
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
