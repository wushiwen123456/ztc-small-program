/**
 * assets函数，如果常用，建议加入到vue中去，避免每次导入
 */

// export var http = 'http://47.52.132.133:8080/app/'
export var http = 'https://zct.51kdd.com/app/'
/**
 * 用户未登陆情况下，根据用户设定跳转到登陆位置
 */
export function forwardLogin() {
	let phone = uni.getStorageSync('phone')
	let gesture = uni.getStorageSync('gesture')
	console.log('forwardLoginforwardLoginforwardLoginforwardLogin')
	if (phone && phone.length > 0 && gesture == 'on') {
		uni.reLaunch({
			url: '/pages/login-reg/gesture-login/gesture-login'
		})
	} else {
		uni.reLaunch({
			url: '/pages/login-reg/login/login'
		})
	}
}

export function hasTransPwd() {
	return new Promise(function(resolve,reject) {
		const authKey = uni.getStorageSync('authKey');
		uni.request({
			url: http + '',
			method: 'GET',
			header:{
				authKey:authKey
			},
			data: {},
			success: res => {
				let data = res.data.data
				console.log(data)
				if(res.data.code == 200){
					let args = []
					let trader = false
					if (data.trader == 'yes')
						trader = true
					args.push(trader)
					args.push(data.certificate)
					args.push(data.status)
					resolve(args)
				}
			},
			fail: () => {
				console.log("请求失败")
			}
		});
	})
}

export function floatEqual(left, right) {
	let l = parseFloat(left)
	let r = parseFloat(right)
	return Math.abs(l - r) < Number.EPSILON * Math.pow(2, 48)
}


// module.exports = {
// 	
// }