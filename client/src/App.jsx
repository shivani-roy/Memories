import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Error, HomeLayout, Landing, PostDetails } from "./pages";
import { Auth } from "./components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },

      {
        path: "posts",
        element: <Landing />,
      },

      {
        path: "posts/:id",
        element: <PostDetails />,
      },

      {
        path: "posts/search",
        element: <Landing />,
      },

      {
        path: "auth",
        element: <Auth />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
