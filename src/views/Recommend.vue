<template>


  <el-container direction="vertical">

    <el-button type="text">如果好用请收藏，永久免费无广告</el-button>
    <div class="container">
      <div v-if="this.list == ''">
        <h4>稍等会儿,正在加载</h4>
      </div>

      <div>
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

</template>

<script>
export default {
  data() {
    return {
      list:[],
    };
  },
  mounted () {
    this.getQiniuToken()
    this.open()
  },
  methods: {
    getQiniuToken () {
      this.$axios({
        method: 'get',
        url: 'https://api.okzy.tv/api.php/provide/vod/?ac=detail&h=24',
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
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

</style>
