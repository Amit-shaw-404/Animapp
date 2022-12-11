import {
  Avatar,
  Divider,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  useMediaQuery
} from "@material-ui/core";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import "./Review.css";
import Details from "./Details";
import { withRouter } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { useHistory } from "react-router";
import DetailsCards from "./DetailsCard";
import StatisticCard from "./StatisticCard";
import Photos from "./MainPageComponents/Photos";
import Review from "./MainPageComponents/Review";
import Episode from "./MainPageComponents/Episode";
import Recommendations from "./MainPageComponents/Recommendations";
import CharacterStaff from "./MainPageComponents/CharacterStaff";
import ContentHolder from "../components/ContentHolder";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#e9eaed",
    "& a": {
      textDecoration: "none",
      color: "#000",
      padding: "5px"
    }
  },
  container: {
    width: "80%",
    marginTop: "5%",
    [theme.breakpoints.only("xs")]: {
      width: "100%",
      marginTop: "0"
    },
    display: "flex",
    justifyContent: "space-around"
  },
  rightMain: {
    backgroundColor: "#fff",
    width: "100%"
  },
  right: {
    width: "100%"
  },
  mainNav: {
    fontFamily: "lato",
    width: "100%",
    padding: "15px 15px",
    boxSizing: "border-box"
  },
  nav: {
    listStyle: "none",
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    flexWrap: "wrap",
    boxSizing: "border-box",
    margin: "25px 0 0 0",
    alignItems: "flex-start",
    fontSize: "1rem",
    padding: "0"
  },
  rightCard: {
    width: "100%",
    margin: "10px 0 10px 0"
  },
  title: {
    width: "100%",
    background: "#A5DAFA",
    color: "#1675B6",
    padding: "10px",
    boxSizing: "border-box",
    fontFamily: "lato"
  },
  content: {
    width: "100%",
    background: "#fff"
  },
  navButton: {
    background: "#fff",
    padding: "5px",
    boxShadow: "2px 2px 5px rgba(0,0,0,0.4)",
    margin: "5px",
    borderRadius: "5px"
  }
}));
const MainPage = (props) => {
  const history = useHistory();
  const path = history.location.pathname;
  const id = path.substring(11, path.length);
  const [detailValues, setDetailValues] = useState({});
  const [recommend, setRecommend] = useState([]);
  const [review, setReview] = useState([]);
  const [showrec, setShowrec] = useState(true);
  const [showrev, setShowrev] = useState(true);
  useEffect(() => {
    const request = async () => {
      const data = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
      const rec = await axios.get(
        `https://api.jikan.moe/v4/anime/${id}/recommendations`,{
          params: {
            page: 1
          }
        }
      );
      const rev = await axios.get(
        `https://api.jikan.moe/v4/anime/${id}/reviews`, {
          params: {
            page: 1
          }
        }
      );
      console.log(data.data.data);
      setDetailValues(data.data);
      setRecommend(rec.data.data);
      // console.log(rec.data.data)
      setReview(rev.data.data);
      // console.log(rev.data.data)
    };
    request();
    ModifyContent();
  }, []);
  const ModifyContent = () => { };
  const classes = useStyles();
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.only("sm"));
  const exsmall = useMediaQuery(theme.breakpoints.only("xs"));
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Grid
          container
          spacing={3}
          direction={small || exsmall ? "column-reverse" : "row"}
        >
          <Grid item lg={4} md={3} xs={12} sm={12}>
            <div style={{ width: "100%" }}>
              <div style={{ width: "100%" }}>
                <DetailsCards details={detailValues} />
              </div>
              <div style={{ margin: "30px 0", width: "100%" }}>
                <StatisticCard details={detailValues} />
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={9} lg={8} sm={12}>
            <div className={classes.right}>
              <div className={classes.rightMain}>
                <div className={classes.mainNav}>
                  <h1 style={{ color: "#276291" }}>{detailValues.title}</h1>
                  <Router>
                    <ul className={classes.nav}>
                      <h3>
                        <li
                          className={small || exsmall ? classes.navButton : ""}
                          onClick={() => {
                            if (!showrev) setShowrev(true);
                            if (!showrec) setShowrec(true);
                          }}
                        >
                          <Link to={`${history.location.pathname}`}>
                            Details
                          </Link>
                        </li>
                      </h3>
                      <h3>
                        <li
                          className={small || exsmall ? classes.navButton : ""}
                          onClick={() => {
                            if (!showrev) setShowrev(true);
                            if (!showrec) setShowrec(true);
                          }}
                        >
                          <Link to={`${history.location.pathname}/episodes`}>
                            Episodes
                          </Link>
                        </li>
                      </h3>
                      <h3>
                        <li
                          className={small || exsmall ? classes.navButton : ""}
                          onClick={() => setShowrev(false)}
                        >
                          <Link to={`${history.location.pathname}/reviews`}>
                            Reviews
                          </Link>
                        </li>
                      </h3>
                      <h3>
                        <li
                          className={small || exsmall ? classes.navButton : ""}
                          onClick={() => setShowrec(false)}
                        >
                          <Link
                            to={`${history.location.pathname}/recommendations`}
                          >
                            Recommendations
                          </Link>
                        </li>
                      </h3>
                      <h3>
                        <li
                          className={small || exsmall ? classes.navButton : ""}
                          onClick={() => {
                            if (!showrev) setShowrev(true);
                            if (!showrec) setShowrec(true);
                          }}
                        >
                          <Link to={`${history.location.pathname}/photos`}>
                            Photos
                          </Link>
                        </li>
                      </h3>
                      <h3>
                        <li
                          className={small || exsmall ? classes.navButton : ""}
                          onClick={() => {
                            if (!showrev) setShowrev(true);
                            if (!showrec) setShowrec(true);
                          }}
                        >
                          <Link
                            to={`${history.location.pathname}/characters_staff`}
                          >
                            Characters & Staff
                          </Link>
                        </li>
                      </h3>
                    </ul>
                    <Divider style={{ width: "100%" }} />
                    <Switch>
                      <Route
                        exact
                        path={`${history.location.pathname}`}
                        render={() => <Details />}
                      />
                      <Route
                        exact
                        path={`${history.location.pathname}/episodes`}
                        render={() => <Episode total={detailValues.episodes} />}
                      />
                      <Route
                        exact
                        path={`${history.location.pathname}/reviews`}
                        render={() => <Review />}
                      />
                      <Route
                        exact
                        path={`${history.location.pathname}/recommendations`}
                        render={() => <Recommendations />}
                      />
                      <Route
                        exact
                        path={`${history.location.pathname}/photos`}
                        render={() => <Photos />}
                      />
                      <Route
                        exact
                        path={`${history.location.pathname}/characters_staff`}
                        render={() => <CharacterStaff />}
                      />
                    </Switch>
                  </Router>
                </div>
              </div>
              {showrec ? (
                <div className={classes.rightCard}>
                  <div className={classes.title}>
                    <h3>Recommendations</h3>
                  </div>
                  <div className={classes.content}>
                    <GridList
                      cols={exsmall ? 2 : small ? 3 : 4}
                      cellHeight={300}
                    >
                      {recommend !== undefined
                        ? recommend.map((item, index) =>
                          index < 4 ? (
                            <GridListTile key={index}>
                              <img src={item.entry?.images?.jpg?.image_url} alt={index} />
                              <GridListTileBar title={item.entry?.title} />
                            </GridListTile>
                          ) : ""
                        )
                        : ""}
                    </GridList>
                    <Divider style={{ width: "100%", margin: "5px 0" }} />
                  </div>
                </div>
              ) : null}
              {showrev ? (
                <div className={classes.rightCard}>
                  <div className={classes.title}>
                    <h3>Reviews</h3>
                  </div>
                  <div className={classes.content}>
                    {review !== undefined
                      ? review.map((item, index) =>
                        index < 2 ? (
                          <div key={index} className="container">
                            <div className="details">
                              <div className="mainInfo">
                                <Avatar
                                  src={item.user.images.jpg.image_url}
                                  alt={item.user.username}
                                  style={{
                                    margin: "5px 10px",
                                    width: "60px",
                                    height: "60px"
                                  }}
                                />
                                <div className="userInfo">
                                  <h4 className="userName">
                                    {item.user.username}
                                  </h4>
                                  <p style={{ fontSize: "14px" }}>
                                    {item.helpful_count} people found this
                                    helpful
                                  </p>
                                  <p style={{ fontSize: "14px" }}>
                                    Overall{" "}
                                    <span style={{ fontWeight: "700" }}>
                                      {item.score}
                                    </span>
                                    /10
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="content">
                              <ContentHolder content={item.review.replace(/\\n/g, "")}/>
                            </div>
                          </div>
                        ) : null
                      )
                      : null}
                    <Divider style={{ width: "100%", margin: "5px 0" }} />
                  </div>
                </div>
              ) : null}
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default withRouter(MainPage);
