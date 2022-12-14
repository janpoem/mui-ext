import * as React from 'react';
import { Aspect, Flex } from '@mui-ext/core';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title    : '@mui-ext-core/Aspect',
  component: Aspect,
  argTypes : {
    ratio  : { control: 'text', defaultValue: '16/9' },
    bgColor: { control: 'color' },
    bgSize : { control: 'select', options: ['contain', 'cover'] },
  },
} as ComponentMeta<typeof Aspect>;

const Template: ComponentStory<typeof Aspect> = (args) => {
  return (
    <Aspect {...args}>
      <Flex col grow={1} justify={'center'} items="center" sx={() => ({ color: '#ffffff' })}>
        {args.ratio}
      </Flex>
    </Aspect>
  );
};

export const Basic = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = {
  bgColor: 'pink',
  bg     : 'https://pic.rmb.bdstatic.com/bjh/news/385a6b48583b30946d70f66369273037.jpeg',
  style  : {
    borderRadius: '1em',
  },
};
