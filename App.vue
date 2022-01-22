<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			
			// 因为没有登录功能，所以此处user_id设为固定值
			// 61c1cb8e79641200015b573a
			// 接口 异步
			this.$api.get_user({
				user_id:'61c1cb8e79641200015b573a'
			}).then(res=>{
				// console.log(res);
				const {data} = res
				this.$store.dispatch('set_userinfo',data)
			})
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
