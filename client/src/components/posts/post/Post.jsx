import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@mui/material";
import {
  ThumbUpAlt,
  Delete,
  MoreHoriz,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import useStyles from "./styles";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, likePost } from "../../../slice/posts/postsSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Post = ({ post, setCurrentId }) => {
  const [likes, setLikes] = useState(post?.likes);
  const dispatch = useDispatch();
  const { authData: user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const userID = user?.data?.id || user?.data?.userId;
  // console.log(userID)
  const hasLikedPost = post.likes.find((id) => id === userID);

  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userID));
    } else {
      setLikes([...post.likes, userID]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return hasLikedPost ? (
        <>
          <ThumbUpAlt fontSize="small" /> &nbsp;{" "}
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" /> &nbsp; {likes.length}{" "}
          {likes.length === 1 ? "Like" : ` Likes`}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp; Like
      </>
    );
  };

  const openPost = () => navigate(`/posts/${post._id}`);

  return (
    <Card
      sx={useStyles.card}
      raised
      elevation={6}
    >
      <ButtonBase
        sx={useStyles.cardAction}
        onClick={openPost}
      >
        <CardMedia
          sx={useStyles.media}
          image={
            post.selectedFile ||
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          title={post.title}
        />

        <div style={useStyles.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>

        {post?.creator === userID && (
          <div style={useStyles.overlay2}>
            <span
              style={{ color: "white" }}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentId(post._id);
              }}
            >
              <MoreHoriz />
            </span>
          </div>
        )}

        <div style={useStyles.details}>
          <Typography
            variant="body2"
            color="textSecondary"
          >
            {post.tags[0] && post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>

        <Typography
          sx={useStyles.title}
          variant="h5"
          gutterBottom
        >
          {post.title}
        </Typography>

        <CardContent>
          <Typography
            variant="body2"
            component="p"
            color="textSecondary"
          >
            {post.message?.slice(0, 100)}
            <span style={{ color: "#0b789c" }}>...Read More</span>
          </Typography>
        </CardContent>
      </ButtonBase>

      <CardActions sx={useStyles.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.data}
          onClick={handleLike}
        >
          {Likes()}
        </Button>

        {post?.creator === userID && (
          <Button
            size="small"
            color="primary"
            onClick={() => {
              dispatch(deletePost(post._id));
              // setCurrentId(post._id);
            }}
          >
            <Delete fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
