export interface Highlighter{
  word: string
  corlor: string
}
export declare function highlight(targetStr: string, highlighters: Array<Highlighter>, truncatable?: boolean = true, relatable?: boolean = false): string
export interface sipoUtilsStatic{
  highlight
}
declare const sipoUtils: sipoUtilsStatic
export default sipoUtils



