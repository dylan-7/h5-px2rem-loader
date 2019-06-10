'use strict';
import { eq, isString, split, isArray, find } from "lodash/fp";
/**
 * @desc
 * 1 PC, 2 H5, 3 APP
 *
 * @param
 * {'1,2'} 字符串，返回对应名称
 * {[1,2]} 数组，返回对应名称
 * {'all'} 返回全部
 */
var fn = function (param) {
    var list = [
        { dataIndex: 1, title: 'PC' },
        { dataIndex: 2, title: 'H5' },
        { dataIndex: 3, title: 'APP' }
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
