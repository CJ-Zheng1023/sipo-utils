/**
 * 聚焦关键词对象
 */
export interface Focuser{
  word: string
}

/**
 * 执行聚焦操作
 * @author zhengchj
 * @param {string} targetStr           目标字符串
 * @param {Array<Focuser>} focusers    聚焦关键词集合
 * @returns {string}                   执行聚焦后的字符串
 */
export declare function focus(targetStr: string, focusers: Array<Focuser>): string

/**
 * 执行聚焦操作
 * @author zhengchj
 * @param {string} targetStr           目标字符串
 * @param {Array<Focuser>} focusers    聚焦关键词集合
 * @returns {string}                   执行聚焦后的字符串
 */
export declare function focusText(targetStr: string, focusers: Array<Focuser>): string