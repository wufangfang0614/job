import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, Radio, WingBlank, Button, WhiteSpace} from 'antd-mobile'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {register} from '../../redux/user.redux'
import imoocForm from '../../component/imooc-form/imooc-form'
const RadioItem = Radio.RadioItem

class Register extends React.Component{
    constructor(props){
        super(props)
        this.hanleRegister = this.hanleRegister.bind(this);
    }
    hanleRegister(){
        console.log(this.props)
        this.props.register(this.props.state)
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
                        onChange={v=>this.props.handleChange('user',v)}
                    >用户名</InputItem>
                    <WhiteSpace/>
                    <InputItem
                        type="password"
                        onChange={v=>this.props.handleChange('pwd',v)}
                    >密码</InputItem>
                    <WhiteSpace/>
                    <InputItem
                        type="password"
                        onChange={v=>this.props.handleChange('repeatpwd',v)}
                    >确认密码</InputItem>
                    <WhiteSpace/>
                    <RadioItem
                        checked={this.props.state.type=="genius"}
                        onChange={v=>this.props.handleChange('type','genius')}
                    >牛人</RadioItem>
                    <WhiteSpace/>
                    <RadioItem
                        checked={this.props.state.type=="boss"}
                        onChange={v=>this.props.handleChange('type','boss')}
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
export default imoocForm(connect(state=>state.user,{register})(Register))