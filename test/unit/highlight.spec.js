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
    const tobe = `对一个<span class="hl" style="color: red">正则</span>表达式<span class="hl" style="color: blue">模式</span>`
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
    const tobe = `对一个<span class="hl" style="color: red">正则</span>表达式模式`
    expect(utils.highlight(targetStr, highlighters)).toBe(tobe)
  })
  test('高亮关键词带尖括号', () => {
    const targetStr = `对一个正则表达式&gt;模式&lt;span`
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
    const tobe = `对一个<span class="hl" style="color: red">正则</span>表达式<span class="hl" style="color: black">&gt;</span>模式<span class="hl" style="color: blue">&lt;span</span>`
    expect(utils.highlight(targetStr, highlighters)).toBe(tobe)
  })
  test('原始文本带标签，高亮关键词带尖括号和标签内容', () => {
    const targetStr = `对一个<div>正则</div>表达式&gt;模式`
    const highlighters = [{
      word: 'span',
      color: 'blue'
    }, {
      word: '>',
      color: 'black'
    }]
    const tobe = `对一个<div>正则</div>表达式<span class="hl" style="color: black">&gt;</span>模式`
    expect(utils.highlight(targetStr, highlighters)).toBe(tobe)
  })
  /* test('截词符高亮', () => {
    const targetStr = `对一个正则表达式模式spans and hello!`
    const highlighters = [{
      word: 'hello?',
      color: 'blue'
    }, {
      word: 'spans',
      color: 'black'
    }]
    const tobe = `对一个正则表达式模式<span class="hl" style="color: black">spans</span> and <span class="hl" style="color: blue">hello!</span>`
    expect(utils.highlight(targetStr, highlighters, true)).toBe(tobe)
  }) */
  /* test('关联高亮,w运算符', () => {
    const targetStr = `对一个正则表达式模式`
    const highlighters = [{
      word: '正 w  则',
      color: 'blue'
    }, {
      word: '表 1w 式',
      color: 'black'
    }]
    const tobe = `对一个<span class="hl" style="color: blue">正则</span><span class="hl" style="color: black">表达式</span>模式`
    expect(utils.highlight(targetStr, highlighters, true, true)).toBe(tobe)
  })
  test('关联高亮,d运算符', () => {
    const targetStr = `对一个正则表达式模式式应表`
    const highlighters = [{
      word: '表 1d  式',
      color: 'blue'
    }]
    const tobe = `对一个正则<span class="hl" style="color: blue">表达式</span>模式<span class="hl" style="color: blue">式应表</span>`
    expect(utils.highlight(targetStr, highlighters, true, true)).toBe(tobe)
  })
  test('传单个关键词', () => {
    const targetStr = `对一个正则表达式模式式应表`
    const highlighters = {
      word: '表 1d  式',
      color: 'blue'
    }
    const tobe = `对一个正则<span class="hl" style="color: blue">表达式</span>模式<span class="hl" style="color: blue">式应表</span>`
    expect(utils.highlight(targetStr, highlighters, true, true)).toBe(tobe)
  }) */
})
describe(`清除高亮方法测试`, () => {
  test('纯文本情况', () => {
    const targetStr = `对一个<span class="hl" style="color: red">正则</span>表达式<span class="hl" style="color: blue">模式</span>`
    const highlighters = [{
      word: '正则',
      color: 'red'
    }, {
      word: '模式',
      color: 'blue'
    }]
    const tobe = `对一个正则表达式模式`
    expect(utils.unhighlight(targetStr, highlighters)).toBe(tobe)
  })
  test('高亮关键词为标签内容', () => {
    const targetStr = `对一个<span class="hl" style="color: red">正则</span>表达式模式`
    const highlighters = [{
      word: '正则',
      color: 'red'
    }, {
      word: 'span',
      color: 'blue'
    }]
    const tobe = `对一个正则表达式模式`
    expect(utils.unhighlight(targetStr, highlighters)).toBe(tobe)
  })
  test('高亮关键词带尖括号', () => {
    const targetStr = `对一个<span class="hl" style="color: red">正则</span>表达式<span class="hl" style="color: black">&gt;</span>模式<span class="hl" style="color: blue">&lt;span</span>`
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
    const tobe = `对一个正则表达式&gt;模式&lt;span`
    expect(utils.unhighlight(targetStr, highlighters)).toBe(tobe)
  })
  test('原始文本带标签，高亮关键词带尖括号和标签内容', () => {
    const targetStr = `对一个<div>正则</div>表达式<span class="hl" style="color: black">&gt;</span>模式`
    const highlighters = [{
      word: 'span',
      color: 'blue'
    }, {
      word: '>',
      color: 'black'
    }]
    const tobe = `对一个<div>正则</div>表达式&gt;模式`
    expect(utils.unhighlight(targetStr, highlighters)).toBe(tobe)
  })
  /*test('截词符高亮', () => {
    const targetStr = `对一个正则表达式模式<span class="hl" style="color: black">spans</span> and <span class="hl" style="color: blue">hello!</span>`
    const highlighters = [{
      word: 'hello?',
      color: 'blue'
    }, {
      word: 'spans',
      color: 'black'
    }]
    const tobe = `对一个正则表达式模式spans and hello!`
    expect(utils.unhighlight(targetStr, highlighters, true)).toBe(tobe)
  })
  test('关联高亮,w运算符', () => {
    const targetStr = `对一个<span class="hl" style="color: blue">正则</span><span class="hl" style="color: black">表达式</span>模式`
    const highlighters = [{
      word: '正 w  则',
      color: 'blue'
    }, {
      word: '表 1w 式',
      color: 'black'
    }]
    const tobe = `对一个正则表达式模式`
    expect(utils.unhighlight(targetStr, highlighters, true, true)).toBe(tobe)
  })
  test('关联高亮,d运算符', () => {
    const targetStr = `对一个正则<span class="hl" style="color: blue">表达式</span>模式<span class="hl" style="color: blue">式应表</span>`
    const highlighters = [{
      word: '表 1d  式',
      color: 'blue'
    }]
    const tobe = `对一个正则表达式模式式应表`
    expect(utils.unhighlight(targetStr, highlighters, true, true)).toBe(tobe)
  })
  test('传单个关键词', () => {
    const targetStr = `对一个正则<span class="hl" style="color: blue">表达式</span>模式<span class="hl" style="color: blue">式应表</span>`
    const highlighters = {
      word: '表 1d  式',
      color: 'blue'
    }
    const tobe = `对一个正则表达式模式式应表`
    expect(utils.unhighlight(targetStr, highlighters, true, true)).toBe(tobe)
  })*/
})