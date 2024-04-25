'use client';

// import { usePetContext, useSearchContext } from "@/lib/hooks";
import { cn } from '@/lib/utils';
import { usePetListStore } from '@/store/pet-list-store';
import { usePetSearchQuery } from '@/store/pet-search-store';
import { Pet } from '@prisma/client';
import Image from 'next/image';
import { useMemo, useState } from 'react';

export default function PetList() {
  const pets = usePetListStore((state) => state.petList);
  const selectedPetId = usePetListStore((state) => state.selectedPetId);
  const setSelectedPetId = usePetListStore((state) => state.setSelectedPetId);

  const { searchQuery } = usePetSearchQuery();

  const filteredPets = useMemo(
    () => pets.filter((pet) => pet.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [pets, searchQuery]
  );

  return (
    <ul className="bg-white border-b border-light">
      {filteredPets.map((pet: Pet) => (
        <li key={pet.id}>
          <button
            onClick={() => setSelectedPetId(pet.id)}
            // onClick={() => handleChangeSelectedPetId(pet.id)}
            className={cn(
              'flex items-center h-[70px] w-full cursor-pointer px-5 text-base gap-3 hover:bg-[#EFF1F2] focus:bg-[#EFF1F2] transition',
              {
                'bg-[#EFF1F2]': selectedPetId === pet.id,
              }
            )}
          >
            <Image
              src={pet.imageUrl}
              alt="Pet image"
              width={45}
              height={45}
              className="w-[45px] h-[45px] rounded-full object-cover"
            />
            <p className="font-semibold">{pet.name}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}
