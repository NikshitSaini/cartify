import { create } from 'zustand';

const useProductStore = create((set) => ({
  products: [],
  currentProduct: null,
  loading: false,
  error: null,
  filters: {
    search: '',
    category: '',
    minPrice: 0,
    maxPrice: Infinity,
  },
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
  },
  
  setProducts: (products) => set({ products }),
  setCurrentProduct: (product) => set({ currentProduct: product }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  
  setFilters: (filters) => set((state) => ({
    filters: { ...state.filters, ...filters },
  })),
  
  resetFilters: () => set({
    filters: {
      search: '',
      category: '',
      minPrice: 0,
      maxPrice: Infinity,
    },
  }),
  
  setPagination: (pagination) => set((state) => ({
    pagination: { ...state.pagination, ...pagination },
  })),
}));

export default useProductStore;
