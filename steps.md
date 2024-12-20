# Memories

- A full-stack social media web app built using the MERN stack.
- allows users to create, edit, like and delete posts.
- used redux for state management and to make the appication scalable.
- implemented user authentication.
- implemented client side routing and pagination, user can also search and filter through posts.
- user can also comment on a post.

1. create two folders in the root directory- client and server.
2. open the terminal and split it into two.
3. navigate to the client folder and create a react app.
   ```sh
   cd client
   npm create vite@latest . -- --template react
   ```

### backend setup

- navigate to the server folder and create `package.json`
  ```sh
    cd server
    npm init -y
  ```
- create `server.js`
- install dependencies for the server
  ```sh
    npm install body-parser cors mongoose express nodemon dotenv morgan express-async-errors http-status-codes
  ```
- In `package.json` include the following command to use ES6 modules instead of `commonJS (require and module.exports)`. <mark> remember to use .js extension when importing files.</mark>

  ```json
  "type": "module",
  ```

- In package.json

  ```json
  "scripts": {
      "start": "nodemon server.js"
    },
  ```

<br>

### frontend setup

- install all necessary packages.
  ```sh
    npm install axios moment react-file-base64 react-redux @reduxjs/toolkit @mui/material @mui/icons-material @emotion/react @emotion/styled
  ```

## backend

- controllers

  - postController.js

- errors

  - CustomError.js

- middleware

  - errorHandlerMiddleware.js

- models

  - PostModel.js

- routes

  - postRouter.js

- .env
- .env.example
- server.js

1. create a server, connect to the database and test the server.

   ```js
   const app = express();
   const port = process.env.PORT || 5100;

   if (process.env.NODE_ENV === "development") {
     app.use(morgan("dev"));
   }

   try {
     await mongoose.connect(process.env.MONGO_URI);

     app.listen(port, () => {
       console.log(`server is listening on port ${port}...`);
     });
   } catch (error) {
     console.log(error);
     process.exit(1);
   }
   ```

2. use `bodyParser` to limit the size of thr image uploaded.

   ```js
   app.use(bodyParser.json({ limit: "30mb", extended: true }));
   app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
   ```

3. setup routes and create controllers.
4. create `postModel`

   ```js
   import mongoose from "mongoose";

   const PostSchema = new mongoose.Schema(
     {
       title: String,
       message: String,
       creator: String,
       tags: [String],
       selectedFile: String,
       likeCount: {
         type: Number,
         default: 0,
       },
     },
     { timestamps: true }
   );

   export default mongoose.model("PostMessage", PostSchema);
   ```

5. use `express-async-errors` for `async` functions.
6. setup logic for `getPosts, createPost` controllers.

7. create custom error classes.
8. create error handler middleware.

## frontend

- api
  - index.js
- components

  - auth

    - Auth.jsx
    - Input.jsx
    - styles.js

  - posts

    - Posts.jsx
    - styles.js
    - post
      - Post.jsx
      - styles.js

  - form

    - Form.jsx
    - styles.js

  - navbar

    - Navbar.jsx
    - styles.js

  - index.js

- pages

  - home

    - HomeLayout.jsx
    - index.js
    - Landing.jsx

  - index.js

- slice

  - posts
    - postsSlice.js

- store

  - store.js

- App.jsx
- main.jsx
- styles.js

1. create `Posts` and `Form` component.
2. use `material-ui` to style the components.
3. create a function `fetchPosts()` to connect to the api. <mark> use the CORS library to connect to the server. </mark>
   <br>
4. Set up the redux store `store.js` and `postsSlice.js`. Use `redux` to create actions for fetching and creating posts. <mark> use createAsyncThunk, since fetching data is an asynchronous operation.</mark>

   ```js
   import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
   import * as api from "../../api";

   const initialState = { posts: [], isLoading: true };

   export const getPosts = createAsyncThunk("posts/getPosts", async () => {
     try {
       const { data } = await api.fetchPosts();
       return data;
     } catch (error) {
       console.log(error);
     }
   });

   export const createPost = createAsyncThunk(
     "posts/createPost",
     async (post) => {
       try {
         const { data } = await api.createPost(post);
         return data;
       } catch (error) {
         console.log(error);
       }
     }
   );

   const postSlice = createSlice({
     name: "posts",
     initialState,
     reducers: {
       // createPost: (state, action) => {
       //   state.posts = [...state.posts, action.payload];
       // },
     },

     extraReducers: (builder) => {
       builder
         .addCase(getPosts.pending, (state) => {
           state.isLoading = true;
         })
         .addCase(getPosts.fulfilled, (state, action) => {
           state.isLoading = false;
           state.posts = action.payload.posts;
         })
         .addCase(getPosts.rejected, (state) => {
           state.isLoading = false;
         })
         .addCase(createPost.fulfilled, (state, action) => {
           state.isLoading = false;
           state.posts = [...state.posts, action.payload];
         });
     },
   });

   console.log(postSlice);
   // export const { createPost } = postSlice.actions;
   export default postSlice.reducer;
   ```

5. In the `Form` component, use state `postData` to collect form data and submit the form.

   ```jsx
   const [postData, setPostData] = useState({
     creator: "",
     title: "",
     message: "",
     tags: "",
     selectedFile: "",
   });
   ```

6. Use `FileBase` from `react-file-base64` to submit file.
   ```jsx
   <div style={useStyles.fileInput}>
     <FileBase
       type="file"
       multiple={false}
       onDone={({ base64 }) =>
         setPostData({ ...postData, selectedFile: base64 })
       }
     />
   </div>
   ```
7. create a function `handleSubmit()` that collects the form data and calls `createPost()` using `useDispatch()`.
   <br>

8. In the `<Posts>` component, use `useSelector()` to access the posts. Iterate through the array and display the posts using the `<Post>` component.

9. In the `<Post>` component, use `material-ui` to display the post in the form a card and style it.
   <br>

10. Use an svg image for the background.

<hr>

### update posts

- create a route and a controller in the backend to update posts.
- Now for the frontend use `redux` and `axios` to create action and reducer for updating posts.
- use a global state `currentId` in `App.jsx` to update posts and alternate between edit form and create post form.

- pass `currentId` and `setCurrentId` as props to `Form.jsx` and `Posts.jsx`
- In `Post.jsx` set the `currentId` to the post selected.

<br>

- In `Form.jsx` populate the form with the current value of post if a post is selected.

  ```jsx
  const { posts } = useSelector((store) => store.posts);
  const post = posts.find((p) => p._id === currentId);
  // console.log(post);

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);
  ```

- Modify the `handleSubmit()` function to dispatch different actions in case of creating post and editing post respectively.

  ```jsx
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!postData.creator || !postData.message || !postData.title) {
      return;
    }

    if (currentId) {
      console.log(postData);
      dispatch(updatePost({ currentId, postData }));
    } else {
      dispatch(createPost(postData));
    }

    clearForm();
  };
  ```

- modify `clearForm()` to clear all form data by setting `currentId` and `postData` as null.
- In `App.jsx` add `currentId` to the dependency array of `useEffect()`.

### delete posts

- repeat the same for deleting the posts.
- create a route and a controller in the backend to delete posts.
- Now for the frontend use `redux` and `axios` to create action and reducer for deleting posts.

### like posts

- repeat the same for liking the posts.
- create a route and a controller in the backend to like posts.
- Now for the frontend use `redux` and `axios` to create action and reducer for liking posts.

  ```jsx
  import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
  import * as api from "../../api";

  const initialState = { posts: [], isLoading: true };

  export const getPosts = createAsyncThunk("posts/getPosts", async () => {
    try {
      const { data } = await api.fetchPosts();
      return data;
    } catch (error) {
      console.log(error);
    }
  });

  export const createPost = createAsyncThunk(
    "posts/createPost",
    async (post) => {
      try {
        const { data } = await api.createPost(post);
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  );

  export const updatePost = createAsyncThunk(
    "posts/updatePost",
    async ({ currentId: id, postData: post }) => {
      try {
        console.log(post);
        const { data } = await api.updatePost(id, post);
        console.log(data);
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  );

  export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
    try {
      await api.deletePost(id);
      return id;
    } catch (error) {
      console.log(error);
    }
  });

  export const likePost = createAsyncThunk("posts/likePost", async (id) => {
    try {
      const { data } = await api.likePost(id);
      return data;
    } catch (error) {
      console.log(error);
    }
  });

  const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
      // createPost: (state, action) => {
      //   state.posts = [...state.posts, action.payload];
      // },
    },

    extraReducers: (builder) => {
      builder
        .addCase(getPosts.fulfilled, (state, action) => {
          state.isLoading = false;
          state.posts = action.payload.posts;
        })
        .addCase(getPosts.rejected, (state) => {
          state.isLoading = false;
        })
        .addCase(createPost.fulfilled, (state, action) => {
          state.isLoading = false;
          state.posts = [...state.posts, action.payload.post];
        })
        .addCase(updatePost.fulfilled, (state, action) => {
          const { _id } = action.payload.post;

          state.posts = state.posts.map((post) => {
            if (post._id === _id) {
              return action.payload.post;
            }
            return post;
          });
        })
        .addCase(deletePost.fulfilled, (state, action) => {
          state.posts = state.posts.filter(
            (post) => post._id !== action.payload
          );
        })
        .addCase(likePost.fulfilled, (state, action) => {
          const { _id } = action.payload.post;

          state.posts = state.posts.map((post) => {
            if (post._id === _id) {
              return action.payload.post;
            }
            return post;
          });
        });
    },
  });

  console.log(postSlice);
  // export const { createPost } = postSlice.actions;
  export default postSlice.reducer;
  ```

- setup the `env` file.

### authentication

- In the frontend, install `@react-oauth/google`, `react-router-dom` and `jwt-decode`.
- In the backend, install `bcryptjs` and `jsonwebtoken`.
- Refactor `App.jsx` and create a new component for navbar.
- Also create a `pages` folder with a `home` folder containing `HomeLayout.jsx` and `Landing.jsx`.
- setup the router in `App.jsx` and set `Landing.jsx` as index.
- use `HomeLayout.jsx` to import `Navbar` component and use with `<Outlet>`.

<br>

- create a component `auth`.
- use `material-ui` to create a form and a state `isSignUp` to switch between sign up and login forms.
- create another component `Input.jsx`and use it to show each input field. Pass the details of each input as props.
- use a state `showPassword` to alternate between hiding and showing the password.

#### google Oauth login

- use `useGoogleLogin` from `@react-oauth/google` to use google authentication API.
- In `main.jsx` wrap `<App>` around `GoogleOAuthProvider`.
- visit the google cloud website and create a new project, obtain a client ID.
- create a `.env` file and pass the client ID to the app.
- In `Auth.jsx` receive the token. Create a function `getUserData()` to obtain other user info.
- use `redux` and create a new slice for `auth`. Create reducers- auth and logout. Export the actions and reducers. Import the reducer in `store` and use `useDispatch()` to dispatch actions.

  ```jsx
  const getUserData = async (user) => {
    try {
      const token = user?.access_token;
      const { data } = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      return { data, token };
    } catch (error) {
      console.log(error);
    }
  };

  const googleSuccess = async (res) => {
    try {
      const data = await getUserData(res);
      // console.log(data);

      dispatch(auth(data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (err) => {
    console.log(err);
    console.log("Google Sign In was not Successfull");
  };

  const login = useGoogleLogin({
    onSuccess: (res) => googleSuccess(res),
    onError: (error) => googleFailure(error),
  });
  ```

  <br>

  ```jsx
  const initialState = { authData: null };
  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      auth: (state, action) => {
        localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));

        state.authData =  action?.payload;
      },

      logout: (state, action) => {
        localStorage.clear();
        console.log(action?.payload);
        state = { ...state, authData: null };
      },
    },
  });

  export const { auth, logout } = authSlice.actions;
  export default authSlice.reducer;
  ```

- use `localStorage` to store user data.
- In `Navbar.jsx`, create a state `user` and set it to the data obtained from the `localStorage`.
- Display the user data.
- create a function `logout()` which will dispatch an action to logout the user to redux.
- remove the data from `localStorage` on logout.
- use `useNavigate()` to navigate between pages and `useLocation()` to reset the user when the url changes.

  ```jsx
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  // console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logoutUser = () => {
    dispatch(logout());
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    const token = user?.token;

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  ```

  <hr>

- In `Auth.jsx`, create a new state `formData` and use `handleSubmit()` and `handleChange()` to collect the form data.
- use `redux` to create acions and reducers for signUp and signIn.
- use `useDispatch()` to dispatch `formData` and `navigate` when user submits the form.

  ```jsx
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    if (isSignUp) {
      dispatch(signUp({ formData, navigate }));
    } else {
      dispatch(signIn({ formData, navigate }));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  ```

- use `redux` and create two new reducers using `createAsyncThunk` to perform asynchronous operations of signUp and signIn.
- work on the backend- create controllers and routers for login and signup routes. Also create a User model.

### pagination
- use `<Pagination>` from `material-ui` to create a new component and display pages.

<br>

- modify `Auth.jsx` to redirect to home page when the user tries to access `/auth` route while logged in.

### search
- In `Landing.jsx` create a function `useQuery()` to access url params like page and search.

  ```jsx
    const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

    const query= useQuery();
    const page= query.get('page') || 1;
    const searchQuery= query.get('searchQuery');
  ```
- Use `material-ui` to display search field and chips input.
- create two states- `search` and `tags` for chips input.
- create functions to add and delete chips input from the tags array.
- create function to search posts, also call it when user presses enter.
- In the backend, create route and controller to search posts.
- In the frontend create axios function in `api/index.js` and reducer and action in `postsSlice.jsx` to search posts. Use `useDispatch` in `Landing.jsx` to call the reducer. 

  ```jsx
  export const fetchPostsBySearch = (searchQuery) =>
  customFetch.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
  ```
  <br>

  ```jsx
      export const getPostsBySearch = createAsyncThunk(
    "posts/getPostsBySearch",
    async (searchQuery) => {
      try {
        const { data } = await api.fetchPostsBySearch(searchQuery);
        console.log(data);
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  );
  ```

