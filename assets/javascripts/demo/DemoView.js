/**
 * @fileOverview DemoView
 * @author 莫争 <gaoli.gl@taobao.com>
 * @version 1.0
 */

KISSY.add('demo/DemoView', function(S, MVC, XTemplate) {

  var TPL_DEMO = new XTemplate([
    '{{#demo}}',
      '<li class="demo">',
        '<div class="demo-bd"></div>',
        '<div class="demo-ft">',
          '<a href="javascript:;" data-id="{{id}}">',
            '{{intro}}',
          '</a>',
        '</div>',
      '</li>',
    '{{/demo}}'
  ].join(''));

  /**
   * DemoView
   */
  var DemoView = function() {
    var self = this;

    DemoView.superclass.constructor.apply(this, arguments);
    self.$el   = self.get('el');
    self.model = self.get('model');
  };

  S.extend(DemoView, MVC.View, {
    render: function() {
      var self = this;

      self.$el.html(TPL_DEMO.render({demo: self.model.toJSON()}));

      return self;
    }
  }, {
    ATTRS: {
      el: {
        value: '<ul></ul>'
      }
    }
  });

  return DemoView;

}, {

  requires: ['mvc', 'xtemplate']

});