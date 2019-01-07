import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, Radio, WingBlank, Button, WhiteSpace} from 'antd-mobile'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {register} from '../../redux/user.redux'

const RadioItem = Radio.RadioItem

class Register extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            user:'',
            pwd:'',
            repeatpwd:'',
            type:'genius' //或者boss
        }
        this.hanleRegister = this.hanleRegister.bind(this);
        this.hanleChange = this.hanleChange.bind(this);
    }
    hanleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    hanleRegister(){
        console.log(this.props)
        this.props.register(this.state)
    }
    render(){
        return(
            <div>
                {this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
                <WingBlank>
                <Logo/>
                <List>
                    {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
                    <InputItem
                        onChange={v=>this.hanleChange('user',v)}
                    >用户名</InputItem>
                    <WhiteSpace/>
                    <InputItem
                        type="password"
                        onChange={v=>this.hanleChange('pwd',v)}
                    >密码</InputItem>
                    <WhiteSpace/>
                    <InputItem
                        type="password"
                        onChange={v=>this.hanleChange('repeatpwd',v)}
                    >确认密码</InputItem>
                    <WhiteSpace/>
                    <RadioItem
                        checked={this.state.type=="genius"}
                        onChange={v=>this.hanleChange('type','genius')}
                    >牛人</RadioItem>
                    <WhiteSpace/>
                    <RadioItem
                        checked={this.state.type=="boss"}
                        onChange={v=>this.hanleChange('type','boss')}
                    >BOSS</RadioItem>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.hanleRegister}>注册</Button>  
                </List>
                </WingBlank>
            </div>
        )
    }
}
//[mapStateToProps], [mapDispatchToProps]  两个都要是对象
export default connect(state=>state.user,{register})(Register)