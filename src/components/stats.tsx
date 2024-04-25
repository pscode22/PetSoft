'use client';

import { usePetListStore } from '@/store/pet-list-store';

export default function Stats() {
  const numberOfPets = usePetListStore((state) => state.petList).length;

  return (
    <section className="text-center">
      <p className="text-2xl font-bold leading-6">{numberOfPets}</p>
      <p className="opacity-80">current guests</p>
    </section>
  );
}
