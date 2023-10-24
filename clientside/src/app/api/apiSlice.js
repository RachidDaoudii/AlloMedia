import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const BaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api",
});

export const ApiSlice = createApi({
  baseQuery: BaseQuery,
  endpoints: (builder) => ({}),

  
});
