# sipo-utils工具类库

1. 安装

   ```
   npm i sipo-utils
   或者
   yarn add sipo-utils
   ```

2. 模块引入

   ```
   引入整个库
   import sipoUtils from 'sipo-utils'
   或者单独引入个别方法
   import {highlight} from 'sipo-utils'
   ```

3. api

   - highlight  高亮

     ```
     /**
      * 执行高亮操作
      * @param targetStr     目标字符串
      * @param highlighters  高亮关键词集合或对象   example:[{word: "bus", color: "red"}] 或者 {word: "bus", color: "red"}
      * @param truncatable   启用截词符高亮，默认值为true
      * @param relatable     启用关联高亮，默认值为false
      * @return string       执行高亮后的字符串
      */
     highlight(targetStr, highlighters, truncatable, relatable)
     ```

   - unhighlight  取消高亮

     ```
     /**
      * 清除高亮操作
      * @param targetStr     目标字符串
      * @param highlighters  高亮关键词集合或对象   example:[{word: "bus", color: "red"}] 或者 {word: "bus", color: "red"}
      * @param truncatable   启用截词符高亮，默认值为true
      * @param relatable     启用关联高亮，默认值为false
      * @return string       清除高亮后的字符串
      */
     unhighlight(targetStr, highlighters, truncatable, relatable)
     ```

   - focus  聚焦

     ```
     /**
      * 执行聚焦操作
      * @param targetStr     目标字符串
      * @param focusers      聚焦关键词集合     example:[{word: "bus"}]
      * @returns string      聚焦后的字符串
      */
     focus(targetStr, focusers)
     ```
   
    - highdense  高密
      
      ```
      /**
       * 执行聚焦操作
       * @param container     外层容器
       * @param className     需要高密的样式名，默认为hl
       * @returns Map         高密Map<颜色, 相对高度百分比集合set>
       */
      highdense(container, className)
      ```
   
      

     

   

   
   
   