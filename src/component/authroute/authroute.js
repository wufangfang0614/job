import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

class AuthRoute extends React.Component{
    componentDidMount(){
        console.log(this.props.history)
        //获取用户信息
        axios.get('/user/info').
            then(res=>{
                if(res.status==200){
                    if(res.data.code==0){
                        //有登录信息
                    }else{
                        //this.props.history.push('/login')
                    }
                }
            })
    }
    render(){
        return(
            <p>跳转路由</p>
        )
    }
}

export default withRouter(AuthRoute)