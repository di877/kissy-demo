KISSY.add("demo/config",function(e,t,s,i){var a=e.all,r=function(){this.el=a("#J_Config"),this.init()};return e.extend(r,t),r.prototype.init=function(){r.superclass.constructor.call(this)},r.prototype.render=function(e){var t,s=this;if(!e)var e={module:s._makeQueryId()};t=["{{#demo}}",'<div class="config-hd">',"<h2>{{module}}</h2>","</div>",'<div class="config-bd">',"<ul>","<li>",'<input id="J_Author" class="txt" value="{{author}}" placeholder="作者">','<label class="icon-user" for="J_Author"></label>',"</li>","<li>",'<input id="J_Intro" class="txt" value="{{intro}}" placeholder="描述">','<label class="icon-edit" for="J_Intro"></label>',"</li>","</ul>","</div>","{{/demo}}"].join("");var a=new i(t).render({demo:e});s.el.html(a)},r.prototype.getDemoConfig=function(){var e=this,t=a("#J_Intro"),s=a("#J_Author");return{module:e._makeQueryId(),intro:t.val(),author:s.val()}},r},{requires:["demo/base","node","xtemplate"]});