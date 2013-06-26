/**
 * @fileOverview TipsView
 * @author 莫争 <gaoli.gl@taobao.com>
 * @version 1.0
 */

KISSY.add('demo/TipsView', function(S, MVC, XTemplate) {

  var TIPS_T = null;

  var TPL_TIPS = new XTemplate([
    '<div class="{{#if status}}tips-bd{{else}}tips-bd error{{/if}}">',
      '<i class="{{#if status}}icon-ok{{else}}icon-remove{{/if}}"></i>',
      '{{message}}',
    '</div>'
  ].join(''));

  /**
   * TipsView
   */
  var TipsView = function() {
    var self = this;

    TipsView.superclass.constructor.apply(this, arguments);
    self.$el   = self.get('el');
    self.model = self.get('model');
  };

  S.extend(TipsView, MVC.View, {
    render: function() {
      var self = this;

      // 清除定时
      TIPS_T && clearTimeout(TIPS_T);

      // 拼装内容 && 展示动画
      self.$el.html(TPL_TIPS.render(self.model.toJSON()))
              .slideDown(0.2);

      // 创建定时
      TIPS_T = setTimeout(function() {
        self.$el.slideUp(0.2);
      }, 1000);
    }
  }, {
    ATTRS: {
      el: {
        value: '#J_Tips'
      }
    }
  });

  return TipsView;

}, {

  requires: ['mvc', 'xtemplate']

});