import * as React from 'react';
import Color from 'color';
import { Flex, FlexChild, justifyContentShorten } from '@mui-ext/core';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title    : '@mui-ext-core/Flex',
  component: Flex,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    inline : { description: '行内', defaultValue: undefined, control: 'select', options: [undefined, true, false] },
    col    : { description: '列', defaultValue: undefined, control: 'select', options: [undefined, true, false] },
    rev    : { description: '反转', defaultValue: undefined, control: 'select', options: [undefined, true, false] },
    justify: {
      defaultValue: undefined,
      control     : 'select',
    },
    items  : {
      defaultValue: undefined,
      control     : 'select',
    },
    gap    : {
      defaultValue: undefined,
      control     : 'text',
    },
    grow   : { control: 'text' },
    shrink : { control: 'text' },
    basis  : { control: 'text' }
  },
} as ComponentMeta<typeof Flex>;

const Template: ComponentStory<typeof Flex> = (args) => {
  return (
    <Flex style={{ height: 400, width: 600, backgroundColor: '#eee' }}>
      <Flex {...args} style={{ backgroundColor: 'pink', padding: '1em' }}>
        <FlexChild style={{ backgroundColor: Color('blue').alpha(0.2).toString() }}>
          Child #1
        </FlexChild>
        <FlexChild style={{ backgroundColor: Color('red').alpha(0.2).toString() }}>
          Child #2
        </FlexChild>
        <FlexChild style={{ backgroundColor: Color('green').alpha(0.2).toString() }}>
          Child #3
        </FlexChild>
      </Flex>
    </Flex>
  );
};

export const Basic = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = {

};
