import { createBrowserRouter, RouterProvider} from "react-router-dom"
import ThumbnailPage from "./components/pages/ThumbnailPage"
import SignupPage from "./components/auth/SignupPage"

function App() {
  const appRouter = createBrowserRouter([
    {
      path:"/",
      element:<ThumbnailPage/>
    },
    {
      path:"/signup",
      element:<SignupPage/>
    }
  ])
  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default App
