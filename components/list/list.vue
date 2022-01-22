<template>
	<swiper class="home-swiper" :current="activeIndex" @change="change">
		<swiper-item v-for="(item,index) in tab" :key="index" class="swiper-item">
			<list-item :list="listCatchData[index]" :load="load[index]" @loadmore="loadmore"></list-item>
		</swiper-item>
	</swiper>
</template>

<script>
	import listItem from './list-item.vue'
	export default {
		components: {
			listItem
		},
		props: {
			tab: {
				type: Array,
				default () {
					return []
				}
			},
			activeIndex: {
				type: Number,
				default: 0
			}
		},
		name: "list",
		data() {
			return {
				list: [],
				listCatchData: {},
				// 分别设置的page加载次数 和 loading/noMore显示
				load: {},
				// 可以根据需要进行更改，为一次显示几条数据
				// 默认一开始显示的数据量最好超过手机的高度，比如 pageSize:10，不然一次显示过少的话需要上拉刷新太多次 ---故如果数据够的话，此处可以改为 pageSize:10
				pageSize: 2
			};
		},
		watch: {
			tab(newVal) {
				// 如果数据没有加载完就直接跳出，等待加载完毕再渲染
				if (newVal.length === 0) return
				// 清空缓存数据 防止重复添加数据
				this.listCatchData = {}
				this.load = {}
				this.getList(this.activeIndex)
			}
		},
		// App中是onLaunch 页面是onLoad 组件是created
		created() {
			uni.$on('update_article', (e) => {
				console.log(e);
				if (e === 'follow') {
					// 清空缓存数据 防止重复添加数据
					this.listCatchData = {}
					this.load = {}
					this.getList(this.activeIndex)
				}
			})
		},
		methods: {
			loadmore() {
				if (this.load[this.activeIndex].loading === 'noMore') return
				this.load[this.activeIndex].page++
				console.log('触发上拉');
				this.getList(this.activeIndex)
			},
			change(e) {
				const {
					current
				} = e.detail
				// console.log(this.tab[current].name);
				this.$emit('change', current)
				// 当数据不存在 或者 长度为0的情况下，才去请求数据
				if (!this.listCatchData[current] || this.listCatchData[current].length === 0) {
					this.getList(current)
				}
			},
			getList(current) {
				if (!this.load[current]) {
					this.load[current] = {
						page: 1,
						loading: 'loading'
					}
				}
				console.log(this.load[current].page);
				this.$api.get_list({
					name: this.tab[current].name,
					page: this.load[current].page,
					pageSize: this.pageSize
				}).then(res => {
					console.log(res);
					const {
						data
					} = res

					// 0*方法
					// this.list = data

					// 1*此方法渲染的数据是：{ 0:[] , 1:[] }，js无法正常检测到，无法更新，所以无法使用这种方法来缓存
					// this.listCatchData[current] = data

					if (data.length === 0) {
						let oldLoad = {}
						oldLoad.loading = 'noMore'
						oldLoad.page = this.load[current].page
						// 渲染没起作用，需要强制渲染
						this.$set(this.load, current, oldLoad)
						// 强制渲染
						this.$forceUpdate()
						return

					}
					let oldList = this.listCatchData[current] || []
					oldList.push(...data)

					// 2*懒加载 + 数据缓存：刚开始需要才会加载，加载过的有缓存，就不用二次重复加载了
					this.$set(this.listCatchData, current, oldList)
				})
			}
		}
	}
</script>

<style lang="scss">
	.home-swiper {
		height: 100%;

		.swiper-item {
			height: 100%;
			overflow: hidden;
		}
	}
</style>
