import * as React from 'react';
import { HighlightText } from '@mui-ext/core';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title    : 'core/Text/HighlightText',
  component: HighlightText,
  argTypes : {},
} as ComponentMeta<typeof HighlightText>;

const Template: ComponentStory<typeof HighlightText> = (args) => <HighlightText {...args} />;

export const Basic = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = {
  text  : 'Hello World',
  search: 'o w',
  tag   : 'code',
  color : 'orange',
  prefix: ['a', ' '],
  suffix: [' ', '...', 'tail'],
  sx    : {
    backgroundColor: '#f0f0f0',
  },
};
