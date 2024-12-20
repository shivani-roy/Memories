import axios from "axios";
// import { getCookies } from "../components/navbar/Navbar";
// import { jwtDecode } from "jwt-decode";
// import { logoutUser } from "../slice/auth/authSlice";

const customFetch = axios.create({ baseURL: "/api/v1" });

customFetch.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req; //must have a return statement
});

// customFetch.interceptors.request.use(
//   (config) => {
//     const token = getCookies("token");
//     if (token) {
//       const decodedToken = jwtDecode(token);
//       const currentTime = Date.now() / 1000; // Convert to seconds
//       if (decodedToken.exp < currentTime) {
//         logoutUser();
//       } else {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export const fetchPosts = (page) => customFetch.get(`/posts?page=${page}`);
export const createPost = (newPost) => customFetch.post("/posts", newPost);
export const updatePost = (id, updatedPost) =>
  customFetch.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => customFetch.delete(`/posts/${id}`);
export const likePost = (id) => customFetch.patch(`/posts/${id}/likePost`);
export const addComment = (id, value) =>
  customFetch.post(`/posts/${id}/commentPost`, { value });
export const fetchPostsBySearch = (searchQuery) =>
  customFetch.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
export const fetchPost = (id) => customFetch.get(`/posts/${id}`);

export const signUp = (formData) => customFetch.post("/users/signup", formData);
export const signIn = (formData) => customFetch.post("/users/login", formData);
export const logout = () => customFetch.get("/users/logout");
export const googleAuth = (data) =>
  customFetch.post("/users/google/auth", data);
