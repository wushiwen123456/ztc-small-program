<template>
	<view class="cold">
		<view class="tite red">上门服务</view>
		<view class="technicians" v-if="can==1">
			<view>
				<view class="tech"  @tap="gotech()">
					<view class="left red">为您推荐的最优技师</view> 
					<view class="right red">更多 ></view>
				</view>
				<view class="cont">
					<view class="img"><span v-if="li.avatarurl == ''"></span><img v-else :src="li.avatarurl" alt=""></view>
					<view class="txt">
						<view class="tit"><span class="name">{{li.realname}}</span><span class="tip">{{li.title}}</span></view>
					    <view class="text">服务{{li.service_times}}次    {{li.experience}}年经验</view>
						<view class="text">好评率{{li.good_evaluate_rate}}%</view>
					</view>
				</view>
			</view>
		</view>
		<view class="serlist">
			<view class="titel listv" @tap="goaddress" v-if="aa">
				<view class="img"><img src="../../static/ser3.png" alt=""></view>
                <view class="input">
                	<view>{{aa.name}} <span style="margin-left: 30upx;">{{aa.phone}}</span></view>
                	<view class="top">{{aa.city}}{{aa.road}}</view>
                	<view class="bottom">{{aa.subdistrict}}</view>
                </view>
			</view>
			<view class="listv" v-else  @tap="goaddress">
				<view class="img"><img src="../../static/ser3.png" alt=""></view>
				<view class="input"><input type="text" placeholder="请选择地址" placeholder-style="color: #333; " disabled></view>
			</view>
			<view class="listv" @tap="gotimes">
				<view class="img"><img src="../../static/ser4.png" alt=""></view>
				<view class="input" ><input type="text" placeholder="服务时间" :value="times" placeholder-style="color: #999999;"></view>
			</view>
			<view class="listv">
				<view class="img"><img src="../../static/ser5.png" alt=""></view>
				<view class="input"><input type="text" placeholder="请在这里备注或点击下方标签(可不填)" :value="remarks" @input="remarkInput" placeholder-style="color: #999999;"></view>
			</view>
			<view class="tag"><span v-for="(ta,index) in tagg" :key="index" :class="isaa == index ? 'choosedB':''" @tap="tag(ta,index)" >{{ta.value}}</span></view>
		</view>
		<view class="times" v-if="free != ''">
			<view class="left">有可用免费上门服务次数</view>
			<view class="right"><image class="doors" :src="eyeImg1 ? '../../static/circle-select.png' : '../../static/circle.png' " mode="aspectFill" @click="bindEye"></image></view>
		</view>
		<view class="fixSure">
			<view class="door">上门费: <span class="red">¥{{door_free}}</span></view>
			<view class="service" @tap="tiji()">立即预约</view>
		</view>
		<view class="pop" v-if="popo">
			<view class="popN">
				<view class="close" @tap="close"><img src="../../static/close1.png" alt=""></view>
				<view class="content">
					<img src="../../static/success.png" alt="">
					<view>预约成功</view>
				</view>
				<view class="red" @tap="godetail()">查看详情</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				eyeImg1: false,
				popo:false,
				li:'',
				tid:'',
				jid:'',
				ajid:'',
				order_id:'',
				addressId:'',
				massagist_id:'',
				date:'',
				begin:'',
				end:'',
				value:'',
				free:'',
				can:'',
				selected: false,
				aa:'',
				times:'',
				remark:'',
				use_reduce:0,
				remarks: [],
				tagg:[
					{value:'可提前来'},
					{value:'准时服务'},
					{value:'来前联系'}
				],
				door_free:'',
				lidetail:''
			};
		},
		computed:{
			labels(){
				return this.remarks.join('，')
			}
		}, 
		onLoad(e){
			this.authKey = uni.getStorageSync('authKey');
			this.biId = e.id;
			this.orderD();
			this.orderR();
			this.orderCan();
			this.orderAdress();
		},
		onShow() {
			let jishi = uni.getStorageSync('jishi')
			let address = uni.getStorageSync('address')
			let date = uni.getStorageSync('date');
			let begin = uni.getStorageSync('begin');
			let end = uni.getStorageSync('end');
			let value = uni.getStorageSync('value');
	
			if (jishi){
				this.li = jishi
			} else {
				this.teach()
			}
			
			if (address){
				this.aa = address
			}
			
			if (value){
				this.date = date
				this.begin = begin
				this.end = end
				this.times = value
			}
		},
		methods:{
			// 技师信息
			teach(){
				uni.request({
					url: this.http+'home/myMassagists',
					method: 'GET',
					header: {
						authKey: this.authKey
					},
					data: {
					},
					success: res => {
						// console.log(res.data)
						if (res.data.code == 200) {
							let li = res.data.data[0]
							li.avatarurl = this.static + li.avatarurl
							this.li = li
							this.jid = res.data.data[0].id
						}
					},
				});
			},
			// 上门费
			orderD(){
				uni.request({
					url: this.http+'order/detail/' + this.biId,
					method: 'GET',
					header: {
						authKey: this.authKey
					},
					data: {
					},
					success: res => {
						// console.log(res.data)
						if (res.data.code == 200) {
							this.door_free = res.data.data.product.drop_in_fee
						}
					},
				});
			},
			// 免费上门次数
			orderR(){
				uni.request({
					url: this.http+'home/reduce',
					method: 'GET',
					header: {
						authKey: this.authKey
					},
					data: {},
					success: res => {
						// console.log(res.data)
						if (res.data.code == 200) {
							this.free = res.data.data
						}
					},
				});
			},	
			// 是否可选技师
			orderCan(){
				uni.request({
					url: this.http+'appointment/canichoose',
					method: 'GET',
					header: {
						authKey: this.authKey
					},
					data: {},
					success: res => {
						// console.log(res.data)
						if (res.data.code == 200) {
							this.can = res.data.data
						}
					},
				});
			},	
			// 地址
			orderAdress(){
				if(this.addressId){
					uni.request({
						url: this.http+'home/getAddressDetail/' + this.addressId,
						method: 'GET',
						header: {
							authKey: this.authKey
						},
						data: {
						},
						success: res => {
							// console.log(res)
							if (res.data.code == 200) {
								this.aa = res.data.data
							}
						},
					});
				}
			},
			remarkInput: function(e) {
				this.remark = e.target.value;
			},
			tag(e){
				if (this.remark.indexOf(e.value) < 0)
					this.remarks.push(e.value)
					this.remark += e.value
			},
			// 是否选择使用免费上门次数
			bindEye() {
				this.eyeImg1 = !this.eyeImg1;
				if(this.eyeImg1 == true){
					this.door_free = 0
					this.use_reduce = 1
				}else{
					this.use_reduce = 0
				}
			},
			// 预约
			tiji(){
				if (!this.aa){
					uni.showToast({
						title: '请填写上门地址',
						icon: 'none'
					})
					return
				}
				if (!this.times){
					uni.showToast({
						title: '请填写上门时间',
						icon: 'none'
					})
					return
				}
				var that= this
				this.date = this.date.replace("-","")
				uni.request({
					url: this.http+'appointment/create',
					method: 'POST',
					header: {
						authKey: this.authKey
					},
					data: {
						mode:2,
						order_id:this.biId,
						address_id:this.aa.id,
						massagist_id:this.li.id,
						date:this.date,
						begin:this.begin,
						end:this.end,
						remark:this.remark,
						use_reduce:this.use_reduce 
					},
					success: res => {
						// console.log(res.data)
						var datal = res.data.data
						this.order_id = datal.order_id
						// console.log(datal.order_id)
						// console.log(res.data.data.data)
						if (res.data.code == 200) {
							// 是否需要支付
							if(datal.paysign){
								uni.login({
								   	provider: 'weixin',
								    success(res){
								      if (res.code) {
								        wx.request({
								          url: 'https://zct.51kdd.com/index.php',
								          data: {
								            code: res.code,//要去换取openid的登录凭证
								          },
								          // method: 'GET',
								          success(res) {
								            console.log(res.data)
								   			console.log(datal,datal.timestamp)
								            wx.requestPayment({
								              timeStamp: datal.timestamp,
								              nonceStr: datal.noncestr,
								              package: datal.package,
								              signType: 'MD5',
								              paySign: datal.paysign,
								              success: function (res) {
								                // success
								                console.log(res);
												that.popo = true
										        uni.showToast({
										        	title:'支付成功',
										        	icon:'none',
										        	duration:1500
										        })
								              },
								              fail: function (res) {
								                // fail
												
									            uni.showToast({
									            	title:'支付失败',
									            	icon:'none',
									            	duration:1500
									            })
// 												uni.request({
// 													url: that.http+'appointment/paynotify/' + datal.order_id,
// 													method: 'GET',
// 													header: {
// 														authKey: that.authKey
// 													},
// 													data: {
// 													},
// 													success: res => {
// 														console.log(res.data)
// 														if (res.data.code == 200) {
// 															console.log('成功')
// 														}
// 													},
// 												});
									        },
								                complete: function (res) {
								                  // complete
								                  console.log(res);
								                }
								              })
								            }
								          })
								        } else {
								          console.log('获取用户登录态失败！' + res.errMsg)
								        }
								      }
								   });
								}else{
									this.popo = true
								}
						}else{
							uni.showToast({
								title:res.data.error,
								icon:'none',
								duration:1500
							})
						}
					},
				});
			},
			close(){
				this.popo = false
			},
			godetail(){
				 uni.navigateTo({
					url: '/pages/appointmentDetail/appointmentDetail?id=' + this.order_id
				});
			},
			goaddress(){
				 uni.navigateTo({
					url: '/pages/choose/address?id=' + this.biId +'&jid=' +this.ajid + '&sid=1'
				});
			},
			gotimes(){
				 uni.navigateTo({
					url: '/pages/choose/times?id=' + this.biId +'&jid=' +this.li.id + '&sid=1'
				});
			},
			gotech(){
				uni.navigateTo({
					url: '/pages/choose/technicians?id=' + this.biId + '&sid=1'
				});
			}
		}
	}
</script>

<style>
 page{
	 background-color: #f3f3f3;
 }
 .cold{
	 
 }
  .cold .tite{
	  padding: 20upx 30upx;
	  background-color: #fff;
	  font-size: 32upx;
  }
  .serlist{
	  margin-top: 1upx;
	   background-color: #fff;
  }
  .serlist .listv{
	  display: flex;
  }
  .serlist .listv .img{
	  margin-top: 22upx ;
	  margin-left: 30upx;
	  margin-right: 20upx;
	  width: 48upx;
	  height: 48upx;
	  vertical-align: middle;
  }
  .serlist .input{
	  border-bottom: 1upx solid #d4d4d4;
	  padding: 20upx 0;
	  width: 100%;
  }
  .tag{
	  margin-left: 98upx;
  }
  .tag span{
	  border-radius: 30upx;
	  border: solid 1upx #999999;
	  font-size: 24upx;
	  color: #999999;
	  padding: 2upx 16upx;
	  margin: 30upx 0;
	  display: inline-block;
	  margin-right: 20upx;
  }
  .technicians{
	  margin-bottom: 20upx;
	  margin-top: 1px;
  }
  .technicians .tech{
	  padding: 20upx 30upx;
	  background-color: #fff;
	  position: relative;
  }
  .technicians .tech .right{
	  right: 30upx;
	  top:20upx;
  }
  .cont{
	  margin-top: 2upx;
	  background-color: #fff;
	  display: flex;
	  padding: 20upx 30upx;
  }
  .cont .img{
	  width: 130upx;
	  height: 130upx;
	  background-color: #f3f3f3;
	  border: solid 1upx #d4d4d4;
	  border-radius: 50%;
  }
  .cont .img img{
	  border-radius: 50%;
  }
  .cont .img span{
	  display: inline-block;
	  background-color: #f3f3f3;
	  border: solid 1upx #d4d4d4;
	  border-radius: 50%;
  }
  .cont .txt{
	  margin-left: 20upx;
  }
  .cont .txt .tit .name{
	  font-size: 36upx;
  }
  .cont .txt .tit .tip{
	  background-color: #fff5e4;
	  border-radius: 1upx;
	  font-size: 20upx;
	  letter-spacing: 1upx;
	  color: #b37d1d;
	  padding: 2upx 10upx;
	  margin-left: 20upx;
  }
  .cont .txt .text{
	  font-size: 22upx;
	  color: #666666;
  }
  .times{
	  position: relative;
	  background-color: #fff;
	  margin-top: 20upx;
	  padding: 20upx 30upx;
	  margin-bottom: 170upx;
  }
  .times .right{
	  right: 30upx;
	  top:20upx;
  }
  .times .right image{
	  width: 34upx;
	  height: 34upx;
  }
  .titel{
  	  padding: 20upx 0;
  	  background-color: #fff;
  	  margin-top: 2upx;
  }
  .titel .top{
  	  font-size: 28upx;
  	  color: #333333;
  }
  .titel .bottom{
  	  font-size: 28upx;
  	  color: #999999;
  }
  .titel .gray{
  	font-size: 22upx;
  	margin-left: 30upx;
  	letter-spacing: 0;
  }
</style>