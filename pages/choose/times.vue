<template>
	<view class="times">
		<view class="uni-tab-bar">
			<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
				<view v-for="(tab,index) in tabBars" :key="tab.date" :id="tab.date"
				 :data-current="index" @tap="tapTab" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']"><p>{{tab.name}}</p>{{tab.date}}</view>
			</scroll-view>
		</view>
		
		<view class="section">
			<view class="chooseB">
				<span class="disab"  v-for="(ti,index) in times" :key="index" v-if="ti.available == 0" @tap="chooseGetTimes(ti,index)">{{ti.value}}</span>
				<span class="optional"  v-for="(ti,index) in times" :key="index" :class="isaa == index ? 'choosedB':''" v-if="ti.available == 1" @tap="chooseGetTimes(ti,index)">{{ti.value}}</span>
			</view>
			<view class="tip">注：技师工作时间为早8点至晚8点</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabBars: [],
				scrollLeft: 0,
				tabIndex: 0,
				symbolId: '',//分类id
				date: '',
				jid:'',
				biId:'',
				times:'',
				isaa:-1,
				sid:''
			};
		},
		onLoad(e) {
			this.jid = e.jid
			this.biId = e.id
			this.sid = e.sid
			this.authKey = uni.getStorageSync('authKey');
			// uni.setStorageSync('date', '');
			// uni.setStorageSync('begin', '');
			// uni.setStorageSync('end', '');
			// uni.setStorageSync('value', '');
			this.getdate()
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
				this.date = e.currentTarget.id
				if (this.tabIndex === e.target.dataset.current) {
					return false;
				} else {
					let tabBar = await this.getElSize("tab-bar"),
					tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
					this.scrollLeft = tabBarScrollLeft;
					this.isClickChange = true;
					this.tabIndex = e.target.dataset.current;
				}
				this.symbolId = this.symbolId.replace("-","")
				this.getTimes()
			},
			// 获取日期
			getdate(){
				uni.request({
					url: this.http+'appointment/getDateRange',
					method: 'GET',
					header: {
						authKey: this.authKey
					},
					data: {
					},
					success: res => {
						if (res.data.code == 200) {
							this.tabBars = res.data.data
							this.date = res.data.data[0].date
							this.symbolId = res.data.data[0].date.replace("-","")
							console.log(res.data.data[0].date)
							this.getTimes()
						}
					},
				});
			},
			// 获取时间
			getTimes(){
				uni.request({
					url: this.http+'appointment/getTimeOption',
					method: 'GET',
					header: {
						authKey: this.authKey
					},
					data: {
						massagist_id:this.jid,
						date:this.symbolId
					},
					success: res => {
						if (res.data.code == 200) {
							this.times = res.data.data
						}
					},
				});
			},
			chooseGetTimes(e,index){
				this.isaa = index;
				if(e.available == 0){
					uni.showToast({
						title:'该时间段不可选择',
						icon:'none',
						duration:1500
					})
				}else{
					uni.setStorageSync('date',this.symbolId)
					uni.setStorageSync('begin',e.begin)
					uni.setStorageSync('end',e.end)
					uni.setStorageSync('value', this.date + ' ' + e.value)
					// var pages = getCurrentPages();
					// var prevPage = pages[pages.length - 2]; //上一个页面
					// prevPage.setData({
					// 		id:this.biId,
					// 		jid:this.jid,
					// })
					uni.navigateBack()
// 					if(this.sid == 1){
// 						uni.redirectTo({
// 							url: '/pages/reservationService/coldCalling?id=' + this.biId +'&jid=' +this.jid
// 						});
// 					}else{
// 						uni.redirectTo({
// 							url: '/pages/reservationService/store?id=' + this.biId +'&jid=' +this.jid
// 						});
// 					}
				}
			}
		}
	}
</script>

<style>
	page{
		background-color: #f3f3f3;
	}
	.times{
		margin-top: 1upx;
	}
   #tab-bar {
			border-bottom: none;
			background: #FFFFFF;
			height: 120upx;
			line-height: 120upx;
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
			margin:0 30upx;
			text-align: center;
			font-size: 30upx;
			color: #666666;
		}
		.section{
			margin-top: 2upx;
			background-color: #fff;
			padding: 30upx 30upx;
		}
		.section .chooseB span{
			display: inline-block;
			width: 31%;
			padding: 10upx 0;
			font-size: 28upx;
			border-radius: 10upx;
			margin-bottom: 20upx;
			text-align: center;
		}
		.section .chooseB span:nth-child(3n-1){
			margin: 0 2.5%;
			margin-bottom: 20upx;
		}
		.disab{
			border: 2upx solid #f2f2f2;
			background-color: #f2f2f2;
			color: #999999;
		}
		.optional{
			background-color: #fff;
			border: 2upx solid #dd3e34;
			color: #dd3e34;
		}
		.choosedB{
			background-color:  #dd3e34;
			color: #fff;
		}
		.tip{
			font-size: 24upx;
	        letter-spacing: 1upx;
	        color: #999999;
			text-align: center;
			margin-top: 140upx;
		}
		 .sure{
			  padding: 80upx 0;
		}
		.sure .invite{
			  width: 34%;
			  margin-left: 33%;
			  text-align: center;
			  font-size: 30upx;
		}
</style>
