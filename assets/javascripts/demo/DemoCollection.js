/**
 * @fileOverview DemoCollection
 * @author 莫争 <gaoli.gl@taobao.com>
 * @version 1.0
 */

KISSY.add('demo/DemoCollection', function(S, mvc, DemoModel) {

  /**
   * DemoCollection
   */
  var DemoCollection = function() {
    DemoCollection.superclass.constructor.apply(this, arguments);
  };

  S.extend(DemoCollection, mvc.Collection, {}, {
    ATTRS: {
      url  : {
        value: 'act/demos.php'
      },
      parse: {
        value: function(res) {
          return res.data
        }
      },
      model: {
        value: DemoModel
      }
    }
  });

  return DemoCollection;

}, {

  requires: ['mvc', 'demo/DemoModel']

});