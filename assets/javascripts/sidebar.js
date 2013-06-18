/**
 * @fileOverview Sidebar.js
 * @author 莫争 <gaoli.gl@taobao.com>
 * @version 1.0
 */

KISSY.add('demo/sidebar', function(S, Base, List, Node, XTemplate) {

  var $    = S.all,
      LIST = new List();

  /**
   * Sidebar
   */
  var Sidebar = function() {
    this.el        = $('#J_Sidebar');
    this.elHd      = $('#J_SidebarHd');
    this.elBd      = $('#J_SidebarBd');
    this.modulesHd = $('#J_ModulesHd');
    this.modulesBd = $('#J_ModulesBd');
    this.events = {
      'click #J_ModulesHd a': 'getApi',
      'click .J_Module'     : 'toggle',
      'click .J_Subcat'     : 'toggle',
      'click .J_Entrie'     : 'toggle'
    };
    this.init();
  };

  /**
   * 基础继承类
   */
  S.extend(Sidebar, Base);

  /**
   * 程序初始化
   */
  Sidebar.prototype.init = function() {
    Sidebar.superclass.constructor.call(this);
    this.bind();

    // 默认触发 core
    this.modulesHd.one('a').fire('click');
  };

  /**
   * 渲染界面
   * @param {Object} api
   */
  Sidebar.prototype.render = function(api) {
    var self = this,
        tpl, buffer;

    tpl = [
      '{{#api}}',
        '<ul class="modules">',
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
      '{{/api}}'
    ];

    // 添加标识
    S.each(api.subcls, function(module) {
      module.subcat  ? module.hasSubcat  = true : '';
      module.subcls  ? module.hasSubcls  = true : '';
      module.entries ? module.hasEntries = true : '';
    });

    buffer = new XTemplate(tpl.join('')).render({api: api});
    self.modulesBd.html(buffer);
  };

  /**
   * 事件绑定
   */
  Sidebar.prototype.bind = function() {
    var self = this;

    $(window).on('hashchange', function() {
      var queryId = location.hash.replace(/#!\/(.+)\//, '$1');

      if (queryId && queryId !== '#') {
        self._render('list');
        LIST.render(queryId);
      }
    });
  };

  /**
   * 获取 API
   */
  Sidebar.prototype.getApi = function(e) {
    var self   = this,
        target = $(e.currentTarget),
        apiMod = target.attr('data-api-mod');

    target.addClass('current')
          .siblings().removeClass('current');

    S.use(apiMod, function(S, api) {
      self.render(api);
    });
  };

  /**
   * 展开收起
   */
  Sidebar.prototype.toggle = function(e) {
    var self   = this,
        target = $(e.currentTarget),
        name   = target.attr('data-name'),
        type   = target.attr('data-type');

    switch (type) {

      case 'module':
        var moduleName = self._get('module'),
            moduleEl   = self._get('moduleEl'),
            subcatEl   = self._get('subcatEl'),
            entrieEl   = self._get('entrieEl');

        if (moduleName !== name) {

          moduleEl && moduleEl.siblings().slideUp(0.2) && self.toggleIcon(moduleEl, false);
          subcatEl && subcatEl.siblings().slideUp(0.2);
          entrieEl && entrieEl.removeClass('current');

          self._set('module', name);
          self._set('subcat', null);
          self._set('entrie', null);
          self._set('moduleEl', target);
          self._set('subcatEl', null);
          self._set('entrieEl', null);

          target.siblings().slideUp(0.2);
        }

        self.toggleIcon(target);
        target.siblings().slideToggle(0.2);
        break;

      case 'subcat':
        var subcatName = self._get('subcat'),
            subcatEl   = self._get('subcatEl'),
            entrieEl   = self._get('entrieEl');

        if (subcatName !== name) {

          subcatEl && subcatEl.siblings().slideUp(0.2);
          entrieEl && entrieEl.removeClass('current');

          self._set('subcat', name);
          self._set('entrie', null);
          self._set('subcatEl', target);
          self._set('entrieEl', null);

        }

        target.siblings().slideToggle(0.2);
        break;

      case 'entrie':
        $('.J_Entrie', self.modulesBd).removeClass('current');
        target.addClass('current');

        self._set('entrie', name);
        self._set('entrieEl', target);
        break;

    }

    // 设置浏览器 hash 值
    location.hash =  '!/' + self._makeQueryId() + '/';
  };

  /**
   * 图标切换
   * @param {Object}  el
   * @param {Boolean} state
   */
  Sidebar.prototype.toggleIcon = function(el, state) {
    var iconEl         = el.one('i'),
        rightIconClass = 'icon-caret-right',
        downIconClass  = 'icon-caret-down';

    state === undefined ? state = true : '';

    if (iconEl.hasClass(rightIconClass) && state) {
      iconEl.addClass(downIconClass)
            .removeClass(rightIconClass);
    } else {
      iconEl.addClass(rightIconClass)
            .removeClass(downIconClass);
    }
  };


  return Sidebar;

}, {

  requires: ['demo/base', 'demo/list', 'node', 'xtemplate']

});