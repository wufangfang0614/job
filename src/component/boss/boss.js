import React from 'react'
import { Card, WhiteSpace,WingBlank} from 'antd-mobile'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'
import { spawn } from 'child_process';
class Boss extends React.Component{
    componentDidMount(){
        console.log("aaaa")
        this.props.getUserList('genius')
    
        
    }
    render(){
        const Header = Card.Header
        const Body = Card.Body
        return(
            <div>
                <WingBlank>
                    <WhiteSpace></WhiteSpace>
                    {this.props.userlist.map(v=>(
                        v.avatar?(<Card key={v._id}>
                            <Header
                                title={v.user}
                                thumb={require(`../../img/${v.avatar}.png`)}
                                extra={<span>{v.title}</span>}
                            >
                            </Header>
                            <Body>
                                {v.type=='boss'?<div>公司：{v.company}</div>:null}
                                {v.desc.split('\n').map(d=>(
                                    <div key={d}>{d}</div> 
                                ))}
                                {v.type=="boss"?<div>薪资：{v.money}</div> :null}
                            </Body>
                        </Card>):null
                    ))}
                </WingBlank>
            </div>
        )
    }
}

export default connect(state=>state.chatuser,{getUserList})(Boss)