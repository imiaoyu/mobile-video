<template>
  <div class="con">
    <el-button type="text"> 与其他用户匹配并一起观影</el-button>
    <el-input value="输入你的名称" v-model="user"></el-input>
    <el-button @click="onSubmit">确认并匹配</el-button>
    <el-button @click="clear">清除用户名</el-button>
  </div>
</template>

<script>
// import request from '@/utils/request'
import io from "socket.io-client";

export default {
  name: "Login",
  data() {
    return {
      // loginLoading:false,
      user:'',
      id:'',
      name:'',
      flag:false,
      playerCount:'',
      to:'',
      form: {
        mobile: '',
        code: ''
      },

      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        mobile: [
          {required: true, message: '账号不可为空', trigger: 'blur'}
        ],
        code: [
          {required: true, message: '密码不可为空', trigger: 'blur'}
        ]
      },

      // 对话框显示和隐藏
      dialogVisible: false
    }
  },
  mounted:function () {

    //建立websocket连接
    this.socket = io('http://api.imiaoyu.top');


    // 玩家登陆成功
    this.socket.on('home', function (data) {

        // 保存用户名和玩家在线人数到localStorage中
        localStorage.setItem('name', data.name)
        localStorage.setItem('playerCount', data.playerCount)
        // location.href = './home.html'
        // game.src = 'home.html'
        this.playerCount = localStorage.getItem('playerCount')
        this.name = localStorage.getItem('name')
        console.log('在线人数:'+this.playerCount,'用户名：'+this.name,'ID:'+data.id)

    })


    // eslint-disable-next-line no-unused-vars
    this.socket.on('getChat',  (data,to,from)=>{ //如果广播到用户包含自己，则匹配聊天
      // eslint-disable-next-line no-undef
      // var a = nameList[to]
      if(data.p1 == this.id){
        this.to = data.p2
        console.log('1')
      }else if(data.p2 == this.id){
        this.to = data.p1
        console.log('2')
      }
      // eslint-disable-next-line no-undef
      var name_to = to

      this.user = localStorage.getItem('user')

      if(name_to != this.user){

        console.log('本地：'+this.user+'对比'+'返回：'+name_to)

        this.$router.push( {
          path:'/articles/test',
          query:{
            // eslint-disable-next-line no-undef
            nameList: {user:name_to,to:this.to}
          }
        })

        console.log('已匹配到用户:'+name_to)

      }

      // console.log('已匹配到用户：:'+nameList)

      // this.$router.push({
      //   path:'/articles/test',
      //   query:{
      //     // eslint-disable-next-line no-undef
      //     nameList:nameList
      //   }
      // })
    },1000)

  },
  methods: {

    onSubmit() {


      this.$notify.info({
        title: '消息',
        message: '别点了，这个功能本来已经做好了，但是后面调试又出了问题，修不好了，真操蛋'
      });

      //
      // // eslint-disable-next-line no-unused-vars
      // const user = localStorage.getItem('user')
      //
      //
      // if(user == null){
      //   this.id=Math.random().toString(36).substr(2);
      //   localStorage.setItem('id', JSON.stringify(this.id))
      //   localStorage.setItem('user', JSON.stringify(this.user))
      //
      //   console.log(this.id)
      //
      //   this.socket.emit('login',{user_name:this.user,user_id:this.id} )
      //
      //   // 调用匹配函数
      //   // this.play()
      //
      //
      //   this.$notify.info({
      //     title: '消息',
      //     message: '当前用户'+this.user+',正在匹配中......'
      //   });
      //
      // }else {
      //   this.$notify.info({
      //     title: '消息',
      //     message: '已存在用户，无需再创建，正在匹配中......'
      //   });
      // }





      // // 为表单绑定验证功能
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
      //     this.$router.push("/");
      //   } else {
      //     this.dialogVisible = true;
      //     return false;
      //   }
      // });


      // this.loginLoading = true
      //
      // request({
      //   method: 'post',
      //   url: '/api/authorizations',
      //   // data 用来设置 POST 请求体
      //     headers: {
      //       'Content-Type': "application/json;charset=UTF-8"
      //     },
      //   data:{
      //         mobile:this.form.mobile,
      //         code:this.form.code
      //   }
      // }).then(res => {
      //   console.log(res)
      //
      //   // 登录成功
      //   this.$message({
      //     message: '登录成功',
      //     type: 'success'
      //   })
      //
      //   // 关闭 loading
      //   this.loginLoading = false
      //
      //   // 将接口返回的用户相关数据放到本地存储，方便应用数据共享
      //   // 本地存储只能存储字符串
      //   // 如果需要存储对象、数组类型的数据，则把他们转为 JSON 格式字符串进行存储
      //   localStorage.setItem('user', JSON.stringify(res.data.data))
      //
      //   // 跳转到首页
      //   this.$router.push('/')
      //
      //   // this.$router.push({
      //   //   name: 'home'
      //   // })
      // }).catch(err => { // 登录失败
      //   console.log('登录失败', err)
      //   this.$message.error('登录失败，手机号或验证码错误')
      //
      //   // 关闭 loading
      //   this.loginLoading = false
      // })

    },
    clear(){
      window.localStorage.removeItem('user')
    }



    }

}
</script>

<style>
.login-box {
  border: 1px solid #DCDFE6;
  width: 350px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}

.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}
@media (max-width:500px ) {
  .login-box{
    width: 100%;
  }
}
.con{
  width: 100%;
}
</style>
