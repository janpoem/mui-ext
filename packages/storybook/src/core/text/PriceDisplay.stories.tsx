import * as React from 'react';
import { PriceDisplay } from '@mui-ext/core';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title    : 'core/Text/PriceDisplay',
  component: PriceDisplay,
  argTypes : {},
} as ComponentMeta<typeof PriceDisplay>;

const Template: ComponentStory<typeof PriceDisplay> = (args) => <PriceDisplay {...args} />;

export const Basic = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = {
  value    : 18232.345,
  precision: 2,
  floatMode: 1,
  prefix   : '$',
  adjust   : false,
  sx       : {
    fontSize   : '1.2em',
    fontFamily : 'monospace',
    '& .prefix': {
      fontSize: '0.8em',
      mr      : '0.5em',
    },
    '& .float' : {
      fontSize: '0.8em',
      color   : 'grey',
    },
  },
};
