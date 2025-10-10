'use client';

import React from 'react';
import { Button } from './ui/button';
import { useFormStatus } from 'react-dom';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils'; // if you’re already using cn() helper for class merging

type AuthFormBtnProps = {
  type: 'logIn' | 'signUp';
  isRedirecting?: boolean;
};

export default function AuthFormBtn({ type, isRedirecting = false }: AuthFormBtnProps) {
  const { pending } = useFormStatus();

  // 🧩 Determine the button label
  let label = '';
  if (isRedirecting) {
    label = 'Redirecting...';
  } else if (pending) {
    label = type === 'logIn' ? 'Logging in...' : 'Signing up...';
  } else {
    label = type === 'logIn' ? 'Log In' : 'Sign Up';
  }

  // 🧩 Determine the button color
  const isProcessing = pending || isRedirecting;

  return (
    <Button
      disabled={isProcessing}
      className={cn(
        'transition-colors duration-300',
        isRedirecting
          ? 'bg-muted text-zinc-600 hover:bg-muted/80'
          : ''
      )}
    >
      {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {label}
    </Button>
  );
}

