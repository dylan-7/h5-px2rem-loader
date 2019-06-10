'use strict';
import { split, isString, isArray, find, eq, isNumber } from "lodash/fp";
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
        { dataIndex: 1, title: '支付宝' },
        { dataIndex: 2, title: '微信支付' },
        { dataIndex: 3, title: 'QQ钱包' },
        { dataIndex: 4, title: '网银支付' },
        { dataIndex: 5, title: '京东支付' },
        { dataIndex: 6, title: '银联支付' },
        { dataIndex: 7, title: '百度支付' },
        { dataIndex: 8, title: '财付通' },
        { dataIndex: 9, title: '点卡支付' },
        { dataIndex: 10, title: '云闪付' }
    ];
    var paramOk = [];
    var result = [];
    if (eq(param, 'all')) {
        return list;
    }
    else if (isString(param) || isNumber(param)) {
        paramOk = split(',', String(param)).map(function (v) { return +v; });
    }
    else if (isArray(param)) {
        paramOk = param.map(function (v) { return +v; });
    }
    paramOk.map(function (v) {
        var row = find({ dataIndex: v }, list) || { title: '' };
        result.push(row.title);
    });
    return String(result);
};
export default fn;
