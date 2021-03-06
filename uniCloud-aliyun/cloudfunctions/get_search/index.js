'use strict';
// 获取数据库的引用
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	const {
		user_id,
		value
	} = event
	
	
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
		.project({
			content: 0 // 0 等同于 false
		})
		.match({
			// 用正则筛选
			title: new RegExp(value)
		})
		.end()
		

	//返回数据给客户端
	return {
		code: 200,
		msg: '数据请求成功',
		data: list.data
	}
};
