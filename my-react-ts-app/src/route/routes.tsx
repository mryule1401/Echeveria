import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage"
import LoginPage from "../login/LoginPage";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />, 
  },
    {
    path: "/login",
    element: <LoginPage/>, 
  },
  { 
    path: "/app",
    element: <HomePage />
  }
]);

export default router;
