import {queryCommonParentNode, flattenTree, toArray, createUUID} from './helpers'
import './styles/mark.css'
/**
 * 获取指定元素
 * @author zhengchj
 * @param root       根
 * @param tagName    标签名称
 * @param tagIndex   下标
 * @private
 */
const _getElement = (root, {tagName, tagIndex}) => tagIndex === -1 ? root : root.getElementsByTagName(tagName)[tagIndex]
/**
 * 获取指定节点
 * @author zhengchj
 * @param pElement      父元素
 * @param offset        相对于父元素的文本偏移量
 * @param returnFirst   是否返回splitText之后的第一个节点
 * @private
 */
const _getNode = (pElement, offset, returnFirst) => {
  let nodeStack = [pElement]
  let curNode
  let realOffset = 0, curOffset = 0
  while (curNode = nodeStack.pop()) {
    let nodes = curNode.childNodes
    for (let length = nodes.length, i = length - 1; i >= 0; i --) {
      nodeStack.push(nodes[i])
    }
    //当是文本节点的时候
    if (curNode.nodeType === 3) {
      realOffset = offset - curOffset
      curOffset += curNode.textContent.length
      if (curOffset >= offset) {
        break
      }
    }
  }
  curNode.splitText(realOffset)
  return returnFirst ? curNode : curNode.nextSibling
}
/**
 * 获取起始节点结束节点区间内的所有文本节点
 * @author zhengchj
 * @param startNode     起始节点
 * @param endNode       结束节点
 * @return {Array}
 * @private
 */
const _getSelectedNodes = (startNode, endNode) => {
  let parentNode = queryCommonParentNode(startNode, endNode)
  let flag = 0   //0:首尾区间之前    1:首尾区间内      2:首尾区间之后
  let nodes = flattenTree(parentNode)
  return nodes.filter(item => {
    if (item === startNode) {
      flag = 1
      return true
    }
    if (item === endNode) {
      flag = 2
      return true
    }
    return flag === 1
  })
}
const MARK_ATTR = `data-mark-id`
const DEFAULT_OPTIONS = {
  className: 'sipo-mark',
  hoverClassName: 'sipo-mark-hover',
  mouseenter(id){},
  mouseleave(id){}
}
/**
 * 包裹器
 * @author zhengchj
 * @param root
 * @param nodes
 * @param options
 * @param id
 * @private
 */
const _wrap = (root, nodes, options, id) => {
  // 跟设为相对定位，用于删除按钮的绝对定位
  root.style.position = 'relative'
  nodes.forEach(node => {
    const wrap = document.createElement('span')
    wrap.setAttribute(MARK_ATTR, id)
    let {className, hoverClassName, mouseenter, mouseleave} = options
    wrap.className = className
    wrap.addEventListener('mouseenter', _ => {
      mouseenter(id)
      document.querySelectorAll(`[${MARK_ATTR}='${id}']`).forEach(el => {
        el.className = `${className} ${hoverClassName}`
      })
    })
    wrap.addEventListener('mouseleave', _ => {
      mouseleave(id)
      document.querySelectorAll(`[${MARK_ATTR}='${id}']`).forEach(dom => {
        dom.className = className
      })
    })
    wrap.appendChild(node.cloneNode(false))
    node.parentNode.replaceChild(wrap, node)
  })
}
/**
 * 执行mark标记
 * @author zhengchj
 * @param root
 * @param markers     首尾位置信息对象或集合         example: {id: '', start: {tagName: 'p', tagIndex: 0, offset: 1}, end: {tagName: 'p', tagIndex: 0, offset: 9}}
 * @param options     配置项
 */
export const mark = (root, markers, options) => {
  if (!root) {
    return
  }
  toArray(markers).forEach(marker => {
    let {id, start, end} = marker
    let startParentElement = _getElement(root, start)
    let endParentElement = _getElement(root, end)
    let startNode = _getNode(startParentElement, start.offset, false)
    let endNode = _getNode(endParentElement, end.offset, true)
    let selectedNodes = _getSelectedNodes(startNode, endNode)
    const op = options ? {...DEFAULT_OPTIONS, ...options} : DEFAULT_OPTIONS
    _wrap(root, selectedNodes, op, id)
  })
}
/**
 * 获取相对于root元素的element索引和标签名称
 * @author zhengchj
 * @param root
 * @param element
 * @return {{tagName: string, tagIndex: number}}
 * @private
 */
const _getTag = (root, element) => {
  const tagName = element.tagName
  const elements = root.getElementsByTagName(tagName)
  for (let i = 0, len = elements.length; i < len; i ++) {
    if (element === elements[i]) {
      return {tagName, tagIndex: i}
    }
  }
  // -1表示根节点
  return {tagName, tagIndex: -1}

}
/**
 * 获取节点相对于父节点的偏移量
 * @author zhengchj
 * @param node         节点
 * @param offset       在当前节点中的偏移量
 * @return {number}
 * @private
 */
const _getRealOffset = (node, offset) => {
  let nodeStack = [node.parentElement]
  let curNode
  let realOffset = offset
  while (curNode = nodeStack.pop()) {
    let nodes = curNode.childNodes
    for (let len = nodes.length, i = len - 1; i >= 0; i --) {
      nodeStack.push(nodes[i])
    }
    if (curNode.nodeType === 3 && curNode !== node) {
      realOffset += curNode.textContent.length
    } else if (curNode.nodeType === 3) {
      break
    }
  }
  return realOffset
}
/**
 * 生成首尾位置信息对象
 * @author zhengchj
 * @param root      根节点
 * @param range     Range对象
 * @return object          example: {id: '', start: {tagName: 'p', tagIndex: 0, offset: 1}, end: {tagName: 'p', tagIndex: 0, offset: 9}}
 */
export const createMarker = (root, range) => {
  if (!root) {
    return null
  }
  let {startContainer, endContainer, startOffset, endOffset} = range
  let startParentTag = _getTag(root, startContainer.parentElement)
  let endParentTag = _getTag(root, endContainer.parentElement)
  let startRealOffset = _getRealOffset(startContainer, startOffset)
  let endRealOffset = _getRealOffset(endContainer, endOffset)
  let id = createUUID()
  return {id, start: {offset: startRealOffset, ...startParentTag}, end: {offset: endRealOffset, ...endParentTag}}
}
/**
 * 删除标记
 * @author zhengchj
 * @param id
 */
export const unmark = (id) => {
  document.querySelectorAll(`[${MARK_ATTR}='${id}']`).forEach(el => {
    //判断待删除节点前面的节点和后面的节点，如果是文本节点，则做整合
    let prevNode = el.previousSibling, nextNode = el.nextSibling
    let prevText = '', nextText = ''
    if (prevNode && prevNode.nodeType === 3) {
      prevText = prevNode.textContent
      el.parentNode.removeChild(prevNode)
    }
    if (nextNode && nextNode.nodeType === 3) {
      nextText = nextNode.textContent
      el.parentNode.removeChild(nextNode)
    }
    let textNode = document.createTextNode(prevText + el.textContent + nextText)
    el.parentNode.replaceChild(textNode, el)
  })
}