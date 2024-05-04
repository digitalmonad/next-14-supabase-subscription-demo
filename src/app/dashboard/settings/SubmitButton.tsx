'use client';
import { Button } from '@/components/ui/button';
import React from 'react';
import { useFormStatus } from 'react-dom';

type Props = {};

export const SettingsSubmitButton = (props: Props) => {
  const { pending } = useFormStatus();
  return (
    <Button type='submit' disabled={pending}>
      Save
    </Button>
  );
};
