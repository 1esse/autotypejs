# autotypejs
use for typing automatically.

### 介绍
使用原生JavaScript（es6）实现的自动打字效果。

### 效果图
![效果图](https://github.com/1esse/images/blob/master/WeChat-20200812194957.gif?raw=true)

示例代码(vue)：
```vue
<template>
  <div class="type-container"></div>
</template>

<script>
import AutoType from "autotypejs";
export default {
  name: "AutoType",
  mounted() {
    const autoType = new AutoType(".type-container");
    autoType.config({
      loop: false,
      show_cursor: true,
    });
    autoType
      .setStage({
        type: "add",
        text: "如梦今",
        duration: 1000,
        style: {
          "font-weight": "bold",
          "font-size": "23px",
        },
      })
      .setStage({
        type: "delete",
        delete_count: 1,
        duration: 300,
      })
      .setStage({
        text: "令",
        duration: 300,
        style: {
          "font-weight": "bold",
          "font-size": "23px",
        },
      })
      .setStage({
        text: "李清照",
        duration: 500,
        line_wrap: true,
        style: "font-size: 13px; color: #999999;",
      })
      .setStage({
        text: "昨夜雨疏风骤，浓睡不消残酒。",
        duration: 2000,
        line_wrap: true,
      })
      .setStage({
        text: "试问卷帘人，却道海棠依旧。",
        duration: 2000,
        line_wrap: true,
      })
      .setStage({
        text: "是否，是否，",
        duration: 1000,
        line_wrap: true,
      })
      .setStage({
        duration: 1000,
      })
      .setStage({
        type: "delete",
        delete_count: 6,
        duration: 500,
      })
      .setStage({
        text: "知否，知否，",
        duration: 1000,
      })
      .setStage({
        text: "应是绿肥红瘦。",
        duration: 1000,
        line_wrap: true,
      })
      .setStage({
        type: "delete",
        delete_count: 5,
        duration: 500,
      })
      .setStage({
        text: "绿肥",
        duration: 500,
        style: "color: lightgreen; font-size: 25px;",
      })
      .setStage({
        text: "红瘦",
        duration: 500,
        style: "color: orangered; font-size: 13px;",
      })
      .setStage({
        text: "。",
        duration: 200,
      })
      .setStage({
        media: "image",
        src: require("@/assets/cover.jpg"),
        style: "width: 200px; border-radius: 10px;",
        line_wrap: true,
        duration: 500,
      })
      .setStage({
        duration: 2000,
      })
      .runTask();
    autoType.onceDone(() => {
      console.log("打字完成");
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.type-container {
  white-space: normal;
}

.cursor_typing::after {
  content: "|";
  color: black;
  margin-left: 2px;
}
.cursor_stay::after {
  content: "|";
  color: black;
  margin-left: 2px;
  animation: bling 1.5s infinite;
}
@keyframes bling {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  51% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
</style>
```

### 用法
##### 获取：
```
--yarn--
yarn add autotypejs

--git--
git clone https://github.com/1esse/autotypejs.git

--npm--
npm install --save autotypejs
```

#### 浏览器原生：
```html
<body>
  <div class="type-container"></div>
  <script type="module">
      import AutoType from './browser/autotype.js'
      const autoType = new AutoType('.type-container')
      // ...
  </script>
</body>
```

#### vue：
```vue
<template>
  <div class="type-container"></div>
</template>

<script>
import AutoType from "autotypejs";
export default {
  name: "AutoTypeExample",
  mounted() {
    const autoType = new AutoType(".type-container");
    // ...
  }
}
</script>
```

### API
#### config：配置
```javascript
// ...
// 调用config函数并传入一个对象参数可以配置一些属性，也可以在实例化的时候以第二个参数传入构造器进行属性配置
autoType.config({
    cursor_typing = 'cursor_typing',
    cursor_stay = 'cursor_stay',
    loop = false,
})
/** 可配置属性
* cursor_typing: 打字时游标的css类名
* cursor_stay: 停留时游标的css类名
* loop: 是否循环
* show_cursor: 是否显示游标
* show_end_cursor: 打字结束时是否显示游标
*/
```

#### setStage：设置阶段
```javascript
// ...
autoType.setStage({
  type: "add",
  text: "如梦令",
  duration: 1000,
  style: {
    "font-weight": "bold",
    "font-size": "23px",
  },
})

/** 可配置属性
 * media: 媒体类型 "text"-文本，"image"-图片，默认"text"
 * text: 添加文字
 * duration: 该stage执行时长
 * type: 类型 add-添加，delete-删除，默认"add"
 * delete_count: 删除个数，type为delete的时候提供
 * src: 媒体类型为image时提供
 * line_wrap: 是否换行，默认false
 * style: 样式，接受字符串或者对象参数
 */
```

#### runTask：启动任务
```javascript
// ...
autoType.setStage({
  type: "add",
  text: "如梦令",
  duration: 1000,
  style: {
    "font-weight": "bold",
    "font-size": "23px",
  },
}).runTask()
```

#### onceDone：监听任务完成事件
```javascript
// ...
autoType.onceDone(() => {
    console.log("打字完成")
})
```

### 注意事项
1. 脚本运行中需要获取dom节点，请确保需要操作的节点在对象实例化前已挂载并传入正确的标识符（如 .type-container）。
2. 游标的样式类默认为（停留：cursor_stay，打字中：cursor_typing），如果自定义游标的样式类（参考autotype.css），需要重新[配置游标类名](#config配置)。
3. 每设置一个stage为一个阶段，一个完整的任务是按顺序执行完所有阶段。
4. [监听任务完成事件](#oncedone监听任务完成事件)为每完整执行一次任务触发一次，这意味着开启loop循环的情况下每执行完一次都会触发一遍。
