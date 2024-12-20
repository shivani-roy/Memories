const createStyles = {
  media: {
    borderRadius: "20px",
    objectFit: "cover",
    width: "100%",
    maxWidth: "400px",
    maxHeight: "400px",
    marginBottom: "1rem",
  },
  card: {
    display: "flex",
    columnGap:"2rem",
    "@media (max-width:776px)": { flexWrap: "wrap", flexDirection: "column" },
  },
  section: {
    borderRadius: "20px",
    flex: 1,
    marginBottom:"2rem",
  },
  imageSection: {
    // marginLeft: "20px",
    marginTop: "1rem",
    "@media (max-width:776px)": { marginLeft: 0, marginTop: 0 },
  },
  recommendedPosts: {
    display: "flex",
    flexWrap: "wrap",
    "@media (max-width:600px)": {
      flexDirection: "column",
    },
  },
  loadingPaper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    borderRadius: "15px",
    height: "39vh",
  },

  commentsOuterContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "2rem",
    
    "@media (max-width:992px)": {
      flexDirection: "column",
      gap: "2rem",
    },
  },

  commentsInnerContainer: {
    maxHeight: "200px",
    overflow: "auto",
    marginRight: "30px",
    
    "@media (max-width:992px)": {
      height: "auto",
      // maxHeight: "200px",
    },
  },
};

export default createStyles;
