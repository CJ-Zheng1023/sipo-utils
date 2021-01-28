/**
 * 替换非标签的<,>符号
 * @author zhengchj
 * @param targetStr
 * @return {string}
 */
export const replaceNotTagArrow = targetStr => {
  const reg = new RegExp('(?<!<[^<>]+)>', 'gi')
  return targetStr.replace(/<(?![^<>]+>)/gi, '&lt;').replace(reg, '&gt;')
}
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
/**
 * 生成uuid
 * @return {string}
 */
export const createUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}
/**
 * 正则特殊符号转义   参考lodash  escapeRegExp方法
 * @param string
 * @return {string}
 */
export const escapeRegExp = (string) => {
  const reRegExpChar = /[\\^$.*+?()[\]{}|]/g
  return (string && reRegExpChar.test(string)) ? string.replace(reRegExpChar, '\\$&') : (string || '')
}
/**
 * // This code was found: https://awik.io/determine-color-bright-dark-using-javascript/
 * 判断颜色是否为浅色
 * @param color
 * @return {boolean}
 */
export const isLight = color => {
  // Variables for red, green, blue values
  var r, g, b, hsp;

  // Check the format of the color, HEX or RGB?
  if (color.match(/^rgb/)) {

    // If RGB --> store the red, green, blue values in separate variables
    color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

    r = color[1];
    g = color[2];
    b = color[3];
  }
  else {

    // If hex --> Convert it to RGB: http://gist.github.com/983661
    color = +("0x" + color.slice(1).replace(
      color.length < 5 && /./g, '$&$&'));

    r = color >> 16;
    g = color >> 8 & 255;
    b = color & 255;
  }

  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
  hsp = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
  );

  // Using the HSP value, determine whether the color is light or dark
  return hsp > 127.5
}