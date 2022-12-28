import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { setupStackDialog, StackDialog, useInitStackDialog } from '@mui-ext/core';

// export type StackDialogExampleProps = {
//   //
// }

const waiting = (seconds: number): Promise<void> => new Promise<void>(resolve => setTimeout(resolve, seconds * 1000));

export function StackDialogExample() {
  const dialog = useInitStackDialog({});

  const [example1, setExample1] = useState(0);
  const [example2, setExample2] = useState<Record<string, string> | undefined>(undefined);

  useEffect(() => {
    setupStackDialog({
      titleProps : {
        sx: { backgroundColor: 'pink' },
      },
      buttonProps: {
        variant: 'contained',
      },
    });
  }, []);

  const click1 = () => {
    dialog.open({
      title  : 'Example 1',
      content: function Example1() {
        const [value, setValue] = useState(example1);

        useEffect(() => {
          setExample1(value);
        }, [value]);

        return (
          <div>
            <Button
              onClick={() => setValue(prev => prev + 1)}
            >change value: {value}</Button>
            <Button onClick={() => dialog.alert({ content: `ok - ${value}` })}>Show another dialog</Button>
          </div>
        );
      },
    });
  };

  const click2 = () => {
    dialog.alert({
      title   : 'Example 2',
      content : function Example2() {
        const [values, setValues] = useState(example2);

        useEffect(() => {
          setExample2(values);
        }, [values]);

        return (
          <div>
            <div>
              <input
                type="text" value={values?.username ?? ''}
                onChange={(e) => setValues(prev => ({ ...prev, username: e.target.value }))}
              />
            </div>
            <div>
              <select
                value={values?.type ?? ''}
                onChange={(e) => setValues(prev => ({ ...prev, type: e.target.value }))}
              >
                <option value="">Select...</option>
                <option value="test-1">Test 1</option>
                <option value="test-2">Test 2</option>
              </select>
            </div>
            {new Array(50).fill(null).map((_, idx) => (<div key={idx}>{idx}</div>))}
          </div>
        );
      },
      dividers: true,
    });
  };

  const click3 = () => {
    dialog.confirm({
      title    : 'Example 3',
      content  : 'click [Confirm] to emit waiting',
      onConfirm: async () => waiting(2),
    });
  };

  return (
    <>
      <Box>
        <pre>{JSON.stringify({ example1, example2 }, null, 2)}</pre>
        <Button onClick={() => click1()}>Example 1</Button>
        <Button onClick={() => click2()}>Example 2</Button>
        <Button onClick={() => click3()}>Dialog Confirm Waiting</Button>
      </Box>
      <StackDialog dialog={dialog}/>
    </>
  );
}
