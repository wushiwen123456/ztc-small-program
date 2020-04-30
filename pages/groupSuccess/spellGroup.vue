<template>
	<view class="groupS">
		<view class="top">
			<view class="tip">
				<view class="countdown">{{detail.remaining}}</view>
			</view>
			<view class="img">
				<view class="groupImg pin">
					<span class="spell">拼主</span>
					<img :src="detail.master.avatarurl" alt="">
				</view>
				<view class="groupImg" v-if="detail.followers != ' '" v-for="(dd,index) in detail.followers" :key="index">
					<img :src="dd.user.avatarurl" alt="">
				</view>
				<view class="groupImg">
					<img src="../../static/nophoto.png" alt="">
				</view>
			</view>
			<view class="short">还差<span class="red">{{detail.can_join}}</span>人，赶快邀请好友来拼团吧</view>
			<button class="buttonR" open-type="share" @share="onShareAppMessage" >邀请好友拼团</button>
			<view style="display: flex;justify-content: flex-end;padding: 10upx 25upx 25upx 25upx;">
				<view style="margin-right:32upx;"><share-weixin /></view>
				<share-moments :path="path2" :csene="csene" :title="detail.product.name" :backImage="imgUrl"/>
			</view>
		</view>
		<view class="list">
			<view class="listn"><view class="left">服务名称</view><view class="right ell">{{detail.product.name}}</view></view>
			<view class="listn"><view class="left">拼团时间</view><view class="right">{{detail.create_time}}</view></view>
			<view class="listn"><view class="left">拼团须知</view><view class="right gray">· 好友拼团 · 人满成功 · 人不满退款</view></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				biId:'',
				authKey:'',
				detail:'',
				invite_code:'',
				assemble_id:'',
				imgUrl:''
			};
		},
		onLoad(e) {
			this.authKey = uni.getStorageSync('authKey');
			this.biId = e.id;
			this.getOrder();
		},
		onShareAppMessage(res) {
			console.log(res)
		    if (res.from === 'button') {
		       // 来自页面内转发按钮
		       console.log(res.target)
		    }
			console.log(this.assemble_id,this.invite_code)
		    return {
		       title: this.detail.product.name,
		       path:this.path,
		       imageUrl:this.imgUrl , 
			   success: function(res) {
               // 转发成功
			   console.log(res)
               },
               fail: function(res) {
                 // 转发失败
				  console.log(res)
               }
			}
		},
		computed:{
			path(){
				return  "/pages/fightGroup/fightGroup?id=" + this.assemble_id + "&invite_code=" + this.invite_code || ''
			},
			path2(){
				return  "pages/fightGroup/fightGroup"
			},
			csene(){
				return this.assemble_id + '&' + this.invite_code
			}
		},
		methods:{
			// 获取订单信息
			getOrder(){
				var that = this
				uni.request({
					url: that.http+'order/detail/' + this.biId,
					method: 'GET',
					header: {
						authKey: that.authKey
					},
					data: {
					},
					success: res => {
						if (res.data.code == 200) {
							console.log(res.data)
							this.assemble_id = res.data.data.assemble_id
					        uni.request({
					       	url: that.http+'assemble/detail/' + res.data.data.assemble_id,
					       	method: 'GET',
					       	header: {
					       		authKey: that.authKey
					       	},
					       	data: {
					       	},
					       	success: res => {
					       		if (res.data.code == 200) {
					       			console.log(res.data)
					       			this.detail = res.data.data
									this.imgUrl = this.static + this.detail.product.cover
									console.log(this.imgUrl)
					       		}
					       	},
					       });
						}
					},
				})
				// 邀请码
				uni.request({
					url: that.http+'home/profile',
					method: 'GET',
					header: {
						authKey: that.authKey
					},
					data: {
					},
					success: res => {
						if (res.data.code == 200) {
							this.invite_code = res.data.data.invite_code
							console.log(res.data.data.invite_code)
						}
					},
				});
			},
			
		}
	}
</script>

<style>
	page{
		background-color: #f3f3f3;
	}
	.top{
		background-color: #fff;
	}
    .tip{
    	text-align: center;
		padding-top: 20upx;
    }
    .countdown{
		background: url(../../static/countdown.png) no-repeat;
		background-size: 100% 100%;
		width: 214upx;
	    height: 60upx;
		line-height: 70upx;
		position: relative;
		left: 50%;
		margin-left: -107upx;
	}
	.img{
		width: 100%;
		text-align: center;
		padding: 20upx 0;
	}
	.groupImg{
		display: inline-block;
		width: 100upx;
	    height: 100upx;
		position: relative;
		margin-left: 20upx;
		margin-top: 20upx;
		border-radius: 100%;
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
	.short{
		letter-spacing: 2upx;
	    color: #333333;
		font-size: 36upx;
		text-align: center;
	}
    .share{
		font-size: 24upx;
	    letter-spacing: 1upx;
	    color: #333333;
		text-align: center;
		padding-bottom: 20upx;
	}
	.ell{
		width: 50%;
		text-align: right;
	}
</style>