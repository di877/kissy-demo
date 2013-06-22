/**
 * @fileOverview SidebarView
 * @author 莫争 <gaoli.gl@taobao.com>
 * @version 1.0
 */

KISSY.add('demo/SidebarView', function(S, MVC) {

  var $ = S.all;

  var TPL_SIDEBAR = [
    '<div class="sidebar-hd">',
      '<div class="search">',
        '<input value="" placeholder="Search" />',
        '<label class="icon-search" for="J_Search"></label>',
      '</div>',
    '</div>',
    '<div class="sidebar-bd">',
      '<div class="tab">',
        '<a href="javascript:;" class="J_Tab" title="核心模块集" data-api-id="core">core</a>',
        '<a href="javascript:;" class="J_Tab" title="扩展模块集" data-api-id="components">components</a>',
      '</div>',
      '<div id="J_Api" class="api"></div>',
    '</div>'
  ];

  /**
   * SidebarView
   */
  var SidebarView = function() {
    SidebarView.superclass.constructor.apply(this, arguments);
  };

  S.extend(SidebarView, MVC.View, {
    render: function() {
      var self = this,
          $el  = self.get('el');

      $el.html(TPL_SIDEBAR.join(''));
      return self;
    },

    /**
     * switch
     * @param {String} id
     */
    switch: function(id) {
      var self = this,
          $el  = self.get('el'),
          $tab = $el.all('a.J_Tab');

      $tab.removeClass('current');
      if (id === 'core') {
        $tab.item(0).addClass('current');
      } else {
        $tab.item(1).addClass('current');
      }
    },

    tab   : function(e) {
      var $target = $(e.target),
          id      = $target.attr('data-api-id');

      MVC.Router.navigate('/api/' + id);
    }
  }, {
    ATTRS: {
      el: {
        value: '#J_Sidebar'
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

  return SidebarView;

}, {

  requires: ['mvc']

});