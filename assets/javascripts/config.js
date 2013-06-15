/**
 * @fileoverview config.js
 * @author 莫争 <gaoli.gl@taobao.com>
 * @version 1.0
 */

KISSY.add('demo/config', function(S, Base, Node, XTemplate) {

  var $ = S.all;
  /**
   * Config
   */
  var Config = function() {
    this.el = $('#J_Config');
    this.init();
  };

  /**
   * 基础继承类
   */
  S.extend(Config, Base);

  /**
   * 程序初始化
   */
  Config.prototype.init = function() {
    Config.superclass.constructor.call(this);
  };

  /**
   * 渲染界面
   * @param {Object} demo
   */
  Config.prototype.render = function(demo) {
    var self = this,
        tpl;

    if (!demo) {
      var demo = {
        module: self._makeQueryId()
      };
    }

    tpl = [
      '{{#demo}}',
        '<div class="config-hd">',
          '<h2>{{module}}</h2>',
        '</div>',
        '<div class="config-bd">',
          '<ul>',
            '<li>',
              '<input id="J_Author" class="txt" value="{{author}}" placeholder="作者">',
              '<label class="icon-user" for="J_Author"></label>',
            '</li>',
            '<li>',
              '<input id="J_Intro" class="txt" value="{{intro}}" placeholder="描述">',
              '<label class="icon-edit" for="J_Intro"></label>',
            '</li>',
          '</ul>',
        '</div>',
      '{{/demo}}'
    ].join('');

    var buffer = new XTemplate(tpl).render({demo: demo});

    self.el.html(buffer);
  };

  /**
   * 获取 DEMO 配置
   * @return {Object}
   */
  Config.prototype.getDemoConfig = function() {
    var self     = this,
        introEl  = $('#J_Intro'),
        authorEl = $('#J_Author');

    return {
      module: self._makeQueryId(),
      intro : introEl.val(),
      author: authorEl.val()
    };
  };

  return Config;

}, {

  requires: ['demo/base', 'node', 'xtemplate']

});