# wepy-tabs
> 目前只支持水平方向  

```sh
npm i @meitu/wepy-tabs --save

import Tabs from '@meitu/wepy-tabs';

<Tabs :tabs="data" @tap.user="onTabChange"></Tabs>

....
components = {
    tab: Tabs,
}

```

## 参数说明
```js
    tabs = {
        title:[], //必填，['分类1','分类2','分类3',]
        scroll:false, //是否可以滑动，默认false
        fixed:false, //是否开启吸顶，默认false
        selectedIndex: 0, //默认选中第几项，默认0
        componentId:'', // 非必填
        className:'mt-tabs', // 默认'mt-tabs'
        scrollWithAnimation:false, //滚动时是否有过渡效果
    }

  methods = {
      onTabChange(index){
          // index 当前选中的tab索引
      }
  }

```

## gitlab
[gitlab](https://gitlab.meitu.com/npm/wepy-app)


## 示例效果图
![效果图](http://f2er.meitu.com/zhy/npm_images/wepy-tabs-eg.png)
