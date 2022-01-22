// 方法1-传统方法：每增加一个方法就要手动添加一个导出的方法，比较麻烦，还需要手动添加。

// 	import {get_label,get_list} from './list.js'

// 	export default{
// 		get_label,
// 		get_list
// 	}

// 方法2-自动化：每次自动循环现有的方法，如果新添加了一个方法就自动添加到导出的方法中，批量自动导出文件。
/**
 * requireApi.keys()   
 * 	-- api文件夹
 * 	-- 获取api文件夹下的所有文件：["./index.js", "./list.js"]
 * 
 * requireApi.('文件的相对路径')   
 * 	-- requireApi('./list.js')
 * 	-- 获取的数据：{__esModule: true, get_label: ƒ, get_list: ƒ}，可以获取到 './list.js' 文件夹下的所有export导出的方法  
 * 
 */
const requireApi = require.context(
	// api 目录的相对路径
	'.',
	// 是否查询子目录
	false,
	// 查询文件的一个后缀
	/.js$/
);

// console.log( requireApi('./list.js') );

let module = {}
requireApi.keys().forEach((key,index) => {
	if(key === './index.js') return
	// console.log(key);  // ./list.js
	Object.assign( module,requireApi(key) )
})

// console.log(module);
export default module
