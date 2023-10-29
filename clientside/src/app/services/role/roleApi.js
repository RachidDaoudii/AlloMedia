import { ApiSlice } from "../../api/apiSlice";

export const roleApi = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.mutation({
      query: () => ({
        url: "auth/roles",
        method: "get",
      }),
    }),
  }),
});

export const { useGetRolesMutation } = roleApi;
