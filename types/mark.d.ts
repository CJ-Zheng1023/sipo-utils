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
  start: MarkInfo
  end: MarkInfo
}
export type Markers = Array<Marker> | Marker
/**
 * 执行mark标记
 * @author zhengchj
 * @param {HTMLElement} root         根节点
 * @param {Markers} markers          首尾位置信息对象或集合
 * @param options                    配置项
 */
export declare function mark (root: HTMLElement, markers: Markers, options: object): void

/**
 * 生成首尾位置信息对象
 * @author zhengchj
 * @param {HTMLElement} root
 * @param {Range} range
 * @return {Marker}
 */
export declare function createMarker (root: HTMLElement, range: Range): Marker