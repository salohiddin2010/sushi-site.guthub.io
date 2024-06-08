import { Login } from "../authPages/Login";
import { Regsiter } from "../authPages/Regsiter";

export const routes = [
  { id: "login", path: "/login", element: <Login /> },
  { id: "registr", path: "/registr", element: <Regsiter /> },
];
