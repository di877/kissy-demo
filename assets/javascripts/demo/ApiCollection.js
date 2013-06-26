/**
 * @fileOverview ApiCollection
 * @author 莫争 <gaoli.gl@taobao.com>
 * @version 1.0
 */

KISSY.add('demo/ApiCollection', function(S, mvc, ApiModel) {

  /**
   * ApiCollection
   */
  var ApiCollection = function() {
    ApiCollection.superclass.constructor.apply(this, arguments);
  };

  S.extend(ApiCollection, mvc.Collection, {}, {
    ATTRS: {
      url  : {
        value: 'act/api.php'
      },
      model: {
        value: ApiModel
      }
    }
  });

  return ApiCollection;

}, {

  requires: ['mvc', 'demo/ApiModel']

});