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

    self.$list          = $('#J_List');
    self.$edit          = $('#J_Edit');
    self.$commit        = $('#J_Commit');
    self.$update        = $('#J_Update');
    self.apiCollection  = new ApiCollection().load();
    self.apisView       = new ApisView({models: self.apiCollection}).render();
    self.demoModel      = new DemoModel();
    self.demoCollection = new DemoCollection();
    self.demosView      = new DemosView({models: self.demoCollection}).render();
    self.editView       = new EditView({model: self.demoModel});
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

      self.$list.show();
      self.$edit.hide();

      id && self.apisView.switch(index);
      p  && self.demoCollection.set({
        id: id,
        p : p
      }).load({
        data : {
          p: p
        }
      });
    },

    add   : function(path, query) {
      var self = this,
          p    = query.p;

      self.$list.hide();
      self.$edit.show();
      self.$commit.show();
      self.$update.hide();

      self.demoModel.set({
        id     : '',
        module : p,
        author : '',
        intro  : '',
        version: '1.3.0',
        html   : '',
        js     : '',
        css    : ''
      });
    },

    detail: function(path) {
      var self = this,
          id   = path.id,
          demo = self.demoCollection.getById(id);

      self.$list.hide();
      self.$edit.show();
      self.$commit.hide();
      self.$update.show();

      if (demo) {
        self.demoModel.set(demo.toJSON());
      } else {
        self.demoModel.load({
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
          '/add/:id'   : 'add',
          '/detail/:id': 'detail'
        }
      }
    }
  });

  return Router;

}, {

  requires: ['mvc', 'demo/ApiCollection', 'demo/ApisView', 'demo/DemoModel', 'demo/DemoCollection', 'demo/DemosView', 'demo/EditView']

});