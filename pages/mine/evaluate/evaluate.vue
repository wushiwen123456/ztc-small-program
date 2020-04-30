<template>
	<view class="evaluate">
		<view class="reser">
			<view class="img"><img :src="appoint.product.cover" alt=""></view>
			<view class="cont">
				<view class="tit">{{appoint.product.name}}</view>
				<view class="txt ell">{{appoint.product.introduction}}</view>
				<view class="txt" style="margin-top: 10upx;"><img src="../../../static/time.png" alt="">{{appoint.product.cost}}分钟</view>
			    <view class="tech">技师：{{appoint.massagist_name}}</view>
			</view>
		</view>
		<view class="star">	
		    <view><img :src="eyeImg1 ? '../../../static/ev1-1.png' : '../../../static/ev1.png'" mode="aspectFill"  alt="" @tap="levela(2)">好评</view>
		    <view><img :src="eyeImg2 ? '../../../static/ev2.png' : '../../../static/ev2-2.png'" mode="aspectFill" alt="" @tap="levela(1)">中评</view>
		    <view><img :src="eyeImg3 ? '../../../static/ev2.png' : '../../../static/ev2-2.png'" mode="aspectFill" alt="" @tap="levela(0)">差评</view>
		</view>
		<view class="tag">
			<view class="title red">夸夸技师吧</view>
			<view class="tags">
				<img src="../../../static/tag.png" alt="">
				<span v-for="(li,index) in tagsList" :key="index" @tap="remark(li,index)">{{li.remark}}</span>
			</view>
			<view class="showTags">{{showTag}}</view>
			<view class="text"><textarea :value="comment" @input="commentInput" placeholder="其他您想说的，好的或美中不足的地方…" /></view>
		    <view class="anonymity">
				<view class="left"><image class="doors" :src="eyeImg4 ? '../../../static/circle-select.png' : '../../../static/circle.png' " mode="aspectFill" @click="bindEye"></image>匿名</view>
				<view class="right">您写的评价会以匿名的形式展现</view>
			</view>
		</view>
		<view class="buttonR" style="margin-top: 30upx;" @tap="submit">提交</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				eyeImg1:true,
				eyeImg2:true,
				eyeImg3:true,
				eyeImg4:false,
				biId:'',
				level:2,
				comment:'',
				tags:'',
				appoint:'',
				authKey:'',
				tagsList:'',
				activeIndex:'',
				anonymous:0,
				selectedA:false,
				showTag:''
			};
		},
		onLoad(e) {
			this.authKey = uni.getStorageSync('authKey');
			this.biId = e.id
			this.detail();
		},
		methods:{
			levela(e){
				this.level = e
				if(e == 2){
					this.eyeImg1 = true
		            this.eyeImg2 = true
		            this.eyeImg3 = true
				}else if(e == 1){
					this.eyeImg1 = false
					this.eyeImg2 = false
					this.eyeImg3 = true
				}else{
					this.eyeImg1 = false
					this.eyeImg2 = true
					this.eyeImg3 = false
				}
			},
			commentInput: function(e) {
				if (this.comment.indexOf(e.target.value) < 0)
					this.comment = e.target.value;
			},
			bindEye() {
				this.eyeImg4 = !this.eyeImg4;
				if(this.eyeImg4 == true){
					this.anonymous = 1
				}else{
					this.anonymous = 0
				}
				console.log(this.anonymous)
			},
			remark(e,index){
				this.eyeImg5 = true
				if (this.showTag.indexOf(e.remark) < 0){
					this.showTag += e.remark + ','
					this.tags.push(e.id)
				}
			},
			// 预约信息详情
			detail(){
				let that = this
				uni.request({
					url: this.http+'appointment/detail/' + this.biId,
					method: 'GET',
					header: {
						authKey: this.authKey
					},
					data: {
					},
					success: res => {
						console.log(res)
						if (res.data.code == 200) {
							let appoint = res.data.data
							appoint.product.cover = that.static + appoint.product.cover
							that.appoint = appoint
						}
					},
				});
				// 获取标签
				uni.request({
					url: this.http+'appointment/virtues',
					method: 'GET',
					header: {
						authKey: this.authKey
					},
					data: {
					},
					success: res => {
						console.log(res)
						if (res.data.code == 200) {
							this.tagsList = res.data.data
						}
					},
				});
			},
			// 提交评价
			submit(){
				uni.request({
					url: this.http+'appointment/evaluate',
					method: 'POST',
					header: {
						authKey: this.authKey
					},
					data: {
						appointment_id:this.biId,
						level:this.level,
						comment:this.comment,
						tags:this.tags,
						anonymous:this.anonymous
					},
					success: res => {
						console.log(res.data)
						if (res.data.code == 200) {
				             uni.showToast({
				             	title:'评价成功',
				             	icon:'none',
				             	duration:1500
				             })
							 uni.reLaunch({
							 	url: '../../order/order?tabIndex=' + 4
							 });
						}
					},
				});
			}
		}
	}
</script>

<style>
	page{
		background-color: #f3f3f3;
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
	.cont .tech{
		color: #333333;
		font-size: 24upx;
		margin-top: 14upx;
	}
	.star{
		margin-top: 20upx;
		padding: 30upx 19%;
		background-color: #fff;
		display: flex;
		text-align: center;
		color: #999999;
		font-size: 28upx;
	}
	.star view{
		width: 33%;
		text-align: center;
	}
	.star view img{
		width: 40upx;
		height: 40upx;
		vertical-align: middle;
		margin-right: 20upx;
	}
	.tag{
		margin-top: 2upx;
		padding: 40upx 30upx;
		background-color: #fff;
	}
	.tag .title{
		text-align: center;
		font-size: 28upx;
	}
	.tags{
		padding: 40upx 0;
	}
	.tags img{
		width: 42upx;
	    height: 42upx;
		vertical-align: middle;
	}
	.tags span{
		display: inline-block;
		border-radius: 20upx;
	    border: solid 1upx #999999;
		font-size: 24upx;
	    color: #999999;
		margin-left: 20upx;
		padding: 0 14upx;
		margin-top: 10upx;
	}
	.active{
		background-color: #dd3e34;
		color: #ffffff;
	}
	.text{
		background-color: #f2f2f2;
	    border-radius: 6upx;
		padding: 20upx;
	}
	.text textarea{
		background-color: #f2f2f2;
		width: 100%;
		height: 170upx;
		font-size: 28upx;
	}
	.anonymity{
		margin-top: 20upx;
		position: relative;
		margin-bottom: 20upx;
	}
	.anonymity .left{
		position: relative;
		top: 20upx;
	}
	.anonymity .left image{
		width: 34upx;
	    height: 34upx;
		vertical-align: middle;
		margin-right: 10upx;
	}
	.anonymity .right{
		font-size: 28upx;
		color: #999999;
		top:20upx;
	}
	.selected{
		background-color: #dd3e34 !important;
		color: #fff !important;
		border-color:#dd3e34!important;
	}
	.showTags{
		padding: 10upx 20upx;
		color: #999;
		font-size: 24upx;
		margin-bottom: 20upx;
	}
</style>
