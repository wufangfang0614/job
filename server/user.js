const express = require('express')

const Router = express.Router()
const model = require('./model.js')

const User = model.getModel('user')

Router.get('/info',function(req,res){
    console.log("into info")
    return res.json({code:0})
})
Router.get('/list',function(req, res){
	// User.remove({},function(e,d){})
	User.find({},function(err,doc){
		return res.json(doc)
	})
})
Router.post('/register',function(req,res){
    const {user,pwd,type} = req.body
    User.findOne({user},function(err,doc){
        if(doc){
            return res.json({code1,msg:'用户名重复'})
        }
        const userModel = new User({user,type,pwd:md5Pwd(pwd)})
        userModel.save(function(e,d){
            if(e){
                return res.json({code:1,msg:'后端出错了'})
            }
            return res.json({code:0})
        })
    })

})
function md5Pwd(pwd){
	const salt = 'imooc_is_good_3957x8yza6!@#IUHJh~~'
	return utils.md5(utils.md5(pwd+salt))
}
module.exports = Router