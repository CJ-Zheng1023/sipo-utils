import utils from '../../index'
describe('高亮方法测试', () => {
  test('纯文本情况', () => {
    const targetStr = `对一个正则表达式模式`
    const highlighters = [{
      word: '正则',
      color: 'red'
    }, {
      word: '模式',
      color: 'blue'
    }]
    const tobe = `对一个<span style="color: red">正则</span>表达式<span style="color: blue">模式</span>`
    expect(utils.highlight(targetStr, highlighters)).toBe(tobe)
  })
  test('高亮关键词为标签内容', () => {
    const targetStr = `对一个正则表达式模式`
    const highlighters = [{
      word: '正则',
      color: 'red'
    }, {
      word: 'span',
      color: 'blue'
    }]
    const tobe = `对一个<span style="color: red">正则</span>表达式模式`
    expect(utils.highlight(targetStr, highlighters)).toBe(tobe)
  })
  test('高亮关键词带尖括号', () => {
    const targetStr = `对一个正则表达式>模式<span`
    const highlighters = [{
      word: '正则',
      color: 'red'
    }, {
      word: '<span',
      color: 'blue'
    }, {
      word: '>',
      color: 'black'
    }]
    const tobe = `对一个<span style="color: red">正则</span>表达式<span style="color: black">&gt;</span>模式<span style="color: blue">&lt;span</span>`
    expect(utils.highlight(targetStr, highlighters)).toBe(tobe)
  })
  test('原始文本带标签，高亮关键词带尖括号和标签内容', () => {
    const targetStr = `对一个<div>正则</div>表达式>模式`
    const highlighters = [{
      word: 'span',
      color: 'blue'
    }, {
      word: '>',
      color: 'black'
    }]
    const tobe = `对一个<div>正则</div>表达式<span style="color: black">&gt;</span>模式`
    expect(utils.highlight(targetStr, highlighters)).toBe(tobe)
  })
})