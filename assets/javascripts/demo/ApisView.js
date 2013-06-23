/**
 * @fileOverview ApisView
 * @author 莫争 <gaoli.gl@taobao.com>
 * @version 1.0
 */

KISSY.add('demo/ApisView', function(S, MVC, ApiView) {

  var $ = S.all;

  var TPL_APIS = [
    '<div class="tab">',
      '<a href="javascript:;" class="J_Tab" title="核心模块集" data-api-id="core">core</a>',
      '<a href="javascript:;" class="J_Tab" title="扩展模块集" data-api-id="components">components</a>',
    '</div>',
    '<div id="J_Api" class="api"></div>'
  ];

  /**
   * ApisView
   */
  var ApisView = function() {
    var self = this;

    ApisView.superclass.constructor.apply(this, arguments);
    self.models = self.get('models');
    self.models.on('afterModelsChange', function(e) {
      S.each(e.target.get('models'), function(model) {
        model.validate();
        $('#J_Api').append(new ApiView({model: model}).render());
      });
    });
  };

  S.extend(ApisView, MVC.View, {
    render: function() {
      var self = this,
          $el  = self.get('el'),
          winH = $(window).height();

      $el.html(TPL_APIS.join(''));
      $('#J_Api').css('height', winH - 144);
      return self;
    },

    /**
     * switch
     * @param {Number} index
     */
    switch: function(index) {
      var self = this,
          $el  = self.get('el');

      $el.all('a.J_Tab')
         .item(index).addClass('current')
         .siblings().removeClass('current');

      $el.all('ul.J_Modules')
        .item(index).show()
        .siblings().hide();
    },

    tab   : function(e) {
      var $target = $(e.target),
          id      = $target.attr('data-api-id');

      MVC.Router.navigate('/api/' + id);
    }
  }, {
    ATTRS: {
      el: {
        value: '#J_SidebarBd'
      },
      events: {
        value: {
          '.J_Tab': {
            'click': 'tab'
          }
        }
      }
    }
  });

  return ApisView;

}, {

  requires: ['mvc', 'demo/ApiView']

});