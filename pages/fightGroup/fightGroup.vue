<template>
	<view class="fightGroup">
		<block v-if="content">
		<view class="reser">
			<view class="img"><img :src="content.product.cover" alt=""></view>
			<view class="cont">
				<view class="tit">{{content.product.name}}</view>
				<view class="txt ell">{{content.product.introduction}}</view>
				<view class="txt" style="margin-top: 10upx;color: #b37d1d;"><img src="../../static/time.png" alt="">{{content.product.cost}}分钟</view>
			    <view class="price red">￥<span class="red">{{prices}}</span>/次</view>
			</view>
		</view>
		<view class="img">
			<view class="groupImg pin">
				<span class="spell">拼主</span>
				<img :src="content.master.avatarurl" alt="">
			</view>
			<view class="groupImg" v-for="(dd,index) in content.followers" :key="index" v-if="dd !=''">
				<img :src="dd.user.avatarurl" alt="">
			</view>
		</view>
		<view class="tip" v-if="content.status==2"><img src="../../static/notice.png" alt="">拼团已满</view>
		<view class="tip" v-if="content.status==1">仅剩<span class="red" style="font-weight: bold;">{{content.can_join}}</span>个名额，<span style="font-weight: bold;">{{content.remaining}}</span>后结束</view>
		<view class="buttonR" @tap="shared()">一键拼团</view>
		<view class="list">
			<view class="listn"><view class="left">拼团须知</view><view class="right gray">· 好友拼团 · 人满成功 · 人不满退款</view></view>
		</view>
		<view class="purchase groupMore" v-if="specificatbuy">
			<view class="purchaseN">
				<view class="head">
					<view class="headImg">
						<img :src="content.product.cover" alt="">
					</view>
					<view class="headTit">
						<view class="price red" >￥{{prices}}</view>
						<view class="choose" >{{buyTimes}}</view>
					</view>
					<view class="closeB">
						<img @tap="goclose()" src="../../static/close1.png" alt="">
					</view>
				</view>
				<view class="specification">
					<view class="serviceTimes">
						<view class="tit">服务次数</view>
						<view class="timesS" id="timeZ">
							<span class="groupnum" v-for="(no,idx) in normal" :key="idx" :class="{'Ractive': idx==index}"   @tap="choose(no,idx)">{{no.name}}<span>({{no.times}}次)</span></span>
						</view>
					</view>
				</view>
				<view class="sureBuy" @tap="gobuy()">确定</view>
			</view>
		</view>
		</block>
		<view class="pop" v-if="user">
			<view class="popN">
				<view class="close" @tap="close(2)"><img src="../../static/close1.png" alt=""></view>
				<view class="content" style="border: none;">
					<view style="text-align: center;"><img style="width: 150upx;height: 150upx;" src="../../static/logohead.png" alt=""></view>
				</view>
				<button style="border: none;width: 50%;height:80upx;line-height:80upx;background-color: #dd3E34;color: #fff;border-radius: 50upx;" open-type="getUserInfo" @getuserinfo="wxGetUserInfo" withCredentials="true">点击授权</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				specificatbuy:false,
				biId:'',
				authKey:'',
				content:'',
				skus:'',
				assemble_skus:'',
				price_minA:'',
				price_minN:'',
				prices:'',
				priceA:'',
				buyTimes:'',
				specif:'',
				specG:'',
				normal:'',
				group:'',
				index:-1,
				agindex:-1,
				azindex:-1,
				bsku_id:'',
				cassemble_id:'',
				invite_code:'',
				bassemble_skus:'',
				assembles:'',
				coupon_id:'',
				user: true,
				userInfo: ''
			};
		},
		onLoad(e) {
			this.userInfo = uni.getStorageSync('userInfo');
			this.authKey = uni.getStorageSync('authKey')
			if (this.authKey){
				this.checkSession()
			}
			this.biId = e.id
			this.invite_code = e.invite_code
			// 处理判断sence
			if(e.scene){
				const reg = /%26/g
				// console.log(reg.test(e.scene))
				if(reg.test(e.scene)){
					// 有两个参数
					const arr = e.scene.split('%26')
					this.biId = arr[0]
					this.invite_code = arr[1]
				}else{
					// 有一个参数
					this.biId = e.scene
				}
				
				
			}
			console.log(e)
		},
		methods:{
			// 检查会话是否失效
		checkSession: function() {
				var that = this;
				uni.request({
					url: this.http + 'user/checkSession',
					method: 'POST',
					header: {
						authKey: this.authKey
					},
					data: {},
					success: res => {
						if (res.data.code == 101) {
							that.user = true
							that.authKey = ''
							uni.setStorageSync('authKey','')
						} else {
							that.user = false
							that.getListDetail()
						}
					},
				});
		},
		wxGetUserInfo:function(res){
			let that = this
			if (!res.detail.iv) {
				uni.showToast({ 
					title: "您取消了授权,登录失败", 
					icon: "none" ,
				}); 
				return false; 
			}
			let simpleUser = res.detail.userInfo
			let encryptedData = res.detail.encryptedData
			let iv = res.detail.iv
			uni.login({
				provider: 'weixin',
			    success(res){
				  console.log(res.code,'login')
				  var data = res.code
			    if (res.code) {
				  uni.request({
				  	url: that.http + 'user/token',
				  	method: 'GET',
				  	data: {
				  		login_code: res.code,
						encrypted_data:encryptedData,
						iv: iv
				  	},
				  	success: res => {
						if (res.data.code == 200) {
							let auth = res.data.data.authkey
							that.authKey = auth
							that.userInfo = simpleUser
							uni.setStorageSync('authKey',auth)
							uni.setStorageSync('userInfo',simpleUser)
							that.user = false
							
							that.getListDetail()
						} else {
							uni.showToast({
								title: res.data.error,
								icon: 'none'
							})
						}
				  		// that.haveOrder()
				  	},
				  });
			    } else {
			      console.log('登录失败！' + res.errMsg)
			    }
			  }
			})
		},
		close(e){
			this.user = false;
			uni.showToast({
				title: '未微信授权',
				icon:'none',
				mask: false,
				duration: 1500
			})
		},
			// 获取服务详情
			getListDetail(){
				var that = this;
				uni.request({
					url: this.http+'assemble/detail/' + this.biId,
					method: 'GET',
					header: {
						authKey: this.authKey
					},
					data: {},
					success: res => {
						console.log(res.data)
						if (res.data.code == 200) {
							let content = res.data.data
							content.product.cover = that.static + content.product.cover
							that.content = content
							that.prices = res.data.data.skus.price_min
							that.normal = res.data.data.skus.items
					    }
					}
				});
			},
			// 选择规格
			 choose(item,idx){
				if(item.available == 0){
				    uni.showToast({
				       title:'不可使用',
				       icon:'none',
				       duration:1500
				    })
				}else{
					this.index = idx
					this.buyTimes = item.name + '(' + item.times + '次)'
					this.prices = item.prices.final_price
					this.bsku_id = item.id
				}
			},
			// 去购买
			gobuy(){
				if(this.bsku_id == ''){
					uni.showToast({
						title:'请选择商品规格',
						icon:'none',
						duration:1500
					})
					return
				}
				this.spellGroup = false;
				var that = this;
				uni.request({
					url: this.http+'order/preview',
					method: 'POST',
					header: {
						authKey: this.authKey
					},
					data: {
						product_id:this.content.product_id,
						sku_id:this.bsku_id,
						assemble_id:this.biId,
						coupon_id:this.coupon_id,
						invite_code:this.invite_code
					},
					success: res => {
						if (res.data.code == 200) {
							let data = res.data.data
							data.item.product.cover = that.static + data.item.product.cover
							uni.navigateTo({
								url: '/pages/order/confirmOrder?data=' + encodeURIComponent(JSON.stringify(data)),
							});
						} else {
							uni.showToast({
								title: res.data.error,
								icon: 'none',
								duration: 1000
							})
						}
					},
				});
			},
			
			shared(){
				if (!this.userInfo){
					this.user = true
					return
				}
				this.specificatbuy = true
			},
			goclose(){
				this.specificatbuy = false
			}
		}
	}
</script>

<style>
	.Ractive{
		background-color: #dd3e34!important;
		color: #fff!important;
	}
	page{
		background-color: #f3f3f3;
	}
	.price span{
		font-size: 40upx;
		font-weight: bold;
	}
	.fightGroup{
		background-color: #fff;
	}
.reser{
    	margin-top: 1upx;
		display: flex;
		padding: 20upx 30upx;
		background-color: #fff;
    }
	.reser .img{
		width: 178upx;
	    height: 178upx;
		margin-right: 20upx;
		background-color: #fff;
	}
	.reser .cont{
	    width: 400upx;
	}
	.cont .tit{
		font-size: 30upx;
		color: #333333;
	}
	.cont .txt{
		font-size: 24upx;
		color: #999999;
	}
	.cont .txt img{
		width: 22upx;
	    height: 22upx;
		margin-right: 10upx;
		vertical-align: middle;
	}
	.img{
		width: 100%;
		text-align: center;
		padding-bottom: 100upx;
		
	}
	.groupMore{
		position: fixed;
		z-index: 998;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, .6);
	}
	.groupImg{
		display: inline-block;
		width: 100upx;
	    height: 100upx;
		border-radius: 100%;
		position: relative;
		margin-left: 20upx;
		margin-top: 20upx;
	}
	.groupImg img{
		border-radius: 100%;
	}
	.pin{
		border: solid 4upx #dd3e34;
	}
	.spell{
		position: absolute;
		left: -10upx;
		top:-10upx;
		background-color: #dd3e34;
		color: #fefefe;
		font-size: 22upx;
		border-radius: 17upx;
		padding: 0 10upx;
	}
	.tip{
		text-align: center;
		margin: 20upx 0;

	}
	/* 购买 */
	.purchase .purchaseN{
		width: 100%;
		position: absolute;
		right: 0;
		bottom: 0;
		background: #FFFFFF;
		height: 800upx;
		border: 1upx solid #eaeaea;
	}
	.purchase .purchaseN .head{
		margin: 0 30upx;
		display: flex;
		padding-bottom: 30upx;
		border-bottom: 2upx solid #dddddd;
	}
	.purchase .purchaseN .head .headImg{
		width: 200upx;
		height: 200upx;
		margin-top: -70upx;
	}
	.purchase .purchaseN .head .headImg img{
		width: 100%;
		height: 100%;
	}
	.purchase .purchaseN .head .headTit{
		margin-left: 20upx;
	}
	.purchase .purchaseN .head .headTit .price{
		font-size: 38upx;
	}
	.purchase .purchaseN .head .closeB{
		position: absolute;
		right: 30upx;
		top:30upx;
		width: 60upx;
		height: 60upx;
	}
	.purchase .purchaseN .head .closeB img{
		width: 100%;
		height: 100%;
	}
	.specification{
		margin: 20upx 30upx ;
		margin-bottom: 140upx;
		max-height: 500upx;
		overflow: auto;
	}
	.specification .serviceTimes{
		margin-top: 20upx;
	}
	.specification .serviceTimes .tit{
		font-size: 28upx;
		color: #333333;
	}
	.specification .serviceTimes .timesS{
		margin-bottom: 20upx ;
	}
	.specification .serviceTimes .timesS .groupnum{
		padding: 10upx 20upx;
		border-radius: 2upx;
		background-color: #f2f2f2;
		color: #333333;
		font-size: 28upx;
		margin-top: 20upx;
		margin-right: 20upx;
		display: inline-block;
	}
	.choosed{
		color: #ffffff;
		background-color: #dd3e34;
	}
	.sureBuy{
		background-color: #dd3e34;
		color: #f5f5f5;
	    font-size: 36upx;
		text-align: center;
		padding: 16upx 0;
		position: absolute;
		bottom: 0;
		width: 100%;
	}
</style>
