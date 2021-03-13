export type VerifcationFormData = {
  code: string;
  token: string;
};

export type VerificationComponentProps = {
  canResend: boolean;
  resend: () => void;
};

export type ResendFields = {
  userId: string;
};
