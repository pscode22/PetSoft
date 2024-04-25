'use client';

import React from 'react';
import { Button } from './ui/button';
import { useFormStatus } from 'react-dom';
import { Loader2 } from 'lucide-react';

type AuthFormBtnProps = {
  type: 'logIn' | 'signUp';
};

export default function AuthFormBtn({ type }: AuthFormBtnProps) {
  const { pending } = useFormStatus();
  const loginMsg = pending ? 'Logging in...' : 'Log In';
  const signUpMsg = pending ? 'Signing up...' : 'Sign Up';

  return (
    <Button disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {type === 'logIn' ? loginMsg : signUpMsg}
    </Button>
  );
}
