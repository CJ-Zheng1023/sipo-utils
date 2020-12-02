import {replaceAllArrow, escapeRegExp} from './helpers'

/**
 * 执行聚焦操作
 * @author zhengchj
 * @param targetStr     目标字符串
 * @param focusers      聚焦关键词集合
 * @returns string      聚焦后的字符串
 */
export const focus = (targetStr, focusers) => {
  //let str = replaceNotTagArrow(targetStr)
  let str = targetStr
  let words = ``
  focusers.forEach(item => {
    let {word} = item
    if (!word) {
      return
    }
    word = replaceAllArrow(word)
    //正则特殊字符转义
    word = escapeRegExp(word)
    words += `|${word}`
  })
  if (!words) {
    return targetStr
  }
  words = words.substr(1)
  //正则规则
  let regExp = new RegExp(`(([^.。！!]*(\.|。|！|!))?[^.。！!]*(${words})[^.。！!]*(\.|。|！|!))`, `gi`)
  //符合条件的句子前后加@@标记，替换@@@@为空字符串，合并连续的符合条件的句子
  let s = str.replace(regExp, `@@$1@@`).replace(`@@@@`, ``)
  //取出符合条件的字符串集合
  let matches = s.match(/@@.+?@@/gi)
  //无匹配内容返回...
  if (!matches || matches.length === 0) {
    return `...`
  }
  let result = ``
  matches.forEach(item => {
    //清除@@标记，并在句头加...符号
    result += `...${item.replace(/@@/gi, '')}`
  })
  //第一个匹配的字符串
  let match = matches[0].replace(/@@/gi, '')
  //判断第一个匹配的字符串在目标字符串中是否在开头，若是则需要去掉...
  //todo 待优化。。。
  return !str.startsWith(match) ? result : result.substr(3)
}