(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/tab/tab"],{"1b45":function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e={props:{list:{type:Array,default:function(){return[]}},tabIndex:{type:Number,default:0}},watch:{tabIndex:function(n,t){this.activeIndex=n}},name:"tab",data:function(){return{activeIndex:0}},methods:{clickTab:function(n,t){this.activeIndex=t,this.$emit("tab",{data:n,index:t})},open:function(){n.navigateTo({url:"/pages/home-label/home-label"})}}};t.default=e}).call(this,e("543d")["default"])},"307d":function(n,t,e){},"515c":function(n,t,e){"use strict";var u=e("307d"),a=e.n(u);a.a},"9bc5":function(n,t,e){"use strict";e.r(t);var u=e("1b45"),a=e.n(u);for(var c in u)"default"!==c&&function(n){e.d(t,n,(function(){return u[n]}))}(c);t["default"]=a.a},b123:function(n,t,e){"use strict";e.r(t);var u=e("e2d7"),a=e("9bc5");for(var c in a)"default"!==c&&function(n){e.d(t,n,(function(){return a[n]}))}(c);e("515c");var i,o=e("f0c5"),r=Object(o["a"])(a["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],i);t["default"]=r.exports},e2d7:function(n,t,e){"use strict";e.d(t,"b",(function(){return a})),e.d(t,"c",(function(){return c})),e.d(t,"a",(function(){return u}));var u={uniIcons:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(e.bind(null,"58a0"))}},a=function(){var n=this,t=n.$createElement;n._self._c},c=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/tab/tab-create-component',
    {
        'components/tab/tab-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("b123"))
        })
    },
    [['components/tab/tab-create-component']]
]);
