import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadData } from '../../redux/user.redux'
class AuthRoute extends React.Component{
    componentDidMount(){
        console.log(this.props.history)
        //获取用户信息
        axios.get('/user/info').
            then(res=>{
                if(res.status==200||res.status==304){
                    if(res.data.code==0){
                        //有登录信息
                        this.props.loadData(res.data.data)
                    }else{
                        //没有登录信息
                        this.props.history.push('/login')
                    }
                }
            })
    }
    render(){
        return null
    }
}

export default connect(state=>state.user,{loadData})(withRouter(AuthRoute))