/**
 * 清除高亮标签
 * @author zhengchj
 * @param targetStr
 * @private
 */
const _removeTag = targetStr => targetStr.replace(/(<span[^>]*>|<\/span>)/gi, '')
/**
 * 替换非标签的<,>符号
 * @author zhengchj
 * @param targetStr
 * @private
 */
const _replaceArrow = targetStr => targetStr.replace(/<(?![^<>]+>)/gi, '&lt;').replace(/(?<!<[^<>]+)>/gi, '&gt;')
/**
 * 截词符转换成正则表达形式
 * @param word   高亮关键词
 * @private
 */
const _replaceTruncation = word => word.replace(/#/gi, '[a-zA-Z]').replace(/[?？]/gi, '.?')
/**
 * 关联高亮词转换成正则表达式
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
 * 执行高亮操作
 * @author zhengchj
 * @param targetStr     目标字符串
 * @param highlighters  高亮关键词集合
 * @param truncatable   启用截词符高亮，默认值为true
 * @param relatable     启用关联高亮，默认值为false
 */
export default (targetStr, highlighters, truncatable = true, relatable = false) => {
  let str = _removeTag(targetStr)
  str = _replaceArrow(str)
  highlighters.forEach(item => {
    let word = item.word
    const color = item.color
    if (!word) {
      return
    }
    //替换高亮词中的<,>
    word = word.replace(/</gi, '&lt;').replace(/>/gi, '&gt;')
    //高亮关键词匹配规则,标签中的内容不可匹配
    if (truncatable) {
      word = _replaceTruncation(word)
    }
    if (relatable) {
      word = _replaceRelation(word)
    }
    const regExp = new RegExp(`((?<!<[^<>]+)${word}(?![^<>]+>))`, 'gi')
    //高亮关键词加高亮标签
    str = str.replace(regExp, `<span style="color: ${color}">$1</span>`)
  })
  return str
}