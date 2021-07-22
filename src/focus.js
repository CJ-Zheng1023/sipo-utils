import { replaceAllArrow, escapeRegExp } from './helpers'
// 分隔句子的标点符号
const SENTENSESPLITINTERPUNCTIONREG =
  /[.。,，?？;；!！][＂"＇\']?(?!.*?>)|[.。,，?？;；!！][＂"＇\']?(?=[^>]*?<)/g
// #在聚焦时候的意义
const NUMBERCORRESPONDINGSIGN = '[a-z]'

/**
 * 执行聚焦操作
 * @author tianhf
 * @param {*} targetStr   目标字符串
 * @param {*} focusers    聚焦关键词集合
 * @returns string        聚焦后的字符串
 */
export const focusText = (targetStr, focusers) => {
  if (!targetStr) {
    return ''
  }
  // 如果没有聚焦词，则返回 原文献
  if (!focusers.length) {
    return targetStr
  }
  let wordAry = focusers
  let obj = document.createElement('div')
  // let strDom = document.createElement('div')
  // strDom.innerHTML = targetStr
  obj.innerHTML = targetStr
  let tdsAry = obj.getElementsByTagName('TD')
  // 需要处理的TD对象数组
  let contentTdsAry = new Array()
  // 每个需要处理TD对象的句子数组
  let contentTdsSentenseAry = new Array()
  // 每个需要处理TD对象的分隔句子的标点数组
  let contentTdsSentenseInterpunctionAry = new Array()
  // 每个需要处理TD对象句子对应的是否显示数组
  let contentTdsSentenseIsShowAry = new Array()
  // 给以上的4个数组装入相应数据
  for (let i = 0; i < tdsAry.length; i++) {
    let td = tdsAry[i]
    let className = td.className
    if (
      className == 'content'
      /*
       * || className ==
       * 'fullTextClaimContent' || className ==
       * 'fullTextDescContent'
       */
    ) {
      // 如果当前TD的className为这3中就操作
      // 将这个TD对象装入contentTdsAry
      contentTdsAry.push(td)
      // 将句子分隔后放到数组
      let sentenseAry = td.innerText.split(SENTENSESPLITINTERPUNCTIONREG)
      // 将句子分隔数组装入contentTdsSentenseAry
      contentTdsSentenseAry.push(sentenseAry)
      // 将分隔的标点放到数组
      let interpunctionAry = td.innerText.match(SENTENSESPLITINTERPUNCTIONREG)
      // 将标点数组装入contentTdsSentenseInterpunctionAry
      contentTdsSentenseInterpunctionAry.push(interpunctionAry)
      // 创建一个和句子数组一样长的数组，全部放满了false，这个是句子是否显示的数组
      let ary = new Array()
      for (let j = 0; j < sentenseAry.length; j++) {
        ary.push(false)
      }
      // 将和句子数组一样长的数组，全部放满了false的数组放入到contentTdsSentenseIsShowAry
      contentTdsSentenseIsShowAry.push(ary)
    }
  }

  for (let i = 0; i < wordAry.length; i++) {
    // 循环对关键词进行操作
    // 聚焦词汇的对象
    let o = wordAry[i]
    // if (!o.use) {
    //   // 如果当前词汇不需要聚焦操作，跳过本次操作
    //   continue
    // }
    // 匹配聚焦词汇的正则
    let reg = new RegExp(changeKeyWorkToRegString(o.word, true), 'ig')
    // 聚焦类型
    let focusType = o.focusType
    // 正则匹配的聚焦词汇
    let fwAry = obj.innerText.match(reg)
    // 将去重后的聚焦关键字数组存放的数组
    let focusWordAry = new Array()
    // 聚焦关键字拼写的正则字符串
    let focusWordsRegStr = ''
    if (fwAry != null) {
      // 如果聚焦词汇在文本中能够匹配得到
      for (let j = 0; j < fwAry.length; j++) {
        // 循环去重
        // 对聚焦词汇进行排序
        fwAry.sort()
        if (j == 0 || (j > 0 && fwAry[j] != fwAry[j - 1])) {
          // 如果是第一个元素，或者和它上一个元素不一样的词汇就加入到聚焦关键字数组中
          focusWordAry.push(fwAry[j])
        }
      }
      for (let j = 0; j < focusWordAry.length; j++) {
        // 循环拼写正则字符串
        focusWordsRegStr = focusWordsRegStr.concat(
          changeKeyWorkToRegString(focusWordAry[j], false)
        )
        if (j != focusWordAry.length - 1) {
          focusWordsRegStr = focusWordsRegStr.concat('|')
        }
      }
      // 对每个TD的情况针对句子是否显示的操作(注：这里的正则必须都是独自存在的，不能用同一个，英文test这个方法是记录匹配文本下标的)
      if ('1' == focusType) {
        // 如果是前句聚焦
        for (let j = 0; j < contentTdsAry.length; j++) {
          // 对每个TD进行遍历
          if (contentTdsSentenseAry[j].length == 1) {
            // 如果当前处理的TD中只包含一个句子
            if (
              new RegExp(focusWordsRegStr, 'g').test(
                contentTdsSentenseAry[j][0]
              )
            ) {
              // 如果存在聚焦词汇
              contentTdsSentenseIsShowAry[j][0] = true // 句子是否显示为真
            }
          } else {
            // 如果是多个句子
            for (let k = 0; k < contentTdsSentenseAry[j].length; k++) {
              if (k == 0) {
                // 如果是第一个句子
                if (
                  new RegExp(focusWordsRegStr, 'g').test(
                    contentTdsSentenseAry[j][0]
                  )
                ) {
                  // 如果第一句中包含聚焦词汇
                  contentTdsSentenseIsShowAry[j][0] = true // 句子是否显示为真
                }
              } else {
                // 如果不是第一句
                if (
                  new RegExp(focusWordsRegStr, 'g').test(
                    contentTdsSentenseAry[j][k]
                  )
                ) {
                  // 如果当前句子中包含聚焦词汇
                  contentTdsSentenseIsShowAry[j][k] = true // 句子是否显示为真
                  contentTdsSentenseIsShowAry[j][k - 1] = true // 句子上一句的是否显示为真
                }
              }
            }
          }
        }
      } else if ('2' == focusType) {
        // 如果是后句聚焦
        for (let j = 0; j < contentTdsAry.length; j++) {
          // 对每个TD进行遍历
          if (contentTdsSentenseAry[j].length == 1) {
            // 如果当前处理的TD中只包含一个句子
            if (
              new RegExp(focusWordsRegStr, 'g').test(
                contentTdsSentenseAry[j][0]
              )
            ) {
              // 如果存在聚焦词汇
              contentTdsSentenseIsShowAry[j][0] = true // 句子是否显示为真
            }
          } else {
            // 如果是多个句子
            for (let k = 0; k < contentTdsSentenseAry[j].length; k++) {
              if (k == contentTdsSentenseAry[j].length - 1) {
                // 如果是最后一个句子
                if (
                  new RegExp(focusWordsRegStr, 'g').test(
                    contentTdsSentenseAry[j][k]
                  )
                ) {
                  // 如果存在聚焦词汇
                  contentTdsSentenseIsShowAry[j][k] = true // 句子是否显示为真
                }
              } else {
                if (
                  new RegExp(focusWordsRegStr, 'g').test(
                    contentTdsSentenseAry[j][k]
                  )
                ) {
                  // 如果存在聚焦词汇
                  contentTdsSentenseIsShowAry[j][k] = true // 句子是否显示为真
                  contentTdsSentenseIsShowAry[j][k + 1] = true // 句子的后一句是否显示为真
                }
              }
            }
          }
        }
      } else if ('3' == focusType) {
        // 如果是前句和后句聚焦
        for (let j = 0; j < contentTdsAry.length; j++) {
          if (contentTdsSentenseAry[j].length == 1) {
            // 如果当前TD只有一个句子
            if (
              new RegExp(focusWordsRegStr, 'g').test(
                contentTdsSentenseAry[j][0]
              )
            ) {
              // 如果存在聚焦词汇
              contentTdsSentenseIsShowAry[j][0] = true // 句子是否显示为真
            }
          } else if (contentTdsSentenseAry[j].length == 2) {
            // 如果当前TD只有两个句子
            if (
              new RegExp(focusWordsRegStr, 'g').test(
                contentTdsSentenseAry[j][0]
              )
            ) {
              // 如果存在聚焦词汇
              contentTdsSentenseIsShowAry[j][0] = true // 句子是否显示为真
              contentTdsSentenseIsShowAry[j][1] = true // 句子的后一句是否显示为真
            }
            if (
              new RegExp(focusWordsRegStr, 'g').test(
                contentTdsSentenseAry[j][1]
              )
            ) {
              // 如果存在聚焦词汇
              contentTdsSentenseIsShowAry[j][0] = true // 句子的前一句是否显示为真
              contentTdsSentenseIsShowAry[j][1] = true // 句子是否显示为真
            }
          } else {
            // 如果三句以上
            for (let k = 0; k < contentTdsSentenseAry[j].length; k++) {
              if (k == 0) {
                // 如果是第一句
                if (
                  new RegExp(focusWordsRegStr, 'g').test(
                    contentTdsSentenseAry[j][0]
                  )
                ) {
                  // 如果存在聚焦词汇
                  contentTdsSentenseIsShowAry[j][0] = true // 句子是否显示为真
                  contentTdsSentenseIsShowAry[j][1] = true // 句子的后一句是否显示为真
                }
              } else if (k == contentTdsSentenseAry[j].length - 1) {
                // 如果是最后一句
                if (
                  new RegExp(focusWordsRegStr, 'g').test(
                    contentTdsSentenseAry[j][k]
                  )
                ) {
                  // 如果存在聚焦词汇
                  contentTdsSentenseIsShowAry[j][k] = true // 句子是否显示为真
                  contentTdsSentenseIsShowAry[j][k - 1] = true // 句子的前一句是否显示为真
                }
              } else {
                // 其它情况
                if (
                  new RegExp(focusWordsRegStr, 'g').test(
                    contentTdsSentenseAry[j][k]
                  )
                ) {
                  // 如果存在聚焦词汇
                  contentTdsSentenseIsShowAry[j][k - 1] = true // 句子的前一句是否显示为真
                  contentTdsSentenseIsShowAry[j][k] = true // 句子是否显示为真
                  contentTdsSentenseIsShowAry[j][k + 1] = true // 句子的后一句是否显示为真
                }
              }
            }
          }
        }
      }
    }
  }

  // 每个TD的情况进行聚焦文本拼接操作
  for (let i = 0; i < contentTdsAry.length; i++) {
    // 循环拼接TD文本
    let str = '' // 拼接TD的文本变量
    for (let j = 0; j < contentTdsSentenseAry[i].length; j++) {
      // 当前TD的句子进行遍历
      if (contentTdsSentenseIsShowAry[i][j]) {
        // 当前句子为显示
        if (j == 0) {
          // 如果是第一个句子
          if (undefined != contentTdsSentenseAry[i][0]) {
            // 第一个句子不是undefined
            str = str.concat(contentTdsSentenseAry[i][j]) // 拼接
          }
        } else {
          str = str.concat(contentTdsSentenseAry[i][j]) // 拼接
        }
        if (contentTdsSentenseInterpunctionAry[i] != null) {
          // 如果标点数组有元素
          if (contentTdsSentenseInterpunctionAry[i][j] != undefined) {
            // 标点存在
            str = str.concat(contentTdsSentenseInterpunctionAry[i][j]) // 拼接
          }
        }
      } else {
        // 如果句子不显示
        if (j == 0) {
          // 如果是第一句直接拼接'…'
          str = str.concat('…') // 拼接
        } else if (j > 0 && contentTdsSentenseIsShowAry[i][j - 1]) {
          // 否则它的前一句是否显示为显示
          str = str.concat('…') // 拼接
        }
      }
    }
    contentTdsAry[i].innerText = str // 将拼接后的文本赋值给当前TD
  }
  const focusText = obj.innerHTML
  obj = null
  return focusText
}

/**
 * 执行聚焦操作
 * @author zhengchj
 * @param targetStr     目标字符串
 * @param focusers      聚焦关键词集合
 * @returns string      聚焦后的字符串
 */
export const focus = (targetStr, focusers) => {
  if (!targetStr) {
    return ''
  }
  //let str = replaceNotTagArrow(targetStr)
  let str = targetStr
  let words = ``
  focusers.forEach((item) => {
    let { word } = item
    if (!word) {
      return
    }
    word = replaceAllArrow(word)
    //正则特殊字符转义
    word = escapeRegExp(word)
    //针对问号进行转义
    word = word.replace(/\?/, '\\?')
    words += `|${word}`
  })
  if (!words) {
    return targetStr
  }
  words = words.substr(1)
  //正则规则
  let regExp = new RegExp(
    `(([^.。！!]*(\.|。|！|!))?[^.。！!]*((${words})(?![^<>]*>))[^.。！!]*(\.|。|！|!))`,
    `gi`
  )
  //符合条件的句子前后加@@标记，替换@@@@为空字符串，合并连续的符合条件的句子
  let s = str.replace(regExp, `@@$1@@`).replace(`@@@@`, ``)
  //取出符合条件的字符串集合
  let matches = s.match(/@@.+?@@/gi)
  //无匹配内容返回...
  if (!matches || matches.length === 0) {
    return `...`
  }
  let result = ``
  matches.forEach((item) => {
    //清除@@标记，并在句头加...符号
    result += `...${item.replace(/@@/gi, '')}`
  })
  //第一个匹配的字符串
  let match = matches[0].replace(/@@/gi, '')
  //判断第一个匹配的字符串在目标字符串中是否在开头，若是则需要去掉...
  //todo 待优化。。。
  return !str.startsWith(match) ? result : result.substr(3)
}

/**
 * 将聚焦的关键字变成正则的形式
 */
const changeKeyWorkToRegString = function (str, bol) {
  let word = '('
  let isNotEnglish = /[^a-z#]/gi.test(str)
  for (let i = 0; i < str.length; i++) {
    let charAt = str.charAt(i)
    if (charAt == '^') {
      charAt = '\\^'
    }
    if (charAt == '/') {
      charAt = '\\/'
    }
    if (charAt == '\\') {
      charAt = '\\\\'
    }
    if (charAt == '[') {
      charAt = '\\['
    }
    if (charAt == ']') {
      charAt = '\\]'
    }
    if (charAt == '(') {
      charAt = '\\('
    }
    if (charAt == ')') {
      charAt = '\\)'
    }
    if (charAt == '#') {
      // #现在只要不再应为中我们就忽略它的存在
      if (isNotEnglish) {
        word += '#'
      } else {
        word += NUMBERCORRESPONDINGSIGN
      }
    } else {
      word += '[' + charAt + ']'
    }
  }
  word += ')'
  // 判断文本中是否有中文
  if (isNotEnglish) {
    // 如果字符串中不只包含英文
    return word
  } else {
    // 如果字符串中只包含英文
    if (bol) {
      return '\\b' + word + '[a-z]*\\b'
    } else {
      return '\\b' + word + '\\b'
    }
  }
}
