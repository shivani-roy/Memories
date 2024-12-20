import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
  Box,
} from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import useStyles from "./styles";
import { getPost, getPostsBySearch } from "../../slice/posts/postsSlice";
import CommentSection from "./CommentSection";

const PostDetails = () => {
  const { posts, post, isLoading } = useSelector((store) => store.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(
        getPostsBySearch({ search: "none", tags: post?.tags?.join(",") })
      );
    }
  }, [post]);

  if (!post) return null;

  if (isLoading) {
    return (
      <Paper
        sx={useStyles.loadingPaper}
        elevation={6}
      >
        <CircularProgress size="5em" />
      </Paper>
    );
  }

  const recommendedPosts = posts
    .filter(({ _id }) => _id !== post._id)
    .slice(0, 5);
  // console.log(recommendedPosts);

  const openPost = (id) => {
    navigate(`/posts/${id}`);
  };

  return (
    <Paper
      style={{ padding: "22px", borderRadius: "15px", marginBottom: "2rem" }}
      elevation={6}
    >
      <Box sx={useStyles.card}>
        <Box
          sx={{
            ...useStyles.section,
            "@media (min-width:776px)": {
              // border:"2px solid red"
              minWidth: "400px",
            },
          }}
        >
          <Typography
            variant="h3"
            component="h2"
            style={{ textTransform: "capitalize" }}
          >
            {post.title}
          </Typography>

          <Typography
            gutterBottom
            variant="subtitle1"
            color="primary"
          >
            {post?.tags?.map((tag) => `#${tag} `)}
          </Typography>

          <Typography
            gutterBottom
            variant="body1"
            component="p"
            color="#444242"
          >
            {post.message}
          </Typography>

          <Typography variant="subtitle1">Created By: {post.name}</Typography>

          <Typography variant="body1" color="#4f4b4f">
            {moment(post.createdAt).fromNow()}
          </Typography>

          {/* <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>Realtime Chat - coming soon!</strong>
          </Typography> */}

          {/* <Divider style={{ margin: "20px 0" }} /> */}
        </Box>

        <Box sx={useStyles.imageSection}>
          <img
            style={useStyles.media}
            src={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post.title}
          />
        </Box>
      </Box>

      <Divider style={{ margin: "20px 0" }} />
      <CommentSection post={post} />
      {recommendedPosts.length && (
        <div style={{ ...useStyles.section, marginTop: "5rem" }}>
          <Typography
            gutterBottom
            variant="h5"
          >
            You might also like
          </Typography>
          <Divider />

          <Box sx={useStyles.recommendedPosts}>
            {recommendedPosts.map(
              ({ _id, title, message, name, likes, selectedFile }) => {
                return (
                  <div
                    key={_id}
                    style={{ margin: "20px", cursor: "pointer" }}
                    onClick={() => openPost(_id)}
                  >
                    <Typography
                      gutterBottom
                      variant="h6"
                    >
                      {title}
                    </Typography>

                    <Typography
                      gutterBottom
                      variant="subtitle2"
                    >
                      {name}
                    </Typography>

                    <img
                      src={
                        selectedFile ||
                        "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                      }
                      style={{
                        width: "200px",
                        height: "120px",
                        borderRadius: "4px",
                      }}
                    />

                    <Typography
                      gutterBottom
                      variant="subtitle2"
                    >
                      {message.slice(0, 20)}
                      <span style={{ color: "#0b789c" }}>...Read More</span>
                    </Typography>
                  </div>
                );
              }
            )}
          </Box>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;
