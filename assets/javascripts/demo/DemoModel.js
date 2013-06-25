/**
 * @fileOverview DemoModel
 * @author 莫争 <gaoli.gl@taobao.com>
 * @version 1.0
 */

KISSY.add('demo/DemoModel', function(S, mvc) {

  /**
   * DemoModel
   */
  var DemoModel = function() {
    DemoModel.superclass.constructor.apply(this, arguments);
  };

  S.extend(DemoModel, mvc.Model, {}, {
    ATTRS: {
      url  : {
        value: 'act/demo.php'
      },
      parse: {
        value: function(res) {
          return res.data
        }
      }
    }
  });

  return DemoModel;

}, {

  requires: ['mvc']

});