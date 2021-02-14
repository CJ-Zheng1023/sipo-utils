/**
 * 获取高亮节点在容器内的相对高度
 * @param target
 * @param container
 * @return {Number|number}  相对高度
 * @private
 */
const _getTop = (target, container) => {
  let top = target.offsetTop
  let parent = target.offsetParent
  if (parent && (container !== parent)) {
    top += _getTop(parent, container)
  }
  return top
}
/**
 * 获取百分比
 * @param dividend
 * @param divisor
 * @return {*}
 * @private
 */
const _getPercentage = (dividend, divisor) => {
  return divisor ? ((dividend / divisor) * 100).toFixed(1) + '%' : 0
}
/**
 * 执行高密操作
 * @param container   外层容器
 * @param className   需要高密的样式名
 * @return {Map}      高密Map<颜色, 相对高度百分比集合set>
 */
export const highdense = (container, className = `hl-start`) => {
  let nodes = container.querySelectorAll(`.${className}`)
  let map = new Map()
  let height = container.offsetHeight
  nodes.forEach(node => {
    let color = node['style']['background-color'] || node['style']['border-top-color']
    if (!color) {
      return
    }
    let top = _getTop(node, container)
    let percentage = _getPercentage(top, height)
    if (!map.has(color)) {
      map.set(color, new Set())
    }
    map.get(color).add(percentage)
  })
  return map
}