(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my-article/my-article"],{"2ae8":function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r={data:function(){return{lists:[]}},onLoad:function(){this.getMyArticle()},methods:{getMyArticle:function(){var n=this;this.$api.get_my_article().then((function(t){console.log(t);var e=t.data;n.lists=e}))}}};t.default=r},3660:function(n,t,e){"use strict";(function(n){e("3e87");r(e("66fd"));var t=r(e("f49f"));function r(n){return n&&n.__esModule?n:{default:n}}wx.__webpack_require_UNI_MP_PLUGIN__=e,n(t.default)}).call(this,e("543d")["createPage"])},7730:function(n,t,e){"use strict";e.d(t,"b",(function(){return u})),e.d(t,"c",(function(){return o})),e.d(t,"a",(function(){return r}));var r={uniLoadMore:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uni-load-more/components/uni-load-more/uni-load-more")]).then(e.bind(null,"ba37"))},listCard:function(){return e.e("components/list-card/list-card").then(e.bind(null,"1053"))}},u=function(){var n=this,t=n.$createElement;n._self._c},o=[]},e635:function(n,t,e){"use strict";e.r(t);var r=e("2ae8"),u=e.n(r);for(var o in r)"default"!==o&&function(n){e.d(t,n,(function(){return r[n]}))}(o);t["default"]=u.a},f49f:function(n,t,e){"use strict";e.r(t);var r=e("7730"),u=e("e635");for(var o in u)"default"!==o&&function(n){e.d(t,n,(function(){return u[n]}))}(o);var i,a=e("f0c5"),c=Object(a["a"])(u["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],i);t["default"]=c.exports}},[["3660","common/runtime","common/vendor"]]]);