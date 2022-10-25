import {sendGetRequest, sendPostRequest, sendPutRequest} from '@/services/api.service';

const state = {
	items: [],
	onSuccess: '',
	onError: ''
};

const actions = {
	async fetchAllItems ({commit}) {
		try {
			const resp = await sendGetRequest('items');
			commit('SAVE_DATA', resp.data);
			commit('SET_SUCCESS', 'List loaded successfully!');
		} catch (err) {
			commit('SET_ERROR', err);
		}
	},
	async create ({commit}, body) {
	  try {
	    await sendPostRequest('items', body);
	    commit('SET_SUCCESS', 'Item successfully created!');
	    setTimeout(() => {
				commit('SET_SUCCESS', '');
			}, 800);
		} catch (err) {
			commit('SET_ERROR', err);
		}
	},
	async update ({commit}, body) {
	  try {
	    await sendPutRequest(`items/${body.id}`, body.formData);
			commit('SET_SUCCESS', 'Item successfully updated!');
			setTimeout(() => {
				commit('SET_SUCCESS', '');
			}, 800);
		} catch (err) {
			commit('SET_ERROR', err);
		}
	}
};

const mutations = {
	SAVE_DATA (state, data) {
		state.items = data;
	},
	SET_SUCCESS (state, data) {
		state.onSuccess = data;
	},
	SET_ERROR (state, data) {
		state.onError = data;
	}
};

const getters = {
	filteredItems (state) {
		return state.items.reverse();
	}
};

export default {
	namespaced: true,
	state,
	actions,
	mutations,
	getters
};
