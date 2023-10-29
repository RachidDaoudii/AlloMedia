import { ApiSlice } from "../../api/apiSlice";

export const authApi = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body: body,
      }),
    }),
    register: builder.mutation({
      query: (body) => ({
        url: "auth/register",
        method: "POST",
        body,
      }),
    }),
    sendEmailForGetPAsswor: builder.mutation({
      query: (body) => ({
        url: "auth/forgetpassword",
        method: "POST",
        body,
      }),
    }),
    RestPassword: builder.mutation({
      query: (body) => ({
        url: `auth/forgetpassworduser`,
        method: "POST",
        body,
      }),
    }),
    getMe: builder.mutation({
      query: () => ({
        url: "user/me",
        method: "GET",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMeMutation,
  useLogoutMutation,
  useSendEmailForGetPAssworMutation,
  useRestPasswordMutation,
} = authApi;
