const express = require('express')
const bodyPaser = require('body-parser')
const cookieParser = require('cookie-parser')
const model = require('./model.js')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const app = express()
const server = require('http').Server(app)
const userRouter = require('./user.js')
const io = require('socket.io')(server)

io.on('connection',function(socket){
    console.log('user login')
    socket.on('sendmsg',function(data){
        console.log(data)
        //io.emit('recvmsg',data)
        const {from,to,msg} = data
        const chatid = [from,to].sort().join('_')
        Chat.create({chatid,from,to,content:msg},function(err,doc){
            io.emit('recvmsg', Object.assign({},doc._doc))
        })

    })
})
app.use(cookieParser())
app.use(bodyPaser.json())
app.use('/user',userRouter)
app.get('/',function(req,res){
    res.send('<h1>hello</h1>')
})
server.listen(9093,function(){
    console.log('Node app start at port 9093')
})