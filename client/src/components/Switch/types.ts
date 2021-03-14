export type SwitchProps = {
  label?: string;
  name: keyof SwitchValues;
  disabled?: boolean;
};

export type SwitchValues = {
  isTwoFactorActive: boolean;
};
