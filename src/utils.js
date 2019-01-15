export function getRedirectPath({type, avatar}){
	// 根据用户信息 返回跳转地址
	// user.type /boss /genius
	// user.avatar /bossinfo /geniusinfo 
	console.log("type, avatar}")
	console.log(type, avatar)
	let url = (type==='boss')?'/boss': '/genius'
	if (!avatar) {
		console.log("这里了")
		url += 'info'
	}
	return url
}

export function getChatId(userId, targetId){
	return [userId,targetId].sort().join('_')
}