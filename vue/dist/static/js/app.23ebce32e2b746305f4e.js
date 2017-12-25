webpackJsonp([1],{"5bW4":function(e,t){},AeCc:function(e,t){},Ay5L:function(e,t){},BH6u:function(e,t){},NHnr:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=i("7+uW"),n={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"App-header"},[t("img",{staticClass:"App-logo",attrs:{src:"favicon.ico",alt:"logo"}}),this._v(" "),t("h1",{staticClass:"App-title"},[this._v(this._s(this.title))])])},staticRenderFns:[]},l=i("VU/8")({name:"GameHeader",data:function(){return{title:"Game of Life"}}},n,!1,function(e){i("vMmd")},"data-v-a93b4230",null).exports,a={name:"GameButtons",props:{clickAction:{type:Function,required:!0}}},r={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"Game-buttons"},[i("button",{attrs:{value:"Random"},on:{click:function(t){e.clickAction("random")}}},[e._v("Random")]),e._v(" "),i("button",{attrs:{value:"Start"},on:{click:function(t){e.clickAction("start")}}},[e._v("Start")]),e._v(" "),i("button",{attrs:{value:"Stop"},on:{click:function(t){e.clickAction("stop")}}},[e._v("Stop")]),e._v(" "),i("button",{attrs:{value:"Reset"},on:{click:function(t){e.clickAction("reset")}}},[e._v("Reset")])])},staticRenderFns:[]},c=i("VU/8")(a,r,!1,function(e){i("uDS5")},"data-v-409e90ee",null).exports,u=i("c/Tr"),o=i.n(u),h=i("BO1k"),f=i.n(h),m={Live:1,Dead:0},d={name:"GameCellule",props:[],created:function(){this.temp_life_state=m.Dead,this.life_state=m.Dead,this.isAlive=!1,this.$parent.$on("gameStateUpdated",this.setGameState)},methods:{is_alive:function(){return this.life_state===m.Live},temp_is_alive:function(){return this.temp_life_state===m.Live},update_temp_state:function(){this.temp_life_state=this.life_state},count_live_neighbor:function(e){var t=0,i=!0,s=!1,n=void 0;try{for(var l,a=f()(e);!(i=(l=a.next()).done);i=!0){l.value.temp_is_alive()&&t++}}catch(e){s=!0,n=e}finally{try{!i&&a.return&&a.return()}finally{if(s)throw n}}return t},is_loneliness:function(e){return this.count_live_neighbor(e)<2},is_overpopulation:function(e){return this.count_live_neighbor(e)>3},revive:function(e){return 3===this.count_live_neighbor(e)},changeState:function(e){this.life_state=e,this.isAlive=e==m.Live},toggleState:function(){this.is_alive()?this.changeState(m.Dead):this.changeState(m.Live)}},data:function(){return{isAlive:!1}}},p={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{staticClass:"Game-cellule",class:[e.isAlive?"Cellule-live":"Cellule-dead",""],on:{click:function(t){e.toggleState()}}})},staticRenderFns:[]},v={name:"GameOfLife",components:{GameCellule:i("VU/8")(d,p,!1,function(e){i("PfDX")},"data-v-10fda621",null).exports},props:{cellulesWidth:[String,Number],cellulesHeight:[String,Number]},created:function(){var e=this;this.cellulesRef=o()(new Array(this.cellulesHeight),function(t,i){return o()(new Array(e.cellulesWidth),function(e,t){return 0})}),this.cellulesArray=o()(new Array(this.cellulesHeight),function(t,i){return o()(new Array(e.cellulesWidth),function(e,t){return[]})}),this.$parent.$on("gameStateUpdated",this.setGameState)},mounted:function(){this.cellulesRef=this.$refs.cellulesRef,this.mapCellulesToArray()},methods:{mapCellulesToArray:function(){var e=this,t=0,i=0;this.cellulesRef.map(function(s){e.cellulesArray[t][i]=s,++i===e.cellulesWidth&&(t++,i=0)})},random_mutate:function(){this.fill_cellules("random")},trigger_reset:function(){this.fill_cellules(m.Dead)},fill_cellules:function(e){for(var t=0;t<this.cellulesHeight;t++)for(var i=0;i<this.cellulesWidth;i++)this.cellulesArray[t][i].changeState("random"===e?Math.round(Math.random()):e)},commute:function(){for(var e=0;e<this.cellulesHeight;e++)for(var t=0;t<this.cellulesWidth;t++)this.cellulesArray[e][t].update_temp_state();for(var i=0;i<this.cellulesHeight;i++)for(var s=0;s<this.cellulesWidth;s++){var n=[];i>0&&s>0&&(n.push(this.cellulesArray[i-1][s-1]),n.push(this.cellulesArray[i][s-1]),n.push(this.cellulesArray[i-1][s])),i<this.cellulesHeight-1&&s<this.cellulesWidth-1&&(n.push(this.cellulesArray[i+1][s+1]),n.push(this.cellulesArray[i][s+1]),n.push(this.cellulesArray[i+1][s])),i>0&&s<this.cellulesWidth-1&&n.push(this.cellulesArray[i-1][s+1]),i<this.cellulesHeight-1&&s>0&&n.push(this.cellulesArray[i+1][s-1]),this.cellulesArray[i][s].is_alive()?(this.cellulesArray[i][s].is_loneliness(n)||this.cellulesArray[i][s].is_overpopulation(n))&&this.cellulesArray[i][s].changeState(m.Dead):this.cellulesArray[i][s].revive(n)&&this.cellulesArray[i][s].changeState(m.Live)}},play:function(){var e=this;this.updateRate=setInterval(function(){e.commute()},50)},stop:function(){clearInterval(this.updateRate)},setGameState:function(e){switch(e){case"random":this.random_mutate();break;case"start":this.play();break;case"stop":this.stop();break;case"reset":this.trigger_reset()}}}},_={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"Game-of-life"},e._l(e.cellulesRef,function(t){return i("span",e._l(t,function(e){return i("span",[i("GameCellule",{ref:"cellulesRef",refInFor:!0})],1)}))}))},staticRenderFns:[]},A={name:"GameArea",components:{GameOfLife:i("VU/8")(v,_,!1,function(e){i("5bW4")},"data-v-bdd2110c",null).exports,GameButtons:c},methods:{changeGameState:function(e){this.$emit("gameStateUpdated",e)}}},g={render:function(){var e=this.$createElement,t=this._self._c||e;return t("section",{staticClass:"Game-area"},[t("GameOfLife",{attrs:{cellulesWidth:50,cellulesHeight:40}}),this._v(" "),t("GameButtons",{attrs:{clickAction:this.changeGameState}})],1)},staticRenderFns:[]},y={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("footer",{attrs:{className:"App-footer"}},[t("strong",{attrs:{className:"Footer-text"}},[this._v("\n    Game of Life - a vue experiment  \n    "),t("a",{attrs:{href:"https://github.com/diegocardoso93/game-of-life",target:"_blank",rel:"noopener noreferrer"}},[this._v("source")])])])}]},G={name:"app",components:{GameHeader:l,GameArea:i("VU/8")(A,g,!1,function(e){i("BH6u")},"data-v-76b1bd86",null).exports,GameFooter:i("VU/8")({name:"GameFooter"},y,!1,function(e){i("Ay5L")},"data-v-0178eb66",null).exports}},b={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("GameHeader"),this._v(" "),t("GameArea"),this._v(" "),t("GameFooter")],1)},staticRenderFns:[]},S=i("VU/8")(G,b,!1,function(e){i("AeCc")},null,null).exports;s.a.config.productionTip=!1,new s.a({el:"#app",template:"<App/>",components:{App:S}})},PfDX:function(e,t){},uDS5:function(e,t){},vMmd:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.23ebce32e2b746305f4e.js.map