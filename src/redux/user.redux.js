import axios from 'axios'
import { dispatch } from 'rxjs/internal/observable/range';

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'

const initState = {
    isAuth:false,
    msg:'',
    user:'',
    type:''
}
//reducer
export function user(state=initState,action){
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {...state}
        case LOGIN_SUCCESS:
            return {...state}
        case ERROR_MSG:
            return {...state}
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
function errMsg(msg){
    return { msg,msgtype:ERROR_MSG}
}

export function register({user,pwd,repeatpwd,type}){
    if(!user||!pwd||!type){
        return errMsg('用户名密码必须输入')
    }
    if(pwd!=repeatpwd){
        return errMsg('密码和确认密码不同')
    }
    return dispatch=>{
        axios.post('/user/register',{user,pwd,type})
            .then(res=>{
                if(res.status==200&&res.data.code===0){
                    dispatch(registerSuccess({user,pwd,type}))
                }else{
                    dispatch(errMsg(res.data.msg))
                }
            })
    }
}