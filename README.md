# @mui-ext —— mui 扩展库

该库是针对 [@mui](https://mui.com/) 为基础的扩展库。

以现行常见的 React UI 库，经过我长期大量的观察，最终选定以 mui 作为基础，基于几个原因：

1. Material Design 有被实际广泛实践应用（Google、Android，世界范围，跨平台实现）证实易用、有助于提高人机操作、美观精致、有反馈性交互的 UI 设计规范，不是那些奇奇怪怪的把先做出界面，再制定 Design Spec 塑料 UI 规范。
2. mui 本身具有非常久的历史，从 2.0 开始关注这个库，现在已经到 5.0，整体的稳定性，代码规范性，type 全面性，都是很好的状态。
3. 提供 virtualized 兼容
4. 基于 `emotion.js` ，不再用纠结 stylesheet，不用再纠结样式权重，className （裹脚布一样长）命名。
5. mui 的全局样式管理，可和 state 动态交互，非常全面、彻底、有效、易于管理和维护（毕竟迭代了这么久）。
6. 面向基础设计，`mui` 并不属于上手即可用的库（当然你可以这么用），他更接近于一个基础 UI 组件库，存在很大的定制空间。

该库主要包含几个部分：

- [@mui-ext/core](packages/core/README.md) - 公共组件 & hooks [![version](https://img.shields.io/npm/v/@mui-ext/core?style=for-the-badge)](https://www.npmjs.com/package/@mui-ext/core) [![dw](https://img.shields.io/npm/dw/@mui-ext/core?style=for-the-badge)](https://www.npmjs.com/package/@mui-ext/core)

- @mui-ext/hookform - react-hook-form 在 mui 上的定制
- @mui-ext/dataview - 复杂的数据表视图

## 类型使用约束

1. 不要直接使用 `React.XXXX` ，而应该 `import { XXXX } from 'react'`
2. `tsx` 包含 jsx 语法块的文件，应该至少确保文件引用了 `import React from 'react'`
3. build 输出物，应该检查，是否存在不必要的输出内容（如多余的引用，或者 `.d.ts` 引入了不必要的类型）。

**重要**：暂勿使用 `'@mui/material/ComponentName'` 的方式导入组件，rollup 打包部分有待优化。

## styled 组件使用的问题

在 projectA 中定义了 `StyledA: StyledComponent` (projectA 声明了 emotion.js 的依赖)

在 projectB 中通过 tsconfig 或 webpack resolve 引入了 `StyledA`，项目中可以正常使用这个组件，但是会出现 TS 的报错，诸如 `TS2742: The inferred type of 'StyledA' cannot be named without a reference to  ....`

必须在 projectB 中，也包含对 emotion.js 的依赖（并确保正确安装），才能解除上述的错误。

## 依赖版本

```json
{
  "react": "^18",
  "react-dom": "^18",
  "react-is": "^18",
  "@types/react": "^18",
  "@types/react-dom": "^18",
  "@types/react-is": "^17",
  "clsx": "^1.2.1",
  "csstype": "^3",
  "@emotion/react": "^11",
  "@emotion/styled": "^11",
  "@mui/icons-material": "^5",
  "@mui/material": "^5",
  "@mui/styles": "^5",
  "notistack": "^2"
}
```

`@emotion/react` 和 `@emotion/styled` 可选放入 `devDependencies`

@mui-ext/core 依赖 mui ，所以实际导出的内容未包含 `@emotion` 的引用（实际源码 or type 定义），但实际项目中仍旧需要安装（mui 的使用本身也要求如此）。
