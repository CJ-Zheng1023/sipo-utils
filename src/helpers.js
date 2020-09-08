/**
 * 替换非标签的<,>符号
 * @author zhengchj
 * @param targetStr
 * @return {string}
 */
export const replaceNotTagArrow = targetStr => targetStr.replace(/<(?![^<>]+>)/gi, '&lt;').replace(/(?<!<[^<>]+)>/gi, '&gt;')
/**
 * 替换所有<,>符号
 * @author zhengchj
 * @param targetStr
 * @return {string}
 */
export const replaceAllArrow = targetStr => targetStr.replace(/</gi, '&lt;').replace(/>/gi, '&gt;')
/**
 * 查找两个节点最邻近的共同父节点
 * @author zhengchj
 * @param node1
 * @param node2
 * @return {Node}
 */
export const queryCommonParentNode = (node1, node2) => {
  if (node1.contains(node2)) {
    return node1
  } else if (node2.contains(node1)) {
    return node2
  } else {
    return queryCommonParentNode(node1.parentNode, node2)
  }
}
/**
 * dom树抽出文本节点转数组
 * @author zhengchj
 * @param root
 * @return {Array}
 */
export const flattenTree = root => {
  let array = []
  if (!root.hasChildNodes()) {
    array.push(root)
    return array
  }
  let nodes = root.childNodes
  for (let i = 0, len = nodes.length; i < len;i ++) {
    Array.prototype.push.apply(array, flattenTree(nodes[i]))
  }
  return array
}
/**
 * 对象封装成集合
 * @author zhengchj
 * @param objects
 * @returns {[]}
 */
export const toArray = (objects) => {
  return Array.isArray(objects) ? objects : [objects]
}