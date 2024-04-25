'use client';

import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';

type PetFormBtnProps = {
  actionType: 'add' | 'edit';
};

export default function PetFormBtn({ actionType }: PetFormBtnProps) {
  const { pending } = useFormStatus();
  const addBtn = pending ? 'Adding...' : 'Add a new pet';
  const editBtn = pending ? 'Saving changes...' : 'Edit pet'

  return (
    <Button type="submit" className="mt-5 self-end" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {actionType === 'add' ? addBtn : editBtn}
    </Button>
  );
}
