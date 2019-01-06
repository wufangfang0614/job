
// 合并所有reducer 并且返回
import { combineReducers } from 'redux'
import { user } from './redux/user.redux.js'
console.log('user')
console.log(user)
export default combineReducers({user})

