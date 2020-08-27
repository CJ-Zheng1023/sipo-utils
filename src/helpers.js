/**
 * 替换非标签的<,>符号
 * @author zhengchj
 * @param targetStr
 * @private
 */
export const replaceNotTagArrow = targetStr => targetStr.replace(/<(?![^<>]+>)/gi, '&lt;').replace(/(?<!<[^<>]+)>/gi, '&gt;')
/**
 * 替换所有<,>符号
 * @author zhengchj
 * @param targetStr
 */
export const replaceAllArrow = targetStr => targetStr.replace(/</gi, '&lt;').replace(/>/gi, '&gt;')