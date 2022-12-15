import { Flex, mountOrClone, SnackbarOptions, useSnackbarNotice } from '@mui-ext/core';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { Box, Button } from '@mui/material';

export type UseSnackbarNoticeProps = {
  maxSnack?: number,
  vertical?: 'top' | 'bottom',
  horizontal?: 'left' | 'center' | 'right',
}

type NoticeAction = 'notice' | 'error' | 'success' | 'warning' | 'info'

type ExampleItem = [NoticeAction, string, SnackbarOptions | undefined];

const examples: ExampleItem[] = [
  ['notice', 'notice message', undefined],
  ['error', 'error message', undefined],
  ['success', 'preventDuplicate: success message', {
    preventDuplicate: true
  }],
  ['warning', 'warning message', {
    action: (key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { close } = useSnackbarNotice();
      return (
        <>
          <Button variant="text" onClick={() => close(key)}>Close</Button>
        </>
      );
    }
  }],
  ['info', 'info message', undefined],
];

export function UseSnackbarNotice({
  maxSnack = 4,
  vertical = 'bottom',
  horizontal = 'left',
}: UseSnackbarNoticeProps) {

  return (
    <SnackbarProvider maxSnack={maxSnack}>
      <Box sx={{ p: '1em', height: 400, backgroundColor: '#f0f0f0' }}>
        {mountOrClone(() => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const n = useSnackbarNotice();
          return (
            <Flex gap={1}>
              {examples.map(([type, message, opts], idx) => (
                <Button
                  key={`btn_${idx}`} color={type === 'notice' ? 'secondary' : type}
                  onClick={() => n[type](message, { ...opts, anchorOrigin: { vertical, horizontal } })}
                >{type}</Button>
              ))}
            </Flex>
          );
        })}
      </Box>
    </SnackbarProvider>
  );
}


