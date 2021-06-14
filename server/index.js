const express = require('express');
var app = express();

app.use((req, res, next) => {
//判断路径
    if(req.path !== '/' && !req.path.includes('.')){
        res.set({
            'Access-Control-Allow-Credentials': true, //允许后端发送cookie
            'Access-Control-Allow-Origin': req.headers.origin || '*', //任意域名都可以访问,或者基于我请求头里面的域
            'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type', //设置请求头格式和类型
            'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',//允许支持的请求方式
            'Content-Type': 'application/json; charset=utf-8'//默认与允许的文本格式json和编码格式
        })
    }
    req.method === 'OPTIONS' ? res.status(204).end() : next()
})

const http = require('http').Server(app);


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


// app.use(express.json())

// let  router=app.Router();
const db=require("./db");
// const io = require("socket.io")(http);
const io = require("socket.io")(http, {
    cors: {
        origin: ["http://localhost:8080","http://video.imiaoyu.top","http://api.imiaoyu.top","http://dplayer.moerats.com"],
        methods: ["GET", "POST"]
    }
});

// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By",' 3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });



http.listen(3000,()=>{
    console.log(`Socket.IO server running at http://localhost:3000/`)
});

// const port = process.env.PORT || 3000;

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });

// 玩家在线总数
var playerCount = 0
//绑定对象
var userServer = {};
// 玩家在线集合
// var players = []


var userList = {};
var freeList = [];

var time ='';

io.on('connection', (socket) => {

// 玩家登陆, socket.emit('login', username)就是触发了这个事件
    // 监听了login事件
    socket.on('login',  (name)=> {
            playerCount +=1

            socket.emit('home', {'playerCount': playerCount, 'name': name.user_name,'id':name.user_id})
            console.log('用户：'+name.user_name + '    ID:'+name.user_id+'已登陆')

            var nickname = name.user_name,
                user_id = name.user_id;
            socket.id = user_id;
            userServer[user_id] = socket;
            userList[user_id] = nickname
            freeList.push(user_id)

            io.emit('message',freeList)
            io.emit('addCount', playerCount)//总人数
            if(freeList.length > 1){
                var from = user_id;
                // eslint-disable-next-line no-undef
                Arrayremove(freeList,from)
                if(freeList.length == 1){
                    // eslint-disable-next-line no-undef
                    n = 0
                }else{
                    // eslint-disable-next-line no-undef
                    n = Math.floor(Math.random() * freeList.length)
                }
                // eslint-disable-next-line no-undef
                var to = freeList[n]
                // eslint-disable-next-line no-undef
                Arrayremove(freeList,to)


                io.emit('getChat',{p1:from,p2:to},userList[to],userList[from])

                console.log('from:' +from ,'to:'+to)

                console.log(playerCount + '人')

                console.log('已匹配到：'+userList[to])

        }
        // console.log('from:' +from ,'to:'+to)


    })
    // 后台一直同步事时间
    socket.on('time', msg => {
        if(msg == 1){
            io.emit('time', msg);
        }else {
            io.emit('time', msg,);
        }

    });

    // 视频操作同步
    socket.on('chat message', msg => {
        io.emit('chat message', msg);
    });
    // 用户聊天
    socket.on('message', msg => {
        console.log(msg)
        io.emit('message', msg);
    });
    // socket.on('message',(data)=>{
    //
    //     console.log(data.to,data.msg)
    //     // eslint-disable-next-line no-prototype-builtins
    //     if(userServer.hasOwnProperty(data.to)){
    //         userServer[data.to].emit('getMsg',data.msg)
    //     }else{
    //         socket.emit("err",{msg:"对方已经下线或者断开连接"})
    //     }
    // })

// 用户注销
    socket.on('disconnect',function(){ //用户注销登陆执行内容
        playerCount -= 1;
        var id = socket.id
        console.log(id+'已注销')
        // eslint-disable-next-line no-undef
        Arrayremove(freeList,id)
        delete userServer[id]
        delete userList[id]
        io.emit('onlineCount',freeList)
        io.emit('offline',{id:id})
        io.emit('addCount', playerCount)
    })
});


// http.listen(port, () => {
//     console.log(`Socket.IO server running at http://localhost:${port}/`);
// });



// 登录
app.post('/api/authorizations',  function (req,res){
    // var mobile = req.body.username
    // var code = req.body.password
    console.log("服务端",req.body)
    const {mobile,code}=req.body;
    let sql=`select * from user where mobile=${mobile} and code=${code}`
    console.log("sql",sql)
    let sqlObj=[]
    console.log("sqlObj",sqlObj)
    let callBack=function(err,data){
        if(!data.length){
            // console.log("失败")
            res.send({
                message:"登录失败",
                code:-1,
            })
        }else{
            res.send({
                message:"ok",
                code:201,
                data:{
                    // token:123456789,id:data[0].id,username:data[0].username,
                    data
                }
            })
        }

    }
    db.dbConn(sql,sqlObj,callBack)

})

function Arrayremove(array,name){
    var len = array.length;
    for(var i=0; i<len; i++){
        if(array[i] == name){
            array.splice(i,1)
            break
        }
    }
}

