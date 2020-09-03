// 使用ES原生的Set实现

// Set结构本省有 add, clear, delete, entries, values, has, size, forEach属性

/**
 * 取并集
 * @param setA {Set} 集合a
 * @param setB {Set} 集合b
 * @return setA && setB
 */
export function union(setA: Set<any>, setB: Set<any>): Set<any> {
    return new Set([...setA, ...setB]);
}

/**
 * 交集
 * @param setA 
 * @param setB 
 * @retuan {Set}
 */
export function intersection(setA: Set<any>, setB: Set<any>): Set<any> {
    // 使用shortset longset , 当给定的两个集合size差别比较大时更快
    const [shortset, longset] = setA.size > setB.size ? [setB, setA] : [setA, setB];
    return new Set([...shortset].filter(v => longset.has(v)))
}

/**
 * 差集, 在集合A而不再B中
 * @param setA 
 * @param setB 
 */
export function difference(setA: Set<any>, setB: Set<any>): Set<any> {
    return new Set([...setA].filter(v => !setB.has(v)))
}