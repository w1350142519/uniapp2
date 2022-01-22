<template>
	<!-- 
	 课下自行实现的内容
	 1.将全部评论页面的回复功能进行完善（和前面实现的逻辑一样）
	 2.uni-popup里面的内容在两个地方都用了（主评论和全部评论），可以将它封装成一个组件，传递不同的参数进行使用
	 -->
	<view>
		<view class="comments-content" v-for="item in commentsList" :key="item.comment_id">
			<comments-box :comments="item"></comments-box>
		</view>
		<uni-load-more v-if="commentsList.length === 0 || commentsList.length > 5" :status="loading" iconType="snow">
		</uni-load-more>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				commentsList: [],
				article_id: '',
				page: 1,
				pageSize: 5,
				loading: 'loading'
			}
		},
		onLoad(query) {
			this.article_id = query.id
			console.log(query);
			this.getComments()
		},
		onReachBottom() {
			if(this.loading === 'noMore') return
			this.page++
			this.getComments()
			console.log('上拉触底');
		},
		methods: {
			getComments() {
				this.$api.get_comments({
					article_id: this.article_id,
					page: this.page,
					pageSize: this.pageSize
				}).then(res => {
					const {
						data
					} = res
					if (data.length === 0) {
						this.loading = 'noMore'
						return
					}
					// 对象复制
					let oldFormData = JSON.parse(JSON.stringify(this.commentsList))
					oldFormData.push(...data)
					console.log(res);
					this.commentsList = oldFormData
				})
			}
		}
	}
</script>

<style lang="scss">
	.comments-content {
		padding: 0 15px;
	}
</style>
