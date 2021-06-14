<template>

  <el-container direction="vertical">


    <div class="layout">
      <div class="header">
<!--        视频播放-->
        <div class="flexbox-row flex-just-between flex-align-center header-box">
          <div :xs="12" :sm="6" :md="6" :lg="4" :xl="2" class="about" >
            <d-player ref="player" id="dplayer" :options="options" :key="key"></d-player>
          </div>
        </div>
      </div>

      <div class="section" style=" width: 100%;flex: auto;">

        <div style="height: 50px;background-color:#475669;width: 100%">
          <el-select class="select" v-model="value" placeholder="请选择其他影片" @change="findItemNameBYClass">
            <el-option
                v-for="item in option"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                >
            </el-option>
          </el-select>
        </div>

<!--        聊天内容-->
        <ul id="messages">
          <li>已完成多人影院模式·可体验  </li>
          <li>可与其他人同时观影·可能有网络延迟</li>

        </ul>
      </div>

      <div class="footer">
<!--        输入框-->
        <div style="bottom: 0;">
          <el-row type="flex">
            <el-col :span="16">
              <el-input v-model="input"></el-input>
            </el-col>
            <el-col :span="8">
              <el-button @click="send">发送</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </el-container>



</template>

<script>
import io from 'socket.io-client';
export default {
  name: "App",
  data(){
    return {
      option: [{
        value: 'https://bilibili.com-l-163.com/20181122/23963_0bec06d2/index.m3u8',
        label: '一九四二(冯小刚)'
      }, {
        value: 'https://iqiyi.cdn27-okzyw.net/20210304/9842_96901187/index.m3u8',
        label: '送你一朵小红花(最近)'
      }, {
        value: 'https://iqiyi.cdn7-okzyw.net/20200127/16864_c159fe6e/index.m3u8',
        label: '1917(长镜头)'
      }, {
        value: 'https://iqiyi.cdn27-okzyw.net/20210305/9873_d3b991ed/index.m3u8',
        label: '寻龙传说(最近)'
      }],
      value: '',

      key:0,
      input:'',
      to:'',
      duser:'',
      messages:[],
      lastTime:0,
      time:'',
      paused:true,
      // a:1,
      // socket:null
      options: {
        container: document.getElementById("dplayer"),   //播放器容器
        mutex: false, //  防止同时播放多个用户，在该用户开始播放时暂停其他用户
        theme: "#b7daff", // 风格颜色，例如播放条，音量条的颜色
        loop: false, // 是否自动循环
        lang: "zh-cn", // 语言，'en', 'zh-cn', 'zh-tw'
        // screenshot: true, // 是否允许截图（按钮），点击可以自动将截图下载到本地
        hotkey: true, // 是否支持热键 ，调节音量，播放，暂停等
        preload: "auto", // 自动预加载
        volume: 0.7, // 初始化音量
        playbackSpeed: [0.5, 0.75, 1, 1.25, 1.5, 2, 3], //可选的播放速度，可自定义
        logo: "http://video.imiaoyu.top/favicon.ico", // 在视频左角上打一个logo
        video: {
          url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-uni4934e7b/c4d93960-5643-11eb-a16f-5b3e54966275.m3u8', // 播放视频的路径
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
        //   // id: "9E2E3368B56CDBB4",
        //   // api: "https://api.prprpr.me/dplayer/",
        //   // token: "tokendemo", //后端验证令牌
        //   // maximum: 1000, //弹幕最大数量
        //   addition: ['http://dplayer.moerats.com/v3/?id=183f6653124c13ca6b924d021c233f52'], //其他弹幕
        //   // user: "DIYgod", //弹幕用户名
        //   // bottom: "15%", //值，例如：10px，10％，即弹幕底部和播放器底部之间的距离，以防止遮挡字幕
        //   // unlimited: true, //即使弹幕重叠也显示所有弹幕
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
    }
  },
  mounted:function () {
    // 接收匹配到的用户名
    // this.duser = this.$route.query.nameList.user
    // this.to = this.$route.query.nameList.to
    // console.log('对方的用户名：'+this.duser+'  对方ID：'+this.to)

    //建立websocket连接
     this.socket = io('http://api.imiaoyu.top');
     //dplayer 事件监控
     this.player = this.$refs.player.dp


    this.socket.emit('time', 1)


    this.socket.on('time',  (msg)=> {
      if(msg == 1){
        this.socket.emit('time',{time:this.player.video.currentTime,video_url:this.options.video.url})
      }else {
        this.options.video.url = msg.video_url;
        console.log('已同步视频链接 ： '+msg.video_url)
        this.time = msg.time;
        this.seeking()
      }
    });




    this.player.on('pause',  ()=> {
      // eslint-disable-next-line no-undef
      this.pause()
      // console.log('暂停');
    });

    this.player.on('play',  ()=> {
      let now = new Date().valueOf();
      if(this.lastTime == 0){
        this.pause()
        // console.log('触发事件');
        this.lastTime = now;
      }else {
        if ((now - this.lastTime) > 2000) {
          //重置上一次点击时间，2000是我自己设置的2秒间隔，根据自己的需要更改
          this.lastTime = now;
          this.pause()
          // console.log('间隔大于2秒，触发方法');
          //添加自己要调用的方法
        } else {
          // console.log('不触发');
        }
      }

      // console.log('播放');
    });


    this.player.on('seeking',  ()=> {
      //多次触发时间条短时间内只执行一次，防止内存溢出
      let now = new Date().valueOf();
      if(this.lastTime == 0){
        this.seeks()
        // console.log('触发事件');
        this.lastTime = now;
      }else {
        if ((now - this.lastTime) > 2000) {
          //重置上一次点击时间，2000是我自己设置的2秒间隔，根据自己的需要更改
          this.lastTime = now;
          this.seeks()
          // console.log('间隔大于2秒，触发方法');
          //添加自己要调用的方法
        } else {
          // console.log('不触发');
        }
      }


      // console.log('跳转');
    });


    // 获取当前播放还是暂停
    // this.paused=this.player.video.paused


    // this.inputtime=this.player.video.currentTime

    // 循环发送
    // function test(){
    //   this.socket.emit('chat message', this.player.video.paused);
    // }

    // setInterval(this.play,1000);
    var messages = document.getElementById('messages');
    // var form = document.getElementById('form');
    // var input = document.getElementById('input');
    //
    // form.addEventListener('submit', function(e) {
    //   e.preventDefault();
    //   if (input.value) {
    //     this.socket.emit('chat message', input.value);
    //     input.value = '';
    //   }
    // });

//接收同步播放信息
    this.socket.on('chat message', (msg)=> {
      // var item = document.createElement('li');
      // messages = msg;
      // // this.paused = msg;
      // // console.log('接收：'+this.paused);
      // messages.appendChild(item);



//判断当前值是数字还是字符，执行相关函数
      if(Number.isFinite(msg) == false){
        this.paused = msg;
        this.play()
        console.log('暂停播放')
      }else {
        this.time = msg;
        this.seeking()
        console.log('时间')
      }



      // window.scrollTo(0, document.body.scrollHeight);
    });

    // setInterval(this.send,1000);

    // 接收聊天信息
    this.socket.on('message',  (msg)=> {
      var item = document.createElement('li');
      item.textContent = msg;
      // this.paused = msg;
      console.log('接收信息：'+msg);
      messages.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
      // console.log('接收:'+msg)
    });



},
  methods:{
    // 发送信息
    send(){
      // this.socket.emit('message', {msg:this.input,to:this.to});
      this.socket.emit('message', this.input);
      this.input=''
    },
    // 处理同步播放暂停
    pause() {
      this.socket.emit('chat message', this.player.video.paused);
      console.log('发送:')
      // this.socket.emit('chat message', this.player.video.paused);

      // this.$notify({
      //   title: '提示',
      //   message: '已发送',
      //   duration: 0
      // });
    },
    play(){
      if(this.paused==this.player.video.paused){
        console.log('不用')
      }else {
        this.player.toggle()
        console.log('已暂停或者已播放')
      }
        // this.player.seek(this.messages);
        // console.log(this.player.video.paused)
      // console.log('1')
    },
// 处理同步播放时间
    seeks() {
      this.socket.emit('chat message', this.player.video.currentTime);
      console.log('发送同步时间')
      // this.socket.emit('chat message', this.player.video.paused);

      // this.$notify({
      //   title: '提示',
      //   message: '已发送',
      //   duration: 0
      // });
    },
    seeking(){
      // this.player.seek(22)
      if(this.time == this.player.video.currentTime){
        console.log('不用')
        this.player.seek(this.time+'20')
      }else {
        this.player.seek(this.time)
        console.log('已跳到相对时间')
      }

      // this.player.seek(this.messages);
      // console.log(this.player.video.paused)
      // console.log('1')
    },
    findItemNameBYClass:function(){
      this.options.video.url = this.value;
      this.key +=1
      console.log( this.value)
    }

  },

  watch: {
    inputtime(val, oldVal) {
      console.log("inputVal = " + val + " , oldValue = " + oldVal)
    }
    },


}
</script>
<style>
html,body{
  padding:0;
  margin:0 auto;
}
/*#messages{*/
/*  overflow-y: auto;*/
/*  list-style: none;*/
/*  white-space:nowrap;*/
/*  display: flex;*/
/*  width: auto;*/
/*}*/
#messages {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  white-space: nowrap;
}
#messages>li {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 15px;
  color: #9f9fa0;
  border-bottom: 0.5px solid #ddd;
}


body { margin: 0; padding-bottom: 3rem; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }

#form { background: rgba(0, 0, 0, 0.15); padding: 0.25rem; position: fixed; bottom: 0; left: 0; right: 0; display: flex; height: 3rem; box-sizing: border-box; backdrop-filter: blur(10px); }
#input { border: none; padding: 0 1rem; flex-grow: 1; border-radius: 2rem; margin: 0.25rem; }
#input:focus { outline: none; }
#form > button { background: #333; border: none; padding: 0 1rem; margin: 0.25rem; border-radius: 3px; outline: none; color: #fff; }

#messages { list-style-type: none; margin: 0; padding: 0; display:inline}
/*#messages > li { padding: 0.5rem 0.5rem; width: 100%;}*/
#messages > li:nth-child(odd) { background: #efefef; }


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
.layout {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
.section{
  overflow: hidden;
  height: 100%;
  margin-bottom: 15%;
}

.footer{
  /*display: flex;*/
  position: fixed;
  /*margin-bottom: 12%;*/
  bottom: -8%;
  /*height: 5%;*/
  /*box-sizing: border-box;*/
  /*background: rgb(248, 248, 248);*/
  width: 100%;
}

.select{
  top: -3.5em;
}
</style>
