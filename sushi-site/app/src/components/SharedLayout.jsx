import React from "react";
import { Header } from "./header/Header";
import { Outlet } from "react-router-dom";
export const SharedLayout = () => {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>
    </>
  );
};
