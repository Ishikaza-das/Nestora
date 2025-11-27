import { createBrowserRouter, RouterProvider} from "react-router-dom"
import ThumbnailPage from "./components/pages/ThumbnailPage"
import SignupPage from "./components/auth/SignupPage"
import LoginPage from "./components/auth/LoginPage"
import ForgotPassword from "./components/auth/ForgotPassword"
import ResetPassword from "./components/auth/ResetPassword"

function App() {
  const appRouter = createBrowserRouter([
    {
      path:"/",
      element:<ThumbnailPage/>
    },
    {
      path:"/signup",
      element:<SignupPage/>
    },
    {
      path:"/login",
      element:<LoginPage/>
    },
    {
      path:"/forgot-password",
      element:<ForgotPassword/>
    },
    {
      path:"/reset-password/:token",
      element: <ResetPassword/>
    }
  ])
  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default App
