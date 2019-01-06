import React from 'react'
import Logo from './../../component/logo/logo'
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile'


class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            user:'',
            pwd:''
        }
        this.register = this.register.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }
    register(){
        this.props.history.push('/register')
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    handleLogin(){
        console.log(this.state)
    }
    render(){
        return(
            <div>
                <Logo/>
                <WingBlank>
                    <List>
                        <InputItem
                            onChange={v=>this.UNSAFE_componentWillMount.handleChange('user',v)}
                        >用户</InputItem>
                        <WhiteSpace/>
                        <InputItem
                            onChange={v=>this.UNSAFE_componentWillMount.handleChange('pwd',v)}
                        >密码</InputItem>
                        <WhiteSpace/>
                        <Button onChange={this.handleLogin}>登录</Button>
                        <WhiteSpace/>
                        <Button onChange={this.register}>注册</Button>
                    </List>
                </WingBlank>
            </div>
            
        )
    }
}
export default Login