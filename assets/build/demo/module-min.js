KISSY.add("demo/module",function(e,n,a,s,t,d){var c=e.all,m=new s,r=function(){this.el=c("#J_Module"),this.events={"click a":"renderMethod"},this.init()};return e.extend(r,a),r.prototype.init=function(){this.render(),r.superclass.constructor.call(this),this.el.one("a").fire("click")},r.prototype.render=function(){var a,s=this,t=[];a=["<ul>","{{#modules}}","<li>",'<a href="javascript:;" data-name="{{name}}" data-index="{{index}}">',"{{name}}","</a>","</li>","{{/modules}}","</ul>"].join(""),e.each(n,function(e,n){t.push({name:e.name,index:n})});var c=new d(a).render({modules:t});s.el.html(c)},r.prototype.renderMethod=function(e){var n=this,a=c(e.currentTarget),s=a.attr("data-name"),t=parseInt(a.attr("data-index"));a.addClass("current"),n.prevTarget&&n.prevTarget.html()!==s&&n.prevTarget.removeClass("current"),n.prevTarget=a,n._render("list"),n._set("module",s),m.render(t)},r},{requires:["demo/api","demo/base","demo/method","node","xtemplate"]});