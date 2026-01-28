import { create } from "zustand";
import type { GET_FILTERS } from "../types/global.type";

type FilterStore = {
  filters?: GET_FILTERS;
  setFilters: (filters?: GET_FILTERS) => void;
};

export const useFilterStore = create<FilterStore>((set) => ({
  filters: undefined,
  setFilters: (filters) => set({ filters }),
}));
