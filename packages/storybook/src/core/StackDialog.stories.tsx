import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StackDialogExample } from './StackDialogExample';

export default {
  title    : 'core/StackDialog',
  component: StackDialogExample,
  argTypes : {},
} as ComponentMeta<typeof StackDialogExample>;

const Template: ComponentStory<typeof StackDialogExample> = () => <StackDialogExample />;

export const Basic = Template.bind({});
Basic.args = {
  // maxSnack  : 5,
  // vertical  : 'bottom',
  // horizontal: 'right',
};
