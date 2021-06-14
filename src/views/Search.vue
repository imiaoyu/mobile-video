<template>


  <el-container direction="vertical">
    <div class="container" >
  <el-row type="flex">
    <el-col :span="16">
      <el-input
        placeholder="请输入视频名称"
        v-model="input"
        clearable>
    </el-input>
    </el-col>
    <el-col :span="8">
      <el-button @click="search()" type="primary" icon="el-icon-search">搜索</el-button>
    </el-col>
  </el-row>
    </div>

    <div class="container">
    <el-row :gutter="10">
      <el-col v-for="(item, index) in list" :key="index" :xs="12" :sm="6" :md="6" :lg="4" :xl="4">
        <el-card :body-style="{ padding: '0px' }" >
          <img :src="item.vod_pic" class="image" @click="getRowId(item.vod_play_url)">
          <div style="margin-top: -65px;" @click="getRowId(item.vod_play_url)">
            <span>{{item.vod_name}}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    </div>
  </el-container>

</template>

<script>
export default {
  data(){
    return{
      input:'',
      list:[]

    }
  },
  mounted(){

  },
  methods:{
    search (){
      if(this.input == ''){
        this.$message('没有内容你搜个毛线');
      }else {
        this.$axios({
          method: 'get',
          url: 'https://api.okzy.tv/api.php/provide/vod/?ac=detail&wd='+this.input,
          // data 用来设置 POST 请求体
          // data: this.user
        }).then(res => {
          console.log(res.data.list[0])
          this.list = res.data.list
        }).catch(err => { // 登录失败
          console.log('ok', err)
        })
      }
    },

    getRowId (vod_play_url){
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
      this.$router.push('/articles/videoplay?url='+vod_play_url)
    }
  }
}
</script>

<style>
html,body{
  padding:0;
  margin:0 auto;
}
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;

}
.el-card{
  width: 150px;
  height: 250px;
  margin-top: 1vh;
  transition: all .5s;
}
.el-card:hover{
  margin-top: -1px;
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
}
</style>
