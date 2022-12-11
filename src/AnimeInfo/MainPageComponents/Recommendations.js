import {
  GridList,
  GridListTile,
  GridListTileBar,
  useMediaQuery,
  useTheme
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../Review.css";

const useStyle = makeStyles({
  content: {
    width: "100%",
    background: "#fff",
    marginTop: "5px"
  }
});
export default function Recommendation() {
  const classes = useStyle();
  const [recommend, setRecommend] = useState([]);
  const getId = (path) => {
    let i = 12,
      l = 11;
    while (path[i] !== "/") {
      i++;
    }
    return path.substring(l, i);
  };
  const history = useHistory();
  const path = history.location.pathname;
  const id = getId(path);
  useEffect(() => {
    const request = async () => {
      const rec = await axios.get(
        `https://api.jikan.moe/v4/anime/${id}/recommendations`,
        {
          params:{
            page:1
          }
        }
      );
      setRecommend(rec.data.data);
    };
    request();
  }, []);
  const theme = useTheme();
  const col2 = useMediaQuery(theme.breakpoints.only("xs"));
  const col3 = useMediaQuery(theme.breakpoints.only("sm"));
  // const col4 = useMediaQuery(theme.breakpoints.only("lg"));
  return (
    <div className={classes.content}>
      <GridList cols={col2 ? 2 : col3 ? 3 : 4} cellHeight={300}>
        {recommend !== undefined
          ? recommend.map((item, index) => (
              <GridListTile key={index}>
                <img src={item.entry?.images?.jpg?.image_url} alt={index} />
                <GridListTileBar title={item.entry?.title} />
              </GridListTile>
            ))
          : null}
      </GridList>
    </div>
  );
}
