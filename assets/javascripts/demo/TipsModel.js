/**
 * @fileOverview TipsModel
 * @author 莫争 <gaoli.gl@taobao.com>
 * @version 1.0
 */

KISSY.add('demo/TipsModel', function(S, mvc) {

  /**
   * TipsModel
   */
  var TipsModel = function() {
    TipsModel.superclass.constructor.apply(this, arguments);
  };

  S.extend(TipsModel, mvc.Model);

  return TipsModel;

}, {

  requires: ['mvc']

});