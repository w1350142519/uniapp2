(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/list/list"],{"2f79":function(t,e,n){"use strict";var a=n("81ee"),i=n.n(a);i.a},3554:function(t,e,n){"use strict";(function(t){function a(t){return l(t)||r(t)||o(t)||i()}function i(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function o(t,e){if(t){if("string"===typeof t)return c(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?c(t,e):void 0}}function r(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function l(t){if(Array.isArray(t))return c(t)}function c(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=function(){n.e("components/list/list-item").then(function(){return resolve(n("a692"))}.bind(null,n)).catch(n.oe)},u={components:{listItem:s},props:{tab:{type:Array,default:function(){return[]}},activeIndex:{type:Number,default:0}},name:"list",data:function(){return{list:[],listCatchData:{},load:{},pageSize:2}},watch:{tab:function(t){0!==t.length&&(this.listCatchData={},this.load={},this.getList(this.activeIndex))}},created:function(){var e=this;t.$on("update_article",(function(t){console.log(t),"follow"===t&&(e.listCatchData={},e.load={},e.getList(e.activeIndex))}))},methods:{loadmore:function(){"noMore"!==this.load[this.activeIndex].loading&&(this.load[this.activeIndex].page++,console.log("触发上拉"),this.getList(this.activeIndex))},change:function(t){var e=t.detail.current;this.$emit("change",e),this.listCatchData[e]&&0!==this.listCatchData[e].length||this.getList(e)},getList:function(t){var e=this;this.load[t]||(this.load[t]={page:1,loading:"loading"}),console.log(this.load[t].page),this.$api.get_list({name:this.tab[t].name,page:this.load[t].page,pageSize:this.pageSize}).then((function(n){console.log(n);var i=n.data;if(0===i.length){var o={loading:"noMore"};return o.page=e.load[t].page,e.$set(e.load,t,o),void e.$forceUpdate()}var r=e.listCatchData[t]||[];r.push.apply(r,a(i)),e.$set(e.listCatchData,t,r)}))}}};e.default=u}).call(this,n("543d")["default"])},"728f":function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return a}));var i=function(){var t=this,e=t.$createElement;t._self._c},o=[]},"81ee":function(t,e,n){},"9b14":function(t,e,n){"use strict";n.r(e);var a=n("3554"),i=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);e["default"]=i.a},e2fb:function(t,e,n){"use strict";n.r(e);var a=n("728f"),i=n("9b14");for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);n("2f79");var r,l=n("f0c5"),c=Object(l["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],r);e["default"]=c.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/list/list-create-component',
    {
        'components/list/list-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("e2fb"))
        })
    },
    [['components/list/list-create-component']]
]);