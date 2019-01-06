const express = require('express')
const bodyPaser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./user.js')


const app = express()
app.use(cookieParser())
app.use(bodyPaser.json())
app.use('/user',userRouter)
app.get('/',function(req,res){
    res.send('<h1>hello</h1>')
})
app.listen(9093,function(){
    console.log('Node app start at port 9093')
})