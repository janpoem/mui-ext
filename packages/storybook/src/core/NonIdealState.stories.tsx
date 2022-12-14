import * as React from 'react';
import { Flex, NonIdealState } from '@mui-ext/core';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title     : 'core/NonIdealState',
  component : NonIdealState,
  // parameters: {
  //   controls: {
  //     include: /(ready|title)/g,
  //   },
  // },
  argTypes  : {
    ready: { control: 'boolean', defaultValue: false },
    title: { control: 'text' },
  },
} as ComponentMeta<typeof NonIdealState>;

const Template: ComponentStory<typeof NonIdealState> = (args) => {
  return (
    <Flex sx={{ width: '100%', height: 400, backgroundColor: '#f0f0f0' }}>
      <NonIdealState {...args} />
    </Flex>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  ready      : false,
  children   : 'Content Display',
  title      : 'No Data',
  description: 'No Data Description',
  sx         : {
    '& .title'      : {
      color: 'red',
    },
    '& .description': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      p              : '0.5em',
      borderRadius   : '0.25em',
    },
  },
};

export const Render = Template.bind({});
Render.args = {
  ready      : false,
  children   : 'Content Display',
  title      : 'No Data',
  description: 'No Data Description',
  render     : ({ title, children }) => (
    <div>
      <div>title: {title}</div>
      <div>description: {children}</div>
    </div>
  ),
  sx         : {
    color: 'red',
  },
};
