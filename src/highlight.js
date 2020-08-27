import {replaceNotTagArrow, replaceAllArrow} from './helpers'
/**
 * 截词符转换成正则表达形式
 * @author zhengchj
 * @param word   高亮关键词
 * @private
 */
const _replaceTruncation = word => word.replace(/#/gi, '[a-zA-Z]').replace(/[?？]/gi, '.?')
/**
 * 关联高亮词转换成正则表达式
 * @author zhengchj
 * @param word   高亮关键词
 * @returns string
 * @example 输入:A 3W B    输出:A.{3}B         输入:A 3D B   输出:(A.{3}B)|(B.{3}A)
 * @private
 */
const _replaceRelation = word => {
  let matches1 = word.match(/\s+(0|[1-9][0-9]*)?(w|W|d|D)\s+/gi)
  if (!matches1 || !matches1.length) {
    return word
  }
  let match = matches1[0]
  //获取关联词
  let [p1, p2] = word.split(match)
  //获取关联运算符
  let operation = match.trim()
  let size = 0, type = ''
  let matches2 = operation.match(/(0|[1-9][0-9]*)|(w|W|d|D)/gi)
  if (matches2.length === 1) { //运算符不带步长的情况
    [type] = matches2
  } else {    //运算符带步长的情况
    [size, type] = matches2
  }
  size = Number(size)
  if (type.toUpperCase() === `W`) {
    return `${p1}.{${size}}${p2}`
  } else {
    return `(${p1}.{${size}}${p2})|(${p2}.{${size}}${p1})`
  }
}
/**
 * 生成正则规则
 * @author zhengchj
 * @param highlighter  高亮关键词对象
 * @param truncatable  启用截词符高亮
 * @param relatable    启用关联高亮
 * @returns {*}        返回正则规则
 * @private
 */
const _createRule = (highlighter, truncatable, relatable) => {
  let {word} = highlighter
  //替换高亮词中的<,>
  word = replaceAllArrow(word)
  //高亮关键词匹配规则,标签中的内容不可匹配
  if (truncatable) {
    word = _replaceTruncation(word)
  }
  if (relatable) {
    word = _replaceRelation(word)
  }
  return word
}
/**
 * 把单高亮关键词对象封装成集合
 * @author zhengchj
 * @param highlighters
 * @returns {[]}
 * @private
 */
const _toArray = (highlighters) => {
  return Array.isArray(highlighters) ? highlighters : [highlighters]
}
/**
 * 执行高亮操作
 * @author zhengchj
 * @param targetStr     目标字符串
 * @param highlighters  高亮关键词集合或对象
 * @param truncatable   启用截词符高亮，默认值为true
 * @param relatable     启用关联高亮，默认值为false
 * @return string       执行高亮后的字符串
 */
export const highlight = (targetStr, highlighters, truncatable = true, relatable = false) => {
  // let str = _removeTag(targetStr)
  let str = replaceNotTagArrow(targetStr)
  _toArray(highlighters).forEach(item => {
    let {word, color} = item
    if (!word) {
      return
    }
    let rule = _createRule(item, truncatable, relatable)
    const regExp = new RegExp(`((?<!<[^<>]+)${rule}(?![^<>]+>))`, 'gi')
    //高亮关键词加高亮标签
    str = str.replace(regExp, `<span style="color: ${color}">$1</span>`)
  })
  return str
}
/**
 * 清除高亮操作
 * @author zhengchj
 * @param targetStr     目标字符串
 * @param highlighters  高亮关键词集合或对象
 * @param truncatable   启用截词符高亮，默认值为true
 * @param relatable     启用关联高亮，默认值为false
 * @return string       清除高亮后的字符串
 */
export const unhighlight = (targetStr, highlighters, truncatable = true, relatable = false) => {
  let str = replaceNotTagArrow(targetStr)
  _toArray(highlighters).forEach(item => {
    let {word, color} = item
    if (!word) {
      return
    }
    let rule = _createRule(item, truncatable, relatable)
    const regExp = new RegExp(`<span style="color: ${color}">(${rule})</span>`, 'gi')
    //高亮关键词加高亮标签
    str = str.replace(regExp, `$1`)
  })
  return str
}
