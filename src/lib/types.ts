import { Pet } from '@prisma/client';

export type User = {
  id: string;
  // Add other fields of User type if available in your schema
};

export type PetEssentials = Omit<
  Pet,
  'id' | 'createdAt' | 'updatedAt' | 'userId'
>;
