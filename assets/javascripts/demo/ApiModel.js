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

    /**
     * 数据验证
     * @return {String}
     */
    validate: function() {
      S.each(this.get('subcls'), function(module) {
        module.subcat  ? module.hasSubcat  = true : '';
        module.subcls  ? module.hasSubcls  = true : '';
        module.entries ? module.hasEntries = true : '';
      });
    },

    /**
     * 制作查询
     * @return {String}
     */
    makeQuery: function() {
      var self  = this,
          types = ['module', 'entrie'],
          temp  = [];

      S.each(types, function(type) {
        self.get(type) && temp.push(self.get(type))
      });

      return temp.join('.');
    }

  });

  return ApiModel;

}, {

  requires: ['mvc']

});