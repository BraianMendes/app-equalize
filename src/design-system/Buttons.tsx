import React from 'react';
import type { ButtonProps } from 'react-native-paper';
import { Button as PaperButton } from 'react-native-paper';

export function PrimaryButton(props: ButtonProps) {
  return <PaperButton mode="contained" {...props} />;
}
