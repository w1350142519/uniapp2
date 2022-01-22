'use strict';
// 获取数据库的引用
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	const {
		user_id,
		name,
		// 设置的是默认的，如果有传过来的数据，就会覆盖默认值
		page = 1,
		pageSize = 10
	} = event

	let matchObj = {}
	if (name !== '全部') {
		matchObj = {
			classify: name
		}
	}
	
	const userInfo = await db.collection('user').doc(user_id).get()
	const article_likes_ids = userInfo.data[0].article_likes_ids

	// 聚合：更精细化的去处理数据 求和、分组、指定返回哪些字段
	const list = await db.collection('article')
		.aggregate()
		.addFields({
			// '$_id' 中$表示当前的集合表，_id表示字段
			// 查一个判断一个，直到执行完毕
			is_like:$.in(['$_id',article_likes_ids])
		})
		.match(matchObj)
		.project({
			content: 0 // 0 等同于 false
		})
		// 跳过的数据
		.skip(pageSize*(page-1))
		.limit(pageSize)
		.end()

	// 接受分类，通过分类去筛选数据
	// const list = await db.collection('article')
	// .field({
	// 	// true 表示返回这个字段， false 表示不返回
	// 	content:false
	// })
	// .get()

	//返回数据给客户端
	return {
		code: 200,
		msg: '数据请求成功',
		data: list.data
	}
};
