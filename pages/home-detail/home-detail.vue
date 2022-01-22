<template>
	<view class="detail">
		<view class="detail-title">
			{{formData.title}}
		</view>
		<view class="detail-header">
			<view class="detail-header_logo">
				<image :src="formData.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="detail-header_content">
				<view class="detail-header_content-title">
					{{formData.author.author_name}}
				</view>
				<view class="detail-header_content-info">
					<text>{{formData.create_time}}</text>
					<text>{{formData.browse_count}} 浏览</text>
					<text>{{formData.thumbs_up_count}} 赞</text>
				</view>
			</view>
			<button class="detail-header_button" type="default"
				@click="follow(formData.author.id)">{{formData.is_author_like?'取消关注':'关注'}}</button>
		</view>
		<view class="detail-content">
			<view class="detail-html">
				<rich-text :nodes="formData.content"></rich-text>
			</view>
			<view class="detail-comment">
				<view class="comment-title">最新评论</view>
				<view class="comment-content" v-for="item in commentsList" :key="item.comment_id">
					<comments-box :comments="item" @reply="reply"></comments-box>
				</view>
			</view>
		</view>
		<view class="detail-bottom">
			<view class="detail-bottom_input" @click="openComment">
				<text>谈谈你的看法</text>
				<uni-icons type="compose" size="16" color="#f07373"></uni-icons>
			</view>
			<view class="detail-bottom_icons">
				<view class="detail-bottom_icons-box" @click="open">
					<uni-icons type="chat" size="22" color="#f07373"></uni-icons>
				</view>
				<view class="detail-bottom_icons-box" @click="likeTap(formData._id)">
					<uni-icons :type="formData.is_like?'heart-filled':'heart'" size="22" color="#f07373"></uni-icons>
				</view>
				<view class="detail-bottom_icons-box" @click="thumbsup(formData._id)">
					<uni-icons :type="formData.is_thumbs_up?'hand-up-filled':'hand-up'" size="22" color="#f07373"></uni-icons>
				</view>
			</view>
		</view>
		<!-- ref=""获取节点的方式只能用在自己设的自定义组件上，原生的组件不能用这个属性 -->
		<uni-popup ref="popup" type="bottom" :maskClick="false">
			<view class="popup-wrap">
				<view class="popup-header">
					<text class="popup-header_item" @click="close">取消</text>
					<text class="popup-header_item" @click="submit">发布</text>
				</view>
				<view class="popup-content">
					<textarea class="popup-textarea" v-model="commentsValue" maxlength="200" placeholder="请输入评论内容"
						fixed />
					<view class="popup-count">{{commentsValue.length}}/200</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData: {},
				// textarea输入框的值
				commentsValue: '',
				commentsList: [],
				replyFormData: {}
			}
		},
		onLoad(query) {
			this.formData = JSON.parse(query.params)
			this.getDetail()
			this.getComments()
		},
		onReady() {

		},
		methods: {
			// 打开全部评论列表
			open(){
				uni.navigateTo({
					url:'../detail-comments/detail-comments?id='+this.formData._id
				})
			},
			// 点赞
			thumbsup(article_id){
				this.setUpdateThumbs(article_id)
			},
			// 收藏
			likeTap(article_id){
				console.log('收藏');
				this.setUpdateLike(article_id)
			},
			// 关注
			follow(author_id) {
				console.log('关注');
				this.setUpdateAuthor(author_id)
			},
			// 打开评论发布窗口
			openComment() {
				this.$refs.popup.open()
			},
			// 关闭弹窗
			close() {
				this.$refs.popup.close()
			},
			// 发布
			submit() {
				console.log('发布');
				if (!this.commentsValue) {
					uni.showToast({
						title: '请输入评论内容',
						icon: 'none'
					})
					return
				}
				this.setUpdateComment({
					content: this.commentsValue,
					...this.replyFormData
				})
			},
			reply(e) {
				this.replyFormData = {
					"comment_id": e.comments.comment_id,
					"is_reply": e.is_reply
				}
				if (e.comments.reply_id) {
					this.replyFormData.reply_id = e.comments.reply_id
				}
				// console.log(e);
				console.log(this.replyFormData);
				this.openComment()
			},
			setUpdateComment(content) {
				const formdata = {
					article_id: this.formData._id,
					...content
				}
				// console.log(formdata);
				uni.showLoading()
				this.$api.update_comment(formdata).then((res) => {
					uni.hideLoading()
					uni.showToast({
						title: '评论发布成功'
					})
					console.log(res);
					// 重新请求一下评论数据，重新赋值，相当于刷新功能
					this.getComments()
					this.close()
					this.replyFormData = {}
					this.commentsValue = ''
				})
			},
			// 获取详情信息
			getDetail() {
				this.$api.get_detail({
					article_id: this.formData._id
				}).then((res) => {
					const {
						data
					} = res
					this.formData = data
					console.log(this.formData);
				})
			},
			// 请求评论内容
			getComments() {
				this.$api.get_comments({
					article_id: this.formData._id
				}).then(res => {
					console.log(res);
					const {
						data
					} = res
					this.commentsList = data
				})
			},
			// 关注作者
			setUpdateAuthor(author_id) {
				uni.showLoading()
				this.$api.update_author({
					author_id
				}).then(res => {
					uni.hideLoading()
					this.formData.is_author_like = !this.formData.is_author_like
					uni.$emit('update_author')
					uni.showToast({
						title: this.formData.is_author_like ? '关注作者成功' : '取消关注作者',
						icon: 'none'
					})
					// console.log(res);
				})
			},
			// 收藏文章
			setUpdateLike(article_id){
				uni.showLoading()
				this.$api.update_like({
					article_id
				}).then(res=>{
					uni.hideLoading()
					this.formData.is_like = !this.formData.is_like
					// 绑定自定义事件，用于通知主页此文章已收藏或已取消收藏
					// 手动传入的follow参数，为了保证逻辑一致
					uni.$emit('update_article','follow')
					uni.showToast({
						title:this.formData.is_like?'收藏成功':'取消收藏',
						icon:'none'
					})
					console.log('收藏成功',res);
				})
			},
			// 点赞文章
			setUpdateThumbs(article_id){
				uni.showLoading()
				this.$api.update_thumbsup({
					article_id
				}).then(res=>{
					uni.hideLoading()
					this.formData.is_thumbs_up = true
					this.formData.thumbs_up_count++
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
					console.log(res);
				})
			}
		}
	}
</script>

<style lang="scss">
	.detail {
		padding: 15px 0;
		padding-bottom: 54px;

		.detail-title {
			padding: 0 15px;
			font-size: 18px;
			font-weight: bold;
			color: #333;
		}

		.detail-header {
			display: flex;
			align-items: center;
			margin-top: 10px;
			padding: 0 15px;

			.detail-header_logo {
				flex-shrink: 0;
				width: 40px;
				height: 40px;
				border-radius: 50%;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.detail-header_content {
				width: 100%;
				padding-left: 10px;
				flex: flex;
				flex-direction: column;
				justify-content: space-between;
				font-size: 12px;

				.detail-header_content-title {
					font-size: 14px;
					color: #333;
				}

				.detail-header_content-info {
					color: #999;

					text {
						margin-right: 10px;
					}
				}
			}

			.detail-header_button {
				padding: 0 15px;
				flex-shrink: 0;
				height: 30px;
				line-height: 30px;
				border-radius: 5px;
				font-size: 12px;
				background-color: $mk-base-color;
				color: #fff;
			}
		}

		.detail-content {
			margin-top: 20px;
			min-height: 500px;

			// border: 1px solid red;
			.detail-html {
				padding: 0 15px;
			}

			.detail-comment {
				margin-top: 30px;

				.comment-title {
					padding: 10px 15px;
					font-size: 14px;
					color: #666;
					border-bottom: 1px solid #F5F5F5;
				}

				.comment-content {
					padding: 0 15px;
					border-top: 1px solid #eee;
				}
			}
		}

		.detail-bottom {
			position: fixed;
			bottom: 0;
			left: 0;
			display: flex;
			align-items: center;
			width: 100%;
			height: 44px;
			border-top: 1px solid #F5F5F5;
			background-color: #fff;
			box-sizing: border-box;

			.detail-bottom_input {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-left: 10px;
				padding: 0 10px;
				width: 100%;
				height: 30px;
				border: 1px solid #ddd;
				border-radius: 5px;

				text {
					font-size: 14px;
					color: #999;
				}
			}

			.detail-bottom_icons {
				display: flex;
				flex-shrink: 0;
				padding: 0 10px;

				.detail-bottom_icons-box {
					position: relative;
					display: flex;
					justify-content: space-around;
					align-items: center;
					width: 40px;
				}
			}
		}

		.popup-wrap {
			background-color: #fff;

			.popup-header {
				display: flex;
				justify-content: space-between;
				font-size: 14px;
				color: #666;
				border-bottom: 1px solid #F5F5F5;

				.popup-header_item {
					height: 50px;
					line-height: 50px;
					padding: 0 15px;
				}
			}

			.popup-content {
				width: 100%;
				padding: 15px;
				box-sizing: border-box;

				.popup-textarea {
					width: 100%;
					height: 200px;
				}

				.popup-count {
					display: flex;
					justify-content: flex-end;
					font-size: 12px;
					color: #999;
				}
			}
		}
	}
</style>
