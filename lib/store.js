import { configureStore } from '@reduxjs/toolkit'
import { api } from "@/frontend/services/api";

export function makeStore() {
  return configureStore({
    reducer: {
      [api.reducerPath]: api.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware)
  })
}

const store = makeStore()
export default store