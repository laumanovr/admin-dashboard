import Vue from 'vue';
import Vuex from 'vuex';
import ItemModule from './item.module';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
	  ItemModule
	}
});
