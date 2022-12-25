import { ComponentOrElement} from '@mui-ext/core';
import { Button } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as React from 'react';
import { FormLoadingProps, HookForm } from '@mui-ext/hookform';
import { ComponentStory, ComponentMeta } from '@storybook/react';

type Example = {
  id: string,
  name: string,
}

type HookFormLoadingProps = {
  loading?: boolean,
  loadingRender?: ComponentOrElement,
}

function HookFormLoading({
  loading: outerLoading = false,
  loadingRender,
}: HookFormLoadingProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(outerLoading);
  }, [outerLoading]);

  return (
    <>
      <HookForm<Example> loadingRender={loadingRender} loading={loading} sx={{ mb: '1rem' }}>
        {({ register }) => {
          return (
            <>
              <div>
                <label>
                  Id:<br/>
                  <input type="text" {...register('id')} />
                </label>
              </div>
              <div>
                <label>
                  Name:<br/>
                  <input type="text" {...register('name')} />
                </label>
              </div>
            </>
          );
        }}
      </HookForm>
      <Button
        variant="contained"
        color={loading ? 'success' : 'primary'}
        onClick={() => setLoading(!loading)}
      >Loading {loading ? 'On' : 'Off'}</Button>
    </>
  );
}

export default {
  title    : 'hookform/Loading',
  component: HookFormLoading,
  argTypes : {},
} as ComponentMeta<typeof HookFormLoading>;

const Template: ComponentStory<typeof HookFormLoading> = (args) => {
  return (
    <HookFormLoading {...args}/>
  );
};

export const Basic = Template.bind({});
Basic.args = {};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
};

function CustomLoading({ loading, duration = 500 }: FormLoadingProps<{ duration?: number }>) {
  const ticker = useRef<NodeJS.Timeout | undefined>(undefined);
  const [count, setCount] = useState(1);

  const tick = useCallback(() => {
    setCount(prev => prev >= 3 ? 0 : prev + 1);
  }, []);

  useEffect(() => {
    if (!loading) return;
    ticker.current = setInterval(tick, duration);

    return () => {
      clearInterval(ticker.current);
    };
  }, [loading]);

  return <span>Loading{'.'.repeat(count)}</span>
}

export const LoadingRender = Template.bind({});
LoadingRender.args = {
  loading      : true,
  loadingRender: <CustomLoading />,
};
