import Vue from 'vue'
import App from './App'
import {forwardLogin} from './common/helper.js'

Vue.config.productionTip = true


// 注册全局分享朋友圈组件
import ShareMoments from '@/components/Share-moments'
Vue.component('share-moments',ShareMoments)

// 注册全局分享微信组件
import ShareWeixin from '@/components/Share-weixin'
Vue.component('share-weixin',ShareWeixin)


// 导入全局制作海报事件
import makeBill from '@/util/QS-SharePoster/makeBill';

// Vue.prototype.http = "http://47.52.132.133:8080/app/"
// Vue.prototype.static = "http://47.52.132.133:8080/"
// Vue.prototype.http = "http://192.168.0.102/app/"
// Vue.prototype.static = "http://192.168.0.102/"
Vue.prototype.http = "https://zct.51kdd.com/app/"
Vue.prototype.static = "http://zct.51kdd.com/"
Vue.prototype.$checked = false
Vue.prototype.$forwardLogin = forwardLogin
// 注册全局海报自定义事件
Vue.prototype.$makeBill = makeBill
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()