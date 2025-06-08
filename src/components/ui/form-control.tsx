import { Field, FieldRootProps } from '@chakra-ui/react';

interface FormControlProps {
  label: string;
  errorMessage?: string;
}

export default function FormControl({
  children,
  label,
  errorMessage,
  ...rest
}: React.PropsWithChildren<FieldRootProps & FormControlProps>) {
  return (
    <Field.Root {...rest}>
      <Field.Label>
        {label} <Field.RequiredIndicator />
      </Field.Label>

      {children}

      <Field.ErrorText>{errorMessage}</Field.ErrorText>
    </Field.Root>
  );
}
