import { Pagination, PaginationItem } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPosts } from "../slice/posts/postsSlice";
import useStyles from './styles'

const Paginate = ({ page }) => {
  const dispatch = useDispatch();
  const { numOfPages } = useSelector((store) => store.posts);

  useEffect(() => {
    if (page) {
      dispatch(getPosts(page));
    }
  }, [page]);

  return (
    <Pagination
      count={numOfPages}
      sx={{ul: useStyles.ul}}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
        />
      )}
    />
  );
};

export default Paginate;
