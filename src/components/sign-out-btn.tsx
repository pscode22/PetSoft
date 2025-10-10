'use client';

import { logOut } from '@/actions/actions';
import { Button } from './ui/button';
import { useTransition } from 'react';
import { Loader2 } from 'lucide-react';

export default function SignOutBtn() {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      disabled={isPending}
      onClick={async () => {
        startTransition(async () => {
          await logOut();
        });
      }}
    >
      {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {isPending ? 'Signing out...' : 'Sign out'}
    </Button>
  );
}
