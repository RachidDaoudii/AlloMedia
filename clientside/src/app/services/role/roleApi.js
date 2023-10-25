import { ApiSlice } from "../api/apiSlice";

export const authApi = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.query({
      query: () => ({
        url: "auth/roles",
        method: "get",
      }),
    }),
  }),
});
