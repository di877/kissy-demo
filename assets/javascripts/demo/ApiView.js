/**
 * @fileOverview ApiView
 * @author 莫争 <gaoli.gl@taobao.com>
 * @version 1.0
 */

KISSY.add('demo/ApiView', function(S, MVC, XTemplate) {

  var $ = S.all;

  var TPL_API = new XTemplate([
    '{{#api}}',
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
    '{{/api}}',
  ].join(''));

  /**
   * ApiView
   */
  var ApiView = function() {
    var self = this;

    ApiView.superclass.constructor.apply(this, arguments);
    self.$el   = self.get('el');
    self.model = self.get('model');
    self.model.on('afterModuleChange', function(e) {

    });
  };

  S.extend(ApiView, MVC.View, {
    render: function() {
      var self = this;

      return self.$el.html(TPL_API.render({api: self.model.toJSON()}));
    },

    /**
     * toggle
     */
    toggle: function(e) {
      var self   = this,
          target = $(e.currentTarget),
          name   = target.attr('data-name'),
          type   = target.attr('data-type');

      var moduleEl = self.model.get('moduleEl'),
          subcatEl = self.model.get('subcatEl'),
          entrieEl = self.model.get('entrieEl');

      switch (type) {
        case 'module':

          if (name !== self.model.get('module')) {
            moduleEl && moduleEl.siblings().slideUp(0.2);
            subcatEl && subcatEl.siblings().slideUp(0.2);
            entrieEl && entrieEl.removeClass('current');

            self.model.set({
              'module'  : name,
              'subcat'  : null,
              'entrie'  : null,
              'moduleEl': target,
              'subcatEl': null,
              'entrieEl': null
            });

            target.siblings().slideUp(0.2);
          }

          target.siblings().slideToggle(0.2);
          break;

        case 'subcat':

          if (name !== self.model.get('subcat')) {
            subcatEl && subcatEl.siblings().slideUp(0.2);
            entrieEl && entrieEl.removeClass('current');

            self.model.set({
              'subcat'  : name,
              'entrie'  : null,
              'subcatEl': target,
              'entrieEl': null
            });
          }

          target.siblings().slideToggle(0.2);
          break;

        case 'entrie':
          self.$el.all('.J_Entrie').removeClass('current');
          target.addClass('current');

          self.model.set({
            'entrie'  : name,
            'entrieEl': target
          });
          break;
      }
    }
  }, {
    ATTRS: {
      el: {
        value: '<ul class="J_Modules modules"></ul>'
      },
      events: {
        value: {
          '.J_Module': {
            click: 'toggle'
          },
          '.J_Subcat': {
            click: 'toggle'
          },
          '.J_Entrie': {
            click: 'toggle'
          }
        }
      }
    }
  });

  return ApiView;

}, {

  requires: ['mvc', 'xtemplate']

});