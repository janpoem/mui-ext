import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { UseSnackbarNotice } from './UseSnackbarNotice';

export default {
  title    : 'core/hooks/useSnackbarNotice',
  component: UseSnackbarNotice,
  argTypes : {},
} as ComponentMeta<typeof UseSnackbarNotice>;

const Template: ComponentStory<typeof UseSnackbarNotice> = (args) => <UseSnackbarNotice {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  maxSnack  : 5,
  vertical  : 'bottom',
  horizontal: 'right',
};
