import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./assets/css/global.css";
import "./assets/css/reset.css";
import { ProtectedRouter } from "./pages/components/ProtectedRouter";
import { Login } from "../src/pages/login/index";
import { Register } from "../src/pages/Register/index";
import { Home } from "../src/pages/Home/index";
import { UserProvider } from "./contex/user";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRouter>
        {" "}
        <Home />
      </ProtectedRouter>
    ),
  },
]);

export default function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />{" "}
    </UserProvider>
  );
}
