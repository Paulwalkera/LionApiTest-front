import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/icon.css';
import "babel-polyfill";
// 开启contentmenu
import contentmenu from 'v-contextmenu'

Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});

// 开启contentmenu
Vue.use(contentmenu);

//全局加载resource拦截器
import './axios';

const i18n = new VueI18n({
    locale: 'zh',
    messages
});

// 用例调试监听
Vue.prototype.$EventBus = new Vue()


new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');