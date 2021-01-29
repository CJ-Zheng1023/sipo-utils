import * as utils from '../../src/highlight'
describe('v0.8.0-alpha1版本高亮测试', () => {
  test('基本功能测试1', () => {
    const targetStr = `响应于一个触发信号提供一个地电位的第一装置`
    const highlighters = [{
      word: '触发',
      color: 'red'
    }]
    const tobe = `响应于一个<span class="hl" style="background-color: red;color: #000;">触</span><span class="hl" style="background-color: red;color: #000;">发</span>信号提供一个地电位的第一装置`
    expect(utils.highlight(targetStr, highlighters)).toBe(tobe)
  })
  test('基本功能测试1', () => {
    const targetStr = `响应于一个触发信号提供一个地电位的第一装置`
    const highlighters = [{
      word: '触发',
      color: 'red'
    }, {
      word: '发信',
      color: 'blue'
    }]
    const tobe = `响应于一个<span class="hl" style="background-color: red;color: #000;">触</span><span class="hl" style="background-color: red;color: #000;"><span class="hl" style="background-color: blue;color: #fff;">发</span></span><span class="hl" style="background-color: blue;color: #fff;">信</span>号提供一个地电位的第一装置`
    expect(utils.highlight(targetStr, highlighters)).toBe(tobe)
  })
})
