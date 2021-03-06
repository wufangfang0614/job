import axios from 'axios'
import {getRedirectPath} from './../utils'

const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LODA_DATA = 'LODA_DATA'
const LOGOUT = 'LOGOUT'

const initState = {
    msg:'',
    user:'',
    type:'',
    redirectTo:''
}
//reducer
export function user(state=initState,action){
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...state,msg:'',...action.payload,redirectTo:getRedirectPath(action.payload)}
        case ERROR_MSG:
            return {...state,isAuth:false, msg:action.msg}
        case LODA_DATA:
            return {...state,...action.payload}
        case LOGOUT:
            return {...initState,redirectTo:'/login'}
        default:
            return state
    }
}

//create action
function authSuccess(obj){
    console.log("authSuccess")
    console.log(obj)
    const {...data} = obj
    return { type :AUTH_SUCCESS,payload:data}
}
function errorMsg(msg){
    return { msg,type:ERROR_MSG}
}
export function loadData(userinfo){
    return {type:LODA_DATA,payload:userinfo}
}
export function update(data){
    return dispatch=>{
        axios.post('/user/update',data)
            .then(res=>{
                console.log('res.data')
                console.log(res.data)
                if(res.status==200&&res.data.code===0){
                    dispatch(authSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
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
                    dispatch(authSuccess(res.data.data))
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
                dispatch(authSuccess(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }

}

export function logoutSubmit (){
    return { type:LOGOUT}
}
