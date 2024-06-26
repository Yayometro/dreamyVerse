"use client";
import { Provider } from "react-redux";
import { store } from "./store";
// import { ApiProvider } from "@reduxjs/toolkit/query/react";
// import { apiSlice } from "./features/api/apiSlice";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {/* <ApiProvider api={apiSlice}> */}
        {children}
      {/* </ApiProvider> */}
    </Provider>
  );
}
