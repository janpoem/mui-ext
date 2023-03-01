# @mui-ext/hookform

[![gitee-repo](https://img.shields.io/static/v1?label=Gitee&message=https://gitee.com/janpoem/mui-ext&color=555555&logo=gitee&style=for-the-badge&labelColor=C71D23)](https://gitee.com/janpoem/mui-ext)
[![version](https://img.shields.io/npm/v/@mui-ext/hookform?style=for-the-badge)](https://www.npmjs.com/package/@mui-ext/hookform) 
[![dt](https://img.shields.io/npm/dt/@mui-ext/hookform?style=for-the-badge)](https://www.npmjs.com/package/@mui-ext/hookform)

react-hook-form@mui

该版本仅作为早期预览版本，并用于某项目中使用，所以测试代码未完善。

## 组件索引

- HookForm - 将 react-hook-form 表单声明包装成组件，支持泛型（但 hookform 的泛型其实意义不大）。
    - 生成的表单不使用 form 结构（为了和 RN 的使用保持一致的可替换性结构）。
    - setupHookForm - 全局表单配置
    - SubmitRow - 表单的提交按钮行（可选添加 reset、cancel 等，还可添加其他内容）。
    - FormField - react-hook-form Control 的实现，
    - FormFieldError - react-hook-form 的表单字段验证错误提示（目前仅支持 hook form rules 的验证）
    - Label - 针对表单的 Label 预留 I18n 扩展
    - useHookForm - 引用表单上下文，主要用于自行扩展表单组件使用
    - FormGenerator - 配置化表单生成器，上述的一切都没有绑定固定的标签结构，仅包含组件自身的基础内容，FormGenerator
      负责将所有组件整合。
- InputRegistry - 全局输入控件管理（该实例默认不对外直接访问，请通过下面的方面）
    - isRegInput, regInput, getRegInput

### 最基础的用法

```typescript jsx
import { HookForm, SubmitRow } from '@mui-ext/hookform';

<HookForm>
  {({ register }) => {
    return (
      <>
        <div>
          <input type="text" {...register('username')} />
        </div>
        <div>
          <input type="password" {...register('password')} />
        </div>
        <SubmitRow/>
      </>
    )
  }}
</HookForm>
```

### 结合 FormField 组件

```typescript jsx
import { HookForm, SubmitRow, FormField } from '@mui-ext/hookform';

<HookForm>
  <FormField name={'username'} label={'username'} input={'text'} rules={{ required: true }}/>
  <FormField name={'password'} label={'password'} input={'password'} rules={{ required: true }}/>
  <SubmitRow/>
</HookForm>
```

### useHookForm

```typescript
export type HookFormContext<T extends FieldValues = FieldValues> = {
  autoId: string,
  config: HookFormConfig,
  customErrors: HookFormCustomErrors<T>,
  setCustomError: (field: keyof T | string, err: HookFormCustomError | null) => void,
  setCustomErrors: (errs: HookFormCustomErrors<T>) => void,
  loading: boolean,
  setLoading: Dispatch<SetStateAction<boolean>>,
  gap: number | string,
  generalErrorKey: string,
  formSubmit: () => (e: BaseSyntheticEvent) => Promise<void>,
  validateReturn: typeof validateReturn
} & UseFormReturn<T>;
```

### FormGenerator

仅使用 fields

```typescript jsx
import { FormGenerator } from '@mui-ext/hookform';

// 已包含 SubmitRow
<FormGenerator
  fields={[
    { name: 'username', label: 'username', input: 'text' },
    { name: 'password', label: 'password', input: 'password' },
  ]}
/>
```

结合 layout

```typescript jsx
import { FormGenerator } from '@mui-ext/hookform';

<FormGenerator
  fields={[
    { name: 'username', label: 'username', input: 'text' },
    { name: 'password', label: 'password', input: 'password' },
  ]}
  layout={[
    ['username', 'password'],
  ]}
/>
```
