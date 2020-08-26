export interface Highlighter{
  word: string
  color: string
}
export declare function highlight(targetStr: string, highlighters: Array<Highlighter>, truncatable?: boolean = true, relatable?: boolean = false): string