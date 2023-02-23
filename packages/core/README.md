# @mui-ext/core

[![version](https://img.shields.io/npm/v/@mui-ext/core?style=for-the-badge)](https://www.npmjs.com/package/@mui-ext/core)
[![dw](https://img.shields.io/npm/dw/@mui-ext/core?style=for-the-badge)](https://www.npmjs.com/package/@mui-ext/core)

mui 扩展的核心部分（公共组件与 hooks） 。

[说明文档](https://gitee.com/janpoem/mui-ext/tree/master/docs/core)

## 组件索引

- Loading - 可在任意项目本地化细化配置的公共 Loading 组件
  - setupLoading, useLoadingConfig
- Aspect - 按照特定 ratio 来显示特定宽高比的区域，虽然 CSS3 增加了 `aspect-ratio` ，但整体增加了 CSS 操作复杂维度，不如写成 React 组件易于理解和使用
  - AspectOuter, AspectInner
  - useRatio, useRatioStyle
- Flex - FlexBox，基于 Flex 布局，解决了 CSS 传统布局（position模式和 display: block 模式）很多缺陷和不足，成为目前使用量最大的基础 CSS 属性，逐个逐个 CSS 来写 Flex 实在是既累赘又无意义。 mui 虽然提供了一个 `Stack` 实现类型的功能，然还是单独做一个 Flex 的组件，以便于针对不同平台环境的适配。
  - FlexChild
  - useJustifyContent, useFlexGrowShrink, useFlexGap
- StackDialog
  - setupStackDialog, useStackDialogConfig
  - useInitStackDialog
- NonIdealState
  - setupNonIdealState, useNonIdealStateConfig
- text
  - HighlightText
  - PriceDisplay
  - UnknownDisplay
- SimpleTable - mui table 组件的简单版

## Hooks

- useClsx
- useSnackbarNotice

## Utils 

- numeric
  - isNumeric,
  - filterNumeric, filterNumericWithMin, filterNumericWithMax, filterNumericWithMinMax
  - random
  - round10, floor10, ceil10
- react
  - mountOrClone, extractErrorMessage, stopDomEvent
  - 重要类型（因为很多组件都需要这部分类型，特别列出）
    - `ReactComponent<P>` - `React.ComponentType<P>` 别名
    - `ReactComponentProps<P>` - 仅包含一个 `children` 属性声明
    - `HtmlComponentProps<P>` - 包含 `children`, `style`, `className` 三个属性
    - `MuiComponentProps<P>` - `HtmlComponentProps<P>` 基础上增加 `sx` 属性，该输入为穿透 `mui` 和 `emotion.js` 的重要属性，通过 `sx` 声明的样式，可引用 `mui.theme`，并进入 `emotion.js` 样式优化处理序列
    - `ComponentOrElement<P>` - 对任意的 `React.ComponentType` 或 `ReactElement` 的抽象概括，既可以是一个组件声明（`FunctionComponent` or `ClassComponent`），也可以是一个 Element 实例（`ReactElement`, `ReactNode` 之列），用于描述 `mountOrClone` 之参数

