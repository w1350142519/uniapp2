(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/likes/likes"],{bbca:function(t,n,e){},c917:function(t,n,e){"use strict";e.d(n,"b",(function(){return c})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){return i}));var i={uniIcons:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(e.bind(null,"58a0"))}},c=function(){var t=this,n=t.$createElement;t._self._c},o=[]},c95c:function(t,n,e){"use strict";e.r(n);var i=e("cad3"),c=e.n(i);for(var o in i)"default"!==o&&function(t){e.d(n,t,(function(){return i[t]}))}(o);n["default"]=c.a},cad3:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={props:{item:{type:Object,default:function(){return{}}},types:{type:String,default:""}},name:"likes",data:function(){return{like:!1}},watch:{item:function(t){this.like=this.item.is_like}},created:function(){this.like=this.item.is_like},methods:{likeTap:function(t){this.like=!this.like,this.setUpdateLikes(),console.log("收藏成功")},setUpdateLikes:function(){var n=this;t.showLoading(),this.$api.update_like({user_id:"61c1cb8e79641200015b573a",article_id:this.item._id}).then((function(e){t.hideLoading(),t.showToast({title:n.like?"收藏成功":"取消收藏",icon:"none"}),t.$emit("update_article",n.types),console.log(e)})).catch((function(){t.hideLoading()}))}}};n.default=e}).call(this,e("543d")["default"])},e5ff:function(t,n,e){"use strict";e.r(n);var i=e("c917"),c=e("c95c");for(var o in c)"default"!==o&&function(t){e.d(n,t,(function(){return c[t]}))}(o);e("fb7a");var u,a=e("f0c5"),s=Object(a["a"])(c["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],u);n["default"]=s.exports},fb7a:function(t,n,e){"use strict";var i=e("bbca"),c=e.n(i);c.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/likes/likes-create-component',
    {
        'components/likes/likes-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("e5ff"))
        })
    },
    [['components/likes/likes-create-component']]
]);