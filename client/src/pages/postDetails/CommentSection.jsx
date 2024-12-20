import { Typography, TextField, Button, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import { useRef, useState } from "react";
import { addComment } from "../../slice/posts/postsSlice";

const CommentSection = ({ post }) => {
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const { authData: user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const commentsRef = useRef(null);
  // console.log(commentsRef);

  const handleClick = async () => {
    const finalComment = `${user?.data?.name}: ${comment}`;

    const { payload } = await dispatch(
      addComment({ finalComment, id: post._id })
    );
    setComments(payload?.post?.comments);
    setComment("");

    setTimeout(() => {
      commentsRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 10);
  };

  return (
    <div>
      <Box sx={useStyles.commentsOuterContainer}>
        {comments?.length ? (
          <Box sx={useStyles.commentsInnerContainer}>
            <Typography
              gutterBottom
              variant="h6"
            >
              Comments
            </Typography>

            {comments?.map((comment, index) => (
              <Typography
                key={index}
                gutterBottom
                variant="subtitle1"
              >
                <strong style={{ textTransform: "capitalize" }}>
                  {comment.split(": ")[0]}
                </strong>
                <br />
                {comment.split(":")[1]}
              </Typography>
            ))}

            <div ref={commentsRef} />
          </Box>
        ) : (
          ""
        )}

        {user?.data?.name && (
          <div
            style={{
              width: `${comments?.length ? "70%" : "50%"}`,
              minWidth: "40%",
            }}
          >
            <Typography
              gutterBottom
              variant="h6"
            >
              Write a comment
            </Typography>

            <TextField
              fullWidth
              rows={4}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              variant="contained"
              disabled={!comment}
              onClick={handleClick}
            >
              Comment
            </Button>
          </div>
        )}
      </Box>
    </div>
  );
};

export default CommentSection;
