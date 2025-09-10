import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Notifications } from "@/types/index";

export const getAllNotifications = createApi({
  reducerPath: "getAllNotifications",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getNotifications: builder.query<Notifications[], void>({
      query: () => "notifications/news-and-tips",
    }),
  }),
});

export const { useGetNotificationsQuery } = getAllNotifications;
