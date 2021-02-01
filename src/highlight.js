import {replaceAllArrow, toArray, escapeRegExp, isLight} from './helpers'
/**
 * 截词符转换成正则表达形式
 * @author zhengchj
 * @param word   高亮关键词
 * @private
 */
const _replaceTruncation = word => word.replace(/#/gi, '[a-zA-Z]').replace(/[?？]/gi, '(&lt;|&gt;|[^<>])?')
/**
 * 关联高亮词转换成正则表达式
 * @author zhengchj
 * @param word   高亮关键词
 * @param truncatable  启用截词符高亮
 * @param relatable    启用关联高亮
 * @returns string
 * @example 输入:A 3W B    输出:A.{3}B         输入:A 3D B   输出:(A.{3}B)|(B.{3}A)
 * @private
 */
const _replaceRelation = (word, truncatable, relatable) => {
  let matches1 = word.match(/\s+(0|[1-9][0-9]*)?(w|W|d|D)\s+/gi)
  let match = matches1[0]
  //获取关联词
  const index = word.indexOf(match)
  let p1 = word.substr(0, index)
  let p2 = word.substr(index + match.length)
  p1 = _createRule({word: p1}, truncatable, relatable)
  p2 = _createRule({word: p2}, truncatable, relatable)
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
    return `${p1}(<span class="hl"[^<>]+>(&lt;|&gt;|[^<>])</span>|(&lt;|&gt;|[^<>])){${size}}${p2}`
  } else {
    return `(${p1}(<span class="hl"[^<>]+>(&lt;|&gt;|[^<>])</span>|(&lt;|&gt;|[^<>])){${size}}${p2})|(${p2}(<span class="hl"[^<>]+>(&lt;|&gt;|[^<>])</span>|(&lt;|&gt;|[^<>])){${size}}${p1})`
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
  // 关联运算符处理
  if (relatable && _ifRelation(word)) {
    word = _replaceRelation(word, truncatable, relatable)
  } else {
    // 去除高亮词前后双引号
    word = word.replace(/^["“](.+)["”]$/, `$1`)
    //替换高亮词中的<,>
    word = replaceAllArrow(word)
    //正则特殊字符转义
    word = escapeRegExp(word)
    // 拆解高亮关键词
    word = _spreadWord(word)
    // 截词符处理
    if (truncatable) {
      word = _replaceTruncation(word)
    }
  }
  return word
}
/**
 * 判断高亮关键词是否包含关系符
 * @author zhengchj
 * @param word  高亮关键词
 * @returns string
 */
const _ifRelation = word => /\s+(0|[1-9][0-9]*)?(w|W|d|D)\s+/.test(word)
/**
 * 展开高亮关键词，每个字符前后加正则规则
 * @example 手机 -> (<span class="hl"[^<>]+>手</span>|手)(<span class="hl"[^<>]+>机</span>|机)
 * @param word   高亮关键词
 * @returns string
 */
const _spreadWord = word => {
  const chars = word.match(/(&lt;|&gt;|\\[\\^$.*+?()[\]{}|]|.)/gi)
  let newWord = ''
  for (const char of chars) {
    newWord += _buildCharRegExp(char)
  }
  return newWord
}
/**
 * 为字符构建正则表达式
 * @param char
 * @returns string
 */
const _buildCharRegExp = char => `(<span class="hl"[^<>]+>${char}</span>|${char})`
/**
 *
 * 原则：后端传的文本如果含有左右尖括号，需要后端转义，标签的左右尖括号不用转义
 *
 * 执行高亮操作
 * @author zhengchj
 * @param targetStr     目标字符串
 * @param highlighters  高亮关键词集合或对象
 * @param truncatable   启用截词符高亮，默认值为false
 * @param relatable     启用关联高亮，默认值为false
 * @return string       执行高亮后的字符串
 */
export const highlight = (targetStr, highlighters, truncatable = false, relatable = false) => {
  if (!targetStr) {
    return ''
  }
  // let str = _removeTag(targetStr)
  // let str = replaceNotTagArrow(targetStr)
  let str = targetStr
  toArray(highlighters).forEach(item => {
    let {word, color} = item
    if (!word) {
      return
    }
    const isRelation = _ifRelation(word)
    let rule = _createRule(item, truncatable, relatable)
    //高亮关键词匹配规则,标签中的内容不可匹配
    const regExp = new RegExp(`(${rule}(?![^<>]*>))`, 'gi')
    //判断是否浅色
    const fontColor = isLight(color) ? '#000' :'#fff'
    //高亮关键词加高亮标签
    str =  str.replace(regExp, word => {
      // 关联关系高亮
      if (isRelation) {
        const matches = word.match(/((&lt;|&gt;|[^<>])(?![^<>]*>))/gi)
        if (!matches) {
          return word
        }
        const matchesLength = matches.length
        let i = 1
        return word.replace(/((&lt;|&gt;|[^<>])(?![^<>]*>))/gi, w => {
          let result = ''
          if (i === 1) {
            result = `<span class="hl" style="border-top: 1px solid ${color};border-bottom: 1px solid ${color};border-left: 1px solid ${color};">${w}</span>`
          } else if (i === matchesLength) {
            result = `<span class="hl" style="border-top: 1px solid ${color};border-bottom: 1px solid ${color};border-right: 1px solid ${color};">${w}</span>`
          } else {
            result = `<span class="hl" style="border-top: 1px solid ${color};border-bottom: 1px solid ${color};">${w}</span>`
          }
          i++
          return result
        })
      } else {
        return word.replace(/((&lt;|&gt;|[^<>])(?![^<>]*>))/gi, `<span class="hl" style="background-color: ${color};color: ${fontColor};">$1</span>`)
      }
    })
  })
  return str
}
/**
 * 清除高亮操作
 * @deprecated
 * @author zhengchj
 * @param targetStr     目标字符串
 * @param highlighters  高亮关键词集合或对象
 * @param truncatable   启用截词符高亮，默认值为false
 * @param relatable     启用关联高亮，默认值为false
 * @return string       清除高亮后的字符串
 */
export const unhighlight = (targetStr, highlighters, truncatable = false, relatable = false) => {
  if (!targetStr) {
    return ''
  }
  // let str = replaceNotTagArrow(targetStr)
  let str = targetStr
  toArray(highlighters).forEach(item => {
    let {word, color} = item
    if (!word) {
      return
    }
    let rule = _createRule(item, truncatable, relatable)
    const regExp = new RegExp(`<span class="hl" style="background-color: ${color}">(${rule})</span>`, 'gi')
    //高亮关键词加高亮标签
    str = str.replace(regExp, `$1`)
  })
  return str
}
