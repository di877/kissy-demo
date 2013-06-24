/**
 * @fileOverview DemosView
 * @author 莫争 <gaoli.gl@taobao.com>
 * @version 1.0
 */

KISSY.add('demo/DemosView', function(S, MVC, XTemplate, DemoView) {

  var $ = S.all;

  var TPL_DEMOS = new XTemplate([
    '<header id="J_ListHd" class="main-hd">',
      '<a href="javascript:;" id="J_Add" class="add">+ 添加</a>',
      '<h1>{{title}} DEMO</h1>',
    '</header>',
    '<div id="J_ListBd" class="main-bd">',
      '<ul>',
        '{{#demos}}',
          '<li class="demo">',
            '<div class="demo-bd"></div>',
            '<div class="demo-ft">',
              '<a href="javascript:;" data-id="{{id}}">',
                '{{intro}}',
              '</a>',
            '</div>',
          '</li>',
        '{{/demos}}',
      '</ul>',
    '</div>'
  ].join(''));

  /**
   * DemosView
   */
  var DemosView = function() {
    var self = this;

    DemosView.superclass.constructor.apply(this, arguments);
    self.$el    = self.get('el');
    self.models = self.get('models');
    self.get('models').on('afterModelsChange', function() {
      self.render();
    });
  };

  S.extend(DemosView, MVC.View, {
    render: function() {
      var self = this;

      console.log(self.models);

      self.$el.html(TPL_DEMOS.render({
        demos: self.models.toJSON()
      }))
    }
  }, {
    ATTRS: {
      el: {
        value: '#J_List'
      }
    }
  });

  return DemosView;

}, {

  requires: ['mvc', 'xtemplate', 'demo/DemoView']

});