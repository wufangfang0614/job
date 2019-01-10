import React from 'react'
import {List,InputItem,NavBar,Icon, Grid} from 'antd-mobile'
//import io from 'socket.io-client'
import {connect} from 'react-redux'
import {getMsgList,sendMsg,recvMsg} from '../../redux/chat.redux'
//const socket = io('ws://localhost:9093')
// socket.on('recvmsg',function(data){
//     console.log(data)
// })
class Chat extends React.Component{
	constructor(props){
		super(props)
		this.state = {text:'',msg:[]}
	}
	componentDidMount(){
        this.props.getMsgList()
        this.props.recvMsg()
	}
	handleSubmit(){
		//socket.emit('sendmsg',{text:this.state.text})
        //this.setState({text:''})
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg({from,to,msg})
        this.setState({text:''})

		
	}
	render(){
		
		return (
			<div id='chat-page'>
	

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
								
									<span onClick={()=>this.handleSubmit()} >发送</span>
								</div>
							}
						></InputItem>
					</List>
					
				</div>
			</div>
		)
	}
}

export default connect(state=>state,{getMsgList,sendMsg,recvMsg})(Chat)