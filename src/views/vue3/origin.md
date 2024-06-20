### 要了解block, 先了解一下vnode
### 什么是block？有些文章说，block是一个包含dynamicChildren的vnode。我认为这种说法是不对的
先来看看源码中Block的定义
```ts
export let currentBlock: VNode[] | null = null
```
- 从currentBlock的定义来看， Block的本质是一个VNode类型的数组
- 