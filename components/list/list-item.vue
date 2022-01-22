<template>
	<list-scroll class="list-scroll" @loadmore="loadmore">
		<!-- 三种模式 base基础 image大图 column多图 -->
		<view>
			<list-card mode="base" :item="item" v-for="item in list" :key="item._id"></list-card>
		</view>
		<!-- 
		 对 (v-if="list.length === 0 || list.length >= 2") 进行备注
		 后面的2可以更改，决定数值的因素是数据数量，只要数据加起来的高度超出手机屏幕的高度就可以显示圆圈来提示加载了。
		 -->
		<uni-load-more v-if="list.length === 0 || list.length >= 2" iconType="snow" :status="load.loading || 'loading'"></uni-load-more>
	</list-scroll>
</template>

<script>
	export default{
		props:{
			list:{
				type:Array,
				default(){
					return []
				}
			},
			load:{
				type:Object,
				default(){
					return {
						loading:'loading'
					}
				}
			}
		},
		methods:{
			loadmore(){
				this.$emit('loadmore')
			}
		}
	}
</script>

<style lang="scss">
	.list-scroll {
		height: 100%;
	}
</style>
