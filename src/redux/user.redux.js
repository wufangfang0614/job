import axios from 'axios'
import {getRedirectPath} from './../utils'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LODA_DATA = 'LODA_DATA'

const initState = {
    isAuth:false,
    msg:'',
    user:'',
    type:'',
    redirectTo:''
}
//reducer
export function user(state=initState,action){
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {...state,isAuth:true,msg:'',...action.payload,redirectTo:getRedirectPath(action.payload)}
        case LOGIN_SUCCESS:
            return {...state,isAuth:true,msg:'',...action.payload,redirectTo:getRedirectPath(action.payload)}
        case ERROR_MSG:
            return {...state,isAuth:false, msg:action.msg}
        case LODA_DATA:
            return {...state,...action.payload}
        default:
            return state
    }
}

//create action
function registerSuccess(data){
    return { type:REGISTER_SUCCESS,payload:data}
}
function loginSuccess(data){
    return { type:LOGIN_SUCCESS,payload:data}
}
function errorMsg(msg){
    return { msg,type:ERROR_MSG}
}
export function loadData(userinfo){
    return {type:LODA_DATA,payload:userinfo}
}

export function register({user,pwd,repeatpwd,type}){
    
    console.log(user,pwd,type)
    if(!user||!pwd||!type){
        return errorMsg('用户名密码必须输入')
    }
    if(pwd!=repeatpwd){
        return errorMsg('密码和确认密码不同')
    }
    return dispatch=>{
        axios.post('/user/register',{user,pwd,type})
            .then(res=>{
                if(res.status==200&&res.data.code===0){
                    dispatch(registerSuccess({user,pwd,type}))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

export function login({user,pwd}){
    if(!user||!pwd){
        return errorMsg("用户名密码必须输入")
    }
    return dispatch=>{
        axios.post('/user/login',{user,pwd})
        .then(res=>{
            if(res.status==200&&res.data.code===0){
                dispatch(loginSuccess(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}