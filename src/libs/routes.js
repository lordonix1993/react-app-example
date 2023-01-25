import { createBrowserRouter } from "react-router-dom";
import ErrorPageComponent from "../components/ErrorPageComponent";
import LoginComponent from "../components/auth/LoginComponent";
import RegisterComponent from '../components/auth/RegisterComponent';
import App from '../App';
import MainLayoutComponent from "../components/MainLayoutComponent";
import DashboardComponent from "../components/DashboardComponent";
import CheckAuthMiddleware from "../middlewares/CheckAuthMiddleware";
import CreativesComponent from "../components/CreativesComponent";
import ServerErrorComponent from "../components/ServerErrorComponent";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPageComponent />,
        children: [
            {
                path: "/",
                element: <CheckAuthMiddleware><MainLayoutComponent /></CheckAuthMiddleware>,
                children: [
                    {
                      path: "/",
                      element: <DashboardComponent />,
                    },
                    {
                        path: "/creatives",
                        element: <CreativesComponent />,
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
            {
                path: "/server-error",
                element: <ServerErrorComponent />,
            },
        ],
    },
  ]);

  export default router;