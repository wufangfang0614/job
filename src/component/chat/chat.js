import React from 'react'
import {List,InputItem,NavBar,Icon, Grid} from 'antd-mobile'
//import io from 'socket.io-client'
import {connect} from 'react-redux'
import {getMsgList,sendMsg,recvMsg} from '../../redux/chat.redux'
import {getChatId} from '../../utils'
//const socket = io('ws://localhost:9093')
// socket.on('recvmsg',function(data){
//     console.log(data)
// })
const Item = List.Item
class Chat extends React.Component{
	constructor(props){
		super(props)
		this.state = {text:'',msg:[]}
	}
	componentDidMount(){
        if(!this.props.chat.chatmsg.length){
			this.props.getMsgList()
			this.props.recvMsg()
		}
		
	}
	//不懂为什么要手动派发一个事件
	fixCarousel(){
		setTimeout(function(){
			window.dispatchEvent(new Event('resize'))
		},0)
	}
	handleSubmit(){
		//socket.emit('sendmsg',{text:this.state.text})
        //this.setState({text:''})
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg({from,to,msg})
        this.setState({
			text:'',
			showEmoji:false
		})

		
	}
	render(){
		const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
										.split(' ')
										.filter(v=>v)
										.map(v=>({text:v}))
		const userid = this.props.match.params.user
		//console.log('userid',userid)
		const users= this.props.chat.users
		
		if(!users[userid]){
			return null
		}
		const chatid = getChatId(userid,this.props.user._id)
		const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatid==chatid)
		return (
			<div id='chat-page'>
			<NavBar
				mode="dark"
				icon={<Icon type="left"/>}
				onLeftClick={()=>{
					this.props.history.goBack()
				}}
			>
				{users[userid].name}
			</NavBar>
			<div>
				{chatmsgs.map(v=>{
					const avatar = require(`../../img/${users[v.from].avatar}.png`)
					console.log('v.from',v.from)
					console.log('v.form==userid:',userid==v.form)
					console.log('userid',userid)
					return userid==v.form?
					(<List key={v._id}>
						<Item
							thumb={avatar}
						>
							{v.content}
						</Item>
					</List>):(
					<List key={v._id}>
						<Item
							extra={<img src={avatar} alt=""/>}
							
							className="chat-me">
							{v.content}
						</Item>
					</List>
					)
				})}
			</div>
	

				<div className="stick-footer">
					
					<List>
						<InputItem
							placeholder='请输入'
							value={this.state.text}
							onChange={v=>{
								this.setState({text:v})
							}}
							extra={
								<div>
									<span
										style={{marginRight:15}}
										onClick={()=>{
											this.fixCarousel()
											this.setState({
												showEmoji:!this.state.showEmoji
											})
										}}
									>
									😀
									</span>
									<span onClick={()=>this.handleSubmit()} >发送</span>
								</div>
							}
						></InputItem>
					</List>
					{this.state.showEmoji?<Grid 
						data={emoji}
						columnNum={9}
						carouselMaxRow={4}
						isCarousel={true}
						onClick={el=>{
							this.setState({
								text:this.state.text+el.text
							})
						}

						}
					/>:null}
					
				</div>
			</div>
		)
	}
}

export default connect(state=>state,{getMsgList,sendMsg,recvMsg})(Chat)