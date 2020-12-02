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
})