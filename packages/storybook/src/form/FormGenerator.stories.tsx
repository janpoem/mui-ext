import { Flex, FlexChild } from '@mui-ext/core';
import * as React from 'react';
import { FormFieldProps, FormGenerator, MuiSelectOption } from '@mui-ext/hookform';
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

const fields: FormFieldProps[] = [
  {
    name      : 'name',
    label     : '名称2',
    input     : 'text',
    rules     : { required: true },
    hookErrors: { required: '不能没有你' },
    tip       : 'aaaa',
    render    : function NameTipRender({ children }) {
      return (
        <Flex justify={'between'} gap={1} items="center">
          <FlexChild>{children}</FlexChild>
          <FlexChild>Hello World</FlexChild>
        </Flex>
      );
    },
  },
  { name: 'password', label: '密码', input: 'password', rules: { required: true } },
  { name: 'type', label: '类型', input: 'select', inputProps: { options: typeOptions } },
  { name: 'types', label: '类型多选', input: 'select', inputProps: { options: typeOptions, multiple: true } },
  { name: 'description', label: '描述', input: 'textarea', placeholder: '可输入多行描述', inputProps: { maxRows: 6 } },
];

export const Basic = Template.bind({});
Basic.args = {
  formTag : 'form',
  fields  : fields,
  onSubmit: (data) => console.log('onSubmit', data),
};

export const Layout = Template.bind({});
Layout.args = {
  hookErrors     : {
    required: 'aaaa',
  },
  fields         : fields,
  gap            : '1em',
  layout         : [
    ['name', 'password'],
    ['type', 'types'],
    'description',
  ],
  formHelperProps: {
    variant: 'outlined',
  },
  onSubmit       : (data, form) => {
    form.setGeneralError('nnnoooo');
    // console.log('onSubmit', data);
  },
};
