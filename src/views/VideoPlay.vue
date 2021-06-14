<template>
  <el-container>

<!--    <div style="background-color: #333333">111</div>-->
    <div class="body">
<!--        <div :xs="12" :sm="6" :md="6" :lg="4" :xl="2" class="about">-->
<!--          <video-player-->
<!--              ref="videoPlayer"-->
<!--              class="video-player vjs-custom-skin"-->
<!--              :playsinline="true"-->
<!--              :options="playerOptions"-->
<!--              @play="onPlayerPlay($event)"-->
<!--          @pause="onPlayerPause($event)"-->
<!--          />-->
<!--        </div>-->

      <div :xs="12" :sm="6" :md="6" :lg="4" :xl="2" class="about" >
        <d-player ref="player" id="dplayer" :options="options" :key="key"></d-player>
      </div>
<!--      <el-button @click="button()">1</el-button>-->
      <div style="text-align: left; width: auto;height: 9vh;margin-top: -1em"><a>播放</a></div>

        <el-row>
          <el-col v-for="(item, index) in videourl[1]" :key="index" :xs="6" :sm="6" :md="6" :lg="4" :xl="2">
            <el-button  @click="getRowId(item.text)">{{item.title}}</el-button>
          </el-col>
        </el-row>

<!--      <div style="text-align: left; width: auto;height: 9vh;margin-top: 0em"><a>备用</a></div>-->
<!--      <el-row :gutter="10" >-->
<!--          <el-col v-for="(item, index) in videourl[0]" :key="'info1-'+ index" :xs="6" :sm="6" :md="6" :lg="4" :xl="2">-->
<!--            <el-button  @click="getRowId(item.text)">{{item.title}}</el-button>-->
<!--          </el-col>-->
<!--      </el-row>-->


    </div>
  </el-container>
</template>

<script>

import Vue from "vue";
import VueDPlayer from "vue-dplayer";
import "vue-dplayer/dist/vue-dplayer.css";
Vue.use(VueDPlayer);
export default {
  name: "VideoPlay",
  data() {
    return {
      key:0,
      url:"",
      pic:'',
      videourl:[],
      options: {
        container: document.getElementById("dplayer"),   //播放器容器
        mutex: false, //  防止同时播放多个用户，在该用户开始播放时暂停其他用户
        theme: "#b7daff", // 风格颜色，例如播放条，音量条的颜色
        loop: false, // 是否自动循环
        lang: "zh-cn", // 语言，'en', 'zh-cn', 'zh-tw'
        // screenshot: true, // 是否允许截图（按钮），点击可以自动将截图下载到本地
        hotkey: true, // 是否支持热键，调节音量，播放，暂停等
        preload: "auto", // 自动预加载
        volume: 0.7, // 初始化音量
        playbackSpeed: [0.5, 0.75, 1, 1.25, 1.5, 2, 3], //可选的播放速度，可自定义
        logo: "", // 在视频左角上打一个logo
        video: {
          url: '', // 播放视频的路径
          // quality: [
          //   // 设置多个质量的视频
          //   {
          //     name: "高清",
          //     url: "https://media.w3.org/2010/05/sintel/trailer.mp4",
          //     type: "auto", // 'auto', 'hls', 'flv', 'dash', 'webtorrent', 'normal' 或 其他自定义类型
          //   },
          //   {
          //     name: "标清",
          //     url:
          //         "https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4",
          //     type: "auto",
          //   },
          // ],
          // defaultQuality: 0, // 默认是高清
          pic: '', // 视频封面图片
          // thumbnails: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606462956126&di=2d87964d4faf656af55d09d938640d97&imgtype=0&src=http%3A%2F%2Fattachments.gfan.com%2Fforum%2Fattachments2%2F201310%2F10%2F150326y7dzdd8d4kpjjdsd.jpg", // 进度条上的缩略图,需要通过dplayer-thumbnails来生成
        },
        // subtitle: {   //字幕
        //   url: "",   //字幕网址
        //   color:'#fff',
        //   fontSize: "20px",
        //   bottom: "40px",
        // },
        // danmaku: {
        //   // 弹幕
        //   id: "9E2E3368B56CDBB4",
        //   api: "https://api.prprpr.me/dplayer/",
        //   token: "tokendemo", //后端验证令牌
        //   maximum: 1000, //弹幕最大数量
        //   addition: ["https://api.prprpr.me/dplayer/v3/bilibili?aid=4157142"], //其他弹幕
        //   user: "DIYgod", //弹幕用户名
        //   bottom: "15%", //值，例如：10px，10％，即弹幕底部和播放器底部之间的距离，以防止遮挡字幕
        //   unlimited: true, //即使弹幕重叠也显示所有弹幕
        // },
        contextmenu: [
          //  自定义上下文菜单
          // 右键菜单
          {
            text: "custom1",
            link: "https://www.bilibili.com",
          },
          {
            text: "custom2",
            click: (player) => {
              console.log(player);
            },
          },
        ],
        highlight: [
          //进度条上的自定义时间标记
          // 进度条时间点高亮
          {
            text: "10M",
            time: 6,
          },
          {
            text: "20M",
            time: 12,
          },
        ],
      }
    };
  },
  mounted(){
    this.getParams ()

  },
  methods:{
    getParams () {
      // 取到路由带过来的参数
      this.url = this.$route.query.url;
      this.pic = this.$route.query.pic;
      let objArray=[]
      let guide = this.url.split(',') //res.data.guide为上述字符串
      guide.pop()
      // eslint-disable-next-line no-unused-vars
      guide.forEach((item,index) => {
        const title = item.split(":")[0];
        const text1 = item.split(":")[1];
        const text2 = item.split(":")[2];
        const text = text1+':'+text2;
        let obj = {
          title,text
        }
        objArray.push(obj)
      })
      console.log('一维数组:',objArray)

      // 一维数组转二维数组代码
      // var arr = ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15'];
      var newArr = [];
      var len = objArray.length;
      for(let i = 0, j = 0; i < len; i += len-1, j++){
        newArr[j] = objArray.splice(0, len/2);
      }
      console.log(newArr)

      this.videourl=newArr

      console.log('二维数组:',this.videourl);
      // console.log(this.url1.第02集); // 输出 test message
      // 默认自动加载数据

      this.options.video.url=this.videourl[1][0].text
      this.options.video.pic=this.pic
      this.key +=1

      console.log(this.options.video.url)
    },
    getRowId(vod_play_url){


      // Object.assign(this.$data.options, this.$options.data().options)


        this.options.video.url=vod_play_url
        this.key +=1
      console.log(this.options.video.url)
    },
    // button(){
    //   console.log('options.video.current.currentTime')
    // }
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


.body{
  width: 70%;
  align-content: center;
  margin: 0 auto;
}

@media (max-width:500px ) {
  .body{
    width: 100%
  }
}
.about {
  width: 100%;
  height: auto;
  margin: 0 auto;
  text-align: center;
}
</style>
