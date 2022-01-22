// vuex 状态管理

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	// 数据源
	state: {
		userInfo:uni.getStorageSync('USERINFO') || {},
		historyLists: uni.getStorageSync("_history") || []
	},
	mutations: {
		SET_USER_INFO(state,userInfo){
			state.userInfo = userInfo
		},
		SET_HISTORYLISTS(state, history) {
			state.historyLists = history
		},
		CLEAR_HISTORY(state) {
			state.historyLists = []
		}
	},
	actions: {
		set_userinfo({commit},userinfo){
			uni.setStorageSync('USERINFO',userinfo)
			commit('SET_USER_INFO',userinfo)
		},
		set_history({
			commit,
			state
		}, history) {
			let list = state.historyLists
			list.unshift(history)
			uni.setStorageSync('_history',list)
			commit('SET_HISTORYLISTS', list)
		},
		clearHistory({
			commit
		}) {
			uni.removeStorageSync('_history')
			commit('CLEAR_HISTORY')
		}
	}
})

export default store
