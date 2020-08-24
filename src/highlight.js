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
 * 执行高亮操作
 * @author zhengchj
 * @param targetStr     目标字符串
 * @param highlighters  高亮关键词集合
 */
export default (targetStr, highlighters) => {
  let str = _removeTag(targetStr)
  str = _replaceArrow(str)
  highlighters.forEach(item => {
    let word = item.word
    const color = item.color
    if (word) {
      //替换高亮词中的<,>
      word = word.replace(/</gi, '&lt;').replace(/>/gi, '&gt;')
      //高亮关键词匹配规则,标签中的内容不可匹配
      const regExp = new RegExp(`(?<!<[^<>]+)${word}(?![^<>]+>)`, 'gi')
      //高亮关键词加高亮标签
      str = str.replace(regExp, `<span style="color: ${color}">${word}</span>`)
    }
  })
  return str
}