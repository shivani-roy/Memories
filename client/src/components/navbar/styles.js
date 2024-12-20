import { deepPurple } from "@mui/material/colors";

const createStyles = {
  appBar: {
    borderRadius: 4,
    margin: "30px 0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    columnGap: "4rem",
    rowGap: "4px",
    "@media (min-width:750px)": { flexDirection: "row" },
  },
  heading: {
    color: "rgba(0,183,255, 1)",
    textDecoration: "none",
  },
  image: {
    marginLeft: "15px",
    marginTop: "5px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "300px",
    "@media (max-width:750px)": { width: "auto" },
  },
  profile: {
    display: "flex",
    width: "300px",
    justifyContent: "space-around",
    alignItems: "center",

    "@media (max-width:750px)": {
      width: "auto",
      justifyContent: "center",
      marginTop: "1rem",
      gap: 2,
    },
  },
  logout: {
    marginLeft: "20px",
  },
  userName: {
    display: "flex",
    alignItems: "center",
    textTransform: "capitalize",
    textAlign: "center",
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
  purple: {
    // color: theme.palette.getContrastText(deepPurple[500]),
    color: deepPurple[50],
    backgroundColor: deepPurple[500],
  },
};

export default createStyles;
