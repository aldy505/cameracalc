(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{206:function(t,e,n){var content=n(211);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(48).default)("7ce1fccc",content,!0,{sourceMap:!1})},210:function(t,e,n){"use strict";var o=n(206);n.n(o).a},211:function(t,e,n){(e=n(47)(!1)).push([t.i,".card{width:100%!important}",""]),t.exports=e},215:function(t,e,n){"use strict";n.r(e);n(46);var o=n(17),l=(n(10),n(79),n(57)),r=n.n(l),c=n(208),h=n.n(c),d={components:{},data:function(){return{LightNameList:[],LightDataList:[],output:"",textLightDetail:"Click here if you're interested on the light's detail",isLightDetail:!0,LightDetail:""}},methods:{toggleLightDetail:function(){this.isLightDetail=!this.isLightDetail,this.textLightDetail=this.isLightDetail?"Click here if you're interested on the light's detail":"Click here to hide the details"},lightsUpdate:function(){var t=$("#type").val();this.LightNameList=h.a.chain(this.LightDataList).filter(["Type",t]).map((function(t){return _.omit(t,["Type","Style","Color_Temp","Beam_Angle","Tungsten","Daylight","Spot_Diameter","Watts","Battery_Plate","Dimmable","CRI","TLCI","Voltage","Amps","Imperial_Measurement","Metric_Measurement","Flicker_Free","Ballast","Remote_Control"])})).value()},CalculatePhotometrics:function(){var t=3.281*parseInt($("#distance").val()),e=$("#lightname").val();if(""==t||null==t||null==t)this.output='<strong class="text-warning">Please fill object distance number</strong>',this.LightDetail="<p>Please put some number in object distance</p>";else if(""!=t){var n=h.a.chain(this.LightDataList).find(["Light_Name",e]).value(),o="";if("n/a"===n.Tungsten[0].FC){o="Daylight only";var l=25*(isNaN(n.Daylight[0].FC)?n.Daylight[0].FC.replace(/,/g,""):n.Daylight[0].FC)/Math.pow(t,2);l=parseFloat(Math.round(100*l)/100).toFixed(0),this.output='<strong class="text-success">You will get '.concat(l," footcandle or ")+parseFloat(Math.round(10.764*l*100)/100).toFixed(0)+" lux.</strong>"}else if("n/a"===n.Daylight[0].FC){o="Tungsten only";var r=25*(isNaN(n.Tungsten[0].FC)?n.Tungsten[0].FC.replace(/,/g,""):n.Tungsten[0].FC)/Math.pow(t,2);r=parseFloat(Math.round(100*r)/100).toFixed(0),this.output='<strong class="text-success">You will get '.concat(r," footcandle or ")+parseFloat(Math.round(10.764*r*100)/100).toFixed(0)+" lux.</strong>"}else{o="Bicolor";var c=25*(isNaN(n.Daylight[0].FC)?n.Daylight[0].FC.replace(/,/g,""):n.Daylight[0].FC)/Math.pow(t,2);c=parseFloat(Math.round(100*c)/100).toFixed(0);var d=25*(isNaN(n.Tungsten[0].FC)?n.Tungsten[0].FC.replace(/,/g,""):n.Tungsten[0].FC)/Math.pow(t,2);d=parseFloat(Math.round(100*d)/100).toFixed(0),this.output='<strong class="text-success">You will get '.concat(c," footcandle or ")+parseFloat(Math.round(10.764*c*100)/100).toFixed(0)+" lux for daylight color temperature.\n                                <br>and ".concat(d," footcandle or ")+parseFloat(Math.round(10.764*d*100)/100).toFixed(0)+" lux for tungsten color temperature.</strong>"}this.LightDetail="<ul><li>Light name: ".concat(n.Light_Name,"</li>\n                                <li>Light style: ").concat(n.Style,"</li>\n                                <li>Color temperature: ").concat(n.Color_Temp," (").concat(o,")</li>\n                                <li>Watts: ").concat(n.Watts," (").concat(n.Amps[0]["120V"]," amps)</li>\n                                <li>Battery plate: ").concat(n.Battery_Plate,"</li>\n                                <li>Dimmable: ").concat(n.Dimmable,"</li>\n                                <li>CRI: ").concat(n.CRI,"</li>\n                                <li>TLCI: ").concat(n.TLCI,"</li>\n                                <li>Weight: ").concat(n.Metric_Measurement[0].Weight," kg / ").concat(n.Imperial_Measurement[0].Weight," pounds</li>\n                                </ul>")}else this.output='<strong class="text-danger>Some error happened for the calculation</strong>'}},created:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var n,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{Accept:"application/json"}},e.prev=1,e.next=4,r.a.get("https://api.npoint.io/5c6005c5820933adf98e/Photometrics",n);case 4:o=e.sent,t.LightDataList=h.a.chain(o.data).value(),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),console.log("Error during axios: "+e.t0);case 11:case"end":return e.stop()}}),e,null,[[1,8]])})))()}},m=(n(210),n(39)),component=Object(m.a)(d,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"body container"},[t._m(0),n("form",[n("div",{staticClass:"row"},[n("div",{staticClass:"col-4 mt-2"},[t._v("Select category:")]),n("div",{staticClass:"col-8 mt-2"},[n("select",{staticClass:"inp3 form-control",attrs:{id:"type"},on:{change:t.lightsUpdate}},[n("option",[t._v("LED")]),n("option",[t._v("HMI")]),n("option",[t._v("Tungsten")]),n("option",[t._v("Fluorescent")])])])]),n("div",{staticClass:"row"},[n("div",{staticClass:"col-4 mt-2"},[t._v("Select lights:")]),n("div",{staticClass:"col-8 mt-2"},[n("select",{staticClass:"inp3 form-control",attrs:{id:"lightname"},on:{change:t.CalculatePhotometrics}},t._l(t.LightNameList,(function(e){return n("option",{key:e.Light_Name},[t._v(t._s(e.Light_Name))])})),0)])]),n("div",{staticClass:"row"},[n("div",{staticClass:"col-4 mt-2"},[t._v("Object distance (in meter):")]),n("div",{staticClass:"col-8 mt-2"},[n("input",{staticClass:"inp3 form-control",attrs:{id:"distance",type:"number"},on:{change:t.CalculatePhotometrics}})])]),n("div",{staticClass:"d-block mt-2"},[n("span",{domProps:{innerHTML:t._s(t.output)}})])]),n("div",{staticClass:"row mt-3"},[n("button",{staticClass:"btn btn-block btn-outline-primary",attrs:{type:"button"},domProps:{innerHTML:t._s(t.textLightDetail)},on:{click:t.toggleLightDetail}})]),n("div",{staticClass:"row mt-3",class:{"d-none":t.isLightDetail}},[n("div",{staticClass:"card bg-light p-3 d-block lightdetail"},[n("span",{domProps:{innerHTML:t._s(t.LightDetail)}})])])])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"row"},[e("h2",[this._v("Footcandle/Lux within distance")])])}],!1,null,null,null);e.default=component.exports}}]);