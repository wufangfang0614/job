import React from 'react'
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile'
import AvatarSelector from './../../component/avatar-selector/avatar-selector'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {update} from '../../redux/user.redux'
class GeniusInfo extends React.Component{
    constructor(props) {
		super(props)
		this.state = {
			title:'',
			desc:'',
			company:'',
			money:''
		}
	}
    selectAvatar=(imgname)=>{
        this.setState({
            avatar:imgname
        },()=>console.log(this.state))
        console.log("zhixing")
    }
    onChange(key,val){
		this.setState({
			[key]:val
		})
	}
    render(){
        const path = this.props.location.pathname
        const redirect = this.props.redirectTo
        return(
            <div>
                {redirect}
                {redirect&&redirect!=path?<Redirect to={redirect}/>:null}
                <NavBar mode="dark" >牛人完善信息页</NavBar>
                <AvatarSelector
                selectAvatar={(imgname)=>this.selectAvatar(imgname)}
                >
                    
                </AvatarSelector>
                <InputItem onChange={v=>this.onChange('title',v)}>
                求职行位
                </InputItem>
                <TextareaItem
                    onChange={v=>this.onChange('desc',v)}
                    rows={3}
                    autoHeight
                    title="职位要求"
                >

                </TextareaItem>
                <Button
                    type="primary"
                    onClick={()=>{
                        this.props.update(this.state)
                    }}
                >保存</Button>

            </div>
        )
    }
}
export default connect(state=>state.user,{update})(GeniusInfo)