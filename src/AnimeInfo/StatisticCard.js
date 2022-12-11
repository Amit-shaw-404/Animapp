import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    [theme.breakpoints.up("md")]: {
      boxShadow: "-1px 1px 28px -5px rgba(0,0,0,0.75)"
    },
    border: "0px solid black",
    borderRadius: "5px",
    width: "100%"
  },
  cardTitle: {
    width: "100%",
    background: "#A5DAFA",
    color: "#1675B6",
    [theme.breakpoints.up("md")]: {
      background: "#1675b6",
      color: "#fff"
    },
    padding: "10px",
    boxSizing: "border-box",
    fontFamily: "lato"
  },
  cardContent: {
    backgroundColor: "#fff",
    [theme.breakpoints.up("md")]: {
      backgroundColor: "#F3F8FC"
    },
    boxSizing: "border-box",
    padding: "25px 15px",
    fontFamily: "lato"
  },
  span: {
    fontWeight: "600",
    fontSize: "1rem"
  }
}));
const DetailsCards = ({ details }) => {
  const classes = useStyles();
  return (
    <div className={classes.card}>
      <div className={classes.cardTitle}>
        <h2 className={classes.cardHeading}>Statistics</h2>
      </div>
      <div className={classes.cardContent}>
        <p style={{ margin: "5px 0" }}>
          <span className={classes.span}>Score : </span>
          {details.data?.score}
        </p>
        <p style={{ margin: "5px 0" }}>
          <span className={classes.span}>Rank : </span>
          {details.data?.rank}
        </p>
        <p style={{ margin: "5px 0" }}>
          <span className={classes.span}>Popularity : </span>
          {details.data?.popularity}
        </p>
        <p style={{ margin: "5px 0" }}>
          <span className={classes.span}>Members : </span>
          {details.data?.members}
        </p>
        <p style={{ margin: "5px 0" }}>
          <span className={classes.span}>Faviorites : </span>
          {details.data?.favorites}
        </p>
      </div>
    </div>
  );
};
export default DetailsCards;
