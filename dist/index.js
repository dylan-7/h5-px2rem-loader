const loaderUtils = require('loader-utils');

// 默认参数
const defaultopts = {
    vwUnit: 7.5, // vw unit value (default: 7.5)
    vwFixed: 2, // vw value precision (default: 2)
};

const ZPXRegExp = /\b(\d+(\.\d+)?)px\b/;

module.exports = function (source) {
    // 获取webpack配置好的参数
    const opts = loaderUtils.getOptions(this);
    // 将参数组合
    const config = Object.assign({}, defaultopts, opts);
    let pxGlobalRegExp = new RegExp(ZPXRegExp.source, 'g');
    if (this.cacheable) {
        this.cacheable();
    }
    // 先test下有没有符合的如果有再进行替换
    if (pxGlobalRegExp.test(source)) {
        return source.replace(pxGlobalRegExp, ($0, $1) => {
            let val = $1 / config.vwUnit;
            // 精确到几位
            val = parseFloat(val.toFixed(config.vwFixed));
            return val === 0 ? val : val + 'vw';
        });
    } else {
        return source;
    }
};
