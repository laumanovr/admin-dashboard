import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import VueToast from 'vue-toast-notification';
import './assets/styles/main.scss';

Vue.config.productionTip = false;
Vue.use(VueToast, {position: 'top-right', duration: 1500});

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App)
}).$mount('#app');
