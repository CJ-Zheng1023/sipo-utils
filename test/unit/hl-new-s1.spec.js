import * as utils from '../../src/highlight'
describe('新一代s系统存在的问题测试', () => {
  test('文本带括号', () => {
    const targetStr = `响应于一个触发信号提供一个地电位的第一装置(130)`
    const highlighters = [{
      word: '响应于一个触发信号提供一个地电位的第一装置(130)',
      color: 'red'
    }]
    const tobe = `<span class="hl" style="color: red">响应于一个触发信号提供一个地电位的第一装置(130)</span>`
    expect(utils.highlight(targetStr, highlighters)).toBe(tobe)
  })
  test('数字带括号', () => {
    const targetStr = `(162，164，122)`
    const highlighters = [{
      word: '(162，164，122)',
      color: 'red'
    }]
    const tobe = `<span class="hl" style="color: red">(162，164，122)</span>`
    expect(utils.highlight(targetStr, highlighters)).toBe(tobe)
  })
  test('正则特殊字符', () => {
    const targetStr = `你好啊.`
    const highlighters = [{
      word: '.',
      color: 'red'
    }]
    const tobe = `你好啊<span class="hl" style="color: red">.</span>`
    expect(utils.highlight(targetStr, highlighters)).toBe(tobe)
  })
  test('只有英文括号', () => {
    const targetStr = `你好啊.`
    const highlighters = [{
      word: '()',
      color: 'red'
    }]
    const tobe = `你好啊.`
    expect(utils.highlight(targetStr, highlighters)).toBe(tobe)
  })
  test('有问号', () => {
    const targetStr = `你好啊?abc`
    const highlighters = [{
      word: '?a',
      color: 'red'
    }]
    const tobe = `你好啊<span class="hl" style="color: red">?a</span>bc`
    expect(utils.highlight(targetStr, highlighters)).toBe(tobe)
  })
  test('年月日', () => {
    const targetStr = `2009.5.7`
    const highlighters = [{
      word: '2009.5.7',
      color: 'red'
    }]
    const tobe = `<span class="hl" style="color: red">2009.5.7</span>`
    expect(utils.highlight(targetStr, highlighters)).toBe(tobe)
  })
  test('分类号', () => {
    const targetStr = `CN200780`
    const highlighters = [{
      word: 'CN200',
      color: 'red'
    }]
    const tobe = `<span class="hl" style="color: red">CN200</span>780`
    expect(utils.highlight(targetStr, highlighters)).toBe(tobe)
  })
  test('高亮词带分类号', () => {
    const targetStr = `CN200780`
    const highlighters = [{
      word: `"CN200780"`,
      color: 'red'
    }]
    const tobe = `<span class="hl" style="color: red">CN200780</span>`
    expect(utils.highlight(targetStr, highlighters)).toBe(tobe)
  })
  test('img标签内内容', () => {
    const targetStr = `<img src="http://cn123.com"/>`
    const highlighters = [{
      word: `"cn123"`,
      color: 'red'
    }]
    const tobe = `<img src="http://cn123.com"/>`

    expect(utils.highlight(targetStr, highlighters)).toBe(tobe)
  })
})