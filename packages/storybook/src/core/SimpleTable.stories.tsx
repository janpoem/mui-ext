import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SimpleTableExample } from './SimpleTableExample';

export default {
  title    : 'core/SimpleTable',
  component: SimpleTableExample,
  argTypes : {},
} as ComponentMeta<typeof SimpleTableExample>;

const Template: ComponentStory<typeof SimpleTableExample> = (args) => <SimpleTableExample {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  total: 123
};
