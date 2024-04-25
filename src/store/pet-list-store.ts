import { PetEssentials } from '@/lib/types';
// import { useOptimistic } from 'react';
import { create } from 'zustand';
import { toast } from 'sonner';
import { addPet, deletePet, editPet } from '@/actions/actions';
import { Pet } from '@prisma/client';
import { useOptimistic } from 'react';

export type PetListState = {
  petList: Pet[];
  selectedPetId: string | null;
  selectedPet: Pet | undefined;
};

export type PetListActions = {
  setPetList: (list: Pet[]) => void;
  setSelectedPetId: (id: string | null) => void;
  handleCheckoutPet: (id: Pet['id']) => Promise<void>;
  handleAddPet: (newPet: PetEssentials) => Promise<void>;
  handleEditPet: (petId: Pet['id'], newPetData: PetEssentials) => Promise<void>;
};

export const usePetListStore = create<PetListState & PetListActions>()(
  (set) => ({
    petList: [],
    selectedPetId: null,
    selectedPet: undefined,

    // Set Pet List
    setPetList: (list) =>
      set((state) => ({ petList: [...state.petList, ...list] })),

    // Set selected pet id.
    setSelectedPetId: (id) => {
      if (id) {
        set((state) => ({
          selectedPetId: id,
          selectedPet: state.petList.find((pet) => pet.id === id),
        }));
      }
    },

    // Remove Pet from the List
    handleCheckoutPet: async (petId: Pet['id']) => {
      // setOptimisticPets({ action: 'delete', payload: petId });
      const error = await deletePet(petId);
      if (error) {
        toast.warning(error.message);
        return;
      }
      // set selectedPet to null
      set(() => ({
        selectedPetId: null,
        selectedPet: undefined,
      }));
    },

    // Add Pet
    handleAddPet: async (newPet: PetEssentials) => {
      const error = await addPet(newPet);
      if (error) {
        toast.warning(error.message);
        return;
      }
    },

    // Edit Pet
    handleEditPet: async (petId: Pet['id'], newPetData: PetEssentials) => {
      // setOptimisticPets({ action: "edit", payload: { id: petId, newPetData } });
      const error = await editPet(petId, newPetData);
      if (error) {
        toast.warning(error.message);
        return;
      }

      // Update selectedPet.
      set((state) => {
        const selectedPet = {
          ...state.petList.find((pet) => pet.id === petId),
          ...newPetData,
        } as Pet;
        return { selectedPet };
      });
    },
  })
);
