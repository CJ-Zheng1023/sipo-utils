import utils from '../../index'
describe('高亮方法测试', () => {
  test('高亮方法测试1', () => {
    expect(utils.highlight("test")).toBe("test")
  })
})