import {
  GridList,
  GridListTile,
  useMediaQuery,
  useTheme
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function Photos() {
  const [photos, setPhotos] = useState([]);
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
  const id=getId(path);
  useEffect(() => {
    const request = async () => {
      const pics = await axios.get(
        `https://api.jikan.moe/v4/anime/${id}/pictures`
      );
      console.log(pics.data.data);
      setPhotos(pics.data.data);
    };
    request();
  }, []);
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.only("sm"));
  const exsmall = useMediaQuery(theme.breakpoints.only("xs"));
  return (
    <GridList
      cols={exsmall ? 2 : small ? 3 : 4}
      cellHeight={250}
      style={{ margin: "10px" }}
    >
      {photos !== undefined
        ? photos.map((item, index) => (
            <GridListTile key={index}>
              <a href={item.large}>
                <img src={item.jpg?.image_url} alt={index} width="100%"/>
              </a>
            </GridListTile>
          ))
        : ""}
    </GridList>
  );
}
