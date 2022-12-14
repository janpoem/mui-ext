import { CircularProgress } from '@mui/material';
import * as React from 'react';
import { Flex, Loading } from '@mui-ext/core';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title     : 'core/Loading',
  component : Loading,
  // parameters: {
  //   controls: {
  //     exclude: /(render|placeholder|children)/g,
  //   },
  // },
  argTypes  : {
    loading: { control: 'boolean', defaultValue: true },
    text   : { control: 'text' },
  },
} as ComponentMeta<typeof Loading>;

const Template: ComponentStory<typeof Loading> = (args) => <Loading {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  text    : '加载中...',
  children: 'Content Display',
  sx      : {
    backgroundColor: 'pink',
  },
};

export const Placeholder = Template.bind({});
Placeholder.args = {
  placeholder: <div>Loading Placeholder</div>,
  children   : 'Content Display',
};

export const Render = Template.bind({});
Render.args = {
  text    : 'Render Loading...',
  render  : ({ children, ...props }) => (
    <Flex {...props} items={'center'} gap={1}>
      <CircularProgress size={20}/>
      {children}
    </Flex>
  ),
  sx      : {
    color: 'red',
  },
  children: 'Content Display',
};
