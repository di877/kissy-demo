/**
 * @fileOverview 包配置
 * @author 莫争 <gaoli.gl@taobao.com>
 * @version 1.0
 */

(function(S) {

  S.config({
    packages: [{
      name   : 'demo',
      charset: 'utf-8',
      path   : 'assets/javascripts/',
      tag    : S.now(),
      debug  : true
    }]
  });

})(KISSY);
/**
 * @fileOverview 核心模块
 * @author 莫争 <gaoli.gl@taobao.com>
 * @version 1.0
 */

KISSY.use('demo/main', function(S, Main) {
  new Main();
});