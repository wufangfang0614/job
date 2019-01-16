import React from 'react'
import {connect} from 'react-redux'
import {List} from 'antd-mobile'
import { Badge } from 'antd-mobile';
class Msg extends React.Component{
    getLast(arr){
        return arr[arr.length-1]
    }
    render(){
        const Item = List.Item
        const Brief = Item.Brief
        const userid = this.props.user._id
        const userinfo = this.props.chat.users
        const msgGroup = {}
        //console.log('this.props.chat.chatmsg:',this.props.chat.chatmsg)
        this.props.chat.chatmsg.forEach(v=>{
            //console.log("before:",msgGroup[v.chatid])
            msgGroup[v.chatid] = msgGroup[v.chatid] || []
            //console.log("after:",msgGroup[v.chatid])
            msgGroup[v.chatid].push(v)
        })
        const chatList = Object.values(msgGroup).sort((a,b)=>{
            const a_last = this.getLast(a).create_time
            const b_last = this.getLast(b).create_time
            return b_last - a_last
        }) 
        console.log('msgGroup',msgGroup)
        return(
            <div>
                
                    {chatList.map(v=>{
                        const lastItem = this.getLast(v)
                        console.log("v:",v)
                        //获取对方用户
                        const targetId = v[0].from==userid?v[0].to:v[0].from
                        const unreadNum = v.filter(v=>!v.read&&v.to==userid).length
                        console.log('unreadNum',unreadNum)
                        if(!userinfo[targetId]){
                            return null
                        }
                        //const name = userinfo[targetId] ? userinfo[targetId].name:''
                        //const avatar = userinfo[targetId] ? userinfo[targetId].avatar:''
                     return(
                        <List key={lastItem._id}>
                        <Item 
                            extra={<Badge text={unreadNum}></Badge>}
                            thumb={require(`../../img/${userinfo[targetId].avatar}.png`)}
                            arrow="horizontal"
                            onClick={()=>{
                                this.props.history.push(`/chat/${targetId}`)
                            }}
                        > 
                                {lastItem.content}
                            <Brief>
                            {userinfo[targetId].name}
                            </Brief>
                        </Item>
                        </List>
                     )   
                    })}
                
            </div>
        )
    }
}
export default connect(state=>state)(Msg)