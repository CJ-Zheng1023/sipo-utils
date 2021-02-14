/**
 * 执行高密操作
 * @author zhengchj
 * @param {HTMLElement} container     外层容器
 * @param {string} className          需要高密的样式名，默认为hl-start
 * @return {Map}                      高密Map<颜色, 相对高度百分比集合set>
 */
export declare function highdense(container: HTMLElement, className?: string = `hl-start`): Map