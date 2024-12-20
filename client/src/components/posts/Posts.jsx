import { useSelector } from "react-redux";
import Post from "./post/Post";
import { CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid2";
import useStyles from "./styles";

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((store) => store.posts);
  // console.log(posts);

  if (!isLoading && !posts.length) return <h2>No Posts to display</h2>;

  return !isLoading ? (
    posts?.length > 0 && (
      <Grid
        sx={useStyles.mainContainer}
        container
        alignItems="stretch"
        spacing={3}
      >
        {posts.map((post) => {
          return (
            <Grid
              key={post._id}
              size={{ xs: 12, md: 6, lg: 3 }}
            >
              <Post
                post={post}
                setCurrentId={setCurrentId}
              />
            </Grid>
          );
        })}
      </Grid>
    )
  ) : (
    <CircularProgress />
  );
};

export default Posts;
