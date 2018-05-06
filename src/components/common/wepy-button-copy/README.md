# wepy-button-copy

```sh
npm i @meitu/wepy-button-copy --save

import ButtonCopy from '@meitu/wepy-button-copy';

<button-copy :content.sync="copyContent" @tap.user="copySuccess">

    <text slot="button">点我复制</text>

</button-copy>


data = {
    copyContent:'我是复制的内容啊',
}
....
components = {
    'button-copy': ButtonCopy,
}

```
## 参数说明
```js
    {
        content, //复制的内容
        className, //按钮样式
    }

  methods = {
      copySuccess(data){
          //data.code = 0 ;复制成功
          //data.content
      }
  }

  //弹窗内容 通过slot='content' 传入
```

## gitlab
[gitlab](https://gitlab.meitu.com/npm/wepy-app)

## 示例效果图
![效果图](http://f2er.meitu.com/zhy/npm_images/wepy-button-copy-eg.png)
