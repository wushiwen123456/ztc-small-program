<template>
	<view class="coupons">
		<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
			<view v-for="(tab,index) in tabBars" :key="tab.id" :id="tab.id"
			 :data-current="index" @tap="tapTab" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']">{{tab.name}}</view>
		</scroll-view>
		<view class="unused" v-if="not">
			<view class="unusedList" v-for="(li,index) in lists" :key="index">
				<view class="top">
					<view class="left red">
						<view class="packets">￥<span>{{li.amount}}</span></view>
						<view class="common">通用红包</view>
					</view>
					<view class="desp">
						<view class="name">现金券(全店所有服务均可使用)</view>
						<view class="time">有效期: {{li.create_time}}-{{li.expire_time}}</view>
					</view>
				</view>
				<view class="bottom">
					<view class="give" >赠送好友</view>
					<button class="give" open-type="share" @share="onShareAppMessage" @tap="gived(li.id)" style="top:-12upx;display:inline-block;width: 50%;font-size: 30upx;background-color: #fff;position: absolute;opacity: 0;">赠送好友</button>
					<view class="used red" @tap="goSever">去使用</view>
				</view>
			</view>
			<view class="share" @tap="goSever">向好友分享服务即可获得现金券 <img src="../../../static/Go.png" alt=""></view>
		</view>
		<view class="used" v-if="ready">
			<view class="usedList" v-for="(li,index) in lists" :key="index">
				<view class="left red">
					<view class="packets">￥<span>{{li.amount}}</span></view>
					<view class="common">通用红包</view>
				</view>
				<view class="desp">
					<view class="name">现金券(全店所有服务均可使用)</view>
					<view class="time">有效期: {{li.create_time}}-{{li.expire_time}}</view>
				</view>
				<view class="right" v-if="symbolId== 1"><img src="data:image/png;base64,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" alt=""></view>
				<view class="right" v-if="symbolId== 2"><img src="data:image/png;base64,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" alt=""></view>
			</view>
		</view>
		<view style="margin-top: 40upx;text-align: center;color: #777777;font-size:28rpx;" v-if="lists == ''">没有更多数据了</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabBars: [
					{name:'未使用',id:0},
					{name:'已使用',id:1},
					{name:'已失效',id:2},
				],
				scrollLeft: 0,
				tabIndex: 0,
				symbolId: 0,//分类ids
				lists:[],
				loadingType: 0,
				next : -1,
				start: 0,
				size: 15,
				record: false,
				bottom: false,
				not:true,
				ready:false,
				authKey:"",
                token:"",
				code:''
			};
		},
		onLoad: function() {
			this.authKey = uni.getStorageSync('authKey');
		},
		onShow() {
			this.start = 0
			this.requestcouponsList();
		},
		onShareAppMessage(res) {
			console.log(res)
		    if (res.from === 'button') {
		       // 来自页面内转发按钮
		       console.log(res.target)
		    }
		    return {
		       title: '您的好友送您一张优惠券，快来领取',
		       // path: "https://zct.51kdd.com/pages/knowledge/knowledge?token=" + this.token,
		       path: "/pages/knowledge/knowledge?token=" + this.token,
		       imageUrl: 'http://test.51kdd.com/share.png',
			}
		},
		methods:{
			getElSize(id) { //得到元素的size
				console.log(id)
				return new Promise((res, rej) => {
					uni.createSelectorQuery().select("#" + id).fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						res(data)
					}).exec()
				})
			},
			async tapTab(e) { //点击tab-bar
				this.symbolId = e.currentTarget.id
				if(this.symbolId == 0){
					this.not = true
					this.ready = false
				}else{
					this.ready = true
					this.not = false
				}
				if (this.tabIndex === e.target.dataset.current) {
					return false;
				} else {
					let tabBar = await this.getElSize("tab-bar"),
					tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
					this.scrollLeft = tabBarScrollLeft;
					this.isClickChange = true;
					this.tabIndex = e.target.dataset.current;
				}
				this.start = 0
				this.requestcouponsList()
			},
			// 赠送
			gived(e){
				console.log('真实故事')
				uni.request({
					url: this.http+'home/giveCoupon/' + e,
					method: 'GET',
					header: {
						authKey: this.authKey
					},
					data: {
					},
					success: res => {
						console.log(res.data)
						if (res.data.code == 200) {
							this.token = res.data.data.token
							
						}
					},
				});
			},
			goSever(){
				uni.reLaunch({
					url: '../../service/service'
				});
			},
			 // 请求订单的列表
				requestcouponsList: function(isLoading = true) {
					var that = this;
					let querys = "?start=" + this.start + "&size=" + this.size 
					uni.request({
						url: this.http+'home/coupons' + querys,
						method: 'GET',
						header: {
							authKey: this.authKey
						},
						data: {
							type:that.symbolId
						},
						success: res => {
							let data = res.data.data
							if (res.data.code == 200) {
								let order = data.list
								if (order.length == 0) {
									that.loadingType = 2
									order = []
								}
								else if (order.length < that.size)
									that.loadingType = 2
								else 
									that.loadingType = 0
								
								if (that.start == 0) 
									that.lists = []
			                    that.start = data.next	
								that.lists = that.lists.concat(order)
								if (that.lists.length == 0) 
									that.record = true
								else 
									that.record = false
								
							}
							
						},
					});
				},
				lower(){
					if (this.loadingType == 2) {
						return
					}
					this.requestcouponsList(false)
				}
		}
	}
</script>

<style>
page{
	background-color: #f3f3f3;
}
    #tab-bar {
		border-bottom: none;
		background: #FFFFFF;
		margin-top: 2upx;
	}
	.uni-scroll-view {
		overflow: Scroll;
		overflow-x: hidden
	}
	#tab-bar .active{
		color: #dd4036 !important;
		border-bottom: 4upx solid #dd4036!important;
	}
	.swiper-tab-list {
		width: 100upx;
		font-size: 28upx;
		text-align: center;
		margin: 0 70upx;
		padding: 18upx 0;
		color: #666666;
	}
	.used{
		padding: 0 30upx;
	}
	.used .usedList{
		margin-top: 20upx;
		background-color: #fff;
		position: relative;
		display: flex;
		padding: 40upx 30upx;
	}
	.used .usedList .left{
		width: 30%;
		text-align: center;
		font-size: 30upx;
	}
	.used .usedList .left .common{
		margin-top: -15upx;
	}
	.used .usedList .left .packets{
		margin-top: -20upx;
	}
	.used .usedList .left .packets span{
		font-size: 60upx;
		font-weight: bold;
	}
	.used .usedList .desp{
		width: 70%;
		z-index: 99;
		padding-left: 20upx;
		padding-top: 20upx;
	}
	.used .usedList .desp .name{
		font-size: 28upx;
		color: #333333;
		line-height: 36upx;
	}
	.used .usedList .desp .time{
		color: #999999;
		font-size: 20upx;
		line-height: 24upx;
		margin-top: 10upx;
	}
	.used .usedList .right{
		right: 35upx;
		top: 45upx;
	}
	.used .usedList .right img{
		width: 116upx;
	    height: 116upx;
	}
	.unused{
		padding: 0 30upx;
	}
	.unused .unusedList{
		background:url(../../../static/coupbg.png) no-repeat;
		background-size: 100% 100%;
		width: 100%;
		height: 286upx;
		margin-top: 20upx;
	}
	.unused .unusedList .top{
		display: flex;
		padding: 40upx 30upx;
	}
	.unused .unusedList .top .left{
		width: 30%;
		text-align: center;
		font-size: 30upx;
	}
	.unused .unusedList .top .right{
		width: 70%;
		z-index: 99;
	}
	.unused .unusedList .top .left .common{
		margin-top: -15upx;
	}
	.unused .unusedList .top .left .packets{
		margin-top: -20upx;
	}
	.unused .unusedList .top .left .packets span{
		font-size: 60upx;
		font-weight: bold;
	}
	.unused .unusedList .top .desp{
		width: 70%;
		z-index: 99;
		padding-left: 20upx;
        padding-top: 20upx;		
	}
	.unused .unusedList .top .desp .name{
		font-size: 28upx;
		color: #333333;
		line-height: 40upx;
	}
	.unused .unusedList .top .desp .time{
		color: #999999;
		font-size: 22upx;
		line-height: 24upx;
		margin-top: 10upx;
	}
	.bottom{
		width: 100%;
	    display: flex;
		margin-top: 10upx;
		position: relative;
	}
	.bottom view{
		width: 50%;
		text-align: center;
		font-size: 30upx;
	}
	.share{
		width: 70%;
		margin-left: 15%;
		border-radius: 32upx;
	    border: solid 1upx #dd3e34;
		padding: 4upx 0;
		color: #dd3e34;
		text-align: center;
		margin-top: 100upx;
	}
	.share img{
		width: 38upx;
		height: 38upx;
		vertical-align: middle;
		margin-left: 10upx;
		position: relative;
		top:-4upx;
	}
</style>
