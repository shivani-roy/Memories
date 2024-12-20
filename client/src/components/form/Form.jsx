import { Typography, TextField, Paper, Button } from "@mui/material";
import { useEffect, useState } from "react";
import FileBase from "react-file-base64";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../slice/posts/postsSlice";
import { useNavigate } from "react-router-dom";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { posts } = useSelector((store) => store.posts);
  const post = posts.find((p) => p._id === currentId);
  // console.log(post);

  const { authData: user } = useSelector((store) => store.auth);

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!postData.message || !postData.title) {
      return;
    }

    if (currentId) {
      console.log(postData);
      dispatch(updatePost({ currentId, postData, name: user?.data?.name })); //the second parameter is considered thunkAPI so pass the args as an object.
    } else {
      dispatch(createPost({ postData, name: user?.data?.name, navigate }));
    }

    clearForm();
  };

  const clearForm = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  if (!user?.data?.name) {
    return (
      <Paper sx={useStyles.paper}>
        <Typography
          variant="h6"
          align="center"
        >
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      sx={useStyles.paper}
      elevation={6}
    >
      <form
        autoComplete="off"
        // noValidate
        onSubmit={handleSubmit}
        style={useStyles.form}
      >
        <Typography variant="h6">
          {" "}
          {currentId ? `Editing` : `Creating`} a Memory
        </Typography>

        <div style={useStyles.textField}>
          <TextField
            name="title"
            variant="outlined"
            fullWidth
            label="Title"
            required
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />

          <TextField
            name="message"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            label="Message"
            required
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
          />

          <TextField
            name="tags"
            variant="outlined"
            fullWidth
            label="Tags (comma separated)"
            value={postData.tags}
            onChange={(e) =>
              setPostData({ ...postData, tags: e.target.value.split(",") })
            }
          />
        </div>

        <div style={useStyles.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>

        <Button
          fullWidth
          color="primary"
          type="submit"
          size="large"
          variant="contained"
          sx={useStyles.buttonSubmit}
        >
          Submit
        </Button>

        <Button
          fullWidth
          // size="small"
          variant="contained"
          onClick={clearForm}
          color="error"
          sx={{ background: "#e4345d" }}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
