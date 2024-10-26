// src/auth.ts
import { ref, Ref } from 'vue';

export const isAuthenticated: Ref<boolean> = ref(false);

export const login = () => {
  isAuthenticated.value = true;
};

export const logout = () => {
  isAuthenticated.value = false;
};
