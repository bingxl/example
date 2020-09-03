"use strict";
// 使用ES原生的Set实现
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.difference = exports.intersection = exports.union = void 0;
// Set结构本省有 add, clear, delete, entries, values, has, size, forEach属性
/**
 * 取并集
 * @param setA {Set} 集合a
 * @param setB {Set} 集合b
 * @return setA && setB
 */
function union(setA, setB) {
    return new Set(__spreadArrays(setA, setB));
}
exports.union = union;
/**
 * 交集
 * @param setA
 * @param setB
 * @retuan {Set}
 */
function intersection(setA, setB) {
    // 使用shortset longset , 当给定的两个集合size差别比较大时更快
    var _a = setA.size > setB.size ? [setB, setA] : [setA, setB], shortset = _a[0], longset = _a[1];
    return new Set(__spreadArrays(shortset).filter(function (v) { return longset.has(v); }));
}
exports.intersection = intersection;
/**
 * 差集, 在集合A而不再B中
 * @param setA
 * @param setB
 */
function difference(setA, setB) {
    return new Set(__spreadArrays(setA).filter(function (v) { return !setB.has(v); }));
}
exports.difference = difference;
