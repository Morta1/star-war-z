import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/films' }),
  endpoints: (builder) => ({
    getFilms: builder.query({
      query: (title) => `/?title=${title}`,
      transformResponse: (response) => response.data
    }),
    getFilm: builder.query({
      query: ({ id, expand }) => `/${id}${expand ? `?expand=${expand}` : ''}`,
      transformResponse: (response) => response.data
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLazyGetFilmsQuery, useLazyGetFilmQuery } = api;