'use strict';
import { split, isString, isArray, find, eq } from "lodash/fp";
/**
 * @desc
 * 支付类型
 * 1支付宝, 2微信支付, 3QQ钱包, 4网银支付, 5京东支付, 6银联支付, 7百度支付, 8财付通, 9点卡支付, 10云闪付
 *
 * @param
 * {'1,2'} 字符串，返回对应名称
 * {[1,2]} 数组，返回对应名称
 * {'all'} 返回全部
 */
var fn = function (param) {
    var list = [
        { dataIndex: 1, title: '未发放' },
        { dataIndex: 2, title: '已发放' },
        { dataIndex: 3, title: '已取消' },
        { dataIndex: 4, title: '已累计' }
    ];
    var paramOk = [];
    var result = [];
    if (eq(param, 'all')) {
        return list;
    }
    else if (isString(param)) {
        paramOk = split(',', param).map(function (v) { return +v; });
    }
    else if (isArray(param)) {
        paramOk = param.map(function (v) { return +v; });
    }
    paramOk.map(function (v) {
        result.push(find({ dataIndex: v }, list).title);
    });
    return String(result);
};
export default fn;
