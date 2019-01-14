import React from 'react'
import {NavBar} from 'antd-mobile'
import {Switch,Route} from 'react-router-dom'
import {connect} from 'react-redux'
import Boss from '../../component/boss/boss'
import Genius from '../../component/genius/genius'
import User from '../../component/user/user'
import NavLinkBar from '../../component/navlink/navlink'
import Chat from '../../component/chat/chat'
import {getMsgList,recvMsg} from '../../redux/chat.redux'

class DashBoard extends React.Component{
	componentDidMount(){
		console.log("進入dashboard了")
		this.props.getMsgList()
		this.props.recvMsg()
		
	}
    render(){
        const {pathname} = this.props.location
		const user = this.props.user
		console.log('user')
		console.log(user)
        const navList = [
			{
				path:'/boss',
				text:'牛人',
				icon:'boss',
				title:'牛人列表',
				component:Boss,
				hide:user.type=='genius'
			},
			{
				path:'/genius',
				text:'boss',
				icon:'job',
				title:'BOSS列表',
				component:Genius,
				hide:user.type=='boss'
			},
			{
				path:'/msg',
				text:'消息',
				icon:'msg',
				title:'消息列表',
				component:Chat
			},
			{
				path:'/me',
				text:'我',
				icon:'user',
				title:'个人中心',
				component:User
			}
		]
        return(
            <div>
                <NavBar className='fixd-header' mode="dard">
                    {navList.find(v=>v.path==pathname).title}
                </NavBar>
                <div style={{marginTop:45}}>
                    <Switch>
                        {navList.map(v=>(
                            <Route key={v.path} path={v.path} component={v.component}></Route>
                        ))}
                    </Switch>
                </div>
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        )
    }
}
export default connect(state=>state,{getMsgList,recvMsg})(DashBoard)