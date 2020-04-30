<template>
	<view>
		<!-- 轮播图 -->  
        <view class="part2">  
            <swiper class="banner-box" indicator-dots  
                indicator-active-color="#dd3e34"  :current="currentTab"
                indicator-color="rgba(0,0,0,.3)" display-multiple-items="1">  
                <swiper-item v-for="car in carousel"  :key="car" >  
                    <image :src="car" class="banner-image" mode="aspectFill" lazy-load></image>  
                </swiper-item>
            </swiper>  
        </view>  
		<view class="serve-detail">
			<view class="price" style="display: flex; justify-content: space-between;">
				<view class="priceZ">￥ <span>{{price_minA.price_min}}</span>/次</view>
				<view style="display: flex;align-items: center;padding-right: 35upx;">
					<view style="margin-right:32upx;"><share-weixin /></view>
					<share-moments :path="path" :csene="csene" :title="content.introduction" :backImage="content.cover"/>
				</view>
			</view>
			<view class="titleI">
				<view class="introduce"><span class="priceM">{{content.name}}</span>{{content.introduction}}</view>
			</view>
			<view class="recommend">
				<view><img src="../../static/time.png" alt=""> {{content.cost}}分钟</view>
				<view>持证技师</view>
				<view>已销{{content.view}}</view>
			</view>
		</view>
		<view class="spell-group" v-if="assembles != ''">
			<view class="group-tit">
				<view class="title">{{content.assembling}}人在拼团，可直接参与</view>
                <view class="more" @tap="gomore()">查看更多 <span>> </span></view>
			</view>
			<swiper style="height: 150rpx;" class="swiper-title group-swiper" vertical="true" autoplay="true" circular="true" interval="3000" >
				<swiper-item class="item" v-for="(et,index) in assembles" :key="index" v-if="et.available == 1">
					<view class="max-item ">
						<div class="group-carousel" @tap="gofight(et.id)">
							<div class="group-photo" style="display: flex;width: 40%;">
								<img class="photo" :src="et.master.avatarurl" alt="">
								<view class="name">{{et.master.nickname}}</view>
							</div>
							<div class="group-carouselNew">
								<div class="carousel-news">
									<p class="differ">还差 <span class="red">{{et.can_join}}人</span>拼成</p>
									<p class="time">剩余{{et.remaining}}</p>
								</div>
								<div class="button" @tap="goGroupList(et)">去拼团</div>
							</div>
						</div>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="spell-group" style="margin-bottom: 20upx;" v-if="count.total>0">
			<view class="group-tit">
				<view class="title">评价<span class="gray">({{count.total}}条)</span></view>
		        <view class="more" @tap="goevaluat()">	<span class="red">{{number.rate}}%好评</span> <span>> </span></view>
			</view>
			<view class="evaluate">
				<view class="evaluateTit gray">{{evaluate.user_name}} ({{evaluate.create_time}})</view>
				<view class="evaluateCont">{{evaluate.comment}}</view>
			    <view class="evaluateTag" v-if="evaluate.tags !=''">
					<img src="../../static/tag.png" alt=""> 
					<span v-for="(ev,index) in evaluate.tags" :key="index">{{ev}}</span>
				</view>
			</view>
		</view>
		<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
			<view v-for="(tab,index) in tabBars" :key="tab.id" :id="tab.id"
			 :data-current="index" @tap="tapTab" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']">{{tab.name}}</view>
		</scroll-view>
		<view class="indrous" v-if="tabIndex == 0">
			<rich-text style="font-size: 30rpx;" :nodes="contentText"></rich-text>
			<video style="width: 100%;" v-if="content.video && showVideo" :src="content.vedio" enable-progress-gesture show-center-play-btn show-progress show-fullscreen-btn controls></video>
		</view>
		<view class="indrous" v-if="tabIndex == 1">
			<view class="content-item">
				<text class="title">1小时急速到岗</text>
				<view class="description">直纯堂拥有一批管理严格的服务队伍，在您需要催乳师时，随时待岗的催乳师将在1小时内到达您的身边。</view>
			</view>
			<view class="content-item">
				<text class="title">24小时不满意免单</text>
				<view class="description">上门服务24小时内，如果你对我们的服务不满意，可以为您办理全额退款。</view>
			</view>
			<view class="content-item">
				<text class="title">3大安全保障</text>
			</view>
			<view class="content-item">
				<text class="title">人身安全：</text><text class="description">直纯堂母婴与征信认证机构合作，对所有服务人员进行包括犯罪记录在内的严格审查。</text>
			</view>
			<view class="content-item">
				<text class="title">健康安全：</text><text class="description">每一位服务人员都需要在权威的体检机构进行严格的入职体检和定期的健康体检。</text>
			</view>
			<view class="content-item">
				<text class="title">隐私安全：</text><text class="description">我们非常尊重客户的隐私，在服务过程中，我们做到不该问的不问，不该说的不说。</text>
			</view>
			<view class="content-item">
				<text class="title">无条件退款</text>
				<view class="description">在催乳师未上门服务前，无需任何条件即可退款。</view>
			</view>
			<view class="content-item">
				<text class="title">无理由更换</text>
				<view class="description">服务期间，当您对服务的催乳师不满意时，我们将为您免费更换同等级的催乳师。</view>
			</view>
			<view class="content-item">
				<text class="title">无隐形消费</text>
				<view class="description">所有的费用都会在服务时明确告知，无任何隐形消费。</view>
			</view>
			<view class="content-item">
				<text class="title">免假日费用</text>
				<view class="description">我们不会向您额外收取任何国家法定节假日服务费用。（但鉴于春节的特殊性，需要一次性支付春节亲情关怀费100元，用于感谢催乳师在春节期间无法正常团聚的辛劳。）</view>
			</view>
		</view>
		<view class="indrous" v-if="tabIndex == 2">
			<view class="content-item">
				<text class="title">关于我们</text>
				<view class="description">百闻不如一用</view>
				<view class="description">我们90%以上的顾客来自于老顾客的推荐</view>
				<view class="description">98%以上选择我们的宝妈都实现了纯母乳喂养</view>
				<view class="description">因为专业，所以可信赖。</view>
				<view class="description">我们能帮助你实现纯母乳喂养。</view>
				<view class="description">直纯堂中医无痛催乳</view>
				<view class="description">让妈妈快乐哺乳，让宝宝吃饱母乳。</view>
			</view>
			
			<view class="content-item">
				<text class="title">我们的员工</text>
			</view>
			<view class="content-item">
				<text class="title">更强大，更有专业范</text>
				<view class="description">我们知道，唯有百里挑一，身经百战，综合表现卓越的催乳师典范，才能匹配对生活品质严苛要求的你。我们坚守初心，一如既往。</view>
			</view>
			<view class="content-item">
				<text class="title">她百里挑一，却不止步于百分之一</text>
				<view class="description">每一位能加入直纯堂的催乳师，不仅有着扎实的专业技能，更是对哺乳喂养有着浓厚的情怀。她们在过往的服务中用自己的能力征得无数妈妈的好评，但她们绝不止步于此。她们的人生起点也许不高，但她们希望自己的这份热爱，能成就和改写自己的人生。</view>
			</view>
			<view class="content-item">
				<text class="title">她好评无数，却从不骄傲自大</text>
				<view class="description">妈妈们的好评如潮，对于她们来说，早已习以为常。除了被妈妈们称赞众多的技能外，她们谦虚的态度更是赢得了每一个家庭的充分尊重。</view>
			</view>
			<view class="content-item">
				<text class="title">她技能优秀，却从不停止学习</text>
				<view class="description">从优秀到卓越，是她们不懈的追求。 不断更新自己的知识，不断提升自我修养，这就是一个优秀的催乳师应该有的样子！</view>
			</view>
			<view class="content-item">
				<text class="title">她，值得尊敬</text>
				<view class="description">她是行业的骄傲，为行业正名。</view>
			</view>
			<view class="content-item">
				<text class="title">她，无需多言</text>
			</view>
			<view>
				<text class="title">她，值得拥有！</text>
			</view>
			
		</view>
		<view class="fix-bottom">
			<view class="left">
				<view @tap="home">
					<img src="../../static/home.png" alt="">
					<p>首页</p>
				</view>
				<view>
					<button open-type="contact" style="display:inline-block;position: absolute;width:40upx;opacity: 0;">share</button>
					<img src="../../static/service.png" alt="">
					<p>客服</p>
				</view>
				<view>
					<button open-type="share" @share="onShareAppMessage" style="display:inline-block;position: absolute;width:60upx;margin-left-20upx;opacity: 0;z-index: 99999;">share</button>
					<img src="../../static/share.png" alt="">
					<p>分享</p>
				</view>
			</view>
			<view class="middle" @tap="buyDirect()">
				<view class="fix-price">￥ <span>{{price_minN.price_min}}</span></view>
				<view class="fix-buy">直接购买</view>
			</view>
			<view class="right" @tap="buy()">
				<view class="fix-price">￥ <span>{{price_minA.price_min}}</span></view>
				<view class="fix-buy">发起拼团</view>
			</view>
			
		</view>
		<view class="groupMore" v-if="spellGroup">
			<view class="moreN">
				<image class="closeP" @tap="closeGroup()" src="../../static/closeP.png" alt="">
				<view class="moreTit">正在拼团</view>
				<view class="groupDetail">
					<view style="display: flex;justify-content: space-between;align-items: center; padding: 15upx;" v-for="(et,index) in assembles" :key="index" v-if="et.available == 1">
						<view style="display: flex;align-items: center;width: 170upx;">
							<image style="width: 70upx; height: 70upx;margin-right: 15upx;" :src="et.master.avatarurl"  ></image>
							<text class="name">{{et.master.nickname}}</text>
						</view>
						<view>
							<view>还差 <text class="red">{{et.can_join}}人</text></view>
							<view>剩余{{et.remaining}}</view>
						</view>
						<button size="mini" type="warn" @tap="goGroupList(et)">去拼团</button>
					</view>
				</view>
			</view>
		</view>
		<view class="purchase groupMore" v-if="specificatbuy">
			<view class="purchaseN">
				<view class="head">
					<view class="headImg">
						<img :src="content.cover" alt="">
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
							<span class="groupnum" v-for="(no,idx) in normal" :key="idx" :class="idx==index ? 'Ractive' : ''"   @tap="choose(no,idx)">{{no.name}}({{no.times}}次)<span v-if="no.remark != null">({{no.remark}})</span></span>
						</view>
					</view>
				</view>
				<view class="sureBuy" @tap="gobuy()">确定</view>
			</view>
		</view>
		<view class="purchase groupMore" v-if="specificatbuycan">
			<view class="purchaseN">
				<view class="head">
					<view class="headImg">
						<img :src="content.cover" alt="">
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
						<view class="tit">服务次数1122</view>
						<view class="timesS" id="timeZ">
							<span class="groupnum" v-for="(no,idx) in normalcan" :key="idx" :class="idx==index ? 'Ractive' : ''"   @tap="chooseCan(no,idx)">{{no.name}}({{no.times}}次)</span>
						</view>
					</view>
				</view>
				<view class="sureBuy" @tap="gobuy()">确定</view>
			</view>
		</view>
		<view class="purchase groupMore" v-if="specificat">
			<view class="purchaseN">
				<view class="head">
					<view class="headImg">
						<img :src="content.cover" alt="">
					</view>
					<view class="headTit">
						<view class="price red">￥{{priceA}}</view>
						<view class="choose">{{specif}}{{specG}}</view>
					</view>
					<view class="closeB">
						<img @tap="goclose()" src="../../static/close1.png" alt="">
					</view>
				</view>
				<view class="specification">
					<view class="serviceTimes">
						<view class="tit">服务次数</view>
						<view class="timesS">
							<span class="groupnum" v-for="(ass,ii) in assemble" :key="ii" :class="ii==agindex ? 'Ractive' : ''"  @tap="chooseGroup(ass,ii)">{{ass.name}}({{ass.times}}次)</span>
						</view>
						<view class="tit">拼团 <span class="red" style="font-size: 20uxp;">（享折上折）</span></view>
						<view class="timesS">
							<span class="groupnum" v-for="(as,ix) in group.prices" :key="ix" :class="ix==azindex ? 'Ractive' : ''" @tap="Groupnum(as,ix)">{{as.name}}</span>
						</view>
					</view>
					</view>
				</view>
				<view class="sureBuy" @tap="spellgroupbuy()">确定</view>
			</view>
			
			<view class="pop" style="display: flex;flex-direction: column;justify-content: center;" v-if="user">
			<view class="popN">
				<view class="close" @tap="close(2)"><img src="../../static/close1.png" alt=""></view>
				<view class="content" style="border: none;">
					<view style="text-align: center;"><img style="width: 150upx;height: 150upx;" src="../../static/logohead.png" alt=""></view>
				</view>
				<button style="border: none;width: 50%;height:80upx;line-height:80upx;background-color: #dd3E34;color: #fff;border-radius: 50upx;" open-type="getUserInfo" @getuserinfo="wxGetUserInfo" withCredentials="true">点击授权</button>
			</view>
		</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				path:'pages/service/detail',
				tabBars: [
					{name:'服务介绍',id:1},
					{name:'服务保障',id:2},
					{name:'关于我们',id:3},
				], //知识分类
				scrollLeft: 0,
				tabIndex: 0,
				symbolId:'',
				spellGroup:false,
				specificat:false,
				specificatbuy:false,
				specificatbuycan:false,
				biId:'',
				authKey:'',
				content:'',
				carousel:'',
				skus:'',
				assemble_skus:'',
				price_minA:'',
				price_minN:'',
				prices:'',
				priceA:'',
				buyTimes:'',
				specif:'',
				specG:'',
				evaluate:'',
				number:'',
				count:'',
				assemble:'',
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
				contentText:'',
				code:'',
				normalcan:'',
				showVideo: true,
				share_title: '',
				user: false,
				userInfo: ''
			};
		},
		onLoad(e) {
			this.userInfo = uni.getStorageSync('userInfo');
			this.authKey = uni.getStorageSync('authKey')
			if (this.authKey){
				this.checkSession()
			}
			this.biId = e.id;
			console.log(e)
			this.invite_code = e.invite_code;
			// 处理判断sence
			if(e.scene){
				const reg = /%26/g
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
			this.getListDetail();
			this.getListComments();
			this.gofight();
		},
		
		onShareAppMessage(res) {
			// if (this.authKey == ''){
			// 	this.user = true
			// 	return
			// }
		    if (res.from === 'button') {
		       // 来自页面内转发按钮
		       console.log(this.code)
		    }
		    return {
		       title: this.share_title,
		       path: "/pages/service/detail?id=" + this.biId + "&invite_code=" + this.code,
		       imageUrl: this.content.cover,
			}
		},
		computed: {
            calHeight() {
				if (this.assembles){
					let len = this.assembles.length
					return uni.upx2px(len * 120) + 'px';	
				}
				return '0px'
            },
			csene(){
				return this.biId + '&' + this.code
			}
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
							that.authKey = ''
							uni.setStorageSync('authKey','')
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
							
							that.gofight()
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
			// 邀请码
			gofight(){
				uni.request({
					url: this.http+'home/profile',
					method: 'GET',
					header: {
						authKey: this.authKey
					},
					data: {
					},
					success: res => {
						if (res.data.code == 200) {
							this.code = res.data.data.invite_code
						}
					},
				});
			},
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
				console.log(this.symbolId)
				if (this.tabIndex === e.target.dataset.current) {
					return false;
				} else {
					let tabBar = await this.getElSize("tab-bar"),
						tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
					this.scrollLeft = tabBarScrollLeft;
					this.isClickChange = true;
					this.tabIndex = e.target.dataset.current;
				}
				// this.requestLearnList()
			},
			// 获取服务详情
			getListDetail(){
				var that = this;
				uni.request({
					url: this.http+'service/detail/' + this.biId,
					method: 'GET',
					header: {
						authKey: this.authKey
					},
					data: {},
					success: res => {
						console.log(res.data)
						let that = this
						if (res.data.code == 200) {
							this.content = res.data.data
							this.content.video = this.content.vedio
							this.content.vedio = this.static + this.content.vedio
							this.content.cover = this.static + this.content.cover
							this.share_title = this.content.share_title
							this.price_minA = res.data.data.price.assemble
							this.price_minN = res.data.data.price.normal
							this.prices = res.data.data.price.normal.price_min
							this.priceA =  res.data.data.price.assemble.price_min
							this.carousel = res.data.data.carousel
							if (this.carousel){
								for (let index in this.carousel) {
									this.carousel[index] = that.static + this.carousel[index]
								}
							}
							this.assemble = res.data.data.price.assemble.items
							this.normal = res.data.data.price.normal.items
							this.group = res.data.data.price.assemble.items[0]
							this.assembles = res.data.data.assembles
							console.log(this.assembles)
							this.contentText = res.data.data.content
						}
					},
				});
			},
			// 获取评价
			getListComments(){
				var that = this;
				uni.request({
					url: this.http+'comment/overview/' + this.biId,
					method: 'GET',
					header: {
						authKey: this.authKey
					},
					data: {},
					success: res => {
						console.log(res.data)
						if (res.data.code == 200) {
							this.evaluate = res.data.data.present
							this.number = res.data.data
							this.count = res.data.data.count
						}
					},
				});
			},
			// 回首页
			home(){
			   uni.reLaunch({
			   	  url: '/pages/knowledge/knowledge'
			   });
			},
			
			// 评价页面
			goevaluat(){
				uni.navigateTo({
					url: '/pages/mine/evaluate/viewRatings?id=' + this.biId
				});
			},
			// 参加拼团
			goGroupList(item){
				if (this.authKey == ''){
					this.user = true
					return
				}
				this.cassemble_id = item.id
				uni.request({
					url: this.http+'assemble/detail/' + item.id,
					method: 'GET',
					header: {
						authKey: this.authKey
					},
					data: {},
					success: res => {
						console.log(res.data)
						if (res.data.code == 200) {
							this.normalcan = res.data.data.skus.items
							this.specificatbuycan = true
					    }else{
							uni.showToast({
								title:res.data.error,
								icon:'none'
							})
						}
					}
				});
			},
			// 选择规格
			 chooseCan(item,idx){
				 if(item.available == 0){
					 uni.showToast({
					 	title:'体验价不可使用',
					 	icon:'none',
					 	duration:1500
					 })
				 }else{
					 console.log(item)
					 this.index = idx
					 this.buyTimes = item.name + '(' + item.times + '次)'
					 this.prices = item.prices.final_price
					 this.bsku_id = item.id
				 }
			},
		     choose(item,idx){
				 if(item.available == 0){
					 uni.showToast({
					 	title:'体验价不可使用',
					 	icon:'none',
					 	duration:1500
					 })
				 }else{
					 this.index = idx
					 this.buyTimes = item.name + '(' + item.times + '次)'
					 this.prices = item.price
					 this.bsku_id = item.id
				 }
			},
			chooseGroup(item,ii){
				this.agindex = ii
				this.specif = item.name + '(' + item.times + '次)'
				console.log(item)
				this.priceA = item.price
				this.group = item
				this.bsku_id = item.id
				this.bassemble_skus = ''
				this.specG = ""
				this.azindex = -1
			},
			Groupnum(item,iz){
				this.azindex = iz;
				this.priceA = item.final_price
				this.specG = item.name
				this.bassemble_skus = item.id
				// console.log(this.bassemble_skus)
			},
			// 查看更多拼团
			gomore(){
				this.spellGroup = true;
			},
			closeGroup(){
				this.spellGroup = false;
			},
			// 直接购买
			buyDirect(){
				if (this.authKey == ''){
					this.user = true
					return
				}
				this.specificatbuy = true;
				this.showVideo = false
			},
			sureBuyDirect(){
				this.specificatbuy = false;
				this.specificatbuycan = false
			},
			// 直接购买   参与拼团购买
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
						product_id:this.biId,
						sku_id:this.bsku_id,
						assemble_id:this.cassemble_id,
						coupon_id:this.coupon_id,
						invite_code:this.invite_code
					},
					success: res => {
						console.log(res)
						if (res.data.code == 200) {
							let data = res.data.data
							data.item.product.cover = this.static + data.item.product.cover
							uni.navigateTo({
								url: '/pages/order/confirmOrder?data=' + encodeURIComponent(JSON.stringify(data)),
							});
						}else{
							uni.showToast({
								title:res.data.error,
								icon:"none"
							})
						}
					},
				});
			},
			// 发起拼团购买
			spellgroupbuy(){
				if(this.bsku_id == ""){
					uni.showToast({
						title:'请选择商品规格',
						icon:'none',
						duration:1500
					})
					return
				}
				if(this.bassemble_skus == ""){
					uni.showToast({
						title:'请选择拼团人数',
						icon:'none',
						duration:1500
					})
					return
				}
				var that = this;
				uni.request({
					url: this.http+'assemble/preview',
					method: 'POST',
					header: {
						authKey: this.authKey
					},
					data: {
						product_id:this.biId,
						sku_id:this.bsku_id,
						category_id:this.bassemble_skus
					},
					success: res => {
						console.log(res.data)
						if (res.data.code == 200) {
							let order = res.data.data
							order.product.cover = that.static + order.product.cover
							uni.navigateTo({
								url: '/pages/order/spellconfirmOrder?data=' + encodeURIComponent(JSON.stringify(order)),
							});
						}else if(res.data.code == 101){
							this.user = true
						}
					},
				});
			},
			// 拼团购买
			buy(){
				// if (this.authKey == ''){
				// 	this.user = true
				// 	return
				// }
				this.specificat = true;
				this.showVideo = false
			},
			// 关闭购买
			goclose(){
				this.specificat = false;
				this.specificatbuy = false;
				this.specificatbuycan = false;
				this.cassemble_id = ''
				this.showVideo = true
			},
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
	#tab-bar {
			border-bottom: none;
			background: #FFFFFF;
			margin-top: 20upx;
			height: 83upx;
			line-height: 80upx;
		}
		uni-view{
			font-size: 30upx;
		}
		body .uni-page-head {
			border-bottom: 1px solid #f3f3f3;
		}
	
		.uni-scroll-view {
			overflow: Scroll;
			overflow-x: hidden
		}
	
		#tab-bar .active {
			color: #dd3e34;
			border-bottom: 4upx solid #dd3e34;
			padding: 0 2upx 10upx 2upx;
			width: 130upx;
			margin: 0 40upx;
		}
		.swiper-tab-list{
			width: 130upx;
			margin: 0 40upx;
			text-align: center;
			font-size: 30upx;
			color: #333333;
		}
		.swiper-tab-list:nth-child(1){
			margin-left: 100upx!important;
		}

/* 轮播图 */  
.part2{  
    width: 100%;  
    height: 750upx;   
    overflow: hidden;  
    position: relative; 
}  
.part2:after{  
    content: " ";  
    height: 40upx;  
    border-radius: 50%;  
    background: #f9f9f9;  
    position: absolute;  
    bottom: -20upx;  
    left: -40upx;  
    right: -40upx;  
}  
.banner-box{  
    width: 100%;  
    height: 100%;  
}  
.banner-image{  
    width: 100%;  
    height: 100%;  
}  
.serve-detail{
	background-color: #fff;
	padding: 30upx 0 30upx 30upx;
}
.price{
	display: flex;
}
.price .priceZ{
	color: #dd3e34;
	font-size: 24upx;
}
.price .priceZ span{
	font-size: 48upx;
	font-weight: bold;
	margin-right: 10upx;
}
.priceM{
	color: #fff;
	font-size: 30upx;
	background-color: #dd3e34;
	border-radius: 2upx;
	padding: 2upx 5upx;
	margin-right: 20upx;
}
.titleI{
	display: flex;
	margin: 10upx 0;
	padding-right: 30upx;
}
.titleI .introduce{
	color: #333333;
	font-size: 30upx;
	line-height: 40upx;
}
.recommend{
	margin-top: 20upx;
	display: flex;
	color: #999999;
	font-size: 24upx;
	border-top: 1px solid #f3f3f3;
	padding-top: 20upx;
	padding-right: 30upx;
}
.recommend view{
	width: 33%;
}
.recommend view:nth-child(2){
	text-align: center;
}
.recommend view:nth-child(3){
	text-align: right;
}
.recommend img{
	width: 28upx;
	height: 28upx;
	margin-right: 10upx;
}
.spell-group{
	margin-top: 20upx;
	background-color: #fff;
}
.spell-group .group-tit{
	padding: 20upx 30upx;
	position: relative;
	border-bottom: 1px solid #f3f3f3;
}
.spell-group .group-tit .title{
	font-size: 30upx;
	color: #333333;
}
.spell-group .group-tit .more{
	position: absolute;
	right: 30upx;
	top:20upx;
	font-size: 28upx;
	color: #999999;
	letter-spacing: 1upx;
}
    .swiper-title{
		position: relative;
		top:6upx;
		/* #ifdef H5 */
		position: relative;
		top:0;
		/* #endif */
		/* height: 120upx; */
		
	}
	/* 拼团轮播 */
	.group-carousel{
		display: flex;
		justify-content: space-between;
		padding: 20upx 0;
		margin:  0 30upx;
	}
	.group-carousel .group-photo .photo{
		width: 70upx;
	    height: 70upx;
		vertical-align: middle;
		border-radius: 100%;
		margin-right: 16upx;
	}
	.group-carousel .group-photo .name{
		/* margin-left: 30upx; */
		color: #333333;
		font-size: 30upx;
		word-wrap: break-word;
	}
	.group-carouselNew{
		display: flex;
	}
	.group-carouselNew .carousel-news .differ{
		color: #333;
		font-size: 24upx;
	}
	.group-carouselNew .carousel-news .time{
		color: #666666;
		font-size: 24upx;
	}
	.group-carouselNew .button{
		background-color: #dd3e34;
		font-size: 28upx;
		letter-spacing: 1px;
	    color: #ffffff;
		height: 60upx;
		line-height: 60upx;
		padding: 0 20upx;
		margin-left: 40upx;
		border-radius: 6upx;
		margin-top: 10upx;
	}
	.detail-img{
		text-align: center;
		margin: 40upx 0;
	}
	.detail-img img{
		width: 60%;
	}
	.detailContent{
		margin-bottom: 100upx;
	}
	.detailContent img{
		width: 100%;
	}
	.fix-bottom{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 100upx;
		line-height: 100upx;
		background-color: #fff;
		display: flex;
		
	}
	.fix-bottom .left{
		width: 37%;
	}
	.fix-bottom .left view{
		width: 33%;
		text-align: center;
		display: inline-block;
	}
	.fix-bottom .left view img{
		width: 37upx;
		height: 35upx;
		margin-top: 18upx;
	}
	.fix-bottom .left view p{
		color: #666666;
		position: relative;
		top:-12upx;
		font-size: 20upx;
		letter-spacing: 1px;
		display: block;
		width: 100%;
	}
	.fix-bottom .middle{
		width: 28%;
		text-align: center;
		background-color: #f3aba7;
		color: #fff;
	}
	.fix-bottom .right{
		width: 35%;
		text-align: center;
		background-color: #dd3e34;
		color: #fff;
	}
	.fix-price{
		font-size: 28upx;
		margin-top: 8upx;
	}
	.fix-price span{
		font-weight: bold;
		font-size: 32upx;
	}
	.fix-buy{
		font-size: 30upx;
		position: relative;
		top:-20upx;
	}
	.evaluate{
		padding: 10upx 30upx;
		padding-bottom: 20upx;
	}
	.evaluate .evaluateTit{
		font-size: 24upx;
	}
	.evaluate .evaluateCont{
		font-size: 30upx;
		color: #333333;
	}
	.evaluate .evaluateTag img{
		width: 42upx;
		height: 42upx;
	}
	.evaluate .evaluateTag{
		margin-top: 10upx;
		color: #999;
	}
	.evaluate .evaluateTag span{
		font-size: 22upx;
		border: solid 1upx #999999;
		border-radius: 20px;
		margin-left: 20upx;
		padding: 4upx 20upx;
		display: inline-block;
		margin-top: 20upx;
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
	.groupMore .moreN{
		position: absolute;
		top:20%;
		left: 10%;
		background-color: #fff;
		width: 80%;
		height: 400upx;
		overflow: auto;
		border-radius: 10upx;
	}
	.groupMore .moreN .closeP{
		position: absolute;
		top:2px;
		right: 2px;
		width: 60upx;
		height: 60upx;
	}
	.groupMore .moreN .moreTit{
		text-align: center;
		padding: 20upx 0;
		border-bottom: 2upx solid #f3f3f3;
		font-size: 34upx;
		letter-spacing: 2upx;
	    color: #151516;
	}
	.groupDetail{
		max-height: 500upx;
		overflow: auto;
	}
	.merely{
		width: 100%;
		padding: 20upx 0;
		text-align: center;
		font-size: 20upx;
		color: #666666;
	}
	.purchase .purchaseN{
		width: 100%;
		position: absolute;
		right: 0;
		bottom: 0;
		background: #FFFFFF;
		height: 800upx;
	}
	.purchase .purchaseN .head{
		margin: 0 30upx;
		display: flex;
		padding-bottom: 30upx;
		border-bottom: 2upx solid #f3f3f3;
	}
	.purchase .purchaseN .head .headImg{
		width: 200upx;
		height: 200upx;
		border: 1upx solid #f3f3f3;
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
		right: 10upx;
		top:10upx;
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
		margin-bottom: 40upx ;
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
	.indrous{
		background-color: #fff;
		padding: 20upx 30upx;
		color: #666666;
		font-size: 26upx;
		margin-bottom: 120upx;
	}
	.title{
		font-size: 36rpx;
		font-weight: 700;
	}
	.description{
		font-size: 30rpx;
	}
	.content-item{
		margin-top: 15rpx;
	}
	.group-photo{
		width: 40%;
		align-items: center;
	}
	.name{
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		flex: 1;
	}
	.carousel-news{
		
	}
</style>
