/**
 * @fileOverview DemosView
 * @author 莫争 <gaoli.gl@taobao.com>
 * @version 1.0
 */

KISSY.add('demo/DemosView', function(S, MVC, XTemplate) {

  var $ = S.all;

  var TPL_DEMOS_HD = new XTemplate([
    '<a href="#!/add/{{id}}?p={{p}}" class="add">+ 添加</a>',
    '<h1>{{p}}</h1>'
  ].join(''));

  var TPL_DEMOS_BD = new XTemplate([
    '<ul>',
      '{{#demos}}',
        '<li class="demo">',
          '<div class="demo-bd">' +
            '<a class="demo-link" href="#!/detail/{{id}}"></a>',
          '</div>',
          '<div class="demo-ft">{{intro}}</div>',
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
    self.$el      = self.get('el');
    self.models   = self.get('models');
    self.$demosHd = $('#J_DemosHd');
    self.$demosBd = $('#J_DemosBd');

    self.models.on('afterModelsChange', function() {
      self.$demosHd.html(TPL_DEMOS_HD.render({
        id: self.models.get('id'),
        p : self.models.get('p')
      }));
      self.$demosBd.html(TPL_DEMOS_BD.render({
        demos: self.models.toJSON()
      }));
    });
  };

  S.extend(DemosView, MVC.View, {}, {
    ATTRS: {
      el: {
        value: '#J_Demos'
      }
    }
  });

  return DemosView;

}, {

  requires: ['mvc', 'xtemplate']

});