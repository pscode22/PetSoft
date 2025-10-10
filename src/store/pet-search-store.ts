import { create } from "zustand";

export type SearchState = {
    searchQuery: string;
    handleChangeSearchQuery: (newValue: string) => void;
}


export const usePetSearchQuery = create<SearchState>()(set => ({
  searchQuery : '',
  handleChangeSearchQuery : (newValue : string) => set({searchQuery : newValue})
}))