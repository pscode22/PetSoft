'use client';

import { usePetListStore } from '@/store/pet-list-store';
import { usePetSearchQuery } from '@/store/pet-search-store';
import { Pet } from '@prisma/client';

type StoreInitializerProps = {
  children: React.ReactNode;
  petList: Pet[];
};

export default function PetListStoreInitializer({
  children,
  petList,
}: StoreInitializerProps) {
  // PetList
  usePetListStore.setState({
    petList,
  });

  // Search Pets
  usePetSearchQuery.setState({ searchQuery: '' });

  return <>{children}</>;
}
