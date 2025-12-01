import { createBrowserRouter, RouterProvider} from "react-router-dom"
import ThumbnailPage from "./pages/ThumbnailPage"
import SignupPage from "./auth/SignupPage"
import LoginPage from "./auth/LoginPage"
import ForgotPassword from "./auth/ForgotPassword"
import ResetPassword from "./auth/ResetPassword"
import HomePage from "./pages/HomePage"
import UserRedirectRoutes from "./routes/UserRedirectRoutes"
import ProfilePage from "./pages/ProfilePage"

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
    },
    {
      path:"/profile",
      element:<ProfilePage/>
    }
  ])
  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default App
