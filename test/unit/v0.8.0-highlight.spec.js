import * as utils from '../../src/highlight'
describe('v0.8.0-alpha版本高亮基础功能测试', () => {
  test('基本功能测试1', () => {
    const targetStr = `响应于一个触发信号提供一个地电位的第一装置`
    const highlighters = [{
      word: '触发',
      color: 'red'
    }]
    const tobe = `响应于一个<span class="hl hl-start" style="background-color: red;color: #000;">触</span><span class="hl" style="background-color: red;color: #000;">发</span>信号提供一个地电位的第一装置`
    expect(utils.highlight(targetStr, highlighters)).toBe(tobe)
  })
  test('基本功能测试2', () => {
    const targetStr = `响应于一个触发信号提供一个地电位的第一装置`
    const highlighters = [{
      word: '触发',
      color: 'red'
    }, {
      word: '发信',
      color: 'blue'
    }]
    const tobe = `响应于一个<span class="hl hl-start" style="background-color: red;color: #000;">触</span><span class="hl" style="background-color: red;color: #000;"><span class="hl hl-start" style="background-color: blue;color: #fff;">发</span></span><span class="hl" style="background-color: blue;color: #fff;">信</span>号提供一个地电位的第一装置`
    expect(utils.highlight(targetStr, highlighters)).toBe(tobe)
  })
  test('基本功能测试3，高亮关键词为尖括号的情况', () => {
    const targetStr = `响应于一个触发信号提供一个地电位的第&lt;一装置`
    const highlighters = [{
      word: '<',
      color: 'red'
    }]
    const tobe = `响应于一个触发信号提供一个地电位的第<span class="hl hl-start" style="background-color: red;color: #000;">&lt;</span>一装置`
    expect(utils.highlight(targetStr, highlighters)).toBe(tobe)
  })
  test('基本功能测试4，高亮关键词为正则特殊字符的情况', () => {
    const targetStr = `响应于一个触发信号提供一个地电位的第一装置.`
    const highlighters = [{
      word: '.',
      color: 'red'
    }]
    const tobe = `响应于一个触发信号提供一个地电位的第一装置<span class="hl hl-start" style="background-color: red;color: #000;">.</span>`
    expect(utils.highlight(targetStr, highlighters)).toBe(tobe)
  })
})
describe('v0.8.0-alpha版本高亮截词符测试', () => {
  test('截词符测试1', () => {
    const targetStr = `响应于一个触发信号提供一个地电位的第一装置a`
    const highlighters = [{
      word: '装置#',
      color: 'red'
    }]
    const tobe = `响应于一个触发信号提供一个地电位的第一<span class="hl hl-start" style="background-color: red;color: #000;">装</span><span class="hl" style="background-color: red;color: #000;">置</span><span class="hl" style="background-color: red;color: #000;">a</span>`
    expect(utils.highlight(targetStr, highlighters, true)).toBe(tobe)
  })
  test('截词符测试2', () => {
    const targetStr = `abcacefg`
    const highlighters = [{
      word: 'a?c',
      color: 'red'
    }]
    const tobe = `<span class="hl hl-start" style="background-color: red;color: #000;">a</span><span class="hl" style="background-color: red;color: #000;">b</span><span class="hl" style="background-color: red;color: #000;">c</span><span class="hl hl-start" style="background-color: red;color: #000;">a</span><span class="hl" style="background-color: red;color: #000;">c</span>efg`
    expect(utils.highlight(targetStr, highlighters, true)).toBe(tobe)
  })
  test('截词符测试3', () => {
    const targetStr = `abcdefg`
    const highlighters = [{
      word: 'a?c',
      color: 'red'
    }, {
      word: '#d',
      color: 'blue'
    }]
    const tobe = `<span class="hl hl-start" style="background-color: red;color: #000;">a</span><span class="hl" style="background-color: red;color: #000;">b</span><span class="hl" style="background-color: red;color: #000;"><span class="hl hl-start" style="background-color: blue;color: #fff;">c</span></span><span class="hl" style="background-color: blue;color: #fff;">d</span>efg`
    expect(utils.highlight(targetStr, highlighters, true)).toBe(tobe)
  })
})
describe('v0.8.0-alpha版本高亮关联关系式测试', () => {
  test('关联关系测试1', () => {
    const targetStr = `响应于一个触发信号提供一个地电位的第一装置`
    const highlighters = [{
      word: '响 2D 一',
      color: 'red'
    }]
    const tobe = `<span class="hl hl-start" style="border-top: 2px solid red;border-bottom: 2px solid red;border-left: 2px solid red;">响</span><span class="hl" style="border-top: 2px solid red;border-bottom: 2px solid red;">应</span><span class="hl" style="border-top: 2px solid red;border-bottom: 2px solid red;">于</span><span class="hl" style="border-top: 2px solid red;border-bottom: 2px solid red;border-right: 2px solid red;">一</span>个触发信号提供一个地电位的第一装置`
    expect(utils.highlight(targetStr, highlighters, true, true)).toBe(tobe)
  })
})
