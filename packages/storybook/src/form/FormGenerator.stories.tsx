import { Flex } from '@mui-ext/core';
import * as React from 'react';
import { FormGenerator, FormGeneratorProps, MuiSelectOption } from '@mui-ext/hookform';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title    : 'hookform/FormGenerator',
  component: FormGenerator,
  argTypes : {},
} as ComponentMeta<typeof FormGenerator>;

const Template: ComponentStory<typeof FormGenerator> = (args) => {
  return (
    <FormGenerator {...args}/>
  );
};

const typeOptions: MuiSelectOption[] = [
  { value: '', text: 'Select' },
  { value: 'test', text: 'Test' },
  { value: 'type-ok', text: 'Ok' },
  { value: 'type-1', text: 'Type 1' },
  { value: 'type-2', text: 'Type 2' },
  { value: 'type-3', text: 'Type 3' },
  { value: 123, text: '123' },
  { value: 15.55, text: '15.55' },
];

const fields = [
  { name: 'name', label: '名称', input: 'text', rules: { required: true } },
  { name: 'password', label: '密码', input: 'password', rules: { required: true } },
  { name: 'type', label: '类型', input: 'select', inputProps: { options: typeOptions } },
  { name: 'types', label: '类型多选', input: 'select', inputProps: { options: typeOptions, multiple: true } },
  { name: 'description', label: '描述', input: 'textarea', placeholder: '可输入多行描述' },
]

export const Basic = Template.bind({});
Basic.args = {
  fields  : fields,
  onSubmit: (data) => console.log('onSubmit', data),
};

export const Layout = Template.bind({});
Layout.args = {
  fields  : fields,
  gap     : '21.455px',
  layout  : [
    ['name', 'password'],
    ['type', 'types'],
    'description',
  ],
  onSubmit: (data) => console.log('onSubmit', data),
};
