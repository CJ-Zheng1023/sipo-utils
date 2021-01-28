/**
 * 高亮关键词对象
 */
export interface Highlighter{
  //高亮词
  word: string
  //颜色,支持rgb和16进制形式
  color: string
}
export type Highlighters = Array<Highlighter> | Highlighter

/**
 * 高亮操作
 * @author zhengchj
 * @param {string} targetStr           目标字符串
 * @param {Highlighters} highlighters  高亮关键词集合或对象
 * @param {boolean} truncatable        启用截词符高亮，默认值为false
 * @param {boolean} relatable          启用关联高亮，默认值为false
 * @returns {string}                   执行高亮后的字符串
 */
export declare function highlight(targetStr: string, highlighters: Highlighters, truncatable?: boolean = false, relatable?: boolean = false): string

/**
 * 清除高亮
 * @deprecated
 * @author zhengchj
 * @param {string} targetStr               目标字符串
 * @param {Highlighters} highlighters      高亮关键词集合或对象
 * @param {boolean} truncatable            启用截词符高亮，默认值为false
 * @param {boolean} relatable              启用关联高亮，默认值为false
 * @returns {string}                       去高亮后的字符串
 */
export declare function unhighlight(targetStr: string, highlighters: Highlighters, truncatable?: boolean = false, relatable?: boolean = false): string