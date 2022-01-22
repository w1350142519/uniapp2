<template>
	<view class="home">
		<!-- 自定义导航栏 -->
		<navbar></navbar>
		<tab :list="tabList" :tabIndex="tabIndex" @tab="tab"></tab>
		<view class="home-list">
			<list :tab="tabList" :activeIndex="activeIndex" @change="change"></list>
		</view>
	</view>
</template>

<script>
	// easyCom components/组件名/组件名.vue 局部引入
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				tabList: [],
				tabIndex:0,
				activeIndex:0
			}
		},
		computed:{
			...mapState(['userInfo'])
		},
		watch:{
			userInfo(newVal){
				this.getLabel()
			}
		},
		onLoad() {
			uni.$on('labelChange',(res) => {
				this.tabList = []
				this.tabIndex = 0
				this.activeIndex = 0
				this.getLabel()
			})
		},
		methods: {
			change(current){
				this.tabIndex = current
				this.activeIndex = current
				// console.log('当前swiper的值：',current);
			},
			tab(data,index){
				// console.log(data,index);
				// console.log(data.index);
				this.activeIndex = data.index
			},
			getLabel() {
				// console.log(this.$api);
				this.$api.get_label().then((res) => {
					const {data} = res
					data.unshift({
						name:'全部'
					})
					console.log(data);
					this.tabList = data
					// console.log(this.tabList);
				})
				
			}
		}
	}
</script>

<style lang="scss">
page{
	height: 100%;
	display: flex;
}
.home{
	display: flex;
	flex-direction: column;
	flex: 1;
	overflow: hidden;
	.home-list{
		flex: 1;
		box-sizing: border-box;
		// border: 1px solid red;
	}
}
</style>
