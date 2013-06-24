/**
 * @fileOverview router
 * @author 莫争 <gaoli.gl@taobao.com>
 * @version 1.0
 */

KISSY.add('demo/router', function(S, MVC, ApiCollection, ApisView, DemoModel, DemoCollection, DemosView, EditView) {

  var $ = S.all;

  /**
   * Route
   */
  var Router = function() {
    var self = this;

    Router.superclass.constructor.apply(self, arguments);

    self.$List          = $('#J_List');
    self.$Edit          = $('#J_Edit');
    self.apiCollection  = new ApiCollection().load();
    self.apisView       = new ApisView({models: self.apiCollection}).render();
    self.demoCollection = new DemoCollection();
    self.demosView      = new DemosView({models: self.demoCollection}).render();
    self.editView       = new EditView({model: new DemoModel()});
  };

  S.extend(Router, MVC.Router, {
    index : function() {
      MVC.Router.navigate('/api/core');
    },

    api   : function(path, query) {
      var self  = this,
          id    = path.id,
          p     = query.p;
          index = id === 'core' ? 0 : 1;

      self.$List.show();
      self.$Edit.hide();

      id && self.apisView.switch(index);
      p  && self.demoCollection.load({
        data   : {
          p: p
        },
        success: function() {
          self.demosView.setTitle(p);
        }
      });
    },

    detail: function(path) {
      var self = this,
          id   = path.id,
          demo = self.demoCollection.getById(id);

      self.$List.hide();
      self.$Edit.show();

      if (demo) {
        self.editView.get('model').set(demo.toJSON());
      } else {
        self.editView.get('model').load({
          data: {
            id: id
          }
        });
      }
    }
  }, {
    /**
     * route 配置
     */
    ATTRS: {
      routes: {
        value: {
          ''           : 'index',
          '/api/:id'   : 'api',
          '/detail/:id': 'detail'
        }
      }
    }
  });

  return Router;

}, {

  requires: ['mvc', 'demo/ApiCollection', 'demo/ApisView', 'demo/DemoModel', 'demo/DemoCollection', 'demo/DemosView', 'demo/EditView']

});