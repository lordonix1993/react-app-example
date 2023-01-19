import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../error-page";
import LoginComponent from "../components/auth/LoginComponent";
import RegisterComponent from '../components/auth/RegisterComponent';
import App from '../App';
import MainLayoutComponent from "../components/MainLayoutComponent";
import DashboardComponent from "../components/DashboardComponent";
import CheckAuthMiddleware from "../middlewares/CheckAuthMiddleware";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <MainLayoutComponent />,
                children: [
                    {
                      path: "/",
                      element: <CheckAuthMiddleware><DashboardComponent /></CheckAuthMiddleware>,
                    },
                  ],
            },
            {
                path: "/login",
                element: <LoginComponent />,
            },
            {
                path: "/register",
                element: <RegisterComponent />,
            },
        ],
    },
  ]);

  export default router;