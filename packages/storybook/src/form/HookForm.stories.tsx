import { Flex } from '@mui-ext/core';
import * as React from 'react';
import {
  FormField,
  HookForm,
  MuiSelectOption,
  SubmitRow,
  SubmitRowProps,
} from '@mui-ext/hookform';
import { ComponentStory, ComponentMeta } from '@storybook/react';

type Example = {
  id: string,
  name: string,
  type: string,
  types: string[],
  description: string,
}

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

type HookFormLoadingProps = {} & SubmitRowProps

function HookFormStory(props: HookFormLoadingProps) {

  return (
    <HookForm<Example> onSubmit={(d) => console.log('data', d)}>
      {({ setCustomError }) => (
        <Flex col>
          <FormField
            name="id"
            label="id"
            input={'text'}
            rules={{
              required: true,
              validate: (v) => {
                if (`${v}`.length < 4) {
                  throw new Error('aaaaaa');
                }
              },
              onChange: (ev) => {
                const v = `${ev.target.value}`;
                if (!v.startsWith('test')) {
                  setCustomError('id', 'should start with "test"');
                } else {
                  setCustomError('id', null);
                }
              },
            }}
            tip={'Hello'}
          />
          <FormField name="name" label="name" input={'text'} rules={{ maxLength: 10 }}/>
          <FormField name="description" label="description" input={'textarea'} rules={{ minLength: 10 }}/>
          <FormField
            name="type" label="type" input={'select'} inputProps={{ options: typeOptions }} rules={{ required: true }}
          />
          <FormField
            name="types" label="types" input={'select'} inputProps={{ options: typeOptions, multiple: true }}
            rules={{ required: true }}
          />
          <SubmitRow {...props} />
        </Flex>
      )}
    </HookForm>
  );
}

export default {
  title    : 'hookform/HookForm',
  component: HookFormStory,
  argTypes : {},
} as ComponentMeta<typeof HookFormStory>;

const Template: ComponentStory<typeof HookFormStory> = (args) => {
  return (
    <HookFormStory {...args}/>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  submitText : 'Commit',
  enableReset: true,
  onCancel   : () => {

  },
};
