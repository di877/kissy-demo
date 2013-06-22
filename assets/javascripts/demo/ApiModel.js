/**
 * @fileOverview ApiModel
 * @author 莫争 <gaoli.gl@taobao.com>
 * @version 1.0
 */

KISSY.add('demo/ApiModel', function(S, mvc) {

  /**
   * ApiModel
   */
  var ApiModel = function() {
    ApiModel.superclass.constructor.apply(this, arguments);
  };

  S.extend(ApiModel, mvc.Model);

  return ApiModel;

}, {

  requires: ['mvc']

});