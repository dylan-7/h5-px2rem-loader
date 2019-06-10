var loaderUtils = require('loader-utils');
// 默认参数
var defaultopts = {
    vwUnit: 7.5,
    vwFixed: 2,
};
var ZPXRegExp = /\b(\d+(\.\d+)?)px\b/;
module.exports = function (source) {
    // 获取webpack配置好的参数
    var opts = loaderUtils.getOptions(this);
    // 将参数组合
    var config = Object.assign({}, defaultopts, opts);
    var pxGlobalRegExp = new RegExp(ZPXRegExp.source, 'g');
    if (this.cacheable) {
        this.cacheable();
    }
    // 先test下有没有符合的如果有再进行替换
    if (pxGlobalRegExp.test(source)) {
        return source.replace(pxGlobalRegExp, function ($0, $1) {
            var val = $1 / config.vwUnit;
            // 精确到几位
            val = parseFloat(val.toFixed(config.vwFixed));
            return val === 0 ? val : val + 'vw';
        });
    }
    else {
        return source;
    }
};
