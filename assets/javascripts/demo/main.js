/**
 * @fileOverview main
 * @author 莫争 <gaoli.gl@taobao.com>
 * @version 1.0
 */

KISSY.add('demo/main', function(S, mvc, Router) {

  /**
   * Main
   */
  var Main = function() {
    new Router();

    mvc.Router.start();
  };

  return Main;

}, {

  requires: ['mvc', 'demo/router']

});