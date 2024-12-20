import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Container,
  Grid2,
  Grow,
  Paper,
  AppBar,
  Button,
  TextField,
} from "@mui/material";
import { getPosts, getPostsBySearch } from "../../slice/posts/postsSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { MuiChipsInput } from "mui-chips-input";
import { Form, Posts, Pagination } from "../../components";
import useStyles from "./styles";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Landing = () => {
  const [currentId, setCurrentId] = useState(null);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();
  // console.log(currentId);

  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  // console.log(searchQuery, page, query);

  // useEffect(() => {
  //   dispatch(getPosts());
  // }, [currentId]);

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAdd = (tag) => setTags([...tags, tag]);
  const handleDelete = (tagToDelete) =>
    setTags(tags.filter((tag) => tag !== tagToDelete));

  const searchPost = () => {
    if (search.trim() || tags.length > 0) {
      console.log(search, tags);
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      dispatch(getPosts(page));
      navigate("/");
    }
  };

  return (
    <Grow in>
      <Container
        maxWidth="xl"
        sx={{ marginBottom: "4rem" }}
      >
        <Grid2
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid2 size={{ xs: 12, sm: 7, md: 9 }}>
            <Posts setCurrentId={setCurrentId} />
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 5, md: 3 }}>
            <AppBar
              sx={useStyles.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                onKeyUp={handleKeyPress}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />

              <MuiChipsInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAddChip={handleAdd}
                onDeleteChip={handleDelete}
              />

              <Button
                variant="contained"
                color="primary"
                onClick={searchPost}
              >
                Search
              </Button>
            </AppBar>

            <Form
              currentId={currentId}
              setCurrentId={setCurrentId}
            />

            {!searchQuery && !tags.length && (
              <Paper
                elevation={6}
                sx={useStyles.pagination}
              >
                <Pagination page={page} />
              </Paper>
            )}
          </Grid2>
        </Grid2>
      </Container>
    </Grow>
  );
};

export default Landing;
