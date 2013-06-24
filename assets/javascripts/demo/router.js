/**
 * @fileOverview router
 * @author 莫争 <gaoli.gl@taobao.com>
 * @version 1.0
 */

KISSY.add('demo/router', function(S, MVC, ApisView, ApiCollection, DemosView, DemoCollection) {

  /**
   * Route
   */
  var Router = function() {
    var self = this;

    Router.superclass.constructor.apply(self, arguments);
    self.apiCollection  = new ApiCollection().load();
    self.apisView       = new ApisView({models: self.apiCollection}).render();
    self.demoCollection = new DemoCollection();
    self.demosView      = new DemosView({models: self.demoCollection}).render();
  };

  S.extend(Router, MVC.Router, {
    index: function() {
      MVC.Router.navigate('/api/core');
    },

    api  : function(path, query) {
      var self  = this,
          id    = path.id,
          p     = query.p;
          index = id === 'core' ? 0 : 1;

      id && self.apisView.switch(index);
      p  && self.demoCollection.load({
        data   : {
          p: p
        },
        success: function() {
          self.demosView.setTitle(p);
        }
      });
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

  requires: ['mvc', 'demo/ApisView', 'demo/ApiCollection', 'demo/DemosView', 'demo/DemoCollection']

});