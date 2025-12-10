import { createBrowserRouter, RouterProvider} from "react-router-dom"
import ThumbnailPage from "./components/pages/ThumbnailPage"
import SignupPage from "./components/auth/SignupPage"
import LoginPage from "./components/auth/LoginPage"
import ForgotPassword from "./components/auth/ForgotPassword"
import ResetPassword from "./components/auth/ResetPassword"
import HomePage from "./components/pages/HomePage"
import UserRedirectRoutes from "./components/routes/UserRedirectRoutes"
import ProfilePage from "./components/pages/ProfilePage"
import AddProperty from "./components/pages/AddProperty"
import UploadImages from "./components/pages/UploadImages"
import PropertyView from "./components/pages/PropertyView"
import "./utils/LeafletFix"
import About from "./components/pages/About"
import ProtectedRoutes from "./components/routes/ProtectedRoutes"
import Chat from "./components/pages/Chat"

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
      path:"/about",
      element:<About/>
    },
    {
      path:"/profile",
      element:(
        <ProtectedRoutes>
          <ProfilePage/>
        </ProtectedRoutes>
      )
    },
    {
      path:"/app-property",
      element:(
        <ProtectedRoutes>
          <AddProperty/>
        </ProtectedRoutes>
      )
    },
    {
      path:"/:id/images",
      element:(
        <ProtectedRoutes>
        <UploadImages/>
        </ProtectedRoutes>
      )
    },
    {
      path:"/propertyview/:id",
      element:<PropertyView/>
    },
    {
      path:"/chat",
      element:(
        <ProtectedRoutes>
          <Chat/>
        </ProtectedRoutes>
      )
    }
  ])
  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default App