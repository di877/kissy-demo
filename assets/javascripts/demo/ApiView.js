/**
 * @fileOverview ApiView
 * @author 莫争 <gaoli.gl@taobao.com>
 * @version 1.0
 */

KISSY.add('demo/ApiView', function(S, MVC, XTemplate) {

  var TPL_API = new XTemplate([
    '{{#api}}',
      '<ul class="J_Modules modules">',
        '{{#subcls}}',
          '<li class="module">',
              '<p class="J_Module module-name" data-name="{{name}}" data-type="module"><i class="icon-caret-right"></i>{{name}}</span>',

              '{{#hasEntries}}',
                '<ul class="entries">',
                  '{{#entries}}',
                    '<li class="J_Entrie entrie" data-name="{{name}}" data-type="entrie">',
                      '<p class="entrie-name">{{name}}</p>',
                      '<p class="entrie-desc">{{desc}}</p>',
                    '</li>',
                  '{{/entries}}',
                '</ul>',
              '{{/hasEntries}}',

              '{{#hasSubcat}}',
                '<ul class="subcats">',
                  '{{#subcat}}',
                    '<li class="subcat">',
                      '<p class="J_Subcat subcat-name" data-name="{{name}}" data-type="subcat">{{name}}</p>',
                      '<ul class="entries">',
                        '{{#entries}}',
                          '<li class="J_Entrie entrie" data-name="{{name}}" data-type="entrie">',
                            '<p class="entrie-name">{{name}}</p>',
                            '<p class="entrie-desc">{{desc}}</p>',
                          '</li>',
                        '{{/entries}}',
                      '</ul>',
                    '</li>',
                  '{{/subcat}}',
                '</ul>',
              '{{/hasSubcat}}',

              '{{#hasSubcls}}',
                '<ul class="entries">',
                  '{{#subcls}}',
                    '<li class="J_Entrie entrie" data-name="{{name}}" data-type="entrie">',
                      '<p class="entrie-name">{{name}}</p>',
                      '<p class="entrie-desc">{{desc}}</p>',
                    '</li>',
                  '{{/subcls}}',
                '</ul>',
              '{{/hasSubcls}}',
          '</li>',
        '{{/subcls}}',
      '</ul>',
    '{{/api}}',
  ].join(''));

  /**
   * ApiView
   */
  var ApiView = function() {
    var self = this;

    ApiView.superclass.constructor.apply(this, arguments);
    self.get('api').on('afterModelsChange', function(e) {
      self.get('el').html(TPL_API.render({api: e.target.toJSON()}));
    });
  };

  S.extend(ApiView, MVC.View, {
    /**
     * switch
     * @param {String} id
     */
    switch: function(id) {
      var self     = this,
          $el      = self.get('el'),
          $modules = $el.all('ul.J_Modules');

      $modules.hide();
      if (id === 'core') {
        $modules.item(0).show();
      } else {
        $modules.item(1).show();
      }
    }
  }, {
    ATTRS: {
      el: {
        value: '#J_Api'
      }
    }
  });

  return ApiView;

}, {

  requires: ['mvc', 'xtemplate']

});