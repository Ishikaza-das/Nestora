import { createBrowserRouter, RouterProvider} from "react-router-dom"
import ThumbnailPage from "./components/pages/ThumbnailPage"
import SignupPage from "./components/auth/SignupPage"
import LoginPage from "./components/auth/LoginPage"

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
    }
  ])
  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default App
