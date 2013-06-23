/**
 * @fileOverview router
 * @author 莫争 <gaoli.gl@taobao.com>
 * @version 1.0
 */

KISSY.add('demo/router', function(S, MVC, ApisView, ApiCollection) {

  /**
   * Route
   */
  var Router = function() {
    var self = this;

    Router.superclass.constructor.apply(self, arguments);
    self.apiCollection = new ApiCollection().load();
    self.apisView      = new ApisView({models: self.apiCollection}).render();
  };

  S.extend(Router, MVC.Router, {
    index: function() {
      MVC.Router.navigate('/api/core');
    },

    api  : function(path) {
      var self  = this,
          id    = path.id,
          index = id === 'core' ? 0 : 1;

      self.apisView.switch(index);
    }
  }, {
    /**
     * route 配置
     */
    ATTRS: {
      routes: {
        value: {
          ''        : 'index',
          '/api/:id': 'api'
        }
      }
    }
  });

  return Router;

}, {

  requires: ['mvc', 'demo/ApisView', 'demo/ApiCollection']

});