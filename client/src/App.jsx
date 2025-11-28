import { createBrowserRouter, RouterProvider} from "react-router-dom"
import ThumbnailPage from "./components/pages/ThumbnailPage"
import SignupPage from "./components/auth/SignupPage"
import LoginPage from "./components/auth/LoginPage"
import ForgotPassword from "./components/auth/ForgotPassword"
import ResetPassword from "./components/auth/ResetPassword"
import HomePage from "./components/pages/HomePage"
import UserRedirectRoutes from "./components/routes/UserRedirectRoutes"

function App() {
  const appRouter = createBrowserRouter([
    {
      path:"/",
      element:(
        <UserRedirectRoutes>
          <ThumbnailPage/>
        </UserRedirectRoutes>
    )
    },
    {
      path:"/signup",
      element:(
        <UserRedirectRoutes>
          <SignupPage/>
        </UserRedirectRoutes>
      )
    },
    {
      path:"/login",
      element:(
        <UserRedirectRoutes>
          <LoginPage/>
        </UserRedirectRoutes>
      )
    },
    {
      path:"/forgot-password",
      element:(
        <UserRedirectRoutes>
          <ForgotPassword/>
        </UserRedirectRoutes>
      )
    },
    {
      path:"/reset-password/:token",
      element:(
        <UserRedirectRoutes>
          <ResetPassword/>
        </UserRedirectRoutes>
      ) 
    },
    {
      path:"/home",
      element: <HomePage/>
    }
  ])
  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default App
