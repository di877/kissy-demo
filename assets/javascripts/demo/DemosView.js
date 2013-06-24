/**
 * @fileOverview DemosView
 * @author 莫争 <gaoli.gl@taobao.com>
 * @version 1.0
 */

KISSY.add('demo/DemosView', function(S, MVC, XTemplate, DemoView) {

  var $ = S.all;

  var TPL_LIST = [
    '<header id="J_ListHd" class="main-hd">',
      '<a href="javascript:;" id="J_Add" class="add">+ 添加</a>',
      '<h1></h1>',
    '</header>',
    '<div id="J_ListBd" class="main-bd"></div>'
  ];

  var TPL_DEMOS = new XTemplate([
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
    '</ul>'
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
      $('#J_ListBd').html(TPL_DEMOS.render({
        demos: self.models.toJSON()
      }))
    });
  };

  S.extend(DemosView, MVC.View, {
    render: function() {
      var self = this;

      self.$el.html(TPL_LIST.join(''));
      return self;
    },

    /**
     * 设置标题
     */
    setTitle: function(title) {
      var self = this;

      self.$el.one('h1').html(title + ' DEMO');
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