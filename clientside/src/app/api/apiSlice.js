import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const BaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",
  prepareHeaders: (headers) => {
    return headers;
  },
  credentials: "include",
});

export const ApiSlice = createApi({
  baseQuery: BaseQuery,
  endpoints: (builder) => ({}),
});
