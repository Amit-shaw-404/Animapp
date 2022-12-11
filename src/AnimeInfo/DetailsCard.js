import { makeStyles } from "@material-ui/core";

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
  console.log(details);
  const classes = useStyles();
  return (
    <div className={classes.card}>
      <div className={classes.cardTitle}>
        <h2 className={classes.cardHeading}>Details</h2>
      </div>
      <div className={classes.cardContent}>
        <p style={{ margin: "5px 0" }}>
          <span className={classes.span}>Type : </span>
          {details.data?.type}
        </p>
        <p style={{ margin: "5px 0" }}>
          <span className={classes.span}>Episodes : </span>
          {details.data?.episodes}
        </p>
        <p style={{ margin: "5px 0" }}>
          <span className={classes.span}>Status : </span>
          {details.data?.status}
        </p>
        <p style={{ margin: "5px 0" }}>
          <span className={classes.span}>Duration : </span>
          {details.data?.duration}
        </p>
        <p style={{ margin: "5px 0" }}>
          <span className={classes.span}>Premiered : </span>
          {details.data?.premiered}
        </p>
        <p style={{ margin: "5px 0" }}>
          <span className={classes.span}>Broadcast : </span>
          {details.data?.broadcast.string}
        </p>
        <p style={{ margin: "5px 0" }}>
          <span className={classes.span}>Content rating : </span>
          {details.data?.rating}
        </p>
        <p style={{ margin: "5px 0" }}>
          <span className={classes.span}>Genres: </span>
          {details.data?.genres !== undefined
            ? details.data?.genres.map((item, index) => <span key={index}>{item.name}, </span>)
            : null}
        </p>
      </div>
    </div>
  );
};
export default DetailsCards;
