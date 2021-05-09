import { Avatar, Divider} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme=>({
  root: {
    width: "100%",
    display:'flex',
    [theme.breakpoints.only("xs")]:{
      display:'block'
    },
    [theme.breakpoints.only("sm")]:{
      display:'block'
    },
    margin: "0 0 20px 0"
  },
  img: {
    width: "30%",
    margin: "10px 0 10px 0",
    [theme.breakpoints.only("xs")]:{
      width:'80%',
      margin: "10px 10% 10px 10%"
    },
    [theme.breakpoints.only("sm")]:{
      width:'70%',
      margin: "10px 15% 10px 15%"
    },
  },
  details: {
    width: "70%",
    [theme.breakpoints.only("xs")]:{
      width:'100%'
    },
    [theme.breakpoints.only("sm")]:{
      width:'100%'
    },
    fontFamily: "lato",
    margin: "10px"
  },
  detailBody: {
    fontWeight: "550",
    fontSize: "15px"
  },
  Rating: {
    display: "flex",
    flexWrap: "wrap",
    fontSize: "0.9rem"
  },
  RatingInfo: {
    margin: "10px 10px 10px 0",
    fontWeight: "600"
  },
  square: {
    backgroundColor: "#FF5722",
    color: "#fff",
    margin: "10px 10px 10px 0",
    padding: "3%"
  },
  span: {
    fontWeight: "600",
    fontSize: "1rem"
  }
}));
export default function Details() {
  const [details, setDetails] = useState({});
  const getId=(path)=>{
    return path.substring(11, path.length);
  }
  const history=useHistory();
  const path=history.location.pathname;
  const id=getId(path);
  useEffect(() => {
    const request = async () => {
      const data = await axios.get(`https://api.jikan.moe/v3/anime/${id}`);
      setDetails(data.data);
    };
    request();
  }, []);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.img}>
        <img
          src={details.image_url}
          alt={details.title}
          style={{ width: "100%" }}
        />
      </div>
      <div className={classes.details}>
        <div className={classes.Rating}>
          <Avatar variant="square" className={classes.square}>
            {details.score}
          </Avatar>
          <div className={classes.RatingInfo}>
            <p>Rank : #{details.rank}</p>
            <p>
              Ratings : {details.score}/10 from {details.scored_by} users
            </p>
            <p>Favorites : {details.favorites}</p>
          </div>
        </div>
        <Divider style={{ width: "100%" }} />
        <div className={classes.detailBody}>
          {details.synopsis}
          <div style={{ margin: "10px 0" }}>
            <p>
              <span className={classes.span}>Japanese Title : </span>
              {details.title_japanese}
            </p>
            <p>
              <span className={classes.span}>Synonyms : </span>
              {details.title_synonyms}
            </p>
            <p>
              <span className={classes.span}>Studios : </span>
              {details.studios !== undefined
                ? details.studios.map((item, index) => <span key={item.name}>{item.name}, </span>)
                : null}
            </p>
            <p>
              <span className={classes.span}>Producers : </span>
              {details.studios !== undefined
                ? details.producers.map((item, index) => <span key={item.name}>{item.name}, </span>)
                : null}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
