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

  S.extend(ApiModel, mvc.Model, {
    validate: function() {
      S.each(this.get('subcls'), function(module) {
        module.subcat  ? module.hasSubcat  = true : '';
        module.subcls  ? module.hasSubcls  = true : '';
        module.entries ? module.hasEntries = true : '';
      });
    }
  });

  return ApiModel;

}, {

  requires: ['mvc']

});