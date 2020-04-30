<template>
	<view>
		<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
			<view v-for="(tab,index) in tabBars" :key="tab.id" :id="tab.id"
			 :data-current="index" @tap="tapTab" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']">{{tab.name}}</view>
		</scroll-view>
		<view class="orderList">
			<scroll-view scroll-y="true" @scrolltolower="lower" style="height: 100%;">
			<view class="listo" v-for="(li,index) in lists" :key="index">	
			    <view class="title" @tap="detailS(li.id,li.assemble_id)"> 
				   <view class="left"><img src="../../static/logohead.png" alt="">直纯堂孕产康养</view>
				   <view class="right red" v-if="li.type == '待分享'">{{li.type}}，还差{{li.assemble.can_join}}人</view>
				   <view class="right red" v-if="li.type == '待预约'">购买成功</view>
				   <view class="right red" v-if="li.type == '已预约'">等待服务</view>
				   <view class="right red" v-if="li.type == '可再次预约'">再次预约</view>
				   <view class="right red" v-if="li.type == '待评价'">服务成功</view>
				   <view class="right red" v-if="li.type == '已完成'">已完成</view>
				</view>
				<view class="content" @tap="detailS(li.id,li.assemble_id)">
					<view class="img"><img :src="li.product.cover" alt=""></view>
					<view class="cont">
						<view class="tit">{{li.product.name}}</view>
						<view class="txt ell">{{li.product.introduction}}</view>
						<view class="txt">规格: {{li.sku.times}}次 <span>({{li.sku.name}})</span>；<span v-if="li.assemble_id != 0">{{li.assemble.category.name}}</span></view>
					</view>
					<view class="price">¥{{li.sku.price}}</view>
				</view>
				<view class="title photo" @tap="detailS(li.id,li.assemble_id)">
					<view class="left" v-if="li.assemble != null"><img :src="li.assemble.master.avatarurl" alt=""><img v-for="(aa,idx) in li.assemble.followers" :key="idx" :src="aa.user.avatarurl" alt=""></view>
				    <view class="right">实付款:<span class="price">¥ {{li.amount}}</span></view>
				</view>
				<view class="title" @tap="detailS(li.id,li.assemble_id)"> 
				   <view class="left">剩余服务次数</view>
				   <view class="right">{{li.service_times}}</view>
				</view>
				<view class="bottom">
					<span class="borderG" v-if="li.type == '待预约'" @tap="phonenumber">电话预约</span>
					<span class="borderG" v-if="li.type == '待评价' && li.service_times>0" @tap="appointment(li.id)">再次预约</span>
					<span class="borderG" v-if="li.type == '可再次预约'" @tap="phonenumber">电话预约</span>
					<span class="invite" v-if="li.type == '可再次预约'" @tap="appointment(li.id)">再次预约</span>
					<span class="invite" v-if="li.type == '待分享'" @tap="invite(li.id)">邀请好友拼团</span>
					<span class="invite" v-if="li.type == '待预约'" @tap="appointment(li.id)">在线预约</span>
					<span class="invite" v-if="li.type == '已预约'" @tap="contant(li.massagist_phone)">联系技师</span>
					<span class="invite" v-if="li.type == '待评价'" @tap="evelate(li.appointment_id)">评价</span>
				</view>
			</view>
			<uni-load-more :loadingType="loadingType" ></uni-load-more>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni-load-more.vue"
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				tabBars: [
					{name:'全部',id:0},
					{name:'待分享',id:1},
					{name:'待预约',id:2},
					{name:'已预约',id:3},
					{name:'待评价',id:4},
				],
				scrollLeft: 0,
				tabIndex: 0,
				symbolId: 0,//分类id
				lists:[],
				loadingType: 0,
				next : -1,
				start: 0,
				size: 15,
				record: false,
				bottom: false,
				phone:''
			};
		},
		onLoad: function(e) {
			uni.setStorageSync('biId','')
			this.tabIndex = e.tabIndex
			this.symbolId = e.tabIndex
			this.authKey = uni.getStorageSync('authKey');
		},
		onShow() {
			this.start = 0
			this.requestorderList()
			this.phonea();
		},
		methods:{
			// 电话预约电话
			phonea(){
				uni.request({
					url: this.http+'appointment/getClubContact',
					method: 'GET',
					header: {
						authKey: this.authKey
					},
					data: {},
					success: res => {
						console.log(res.data)
						if (res.data.code == 200) {
							this.phone = res.data.data
						}
					},
				});
			},
			// 店里电话
			phonenumber(){
				wx.makePhoneCall({
			        phoneNumber: this.phone
			    });
			},
			// 技师电话
			contant(e){
				wx.makePhoneCall({
				    phoneNumber: e
				});
			},
			getElSize(id) { //得到元素的size
			// console.log(id)
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
				// console.log(this.symbolId)
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
				this.requestorderList()
			},
			// 预约
			appointment(e){
				uni.navigateTo({
					url: '/pages/reservationService/reservationService?id=' + e
				});
			},
		    // 请求订单的列表
			requestorderList: function(isLoading = true) {
				if (isLoading)	uni.showLoading({title: '加载中'})
				var that = this;
				let querys = "?start=" + this.start + "&size=" + this.size 
				uni.request({
					url: this.http+'order/list' + querys,
					method: 'GET',
					header: {
						authKey: this.authKey
					},
					data: {
						type:that.symbolId
					},
					success: res => {
						let data = res.data.data
						// console.log(res.data)
						if (res.data.code == 200) {
							// that.lists = res.data.data.list
							let order = data.list
							
							if (that.start == 0) 
								that.lists = []
						   
							order.forEach(function(item){
								item.product.cover = that.static + item.product.cover
							})
		                    that.start = data.next	
							that.lists = that.lists.concat(order)
							if (order.length == 0) {
								that.loadingType = 2
							}
							else if (order.length < that.size || that.start == -1)
								that.loadingType = 2
							else 
								that.loadingType = 0
							if (that.lists.length == 0) 
								that.record = true
							else
								that.record = false
						}
					},
					fail: () => {
						console.log("请求失败")
					},
					complete: () => {
						if(isLoading) uni.hideLoading()
					}
				});
			},
			invite(e){
				 uni.navigateTo({
					url: '/pages/orderDetail/orderDetail-not?id=' + e
				});
			},
			detailS(e,a){
				if(a == 0){
					uni.navigateTo({
						url: '/pages/orderDetail/orderDetail?id=' + e
					});
				}else{
					uni.navigateTo({
						url: '/pages/orderDetail/orderDetail-success?id=' + e
					});
				}
			},
			evelate(e){
				uni.navigateTo({
					url: '/pages/mine/evaluate/evaluate?id=' + e
				});
			},
			lower(){
				if (this.loadingType == 2) {
					return
				}
				this.requestorderList(false)
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
			height: 83upx;
			line-height: 80upx;
		}
		uni-view{
			font-size: 30upx;
		}
		body .uni-page-head {
			border-bottom: 1px solid #eaeaea;
		}
	
		.uni-scroll-view {
			overflow: Scroll;
			overflow-x: hidden
		}
	
		#tab-bar .active {
			color: #dd3e34;
			border-bottom: 4upx solid #dd3e34;
			padding: 0 2upx 10upx 2upx;
		}
		.swiper-tab-list{
			width: 90upx;
			margin:0 28upx;
			text-align: center;
			font-size: 30upx;
			color: #666666;
		}
		.orderList{
			margin-top: 1upx;
		}
		.orderList .listo{
			margin-bottom: 20upx;
		}
    .title{
	    position: relative;
	    background-color: #fff;
		margin-bottom: 1px;
		padding: 20upx 30upx;
	    color: #333333;
		height: 60upx;
	}
	.title .left{
		font-size: 30upx;
	}
	.title .left img{
		width: 55upx;
		height: 55upx;
		border-radius: 100%;
		margin-right: 20upx;
		vertical-align: middle;
		margin-top: -8upx;
	}
	.title .right{
		right: 30upx;
		top:20upx;
	}
	.photo .left img{
		margin-right: -8upx;
		border: 1px solid #fff;
	}
	.photo .right {
		font-size: 24upx;
		top:20upx;
	}
	.photo .right .price{
		margin-left: 20upx;
	}
	.content{
		display: flex;
		padding: 20upx 30upx;
	}
	.content .img{
		width: 178upx;
	    height: 178upx;
	    background-color: #535353;
	    border: solid 1px #dddddd;
	}
	.content .cont{
		margin-left: 20upx;
		width: 400upx;
	}
	.content .cont .tit{
		font-size: 30upx;
		color: #333333;
	}
	.content .cont .txt{
		font-size: 24upx;
		color: #999999;
	}
	.price{
		font-size: 32upx;
	}
	.bottom{
		background-color: #fff;
		text-align: right;
		padding: 30upx;
	}
	.bottom span{
		margin-left: 30upx;
	}
</style>
