/**
 * 标记位置元信息对象
 */
export interface MarkInfo {
  tagName: string
  tagIndex: number
  offset: number
}

/**
 * 首尾位置信息对象
 */
export interface Marker {
  id: string
  start: MarkInfo
  end: MarkInfo
}
export type Markers = Array<Marker> | Marker

/**
 * 配置信息对象
 */
export interface Options {
  className: string
  hoverClassName: string
  mouseenter?(id: string): void
  mouseleave?(id: string): void
}
/**
 * 执行mark标记
 * @author zhengchj
 * @param {HTMLElement} root         根节点
 * @param {Markers} markers          标记对象或集合
 * @param options                    配置项
 */
export declare function mark (root: HTMLElement, markers: Markers, options: Options): void

/**
 * 生成标记信息对象
 * @author zhengchj
 * @param {HTMLElement} root        根节点
 * @param {Range} range             鼠标拖动选中区域对象
 * @return {Marker}                 标记对象
 */
export declare function createMarker (root: HTMLElement, range: Range): Marker

/**
 * 删除标记
 * @author zhengchj
 * @param {string} id               标记唯一标识
 */
export declare function unmark (id: string): void