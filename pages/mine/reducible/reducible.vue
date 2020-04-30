<template>
	<view class="redu">
		<view class="kk" v-if="lists == ''">
			<view>
				<img class="image" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOQAAADkCAMAAAC/iXi/AAAAtFBMVEUAAAD/9eT/9eT/9eT/9eT/9eT/9eT/9eT/9eT/9eT/9eT/9eT/9eT/9eT/9eT/9eT/9eT/9eT/9eT/9eT/9eT/9eT/9eT/9eT/9eT/9eT/9eT/9eT/9eT/9eT/9eT/9eT/9eT/9eT/9eT/9eT/9eT/9eT/9eSzfR3Gm0767di4hSn15svQqmfs17PiyJnx3r/nz6bUsXTBlELewY3s17LLolu9jDbZuYC8jDXLo1vjyJrZuYGOhs1JAAAAJnRSTlMAkgT17C4U+1RKpwiu5mXw39WNKg1ZzSB/omw0t6rGwZ1BhpUastcFs8wAAAvISURBVHja1NtrV+IwEAbgQLkjd7yguOiqb2jLtlBg8fL//9cqyA5YEJLOAD6fdz0nJzPJ2ySoA2hni9dXqVL3ol7JOHjnZCr1i24pdXVdzLbVT3dZvCpdZPCtzEXpqnipfqTHQrNXw95qvWbhUf0kl9VOHRbqnerPmNJysdlAAo1msaxOWrlw6yAx57ZwsuMsF0oOmDilkxxnNpUBq0wqq05Ku/oLAn5VT2cXffxdg5Da79PYV7KdPATlO8ev2psuxHVv1DFln3AQT8ebzdYtDua2pY6h/ZDHAeUfcurQ0tcZHFjmOq0O6r6BI2jcq8PJdXAknYPV7HkGR5M5V4eQO8NRneWUuGIFR1YpKlnlFE5AqqwEtRrg5b+NfZhrCEaDcwe8Av1uAnOO1PqTboKZ6+l3f2GjKZIMcj1wm+i5CWz0copdtg52oZ4bw0o9q5gVHQjw9Icp7DhFxaqah4Sp/uDBUr6qGF1BxkzP+bD1W7FJQQKtPAGspRSP9B3E6LkBtvGxy12aZYwlyOnrb3ZKd6S1F2KHUpphjGcQNNJzLjbwI/3Oc7HDWfqk5xEY6rkh4kJvv12UYS7vIMrVc6ONsXbvqHB3ouvq0rP+0N9Uxwuej91SKoHfkDbYuLy6L3opwG6J9stziPO9DbMVRv/nMcR+rLPPfR7ywqk3DbFm4ulPkY895e+VlWwNRxHopamLvdWyykKuggOjAl6YwUQlp4yleziO8bIdA5jppZWpBxzJkJYcQ80TXFi/PfiJXJgrKCMtB0cT9rUeubDgtJSBcgM/UqN8SmlOhlG+K+LHKp76DpmcwW55hh/s7NR3DxaFvYo1A2Hu8O2lP3h7dSGh0la7dSDKfe3rpZcJBNypne4haTjQa1588LvfmcsbEBOOPE0oonJr7Erq1xDij/9q8tz3BEd5fYRVZ9GIZBq4ANzg82TZBbdM7uB5br0RozENarzoSzDbke5aeXALB95KlY58rAq/u2kOX//AUr6ltrsFL/9tpRG9QXw0462XsO68mKPB2Gqkt2qrLDi5r5Em0yE2ibbdT470nO1Is2qbJ/AZvmgSBS42C7bdBPT1mr8BjDypLW7AId6IMx/bffzDaPsgSQgjN2qzLhjEGjHEtwZbBjDUX8xgpMswkZaNGDfZcquF4Nl8kLunsoTEXmONuNvz1qvmMBitFO0EZkpqg8s8kpmsNeLeDwNHdAv73UjHMJS/VHFNJOGPVhtxFBr8T7q72yqc+DDWVDHtGqy540iTwRBGInoZwKrWVl9VYWm9EfuBC0NjumvlVVVf/YKNeCOa8yna8brgSHTxRrQzpVcuvG4SfmMlbURC0Y7dg1pTzsAENSJ9BdtzKdrxypTVqgJMuKvBLaJGtDWgTxFeBftD85CG+DwKkdyQoh2vM7WibZJ2AgrfQ3CgaMct37a8GQioEcFlROGU17lVtS7f9Q18MAop2jGJ12vZwd7681YMwWlRrx74OWWbS9dA5kB4TJ8ivIo2z1n6Et0jGO3oU6SOffn0cJNXXyjaNdSnS+xtKFVWgdSnyKX5V9ZMv4MAVwtFu6r54c70Y2kFP7lo11ELFextJLTUfzbCDOzqpi1J5SrAE4p2j8aZbkxHwdwGQn+6YPy9HAoVFTZHuzDS3puLRFKmpztyRYV4tFvmZO8VSfxS79IODFBRsZvF9uBIL0Qu7DlppVQLBqio2MVPmQO9NEQCLbOTDyoqEdGXaEcHEDMkUDD8lSsVFb9YtBvr/wIkcGV4mUVFJcFdS/+uR4N0YW1xvXUBA1RUEqar0W5GYxzA3uIgvQYDVFQS6JSZfgOT/DYoo1QOJqioRHi0yAxid8zW2qaX6FRUvKhEQ2p9mshEsqoAU0MqKnbB8qXIS+KllRRNn0VStBM1oTE+I6lrg21SPtqRPuNE4krdwRC9SpEz1HNMS1zK4PBcPNrFAh3T8WdJ9WCKXqVICVgnEl2TwCMf7eKBzkdyFwYHy/LRjjXQkbqqwJjUq5T4RHo+GFRMo6t8tMOIJ9CRmnJgQDjasQY64ihYEHqVwpzMiYIBoWgnFOiIggGxaCcS6IiCAcloF5/ICEwcy4WH9VWKTKAjNbMtRCbayQQ6UjEMAyLRTngiUVd1WGF8cCwU6EjdOKALRDuZZE4uVA+WXOZXKTSR3At31+KjmT3ayQQ6UrI4/uCPdv7Y5Q90JKWuYIfrwfHip8Cz9Yl8/sfb2S2nDUNBuAkkmELT8tMkDW2nnbaKZbv4B0jH5P3fqxe6ODMR5qBdy98bMFiw8p7dY02PPEJJ7f6knUsjZLVVBB3F07vEoPADxy6NcKgUZc4yxbN2vLTbS45bvsgIQupGDB8AQtr9tcbkqUywK4KOYi3WHQA2QOAe04MRFEFHMhYTFgCTdi5G2uyNIN55jLHXezwbCkq7qvDqBhRBR/Oeqv8OHzjOMz/xpChznkcZcUEIzpLlHRlgq3jnFIkMKwGESLuq7fzGFUFHs5KxM4RLpV1ZZ2cKMBVlzjK6BuOhgj5wnO8aJSEr3nmMd7nf2XoaXdrZVuuMUAQdzRVd4aZKu1LKWzpQlDlNIuPZKN1Zsnz3Uht9u4DinfP8lkF7kE5pd2wvvKEogo7mUy99GM2JAYJt5qpNdBRlvn9lP/cXCb/AnJZ2xfPh0tNlX8600VT8vetOYkwwZJZMEXQp/4LlQQJpOFSWTFPm/AuWRS9N2dRbO807572zZS/NvGSWTBF0tHc29eK+EFyWTFHmrHc2mvXTzcu9tVMEHeudzfsq56UGCBRBx3pnn70yBRCqJkDxzknvbLLuq0uaiv08O9LSnIL1zuZewQkMMxuqLJQgy3oSr6oGBq0JcEWFyiKCLfH7Op5xpUO8tHPVvZl7UruxxO/rL6Y+ipd29ti6Tq3d1ig0+D1zwxeBCcGxn38BV7EU/pD3TKUbL+0O3lUsxoe8A8v5WGlnj2lmjbHWaPCP68d1vzWLF9YEOFs5TOVaWDMu0cJMQtrlr2Ir6/CSZ/LQf/Vpff5+WzViK4dgM1S8fkNLbHFpl4INhQX8N7lB64gRaZfXrTUmh0SLLeBMwdcIxdIdiW5nK5cG49jgRtcGrQgPlXZ7sZWDkX7qwgD8iVP27sd+SqBIU54AboTgBq3tD5V2tgb7+6qWNWXn/AIGXtrp9y9HujcIk1W0VRr8bKhfFI9xFWspCp/otjuvKB5jfBttvQ0X+/H7qXGeIiwq4q0Lv5+aYXEdc+VUCd0Y/H5qkp8RlodRb+38fmqaH1HXwOllPfpB5PlwG3Whn25d6AeRJ4m8mjEk0V0qBxFlHmnJZvBbOzelxfRT4w8rbcpelui2SlE8xXSAxbe6tKuKTCmKZ7gaZIXxtuvmIAdRKYpnWMyGWUaddfxV6geRZ7QaaK14ceqrBA4iQjLUgvjcj68ABxFiOdyq//rtCEBZe3sLIwCs+if+Le3/6u5sp3UYigLoSWJnbqaOKU1pQ9kE7tAK7kXw/z/GQ3hBQUhxPHX9wdaxvc+b3/odrR/mr5fBv4WKzHwSwHMIOT99Ruq67vXLRYRCOSchxwAC+pQD75c/0pwxEBxJUAYxj92DWsP6yUhYC0GX5weFhhXV0gQORJ1fuu7puVPi/+Ngm5vkgCtwoGncGNaLXZrITWG5tM9oYpZ/u1HeISp2SQL3AAFjW+QfxBwGGTW+sZdulN8Q45A0LSzVkkRZAAsFGUkVebCOF5FkvIBlCk7S+bewyq1PCrgVLFK5pMbSmovpLUmZeQkrlHNSKHFgASchtaIZDJtFpJyfwqjUJx2WDMawJWni1zCk9kmfYwkDyiNp5W4ZNGNbl3Tz7wJoFNz5ZMK8gTbNnEzh99DinpNJNzsot7sh03gdQKGg5mSDU5tDkbw9kS0W2R4K7LMFWYU7DFIxx45z+lUSxh4k8ZowIUslYepJSJjam7CXRFWJCcoqsjzhp3VWFxBQ1NmarskprPb5iK7YV6E9bTHKOto0K4YfsVWzCa9rgN9Z8Gi7ceLdqpixAIDHWFGsdrGz2UZcRxN+AFwF1PHpDKxHAAAAAElFTkSuQmCC" alt="">
				<view class="tit">呀，您暂无可预约服务哦~</view>
				<view class="sure"><view class="invite" @tap="gobuy">去买一个</view></view>
			</view>
		</view>
		<view class="serve" v-else>
			<view class="reser" v-for="(li,index) in lists" :key="index" @tap="chose(li.id,index)">
				<view class="img"><img :src="li.product.cover" alt=""></view>
				<view class="cont">
					<view class="tit">{{li.product.name}}</view>
					<view class="txt ell">{{li.product.introduction}}</view>
					<view class="txt" style="margin-top: 10upx;"><img src="../../../static/time.png" alt="">{{li.product.cost}}分钟</view>
				    <view class="times">剩余服务次数: {{li.service_times}}</view>
				</view>
				<view class="right"><span class="choose" :class="isaa == index ? 'ye':'not'"></span></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lists:'',
				tid:'',
				authKey:'',
				loadingType: 0,
				next : -1,
				start: 0,
				size: 15,
				isaa:0
			};
		},
		onLoad(e){
			this.authKey = uni.getStorageSync('authKey');
			this.jid = e.jid;
		},
		onShow() {
			this.start = 0
			this.redu();
		},
		methods:{
			// 可预约订单
			redu(){
				var that = this;
				let querys = "?start=" + this.start + "&size=" + this.size 
				uni.request({
					url: this.http+'appointment/list' + querys,
					method: 'GET',
					header: {
						authKey: this.authKey
					},
					data: {
					},
					success: res => {
						let data = res.data.data
						console.log(res.data)
						if (res.data.code == 200) {
							// that.lists = res.data.data.list
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
						   
				// 			order.forEach(function(item){
				// 				// item.symbol = item.symbol.toUpperCase()
				// 			})
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
			chose(id,idx){
				this.isaa = idx;
				uni.navigateTo({
					url: '/pages/reservationService/reservationService?id='+id+'&jid='+this.jid
				});
			},
			gobuy(){
				uni.reLaunch({
					url: '../../service/service'
				});
			}
		}
	}
</script>

<style>
	page{
		height: 100%;
	}
	.redu{
		height: 100%;
	}
	
 .sure{
  	  padding: 60upx 0;
  }
  .sure .invite{
  	  width: 80%;
  	  text-align: center;
  	  font-size: 30upx;
  }
   .reser{
  	display: flex;
  	padding: 20upx 30upx;
  	background-color: #fff;
	border-bottom: 1px solid #f3f3f3;
	position: relative;
  }
  .reser .img{
  	width: 178upx;
      height: 178upx;
  	margin-right: 20upx;
  }
  .reser .cont{
      width: 400upx;
  }
  .reser .cont .tit{
  	font-size: 30upx;
  	color: #333333;
  }
  .reser .cont .txt{
  	font-size: 24upx;
  	color: #999999;
  }
  .reser .cont .txt img{
  	width: 22upx;
      height: 22upx;
  	margin-right: 10upx;
  	vertical-align: middle;
  }
  .reser .cont .times{
	  font-size: 24upx;
	  color: #333333;
	  margin-top: 10upx;
  }
  .serve{
	  border-top: 1px solid #f3f3f3;
  }
  .reser .right{
	  right: 30upx;
	  top:80upx;
  }
  .choose{
  	margin-right: 10upx;
  	position: relative;
  	top:-20upx;
  	display: inline-block;
  	width: 40upx;
  	height: 40upx;
  }
  .not{
  	background: url(../../../static/circle.png) no-repeat;
  	background-size: 100% 100%;
  }
  .ye{
  	background: url(../../../static/circle-select.png) no-repeat;
  	background-size: 100% 100%;
  }
</style>
